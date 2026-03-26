export type ExperiencePhoto = {
  id: number;
  experience?: number;
  cover_photos: string;
  order: number;
  is_featured?: boolean;
};

export type ExperienceStop = {
  id: number;
  title: string;
  short_description?: string;
  highlight?: string;
  image?: string;
  order: number;
  estimated_time?: string;
  stop_type?: string;
};

export type Experience = {
  title?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  duration?: string;
  location?: string;
  price_from?: string;
  price_to?: string;
  currency?: string;
  cover_photos?: ExperiencePhoto[];
  images?: ExperiencePhoto[];
  stops?: ExperienceStop[];
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type FaqItem = FAQItem;

export type TourVehicle = {
  title: string;
  image?: string;
  seats?: number;
  description?: string;
  price?: string;
};

export type ReviewItem = {
  quote: string;
  name: string;
  subtitle: string;
};

export type RelatedTour = {
  title: string;
  href: string;
  image?: string;
  description?: string;
  price?: string;
};