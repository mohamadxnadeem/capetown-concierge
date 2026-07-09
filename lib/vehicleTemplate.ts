// ─────────────────────────────────────────────────────────────────────
// Single source of truth for vehicle detail pages (/chauffeur-hire/[slug]).
//
// Every SEO-critical field on a vehicle page — title tag, H1, meta
// description, on-page price, image alts, and schema — must be derived
// from the object returned by `buildVehicleData()`. No hand-typed drift
// per vehicle.
//
// The API record from /api/cars-for-hire/all/ is the underlying source
// for name / seats / price / images / features / body. This module wraps
// it and computes every derived SEO field once.
// ─────────────────────────────────────────────────────────────────────

import { brand } from "./brand";

const SITE_URL = brand.siteUrl;

// The Winelands + Garden Route + Western Cape are the additional areas
// served by chauffeur hire beyond Cape Town itself.
export const VEHICLE_AREAS_SERVED = [
  { "@type": "City", name: "Cape Town" },
  { "@type": "AdministrativeArea", name: "Cape Winelands" },
  { "@type": "AdministrativeArea", name: "Garden Route" },
  { "@type": "AdministrativeArea", name: "Western Cape" },
] as const;

// ─── Raw shape returned by the backend ──────────────────────────────

export interface RawVehiclePhoto {
  id?: number;
  cover_photos?: string;
  is_featured?: boolean;
  order?: number;
}

export interface RawVehicle {
  title?: string;
  slug?: string;
  vehicle_type?: string;
  category?: string;
  number_of_seats?: number;
  luggage_capacity?: number;
  price?: string | number;
  price_from?: string | number;
  price_to?: string | number;
  currency?: string;
  features?: string[];
  ideal_for?: string[];
  short_description?: string;
  highlight?: string;
  chauffeur_service_text?: string;
  body?: string;
  cover_photos?: RawVehiclePhoto[];
  images?: RawVehiclePhoto[];
}

// ─── Canonical, derived shape ───────────────────────────────────────

export interface VehicleImage {
  url: string;
  alt: string;
  isFeatured: boolean;
  order: number;
}

export interface VehicleData {
  // ── Identity ──────────────────────────────
  slug: string;              // canonical lowercase
  name: string;              // e.g. "Mercedes V-Class"
  vehicleType: string | null;
  category: string | null;

  // ── Specs (single source: the API record) ──
  seats: number | null;      // if this is wrong, fix it in the CMS
  luggage: number | null;
  dailyRateZar: number | null;
  currency: string;
  features: string[];
  idealFor: string[];
  bodyHtml: string | null;
  shortDescription: string;
  chauffeurServiceText: string | null;

  // ── Computed once, used everywhere ────────
  canonicalUrl: string;
  titleTag: string;          // "{Name} Hire Cape Town | Private Chauffeur & Driver"
  h1: string;                // "{Name} Hire Cape Town"
  metaDescription: string;   // pulls dailyRateZar from same source
  formattedDailyRate: string;   // "R10,175"
  dailyRateLine: string;        // "From R10,175 per day"
  images: VehicleImage[];    // per-image alt built from name + intent
  primaryImage: string;
  longDescriptionParagraphs: string[];  // used when CMS body is empty
}

// ─── Helpers ────────────────────────────────────────────────────────

function toLowerSlug(v?: string | null): string | null {
  return v ? v.trim().toLowerCase() : null;
}

function parsePrice(v: string | number | null | undefined): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

function stripHtml(html?: string | null): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

function computeTitleTag(name: string): string {
  return `${name} Hire Cape Town | Private Chauffeur & Driver`;
}

function computeH1(name: string): string {
  return `${name} Hire Cape Town`;
}

function computeMetaDescription(
  name: string,
  seats: number | null,
  dailyRateZar: number | null
): string {
  const rateStr = dailyRateZar
    ? ` from R${dailyRateZar.toLocaleString()}/day`
    : "";
  const seatsStr = seats ? `, ${seats}-seat` : "";
  const raw = `${name} hire in Cape Town with a private chauffeur${seatsStr}${rateStr}. Airport transfers, full-day hire, executive travel. PDP-licensed drivers, flight tracking, meet-and-greet at CPT. Book on WhatsApp.`;
  return truncate(raw, 160);
}

function computeShortDescription(car: RawVehicle): string {
  const raw =
    car.short_description ||
    car.highlight ||
    stripHtml(car.body || "") ||
    "";
  return raw ? truncate(raw, 220) : "";
}

function buildImageAlt(name: string, indexInGallery: number, isFeatured: boolean): string {
  if (indexInGallery === 0 || isFeatured) {
    return `${name} chauffeur hire in Cape Town — private driver and luxury vehicle`;
  }
  const rotations = [
    `${name} with driver, Cape Town — luxury chauffeur hire`,
    `${name} interior — private chauffeur service in Cape Town`,
    `${name} exterior detail — chauffeur-driven Cape Town hire`,
    `${name} rear view — Cape Town chauffeur with driver`,
    `${name} luxury interior — private chauffeur hire, Cape Town`,
  ];
  return rotations[(indexInGallery - 1) % rotations.length];
}

function buildImages(car: RawVehicle, name: string): VehicleImage[] {
  const arr = (car.cover_photos ?? car.images ?? []).filter(
    (p): p is RawVehiclePhoto & { cover_photos: string } =>
      Boolean(p && p.cover_photos)
  );
  const sorted = [...arr].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const featuredFirst = [
    ...sorted.filter((p) => p.is_featured),
    ...sorted.filter((p) => !p.is_featured),
  ];
  return featuredFirst.map((p, i) => ({
    url: p.cover_photos,
    alt: buildImageAlt(name, i, Boolean(p.is_featured)),
    isFeatured: Boolean(p.is_featured),
    order: p.order ?? i,
  }));
}

function buildLongDescription(
  name: string,
  seats: number | null,
  luggage: number | null,
  vehicleType: string | null
): string[] {
  const seatsStr = seats ? ` with seating for up to ${seats} passengers` : "";
  const luggageStr = luggage ? ` and space for up to ${luggage} bags` : "";
  const typeStr = vehicleType ?? "luxury vehicle";

  return [
    `${name} hire in Cape Town is about more than getting from one place to another. It is about arriving at each destination feeling composed, private, and well looked after. The ${name}${seatsStr}${luggageStr} is chosen by our clients specifically because it combines a commanding road presence with the kind of interior refinement that makes every journey worthwhile.`,
    `Our clients regularly hire the ${name} with a driver for Cape Town International airport transfers, private Cape Peninsula tours, Cape Winelands day hire in Stellenbosch and Franschhoek, and full-day executive travel across the city. Because every ${name} chauffeur hire is entirely private — no shared vehicles, no group schedules — your chauffeur is focused on your comfort and timing from start to finish.`,
    `If you are visiting Cape Town and want a dependable, premium chauffeur-driven ${typeStr}, we can confirm availability and pricing for ${name} hire within 30 minutes on WhatsApp. Same-day bookings are accommodated where possible. We serve clients arriving from the United States, United Kingdom, the Gulf, and across South Africa.`,
  ];
}

// ─── Main builder ────────────────────────────────────────────────────

export function buildVehicleData(car: RawVehicle, slugFromUrl: string): VehicleData {
  const slug = toLowerSlug(car.slug) ?? toLowerSlug(slugFromUrl) ?? "";
  const name = car.title?.trim() || "Luxury Vehicle";
  const vehicleType = car.vehicle_type || null;
  const seats = car.number_of_seats ?? null;
  const luggage = car.luggage_capacity ?? null;
  const dailyRateZar =
    parsePrice(car.price) ?? parsePrice(car.price_from) ?? null;
  const currency = car.currency || "ZAR";
  const features = car.features ?? [];
  const idealFor = car.ideal_for ?? [];
  const bodyHtml = car.body?.trim() ? car.body : null;
  const shortDescription = computeShortDescription(car);
  const chauffeurServiceText = car.chauffeur_service_text?.trim() || null;

  const canonicalUrl = `${SITE_URL}/chauffeur-hire/${slug}`;
  const titleTag = computeTitleTag(name);
  const h1 = computeH1(name);
  const metaDescription = computeMetaDescription(name, seats, dailyRateZar);
  const formattedDailyRate = dailyRateZar
    ? `R${dailyRateZar.toLocaleString()}`
    : "";
  const dailyRateLine = dailyRateZar
    ? `From R${dailyRateZar.toLocaleString()} per day`
    : "";
  const images = buildImages(car, name);
  const primaryImage =
    images.find((im) => im.isFeatured)?.url ?? images[0]?.url ?? "";
  const longDescriptionParagraphs = buildLongDescription(
    name,
    seats,
    luggage,
    vehicleType
  );

  return {
    slug,
    name,
    vehicleType,
    category: car.category || null,
    seats,
    luggage,
    dailyRateZar,
    currency,
    features,
    idealFor,
    bodyHtml,
    shortDescription,
    chauffeurServiceText,
    canonicalUrl,
    titleTag,
    h1,
    metaDescription,
    formattedDailyRate,
    dailyRateLine,
    images,
    primaryImage,
    longDescriptionParagraphs,
  };
}

// ─── FAQ builder driven off the single source ────────────────────────

export interface VehicleFaq {
  question: string;
  answer: string;
}

export function buildVehicleFaqs(vehicle: VehicleData): VehicleFaq[] {
  const { name, seats, dailyRateZar } = vehicle;
  const rateAnswer = dailyRateZar
    ? `${name} chauffeur hire in Cape Town starts from R${dailyRateZar.toLocaleString()} per day. That includes the vehicle, a PDP-licensed chauffeur, fuel, and toll fees. Airport transfers are quoted as a flat fare. Message us on WhatsApp for a tailored quote.`
    : `Pricing for ${name} chauffeur hire depends on your route, duration, and itinerary. Message us on WhatsApp with the dates and route — we come back with a flat quote, usually within 30 minutes.`;

  // Passenger capacity — pulls seats from the vehicle object, so it is
  // consistent with the fleet section and never refers to this vehicle
  // as a separate vehicle.
  const passengerAnswer = seats
    ? `The ${name} comfortably accommodates up to ${seats} passengers with standard luggage. If your group is larger, message us and we'll suggest an alternative vehicle from the fleet.`
    : `The ${name} is set up for private chauffeur hire. If you have a larger party or specific luggage needs, message us and we'll suggest the right vehicle from the fleet.`;

  return [
    {
      question: `How much does ${name} chauffeur hire cost in Cape Town?`,
      answer: rateAnswer,
    },
    {
      question: `Is the ${name} available for airport transfers in Cape Town?`,
      answer: `Yes. The ${name} is one of our most requested vehicles for Cape Town International airport transfers. Your chauffeur tracks your flight in real time, meets you at arrivals with a name board, and loads your luggage straight into the car. Available 24/7.`,
    },
    {
      question: `Can I hire the ${name} for a full day in Cape Town?`,
      answer: `Yes. Full-day ${name} hire is available for city travel, wine routes, meetings, restaurant runs, scenic drives, and bespoke itineraries. The day runs entirely on your schedule with the same driver and vehicle throughout.`,
    },
    {
      question: `Can I use the ${name} for a private Cape Peninsula tour?`,
      answer: `Yes. The ${name} is a strong choice for a private Cape Peninsula day — Chapman's Peak Drive, Hout Bay, Boulders Beach, and Cape Point — entirely at your own pace, with no group schedule.`,
    },
    {
      question: `Can I book the ${name} for a private Winelands day?`,
      answer: `Yes. Many clients hire the ${name} for a private day through the Cape Winelands — Stellenbosch, Franschhoek, and Constantia. Your chauffeur coordinates tastings and restaurant reservations. You control the pace.`,
    },
    {
      question: `How many passengers does the ${name} accommodate?`,
      answer: passengerAnswer,
    },
    {
      question: `How do I book ${name} chauffeur hire?`,
      answer: `Message us on WhatsApp with the dates, arrival time, and any onward schedule. We confirm the driver, the vehicle, and a flat quote in writing — usually within 30 minutes.`,
    },
    {
      question: `What is included with ${name} chauffeur hire?`,
      answer: `Every booking includes the vehicle, a PDP-licensed chauffeur in formal attire, fuel, complimentary bottled water, flight tracking on airport pickups, and a meet-and-greet name board at arrivals. Entrance fees to attractions and gratuities are not included.`,
    },
  ];
}
