"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export default function EngagementTracking() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.gtag?.("event", "engaged_30s", {
        event_category: "engagement",
        event_label: "30_seconds",
      });

      window.fbq?.("trackCustom", "Engaged30s", {
        seconds: 30,
      });
    }, 30000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}