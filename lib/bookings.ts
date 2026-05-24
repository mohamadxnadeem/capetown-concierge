import { BACKEND_URL } from "./api";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type BookingDayType = "full_day" | "half_day";

export interface BookingDay {
  id: number;
  date: string;
  day_type: BookingDayType;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
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
  features: string[];
  ideal_for: string[];
  driver: BookingDriver | null;
  registration_number?: string | null;
  is_active?: boolean;
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
}

export type BookingLookupResult =
  | { kind: "ok"; booking: Booking }
  | { kind: "not_found" }
  | { kind: "error"; message: string };

export async function fetchBookingByReference(
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
