import type { Locale } from "./config";

/** Intl tag per site locale. Arabic uses ar-AE so digits stay Latin, like the rest of the site. */
export function numberTag(locale: Locale): string {
  return locale === "ar" ? "ar-AE" : locale;
}

/** Whole-number formatting per locale. English keeps the exact "en-US" output. */
export function formatNumber(locale: Locale, n: number): string {
  try {
    return new Intl.NumberFormat(locale === "en" ? "en-US" : numberTag(locale)).format(n);
  } catch {
    return String(n);
  }
}
