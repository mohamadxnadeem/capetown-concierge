"use client";

import { useLocale } from "./LocaleProvider";
import { brand } from "../../lib/brand";
import { HTML_LANG, localizePath, type Locale } from "../../lib/i18n/config";

const TYPES_WITH_LANGUAGE = new Set([
  "WebPage",
  "CollectionPage",
  "ItemList",
  "Service",
  "TouristTrip",
  "FAQPage",
  "Product",
  "LocalBusiness",
  "Organization",
  "WebSite",
]);

const SKIP = /^\/(images|api|_next)\b/;

function walk(node: unknown, locale: Locale): unknown {
  if (Array.isArray(node)) return node.map((n) => walk(n, locale));
  if (typeof node === "string") {
    if (node === brand.siteUrl) return `${brand.siteUrl}${localizePath(locale, "/")}`;
    if (node.startsWith(brand.siteUrl + "/")) {
      const rest = node.slice(brand.siteUrl.length);
      if (SKIP.test(rest)) return node;
      return brand.siteUrl + localizePath(locale, rest);
    }
    return node;
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) out[k] = k === "@id" || k === "@context" ? v : walk(v, locale);
    const type = obj["@type"];
    const types = Array.isArray(type) ? type : [type];
    if (types.some((t) => typeof t === "string" && TYPES_WITH_LANGUAGE.has(t)) && !("inLanguage" in out)) {
      out.inLanguage = HTML_LANG[locale];
    }
    return out;
  }
  return node;
}

/** Renders JSON-LD with page URLs localised and inLanguage set. English is unchanged apart from inLanguage. */
export default function JsonLd({ data }: { data: unknown }) {
  const locale = useLocale();
  const out = walk(data, locale);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(out) }}
    />
  );
}
