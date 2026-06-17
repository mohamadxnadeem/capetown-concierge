import type { Metadata } from "next";
import VillasLandingPage from "../../components/sections/villas/VillasLandingPage";
import { fetchVillas } from "../../lib/villas";
import { brand } from "../../lib/brand";

const SITE_URL = brand.siteUrl;
const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

export const metadata: Metadata = {
  title: "Luxury Villa Rentals in Cape Town | Cape Town Concierge",
  description:
    "A curated collection of luxury villas to rent in Camps Bay, Clifton, Constantia, Franschhoek and Stellenbosch. Concierge, chauffeur add-ons, hand-picked properties.",
  alternates: { canonical: `${SITE_URL}/villas` },
  keywords: [
    "luxury villas Cape Town",
    "Cape Town villa rentals",
    "Camps Bay villas to rent",
    "Clifton villa rental",
    "Constantia villa rental",
    "Franschhoek villa",
    "luxury holiday villa Cape Town",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Luxury Villa Rentals in Cape Town | Cape Town Concierge",
    description:
      "A curated collection of luxury villas to rent in Camps Bay, Clifton, Constantia, Franschhoek and Stellenbosch.",
    url: `${SITE_URL}/villas`,
    siteName: brand.name,
    type: "website",
    locale: "en_ZA",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Villa Rentals in Cape Town | Cape Town Concierge",
    description:
      "A curated collection of luxury villas to rent in Camps Bay, Clifton, Constantia, Franschhoek and Stellenbosch.",
    images: [OG_IMAGE],
  },
};

export default async function VillasPage() {
  const villas = await fetchVillas();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Luxury Villa Rentals in Cape Town",
        url: `${SITE_URL}/villas`,
        description:
          "Hand-picked luxury villas to rent across Cape Town's most desirable areas, with full concierge service.",
      },
      {
        "@type": "ItemList",
        itemListElement: villas.slice(0, 12).map((v, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${SITE_URL}/villas/${v.slug}`,
          name: v.title,
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
      <VillasLandingPage villas={villas} />
    </>
  );
}
