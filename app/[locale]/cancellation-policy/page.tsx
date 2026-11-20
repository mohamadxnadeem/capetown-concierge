import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/i18n/seo";
import { localeFromParam, type LocaleParams } from "../../../lib/i18n/server";
import CancellationPolicyContent from "../../../components/sections/CancellationPolicyContent";
import { brand } from "../../../lib/brand";

const SITE_URL = brand.siteUrl;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = localeFromParam((await params).locale);
  return pageMetadata(locale, "/cancellation-policy", "cancellation");
}

export default function CancellationPolicyPage() {
  return <CancellationPolicyContent />;
}
