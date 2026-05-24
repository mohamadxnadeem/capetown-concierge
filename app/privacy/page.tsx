import type { Metadata } from "next";
import PrivacyContent from "../../components/sections/PrivacyContent";
import { brand } from "../../lib/brand";

const SITE_URL = brand.siteUrl;

export const metadata: Metadata = {
  title: "Privacy Policy | Cape Town Concierge",
  description:
    "How Cape Town Concierge collects, uses, and protects your personal information under the Protection of Personal Information Act (POPIA).",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
