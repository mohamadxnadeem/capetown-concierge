import { endpoints } from "./api";
import { vehicleHref } from "./seo";

/**
 * Homepage data helpers. Vehicles and tours come from the existing public API
 * only. Nothing is hardcoded: if the API fails the homepage shows no cards.
 * Tour prices from the database are never used; tours are priced at the
 * lowest active vehicle day rate.
 */

type Photo = { cover_photos?: string; is_featured?: boolean; order?: number };

type RawCar = {
  title?: string;
  slug?: string;
  price?: string | number;
  number_of_seats?: number;
  luggage_capacity?: number;
  is_active?: boolean;
  cover_photos?: Photo[];
  homepage_featured?: boolean;
  homepage_order?: number;
  short_description?: string;
};

type RawStop = { title?: string; order?: number; stop_type?: string };

type RawTour = {
  title?: string;
  slug?: string;
  duration?: string;
  short_description?: string;
  card_summary?: string;
  cover_photos?: Photo[];
  stops?: RawStop[];
  homepage_featured?: boolean;
  homepage_order?: number;
};

export type HomeVehicle = {
  title: string;
  href: string;
  image: string;
  alt: string;
  seats?: number;
  luggage?: number;
  price?: number;
  description: string;
};

export type HomeTour = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  duration: string;
  highlights: string[];
};

export type HomepageData = {
  vehicles: HomeVehicle[];
  tours: HomeTour[];
  lowestVehiclePrice?: number;
  /** Vehicle photos for the hero, with unique alt text. */
  heroImages: { src: string; alt: string }[];
  /** Titles that were changed for display. */
  cleanedTitles: { from: string; to: string }[];
};

async function getJson(url: string, revalidate: number): Promise<unknown[]> {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return [];
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
  } catch {
    return [];
  }
}

function pickPhoto(photos: Photo[] | undefined): string {
  const usable = (photos || []).filter(
    (p) => p?.cover_photos && !/\.heic($|\?)/i.test(p.cover_photos)
  );
  if (!usable.length) return "";
  const featured = usable.find((p) => p.is_featured);
  if (featured) return featured.cover_photos as string;
  const sorted = [...usable].sort(
    (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER)
  );
  return sorted[0].cover_photos as string;
}

function toNumber(v: unknown): number | undefined {
  if (v === undefined || v === null || v === "") return undefined;
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/** Display name only: drops "Luxury", "VIP Transport", trailing "with driver" / "for hire". */
export function cleanVehicleTitle(title: string): string {
  return title
    .replace(/\b(luxury|vip transport|vip)\b/gi, "")
    .replace(/\s+(with (a )?(chauffeur|driver)|for hire)\s*$/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Hours from text such as "8 hours", "8 Hours", "Full day", "2 days". */
export function parseDurationHours(duration: string | undefined): number {
  if (!duration) return 0;
  const text = duration.toLowerCase();
  const num = text.match(/(\d+(?:\.\d+)?)/);
  if (/day/.test(text) && !/hour/.test(text)) return (num ? Number(num[1]) : 1) * 8;
  return num ? Number(num[1]) : 0;
}

export function tourDisplayName(title: string): string {
  return title.split(" | ")[0].trim();
}

const SKIP_STOP = /pick-?up|drop-?off|drop off|\breturn\b|back at your/i;

export function tourHighlights(stops: RawStop[] | undefined, max = 3): string[] {
  return [...(stops || [])]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .filter((s) => s.title && s.stop_type !== "pickup" && s.stop_type !== "optional")
    .filter((s) => !SKIP_STOP.test(s.title as string))
    .map((s) =>
      (s.title as string)
        .replace(/^(around\s+)?\d{1,2}h\d{2}\s*:\s*/i, "")
        .replace(/[.\s]+$/, "")
        .trim()
    )
    .filter(Boolean)
    .slice(0, max);
}

function byHomepageOrder<T extends { homepage_order?: number }>(a: T, b: T) {
  return (a.homepage_order ?? 0) - (b.homepage_order ?? 0);
}

export async function fetchHomepageData(): Promise<HomepageData> {
  const [carItems, tourItems] = await Promise.all([
    getJson(endpoints.carsForHire.allPublic(), 300),
    getJson(endpoints.experiences.all(), 300),
  ]);

  const cars = (carItems as { car?: RawCar; cover_photos?: Photo[] }[])
    .map((item) => {
      const car = (item?.car || item) as RawCar;
      return { ...car, cover_photos: car.cover_photos?.length ? car.cover_photos : item?.cover_photos };
    })
    .filter((c) => c.title && c.slug && c.is_active !== false);

  const tours = (tourItems as { experience?: RawTour; cover_photos?: Photo[] }[])
    .map((item) => {
      const t = (item?.experience || item) as RawTour;
      return { ...t, cover_photos: t.cover_photos?.length ? t.cover_photos : item?.cover_photos };
    })
    .filter((t) => t.title && t.slug);

  // Lowest active vehicle day rate: the "from" price for every tour.
  const prices = cars.map((c) => toNumber(c.price)).filter((p): p is number => Boolean(p));
  const lowestVehiclePrice = prices.length ? Math.round(Math.min(...prices)) : undefined;

  // Vehicles: show EVERY active vehicle (King Mo, 2026-11-15).
  // Order: featured vehicles first by homepage_order, then the rest by day rate, highest first.
  const byPriceDesc = (a: RawCar, b: RawCar) => (toNumber(b.price) ?? 0) - (toNumber(a.price) ?? 0);
  const chosenCars = [
    ...cars.filter((c) => c.homepage_featured === true).sort((a, b) => byHomepageOrder(a, b) || byPriceDesc(a, b)),
    ...cars.filter((c) => c.homepage_featured !== true).sort(byPriceDesc),
  ];

  const cleanedTitles: { from: string; to: string }[] = [];
  const vehicles: HomeVehicle[] = chosenCars.map((c) => {
    const title = cleanVehicleTitle(c.title as string);
    if (title !== c.title) cleanedTitles.push({ from: c.title as string, to: title });
    return {
      title,
      href: vehicleHref(c.slug),
      image: pickPhoto(c.cover_photos),
      alt: `${title} chauffeur Cape Town, private chauffeur vehicle`,
      seats: c.number_of_seats || undefined,
      luggage: c.luggage_capacity ?? undefined,
      price: toNumber(c.price),
      description: (c.short_description || "").trim(),
    };
  });

  // Tours: homepage flags AND 8 hours or more. Fallback: all tours of 8 hours or more.
  const hasTourFlags = tours.some((t) => t.homepage_featured !== undefined);
  const chosenTours = (
    hasTourFlags ? tours.filter((t) => t.homepage_featured === true).sort(byHomepageOrder) : tours
  ).filter((t) => parseDurationHours(t.duration) >= 8);

  const homeTours: HomeTour[] = chosenTours.map((t) => {
    const name = tourDisplayName(t.title as string);
    return {
      title: name,
      description: (t.card_summary || "").trim() || (t.short_description || "").trim(),
      href: `/tours/${(t.slug as string).trim()}`,
      image: pickPhoto(t.cover_photos),
      alt: `${name}, a private full-day tour from Cape Town with your chauffeur guide`,
      duration: (t.duration || "").trim(),
      highlights: tourHighlights(t.stops),
    };
  });

  // Hero rotation: vehicle photos only (King Mo, 2026-11-15), in homepage order.
  const heroImages = vehicles
    .filter((v) => v.image)
    .map((v) => ({ src: v.image, alt: `${v.title} waiting for guests with a private chauffeur in Cape Town` }));

  return { vehicles, tours: homeTours, lowestVehiclePrice, heroImages, cleanedTitles };
}
