import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ChauffeurDetailView from "../../../components/sections/chauffeur-services/ChauffeurDetailView";

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
  params: Promise<{
    slug: string;
  }>;
};

const SITE_URL = "https://capetown-concierge.co.za";

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
  if (priceFrom && priceTo) {
    return `From ${symbol}${priceFrom} - ${symbol}${priceTo}`;
  }
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

async function getAllVehicles(): Promise<CarsApiItem[]> {
  const response = await fetch(
    "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }

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

function getVehicleImageAlt(car: Car) {
  const name = car.title || "Luxury chauffeur vehicle";
  return `Luxury ${name} chauffeur service in Cape Town for VIP transport and private travel`;
}

function getFormattedDailyRate(car: Car) {
  return formatPrice(car.price, car.price_from, car.price_to, car.currency);
}

function getMetaFriendlyRate(car: Car) {
  const value = getFormattedDailyRate(car);
  if (!value) return "";
  return value.replace(/^From\s+/i, "");
}

function getPageTitle(car: Car) {
  const name = car.title || "Luxury Vehicle";

  return (
    car.meta_title ||
    `${name} | VIP Chauffeur Hire Cape Town`
  );
}

function getPageDescription(car: Car) {
  if (car.meta_description) return car.meta_description;

  const name = car.title || "Luxury vehicle";
  const rate = getMetaFriendlyRate(car);
  const seats = car.number_of_seats ? ` Up to ${car.number_of_seats} seats.` : "";
  const luggage = car.luggage_capacity
    ? ` Ideal for ${car.luggage_capacity} luggage pieces.`
    : "";

  const premiumDescription = rate
    ? `${name} VIP chauffeur hire in Cape Town from ${rate} per day. Perfect for airport transfers, executive travel, private tours, and luxury day hire.${seats}${luggage}`
    : `${name} VIP chauffeur hire in Cape Town for airport transfers, executive travel, private tours, and luxury day hire.${seats}${luggage}`;

  return truncateText(
    car.short_description ||
      car.highlight ||
      car.chauffeur_service_text ||
      premiumDescription,
    155
  );
}

function getShortVehicleDescription(car: Car) {
  const name = car.title || "chauffeur vehicle";
  const rate = getFormattedDailyRate(car);

  return (
    car.short_description ||
    car.highlight ||
    truncateText(car.body, 180) ||
    (rate
      ? `${name} chauffeur hire in Cape Town ${rate.toLowerCase()} for airport transfers, private travel, and VIP transport.`
      : `Premium ${name} in Cape Town for private travel, airport transfers, and chauffeur-driven experiences.`)
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

function buildVehicleFaqs(car: Car, formattedPrice: string) {
  const name = car.title || "this luxury vehicle";
  const seats = car.number_of_seats ? `${car.number_of_seats}` : "multiple";
  const luggage = car.luggage_capacity ? `${car.luggage_capacity}` : "ample";

  return [
    {
      question: `What is included when booking ${name} in Cape Town?`,
      answer:
        "Bookings are designed around a premium chauffeur-driven experience, including the vehicle, a professional driver, and flexible private travel tailored to your itinerary.",
    },
    {
      question: `Is ${name} suitable for airport transfers in Cape Town?`,
      answer:
        "Yes, this vehicle is ideal for premium airport transfers, offering a polished arrival and departure experience with comfort, luggage space, and professional service.",
    },
    {
      question: `How many passengers can ${name} accommodate?`,
      answer: `${name} is suitable for up to ${seats} passengers and offers ${luggage} luggage space depending on travel requirements.`,
    },
    {
      question: `Can I book ${name} for a full-day private chauffeur service?`,
      answer:
        "Yes, this vehicle can be booked for full-day private chauffeur service in Cape Town, including city travel, meetings, scenic routes, wine tours, and custom day itineraries.",
    },
    {
      question: `What is the price for ${name} chauffeur service in Cape Town?`,
      answer: formattedPrice
        ? `${name} chauffeur service pricing typically starts ${formattedPrice.toLowerCase()}. Final pricing depends on route, duration, and itinerary requirements.`
        : "Pricing depends on route, duration, and itinerary requirements. Contact us for availability and a tailored quote.",
    },
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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

  return {
    title,
    description,
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
      type: "article",
      images: image
        ? [
            {
              url: image,
              alt: getVehicleImageAlt(car),
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

export default async function ChauffeurServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const vehicles = normalizeCars(await getAllVehicles());
  const car = getVehicleBySlug(vehicles, slug);

  if (!car) {
    notFound();
  }

  const relatedVehicles = mapRelatedVehicles(vehicles, slug);
  const image = getPrimaryImage(car);
  const canonicalUrl = `${SITE_URL}/chauffeur-services/${slug}`;
  const pageTitle = getPageTitle(car);
  const pageDescription = getPageDescription(car);
  const formattedPrice = formatPrice(
    car.price,
    car.price_from,
    car.price_to,
    car.currency
  );
  const numericPrice = getNumericPriceValue(
    car.price,
    car.price_from,
    car.price_to
  );
  const vehicleFaqs = buildVehicleFaqs(car, formattedPrice);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: car.title || "Luxury Chauffeur Vehicle",
        image: image ? [image] : [],
        description: getShortVehicleDescription(car),
        brand: {
          "@type": "Brand",
          name: "Cape Town Concierge",
        },
        category: car.category || car.vehicle_type || "Luxury Chauffeur Vehicle",
        url: canonicalUrl,
        ...(numericPrice
          ? {
              offers: {
                "@type": "Offer",
                priceCurrency: car.currency || "ZAR",
                price: numericPrice,
                availability: "https://schema.org/InStock",
                url: canonicalUrl,
              },
            }
          : {}),
      },
      {
        "@type": "Service",
        name: `${car.title || "Luxury Vehicle"} VIP Chauffeur Hire Cape Town`,
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
        image: image ? [image] : [],
        description:
          car.chauffeur_service_text || getShortVehicleDescription(car),
        url: canonicalUrl,
      },
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
          {
            "@type": "ListItem",
            position: 3,
            name: car.title || "Vehicle",
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "WebPage",
        name: pageTitle,
        description: pageDescription,
        url: canonicalUrl,
        image: image ? [image] : [],
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
      <ChauffeurDetailView car={car} relatedVehicles={relatedVehicles} />
    </>
  );
}