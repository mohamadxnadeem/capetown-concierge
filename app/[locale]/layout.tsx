import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { brand } from "../../lib/brand";
import RootShell from "../../components/common/RootShell";
import { localeFromPrefix } from "../../lib/i18n/config";
import { localeParams } from "../../lib/i18n/server";
import { DEFAULT_LOCALE } from "../../lib/i18n/config";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: brand.name,
  description: brand.tagline,
};

export const viewport: Viewport = {
  themeColor: "#0b5b33",
};

export function generateStaticParams() {
  return localeParams();
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: param } = await params;
  const locale = param === "en" ? DEFAULT_LOCALE : localeFromPrefix(param);
  if (!locale) notFound();
  return <RootShell locale={locale}>{children}</RootShell>;
}
