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
  return `$${amount.toFixed(0)}`;
}

export function formatPrice(
  price?: string | number,
  priceFrom?: string | number,
  priceTo?: string | number
) {
  if (price !== undefined && price !== null && price !== "") {
    return `From $${price}`;
  }

  if (priceFrom && priceTo) {
    return `From $${priceFrom} - $${priceTo}`;
  }

  if (priceFrom) return `From $${priceFrom}`;
  if (priceTo) return `$${priceTo}`;

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

export function buildFaqs(vehicleTitle: string): FaqItem[] {
  return [
    {
      question: `Is the ${vehicleTitle} available with a private chauffeur?`,
      answer:
        "Yes. This vehicle is offered with a private chauffeur for airport transfers, private touring, executive travel, and custom transport bookings in Cape Town.",
    },
    {
      question: `Can I use the ${vehicleTitle} for private tours in Cape Town?`,
      answer:
        "Yes. This vehicle can be used for full-day private tours, scenic routes, wine tours, city touring, and chauffeur-driven day hire.",
    },
    {
      question: `Is the ${vehicleTitle} suitable for airport transfers?`,
      answer:
        "Yes. It is a strong option for premium airport pickups and drop-offs, especially for travellers who value comfort, presentation, and a smoother arrival experience.",
    },
    {
      question: `How do I book the ${vehicleTitle}?`,
      answer:
        "The quickest way to book is by messaging us on WhatsApp. We can confirm availability, pricing, and the best vehicle option for your travel plans.",
    },
  ];
}

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