import { brand } from "./brand";

const WHATSAPP_NUMBER = brand.whatsappNumber;

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildTourWhatsAppMessage(tourTitle?: string) {
  const safeTitle = tourTitle || "private tour";
  return `Hey, I'm interested in booking the ${safeTitle}. Please can you share more details and availability?`;
}

export function buildVehicleWhatsAppMessage(vehicleTitle?: string) {
  const safeTitle = vehicleTitle || "chauffeur service";
  return `Hey, I'm interested in booking the ${safeTitle}. Please can you share pricing and availability?`;
}

export function buildVehicleForTourWhatsAppMessage(
  vehicleTitle?: string,
  tourTitle?: string
) {
  const safeVehicle = vehicleTitle || "vehicle";
  const safeTour = tourTitle || "private tour";
  return `Hey, I want to book the ${safeVehicle} for the ${safeTour}. Please can you share pricing and availability?`;
}

export function buildGeneralWhatsAppMessage(context?: string) {
  if (context) {
    return `Hey, I'm interested in ${context}. Please can you assist with more details?`;
  }

  return "Hey, I'm interested in making a booking. Please can you assist?";
}

export function buildActivityWhatsAppMessage(
  activityTitle?: string,
  idealBooking?: string
) {
  const safeTitle = activityTitle || "this Cape Town experience";
  const context = idealBooking ? ` ${idealBooking.trim()}` : "";
  return `Hi Cape Town Concierge, I'd like to plan ${safeTitle} in Cape Town.${context} Please share availability, pricing, and how we can arrange it. Thank you!`;
}
// ---------------------------------------------------------------------------
// Per-language pre-filled messages
// ---------------------------------------------------------------------------
import type { Locale } from "./i18n/config";

export const GENERAL_WHATSAPP_BY_LOCALE: Record<Locale, string> = {
  en: "Hi! I'd like to book a driver in Cape Town for...",
  ar: "السلام عليكم، أرغب في حجز سائق خاص في كيب تاون",
  "pt-BR": "Olá! Gostaria de reservar um motorista na Cidade do Cabo para...",
  ru: "Здравствуйте! Хочу забронировать водителя в Кейптауне на...",
};

/** General WhatsApp link with the message pre-filled in the page language. */
export function buildLocaleWhatsAppLink(locale: Locale) {
  return buildWhatsAppLink(GENERAL_WHATSAPP_BY_LOCALE[locale]);
}

/** Telegram link for Russian-language pages. Empty string when not configured. */
export function getTelegramLink(): string {
  return process.env.NEXT_PUBLIC_TELEGRAM_LINK || "";
}

const TOUR_MESSAGE: Record<Locale, (title: string) => string> = {
  en: (t) => `Hey, I'm interested in booking the ${t}. Please can you share more details and availability?`,
  ar: (t) => `السلام عليكم، أرغب في حجز ${t}. هل يمكنكم إرسال التفاصيل والمواعيد المتاحة؟`,
  "pt-BR": (t) => `Olá! Tenho interesse em reservar ${t}. Pode enviar mais detalhes e a disponibilidade?`,
  ru: (t) => `Здравствуйте! Хочу забронировать: ${t}. Пришлите, пожалуйста, подробности и свободные даты.`,
};

const VEHICLE_MESSAGE: Record<Locale, (title: string) => string> = {
  en: (t) => `Hey, I'm interested in booking the ${t}. Please can you share pricing and availability?`,
  ar: (t) => `السلام عليكم، أرغب في حجز ${t}. هل يمكنكم إرسال الأسعار والمواعيد المتاحة؟`,
  "pt-BR": (t) => `Olá! Tenho interesse em reservar ${t}. Pode enviar valores e disponibilidade?`,
  ru: (t) => `Здравствуйте! Хочу забронировать: ${t}. Пришлите, пожалуйста, цены и свободные даты.`,
};

export function buildLocalizedTourWhatsAppMessage(locale: Locale, title?: string) {
  return TOUR_MESSAGE[locale](title || "private tour");
}

export function buildLocalizedVehicleWhatsAppMessage(locale: Locale, title?: string) {
  return VEHICLE_MESSAGE[locale](title || "chauffeur service");
}
