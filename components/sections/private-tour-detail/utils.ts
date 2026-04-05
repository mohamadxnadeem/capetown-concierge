import { Experience, FaqItem, ReviewItem } from "./types";

export const WHATSAPP_NUMBER = "27636746131";

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function stripHtml(html?: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function getPrimaryImage(experience: Experience) {
  const imageArray = experience.cover_photos || experience.images || [];
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

export function normalizeUsdPrice(price?: string) {
  if (!price) return "";

  return price
    .replace(/^From\s+R/i, "From $")
    .replace(/^R/i, "$")
    .replace(/\s+R(?=\d)/gi, " $");
}

export function buildTourFaqs(tourTitle: string): FaqItem[] {
  return [
    {
      question: `What is included in the ${tourTitle}?`,
      answer:
        "Each private tour includes a professional chauffeur-guide experience, flexible pacing, and a tailored route based on your booking and preferences.",
    },
    {
      question: `Can I customise the ${tourTitle}?`,
      answer:
        "Yes. Private tours can usually be adjusted around your interests, timing, and preferred stops, depending on availability and logistics.",
    },
    {
      question: `Is the ${tourTitle} private?`,
      answer:
        "Yes. This is designed as a private experience for you and your group, giving you more comfort, flexibility, and privacy throughout the day.",
    },
    {
      question: `How do I book the ${tourTitle}?`,
      answer:
        "The easiest way to book is by messaging us on WhatsApp so we can confirm availability, timing, and the best setup for your day.",
    },
  ];
}

export const genericTourReviews: ReviewItem[] = [
  {
    quote:
      "A beautifully organised private experience with great flexibility, comfort, and local insight throughout the day.",
    name: "James R.",
    subtitle: "London, UK",
  },
  {
    quote:
      "Everything felt smooth and personalised. We loved being able to move at our own pace and enjoy the day without stress.",
    name: "Sophie & Daniel",
    subtitle: "Dubai, UAE",
  },
  {
    quote:
      "Professional, comfortable, and very well planned. It felt far more premium than a standard group tour.",
    name: "Nadia K.",
    subtitle: "Johannesburg, South Africa",
  },
];