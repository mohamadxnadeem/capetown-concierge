import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BookingConfirmationView from "../../../components/sections/booking/BookingConfirmationView";
import {
  API_BASE,
  fetchBooking,
  getBookingCoverPhoto,
} from "../../../components/sections/booking/data";
import FeaturedExperiences from "../../../components/sections/FeaturedExperiences";
import { brand } from "../../../lib/brand";

type PageProps = {
  params: Promise<{ booking_reference: string }>;
};

// Make sure no part of the route is statically prerendered — bookings
// change in the admin app and clients must see the latest state.
export const dynamic = "force-dynamic";

// Fallback metadata. Booking pages are noindex, but social platforms
// (WhatsApp, Twitter, iMessage…) still scrape OG/Twitter tags to render
// link previews — that's the case we want the vehicle photo for.
const DEFAULT_OG_IMAGE = `${brand.siteUrl}/images/og-cape-town-concierge.jpg`;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { booking_reference } = await params;
  // Deduped via React `cache` — the same fetch also runs in the page.
  const booking = await fetchBooking(booking_reference);

  const baseMeta: Metadata = {
    title: `Your booking — ${brand.name}`,
    description: "Your private chauffeur booking with Cape Town Concierge.",
    // Personal data on the page — never index, never follow.
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
  };

  if (!booking) {
    return baseMeta;
  }

  const vehicleTitle = booking.car?.title || "your booking";
  const coverPhoto = getBookingCoverPhoto(booking.car?.cover_photos);
  const previewImage = coverPhoto || DEFAULT_OG_IMAGE;
  const previewAlt = coverPhoto
    ? `${vehicleTitle} — ${brand.name}`
    : `${brand.name} — Luxury Chauffeur Service`;

  // Keep social preview text generic (vehicle + brand) so PII like the
  // customer name doesn't leak into WhatsApp link previews if the
  // recipient forwards the link.
  const previewTitle = `Your booking · ${vehicleTitle}`;
  const previewDescription = `Booking details for your chauffeur service with ${brand.name}.`;

  return {
    ...baseMeta,
    title: previewTitle,
    description: previewDescription,
    openGraph: {
      title: previewTitle,
      description: previewDescription,
      siteName: brand.name,
      type: "website",
      locale: "en_ZA",
      images: [
        {
          url: previewImage,
          alt: previewAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: previewTitle,
      description: previewDescription,
      images: [previewImage],
    },
  };
}

// Upsell — same shape used by the existing tours grid.
type ExperiencePhoto = {
  cover_photos: string;
  is_featured: boolean;
  order: number;
};

type Experience = {
  id: number;
  title?: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  cover_photos?: ExperiencePhoto[];
  price?: string | number;
};

type ExperienceApiItem = { experience?: Experience } & Partial<Experience>;

type FeaturedExperienceItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

async function fetchUpsellExperiences(): Promise<FeaturedExperienceItem[]> {
  try {
    // Same endpoint the existing tours grid uses on /private-tours.
    const res = await fetch(`${API_BASE}/api/experiences/all/`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data: ExperienceApiItem[] = await res.json();

    return (data
      .map((item) => {
        const exp = item?.experience || item;
        if (!exp?.title) return null;

        const featuredPhoto =
          exp.cover_photos?.find((p) => p.is_featured)?.cover_photos ||
          exp.cover_photos?.[0]?.cover_photos ||
          "";

        const plainText = stripHtml(exp.body || "");
        const description =
          exp.short_description ||
          exp.highlight ||
          truncateText(plainText, 140) ||
          "Discover a premium private tour experience in Cape Town.";

        return {
          title: exp.title,
          description,
          href: exp.slug ? `/private-tours/${exp.slug}` : "/private-tours",
          image: featuredPhoto,
          alt: `Private ${exp.title} Cape Town with professional chauffeur`,
        };
      }) as Array<FeaturedExperienceItem | null>)
      .filter((item): item is FeaturedExperienceItem => item !== null)
      .slice(0, 4);
  } catch {
    return [];
  }
}

export default async function BookingConfirmationPage({ params }: PageProps) {
  const { booking_reference } = await params;

  const [booking, experiences] = await Promise.all([
    fetchBooking(booking_reference),
    fetchUpsellExperiences(),
  ]);

  if (!booking) {
    notFound();
  }

  return (
    <>
      <BookingConfirmationView booking={booking} />

      {experiences.length > 0 ? (
        <FeaturedExperiences
          eyebrow="You might also enjoy"
          title="More ways to explore Cape Town"
          description="A few of our most-loved private tours — speak to us on WhatsApp if anything catches your eye."
          items={experiences}
        />
      ) : null}
    </>
  );
}
