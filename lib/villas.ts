import { cache } from "react";
import { endpoints } from "./api";

export type VillaArea =
  | "camps_bay"
  | "clifton"
  | "bantry_bay"
  | "constantia"
  | "franschhoek"
  | "stellenbosch"
  | "other";

export interface VillaCoverPhoto {
  id: number;
  cover_photos: string;
  order: number;
  is_featured: boolean;
}

export interface Villa {
  id: number;
  name: string;
  slug: string;
  location: string;
  area: VillaArea;
  bedrooms: number | null;
  bathrooms: number | null;
  max_guests: number | null;
  price_per_night: string | null;
  price_currency: string;
  short_description: string;
  description: string;
  features: string[];
  nox_property_id: string;
  nox_booking_url: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  cover_photos: VillaCoverPhoto[];
  images: string[];
  created_at: string;
  updated_at: string;
}

export const AREA_DISPLAY: Record<VillaArea, string> = {
  camps_bay: "Camps Bay",
  clifton: "Clifton",
  bantry_bay: "Bantry Bay",
  constantia: "Constantia",
  franschhoek: "Franschhoek",
  stellenbosch: "Stellenbosch",
  other: "Cape Town",
};

const AREA_ORDER: VillaArea[] = [
  "camps_bay",
  "clifton",
  "bantry_bay",
  "constantia",
  "franschhoek",
  "stellenbosch",
];

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const fetchVillas = cache(_fetchVillas);
async function _fetchVillas(): Promise<Villa[]> {
  const data = await fetchJson<Villa[] | { results: Villa[] }>(
    endpoints.villas.all()
  );
  if (!data) return [];
  return Array.isArray(data) ? data : data.results ?? [];
}

export const fetchFeaturedVillas = cache(_fetchFeaturedVillas);
async function _fetchFeaturedVillas(): Promise<Villa[]> {
  const data = await fetchJson<Villa[] | { results: Villa[] }>(
    endpoints.villas.featured()
  );
  if (!data) return [];
  return Array.isArray(data) ? data : data.results ?? [];
}

export const fetchVillaBySlug = cache(_fetchVillaBySlug);
async function _fetchVillaBySlug(slug: string): Promise<Villa | null> {
  const villa = await fetchJson<Villa>(endpoints.villas.detail(slug));
  return villa ?? null;
}

export function getVillaAreaDisplay(villa: Villa): string {
  return villa.location || AREA_DISPLAY[villa.area] || "Cape Town";
}

export function getVillaPrimaryPhoto(villa: Villa): string | null {
  const photos = (villa.cover_photos ?? []).filter((p) => p?.cover_photos);
  if (photos.length > 0) {
    const sorted = [...photos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return (sorted.find((p) => p.is_featured) ?? sorted[0]).cover_photos;
  }
  // Fallback to flat URL list if cover_photos missing
  return villa.images?.[0] ?? null;
}

export function parseVillaPrice(
  value: string | number | null | undefined
): number | null {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) && num > 0 ? num : null;
}

export function getVillaNightlyRate(villa: Villa): number | null {
  return parseVillaPrice(villa.price_per_night);
}

export function getKnownAreas(villas: Villa[]): VillaArea[] {
  const present = new Set(villas.map((v) => v.area));
  return AREA_ORDER.filter((a) => present.has(a));
}
