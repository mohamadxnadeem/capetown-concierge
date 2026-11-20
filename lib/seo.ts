import { brand } from "./brand";

const SITE_URL = brand.siteUrl;

/** One business entity for the whole site. Other JSON-LD nodes reference it by this @id. */
export const BUSINESS_ID = `${SITE_URL}/#business`;
export const businessRef = { "@id": BUSINESS_ID };

/** King Mo's Google Business Profile. */
export const GOOGLE_BUSINESS_PROFILE_URL = "https://share.google/xrWoPQWHwQYfzukgz";

/** Real profiles only (no wa.me links). */
export const businessSameAs: string[] = [
  GOOGLE_BUSINESS_PROFILE_URL,
  brand.social?.facebook,
  brand.social?.instagram,
  brand.social?.tiktok,
  brand.social?.youtube,
].filter((u): u is string => Boolean(u));

export function buildBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TravelAgency"],
    "@id": BUSINESS_ID,
    name: brand.name,
    url: SITE_URL,
    logo: `${SITE_URL}${brand.logoPath}`,
    image: `${SITE_URL}${brand.heroImagePath}`,
    description: `${brand.name} offers private chauffeur hire, private day tours, multi-day trips and airport transfers across ${brand.address.locality} and the ${brand.address.region}.`,
    telephone: brand.phone,
    email: brand.contactEmail,
    priceRange: "$$$$",
    currenciesAccepted: "ZAR, USD",
    paymentAccepted: "Cash, EFT, Credit Card",
    address: {
      "@type": "PostalAddress",
      addressLocality: brand.address.locality,
      addressRegion: brand.address.region,
      postalCode: brand.address.postalCode,
      addressCountry: brand.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: brand.geo.lat,
      longitude: brand.geo.lng,
    },
    areaServed: [
      { "@type": "City", name: "Cape Town" },
      { "@type": "State", name: "Western Cape" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Private Chauffeur Hire, Tours and Airport Transfers",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Chauffeur Hire in Cape Town",
            url: `${SITE_URL}/chauffeur-hire`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Tours in Cape Town",
            url: `${SITE_URL}/tours`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Airport Transfers in Cape Town",
            url: `${SITE_URL}/airport-transfers-cape-town`,
          },
        },
      ],
    },
    sameAs: businessSameAs,
  };
}

/**
 * Real live vehicle slugs, lowercase. Used when the API is unreachable at build time
 * (sitemap and vehicle page static params). Keep in sync when vehicles change.
 */
export const FALLBACK_VEHICLE_SLUGS: string[] = [
  "audi-a4",
  "bmw-5-series-for-hire-with-driver",
  "bmw-x5-for-hire-with-driver",
  "8-seater-staria-van-with-driver",
  "mercedes-benz-e-class",
  "mercedes-s-class-for-hire-with-driver",
  "mercedes-v-class-private-chauffeur-service",
  "range-rover-sport-chauffeur-service",
];

/** Internal link to a vehicle page. Always lowercase so links match the canonical URL. */
export function vehicleHref(slug?: string | null): string {
  const clean = (slug || "").trim().toLowerCase();
  return clean ? `/chauffeur-hire/${clean}` : "/chauffeur-hire";
}
