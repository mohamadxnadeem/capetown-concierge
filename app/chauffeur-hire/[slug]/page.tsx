import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brand } from "../../../lib/brand";
import ChauffeurDetailView from "../../../components/sections/chauffeur-services/ChauffeurDetailView";
import {
  buildVehicleData,
  buildVehicleFaqs,
  VEHICLE_AREAS_SERVED,
  type RawVehicle,
} from "../../../lib/vehicleTemplate";

// ─────────────────────────────────────────────────────────────────────
// Vehicle detail template — single source of truth
//
// Every SEO-critical field on this page (title tag, H1, meta
// description, on-page price, and schema) is derived from the same
// VehicleData object built by buildVehicleData(). No hand-typed drift
// per vehicle.
// ─────────────────────────────────────────────────────────────────────

type RawVehicleFromApi = RawVehicle & {
  id?: number;
  is_active?: boolean;
};

type CarsApiItem = {
  car?: RawVehicleFromApi;
} & Partial<RawVehicleFromApi>;

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
const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

// ─── Data fetching ──────────────────────────────────────────────────

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

function normalizeCars(items: CarsApiItem[]): RawVehicleFromApi[] {
  return items
    .map((item) => item?.car || (item as RawVehicleFromApi))
    .filter((car): car is RawVehicleFromApi => Boolean(car?.slug || car?.title));
}

function getVehicleBySlug(cars: RawVehicleFromApi[], slug: string) {
  const lower = slug.toLowerCase();
  const exact = cars.find((car) => car.slug?.toLowerCase() === lower);
  if (exact) return exact;
  return cars.find((car) => {
    if (!car.title) return false;
    const titleSlug = car.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return lower.includes(titleSlug) || titleSlug.includes(lower);
  }) || null;
}

function mapRelatedVehicles(
  cars: RawVehicleFromApi[],
  currentSlug: string
): RelatedVehicle[] {
  return cars
    .filter((car) => car.slug && car.slug.toLowerCase() !== currentSlug)
    .map((car) => {
      // Rebuild each related vehicle through the canonical builder so
      // seat counts / prices in the "Other vehicles" module stay in
      // sync with the detail page they link to.
      const v = buildVehicleData(car, car.slug ?? "");
      return {
        title: v.name,
        image: v.primaryImage,
        description:
          v.shortDescription ||
          `Premium chauffeur-driven vehicle for Cape Town travel.`,
        seats: v.seats ?? undefined,
        price: v.dailyRateLine,
        href: `/chauffeur-hire/${v.slug}`,
      };
    });
}

// ─── Static params ──────────────────────────────────────────────────
// Fallback slugs used when the API is unreachable at build time.
// The Sprinter is no longer part of the fleet — do not add it here.
export const dynamicParams = true;

const FALLBACK_VEHICLE_SLUGS: string[] = [
  "bmw-x5-for-hire-with-driver",
  "bmw-5-series-for-hire-with-driver",
  "mercedes-v-class-private-chauffeur-service",
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

// ─── Metadata ──────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lowerSlug = slug.toLowerCase();
  const vehicles = normalizeCars(await getAllVehicles());
  const raw = getVehicleBySlug(vehicles, lowerSlug);

  if (!raw) {
    return {
      title: `Chauffeur Hire in Cape Town | ${brand.name}`,
      description:
        "Chauffeur hire in Cape Town — private drivers and luxury vehicles for executive travel, airport transfers, and full-day hire.",
      alternates: { canonical: `${SITE_URL}/chauffeur-hire` },
      openGraph: {
        images: [
          { url: OG_IMAGE, alt: "Chauffeur hire in Cape Town — Cape Town Concierge" },
        ],
      },
      twitter: {
        card: "summary_large_image",
        images: [OG_IMAGE],
      },
    };
  }

  const vehicle = buildVehicleData(raw, lowerSlug);
  const ogImage = vehicle.primaryImage || OG_IMAGE;
  const ogAlt = vehicle.images[0]?.alt || `${vehicle.name} chauffeur hire in Cape Town`;

  return {
    title: vehicle.titleTag,
    description: vehicle.metaDescription,
    // Meta-keywords tag intentionally omitted — Google ignores it and
    // it just exposes our keyword list.
    alternates: { canonical: vehicle.canonicalUrl },
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
      title: vehicle.titleTag,
      description: vehicle.metaDescription,
      url: vehicle.canonicalUrl,
      siteName: brand.name,
      type: "website",
      locale: "en_ZA",
      images: [{ url: ogImage, alt: ogAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: vehicle.titleTag,
      description: vehicle.metaDescription,
      images: [ogImage],
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────

export default async function ChauffeurHireDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const lowerSlug = slug.toLowerCase();
  const vehicles = normalizeCars(await getAllVehicles());
  const raw = getVehicleBySlug(vehicles, lowerSlug);
  if (!raw) notFound();

  const vehicle = buildVehicleData(raw, lowerSlug);
  const relatedVehicles = mapRelatedVehicles(vehicles, vehicle.slug);
  const faqs = buildVehicleFaqs(vehicle);

  const schemaImage = vehicle.primaryImage || OG_IMAGE;

  // ── JSON-LD ────────────────────────────────
  // No AggregateRating / Review markup — Google ignores self-serving
  // on-site review markup for star snippets.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${vehicle.name} Chauffeur Hire in Cape Town`,
        serviceType: "Chauffeur Hire",
        provider: {
          "@type": "LocalBusiness",
          name: brand.name,
          url: SITE_URL,
          telephone: brand.phone,
          email: brand.contactEmail,
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
          priceRange: "$$$",
        },
        areaServed: VEHICLE_AREAS_SERVED,
        image: [schemaImage],
        description:
          vehicle.shortDescription ||
          `${vehicle.name} chauffeur hire in Cape Town — private driver, PDP-licensed chauffeur, meet-and-greet at Cape Town International.`,
        url: vehicle.canonicalUrl,
        ...(vehicle.dailyRateZar
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: vehicle.currency,
                price: vehicle.dailyRateZar,
                availability: "https://schema.org/InStock",
                url: vehicle.canonicalUrl,
              },
            }
          : {}),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Chauffeur Hire",
            item: `${SITE_URL}/chauffeur-hire`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: vehicle.name,
            item: vehicle.canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ChauffeurDetailView
        vehicle={vehicle}
        faqs={faqs}
        relatedVehicles={relatedVehicles}
      />
    </>
  );
}
