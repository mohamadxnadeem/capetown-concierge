/**
 * Locale configuration.
 * English is the root (no URL prefix). The others live under /ar/, /pt-br/, /ru/.
 */
export const LOCALES = ["en", "ar", "pt-BR", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export type TranslatedLocale = Exclude<Locale, "en">;

export const DEFAULT_LOCALE: Locale = "en";
export const TRANSLATED_LOCALES: TranslatedLocale[] = ["ar", "pt-BR", "ru"];

/** URL segment per locale ("" for English). */
export const LOCALE_PREFIX: Record<Locale, string> = {
  en: "",
  ar: "ar",
  "pt-BR": "pt-br",
  ru: "ru",
};

/** Route param value used internally. English is rewritten to /en/... by proxy.ts. */
export const LOCALE_PARAM: Record<Locale, string> = {
  en: "en",
  ar: "ar",
  "pt-BR": "pt-br",
  ru: "ru",
};

export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  ar: "ar",
  "pt-BR": "pt-BR",
  ru: "ru",
};

/** Value sent in every form submission. */
export const LANGUAGE_FIELD: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
  "pt-BR": "PT-BR",
  ru: "RU",
};

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  "pt-BR": "Português",
  ru: "Русский",
};

export const LOCALE_SHORT: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
  "pt-BR": "PT",
  ru: "RU",
};

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export function localeFromParam(param: string | undefined): Locale {
  const found = LOCALES.find((l) => LOCALE_PARAM[l] === param);
  return found ?? DEFAULT_LOCALE;
}

/** Prefix a site path ("/tours") with the locale segment. English is unchanged. */
export function withLocalePrefix(locale: Locale, path: string): string {
  const prefix = LOCALE_PREFIX[locale];
  if (!prefix) return path;
  if (path === "/" || path === "") return `/${prefix}`;
  return `/${prefix}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Pages that exist in English only. Locale-prefixed versions return 404. */
export const ENGLISH_ONLY_SEGMENTS = [
  "booking",
  "booking-confirmation",
  "driver",
  "villas",
  "hotels",
  "api",
  "proposal",
];
