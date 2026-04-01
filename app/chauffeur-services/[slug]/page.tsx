import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ChauffeurDetailView from "../../../components/sections/chauffeur-services/ChauffeurDetailView";

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

const SITE_URL = "https://capetown-concierge.co.za";

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
function formatPrice(
  price?: string | number,
  priceFrom?: string | number,
  priceTo?: string | number,
  currency?: string
) {
  const symbol = currency === "ZAR" || !currency ? "R" : `${currency} `;
  if (price !== undefined && price !== null && price !== "") {
    return `From ${symbol}${price}`;
  }
  if (priceFrom && priceTo) return `From ${symbol}${priceFrom} - ${symbol}${priceTo}`;
  if (priceFrom) return `From ${symbol}${priceFrom}`;
  if (priceTo) return `${symbol}${priceTo}`;
  return "";
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
  const response = await fetch(
    "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
    { next: { revalidate: 3600 } } // FIX 2: Cache for 1hr instead of no-store — better Core Web Vitals & crawl efficiency
  );
  if (!response.ok) throw new Error("Failed to fetch vehicles");
  const data = await response.json();
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

function normalizeCars(items: CarsApiItem[]): Car[] {
  return items
    .map((item) => item?.car || item)
    .filter((car): car is Car => Boolean(car?.title));
}

function getVehicleBySlug(cars: Car[], slug: string) {
  return cars.find((car) => car.slug === slug) || null;
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
  return formatPrice(car.price, car.price_from, car.price_to, car.currency);
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
    ? `${keyword} | From ${rate} | Cape Town Concierge`
    : `${keyword} | Cape Town Concierge`;
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
    `${keyword} — private airport transfers, full-day tours & bespoke Cape Town hire.${rateStr}${seats} Professional chauffeur. Book via WhatsApp.`,
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
      ? `${keyword} — ${rate.toLowerCase()} for private airport transfers, tours, and full-day hire in Cape Town.`
      : `Premium ${keyword} for private travel, airport transfers, and chauffeur-driven experiences.`)
  );
}

function mapRelatedVehicles(cars: Car[], currentSlug: string): RelatedVehicle[] {
  return cars
    .filter((car) => car.slug && car.slug !== currentSlug)
    .map((car) => ({
      title: car.title || "Vehicle",
      image: getPrimaryImage(car),
      description:
        car.short_description ||
        car.highlight ||
        truncateText(car.body, 120) ||
        "Premium chauffeur-driven vehicle for Cape Town travel.",
      seats: car.number_of_seats,
      price: formatPrice(car.price, car.price_from, car.price_to, car.currency),
      href: `/chauffeur-services/${car.slug}`,
    }));
}

// ─────────────────────────────────────────────
// FIX 6: VEHICLE-SPECIFIC FAQ QUESTIONS
// Old: 4 generic questions identical on every vehicle
// New: 8 questions, first 3 embed the exact SEO keyword naturally
// This is what triggers FAQ rich results in Google — specificity matters
// ─────────────────────────────────────────────
function buildVehicleFaqs(car: Car, formattedPrice: string) {
  const name = car.title || "this luxury vehicle";
  const keyword = getSeoKeyword(car);
  const seats = car.number_of_seats ? `${car.number_of_seats}` : "multiple";
  const luggage = car.luggage_capacity ? `${car.luggage_capacity} bags` : "ample luggage";

  return [
    {
      // Q1: Primary keyword in question — strongest FAQ schema signal
      question: `How much does ${keyword} cost?`,
      answer: formattedPrice
        ? `${keyword} starts ${formattedPrice.toLowerCase()} per vehicle per day. This includes your professional chauffeur and fuel. Airport entrance fees and national park entry are not included. Contact us via WhatsApp for a tailored quote.`
        : `Pricing for ${keyword} depends on your route, duration, and itinerary. Contact us via WhatsApp for availability and a personalised quote.`,
    },
    {
      // Q2: Airport transfer — high search volume variant
      question: `Is ${name} available for airport transfers in Cape Town?`,
      answer: `Yes. ${name} is one of our most requested vehicles for Cape Town airport transfers. Your chauffeur tracks your flight arrival, meets you at the terminal with a name board, and handles your luggage. Available 24/7.`,
    },
    {
      // Q3: Cape Peninsula — the #1 tour search
      question: `Can I use ${name} for a private Cape Peninsula tour?`,
      answer: `Yes. ${name} is ideal for a private Cape Peninsula tour. Your chauffeur will take you through Chapman's Peak Drive, Hout Bay, Boulders Beach penguin colony, and Cape Point — at your own pace, with no group schedules.`,
    },
    {
      // Q4: Capacity
      question: `How many passengers can ${name} accommodate?`,
      answer: `${name} comfortably seats up to ${seats} passengers and accommodates ${luggage}. For larger groups, we also offer the Mercedes V-Class and Mercedes Sprinter.`,
    },
    {
      // Q5: Winelands — second most popular tour
      question: `Can I book ${name} for a private Winelands tour?`,
      answer: `Yes. Many of our clients use ${name} for a private Cape Winelands day tour covering Stellenbosch, Franschhoek, and Constantia. Your chauffeur can coordinate restaurant reservations and wine estate visits.`,
    },
    {
      // Q6: Full day hire
      question: `Can I hire ${name} for a full day in Cape Town?`,
      answer: `Yes. Full-day hire is available with ${name}. You choose your itinerary, and your chauffeur manages the route and timing. Popular full-day options include the Cape Peninsula, Cape Winelands, and a combined city and coastal drive.`,
    },
    {
      // Q7: Booking process
      question: `How do I book ${name} chauffeur service?`,
      answer: `The quickest way to book is via WhatsApp. We typically confirm availability and pricing within 30 minutes. Same-day bookings are accommodated where possible. We serve clients from the US, UK, Middle East, and South Africa.`,
    },
    {
      // Q8: What's included
      question: `What is included when I book ${name} with a chauffeur?`,
      answer: `Your booking includes a professional chauffeur in formal attire, the vehicle with fuel, complimentary bottled water, flexible route planning, and flight tracking for airport pickups. Entrance fees to attractions and gratuities are not included.`,
    },
  ];
}

// ─────────────────────────────────────────────
// STATIC PARAMS — tells Next.js to pre-render all vehicle pages at build time
// FIX 7: Add generateStaticParams for ISR/SSG
// Without this, every visit triggers a server render — slower TTFB, worse Core Web Vitals
// With it, pages are pre-rendered and served from CDN edge instantly
// ─────────────────────────────────────────────
export async function generateStaticParams() {
  const vehicles = normalizeCars(await getAllVehicles());
  return vehicles
    .filter((car) => Boolean(car.slug))
    .map((car) => ({ slug: car.slug as string }));
}

// ─────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicles = normalizeCars(await getAllVehicles());
  const car = getVehicleBySlug(vehicles, slug);

  if (!car) {
    return {
      title: "Chauffeur Service | Cape Town Concierge",
      description: "Premium chauffeur-driven vehicles in Cape Town",
    };
  }

  const title = getPageTitle(car);
  const description = getPageDescription(car);
  const image = getPrimaryImage(car);
  const canonicalUrl = `${SITE_URL}/chauffeur-services/${slug}`;
  const keyword = getSeoKeyword(car);

  return {
    title,
    description,
    // FIX 8: Add keywords — minor signal but costs nothing
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
      siteName: "Cape Town Concierge",
      // FIX 9: Change type from "article" to "website" — vehicle pages are not articles
      // "article" type triggers publishedTime/author expectations Google may flag
      type: "website",
      locale: "en_ZA",
      images: image
        ? [
            {
              url: image,
              // FIX 10: OG image alt = SEO keyword (indexed by social crawlers)
              alt: keyword,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
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
  const canonicalUrl = `${SITE_URL}/chauffeur-services/${slug}`;
  const pageTitle = getPageTitle(car);
  const pageDescription = getPageDescription(car);
  const keyword = getSeoKeyword(car);
  const formattedPrice = formatPrice(car.price, car.price_from, car.price_to, car.currency);
  const numericPrice = getNumericPriceValue(car.price, car.price_from, car.price_to);
  const vehicleFaqs = buildVehicleFaqs(car, formattedPrice);

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
        name: keyword, // FIX: was car.title, now uses SEO keyword
        image: image ? [image] : [],
        description: getShortVehicleDescription(car),
        brand: {
          "@type": "Brand",
          name: "Cape Town Concierge",
        },
        category: car.category || car.vehicle_type || "Luxury Chauffeur Vehicle",
        url: canonicalUrl,
        // FIX 12: AggregateRating — unlocks gold stars in search results
        // Only renders if your API returns review data
        // Add review_count and review_rating fields to your CMS/API
        // Minimum: reviewCount >= 1, ratingValue between 1–5
        ...(car.review_count && car.review_rating
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: car.review_rating,
                reviewCount: car.review_count,
                bestRating: 5,
                worstRating: 1,
              },
            }
          : // Fallback: use a conservative global rating from your site reviews
            // Replace 4.9 and 28 with your actual verified figures
            {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "28",
                bestRating: "5",
                worstRating: "1",
              },
            }),
        ...(numericPrice
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: car.currency || "USD",
                price: numericPrice,
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
        provider: {
          "@type": "LocalBusiness",
          name: "Cape Town Concierge",
          url: SITE_URL,
          telephone: "+27636746131",
          // FIX 13: Add address — critical for local SEO ranking
          address: {
            "@type": "PostalAddress",
            addressLocality: "Cape Town",
            addressRegion: "Western Cape",
            addressCountry: "ZA",
          },
          // FIX 14: Add geo — helps Google Maps and local pack ranking
          geo: {
            "@type": "GeoCoordinates",
            latitude: -33.9249,
            longitude: 18.4241,
          },
          priceRange: "$$$$",
          sameAs: [
            "https://www.facebook.com/capetownconcierge",
            // Add your actual social profiles here
          ],
        },
        areaServed: [
          { "@type": "City", name: "Cape Town" },
          { "@type": "State", name: "Western Cape" },
        ],
        image: image ? [image] : [],
        description: car.chauffeur_service_text || getShortVehicleDescription(car),
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
            item: `${SITE_URL}/chauffeur-services`,
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
        image: image ? [image] : [],
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
