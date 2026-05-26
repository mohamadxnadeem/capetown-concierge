import { cache } from "react";
import { BACKEND_URL } from "./api";

export type DriverBookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

export interface DriverBookingDay {
  date: string;
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
  day_type_display: string;
  driver_rate: string | null;
}

export interface DriverBookingPhoto {
  cover_photos: string;
  is_featured?: boolean;
}

export interface DriverBookingCar {
  id: number;
  title: string;
  registration_number: string | null;
  cover_photos: DriverBookingPhoto[];
}

export interface DriverBookingDriver {
  full_name: string;
  whatsapp: string | null;
}

export interface DriverBooking {
  booking_reference: string;
  status: DriverBookingStatus;
  status_display: string;
  car: DriverBookingCar | null;
  driver: DriverBookingDriver | null;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  pickup_location: string | null;
  dropoff_location: string | null;
  trip_description: string | null;
  days: DriverBookingDay[];
  total_days: number;
  start_date: string | null;
  end_date: string | null;
  total_driver_amount: string | null;
}

export type DriverBookingResult =
  | { kind: "ok"; booking: DriverBooking }
  | { kind: "not_found" }
  | { kind: "error"; message: string };

export const fetchDriverBooking = cache(_fetchDriverBooking);

async function _fetchDriverBooking(
  reference: string
): Promise<DriverBookingResult> {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/public/bookings/${encodeURIComponent(reference)}/driver/`,
      { cache: "no-store" }
    );

    if (res.status === 404) {
      return { kind: "not_found" };
    }
    if (!res.ok) {
      return { kind: "error", message: `Server responded with ${res.status}` };
    }

    const booking = (await res.json()) as DriverBooking;
    return { kind: "ok", booking };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { kind: "error", message };
  }
}
