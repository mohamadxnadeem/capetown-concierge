import { cache } from "react";

import type { Booking, BookingCarPhoto } from "./types";

// Configurable per environment; defaults to the production Railway host
// hardcoded elsewhere on the site.
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://web-production-1ab9.up.railway.app";

// React `cache` so the page handler and generateMetadata share a single
// fetch per request — even with `cache: 'no-store'`, both call sites
// resolve to one round trip.
export const fetchBooking = cache(
  async (ref: string): Promise<Booking | null> => {
    try {
      const res = await fetch(
        `${API_BASE}/api/client/bookings/${encodeURIComponent(ref)}/`,
        { cache: "no-store" }
      );
      if (res.status === 404) return null;
      if (!res.ok) return null;
      return (await res.json()) as Booking;
    } catch {
      return null;
    }
  }
);

export function getBookingCoverPhoto(
  photos?: BookingCarPhoto[]
): string | null {
  if (!photos || photos.length === 0) return null;
  const sorted = [...photos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const featured = sorted.find((p) => p.is_featured);
  return (featured?.cover_photos || sorted[0]?.cover_photos) ?? null;
}
