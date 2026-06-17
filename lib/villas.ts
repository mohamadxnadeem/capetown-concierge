import { cache } from "react";
import { BACKEND_URL } from "./api";

export interface VillaPhoto {
  id?: number;
  cover_photos: string;
  is_featured?: boolean;
  order?: number;
}

export interface Villa {
  id: number;
  slug: string;
  title: string;
  area?: string | null;
  location?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  max_guests?: number | null;
  sleeps?: number | null;
  price_per_night?: string | number | null;
  price_from?: string | number | null;
  price_to?: string | number | null;
  currency?: string | null;
  short_description?: string | null;
  highlight?: string | null;
  body?: string | null;
  features?: string[] | null;
  ideal_for?: string[] | null;
  cover_photos?: VillaPhoto[];
  images?: VillaPhoto[];
  is_active?: boolean;
  is_featured?: boolean;
}

interface VillaApiItem {
  villa?: Villa;
  cover_photos?: VillaPhoto[];
  id?: number;
  slug?: string;
  title?: string;
  area?: string | null;
  location?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  max_guests?: number | null;
  sleeps?: number | null;
  price_per_night?: string | number | null;
  price_from?: string | number | null;
  price_to?: string | number | null;
  currency?: string | null;
  short_description?: string | null;
  highlight?: string | null;
  body?: string | null;
  features?: string[] | null;
  ideal_for?: string[] | null;
  images?: VillaPhoto[];
  is_active?: boolean;
  is_featured?: boolean;
}

function normalize(item: VillaApiItem): Villa | null {
  const villa = item?.villa ?? (item as Villa);
  if (!villa?.slug || !villa.title) return null;
  // Photos can be at item-level (wrapper) or villa-level (nested)
  const photos =
    (item?.cover_photos && item.cover_photos.length
      ? item.cover_photos
      : villa.cover_photos ?? villa.images ?? []) ?? [];
  return { ...villa, cover_photos: photos };
}

export const fetchVillas = cache(_fetchVillas);

async function _fetchVillas(): Promise<Villa[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/public/villas/`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items: VillaApiItem[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
      ? data.results
      : [];
    return items
      .map(normalize)
      .filter((v): v is Villa => v !== null);
  } catch {
    return [];
  }
}

export const fetchVillaBySlug = cache(_fetchVillaBySlug);

async function _fetchVillaBySlug(slug: string): Promise<Villa | null> {
  const villas = await fetchVillas();
  const lower = slug.toLowerCase();
  return villas.find((v) => v.slug.toLowerCase() === lower) ?? null;
}

export function getVillaArea(villa: Villa): string | null {
  return villa.area ?? villa.location ?? null;
}

export function getVillaCapacity(villa: Villa): number | null {
  return villa.max_guests ?? villa.sleeps ?? null;
}

export function getVillaPrimaryPhoto(villa: Villa): string | null {
  const photos = (villa.cover_photos ?? villa.images ?? []).filter(
    (p) => p?.cover_photos
  );
  if (!photos.length) return null;
  const sorted = [...photos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (sorted.find((p) => p.is_featured) ?? sorted[0]).cover_photos;
}

export function parseVillaPrice(
  value: string | number | null | undefined
): number | null {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) && num > 0 ? num : null;
}

export function getVillaNightlyRate(villa: Villa): number | null {
  return (
    parseVillaPrice(villa.price_per_night) ??
    parseVillaPrice(villa.price_from) ??
    null
  );
}

const PREFERRED_AREAS = [
  "Camps Bay",
  "Clifton",
  "Bantry Bay",
  "Constantia",
  "Franschhoek",
  "Stellenbosch",
];

export function getKnownAreas(villas: Villa[]): string[] {
  const present = new Set(
    villas
      .map((v) => getVillaArea(v))
      .filter((a): a is string => Boolean(a))
  );
  // Preserve preferred ordering, then any extras alphabetically
  const preferred = PREFERRED_AREAS.filter((a) => present.has(a));
  const extras = [...present]
    .filter((a) => !PREFERRED_AREAS.includes(a))
    .sort();
  return [...preferred, ...extras];
}
