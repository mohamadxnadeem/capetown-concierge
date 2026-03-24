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
  car: Car;
};

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

const SITE_URL = "https://www.capetown-concierge.co.za";

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

function truncateText(text?: string, maxLength = 140) {
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
  return items.map((item) => item?.car || item).filter((car) => car?.title);
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

function getPageTitle(car: Car) {
  return (
    car.meta_title ||
    `${car.title || "Chauffeur Vehicle"} | Cape Town Chauffeur Service`
  );
}

function getPageDescription(car: Car) {
  return (
    car.meta_description ||
    car.short_description ||
    car.highlight ||
    "Premium chauffeur-driven vehicles in Cape Town for airport transfers, private touring, and executive travel."
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
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Cape Town Concierge",
      type: "article",
      images: image ? [{ url: image, alt: car.title || "Chauffeur vehicle" }] : [],
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

  return <ChauffeurDetailView car={car} relatedVehicles={relatedVehicles} />;
}