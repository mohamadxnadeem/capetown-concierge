export type TrustIconName =
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

export const PAYMENT_BADGE = {
  title: "Pay Securely by Card",
  subtitle: "Secure Yoco link plus a written booking agreement",
};
