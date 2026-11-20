import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, URL_PREFIX, localeFromPrefix, type Locale } from "./config";

/** Convert the [locale] URL segment (en, ar, pt-br, ru) to a Locale. */
export function localeFromParam(param: string): Locale {
  if (param === "en") return DEFAULT_LOCALE;
  const l = localeFromPrefix(param);
  if (!l) notFound();
  return l;
}

export const localeParams = () =>
  LOCALES.map((l) => ({ locale: l === DEFAULT_LOCALE ? "en" : URL_PREFIX[l] }));

export type LocaleParams = { params: Promise<{ locale: string }> };
