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