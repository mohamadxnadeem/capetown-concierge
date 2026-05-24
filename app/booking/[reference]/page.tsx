import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingConfirmationContent from "../../../components/sections/BookingConfirmationContent";
import { brand } from "../../../lib/brand";

const SITE_URL = brand.siteUrl;

const REFERENCE_PATTERN = /^[A-Za-z0-9-]{4,64}$/;

export const metadata: Metadata = {
  title: "Booking Confirmation | Cape Town Concierge",
  description:
    "Your Cape Town Concierge booking is confirmed. Keep your reference handy and message us anytime for full trip details.",
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
    notFound();
  }

  return <BookingConfirmationContent reference={decoded.toUpperCase()} />;
}
