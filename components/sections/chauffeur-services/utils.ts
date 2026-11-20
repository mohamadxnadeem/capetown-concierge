import { Car, FaqItem } from "./types";
export { buildWhatsAppLink } from "../../../lib/whatsapp";
import { brand } from "../../../lib/brand";

import { enT } from "../../../lib/i18n/messages";
import type { TFunction } from "../../../lib/i18n/messages";
export function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function getPrimaryImage(car: Car) {
  const imageArray = car.cover_photos || car.images || [];
  const sorted = [...imageArray].sort((a, b) => (a.order || 0) - (b.order || 0));
  return (
    sorted.find((photo) => photo.is_featured)?.cover_photos ||
    sorted[0]?.cover_photos ||
    ""
  );
}

export function formatCurrency(amount: number) {
  if (!amount || Number.isNaN(amount)) return "";
  return `R${Math.round(amount).toLocaleString()}`;
}

export function formatPrice(price?: string | number, tt: TFunction = enT) {
  if (price === undefined || price === null || price === "") return "";
  const num = Number(String(price).replace(/[^0-9.]/g, ""));
  return isNaN(num) || num === 0 ? "" : tt("utils.from-r-per-day", { toLocaleString: Math.round(num).toLocaleString() });
}

export function getBaseDailyRate(
  price?: string | number,
  priceFrom?: string | number
) {
  const raw = price ?? priceFrom;
  const numeric = Number(raw);
  if (raw === undefined || raw === null || raw === "" || Number.isNaN(numeric)) {
    return 0;
  }
  return numeric;
}

export function getDiscountPercent(days: number) {
  if (days >= 5) return 20;
  if (days === 4) return 15;
  if (days === 3) return 10;
  if (days === 2) return 5;
  return 0;
}

export function calculateDiscountedRate(baseRate: number, discountPercent: number) {
  if (!baseRate) return 0;
  return baseRate - baseRate * (discountPercent / 100);
}

// Shared copy helpers. Everything vehicle specific comes from the car record.
export const FULL_DAY_HOURS_LINE =
  (tt: TFunction) => (tt("utils.each-full-day-is-up"));

// "Mercedes S Class with driver" -> "Mercedes S Class"
export function getVehicleName(car: Car): string {
  const raw = (car.title || "").replace(/\s+(with|for hire).*$/i, "").trim();
  return raw || "Luxury Vehicle";
}

export function getSeoKeyword(car: Car): string {
  if (car.seo_keyword) return car.seo_keyword;
  return `${getVehicleName(car)} Chauffeur Cape Town`;
}

// "R7,850" from the live record, or "" when there is no price
export function getDayRate(car: Car): string {
  const raw = car.price ?? car.price_from;
  const num = Number(String(raw ?? "").replace(/[^0-9.]/g, ""));
  if (!num || Number.isNaN(num)) return "";
  return `R${Math.round(num).toLocaleString("en-US")}`;
}

function seatsText(car: Car, tt: TFunction) {
  return car.number_of_seats ? tt("utils.up-to-passengers", { number_of_seats: car.number_of_seats }) : "your party";
}

// One list, used by the visible FAQ and by the FAQPage JSON-LD.
export function buildFaqs(car: Car, tt: TFunction): FaqItem[] {
  const name = getVehicleName(car);
  const rate = getDayRate(car);
  const luggage = car.luggage_capacity
    ? tt("utils.and-space-for", { luggage_capacity: car.luggage_capacity, bags: car.luggage_capacity === 1 ? "bag" : "bags" })
    : "";

  return [
    {
      question: tt("utils.how-much-does-a-with", { name }),
      answer: rate
        ? tt("utils.hiring-the-with-a-private", { name, rate, FULL_DAY_HOURS_LINE: FULL_DAY_HOURS_LINE(tt) })
        : tt("utils.pricing-for-the-with-a", { name }),
    },
    {
      question: tt("utils.how-long-is-a-full"),
      answer: tt("utils.up-to-8-hours-and"),
    },
    {
      question: tt("utils.can-i-book-a-chauffeur", { name }),
      answer: tt("utils.yes-your-chauffeur-tracks-your", { name }),
    },
    {
      question: tt("utils.can-i-hire-a-with", { name }),
      answer: tt("utils.yes-the-cape-peninsula-is"),
    },
    {
      question: tt("utils.can-i-use-the-for", { name }),
      answer: tt("utils.yes-your-chauffeur-drives-you"),
    },
    {
      question: tt("utils.can-i-hire-the-with", { name }),
      answer: tt("utils.yes-full-day-private-hire", { FULL_DAY_HOURS_LINE: FULL_DAY_HOURS_LINE(tt) }),
    },
    {
      question: tt("utils.how-many-passengers-and-bags", { name }),
      answer: tt("utils.the-takes-if-your-party", { name, car: seatsText(car, tt), luggage }),
    },
    {
      question: tt("utils.is-the-chauffeur-service-private", { name }),
      answer: tt("utils.yes-every-booking-is-fully"),
    },
    {
      question: tt("utils.what-is-included-when-i", { name }),
      answer: tt("utils.your-booking-includes-a-professional", { name }),
    },
    {
      question: tt("utils.how-do-i-book-the", { name }),
      answer: tt("utils.message-us-on-whatsapp-with"),
    },
  ];
}

export function getVehicleMetaTitle(car: Car): string {
  if (car.meta_title) return car.meta_title;
  const name = getVehicleName(car);
  const rate = getDayRate(car);
  const withPrice = rate ? `${name} Chauffeur Cape Town | From ${rate}/day` : "";
  if (withPrice && withPrice.length <= 60) return withPrice;
  const plain = `${name} Chauffeur Cape Town | ${brand.name}`;
  return plain.length <= 60 ? plain : `${name} Chauffeur Cape Town`;
}

export function getVehicleMetaDescription(car: Car): string {
  if (car.meta_description) return car.meta_description;
  const name = getVehicleName(car);
  const rate = getDayRate(car);
  const raw = rate
    ? `${name} chauffeur in Cape Town from ${rate} per day. Airport transfers, Peninsula and Winelands tours, fuel included. Enquire on WhatsApp.`
    : `${name} chauffeur in Cape Town. Airport transfers, Peninsula and Winelands tours, fuel included. Enquire on WhatsApp.`;
  return raw.length <= 160 ? raw : raw.slice(0, 157).trimEnd() + "...";
}
