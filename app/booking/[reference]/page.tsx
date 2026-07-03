import type { Metadata } from "next";
import BookingDetailView from "../../../components/sections/BookingDetailView";
import BookingNotFoundView from "../../../components/sections/BookingNotFoundView";
import {
  fetchBookingByReference,
  fetchUpsellTours,
} from "../../../lib/bookings";
import { fetchUpsellVehicles } from "../../../lib/vehicles";
import { brand } from "../../../lib/brand";

const SITE_URL = brand.siteUrl;
const FALLBACK_OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

const REFERENCE_PATTERN = /^[A-Za-z0-9-]{4,64}$/;

interface PageProps {
  params: Promise<{ reference: string }>;
}

function pickCoverImage(
  photos:
    | { cover_photos: string; is_featured?: boolean; order?: number }[]
    | undefined
): string | null {
  if (!photos?.length) return null;
  const valid = photos.filter((p) => Boolean(p?.cover_photos));
  if (!valid.length) return null;
  const sorted = [...valid].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (
    sorted.find((p) => p.is_featured)?.cover_photos ?? sorted[0].cover_photos
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { reference } = await params;
  const decoded = decodeURIComponent(reference).trim();

  const baseMeta: Metadata = {
    title: "Booking | Cape Town Concierge",
    description:
      "Your Cape Town Concierge booking details — vehicle, dates, pickup, and driver contact.",
    alternates: { canonical: `${SITE_URL}/booking` },
    robots: { index: false, follow: false },
  };

  if (!REFERENCE_PATTERN.test(decoded)) return baseMeta;

  const result = await fetchBookingByReference(decoded);
  if (result.kind !== "ok") return baseMeta;

  const { booking } = result;
  const carTitle = booking.car?.title;
  const carImage = pickCoverImage(booking.car?.cover_photos) ?? FALLBACK_OG_IMAGE;

  const title = carTitle
    ? `${carTitle} — Booking ${booking.booking_reference} | ${brand.name}`
    : `Booking ${booking.booking_reference} | ${brand.name}`;

  const description = carTitle
    ? `Your ${carTitle} chauffeur booking with ${brand.name}. Tap to view trip details, pickup, and driver contact.`
    : `Your ${brand.name} booking details — vehicle, dates, pickup, and driver contact.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/booking` },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/booking/${booking.booking_reference}`,
      siteName: brand.name,
      type: "website",
      locale: "en_ZA",
      images: [
        {
          url: carImage,
          alt: carTitle
            ? `${carTitle} — booked through ${brand.name}`
            : brand.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [carImage],
    },
  };
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

  // Photos are embedded on booking.car.cover_photos. The customer endpoint
  // ignores is_public, so this works for hidden vehicles too.
  const carPhotos =
    booking.car?.cover_photos?.filter((p) => p?.cover_photos) ?? [];

  const hasVehicle = Boolean(booking.car);
  const hasAccommodation =
    (booking.accommodation_segments?.length ?? 0) > 0 ||
    Boolean(booking.villa);

  // Chauffeur upsell only renders for accommodation-only bookings.
  const featuredVehicles =
    hasAccommodation && !hasVehicle ? await fetchUpsellVehicles(8) : [];

  const upsellTours = await fetchUpsellTours(6);

  return (
    <BookingDetailView
      booking={booking}
      carPhotos={carPhotos}
      upsellTours={upsellTours}
      hasVehicle={hasVehicle}
      hasAccommodation={hasAccommodation}
      featuredVehicles={featuredVehicles}
    />
  );
}
