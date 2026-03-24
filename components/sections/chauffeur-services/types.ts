export type CarPhoto = {
  id: number;
  cover_photos: string;
  is_featured?: boolean;
  order?: number;
};

export type Car = {
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

export type RelatedVehicle = {
  title: string;
  image?: string;
  description?: string;
  seats?: number;
  price?: string;
  href: string;
};

export type ReviewItem = {
  quote: string;
  name: string;
  subtitle: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};