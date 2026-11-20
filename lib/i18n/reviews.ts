import type { Locale } from "./config";
import arReviews from "../../messages/ar/reviews.json";
import ptReviews from "../../messages/pt-BR/reviews.json";
import ruReviews from "../../messages/ru/reviews.json";

type Dict = Record<string, string>;
const REVIEWS: Record<Locale, Dict> = {
  en: {},
  ar: arReviews as Dict,
  "pt-BR": ptReviews as Dict,
  ru: ruReviews as Dict,
};

/** Review text in the page language. Falls back to the original English text. */
export function reviewText(locale: Locale, id: string, text: string): string {
  if (locale === "en") return text;
  return REVIEWS[locale][id] || text;
}

/** "Nov 2026" in the page language. Keeps the English label when the date is missing. */
export function reviewDateLabel(locale: Locale, date: string | null, label: string | null): string | null {
  if (locale === "en" || !date) return label;
  const m = date.match(/^(\d{4})-(\d{2})/);
  if (!m) return label;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, 1));
  const tag = locale === "ar" ? "ar-AE" : locale;
  try {
    return new Intl.DateTimeFormat(tag, { month: "short", year: "numeric", timeZone: "UTC" }).format(d);
  } catch {
    return label;
  }
}

/** "Russian" becomes "русского" style names via Intl, falling back to the English name. */
export function languageName(locale: Locale, englishName: string): string {
  if (locale === "en") return englishName;
  const codes: Record<string, string> = { Russian: "ru", Arabic: "ar", Japanese: "ja", English: "en" };
  const code = codes[englishName];
  if (!code) return englishName;
  try {
    return new Intl.DisplayNames([locale], { type: "language" }).of(code) || englishName;
  } catch {
    return englishName;
  }
}
