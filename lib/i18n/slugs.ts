import type { Locale, TranslatedLocale } from "./config";
import arTours from "../../messages/ar/tours.json";
import ptTours from "../../messages/pt-BR/tours.json";
import ruTours from "../../messages/ru/tours.json";
import arVehicles from "../../messages/ar/vehicles.json";
import ptVehicles from "../../messages/pt-BR/vehicles.json";
import ruVehicles from "../../messages/ru/vehicles.json";

export type ContentEntry = {
  /** Localised URL slug (Latin script, keyword based). Empty means "use the English slug". */
  slug?: string;
  title?: string;
  short_description?: string;
  highlight?: string;
  card_summary?: string;
  duration?: string;
  location?: string;
  body?: string;
  stops?: { title?: string; description?: string }[];
  meta?: { title?: string; description?: string };
};
type ContentFile = Record<string, ContentEntry>;

export type ContentKind = "tours" | "vehicles";

const FILES: Record<TranslatedLocale, Record<ContentKind, ContentFile>> = {
  ar: { tours: arTours as ContentFile, vehicles: arVehicles as ContentFile },
  "pt-BR": { tours: ptTours as ContentFile, vehicles: ptVehicles as ContentFile },
  ru: { tours: ruTours as ContentFile, vehicles: ruVehicles as ContentFile },
};

/** Section folder used in URLs. */
export const KIND_SEGMENT: Record<ContentKind, string> = {
  tours: "tours",
  vehicles: "chauffeur-hire",
};

export function getContent(
  locale: Locale,
  kind: ContentKind,
  englishSlug: string
): ContentEntry | undefined {
  if (locale === "en") return undefined;
  return FILES[locale][kind][englishSlug.toLowerCase()];
}

export function localizedSlug(locale: Locale, kind: ContentKind, englishSlug: string): string {
  const slug = getContent(locale, kind, englishSlug)?.slug;
  return slug || englishSlug.toLowerCase();
}

/** Maps a (possibly localised) slug back to the English slug. */
export function englishSlugFor(locale: Locale, kind: ContentKind, slug: string): string {
  if (locale === "en") return slug;
  const wanted = slug.toLowerCase();
  const file = FILES[locale][kind];
  for (const [en, entry] of Object.entries(file)) {
    if (entry.slug && entry.slug.toLowerCase() === wanted) return en;
  }
  return slug;
}

/**
 * Overlays translated API fields (title, descriptions, body, stops) onto a tour or vehicle.
 * Empty or missing translations fall back to the English API text, and English pages
 * (no entry) get the same object back.
 */
export function overlayContent<T extends object>(item: T, entry?: ContentEntry): T {
  if (!entry) return item;
  const out: Record<string, unknown> = { ...(item as Record<string, unknown>) };
  const keys = ["title", "short_description", "highlight", "card_summary", "duration", "location", "body"] as const;
  for (const k of keys) {
    const v = entry[k];
    if (typeof v === "string" && v.trim() && k in out) out[k] = v;
  }
  const stops = out.stops;
  if (Array.isArray(stops) && entry.stops?.length) {
    out.stops = stops.map((stop, i) => {
      const tr = entry.stops?.[i];
      if (!tr || typeof stop !== "object" || stop === null) return stop;
      const next: Record<string, unknown> = { ...(stop as Record<string, unknown>) };
      if (tr.title?.trim() && "title" in next) next.title = tr.title;
      if (tr.description?.trim() && "description" in next) next.description = tr.description;
      return next;
    });
  }
  return out as T;
}
