import type { Metadata } from "next";
import BookingInvoiceView from "../../../../components/sections/BookingInvoiceView";
import BookingNotFoundView from "../../../../components/sections/BookingNotFoundView";
import { fetchBookingByReference } from "../../../../lib/bookings";
import { brand } from "../../../../lib/brand";

const SITE_URL = brand.siteUrl;

const REFERENCE_PATTERN = /^[A-Za-z0-9-]{4,64}$/;

export const metadata: Metadata = {
  title: "Booking Confirmation | Cape Town Concierge",
  description:
    "Printable booking confirmation from Cape Town Concierge.",
  alternates: {
    canonical: `${SITE_URL}/booking`,
  },
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ reference: string }>;
}

export default async function BookingInvoicePage({ params }: PageProps) {
  const { reference } = await params;
  const decoded = decodeURIComponent(reference).trim();

  if (!REFERENCE_PATTERN.test(decoded)) {
    return <BookingNotFoundView reference={decoded || "—"} />;
  }

  const result = await fetchBookingByReference(decoded);

  if (result.kind !== "ok") {
    return <BookingNotFoundView reference={decoded.toUpperCase()} />;
  }

  return <BookingInvoiceView booking={result.booking} />;
}
