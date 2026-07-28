import { cache } from "react";
import { endpoints } from "./api";
import { WeeklyPricingVehicle } from "../components/sections/cape-town-itinerary/types";

export interface UpsellVehicle {
  slug: string;
  title: string;
  image: string;
  seats?: number;
  priceZar?: number;
}

interface CarPhoto {
  cover_photos?: string;
  is_featured?: boolean;
}

interface CarNode {
  title?: string;
  slug?: string;
  number_of_seats?: number;
  price?: string | number;
  multi_day_discount_percent?: string | number | null;
  cover_photos?: CarPhoto[];
  images?: CarPhoto[];
}

interface CarsApiItem {
  car?: CarNode;
  cover_photos?: CarPhoto[];
}

function pickFirst(photos: CarPhoto[] | undefined): string {
  if (!photos?.length) return "";
  return (
    photos.find((p) => p?.is_featured)?.cover_photos ||
    photos[0]?.cover_photos ||
    ""
  );
}

function parsePrice(v: string | number | undefined): number | undefined {
  if (v === undefined || v === null || v === "") return undefined;
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

// ─── Weekly pricing fetch (for the 7-day itinerary page) ────────────
// Pulls the same vehicle list, filters to those with a positive daily
// rate, and derives the multi-day discount from the CMS field
// `multi_day_discount_percent` (defaults to 25 when absent). Sorts
// ascending by seat count so the fleet is presented smallest-first.

const DEFAULT_MULTI_DAY_DISCOUNT_PERCENT = 25;

function parseDiscountPercent(
  v: string | number | null | undefined
): number {
  if (v === null || v === undefined || v === "") {
    return DEFAULT_MULTI_DAY_DISCOUNT_PERCENT;
  }
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n) || n < 0) return DEFAULT_MULTI_DAY_DISCOUNT_PERCENT;
  return Math.min(90, n);
}

export const fetchItineraryWeeklyVehicles = cache(_fetchItineraryWeeklyVehicles);

async function _fetchItineraryWeeklyVehicles(): Promise<WeeklyPricingVehicle[]> {
  try {
    const res = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const items: CarsApiItem[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
      ? data.results
      : [];
    const mapped: (WeeklyPricingVehicle | null)[] = items.map((item) => {
      const car = item?.car;
      if (!car?.title || !car?.slug) return null;
      const dailyRateZar = parsePrice(car.price);
      if (!dailyRateZar) return null;
      const seats = car.number_of_seats ?? 0;
      const primaryImage =
        pickFirst(item?.cover_photos) ||
        pickFirst(car.cover_photos) ||
        pickFirst(car.images);
      return {
        slug: car.slug.toLowerCase(),
        title: car.title,
        seats,
        dailyRateZar,
        discountPercent: parseDiscountPercent(car.multi_day_discount_percent),
        primaryImage,
        href: `/chauffeur-hire/${car.slug.toLowerCase()}`,
      };
    });
    return mapped
      .filter((v): v is WeeklyPricingVehicle => v !== null)
      .sort((a, b) => a.seats - b.seats);
  } catch {
    return [];
  }
}

export const fetchUpsellVehicles = cache(_fetchUpsellVehicles);

async function _fetchUpsellVehicles(limit = 8): Promise<UpsellVehicle[]> {
  try {
    const res = await fetch(endpoints.carsForHire.all(), {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items: CarsApiItem[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
      ? data.results
      : [];
    const mapped: (UpsellVehicle | null)[] = items.map((item) => {
      const car = item?.car;
      if (!car?.title || !car?.slug) return null;
      const uv: UpsellVehicle = {
        slug: car.slug,
        title: car.title,
        image:
          pickFirst(item?.cover_photos) ||
          pickFirst(car.cover_photos) ||
          pickFirst(car.images),
      };
      if (car.number_of_seats) uv.seats = car.number_of_seats;
      const price = parsePrice(car.price);
      if (price) uv.priceZar = price;
      return uv;
    });
    return mapped
      .filter((v): v is UpsellVehicle => v !== null)
      .slice(0, limit);
  } catch {
    return [];
  }
}
