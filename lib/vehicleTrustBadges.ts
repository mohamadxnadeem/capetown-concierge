export type TrustIconName =
  | "luggage"
  | "briefcase"
  | "users"
  | "fuel"
  | "map"
  | "plane"
  | "shield"
  | "calendar-check";

export type TrustBadge = {
  title: string;
  subtitle: string;
  icon: TrustIconName;
  href?: string;
};

export const SHARED_TRUST_BADGES: TrustBadge[] = [
  {
    title: "Fuel, Tolls & Parking Included",
    subtitle: "No extras at Chapman's Peak or the Waterfront",
    icon: "fuel",
  },
  {
    title: "Your Chauffeur Is Your Guide",
    subtitle: "Registered driver-guides. No separate guide fee",
    icon: "map",
  },
  {
    title: "Flight Tracked, Never Rushed",
    subtitle: "Land late and your chauffeur is still there",
    icon: "plane",
  },
  {
    title: "Child Seats Fitted Free",
    subtitle: "Tell us ages when booking, ready before pickup",
    icon: "shield",
  },
  {
    title: "Free Cancellation, 72 Hours",
    subtitle: "Single-day bookings. Full policy linked",
    icon: "calendar-check",
    href: "/cancellation-policy",
  },
];

// Keyed by lowercase slug. "TODO" values are placeholders awaiting real figures.
export const VEHICLE_TRUST_BADGES: Record<string, TrustBadge> = {
  "range-rover-sport-chauffeur-service": {
    title: "4 Guests, 2 Large Bags",
    subtitle: "More luggage? Ask about the V-Class",
    icon: "luggage",
  },
  "bmw-x5-for-hire-with-driver": {
    title: "4 Guests, TODO Large Bags",
    subtitle: "Airport transfers from R5,000",
    icon: "luggage",
  },
  "audi-a4": {
    title: "3 Guests, TODO Bags",
    subtitle: "Travelling heavy? Ask about the Staria",
    icon: "luggage",
  },
  "bmw-5-series-for-hire-with-driver": {
    title: "3 Guests, TODO Bags",
    subtitle: "Executive comfort for business days",
    icon: "briefcase",
  },
  "mercedes-benz-e-class": {
    title: "3 Guests, TODO Bags",
    subtitle: "Executive comfort for business days",
    icon: "briefcase",
  },
  "8-seater-staria-van-with-driver": {
    title: "8 Guests, Room for Luggage",
    subtitle: "Ideal for families and elderly guests",
    icon: "users",
  },
  "mercedes-v-class-private-chauffeur-service": {
    title: "6 Guests, TODO Large Bags",
    subtitle: "Bigger group? We run two V-Classes together",
    icon: "users",
  },
};

export function getVehicleBadge(slug?: string | null): TrustBadge | undefined {
  if (!slug) return undefined;
  return VEHICLE_TRUST_BADGES[slug.toLowerCase()];
}

export const PAYMENT_BADGE = {
  title: "Pay Securely by Card",
  subtitle: "Secure Yoco link plus a written booking agreement",
};
