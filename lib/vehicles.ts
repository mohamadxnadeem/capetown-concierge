import { cache } from "react";
import { endpoints } from "./api";
import { WeeklyPricingVehicle } from "../components/sections/cape-town-itinerary/types";
import { pricingConfig } from "./pricingConfig";

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
// `multi_day_discount_percent`. Sorts ascending by seat count so the
// fleet is presented smallest-first.
//
// Discount is hard-capped at MAX_MULTI_DAY_DISCOUNT_PERCENT regardless
// of the CMS value. This keeps a well-intentioned CMS edit from
// eating a whole week's margin.

const DEFAULT_MULTI_DAY_DISCOUNT_PERCENT = 10;
const MAX_MULTI_DAY_DISCOUNT_PERCENT = 10;

function parseDiscountPercent(
  v: string | number | null | undefined
): number {
  if (v === null || v === undefined || v === "") {
    return DEFAULT_MULTI_DAY_DISCOUNT_PERCENT;
  }
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n) || n < 0) return DEFAULT_MULTI_DAY_DISCOUNT_PERCENT;
  return Math.min(MAX_MULTI_DAY_DISCOUNT_PERCENT, n);
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

// ─── Garden Route package fetch (for /7-day-garden-route-itinerary) ─
// Derives the 7-day Garden Route package from each vehicle's standard
// daily rate, using the flat out-of-town uplift and the duration
// discount held in config.json. See lib/pricingConfig.ts for the
// full rationale on why the uplift is a flat rand amount.
//
//   out_of_town_daily = daily_rate + out_of_town_daily_uplift
//   package_daily     = out_of_town_daily * (1 - discount%)   (rounded to 20)
//   package_price     = package_daily * 7
//   single_day_total  = out_of_town_daily * 7
//   saving            = single_day_total - package_price
//
// Filters out vehicles with no populated daily rate. Sorts ascending
// by seat count so the smallest vehicle appears first.

export interface GardenRouteVehicle {
  slug: string;
  title: string;
  seats: number;
  dailyRateZar: number;
  outOfTownDailyZar: number;
  packageDailyZar: number;
  packagePriceZar: number;
  singleDayTotalZar: number;
  savingZar: number;
  primaryImage: string;
  href: string;
}

function roundToNearest20(n: number): number {
  return Math.round(n / 20) * 20;
}

export const fetchGardenRouteVehicles = cache(_fetchGardenRouteVehicles);

async function _fetchGardenRouteVehicles(): Promise<GardenRouteVehicle[]> {
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

    const uplift = pricingConfig.out_of_town_daily_uplift;
    const discountPct = pricingConfig.garden_route_duration_discount_percent;
    const factor = 1 - discountPct / 100;

    const mapped: (GardenRouteVehicle | null)[] = items.map((item) => {
      const car = item?.car;
      if (!car?.title || !car?.slug) return null;
      const dailyRateZar = parsePrice(car.price);
      if (!dailyRateZar) return null;
      const seats = car.number_of_seats ?? 0;
      const outOfTownDaily = dailyRateZar + uplift;
      const packageDaily = roundToNearest20(outOfTownDaily * factor);
      const packagePrice = packageDaily * 7;
      const singleDayTotal = outOfTownDaily * 7;
      const primaryImage =
        pickFirst(item?.cover_photos) ||
        pickFirst(car.cover_photos) ||
        pickFirst(car.images);

      return {
        slug: car.slug.toLowerCase(),
        title: car.title,
        seats,
        dailyRateZar,
        outOfTownDailyZar: outOfTownDaily,
        packageDailyZar: packageDaily,
        packagePriceZar: packagePrice,
        singleDayTotalZar: singleDayTotal,
        savingZar: singleDayTotal - packagePrice,
        primaryImage,
        href: `/chauffeur-hire/${car.slug.toLowerCase()}`,
      };
    });

    return mapped
      .filter((v): v is GardenRouteVehicle => v !== null)
      .sort((a, b) => a.seats - b.seats);
  } catch {
    return [];
  }
}
