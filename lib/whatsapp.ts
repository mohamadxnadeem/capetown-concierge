import { brand } from "./brand";
import type { Locale } from "./i18n/config";

const WHATSAPP_NUMBER = brand.whatsappNumber;

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Opening line of a pre-filled WhatsApp message per language. English messages
 * stay exactly as written in the builders below; these are used only when a
 * non-English locale is passed.
 */
const LOCALE_OPENERS: Record<Exclude<Locale, "en">, string> = {
  ar: "السلام عليكم، أرغب في حجز سائق خاص في كيب تاون",
  "pt-BR": "Olá! Gostaria de reservar um motorista na Cidade do Cabo para...",
  ru: "Здравствуйте! Хочу забронировать водителя в Кейптауне на...",
};

function localizedMessage(locale: Locale | undefined, subject?: string): string | null {
  if (!locale || locale === "en") return null;
  const opener = LOCALE_OPENERS[locale];
  return subject ? `${opener}\n${subject}` : opener;
}

export function buildLocalizedGeneralMessage(locale: Locale): string {
  return localizedMessage(locale) ?? buildGeneralWhatsAppMessage();
}

export function buildTourWhatsAppMessage(tourTitle?: string, locale?: Locale) {
  const localized = localizedMessage(locale, tourTitle);
  if (localized) return localized;
  const safeTitle = tourTitle || "private tour";
  return `Hey, I'm interested in booking the ${safeTitle}. Please can you share more details and availability?`;
}

export function buildVehicleWhatsAppMessage(vehicleTitle?: string, locale?: Locale) {
  const localized = localizedMessage(locale, vehicleTitle);
  if (localized) return localized;
  const safeTitle = vehicleTitle || "chauffeur service";
  return `Hey, I'm interested in booking the ${safeTitle}. Please can you share pricing and availability?`;
}

export function buildVehicleForTourWhatsAppMessage(
  vehicleTitle?: string,
  tourTitle?: string,
  locale?: Locale
) {
  const localized = localizedMessage(locale, [vehicleTitle, tourTitle].filter(Boolean).join(" / "));
  if (localized) return localized;
  const safeVehicle = vehicleTitle || "vehicle";
  const safeTour = tourTitle || "private tour";
  return `Hey, I want to book the ${safeVehicle} for the ${safeTour}. Please can you share pricing and availability?`;
}

export function buildGeneralWhatsAppMessage(context?: string, locale?: Locale) {
  const localized = localizedMessage(locale);
  if (localized) return localized;

  if (context) {
    return `Hey, I'm interested in ${context}. Please can you assist with more details?`;
  }

  return "Hey, I'm interested in making a booking. Please can you assist?";
}

export function buildActivityWhatsAppMessage(
  activityTitle?: string,
  idealBooking?: string,
  locale?: Locale
) {
  const localized = localizedMessage(locale, activityTitle);
  if (localized) return localized;
  const safeTitle = activityTitle || "this Cape Town experience";
  const context = idealBooking ? ` ${idealBooking.trim()}` : "";
  return `Hi Cape Town Concierge, I'd like to plan ${safeTitle} in Cape Town.${context} Please share availability, pricing, and how we can arrange it. Thank you!`;
}