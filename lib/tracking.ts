declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

type WhatsAppTrackingParams = {
  source: string;
  label: string;
  vehicle?: string;
  tour?: string;
};

export function trackWhatsAppClick({
  source,
  label,
  vehicle,
  tour,
}: WhatsAppTrackingParams) {
  if (typeof window === "undefined") return;

  const cleanPayload = {
    source,
    label,
    vehicle: vehicle || "",
    tour: tour || "",
  };

  // GA4 custom event
  window.gtag?.("event", "whatsapp_click", {
    event_category: "lead",
    event_label: label,
    source,
    vehicle: vehicle || "",
    tour: tour || "",
  });

  // Google Ads conversion
  window.gtag?.("event", "conversion", {
    send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO,
  });

  // Meta Pixel event
  window.fbq?.("track", "Lead", cleanPayload);

  // Optional custom Meta event for cleaner debugging
  window.fbq?.("trackCustom", "WhatsAppClick", cleanPayload);
}

export {};