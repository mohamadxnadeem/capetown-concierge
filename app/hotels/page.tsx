import type { Metadata } from "next";
import HotelsLandingPage from "../../components/sections/hotels/HotelsLandingPage";
import { fetchHotels } from "../../lib/hotels";
import { brand } from "../../lib/brand";

const SITE_URL = brand.siteUrl;
const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

const HOTELS_META_DESCRIPTION =
  "Hand-picked 5-star hotels, boutique stays, and country retreats across Cape Town, Camps Bay, the V&A Waterfront, Franschhoek and Stellenbosch.";

// Dynamic metadata: while the hotels DB is empty we serve noindex so
// Google doesn't see a thin-content page. Once records are added the
// same page auto-flips to indexable, no code change needed.
export async function generateMetadata(): Promise<Metadata> {
  const hotels = await fetchHotels().catch(() => []);
  const hasContent = hotels.length > 0;

  return {
    title: "Luxury Hotels in Cape Town | Cape Town Concierge",
    description: HOTELS_META_DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/hotels` },
    keywords: [
      "luxury hotels Cape Town",
      "5 star hotel Cape Town",
      "V&A Waterfront hotel",
      "Camps Bay hotel",
      "Franschhoek hotel",
      "Stellenbosch hotel",
      "boutique hotel Cape Town",
    ],
    robots: hasContent
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : {
          index: false,
          follow: true,
        },
    openGraph: {
      title: "Luxury Hotels in Cape Town | Cape Town Concierge",
      description:
        "A curated selection of 5-star hotels and boutique stays across Cape Town and the Winelands.",
      url: `${SITE_URL}/hotels`,
      siteName: brand.name,
      type: "website",
      locale: "en_ZA",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: brand.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Luxury Hotels in Cape Town | Cape Town Concierge",
      description:
        "A curated selection of 5-star hotels and boutique stays across Cape Town and the Winelands.",
      images: [OG_IMAGE],
    },
  };
}

export default async function HotelsPage() {
  const hotels = await fetchHotels();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Luxury Hotels in Cape Town",
        url: `${SITE_URL}/hotels`,
        description:
          "Hand-picked luxury hotels across Cape Town and the Winelands, with full concierge service.",
      },
      {
        "@type": "ItemList",
        itemListElement: hotels.slice(0, 12).map((h, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${SITE_URL}/hotels/${h.slug}`,
          name: h.name,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HotelsLandingPage hotels={hotels} />
    </>
  );
}
