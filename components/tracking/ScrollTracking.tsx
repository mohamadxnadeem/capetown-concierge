"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export default function ScrollTracking() {
  useEffect(() => {
    let fired50 = false;
    let fired75 = false;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) return;

      const percentScrolled = (scrollTop / docHeight) * 100;

      if (!fired50 && percentScrolled >= 50) {
        fired50 = true;
        window.gtag?.("event", "scroll_50", {
          event_category: "engagement",
          event_label: "50_percent_scroll",
        });
        window.fbq?.("trackCustom", "Scroll50", {
          percent: 50,
        });
      }

      if (!fired75 && percentScrolled >= 75) {
        fired75 = true;
        window.gtag?.("event", "scroll_75", {
          event_category: "engagement",
          event_label: "75_percent_scroll",
        });
        window.fbq?.("trackCustom", "Scroll75", {
          percent: 75,
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