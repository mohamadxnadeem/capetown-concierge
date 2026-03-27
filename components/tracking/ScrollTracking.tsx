"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ScrollTracking() {
  useEffect(() => {
    let hasTracked50 = false;
    let hasTracked90 = false;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const percent = (scrollTop / docHeight) * 100;

      if (!hasTracked50 && percent >= 50) {
        hasTracked50 = true;

        window.gtag?.("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "50_percent",
          value: 50,
        });

        window.fbq?.("trackCustom", "ScrollDepth", {
          percent: 50,
        });
      }

      if (!hasTracked90 && percent >= 90) {
        hasTracked90 = true;

        window.gtag?.("event", "scroll_depth", {
          event_category: "engagement",
          event_label: "90_percent",
          value: 90,
        });

        window.fbq?.("trackCustom", "ScrollDepth", {
          percent: 90,
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}