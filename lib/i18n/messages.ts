import type { Locale } from "./config";
import { localePath } from "./paths";

import { BODY } from "./bundles";
import enCommon from "../../messages/en/common.json";
import enMeta from "../../messages/en/meta.json";
import arCommon from "../../messages/ar/common.json";
import arMeta from "../../messages/ar/meta.json";
import ptCommon from "../../messages/pt-BR/common.json";
import ptMeta from "../../messages/pt-BR/meta.json";
import ruCommon from "../../messages/ru/common.json";
import ruMeta from "../../messages/ru/meta.json";

type Dict = Record<string, string>;
export type Namespace = "common" | "meta";

const BUNDLES: Record<Locale, Record<Namespace, Dict>> = {
  en: { common: { ...BODY.en, ...(enCommon as Dict) }, meta: enMeta as Dict },
  ar: { common: { ...BODY.ar, ...(arCommon as Dict) }, meta: arMeta as Dict },
  "pt-BR": { common: { ...BODY["pt-BR"], ...(ptCommon as Dict) }, meta: ptMeta as Dict },
  ru: { common: { ...BODY.ru, ...(ruCommon as Dict) }, meta: ruMeta as Dict },
};

function interpolate(text: string, vars?: Record<string, string | number>) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

/** Returns the locale string, falling back to the English string, then to the key. */
export function translate(
  locale: Locale,
  ns: Namespace,
  key: string,
  vars?: Record<string, string | number>
): string {
  const text = BUNDLES[locale]?.[ns]?.[key] || BUNDLES.en[ns][key] || key;
  return interpolate(text, vars);
}

export function hasTranslation(locale: Locale, ns: Namespace, key: string) {
  return Boolean(BUNDLES[locale]?.[ns]?.[key]);
}

export type TFunction = ((key: string, vars?: Record<string, string | number>) => string) & {
  /** Prefixes an internal path with the locale (and maps tour and vehicle slugs). English is unchanged. */
  path: <T extends string | null | undefined>(path: T) => T;
};

/** Server or client safe. Namespace "common" by default. */
export function getT(locale: Locale, ns: Namespace = "common"): TFunction {
  const t = ((key: string, vars?: Record<string, string | number>) =>
    translate(locale, ns, key, vars)) as TFunction;
  t.path = (<T extends string | null | undefined>(path: T): T =>
    (typeof path === "string" ? localePath(locale, path) : path) as T);
  return t;
}

/** Default translator for helpers that are also called outside a component (English). */
export const enT = getT("en");
