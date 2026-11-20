import { withLocalePrefix, type Locale } from "./config";
import { localizedSlug, type ContentKind } from "./slugs";

const KINDS: Record<string, ContentKind> = { tours: "tours", "chauffeur-hire": "vehicles" };

/** Locale-aware internal link. English returns the path untouched. Query and hash are kept. */
export function localePath(locale: Locale, path: string): string {
  if (locale === "en" || !path.startsWith("/") || path.startsWith("//")) return path;
  const first = path.split("/")[1]?.split(/[?#]/)[0]?.toLowerCase();
  if (first && ["ar", "pt-br", "ru"].includes(first)) return path;
  const m = path.match(/^([^?#]*)([?#].*)?$/);
  const base = m?.[1] ?? path;
  const rest = m?.[2] ?? "";
  const parts = base.split("/").filter(Boolean);
  const kind = KINDS[parts[0] ?? ""];
  if (kind && parts[1]) parts[1] = localizedSlug(locale, kind, parts[1]);
  return withLocalePrefix(locale, "/" + parts.join("/")) + rest;
}
