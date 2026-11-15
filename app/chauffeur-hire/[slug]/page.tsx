import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brand } from "../../../lib/brand";
import ChauffeurDetailView from "../../../components/sections/chauffeur-services/ChauffeurDetailView";
import type { Car } from "../../../components/sections/chauffeur-services/types";
import {
  buildFaqs,
  getPrimaryImage,
  getVehiclePhotos,
  parsePrice,
} from "../../../components/sections/chauffeur-services/utils";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type CarsApiItem = {
  car?: Car;
} & Partial<Car>;

type RelatedVehicle = {
  title: string;
  image?: string;
  description?: string;
  seats?: number;
  price?: string;
  href: string;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

const SITE_URL = brand.siteUrl;

// ─────────────────────────────────────────────
// FIX 1: SEO KEYWORD GENERATOR
// Produces "[Vehicle Name] Chauffeur Service Cape Town" per vehicle
// This becomes the H1, meta title anchor, and schema name
// Override per vehicle by adding seo_keyword to your CMS/API
// ─────────────────────────────────────────────
function getSeoKeyword(car: Car): string {
  if (car.seo_keyword) return car.seo_keyword;
  const name = car.title || "Luxury Vehicle";
  return `${name} Chauffeur Service Cape Town`;
}

// ─────────────────────────────────────────────
// PRICE HELPERS (unchanged)
// ─────────────────────────────────────────────
function formatPrice(price?: string | number) {
  if (price === undefined || price === null || price === "") return "";
  const num = Number(String(price).replace(/[^0-9.]/g, ""));
  if (isNaN(num) || num === 0) return "";
  return `From R${Math.round(num).toLocaleString()} per day`;
}

function getNumericPriceValue(
  price?: string | number,
  priceFrom?: string | number,
  priceTo?: string | number
): string | number | undefined {
  if (price !== undefined && price !== null && price !== "") return price;
  if (priceFrom !== undefined && priceFrom !== null && priceFrom !== "") return priceFrom;
  if (priceTo !== undefined && priceTo !== null && priceTo !== "") return priceTo;
  return undefined;
}

function truncateText(text?: string, maxLength = 155) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

// ─────────────────────────────────────────────
// DATA FETCHING
// ─────────────────────────────────────────────
async function getAllVehicles(): Promise<CarsApiItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
      { next: { revalidate: 300 }, signal: controller.signal }
    );
    clearTimeout(timeout);
    if (!response.ok) return [];
    const data = await response.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
  } catch {
    clearTimeout(timeout);
    return [];
  }
}

// HEIC/HEIF photos cannot be shown in browsers, so they are removed before the
// data reaches any component (and the page payload).
const isHeic = (url?: string) => /\.(heic|heif)(\?|#|$)/i.test(url || "");

function stripHeic(car: Car): Car {
  return {
    ...car,
    cover_photos: car.cover_photos?.filter((p) => !isHeic(p.cover_photos)),
    images: car.images?.filter((p) => !isHeic(p.cover_photos)),
  };
}

function normalizeCars(items: CarsApiItem[]): Car[] {
  return items
    .map((item) => item?.car || item)
    .filter((car): car is Car => Boolean(car?.slug || car?.title))
    .map(stripHeic);
}

function getVehicleBySlug(cars: Car[], slug: string) {
  const lower = slug.toLowerCase();
  // Exact slug match first
  const exact = cars.find((car) => car.slug?.toLowerCase() === lower);
  if (exact) return exact;
  // Fallback: find by title-derived slug (e.g. "BMW X5" → "bmw-x5")
  return cars.find((car) => {
    if (!car.title) return false;
    const titleSlug = car.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return lower.includes(titleSlug) || titleSlug.includes(lower);
  }) || null;
}

// Slug-based meta title/description overrides (used when CMS meta_title is not set).
// Keys are lowercase; lookups lowercase the slug so BMW-X5 style slugs match.
const VEHICLE_META: Record<string, { title: string; description: string }> = {
  "bmw-5-series-for-hire-with-driver": {
    title: "BMW 5-Series Chauffeur Cape Town | Executive Hire",
    description: "Hire a BMW 5-Series with professional driver in Cape Town. Ideal for airport transfers & business travel. From R8,325/day. Book via WhatsApp.",
  },
  "bmw-x5-for-hire-with-driver": {
    title: "BMW X5 Chauffeur Cape Town | Luxury SUV with Driver",
    description: "Private BMW X5 hire with professional chauffeur in Cape Town. Perfect for families & small groups. From R8,325/day. WhatsApp to check availability.",
  },
  "8-seater-staria-van-with-driver": {
    title: "Hyundai Staria 9-Seater Cape Town | Group Transfers",
    description: "Book a 9-seat Hyundai Staria with driver in Cape Town. Ideal for group airport transfers & tours. From R6,475/day. WhatsApp to book today.",
  },
  "mercedes-sprinter-with-driver-cape-town": {
    title: "Mercedes Sprinter Cape Town | 14-Seat Group Hire",
    description: "14-seater Mercedes Sprinter with professional driver for large group tours & transfers in Cape Town. From R11,100/day. Get a quote on WhatsApp.",
  },
  "mercedes-v-class-private-chauffeur-service": {
    title: "Mercedes V-Class Cape Town | Luxury Group Chauffeur",
    description: "Premium 6-seat Mercedes V-Class with private chauffeur in Cape Town. Perfect for VIPs & families. From R10,175/day. Book via WhatsApp today.",
  },
  "range-rover-sport-chauffeur-service": {
    title: "Range Rover Sport Cape Town | Luxury SUV Chauffeur",
    description: "Chauffeur-driven Range Rover Sport in Cape Town from R8,850 per day. Airport transfers, Peninsula and Winelands tours. Private, fuel included. Book on WhatsApp.",
  },
};

// ─────────────────────────────────────────────
// FIX 3: VEHICLE-SPECIFIC IMAGE ALT TEXT
// Old: generic "Luxury [name] chauffeur service in Cape Town for VIP transport"
// New: Uses the exact SEO keyword — stronger ranking signal for Google Images
// ─────────────────────────────────────────────
function getVehicleImageAlt(car: Car) {
  return getSeoKeyword(car);
}

function getFormattedDailyRate(car: Car) {
  return formatPrice(car.price);
}

function getMetaFriendlyRate(car: Car) {
  const value = getFormattedDailyRate(car);
  if (!value) return "";
  return value.replace(/^From\s+/i, "");
}

// ─────────────────────────────────────────────
// FIX 4: META TITLE — exact keyword first, brand second
// Old: "[Name] | VIP Chauffeur Hire Cape Town"  (generic, brand-heavy)
// New: "[SEO Keyword] | Cape Town Concierge"    (keyword-first = higher CTR + ranking)
// Example: "Range Rover Sport Chauffeur Service Cape Town | Cape Town Concierge"
// Under 60 chars for the keyword portion, stays within Google's display limit
// ─────────────────────────────────────────────
function getPageTitle(car: Car) {
  if (car.meta_title) return car.meta_title; // CMS override wins
  const keyword = getSeoKeyword(car);
  const rate = getMetaFriendlyRate(car);
  // Append price if it fits — increases CTR significantly for HNWI searches
  return rate
    ? `${keyword} | From ${rate} | ` + brand.name
    : `${keyword} | ` + brand.name;
}

// ─────────────────────────────────────────────
// FIX 5: META DESCRIPTION — keyword in first 120 chars, CTA at end
// Old: starts with "[name] VIP chauffeur hire..." (weak)
// New: leads with the exact search intent, ends with action trigger
// ─────────────────────────────────────────────
function getPageDescription(car: Car) {
  if (car.meta_description) return car.meta_description; // CMS override wins
  const keyword = getSeoKeyword(car);
  const rate = getMetaFriendlyRate(car);
  const seats = car.number_of_seats ? ` ${car.number_of_seats} seats.` : "";
  const rateStr = rate ? ` From ${rate}/day.` : "";
  return truncateText(
    `${keyword}: private airport transfers, full-day tours & bespoke Cape Town hire.${rateStr}${seats} Professional chauffeur. Book via WhatsApp.`,
    155
  );
}

function getShortVehicleDescription(car: Car) {
  const keyword = getSeoKeyword(car);
  const rate = getFormattedDailyRate(car);
  return (
    car.short_description ||
    car.highlight ||
    truncateText(car.body, 180) ||
    (rate
      ? `${keyword}: ${rate.toLowerCase()} for private airport transfers, tours, and full-day hire in Cape Town.`
      : `Premium ${keyword} for private travel, airport transfers, and chauffeur-driven experiences.`)
  );
}

function mapRelatedVehicles(cars: Car[], currentSlug: string): RelatedVehicle[] {
  return cars
    .filter((car) => car.slug && car.slug.toLowerCase() !== currentSlug.toLowerCase())
    .map((car) => ({
      title: car.title || "Vehicle",
      image: getPrimaryImage(car),
      description:
        car.short_description ||
        car.highlight ||
        truncateText(car.body, 120) ||
        "Premium chauffeur-driven vehicle for Cape Town travel.",
      seats: car.number_of_seats,
      price: formatPrice(car.price),
      href: `/chauffeur-hire/${car.slug}`,
    }));
}

// ─────────────────────────────────────────────
// STATIC PARAMS — tells Next.js to pre-render all vehicle pages at build time
// FIX 7: Add generateStaticParams for ISR/SSG
// Without this, every visit triggers a server render — slower TTFB, worse Core Web Vitals
// With it, pages are pre-rendered and served from CDN edge instantly
// ─────────────────────────────────────────────
// Ensure any slug not pre-built at build time is rendered on-demand.
export const dynamicParams = true;

// Fallback slugs used if the API is unreachable at build time.
// These match the exact slugs in the database — keep in sync if vehicles are renamed.
const FALLBACK_VEHICLE_SLUGS: string[] = [
  "bmw-x5-for-hire-with-driver",
  "bmw-5-series-for-hire-with-driver",
  "mercedes-v-class-private-chauffeur-service",
  "mercedes-sprinter-with-driver-cape-town",
  "range-rover-sport-chauffeur-service",
  "range-rover-sport-chauffeur-service-cape-town",
  "8-seater-staria-van-with-driver",
];

export async function generateStaticParams() {
  try {
    const vehicles = normalizeCars(await getAllVehicles());
    const apiSlugs = vehicles
      .filter((car) => Boolean(car.slug))
      .map((car) => (car.slug as string).toLowerCase());
    return Array.from(new Set([...apiSlugs, ...FALLBACK_VEHICLE_SLUGS])).map(
      (slug) => ({ slug })
    );
  } catch {
    return FALLBACK_VEHICLE_SLUGS.map((slug) => ({ slug }));
  }
}

// ─────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicles = normalizeCars(await getAllVehicles());
  const car = getVehicleBySlug(vehicles, slug);

  if (!car) {
    const ogImage = `${SITE_URL}/images/og-cape-town-concierge.jpg`;
    return {
      title: `Chauffeur Service | ${brand.name}`,
      description: "Premium chauffeur-driven vehicles in Cape Town",
      openGraph: {
        images: [{ url: ogImage, alt: `${brand.name} - Luxury Chauffeur Service` }],
      },
      twitter: {
        card: "summary_large_image",
        images: [ogImage],
      },
    };
  }

  const override = VEHICLE_META[(car.slug || slug).toLowerCase()] || VEHICLE_META[slug.toLowerCase()];
  const title = override?.title || getPageTitle(car);
  const description = override?.description || getPageDescription(car);
  const image = getPrimaryImage(car); // absolute S3 URL, never HEIC
  const canonicalUrl = `${SITE_URL}/chauffeur-hire/${slug.toLowerCase()}`;
  const keyword = getSeoKeyword(car);
  const ogImage = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

  return {
    title,
    description,
    keywords: [
      keyword,
      `${car.title} chauffeur cape town`,
      `${car.title} hire with driver cape town`,
      `${car.title} private driver cape town`,
      "luxury chauffeur cape town",
      "private chauffeur cape town",
      "cape town vip transport",
    ].filter(Boolean),
    alternates: { canonical: canonicalUrl },
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
      title,
      description,
      url: canonicalUrl,
      siteName: brand.name,
      type: "website",
      locale: "en_ZA",
      images: [
        {
          url: image || ogImage,
          alt: image
            ? getVehiclePhotos(car).primary?.alt || getVehicleImageAlt(car)
            : `${brand.name} - Luxury Chauffeur Service`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || ogImage],
    },
  };
}

// ─────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────
export default async function ChauffeurServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicles = normalizeCars(await getAllVehicles());
  const car = getVehicleBySlug(vehicles, slug);

  if (!car) notFound();

  const relatedVehicles = mapRelatedVehicles(vehicles, slug);
  const ogImage = `${SITE_URL}/images/og-cape-town-concierge.jpg`;
  const photoUrls = getVehiclePhotos(car).all.map((photo) => photo.url);
  const schemaImages = photoUrls.length ? photoUrls : [ogImage];
  const canonicalUrl = `${SITE_URL}/chauffeur-hire/${slug.toLowerCase()}`;
  const pageTitle = getPageTitle(car);
  const pageDescription = getPageDescription(car);
  const keyword = getSeoKeyword(car);
  const schemaPrice = parsePrice(car.price);
  // One FAQ list: the same array feeds the visible FAQ (ChauffeurDetailView) and the FAQPage JSON-LD
  const faqs = buildFaqs(car, keyword);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Service: the chauffeur service for this vehicle (no ratings or reviews on purpose)
      {
        "@type": "Service",
        name: `${car.title || "Luxury Vehicle"} Chauffeur Service Cape Town`,
        serviceType: "Private Chauffeur Service",
        provider: {
          "@type": "LocalBusiness",
          name: brand.name,
          url: SITE_URL,
          telephone: brand.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: brand.address.locality,
            addressRegion: brand.address.region,
            addressCountry: brand.address.country,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: brand.geo.lat,
            longitude: brand.geo.lng,
          },
          priceRange: "$$$$",
          sameAs: ["https://share.google/xrWoPQWHwQYfzukgz"],
        },
        areaServed: { "@type": "City", name: "Cape Town" },
        image: schemaImages,
        description: car.chauffeur_service_text || getShortVehicleDescription(car),
        url: canonicalUrl,
        ...(schemaPrice
          ? {
              offers: {
                "@type": "Offer",
                price: Math.round(schemaPrice),
                priceCurrency: "ZAR",
                availability: "https://schema.org/InStock",
                url: canonicalUrl,
              },
            }
          : {}),
      },

      // 2. FAQPage built from the same faqs array the page renders
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },

      // 3. BreadcrumbList
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Chauffeur Services",
            item: `${SITE_URL}/chauffeur-hire`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: keyword,
            item: canonicalUrl,
          },
        ],
      },

      // 4. WebPage
      {
        "@type": "WebPage",
        name: pageTitle,
        description: pageDescription,
        url: canonicalUrl,
        image: schemaImages,
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".vehicle-summary", ".chauffeur-intro"],
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/*
        IMPORTANT: Pass keyword down to ChauffeurDetailView
        so the H1 rendered in the component uses the SEO keyword
        instead of just car.title

        In ChauffeurDetailView, change:
          <h1>{car.title}</h1>
        to:
          <h1>{seoKeyword}</h1>

        This is the single most impactful change for organic ranking.
      */}
      <ChauffeurDetailView
        car={car}
        relatedVehicles={relatedVehicles}
        seoKeyword={keyword}     // ADD THIS PROP
        pageTitle={pageTitle}    // ADD THIS PROP
      />
    </>
  );
}
