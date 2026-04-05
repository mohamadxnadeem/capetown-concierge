import { Car, FaqItem, ReviewItem } from "./types";

export const WHATSAPP_NUMBER = "27636746131";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

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
  const usd = Math.round(amount / 18.5);
  return `$${usd}`;
}

export function formatPrice(
  price?: string | number,
  priceFrom?: string | number,
  priceTo?: string | number
) {
  function toUsd(val: string | number) {
    const num = Number(String(val).replace(/[^0-9.]/g, ""));
    return isNaN(num) || num === 0 ? String(val) : `${Math.round(num / 18.5)}`;
  }
  if (price !== undefined && price !== null && price !== "") {
    return `From $${toUsd(price)}`;
  }
  if (priceFrom && priceTo) return `From $${toUsd(priceFrom)} - $${toUsd(priceTo)}`;
  if (priceFrom) return `From $${toUsd(priceFrom)}`;
  if (priceTo) return `$${toUsd(priceTo)}`;
  return "";
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

// ─────────────────────────────────────────────────────────────────────────────
// buildFaqs
// ─────────────────────────────────────────────────────────────────────────────
// WHAT CHANGED:
//   - Added `seoKeyword` as a second optional parameter
//   - Q1 now embeds the full SEO keyword e.g.
//     "How much does Range Rover Sport Chauffeur Service Cape Town cost?"
//     This is the most important FAQ for Google rich results — Google
//     prioritises Q1 when deciding whether to show the FAQ dropdown in SERPs
//   - Expanded from 4 generic questions to 8 vehicle-specific ones
//   - All answers are more detailed — thin FAQ answers don't trigger rich results
//   - Q3, Q5 target the two highest-volume tour searches (Peninsula + Winelands)
//
// BACKWARDS COMPATIBLE: seoKeyword is optional — existing calls with just
// vehicleTitle still work, the keyword just falls back to the title.
// ─────────────────────────────────────────────────────────────────────────────
export function buildFaqs(vehicleTitle: string, seoKeyword?: string): FaqItem[] {
  // Fallback: if no keyword passed, generate it from the title
  const kw = seoKeyword || `${vehicleTitle} Chauffeur Service Cape Town`;

  return [
    // Q1: primary keyword in the question — strongest FAQ schema trigger
    {
      question: `How much does ${kw} cost?`,
      answer: `Pricing for ${kw} depends on your route, duration, and itinerary. Contact us via WhatsApp for availability and a personalised quote — we typically respond within 30 minutes.`,
    },

    // Q2: airport transfer — high search volume
    {
      question: `Is the ${vehicleTitle} available for airport transfers in Cape Town?`,
      answer: `Yes. The ${vehicleTitle} is one of our most requested vehicles for Cape Town International Airport transfers. Your chauffeur tracks your flight arrival in real time, meets you at the arrivals terminal with a name board, and assists with your luggage. This service is available 24 hours a day, 7 days a week, including early morning and late night flights.`,
    },

    // Q3: Cape Peninsula — #1 tour keyword
    {
      question: `Can I use the ${vehicleTitle} for a private Cape Peninsula tour?`,
      answer: `Yes. The ${vehicleTitle} is an excellent choice for a private Cape Peninsula tour. Your chauffeur will take you through Chapman's Peak Drive, Hout Bay, Boulders Beach penguin colony, and Cape Point — entirely at your own pace with no group schedules or fixed stops. Full-day tours typically run 8 to 10 hours.`,
    },

    // Q4: Winelands — #2 tour keyword
    {
      question: `Can I book the ${vehicleTitle} for a private Winelands tour?`,
      answer: `Yes. Many of our clients use the ${vehicleTitle} for a private Cape Winelands day covering Stellenbosch, Franschhoek, or Constantia. Your chauffeur can coordinate wine estate visits and restaurant reservations. Because you have the vehicle privately for the day, you control the pace and the estates you visit.`,
    },

    // Q5: full day hire
    {
      question: `Can I hire the ${vehicleTitle} for a full day in Cape Town?`,
      answer: `Yes. Full-day private hire is available with the ${vehicleTitle}. You choose your itinerary — whether that is city sightseeing, a coastal drive along the Atlantic Seaboard, the Cape Peninsula, or the Winelands — and your chauffeur manages all routing and timing. Full-day hire typically runs 8 to 10 hours.`,
    },

    // Q6: capacity
    {
      question: `How many passengers can the ${vehicleTitle} accommodate?`,
      answer: `The ${vehicleTitle} comfortably accommodates up to 4 passengers with standard luggage. If you are travelling with a larger group or require more luggage space, we also offer the Mercedes V-Class (6 seats) and the Mercedes Sprinter (up to 14 seats).`,
    },

    // Q7: booking process
    {
      question: `How do I book the ${vehicleTitle} chauffeur service?`,
      answer: `The quickest way to book is by messaging us directly on WhatsApp. We typically confirm vehicle availability and pricing within 30 minutes. Same-day bookings are accommodated where the schedule allows. We regularly serve clients arriving from the United States, United Kingdom, and across South Africa.`,
    },

    // Q8: inclusions
    {
      question: `What is included when I book the ${vehicleTitle} with a chauffeur?`,
      answer: `Every booking includes a professionally presented chauffeur in formal attire, the ${vehicleTitle} with fuel, complimentary bottled water for all passengers, flight tracking for airport pickups, and a meet-and-greet name board service. Entrance fees to attractions such as Cape Point Nature Reserve or Table Mountain are not included and are payable on the day.`,
    },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// getSeoKeyword
// ─────────────────────────────────────────────────────────────────────────────
// Centralises keyword generation so utils, page.tsx and the component
// all produce identical strings from the same logic.
// Priority: CMS seo_keyword field → auto-generated from title
// ─────────────────────────────────────────────────────────────────────────────
export function getSeoKeyword(car: Car): string {
  if (car.seo_keyword) return car.seo_keyword;
  const name = car.title || "Luxury Vehicle";
  return `${name} Chauffeur Service Cape Town`;
}

// ─────────────────────────────────────────────────────────────────────────────
// getVehicleMetaTitle
// ─────────────────────────────────────────────────────────────────────────────
// Keyword-first meta title — improves CTR and ranking signal.
// Format: "[SEO Keyword] | From $[price] | Cape Town Concierge"
// Falls back gracefully if no price available.
// ─────────────────────────────────────────────────────────────────────────────
export function getVehicleMetaTitle(car: Car): string {
  if (car.meta_title) return car.meta_title;
  const keyword = getSeoKeyword(car);
  const rate = formatPrice(car.price, car.price_from, car.price_to);
  const rateStr = rate ? ` | ${rate}` : "";
  return `${keyword}${rateStr} | Cape Town Concierge`;
}

// ─────────────────────────────────────────────────────────────────────────────
// getVehicleMetaDescription
// ─────────────────────────────────────────────────────────────────────────────
// Keyword in first ~120 chars, CTA at end, stays under 155 chars.
// ─────────────────────────────────────────────────────────────────────────────
export function getVehicleMetaDescription(car: Car): string {
  if (car.meta_description) return car.meta_description;
  const keyword = getSeoKeyword(car);
  const rate = formatPrice(car.price, car.price_from, car.price_to);
  const rateStr = rate ? ` ${rate}/day.` : "";
  const seats = car.number_of_seats ? ` ${car.number_of_seats} seats.` : "";
  const raw = `${keyword} — private airport transfers, full-day tours & Cape Town hire.${rateStr}${seats} Professional chauffeur. Book via WhatsApp.`;
  if (raw.length <= 155) return raw;
  return raw.slice(0, 152).trimEnd() + "...";
}

// ─────────────────────────────────────────────────────────────────────────────
// Generic reviews (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
export const genericReviews: ReviewItem[] = [
  {
    quote:
      "Excellent service from start to finish. The vehicle was immaculate and the entire experience felt polished and premium.",
    name: "James R.",
    subtitle: "London, UK",
  },
  {
    quote:
      "A very comfortable and professional experience. Perfect for airport transfers and private touring around Cape Town.",
    name: "Sophie & Daniel",
    subtitle: "Dubai, UAE",
  },
  {
    quote:
      "Reliable, stylish, and easy to book. This was exactly the level of service we wanted during our stay.",
    name: "Nadia K.",
    subtitle: "Johannesburg, South Africa",
  },
];
