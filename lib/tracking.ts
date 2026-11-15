declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

type WhatsAppTrackingParams = {
  source: string;
  label: string;
  vehicle?: string;
  tour?: string;
  location?: string;
};

type CallTrackingParams = {
  location: string;
  vehicle?: string;
};

const META_LEAD_VALUE_ZAR = 3000;

export function trackWhatsAppClick({
  source,
  label,
  vehicle,
  tour,
  location,
}: WhatsAppTrackingParams) {
  if (typeof window === "undefined") return;

  const cleanPayload = {
    source,
    label,
    vehicle: vehicle || "",
    tour: tour || "",
    location: location || "",
  };

  // GA4 custom event
  window.gtag?.("event", "whatsapp_click", {
    event_category: "lead",
    event_label: label,
    source,
    vehicle: vehicle || "",
    tour: tour || "",
    location: location || "",
  });

  // Google Ads conversion
  if (process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO) {
    window.gtag?.("event", "conversion", {
      send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_SEND_TO,
      event_callback: () => {
        // reserved for future use if you want callback-based redirect handling
      },
    });
  }

  // Meta standard lead event
  window.fbq?.("track", "Lead", {
    ...cleanPayload,
    value: META_LEAD_VALUE_ZAR,
    currency: "ZAR",
  });

  // Custom Meta event for debugging / segmentation
  window.fbq?.("trackCustom", "WhatsAppClick", cleanPayload);

  // Higher intent custom Meta event
  window.fbq?.("trackCustom", "HighIntentLead", {
    ...cleanPayload,
    intent: "whatsapp_click",
    value: META_LEAD_VALUE_ZAR,
    currency: "ZAR",
  });
}

export function trackCallClick({ location, vehicle }: CallTrackingParams) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", "call_click", {
    event_category: "lead",
    event_label: "Call Now",
    location,
    vehicle: vehicle || "",
  });

  // Google Ads call conversion (set NEXT_PUBLIC_GOOGLE_ADS_CALL_SEND_TO to enable)
  if (process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_SEND_TO) {
    window.gtag?.("event", "conversion", {
      send_to: process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_SEND_TO,
    });
  }

  window.fbq?.("trackCustom", "CallClick", { location, vehicle: vehicle || "" });
}

export {};