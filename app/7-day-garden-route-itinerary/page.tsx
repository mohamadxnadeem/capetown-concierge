// app/7-day-garden-route-itinerary/page.tsx

import type { Metadata } from "next";
import { brand } from "../../lib/brand";
import GardenRoutePage from "../../components/sections/garden-route-itinerary/GardenRoutePage";
import {
  fetchGardenRouteVehicles,
  fetchItineraryWeeklyVehicles,
} from "../../lib/vehicles";

const SITE_URL = brand.siteUrl;
const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

const META_TITLE =
  "7 Day Garden Route Itinerary from Cape Town | Private Chauffeur Package";
const META_DESCRIPTION =
  "A 7 day Garden Route itinerary with a private chauffeur from Cape Town. Two nights each at a private game reserve, Knysna and Plettenberg Bay. One driver, one vehicle, priced per vehicle.";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/7-day-garden-route-itinerary`,
  },
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
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: `${SITE_URL}/7-day-garden-route-itinerary`,
    siteName: brand.name,
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Cape Town Concierge, 7 day Garden Route itinerary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

// ─── Combined-trip figure ────────────────────────────────────────────
// Indicative 14-day combined price = Cape Town 7-day package + Garden
// Route 7-day package for the same vehicle. Uses the smallest vehicle
// so it presents as a "from" figure. Cape Town side reuses the same
// helper the /7-day-cape-town-itinerary page uses, so both surfaces
// agree.

function pickCombinedFromFigure(
  ctVehicles: { slug: string; title: string; dailyRateZar: number; discountPercent: number; seats: number }[],
  grVehicles: { slug: string; title: string; packagePriceZar: number; seats: number }[]
): { combinedFromZar?: number; combinedVehicleTitle?: string } {
  if (!ctVehicles.length || !grVehicles.length) return {};

  const roundToNearest50 = (n: number) => Math.round(n / 50) * 50;

  const combined = grVehicles
    .map((gr) => {
      const ct = ctVehicles.find((c) => c.slug === gr.slug);
      if (!ct) return null;
      const ctPackage = roundToNearest50(
        ct.dailyRateZar * 7 * (1 - ct.discountPercent / 100)
      );
      return {
        title: gr.title,
        seats: gr.seats,
        combinedZar: ctPackage + gr.packagePriceZar,
      };
    })
    .filter((v): v is NonNullable<typeof v> => v !== null)
    .sort((a, b) => a.combinedZar - b.combinedZar);

  const cheapest = combined[0];
  if (!cheapest) return {};
  return {
    combinedFromZar: cheapest.combinedZar,
    combinedVehicleTitle: cheapest.title,
  };
}

export default async function SevenDayGardenRouteItineraryPage() {
  const [grVehicles, ctVehicles] = await Promise.all([
    fetchGardenRouteVehicles(),
    fetchItineraryWeeklyVehicles(),
  ]);

  const { combinedFromZar, combinedVehicleTitle } = pickCombinedFromFigure(
    ctVehicles,
    grVehicles
  );

  const lowPrice = grVehicles.length
    ? Math.min(...grVehicles.map((v) => v.packagePriceZar))
    : null;
  const highPrice = grVehicles.length
    ? Math.max(...grVehicles.map((v) => v.packagePriceZar))
    : null;

  const productOffer =
    lowPrice && highPrice
      ? {
          "@type": "Product",
          name: "7 Day Garden Route Chauffeur Package",
          description:
            "A 7 day Garden Route chauffeur package from Cape Town. One driver and one vehicle for the full week. Fuel, tolls, and airport transfers included. Accommodation billed separately at cost.",
          brand: { "@type": "Brand", name: brand.name },
          image: [`${SITE_URL}/images/activities/safari.jpg`],
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "ZAR",
            lowPrice,
            highPrice,
            offerCount: grVehicles.length,
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}/7-day-garden-route-itinerary`,
          },
        }
      : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "7 Day Garden Route Itinerary from Cape Town",
        description:
          "A chauffeur-driven 7 day Garden Route itinerary. Cape Town to a private game reserve, Knysna, Plettenberg Bay and Tsitsikamma, with a flight or drive back on Day 7.",
        image: [`${SITE_URL}/images/activities/safari.jpg`],
        author: { "@type": "Organization", name: brand.name },
        publisher: {
          "@type": "Organization",
          name: brand.name,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/images/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/7-day-garden-route-itinerary`,
        },
      },

      ...(productOffer ? [productOffer] : []),

      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How far is the Garden Route from Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "About 400km east on the N2 to Mossel Bay, then another 200km or so to Plettenberg Bay. The drive from Cape Town to the reserve on Day 1 is four to four-and-a-half hours with a break.",
            },
          },
          {
            "@type": "Question",
            name: "Is accommodation included in the package price?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. The package price covers your vehicle, chauffeur, fuel, tolls, parking, and the driver's accommodation and meals throughout. Your own accommodation, reserve fees, game drives and activities are booked separately and billed at cost.",
            },
          },
          {
            "@type": "Question",
            name: "Can we fly back to Cape Town instead of driving?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, and most guests do. Flights leave George daily and Plettenberg Bay on select days, both under an hour to Cape Town. We handle the transfer to the airport.",
            },
          },
          {
            "@type": "Question",
            name: "Which game reserve do you recommend?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We book both Gondwana and Botlierskop and both work well at this point in the itinerary. They sit close together near Mossel Bay, both are Big Five, and both offer full-board with morning and afternoon game drives.",
            },
          },
          {
            "@type": "Question",
            name: "How many days do we need on the Garden Route?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Seven days is the shortest itinerary that gives you two nights at each stop without spending every morning packing. Ten to twelve is the common alternative if you want a slower pace or to add Addo Elephant Park.",
            },
          },
          {
            "@type": "Question",
            name: "Is the Garden Route itinerary suitable for children?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Children usually love the safari days, Monkeyland, Birds of Eden, and the Knysna Elephant Park. Child seats are provided at no charge.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if the weather is poor?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Game drives happen in most conditions. If a specific activity like Storms River kayaking or a Featherbed ferry is cancelled, we swap the day around and your chauffeur handles the rerouting.",
            },
          },
        ],
      },

      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "7 Day Garden Route Itinerary",
            item: `${SITE_URL}/7-day-garden-route-itinerary`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <GardenRoutePage
        vehicles={grVehicles}
        combinedFromZar={combinedFromZar}
        combinedVehicleTitle={combinedVehicleTitle}
      />
    </>
  );
}
