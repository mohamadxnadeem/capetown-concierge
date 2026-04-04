import type { Metadata } from "next";
import ChauffeurServicesPage from "../../components/sections/chauffeur-services/ChauffeurServicesPage";

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
  price?: string;
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
  return `R${price}`;
}

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
            car.short_description ||
            car.highlight ||
            truncateText(stripHtml(car.body || ""), 140) ||
            "Luxury chauffeur vehicle available for private travel in Cape Town.",
          href:
            typeof car.slug === "string" && car.slug.trim()
              ? `/chauffeur-services/${car.slug.trim()}`
              : "/chauffeur-services",
          image: featuredPhoto,
          alt: `Luxury ${car.title} Chauffeur Service Cape Town - VIP Transport`,
          seats: car.number_of_seats,
          price: formatPrice(car.price),
        };
      }) as Array<FeaturedVehicleItem | null>
    ).filter((item): item is FeaturedVehicleItem => item !== null);
  } catch {
    return [];
  }
}

const SITE_URL = "https://capetown-concierge.co.za";

export const metadata: Metadata = {
  title: "Chauffeur Service Cape Town | Luxury Private Driver & Airport Transfers",
  description:
    "Book a luxury chauffeur service in Cape Town for airport transfers, private tours, executive travel, and bespoke day hire. Premium vehicles, professional drivers, and tailored itineraries.",
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
    title: "Private Chauffeur Service Cape Town — Airport, Tours & Day Hire",
    description:
      "Professional, discreet, and always on time. Mercedes V-Class, BMW X5, and more. Airport transfers, private tours, and executive travel. Book via WhatsApp.",
    url: `${SITE_URL}/chauffeur-services`,
    siteName: "Cape Town Concierge",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/hero-car.jpg`,
        width: 1200,
        height: 630,
        alt: "Private chauffeur service Cape Town — luxury vehicles for hire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Chauffeur Service Cape Town — Airport, Tours & Day Hire",
    description:
      "Professional, discreet, and always on time. Mercedes V-Class, BMW X5, and more. Airport transfers, private tours, and executive travel. Book via WhatsApp.",
    images: [`${SITE_URL}/images/hero-car.jpg`],
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
          name: "Cape Town Concierge",
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
            name: "What is included in your chauffeur service in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our chauffeur service is designed around a premium private travel experience, typically including the vehicle, professional driver, and tailored route planning based on your itinerary.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer airport transfers in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, we provide premium airport transfers in Cape Town with professional chauffeurs, polished service, and luxury vehicles suited to couples, families, and executive travellers.",
            },
          },
          {
            "@type": "Question",
            name: "Can I book a chauffeur for a full day in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, you can book a chauffeur for full-day private hire in Cape Town for meetings, sightseeing, wine routes, scenic drives, and bespoke itineraries.",
            },
          },
          {
            "@type": "Question",
            name: "What vehicles are available for chauffeur service?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our fleet includes premium chauffeur-driven vehicles suited to executive travel, airport transfers, couples, families, and VIP group transport.",
            },
          },
          {
            "@type": "Question",
            name: "Is a private chauffeur better than self-drive in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A private chauffeur offers greater comfort, flexibility, and convenience, especially for airport transfers, full-day touring, wine tastings, and clients who want a seamless luxury experience.",
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