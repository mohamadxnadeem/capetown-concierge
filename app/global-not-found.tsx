import type { Metadata, Viewport } from "next";

import { brand } from "../lib/brand";
import SiteDocument from "../components/common/SiteDocument";
import NotFound from "./[locale]/not-found";

// Unmatched URLs have no locale segment, so this renders the English 404
// inside the same site shell (header, footer) that the old root not-found used.
export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: brand.name,
  description: brand.tagline,
};

export const viewport: Viewport = {
  themeColor: "#0b5b33",
};

export default function GlobalNotFound() {
  return (
    <SiteDocument locale="en">
      <NotFound />
    </SiteDocument>
  );
}
