import type { Metadata } from "next";
import PrivacyContent from "../../../components/sections/PrivacyContent";
import { brand } from "../../../lib/brand";
import { localizeMetadata } from "../../../lib/i18n/metadata";
import { localeFromParam } from "../../../lib/i18n/config";

const SITE_URL = brand.siteUrl;

const baseMetadata: Metadata = {
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localizeMetadata(baseMetadata, locale, { path: "/privacy" });
}
