import { Car, FaqItem } from "./types";
export { buildWhatsAppLink } from "../../../lib/whatsapp";
import { brand } from "../../../lib/brand";

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

export function formatPrice(price?: string | number) {
  if (price === undefined || price === null || price === "") return "";
  const num = Number(String(price).replace(/[^0-9.]/g, ""));
  return isNaN(num) || num === 0 ? "" : `From R${Math.round(num).toLocaleString()} per day`;
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
  "Each full day is up to 8 hours, and time can be extended at an additional rate.";

// "Mercedes S Class with driver" -> "Mercedes S Class"
export function getVehicleName(car: Car): string {
  const raw = (car.title || "").replace(/\s+(with|for hire).*$/i, "").trim();
  return raw || "Luxury Vehicle";
}

export function getSeoKeyword(car: Car): string {
  if (car.seo_keyword) return car.seo_keyword;
  return `${getVehicleName(car)} Chauffeur Service Cape Town`;
}

// "R7,850" from the live record, or "" when there is no price
export function getDayRate(car: Car): string {
  const raw = car.price ?? car.price_from;
  const num = Number(String(raw ?? "").replace(/[^0-9.]/g, ""));
  if (!num || Number.isNaN(num)) return "";
  return `R${Math.round(num).toLocaleString("en-US")}`;
}

function seatsText(car: Car) {
  return car.number_of_seats ? `up to ${car.number_of_seats} passengers` : "your party";
}

// One list, used by the visible FAQ and by the FAQPage JSON-LD.
export function buildFaqs(car: Car): FaqItem[] {
  const name = getVehicleName(car);
  const rate = getDayRate(car);
  const luggage = car.luggage_capacity
    ? ` and space for ${car.luggage_capacity} ${car.luggage_capacity === 1 ? "bag" : "bags"}`
    : "";

  return [
    {
      question: `How much does a ${name} with a driver cost in Cape Town?`,
      answer: rate
        ? `Hiring the ${name} with a private chauffeur starts from ${rate} per day. The price is per vehicle, not per person, and fuel is included in the day rate. ${FULL_DAY_HOURS_LINE} Message us on WhatsApp for a tailored quote for your dates and itinerary. We reply within 30 minutes.`
        : `Pricing for the ${name} with a private chauffeur depends on your dates and itinerary. Message us on WhatsApp for a tailored quote. We reply within 30 minutes.`,
    },
    {
      question: "How long is a full day?",
      answer: "Up to 8 hours, and time can be extended at an additional rate.",
    },
    {
      question: `Can I book a ${name} chauffeur for a Cape Town airport transfer?`,
      answer: `Yes. Your chauffeur tracks your flight, meets you in arrivals with a name board and looks after your luggage, so you step out of the terminal and into a private ${name}. Airport transfers are available 24 hours a day, 7 days a week, including early-morning and late-night flights. See our airport transfers page for more.`,
    },
    {
      question: `Can I hire a ${name} with a driver for a Cape Peninsula and Cape Point tour?`,
      answer: `Yes. The Cape Peninsula is one of the most popular days out with a private chauffeur. You travel by Chapman's Peak Drive, Hout Bay, Boulders Beach and Cape Point at your own pace, with no group schedule and no shared vehicle.`,
    },
    {
      question: `Can I use the ${name} for a Winelands day in Stellenbosch or Franschhoek?`,
      answer: `Yes. Your chauffeur drives you between estates in Stellenbosch and Franschhoek, so everyone in your party can taste and enjoy the day. Tell us the estates or restaurants you have in mind and we will plan the route around them.`,
    },
    {
      question: `Can I hire the ${name} with a chauffeur for a full day in Cape Town?`,
      answer: `Yes. Full-day private hire is one of our most popular services. ${FULL_DAY_HOURS_LINE} You choose the itinerary, whether that is the city and Atlantic Seaboard, the Peninsula or the Winelands, and your chauffeur handles the route and timing.`,
    },
    {
      question: `How many passengers and bags does the ${name} take?`,
      answer: `The ${name} takes ${seatsText(car)}${luggage}. If your party or luggage is larger, message us on WhatsApp and we will suggest the right vehicle from our fleet.`,
    },
    {
      question: `Is the ${name} chauffeur service private?`,
      answer: `Yes. Every booking is fully private. You have the vehicle and a professional, well-presented chauffeur to yourselves, with no other passengers. It suits executives, families, couples and anyone who values discretion.`,
    },
    {
      question: `What is included when I book the ${name} with a chauffeur?`,
      answer: `Your booking includes a professional chauffeur, the ${name} with fuel included in the day rate, complimentary bottled water and flight tracking for airport pickups with a meet and greet name board. Entrance fees to attractions and gratuities are not included.`,
    },
    {
      question: `How do I book the ${name} with a driver?`,
      answer: `Message us on WhatsApp with your dates, pickup point and plans. We reply within 30 minutes to confirm availability and your price. We regularly look after travellers from the United States, the United Kingdom, the UAE, Saudi Arabia and the wider Gulf.`,
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
    ? `Chauffeur-driven ${name} in Cape Town from ${rate} per day. Airport transfers, Peninsula and Winelands tours. Private, fuel included. Book on WhatsApp.`
    : `Chauffeur-driven ${name} in Cape Town. Airport transfers, Peninsula and Winelands tours. Private, fuel included. Book on WhatsApp.`;
  return raw.length <= 160 ? raw : raw.slice(0, 157).trimEnd() + "...";
}
