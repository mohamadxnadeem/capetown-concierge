import { cache } from "react";
import { endpoints } from "./api";

export type HotelArea =
  | "camps_bay"
  | "clifton"
  | "bantry_bay"
  | "constantia"
  | "franschhoek"
  | "stellenbosch"
  | "cbd"
  | "waterfront"
  | "other";

export interface HotelCoverPhoto {
  id: number;
  cover_photos: string;
  order: number;
  is_featured: boolean;
}

export interface Hotel {
  id: number;
  name: string;
  slug: string;
  location: string;
  area: HotelArea;
  star_rating: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  max_guests: number | null;
  price_per_night_from: string | null;
  price_currency: string;
  room_types: string[];
  short_description: string;
  description: string;
  features: string[];
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  cover_photos: HotelCoverPhoto[];
  images: string[];
  created_at: string;
  updated_at: string;
}

export const HOTEL_AREA_DISPLAY: Record<HotelArea, string> = {
  camps_bay: "Camps Bay",
  clifton: "Clifton",
  bantry_bay: "Bantry Bay",
  constantia: "Constantia",
  franschhoek: "Franschhoek",
  stellenbosch: "Stellenbosch",
  cbd: "Cape Town CBD",
  waterfront: "V&A Waterfront",
  other: "Cape Town",
};

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const fetchHotels = cache(_fetchHotels);
async function _fetchHotels(): Promise<Hotel[]> {
  const data = await fetchJson<Hotel[] | { results: Hotel[] }>(
    endpoints.hotels.all()
  );
  if (!data) return [];
  return Array.isArray(data) ? data : data.results ?? [];
}

export const fetchFeaturedHotels = cache(_fetchFeaturedHotels);
async function _fetchFeaturedHotels(): Promise<Hotel[]> {
  const data = await fetchJson<Hotel[] | { results: Hotel[] }>(
    endpoints.hotels.featured()
  );
  if (!data) return [];
  return Array.isArray(data) ? data : data.results ?? [];
}

export const fetchHotelBySlug = cache(_fetchHotelBySlug);
async function _fetchHotelBySlug(slug: string): Promise<Hotel | null> {
  const hotel = await fetchJson<Hotel>(endpoints.hotels.detail(slug));
  return hotel ?? null;
}

export function getHotelAreaDisplay(hotel: Hotel): string {
  return hotel.location || HOTEL_AREA_DISPLAY[hotel.area] || "Cape Town";
}

export function getHotelPrimaryPhoto(hotel: Hotel): string | null {
  const photos = (hotel.cover_photos ?? []).filter((p) => p?.cover_photos);
  if (photos.length > 0) {
    const sorted = [...photos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return (sorted.find((p) => p.is_featured) ?? sorted[0]).cover_photos;
  }
  return hotel.images?.[0] ?? null;
}

export function parseHotelPrice(
  value: string | number | null | undefined
): number | null {
  if (value === null || value === undefined || value === "") return null;
  const num = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) && num > 0 ? num : null;
}

export function getHotelNightlyRate(hotel: Hotel): number | null {
  return parseHotelPrice(hotel.price_per_night_from);
}

export function starsDisplay(stars: number | null | undefined): string | null {
  if (!stars || stars <= 0) return null;
  const rounded = Math.min(5, Math.max(1, Math.round(stars)));
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}
