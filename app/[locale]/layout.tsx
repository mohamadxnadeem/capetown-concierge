import type { Metadata, Viewport } from "next";

import { brand } from "../../lib/brand";
import SiteDocument from "../../components/common/SiteDocument";
import { LOCALES, LOCALE_PARAM, localeFromParam } from "../../lib/i18n/config";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: brand.name,
  description: brand.tagline,
};

export const viewport: Viewport = {
  themeColor: "#0b5b33",
};

export function generateStaticParams() {
  return LOCALES.map((l) => ({ locale: LOCALE_PARAM[l] }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return <SiteDocument locale={localeFromParam(locale)}>{children}</SiteDocument>;
}
