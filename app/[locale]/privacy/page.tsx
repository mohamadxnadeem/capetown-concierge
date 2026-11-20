import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/i18n/seo";
import { localeFromParam, type LocaleParams } from "../../../lib/i18n/server";
import PrivacyContent from "../../../components/sections/PrivacyContent";
import { brand } from "../../../lib/brand";

const SITE_URL = brand.siteUrl;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = localeFromParam((await params).locale);
  return pageMetadata(locale, "/privacy", "privacy");
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
