export const LOCALES = ["en", "ar", "pt-BR", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** URL prefix per locale. English has none. */
export const URL_PREFIX: Record<Locale, string> = {
  en: "",
  ar: "ar",
  "pt-BR": "pt-br",
  ru: "ru",
};

/** Language code used by the Django API (?lang=). */
export const API_LANG: Record<Locale, string> = {
  en: "en",
  ar: "ar",
  "pt-BR": "pt_br",
  ru: "ru",
};

/** Key used inside the API `translations` object. */
export const TRANSLATION_KEY = API_LANG;

export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  ar: "ar",
  "pt-BR": "pt-BR",
  ru: "ru",
};

export const OG_LOCALE: Record<Locale, string> = {
  en: "en_ZA",
  ar: "ar_AR",
  "pt-BR": "pt_BR",
  ru: "ru_RU",
};

/** Value of the `language` field sent with forms. */
export const FORM_LANGUAGE: Record<Locale, string> = {
  en: "EN",
  ar: "AR",
  "pt-BR": "PT-BR",
  ru: "RU",
};

export const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  "pt-BR": "Português",
  ru: "Русский",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localeFromPrefix(prefix: string): Locale | null {
  const p = prefix.toLowerCase();
  return LOCALES.find((l) => URL_PREFIX[l] === p && p !== "") ?? null;
}

export const isRtl = (locale: Locale) => locale === "ar";

/** Routes that exist in English only, outside the locale segment. */
export const EN_ONLY_PREFIXES = [
  "/booking",
  "/booking-confirmation",
  "/driver",
  "/villas",
  "/hotels",
  "/api",
];

export function isEnOnlyPath(path: string): boolean {
  return EN_ONLY_PREFIXES.some((p) => path === p || path.startsWith(p + "/"));
}

/**
 * Add the locale prefix to an internal path. English paths stay unchanged.
 * External URLs, hashes, English-only routes and already-prefixed paths are
 * returned as is.
 */
export function localizePath(locale: Locale, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (locale === DEFAULT_LOCALE) return path;
  if (isEnOnlyPath(path.split(/[?#]/)[0])) return path;
  const first = path.split("/")[1]?.split(/[?#]/)[0] ?? "";
  if (localeFromPrefix(first)) return path;
  if (path === "/") return `/${URL_PREFIX[locale]}`;
  return `/${URL_PREFIX[locale]}${path}`;
}

/** Remove a locale prefix from a pathname. Returns the locale and the English-style path. */
export function splitLocalePath(pathname: string): { locale: Locale; path: string } {
  const first = pathname.split("/")[1] ?? "";
  const loc = localeFromPrefix(first);
  if (!loc) return { locale: DEFAULT_LOCALE, path: pathname || "/" };
  const rest = pathname.slice(first.length + 1);
  return { locale: loc, path: rest === "" ? "/" : rest };
}

/** Cookie holding the visitor's language decision (set by the banner or switcher). */
export const CHOICE_COOKIE = "ctc_lang_choice";
/** Cookie set by proxy.ts: the URL prefix (ar, pt-br, ru) the browser prefers. */
export const SUGGEST_COOKIE = "ctc_lang_suggest";

/** English paths of the hardcoded pages that exist in every locale. */
export const STATIC_PAGE_PATHS = [
  "/",
  "/chauffeur-hire",
  "/tours",
  "/airport-transfers-cape-town",
  "/best-wine-farms-in-cape-town",
  "/best-activities-to-do-in-cape-town",
  "/7-day-cape-town-itinerary",
  "/contact",
  "/cancellation-policy",
  "/privacy",
] as const;
