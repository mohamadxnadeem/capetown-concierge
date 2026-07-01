import type { Metadata } from "next";
import CancellationPolicyContent from "../../components/sections/CancellationPolicyContent";
import { brand } from "../../lib/brand";

const SITE_URL = brand.siteUrl;

export const metadata: Metadata = {
  title: "Cancellation Policy | Cape Town Concierge",
  description:
    "Cape Town Concierge cancellation policy for chauffeur hire, airport transfers, day tours, and villa/hotel stays — timelines, refunds, and how to change your booking.",
  alternates: {
    canonical: `${SITE_URL}/cancellation-policy`,
  },
  robots: { index: true, follow: true },
};

export default function CancellationPolicyPage() {
  return <CancellationPolicyContent />;
}
