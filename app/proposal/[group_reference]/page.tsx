import type { Metadata } from "next";
import ProposalDetailView from "../../../components/sections/ProposalDetailView";
import ProposalNotFoundView from "../../../components/sections/ProposalNotFoundView";
import {
  fetchBookingGroupByReference,
  type BookingGroup,
  type BookingPhoto,
} from "../../../lib/bookings";
import { brand } from "../../../lib/brand";

const SITE_URL = brand.siteUrl;
const FALLBACK_OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

const REFERENCE_PATTERN = /^[A-Za-z0-9-]{4,64}$/;

interface PageProps {
  params: Promise<{ group_reference: string }>;
}

function pickCoverImage(photos: BookingPhoto[] | null | undefined): string | null {
  if (!photos?.length) return null;
  const valid = photos.filter((p) => Boolean(p?.cover_photos));
  if (!valid.length) return null;
  const sorted = [...valid].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (
    sorted.find((p) => p.is_featured)?.cover_photos ?? sorted[0].cover_photos ?? null
  );
}

function pickHeroImage(group: BookingGroup): string | null {
  for (const b of group.bookings) {
    const p = pickCoverImage(b.car?.cover_photos ?? null);
    if (p) return p;
  }
  return null;
}

function summariseDateRange(group: BookingGroup): string {
  const dates: string[] = [];
  group.bookings.forEach((b) => {
    b.days.forEach((d) => {
      if (d.date) dates.push(d.date);
    });
    b.accommodation_segments.forEach((s) => {
      if (s.start_date) dates.push(s.start_date);
      if (s.end_date) dates.push(s.end_date);
    });
  });
  if (!dates.length) return "";
  const sorted = [...dates].sort();
  return `${sorted[0]} to ${sorted[sorted.length - 1]}`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { group_reference } = await params;
  const decoded = decodeURIComponent(group_reference).trim();

  const baseMeta: Metadata = {
    title: "Booking | Cape Town Concierge",
    description: `${brand.name} booking confirmation`,
    alternates: { canonical: `${SITE_URL}/proposal` },
    robots: { index: false, follow: false },
  };

  if (!REFERENCE_PATTERN.test(decoded)) return baseMeta;

  const result = await fetchBookingGroupByReference(decoded);
  if (result.kind !== "ok") return baseMeta;

  const { group } = result;
  const vehicleCount = group.bookings.filter((b) => b.car).length;
  const dateRange = summariseDateRange(group);
  const description = `${brand.name} booking, ${vehicleCount || group.bookings.length} vehicle${
    vehicleCount === 1 ? "" : "s"
  }${dateRange ? `, ${dateRange}` : ""}`;

  const heroImage = pickHeroImage(group) ?? FALLBACK_OG_IMAGE;

  return {
    title: group.title,
    description,
    alternates: { canonical: `${SITE_URL}/proposal/${group.group_reference}` },
    robots: { index: false, follow: false },
    openGraph: {
      title: group.title,
      description,
      url: `${SITE_URL}/proposal/${group.group_reference}`,
      siteName: brand.name,
      type: "website",
      locale: "en_ZA",
      images: [
        {
          url: heroImage,
          alt: group.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: group.title,
      description,
      images: [heroImage],
    },
  };
}

export default async function ProposalPage({ params }: PageProps) {
  const { group_reference } = await params;
  const decoded = decodeURIComponent(group_reference).trim();

  if (!REFERENCE_PATTERN.test(decoded)) {
    return <ProposalNotFoundView reference={decoded || "unknown"} />;
  }

  const result = await fetchBookingGroupByReference(decoded);

  if (result.kind !== "ok") {
    return <ProposalNotFoundView reference={decoded.toUpperCase()} />;
  }

  return <ProposalDetailView group={result.group} />;
}
