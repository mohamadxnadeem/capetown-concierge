import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PrivateTourDetailView from "../../../components/sections/private-tour-detail/PrivateTourDetailView";

type ExperiencePhoto = {
  id: number;
  experience?: number;
  cover_photos: string;
  order: number;
  is_featured?: boolean;
};

type ExperienceStop = {
  id: number;
  title: string;
  short_description?: string;
  highlight?: string;
  image?: string;
  order: number;
  estimated_time?: string;
  stop_type?: string;
};

type Experience = {
  id: number;
  title?: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  location?: string;
  duration?: string;
  tags?: string[];
  price_from?: string;
  price_to?: string;
  currency?: string;
  body?: string;
  cover_photos?: ExperiencePhoto[];
  stops?: ExperienceStop[];
  meta_title?: string;
  meta_description?: string;
};

type ExperienceListItem = {
  experience: Experience;
};

type ExperienceDetailResponse = {
  experience: Experience;
};

type RelatedTour = {
  title: string;
  description?: string;
  image?: string;
  href: string;
  price?: string;
};

type CarPhoto = {
  id: number;
  cover_photos: string;
  is_featured?: boolean;
  order?: number;
};

type Car = {
  id: number;
  title?: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  number_of_seats?: number;
  price?: string | number;
  price_from?: string | number;
  price_to?: string | number;
  currency?: string;
  cover_photos?: CarPhoto[];
  images?: CarPhoto[];
};

type CarsApiItem = {
  car: Car;
};

type TourVehicle = {
  title: string;
  image?: string;
  seats?: number;
  description?: string;
  price?: string;
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SITE_URL = "https://capetown-concierge.co.za";

function zarToUsd(val: string | number): string {
  const num = Number(String(val).replace(/[^0-9.]/g, ""));
  return isNaN(num) || num === 0 ? String(val) : `${Math.round(num / 18.5)}`;
}

function formatPriceRange(
  priceFrom?: string | number,
  priceTo?: string | number,
) {
  if (
    (priceFrom === undefined || priceFrom === null || priceFrom === "") &&
    (priceTo === undefined || priceTo === null || priceTo === "")
  ) {
    return "";
  }
  if (priceFrom && priceTo) return `From $${zarToUsd(priceFrom)} - $${zarToUsd(priceTo)}`;
  if (priceFrom) return `From $${zarToUsd(priceFrom)}`;
  return `$${zarToUsd(priceTo!)}`;
}

function formatVehiclePrice(price?: string | number) {
  if (price === undefined || price === null || price === "") return "";
  const num = Number(String(price).replace(/[^0-9.]/g, ""));
  return isNaN(num) || num === 0 ? "" : `From $${Math.round(num)} per day`;
}

function truncateText(text?: string, maxLength = 140) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

async function getAllExperiences(): Promise<ExperienceListItem[]> {
  const response = await fetch(
    "https://web-production-1ab9.up.railway.app/api/experiences/all/",
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch experiences list");
  }

  return response.json();
}

async function getAllVehicles(): Promise<CarsApiItem[]> {
  const response = await fetch(
    "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }

  const data = await response.json();

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  return [];
}

async function getExperienceIdBySlug(slug: string) {
  const data = await getAllExperiences();
  const match = data.find((item) => item?.experience?.slug === slug);
  return match?.experience?.id || null;
}

async function getExperienceDetails(
  id: number
): Promise<ExperienceDetailResponse | Experience> {
  const response = await fetch(
    `https://web-production-1ab9.up.railway.app/api/experiences/${id}/details/`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch experience details");
  }

  return response.json();
}

function normalizeExperience(data: ExperienceDetailResponse | Experience): Experience {
  return (data as ExperienceDetailResponse)?.experience || (data as Experience);
}

function getPrimaryImage(experience: Experience) {
  const sorted = [...(experience.cover_photos || [])].sort(
    (a, b) => a.order - b.order
  );

  return (
    sorted.find((photo) => photo.is_featured)?.cover_photos ||
    sorted[0]?.cover_photos ||
    ""
  );
}

function getSeoKeyword(experience: Experience): string {
  const name = experience.title || "Private Tour";
  return `${name} Cape Town`;
}

function getPageTitle(experience: Experience) {
  if (experience.meta_title) return experience.meta_title;
  const keyword = getSeoKeyword(experience);
  const priceStr =
    experience.price_from
      ? ` | From $${zarToUsd(experience.price_from!)}`
      : "";
  return `${keyword} | Private Chauffeur Tour${priceStr} | Cape Town Concierge`;
}

function getPageDescription(experience: Experience) {
  if (experience.meta_description) return experience.meta_description;
  const keyword = getSeoKeyword(experience);
  const base =
    experience.short_description ||
    experience.highlight ||
    `${keyword} — a fully private, chauffeur-driven experience.`;
  return truncateText(
    `${base} Private, bespoke, and tailored to your pace. Book via WhatsApp.`,
    155
  );
}

function getSocialTitle(experience: Experience) {
  const name = experience.title || "Private Tour";
  return `${name} — Private Chauffeur Tour in Cape Town`;
}

function getSocialDescription(experience: Experience) {
  const hook =
    experience.short_description ||
    experience.highlight ||
    `A fully private, chauffeur-driven ${experience.title || "tour"} in Cape Town tailored entirely to your pace.`;
  const clean = hook.length > 115 ? `${hook.slice(0, 115).trim()}...` : hook;
  return `${clean} Book privately via WhatsApp — we respond in 30 min.`;
}

function mapRelatedTours(
  allExperiences: ExperienceListItem[],
  currentSlug: string
): RelatedTour[] {
  return allExperiences
    .map((item) => item.experience)
    .filter((tour) => tour.slug && tour.slug !== currentSlug)
    .map((tour) => ({
      title: tour.title || "Private Tour",
      description:
        tour.short_description ||
        tour.highlight ||
        "Discover another premium private tour experience in Cape Town.",
      image:
        [...(tour.cover_photos || [])].sort((a, b) => a.order - b.order)[0]
          ?.cover_photos || "",
      href: `/private-tours/${tour.slug}`,
      price: formatPriceRange(tour.price_from, tour.price_to),
    }));
}

function mapVehicles(items: CarsApiItem[]): TourVehicle[] {
  return items
    .map((item) => item?.car || item)
    .filter((car) => car?.title)
    .map((car) => {
      const imageArray = car.cover_photos || car.images || [];
      const sortedImages = [...imageArray].sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );

      const featuredPhoto =
        sortedImages.find((photo) => photo?.is_featured)?.cover_photos ||
        sortedImages[0]?.cover_photos ||
        "";

      const description =
        car.short_description ||
        car.highlight ||
        truncateText(car.body, 120) ||
        "A premium chauffeur-driven vehicle suitable for private touring in Cape Town.";

      return {
        title: car.title || "Vehicle",
        image: featuredPhoto,
        seats: car.number_of_seats,
        description,
        price: formatVehiclePrice(car.price),
      };
    });
}

export async function generateStaticParams() {
  const data = await getAllExperiences();
  return data
    .map((item) => item?.experience?.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experienceId = await getExperienceIdBySlug(slug);

  if (!experienceId) {
    return {
      title: "Private Tour | Cape Town Concierge",
      description: "Luxury private tours in Cape Town",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }

  const raw = await getExperienceDetails(experienceId);
  const experience = normalizeExperience(raw);

  const title = getPageTitle(experience);
  const description = getPageDescription(experience);
  const socialTitle = getSocialTitle(experience);
  const socialDescription = getSocialDescription(experience);
  const image = getPrimaryImage(experience);
  const canonicalUrl = `${SITE_URL}/private-tours/${slug}`;

  const keyword = getSeoKeyword(experience);

  return {
    title,
    description,
    keywords: [
      keyword,
      `${experience.title} Cape Town`,
      `private ${experience.title?.toLowerCase()} Cape Town`,
      `${experience.title} with chauffeur`,
      "private tours Cape Town",
      "luxury private tours Cape Town",
      "chauffeur tours Cape Town",
    ].filter(Boolean),
    alternates: {
      canonical: canonicalUrl,
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
      title: socialTitle,
      description: socialDescription,
      url: canonicalUrl,
      siteName: "Cape Town Concierge",
      type: "website",
      locale: "en_ZA",
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: socialTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: image ? [image] : [],
    },
  };
}

export default async function PrivateTourDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [allExperiences, allVehicles, experienceId] = await Promise.all([
    getAllExperiences(),
    getAllVehicles(),
    getExperienceIdBySlug(slug),
  ]);

  if (!experienceId) {
    notFound();
  }

  const raw = await getExperienceDetails(experienceId);
  const experience = normalizeExperience(raw);

  if (!experience) {
    notFound();
  }

  const relatedTours = mapRelatedTours(allExperiences, slug);
  const vehicles = mapVehicles(allVehicles);

  const primaryImage = getPrimaryImage(experience);
  const canonicalUrl = `${SITE_URL}/private-tours/${slug}`;
  const price = experience.price_from || experience.price_to || "";

  const tourName = experience.title || "private tour";
  const tourKeyword = getSeoKeyword(experience);
  const priceAnswer = experience.price_from
    ? `${tourKeyword} starts from $${zarToUsd(experience.price_from!)} per vehicle. This is an all-inclusive private experience — contact us via WhatsApp for a personalised quote based on your group size and requirements.`
    : `Pricing for ${tourKeyword} depends on your group size and any custom requirements. Contact us via WhatsApp for a tailored quote — we typically respond within 30 minutes.`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much does the ${tourName} cost?`,
        acceptedAnswer: { "@type": "Answer", text: priceAnswer },
      },
      {
        "@type": "Question",
        name: `How long does the ${tourName} take?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: experience.duration
            ? `The ${tourName} typically runs for ${experience.duration}. The exact duration depends on your pace and any custom stops you would like to include.`
            : `The ${tourName} usually runs for a full day — approximately 8 to 10 hours — depending on the route, your pace, and any custom stops.`,
        },
      },
      {
        "@type": "Question",
        name: `Is the ${tourName} a private experience?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. The ${tourName} is completely private — you travel exclusively with your group, with no shared passengers or fixed group schedules. Your itinerary, pace, and stops are entirely your own.`,
        },
      },
      {
        "@type": "Question",
        name: `Can the ${tourName} itinerary be customised?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. We can tailor the route, timing, and stops of the ${tourName} around your preferences. Let us know what you would like to see or experience and we will build a personalised plan.`,
        },
      },
      {
        "@type": "Question",
        name: `Does the ${tourName} include a professional chauffeur?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. All our tours include a professionally presented chauffeur who manages the route and timing so you can fully focus on the experience. Your chauffeur has extensive local knowledge of Cape Town and the surrounding areas.`,
        },
      },
      {
        "@type": "Question",
        name: `What is included in the ${tourName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${tourName} includes a premium vehicle, professional chauffeur, fuel, and complimentary bottled water. Entrance fees to attractions, meals, and gratuities are not included unless specified.`,
        },
      },
      {
        "@type": "Question",
        name: `How do I book the ${tourName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The fastest way to book is via WhatsApp. Share your preferred date, group size, and any special requirements and we will confirm availability and pricing within 30 minutes. Same-day bookings are welcomed where possible.`,
        },
      },
      {
        "@type": "Question",
        name: `Is the ${tourName} suitable for families and couples?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. The ${tourName} is well-suited for couples, families, and small groups. The experience is fully private so it adapts naturally to the pace and preferences of your party.`,
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
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
        name: "Private Tours",
        item: `${SITE_URL}/private-tours`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: experience.title || "Private Tour",
        item: canonicalUrl,
      },
    ],
  };

  const tourJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tourKeyword,
    description: getPageDescription(experience),
    image: primaryImage ? [primaryImage] : [],
    url: canonicalUrl,
    provider: {
      "@type": "LocalBusiness",
      name: "Cape Town Concierge",
      url: SITE_URL,
      telephone: "+27636746131",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cape Town",
        addressRegion: "Western Cape",
        addressCountry: "ZA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -33.9249,
        longitude: 18.4241,
      },
      priceRange: "$$$$",
    },
    touristType: ["Luxury Travelers", "Couples", "Families"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "28",
      bestRating: "5",
      worstRating: "1",
    },
    offers: price
      ? {
          "@type": "Offer",
          priceCurrency: "USD",
          price: price,
          availability: "https://schema.org/InStock",
          url: canonicalUrl,
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
      />

      <PrivateTourDetailView
        experience={experience}
        relatedTours={relatedTours}
        vehicles={vehicles}
      />
    </>
  );
}