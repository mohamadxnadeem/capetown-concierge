import type { Metadata } from "next";
import ChauffeurServicesPage from "../../components/sections/chauffeur-services/ChauffeurServicesPage";
import { brand } from "../../lib/brand";

type CarPhoto = {
  cover_photos?: string;
  is_featured?: boolean;
};

type CarItem = {
  title?: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  cover_photos?: CarPhoto[];
  images?: CarPhoto[];
  number_of_seats?: number;
  price?: string | number;
};

type CarsApiItem = {
  car?: CarItem;
} & Partial<CarItem>;

export type FeaturedVehicleItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  seats?: number;
  priceUsd?: number;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function formatPrice(price?: string | number) {
  if (price === undefined || price === null || price === "") return "";
  const num = Number(String(price).replace(/[^0-9.]/g, ""));
  return isNaN(num) || num === 0 ? "" : `From $${Math.round(num)} per day`;
}

const CHAUFFEUR_VEHICLE_DESC: Record<string, string> = {
  "Hyundai Staria": "A premium people carrier with generous legroom and panoramic windows, designed for groups of up to 8. Comfortable, stylish, and built for a full day on the road — whether that's a city tour, a wine route, or an airport run.",
  "BMW X5": "A luxury SUV with elevated road presence and a spacious, refined interior. Ideal for families or small groups who want serious comfort without compromising on style.",
};

async function getVehicles(): Promise<FeaturedVehicleItem[]> {
  try {
    const response = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return [];
    const data = await response.json();
    const sourceArray: CarsApiItem[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
      ? data.results
      : [];
    return (
      sourceArray.map((item: CarsApiItem) => {
        const car = item?.car || item;
        if (!car?.title) return null;
        const imageArray = car.cover_photos || car.images || [];
        const featuredPhoto =
          imageArray.find((photo: CarPhoto) => photo?.is_featured)?.cover_photos ||
          imageArray[0]?.cover_photos ||
          "";
        return {
          title: car.title,
          description:
            CHAUFFEUR_VEHICLE_DESC[car.title] ||
            car.short_description ||
            car.highlight ||
            truncateText(stripHtml(car.body || ""), 140) ||
            "Luxury chauffeur vehicle available for private travel in Cape Town.",
          href:
            typeof car.slug === "string" && car.slug.trim()
              ? `/chauffeur-services/${car.slug.trim().toLowerCase()}`
              : "/chauffeur-services",
          image: featuredPhoto,
          alt: `Luxury ${car.title} Chauffeur Service Cape Town - VIP Transport`,
          seats: car.number_of_seats,
          priceUsd: car.price ? Number(String(car.price).replace(/[^0-9.]/g, "")) || undefined : undefined,
        };
      }) as Array<FeaturedVehicleItem | null>
    ).filter((item): item is FeaturedVehicleItem => item !== null);
  } catch {
    return [];
  }
}

const SITE_URL = brand.siteUrl;
const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

export const metadata: Metadata = {
  title: "Chauffeur Service Cape Town | Private Driver Hire",
  description:
    "Book a professional chauffeur in Cape Town for airport transfers, full-day hire & executive travel. Luxury fleet. No shared rides. WhatsApp to book.",
  alternates: {
    canonical: `${SITE_URL}/chauffeur-services`,
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
    title: "Chauffeur Service Cape Town | Private Driver Hire",
    description:
      "Book a professional chauffeur in Cape Town for airport transfers, full-day hire & executive travel. Luxury fleet. No shared rides. WhatsApp to book.",
    url: `${SITE_URL}/chauffeur-services`,
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
    title: "Chauffeur Service Cape Town | Private Driver Hire",
    description:
      "Book a professional chauffeur in Cape Town for airport transfers, full-day hire & executive travel. Luxury fleet. No shared rides. WhatsApp to book.",
    images: [OG_IMAGE],
  },
};

export default async function ChauffeurServicesLandingPage() {
  const vehicles = await getVehicles();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Chauffeur Service Cape Town",
        url: `${SITE_URL}/chauffeur-services`,
        description:
          "Luxury chauffeur service in Cape Town for airport transfers, private tours, executive travel, and bespoke day hire.",
        image: [`${SITE_URL}/images/hero-car.jpg`],
      },
      {
        "@type": "Service",
        name: "Private Chauffeur Service Cape Town",
        serviceType: "Private Chauffeur Service",
        provider: {
          "@type": "Organization",
          name: brand.name,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "City",
          name: "Cape Town",
        },
        image: [`${SITE_URL}/images/hero-car.jpg`],
        description:
          "Luxury chauffeur-driven transport in Cape Town for airport transfers, executive travel, bespoke itineraries, and private day hire.",
        url: `${SITE_URL}/chauffeur-services`,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is included in a full-day chauffeur hire in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Full-day chauffeur hire includes your dedicated professional driver, a premium vehicle, fuel, and unlimited kilometres within the Cape Town area. Hotel pickup and drop-off is included. We tailor the route entirely around your schedule and preferences.",
            },
          },
          {
            "@type": "Question",
            name: "How do I book a chauffeur service in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Message us on WhatsApp and we will confirm your booking, vehicle, and itinerary within 30 minutes. We are available 7 days a week.",
            },
          },
          {
            "@type": "Question",
            name: "What vehicles are available for chauffeur hire in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our fleet includes the BMW 5-Series, BMW X5, Mercedes V-Class, Hyundai Staria, Mercedes Sprinter, and Range Rover Sport. Each vehicle is privately assigned to your group for the full duration of your booking.",
            },
          },
          {
            "@type": "Question",
            name: "Is the chauffeur service 100% private?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Every booking is entirely private. We never combine bookings or add strangers to your vehicle. Your group has the vehicle exclusively for the full day.",
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
            name: "Chauffeur Services",
            item: `${SITE_URL}/chauffeur-services`,
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
      <ChauffeurServicesPage vehicles={vehicles} />
    </>
  );
}