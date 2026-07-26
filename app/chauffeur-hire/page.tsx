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
  is_active?: boolean;
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

const CHAUFFEUR_VEHICLE_DESC: Record<string, string> = {
  "Hyundai Staria": "A premium 9-seat people carrier with generous legroom and panoramic windows. Comfortable, stylish, and built for a full day on the road — whether that's a city tour, a wine route, or an airport run.",
  "BMW X5": "A luxury SUV with elevated road presence and a spacious, refined interior. Ideal for families or small groups who want serious comfort without compromising on style.",
};

async function getVehicles(): Promise<FeaturedVehicleItem[]> {
  try {
    const response = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
      { next: { revalidate: 300 } }
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
              ? `/chauffeur-hire/${car.slug.trim()}`
              : "/chauffeur-hire",
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

const META_TITLE = "Chauffeur Hire Cape Town | Private Driver & Luxury Car Hire";
const META_DESCRIPTION =
  "Chauffeur hire in Cape Town — private drivers and luxury vehicles for executive travel, airport transfers and full-day chauffeur hire. PDP-licensed drivers, flat pricing, meet-and-greet at CPT. Message on WhatsApp.";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  keywords: [
    "chauffeur hire Cape Town",
    "chauffeur hire in Cape Town",
    "private chauffeur Cape Town",
    "luxury car hire with driver Cape Town",
    "executive chauffeur Cape Town",
    "chauffeur service Cape Town",
  ],
  alternates: {
    canonical: `${SITE_URL}/chauffeur-hire`,
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
    url: `${SITE_URL}/chauffeur-hire`,
    siteName: brand.name,
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Chauffeur hire in Cape Town — private driver and luxury vehicle",
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

export default async function ChauffeurServicesLandingPage() {
  const vehicles = await getVehicles();

  const areaServed = [
    { "@type": "City", name: "Cape Town" },
    { "@type": "AdministrativeArea", name: "Cape Winelands" },
    { "@type": "AdministrativeArea", name: "Garden Route" },
    { "@type": "AdministrativeArea", name: "Western Cape" },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Chauffeur Hire in Cape Town",
        url: `${SITE_URL}/chauffeur-hire`,
        description:
          "Chauffeur hire in Cape Town — private drivers and luxury vehicles for executive travel, airport transfers, and full-day chauffeur hire across the Western Cape.",
        image: [`${SITE_URL}/images/hero-car.jpg`],
      },
      {
        "@type": ["LocalBusiness", "LimousineService"],
        "@id": `${SITE_URL}/chauffeur-hire#business`,
        name: brand.name,
        url: SITE_URL,
        telephone: brand.phone,
        email: brand.contactEmail,
        image: [`${SITE_URL}${brand.heroImagePath}`],
        priceRange: "$$$",
        currenciesAccepted: "ZAR, USD, EUR, GBP",
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
        areaServed,
        openingHoursSpecification: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: day,
          opens: "00:00",
          closes: "23:59",
        })),
        sameAs: [
          `https://wa.me/${brand.whatsappNumber}`,
          brand.social?.instagram,
          brand.social?.tiktok,
          brand.social?.facebook,
          brand.social?.youtube,
        ].filter((u): u is string => Boolean(u)),
      },
      {
        "@type": "Service",
        name: "Chauffeur Hire in Cape Town",
        serviceType: "Chauffeur Hire",
        provider: { "@id": `${SITE_URL}/chauffeur-hire#business` },
        areaServed,
        image: [`${SITE_URL}/images/hero-car.jpg`],
        description:
          "Private chauffeur hire in Cape Town — luxury vehicles with PDP-licensed drivers for executive travel, airport transfers, multi-day corporate schedules, and full-day private hire across the Western Cape.",
        url: `${SITE_URL}/chauffeur-hire`,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is included when I hire a chauffeur in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Every chauffeur hire booking includes the vehicle, a professional PDP-licensed chauffeur, fuel, and toll fees. For airport transfers your driver tracks your flight and meets you at arrivals with a name board. For full-day chauffeur hire we plan the route around your schedule.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer chauffeur-driven airport transfers in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We provide 24/7 chauffeured airport transfers to and from Cape Town International — meet-and-greet at arrivals, real-time flight tracking, and luggage assistance are included in every transfer.",
            },
          },
          {
            "@type": "Question",
            name: "Can I hire a chauffeur for a full day?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Full-day chauffeur hire is available for city travel, wine routes, meetings, restaurant runs, scenic drives, and bespoke itineraries. The day runs entirely on your schedule with the same driver and vehicle throughout.",
            },
          },
          {
            "@type": "Question",
            name: "Which vehicles are available for chauffeur hire?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our fleet includes the BMW 5-Series, BMW X5, Hyundai Staria (9 seats), Mercedes V-Class (6 seats), and Range Rover Sport. All vehicles are premium, climate-controlled, and privately driven — no ride-sharing.",
            },
          },
          {
            "@type": "Question",
            name: "Is a private chauffeur better than self-driving in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For most visitors, yes — especially for airport transfers, wine routes, and long scenic drives. You arrive relaxed, your group travels together, and there's no parking, no navigation, and no designated driver required.",
            },
          },
          {
            "@type": "Question",
            name: "How do we book a chauffeur for a visiting executive?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Message us on WhatsApp with the flight details, arrival time, hotel, and any onward schedule. We confirm the driver, the vehicle, and the flat fare in writing — usually within 30 minutes.",
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
            name: "Chauffeur Hire",
            item: `${SITE_URL}/chauffeur-hire`,
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