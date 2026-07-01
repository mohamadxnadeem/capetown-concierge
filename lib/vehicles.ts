import { cache } from "react";
import { endpoints } from "./api";

export interface UpsellVehicle {
  slug: string;
  title: string;
  image: string;
  seats?: number;
  priceZar?: number;
}

interface CarPhoto {
  cover_photos?: string;
  is_featured?: boolean;
}

interface CarNode {
  title?: string;
  slug?: string;
  number_of_seats?: number;
  price?: string | number;
  cover_photos?: CarPhoto[];
  images?: CarPhoto[];
}

interface CarsApiItem {
  car?: CarNode;
  cover_photos?: CarPhoto[];
}

function pickFirst(photos: CarPhoto[] | undefined): string {
  if (!photos?.length) return "";
  return (
    photos.find((p) => p?.is_featured)?.cover_photos ||
    photos[0]?.cover_photos ||
    ""
  );
}

function parsePrice(v: string | number | undefined): number | undefined {
  if (v === undefined || v === null || v === "") return undefined;
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

export const fetchUpsellVehicles = cache(_fetchUpsellVehicles);

async function _fetchUpsellVehicles(limit = 8): Promise<UpsellVehicle[]> {
  try {
    const res = await fetch(endpoints.carsForHire.all(), {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items: CarsApiItem[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
      ? data.results
      : [];
    const mapped: (UpsellVehicle | null)[] = items.map((item) => {
      const car = item?.car;
      if (!car?.title || !car?.slug) return null;
      const uv: UpsellVehicle = {
        slug: car.slug,
        title: car.title,
        image:
          pickFirst(item?.cover_photos) ||
          pickFirst(car.cover_photos) ||
          pickFirst(car.images),
      };
      if (car.number_of_seats) uv.seats = car.number_of_seats;
      const price = parsePrice(car.price);
      if (price) uv.priceZar = price;
      return uv;
    });
    return mapped
      .filter((v): v is UpsellVehicle => v !== null)
      .slice(0, limit);
  } catch {
    return [];
  }
}
