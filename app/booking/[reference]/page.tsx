import type { Metadata } from "next";
import BookingDetailView from "../../../components/sections/BookingDetailView";
import BookingNotFoundView from "../../../components/sections/BookingNotFoundView";
import {
  fetchBookingByReference,
  fetchCarPhotosBySlug,
  fetchUpsellTours,
} from "../../../lib/bookings";
import { brand } from "../../../lib/brand";

const SITE_URL = brand.siteUrl;

const REFERENCE_PATTERN = /^[A-Za-z0-9-]{4,64}$/;

export const metadata: Metadata = {
  title: "Booking | Cape Town Concierge",
  description:
    "Your Cape Town Concierge booking details — vehicle, dates, pickup, and driver contact.",
  alternates: {
    canonical: `${SITE_URL}/booking`,
  },
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ reference: string }>;
}

export default async function BookingPage({ params }: PageProps) {
  const { reference } = await params;
  const decoded = decodeURIComponent(reference).trim();

  if (!REFERENCE_PATTERN.test(decoded)) {
    return <BookingNotFoundView reference={decoded || "—"} />;
  }

  const result = await fetchBookingByReference(decoded);

  if (result.kind !== "ok") {
    return <BookingNotFoundView reference={decoded.toUpperCase()} />;
  }

  const { booking } = result;

  // Prefer photos embedded in the booking response (the customer endpoint
  // ignores is_public, so this works for hidden vehicles too). Fall back to
  // the public car list only if the booking doesn't include any photos.
  const embeddedPhotos =
    (booking.car?.cover_photos?.filter((p) => p?.cover_photos) ?? []).length > 0
      ? booking.car!.cover_photos!.filter((p) => p?.cover_photos)
      : (booking.cover_photos?.filter((p) => p?.cover_photos) ?? []);

  const [fallbackPhotos, upsellTours] = await Promise.all([
    embeddedPhotos.length === 0 && booking.car?.slug
      ? fetchCarPhotosBySlug(booking.car.slug)
      : Promise.resolve([]),
    fetchUpsellTours(6),
  ]);

  const carPhotos =
    embeddedPhotos.length > 0 ? embeddedPhotos : fallbackPhotos;

  return (
    <BookingDetailView
      booking={booking}
      carPhotos={carPhotos}
      upsellTours={upsellTours}
    />
  );
}
