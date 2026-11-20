import type { TFunction } from "./i18n/messages";
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

export const SHARED_TRUST_BADGES = (tt: TFunction): TrustBadge[] => ([
  {
    title: tt("vehicleTrustBadges.fuel-tolls-parking-included"),
    subtitle: tt("vehicleTrustBadges.no-extras-at-chapman-s"),
    icon: "fuel",
  },
  {
    title: tt("vehicleTrustBadges.your-chauffeur-is-your-guide"),
    subtitle: tt("vehicleTrustBadges.registered-driver-guides-no-separate"),
    icon: "map",
  },
  {
    title: tt("vehicleTrustBadges.flight-tracked-never-rushed"),
    subtitle: tt("vehicleTrustBadges.land-late-and-your-chauffeur"),
    icon: "plane",
  },
  {
    title: tt("vehicleTrustBadges.child-seats-fitted-free"),
    subtitle: tt("vehicleTrustBadges.tell-us-ages-when-booking"),
    icon: "shield",
  },
  {
    title: tt("vehicleTrustBadges.free-cancellation-72-hours"),
    subtitle: tt("vehicleTrustBadges.single-day-bookings-full-policy"),
    icon: "calendar-check",
    href: "/cancellation-policy",
  },
]);

export const PAYMENT_BADGE = (tt: TFunction) => ({
  title: tt("vehicleTrustBadges.pay-securely-by-card"),
  subtitle: tt("vehicleTrustBadges.secure-yoco-link-plus-a"),
});
