import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BookingConfirmationView from "../../../components/sections/booking/BookingConfirmationView";
import type { Booking } from "../../../components/sections/booking/types";
import FeaturedExperiences from "../../../components/sections/FeaturedExperiences";
import { brand } from "../../../lib/brand";

// The booking endpoint is public (no auth). API base is configurable via
// NEXT_PUBLIC_API_BASE_URL with a fallback to the production Railway host
// hardcoded across the rest of the site.
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "https://web-production-1ab9.up.railway.app";

type PageProps = {
  params: Promise<{ booking_reference: string }>;
};

// Booking pages contain personal data (customer name, phone, email) and
// must never be indexed.
export const metadata: Metadata = {
  title: `Your booking — ${brand.name}`,
  description: "Your private chauffeur booking with Cape Town Concierge.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

// Make sure no part of the route is statically prerendered — bookings
// change in the admin app and clients must see the latest state.
export const dynamic = "force-dynamic";

async function fetchBooking(ref: string): Promise<Booking | null> {
  try {
    const res = await fetch(`${API_BASE}/api/client/bookings/${encodeURIComponent(ref)}/`, {
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    return (await res.json()) as Booking;
  } catch {
    return null;
  }
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
