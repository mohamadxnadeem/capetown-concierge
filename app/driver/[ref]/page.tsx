import type { Metadata } from "next";
import DriverBookingView from "../../../components/sections/DriverBookingView";
import DriverBookingNotFoundView from "../../../components/sections/DriverBookingNotFoundView";
import { fetchDriverBooking } from "../../../lib/driverBookings";
import { brand } from "../../../lib/brand";

const SITE_URL = brand.siteUrl;

const REFERENCE_PATTERN = /^[A-Za-z0-9-]{4,64}$/;

interface PageProps {
  params: Promise<{ ref: string }>;
}

export const metadata: Metadata = {
  title: `Driver brief | ${brand.name}`,
  description: "Driver brief for an assigned Cape Town Concierge booking.",
  alternates: { canonical: `${SITE_URL}/driver` },
  robots: { index: false, follow: false },
};

export default async function DriverBookingPage({ params }: PageProps) {
  const { ref } = await params;
  const decoded = decodeURIComponent(ref).trim();

  if (!REFERENCE_PATTERN.test(decoded)) {
    return <DriverBookingNotFoundView reference={decoded || "—"} />;
  }

  const result = await fetchDriverBooking(decoded);

  if (result.kind !== "ok") {
    return <DriverBookingNotFoundView reference={decoded.toUpperCase()} />;
  }

  return <DriverBookingView booking={result.booking} />;
}
