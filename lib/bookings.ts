import { cache } from "react";
import { BACKEND_URL } from "./api";
import type { CarPhoto } from "../components/sections/chauffeur-services/types";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type BookingDayType = "full_day" | "half_day";

export interface BookingDay {
  id: number;
  date: string;
  day_type: BookingDayType;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
  client_rate?: string | null;
}

export interface BookingDriver {
  id: number;
  full_name: string;
  phone: string | null;
  whatsapp: string | null;
  default_daily_rate?: string;
  is_active?: boolean;
}

export interface BookingCar {
  id: number;
  title: string;
  slug: string;
  number_of_seats: number | null;
  vehicle_type: string | null;
  short_description: string | null;
  highlight: string | null;
  chauffeur_service_text: string | null;
  luggage_capacity: number | null;
  price: string | null;
  price_from: string | null;
  price_to: string | null;
  currency: string;
  features: string[];
  ideal_for: string[];
  driver: BookingDriver | null;
  registration_number?: string | null;
  is_active?: boolean;
  cover_photos?: CarPhoto[];
}

export interface Booking {
  id: number;
  booking_reference: string;
  title: string | null;
  status: BookingStatus;
  car: BookingCar | null;
  driver: BookingDriver | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  pickup_location: string | null;
  dropoff_location: string | null;
  trip_description: string | null;
  days: BookingDay[];
  total_days: number;
  is_multi_day: boolean;
  created_at: string;
  total_client_amount?: string | null;
}

export type BookingLookupResult =
  | { kind: "ok"; booking: Booking }
  | { kind: "not_found" }
  | { kind: "error"; message: string };

export interface UpsellTour {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  priceUsd?: number;
}

interface ExperiencePhoto {
  cover_photos?: string;
  is_featured?: boolean;
}
interface ExperienceCore {
  title?: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  cover_photos?: ExperiencePhoto[];
  price?: string | number;
}
interface ExperienceApiItem {
  experience?: ExperienceCore;
  title?: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  cover_photos?: ExperiencePhoto[];
  price?: string | number;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncate(text: string, max: number): string {
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

export async function fetchUpsellTours(limit = 6): Promise<UpsellTour[]> {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/experiences/all/`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data: ExperienceApiItem[] = await res.json();

    const mapped = data
      .map((item) => item?.experience || item)
      .filter((exp): exp is ExperienceCore => Boolean(exp?.title))
      .map<UpsellTour>((exp) => {
        const featured =
          exp.cover_photos?.find((p) => p.is_featured)?.cover_photos ||
          exp.cover_photos?.[0]?.cover_photos ||
          "";
        const description =
          exp.short_description ||
          exp.highlight ||
          truncate(stripHtml(exp.body || ""), 140) ||
          "Discover a premium private tour in Cape Town.";
        const priceUsd = exp.price
          ? Number(String(exp.price).replace(/[^0-9.]/g, "")) || undefined
          : undefined;
        return {
          title: exp.title!,
          description,
          href: exp.slug ? `/tours/${exp.slug}` : "/tours",
          image: featured,
          alt: `Private ${exp.title} in Cape Town with Professional Driver`,
          priceUsd,
        };
      });

    return mapped.slice(0, limit);
  } catch {
    return [];
  }
}

export const fetchBookingByReference = cache(_fetchBookingByReference);

async function _fetchBookingByReference(
  reference: string
): Promise<BookingLookupResult> {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/client/bookings/${encodeURIComponent(reference)}/`,
      { cache: "no-store" }
    );

    if (res.status === 404) {
      return { kind: "not_found" };
    }
    if (!res.ok) {
      return { kind: "error", message: `Server responded with ${res.status}` };
    }

    const booking = (await res.json()) as Booking;
    return { kind: "ok", booking };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { kind: "error", message };
  }
}
