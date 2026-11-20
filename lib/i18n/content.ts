import { API_LANG, DEFAULT_LOCALE, LOCALES, localizePath, type Locale } from "./config";
import type { LocaleVersions } from "./seo";

/**
 * Per-language content from the Django API.
 *
 * Contract (2026-11-20-i18n-foundation):
 *  - GET /api/experiences/all/?lang=xx, /api/experiences/<id>/details/?lang=xx
 *  - GET /api/cars-for-hire/all/?lang=xx, /api/cars-for-hire/<id>/details/?lang=xx
 *  - lang is one of en, ar, pt_br, ru (omitted for English)
 *  - every experience and car object carries
 *      translations: { en|ar|pt_br|ru: { slug, status: "draft"|"reviewed"|null } }
 *      lang: "<code>"
 *  - images may carry alt_text (translated)
 * If `translations` is missing (backend not yet deployed) the item is English only.
 */
export type TranslationEntry = { slug?: string | null; status?: "draft" | "reviewed" | null };
export type Translations = Partial<Record<string, TranslationEntry>>;

/** Append ?lang= for non-English locales. English requests stay exactly as before. */
export function withLang(url: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return url;
  return `${url}${url.includes("?") ? "&" : "?"}lang=${API_LANG[locale]}`;
}

/** The translation status of an item in a locale. Missing data means English only. */
export function translationStatus(
  translations: Translations | undefined | null,
  locale: Locale
): "draft" | "reviewed" | null {
  if (locale === DEFAULT_LOCALE) return "reviewed";
  const s = translations?.[API_LANG[locale]]?.status;
  return s === "draft" || s === "reviewed" ? s : null;
}

/** English slug of an item, from `translations.en.slug` when present. */
export function englishSlug(
  translations: Translations | undefined | null,
  fallback: string
): string {
  return translations?.en?.slug || fallback;
}

/**
 * Where an item exists in each language. `section` is "/tours" or
 * "/chauffeur-hire". Languages with no translation are left out.
 */
export function versionsFromTranslations(
  section: string,
  translations: Translations | undefined | null,
  currentSlug: string
): LocaleVersions {
  const en = englishSlug(translations, currentSlug);
  const out: LocaleVersions = { en: { path: `${section}/${en}`, status: "reviewed" } };
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    const status = translationStatus(translations, l);
    if (!status) continue;
    const slug = translations?.[API_LANG[l]]?.slug || en;
    out[l] = { path: localizePath(l, `${section}/${slug}`), status };
  }
  return out;
}

/** True when an item should be shown in a locale: English always, others only with a translation. */
export function hasLocaleVersion(item: unknown, locale: Locale): boolean {
  if (locale === DEFAULT_LOCALE) return true;
  return translationStatus((item as { translations?: Translations } | null)?.translations, locale) !== null;
}
