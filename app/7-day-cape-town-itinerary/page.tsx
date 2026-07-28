// app/7-day-cape-town-itinerary/page.tsx

import type { Metadata } from "next";
import { brand } from "../../lib/brand";
import ItineraryPage from "../../components/sections/cape-town-itinerary/ItineraryPage";
import { fetchItineraryWeeklyVehicles } from "../../lib/vehicles";
import {
  fetchHotels,
  getHotelNightlyRate,
  getHotelPrimaryPhoto,
  getHotelAreaDisplay,
} from "../../lib/hotels";
import type {
  ItineraryHotelCard,
  WeeklyPricingVehicle,
} from "../../components/sections/cape-town-itinerary/types";

const SITE_URL = brand.siteUrl;

const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

const META_DESCRIPTION =
  "A 7 day Cape Town itinerary with a private chauffeur for the full week. From the Cape Peninsula to the Winelands, planned, priced, and driven for you.";

export const metadata: Metadata = {
  title: "7 Day Cape Town Itinerary | Private Chauffeur Package",
  description: META_DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/7-day-cape-town-itinerary`,
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
    title: "7 Day Cape Town Itinerary | Private Chauffeur Package",
    description: META_DESCRIPTION,
    url: `${SITE_URL}/7-day-cape-town-itinerary`,
    siteName: brand.name,
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Cape Town Concierge — Luxury Chauffeur Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "7 Day Cape Town Itinerary | Private Chauffeur Package",
    description: META_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

function roundToNearest50(n: number): number {
  return Math.round(n / 50) * 50;
}

function packagePriceFor(v: WeeklyPricingVehicle): number {
  const singleDayTotal = v.dailyRateZar * 7;
  return roundToNearest50(singleDayTotal * (1 - v.discountPercent / 100));
}

export default async function SevenDayCapeTownItineraryPage() {
  const [vehicles, hotelsRaw] = await Promise.all([
    fetchItineraryWeeklyVehicles(),
    fetchHotels().catch(() => []),
  ]);

  const hotels: ItineraryHotelCard[] = hotelsRaw
    .filter((h) => h.is_active !== false)
    .sort((a, b) => {
      const aFeat = a.is_featured ? 1 : 0;
      const bFeat = b.is_featured ? 1 : 0;
      if (aFeat !== bFeat) return bFeat - aFeat;
      const aTime = new Date(a.created_at || 0).getTime();
      const bTime = new Date(b.created_at || 0).getTime();
      return bTime - aTime;
    })
    .slice(0, 6)
    .map((h) => ({
      slug: h.slug,
      name: h.name,
      location: getHotelAreaDisplay(h),
      starRating: h.star_rating ?? null,
      priceFromZar: getHotelNightlyRate(h),
      primaryImage: getHotelPrimaryPhoto(h) || "",
      shortDescription: h.short_description || "",
    }));

  const packagePrices = vehicles.map(packagePriceFor).filter((n) => n > 0);
  const lowPrice = packagePrices.length ? Math.min(...packagePrices) : null;
  const highPrice = packagePrices.length ? Math.max(...packagePrices) : null;

  const productOffer = lowPrice && highPrice
    ? {
        "@type": "Product",
        name: "7 Day Cape Town Chauffeur Package",
        description:
          "A 7 day Cape Town chauffeur package with one driver and one vehicle for the full week. Fuel, tolls, and airport transfers included.",
        brand: {
          "@type": "Brand",
          name: brand.name,
        },
        image: [`${SITE_URL}/images/itinerary/cape-point.jpg`],
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "ZAR",
          lowPrice,
          highPrice,
          offerCount: packagePrices.length,
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/7-day-cape-town-itinerary`,
        },
      }
    : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "7 Day Cape Town Itinerary",
        description:
          "A complete 7 day Cape Town itinerary covering Table Mountain, Cape Peninsula, Cape Winelands, beaches, and luxury private experiences.",
        image: [`${SITE_URL}/images/itinerary/cape-point.jpg`],
        author: {
          "@type": "Organization",
          name: brand.name,
        },
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
          "@id": `${SITE_URL}/7-day-cape-town-itinerary`,
        },
      },

      ...(productOffer ? [productOffer] : []),

      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Is 7 days enough for Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. 7 days gives you time for the Peninsula, a Winelands day, Table Mountain, a beach day, and one add-on like safari or a helicopter loop, without any of it feeling rushed.",
            },
          },
          {
            "@type": "Question",
            name: "What should I include in a Cape Town itinerary?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Table Mountain, the Cape Peninsula, Cape Point, Boulders Beach, a Winelands day in Stellenbosch or Franschhoek, and at least one big-ticket add-on such as safari, helicopter, or a yacht charter.",
            },
          },
          {
            "@type": "Question",
            name: "Can I do Cape Town in a private chauffeur experience?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. A private chauffeur handles the airport pickup, the daily route planning, and the drive time, so you spend the week experiencing Cape Town instead of navigating it.",
            },
          },
          {
            "@type": "Question",
            name: "What is the best order for a Cape Town itinerary?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Arrival and Atlantic Seaboard, Peninsula, Winelands, Table Mountain and Bo-Kaap, a beach day, one big-ticket add-on, then a relaxed departure day.",
            },
          },
          {
            "@type": "Question",
            name: "Should I book Cape Town tours in advance?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, especially for December and January. Vehicles and hotel rooms in Camps Bay, Clifton, and the Waterfront book out 8 to 12 weeks ahead of peak season.",
            },
          },
        ],
      },

      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "7 Day Cape Town Itinerary",
            item: `${SITE_URL}/7-day-cape-town-itinerary`,
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

      <ItineraryPage vehicles={vehicles} hotels={hotels} />
    </>
  );
}
