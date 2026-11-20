import type { Metadata, Viewport } from "next";
import { brand } from "../../lib/brand";
import RootShell from "../../components/common/RootShell";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: brand.name,
  description: brand.tagline,
};

export const viewport: Viewport = {
  themeColor: "#0b5b33",
};

export default function EnglishOnlyLayout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="en">{children}</RootShell>;
}
