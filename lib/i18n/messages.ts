import enCommon from "../../messages/en/common.json";
import arCommon from "../../messages/ar/common.json";
import ptCommon from "../../messages/pt-BR/common.json";
import ruCommon from "../../messages/ru/common.json";
import enMeta from "../../messages/en/meta.json";
import arMeta from "../../messages/ar/meta.json";
import ptMeta from "../../messages/pt-BR/meta.json";
import ruMeta from "../../messages/ru/meta.json";
import statusFile from "../../messages/status.json";
import { DEFAULT_LOCALE, type Locale } from "./config";

export type Dict = Record<string, string>;
export type TFunction = (key: string, vars?: Record<string, string | number>) => string;

const COMMON: Record<Locale, Dict> = {
  en: enCommon,
  ar: arCommon,
  "pt-BR": ptCommon,
  ru: ruCommon,
};
const META: Record<Locale, Dict> = {
  en: enMeta,
  ar: arMeta,
  "pt-BR": ptMeta,
  ru: ruMeta,
};

/** Merge a locale dictionary over English so a missing key falls back per key. */
function withFallback(dicts: Record<Locale, Dict>, locale: Locale): Dict {
  if (locale === DEFAULT_LOCALE) return dicts.en;
  const out: Dict = { ...dicts.en };
  for (const [k, v] of Object.entries(dicts[locale])) {
    if (typeof v === "string" && v.trim() !== "") out[k] = v;
  }
  return out;
}

/** Shared UI strings (header, footer, forms, buttons, banner, 404). */
export function getCommonMessages(locale: Locale): Dict {
  return withFallback(COMMON, locale);
}

/** Page metadata (titles, descriptions) for hardcoded pages. */
export function getMetaMessages(locale: Locale): Dict {
  return withFallback(META, locale);
}

export function makeT(dict: Dict): TFunction {
  return (key, vars) => {
    let s = dict[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
    }
    return s;
  };
}

export function getT(locale: Locale): TFunction {
  return makeT(getCommonMessages(locale));
}

export type PageStatus = "draft" | "reviewed";

/**
 * Status of a hardcoded page in a locale, from messages/status.json.
 * English is always reviewed. Missing entries count as draft.
 */
export function getPageStatus(locale: Locale, path: string): PageStatus {
  if (locale === DEFAULT_LOCALE) return "reviewed";
  const table = (statusFile as unknown as Record<string, Record<string, string>>)[locale] ?? {};
  return table[path] === "reviewed" ? "reviewed" : "draft";
}

/** All page statuses, safe to pass to the client. */
export function getAllPageStatuses(): Record<string, Record<string, PageStatus>> {
  const out: Record<string, Record<string, PageStatus>> = {};
  for (const l of ["ar", "pt-BR", "ru"] as const) {
    out[l] = {};
    const table = (statusFile as unknown as Record<string, Record<string, string>>)[l] ?? {};
    for (const [p, v] of Object.entries(table)) {
      if (p.startsWith("_")) continue;
      out[l][p] = v === "reviewed" ? "reviewed" : "draft";
    }
  }
  return out;
}
