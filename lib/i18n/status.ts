import type { Locale, TranslatedLocale } from "./config";
import { TRANSLATED_LOCALES } from "./config";
import statusFile from "../../messages/status.json";

export type PageStatus = "draft" | "reviewed";
type StatusMap = Partial<Record<TranslatedLocale, PageStatus>>;

const PAGES = (statusFile as { pages: Record<string, StatusMap> }).pages;

/** Normalise "/tours/" and "" to "/tours" and "/". */
function norm(path: string) {
  if (!path || path === "/") return "/";
  return path.replace(/\/+$/, "").toLowerCase();
}

/** Anything not listed in messages/status.json is a draft. */
export function getStatus(locale: Locale, path: string): PageStatus {
  if (locale === "en") return "reviewed";
  return PAGES[norm(path)]?.[locale] === "reviewed" ? "reviewed" : "draft";
}

export function isReviewed(locale: Locale, path: string) {
  return getStatus(locale, path) === "reviewed";
}

export function reviewedLocales(path: string): TranslatedLocale[] {
  return TRANSLATED_LOCALES.filter((l) => isReviewed(l, path));
}
