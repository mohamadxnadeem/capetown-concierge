"use client";

import { useEffect, useMemo, useState } from "react";
import PrivateTourVehicles from "../private-tour-detail/PrivateTourVehicles";
import { Container, Section } from "../wine-farms/shared";

type CarsForHireImage = {
  id: number;
  cover_photos: string;
  order?: number;
  is_featured?: boolean;
};

type CarsForHireApiItem = {
  car?: {
    id: number;
    title: string;
    slug?: string;
    number_of_seats?: number;
    price?: string | number | null;
    price_from?: string | number | null;
    price_to?: string | number | null;
    short_description?: string | null;
    highlight?: string | null;
    cover_photos?: CarsForHireImage[];
    is_active?: boolean;
  };
  cover_photos?: CarsForHireImage[];
};

type VehicleCardItem = {
  title: string;
  description: string;
  image?: string;
  seats?: number;
  price?: string;
};

type Props = {
  title?: string;
};

const API_URL =
  "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/";

function pickImage(item: CarsForHireApiItem): string | undefined {
  const carImages = item.car?.cover_photos || [];
  const topImages = item.cover_photos || [];
  return carImages[0]?.cover_photos || topImages[0]?.cover_photos || undefined;
}

function normalizeVehicles(data: CarsForHireApiItem[]): VehicleCardItem[] {
  return data
    .filter((item) => item?.car?.is_active !== false && item?.car?.title)
    .map((item) => {
      const car = item.car!;
      const priceValue = car.price_from ?? car.price ?? "";

      return {
        title: car.title,
        description:
          car.short_description ||
          car.highlight ||
          "A premium chauffeur-driven vehicle suitable for wine tours and private travel in Cape Town.",
        image: pickImage(item),
        seats: car.number_of_seats,
        price: priceValue ? String(priceValue) : "",
      };
    });
}

export default function AvailableVehicles({
  title = "Private Wine Tour in Cape Town",
}: Props) {
  const [vehicles, setVehicles] = useState<VehicleCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadVehicles() {
      try {
        setLoading(true);
        setHasError(false);

        const res = await fetch(API_URL, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Failed to fetch vehicles: ${res.status}`);
        }

        const json = (await res.json()) as CarsForHireApiItem[];
        if (!isMounted) return;

        setVehicles(normalizeVehicles(json));
      } catch (error) {
        console.error("AvailableVehicles fetch error:", error);
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadVehicles();

    return () => {
      isMounted = false;
    };
  }, []);

  const items = useMemo(() => vehicles, [vehicles]);

  if (loading) return null;
  if (hasError || !items.length) return null;

  return (
    <Section>
      <Container>
        <PrivateTourVehicles items={items} tourTitle={title} />
      </Container>
    </Section>
  );
}