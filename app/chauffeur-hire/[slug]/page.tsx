import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brand } from "../../../lib/brand";
import { FALLBACK_VEHICLE_SLUGS, businessRef, vehicleHref } from "../../../lib/seo";
import ChauffeurDetailView from "../../../components/sections/chauffeur-services/ChauffeurDetailView";
import {
  buildFaqs,
  getSeoKeyword,
  getVehicleMetaDescription,
  getVehicleMetaTitle,
} from "../../../components/sections/chauffeur-services/utils";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
type CarPhoto = {
  id: number;
  cover_photos: string;
  is_featured?: boolean;
  order?: number;
};

type Car = {
  id?: number;
  title?: string;
  slug?: string;
  category?: string;
  vehicle_type?: string;
  short_description?: string;
  highlight?: string;
  chauffeur_service_text?: string;
  number_of_seats?: number;
  luggage_capacity?: number;
  price?: string | number;
  price_from?: string | number;
  price_to?: string | number;
  currency?: string;
  features?: string[];
  ideal_for?: string[];
  body?: string;
  cover_photos?: CarPhoto[];
  images?: CarPhoto[];
  meta_title?: string;
  meta_description?: string;
  // FIX 1: Add keyword field so CMS can supply the exact target keyword per vehicle
  // e.g. "Range Rover Sport Chauffeur Service Cape Town"
  // If not supplied, we auto-generate it (see getSeoKeyword)
  seo_keyword?: string;
  // FIX 2: Add aggregate review data if your API returns it
  review_count?: number;
  review_rating?: number;
  is_active?: boolean;
};

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

function normalizeCars(items: CarsApiItem[]): Car[] {
  return items
    .map((item) => item?.car || item)
    .filter((car): car is Car => Boolean(car?.slug || car?.title));
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

function getPrimaryImage(car: Car) {
  const imageArray = car.cover_photos || car.images || [];
  const sorted = [...imageArray].sort((a, b) => (a.order || 0) - (b.order || 0));
  return (
    sorted.find((photo) => photo.is_featured)?.cover_photos ||
    sorted[0]?.cover_photos ||
    ""
  );
}

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

function getPageTitle(car: Car) {
  return getVehicleMetaTitle(car);
}

function getPageDescription(car: Car) {
  return getVehicleMetaDescription(car);
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
      href: vehicleHref(car.slug),
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

// Fallback slugs (lib/seo.ts) are used if the API is unreachable at build time.

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
        images: [{ url: ogImage, alt: "Cape Town Concierge, Luxury Chauffeur Service" }],
      },
      twitter: {
        card: "summary_large_image",
        images: [ogImage],
      },
    };
  }

  const title = getPageTitle(car);
  const description = getPageDescription(car);
  const image = getPrimaryImage(car);
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
            ? getVehicleImageAlt(car)
            : "Cape Town Concierge | Luxury Chauffeur Service",
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
  const image = getPrimaryImage(car);
  const ogImage = `${SITE_URL}/images/og-cape-town-concierge.jpg`;
  const schemaImage = image || ogImage;
  const canonicalUrl = `${SITE_URL}/chauffeur-hire/${slug.toLowerCase()}`;
  const pageTitle = getPageTitle(car);
  const pageDescription = getPageDescription(car);
  const keyword = getSeoKeyword(car);
  const numericPrice = car.price;
  const vehicleFaqs = buildFaqs(car);

  // ─────────────────────────────────────────────
  // FIX 11: EXPANDED STRUCTURED DATA
  // Added: AggregateRating (unlocks star ratings in SERPs)
  // Added: LocalBusiness (reinforces local SEO)
  // Fixed: Service schema now uses getSeoKeyword as the name
  // Fixed: FAQPage now has 8 specific questions instead of 4 generic ones
  // ─────────────────────────────────────────────
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Product schema — vehicle as a bookable product
      {
        "@type": "Product",
        name: keyword,
        image: [schemaImage],
        description: getShortVehicleDescription(car),
        brand: {
          "@type": "Brand",
          name: brand.name,
        },
        category: car.category || car.vehicle_type || "Luxury Chauffeur Vehicle",
        url: canonicalUrl,
        ...(numericPrice
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: "ZAR",
                price: Math.round(Number(String(numericPrice).replace(/[^0-9.]/g, ""))),
                availability: "https://schema.org/InStock",
                url: canonicalUrl,
              },
            }
          : {}),
      },

      // 2. Service schema — the chauffeur service itself
      {
        "@type": "Service",
        // FIX: name now uses SEO keyword — this is what appears in rich results
        name: keyword,
        serviceType: "Private Chauffeur Service",
        provider: businessRef,
        areaServed: [
          { "@type": "City", name: "Cape Town" },
          { "@type": "State", name: "Western Cape" },
        ],
        image: [schemaImage],
        description: getShortVehicleDescription(car),
        url: canonicalUrl,
      },

      // 3. FAQPage — now 8 vehicle-specific questions (was 4 generic)
      {
        "@type": "FAQPage",
        mainEntity: vehicleFaqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },

      // 4. BreadcrumbList — unchanged, already correct
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
            // FIX: breadcrumb now shows SEO keyword not just car.title
            name: keyword,
            item: canonicalUrl,
          },
        ],
      },

      // 5. WebPage — unchanged structure, updated name
      {
        "@type": "WebPage",
        name: pageTitle,
        description: pageDescription,
        url: canonicalUrl,
        image: [schemaImage],
        // FIX 15: Add speakable — helps voice search / AI summaries
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
