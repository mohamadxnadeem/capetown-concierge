export type ItineraryDay = {
  day: string;
  title: string;
  image: string;
  distance: string;
  description: string;
  highlights: string[];
  bestBookedAs: string;
  whatsappMessage?: string;
};

export type AddOnItem = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

// ─── Weekly pricing block ─────────────────────────────────────────────

export interface WeeklyPricingVehicle {
  slug: string;
  title: string;
  seats: number;
  dailyRateZar: number;
  discountPercent: number;
  primaryImage: string;
  href: string;
}

// ─── Hotels section ───────────────────────────────────────────────────

export interface ItineraryHotelCard {
  slug: string;
  name: string;
  location: string;
  starRating: number | null;
  priceFromZar: number | null;
  primaryImage: string;
  shortDescription: string;
}
