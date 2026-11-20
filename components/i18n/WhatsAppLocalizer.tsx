"use client";

import { useEffect } from "react";
import { useLocale } from "./LocaleProvider";
import { GENERAL_WHATSAPP_BY_LOCALE } from "../../lib/whatsapp";

/** Generic English pre-filled messages used across the site, to be shown in the page language instead. */
const GENERIC_PREFIXES = [
  "Hi, I'd like to book a luxury chauffeur or private tour",
  "Hi, I'd like to book an airport transfer",
  "Hi, I'd like to plan a stay",
  "Hi, I'd like to enquire about chauffeur hire",
  "Hey, I'm interested in making a booking",
  "Hi! I'd like to book a driver",
];

/**
 * On non-English pages, swap generic English WhatsApp pre-filled text for the
 * page language. Links that carry a tour or vehicle name are left alone.
 */
export default function WhatsAppLocalizer() {
  const locale = useLocale();
  useEffect(() => {
    if (locale === "en") return;
    const message = GENERAL_WHATSAPP_BY_LOCALE[locale];
    const apply = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]').forEach((a) => {
        try {
          const url = new URL(a.href);
          const text = url.searchParams.get("text") ?? "";
          if (GENERIC_PREFIXES.some((p) => text.startsWith(p))) {
            url.searchParams.set("text", message);
            a.href = url.toString();
          }
        } catch {
          /* ignore malformed links */
        }
      });
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);
  return null;
}
