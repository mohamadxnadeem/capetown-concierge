export type ItineraryDay = {
  day: string;
  title: string;
  image: string;
  description: string;
  highlights: string[];
  bestBookedAs: string;
};

export type AddOnItem = {
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  href: string;
};