import type { Locale } from "./config";
import arLiterals from "../../messages/ar/literals.json";
import ptLiterals from "../../messages/pt-BR/literals.json";
import ruLiterals from "../../messages/ru/literals.json";

type Dict = Record<string, string>;

const LITERALS: Record<Locale, Dict> = {
  en: {},
  ar: arLiterals as Dict,
  "pt-BR": ptLiterals as Dict,
  ru: ruLiterals as Dict,
};

/**
 * Translates an English string that arrives as a prop or from the API.
 * Looks the exact English text up in messages/<locale>/literals.json.
 * English, and any text without a translation, is returned unchanged.
 */
export function tl(locale: Locale, text: string): string;
export function tl(locale: Locale, text: undefined | null): undefined;
export function tl(locale: Locale, text?: string | null): string | undefined {
  if (!text) return text ?? undefined;
  if (locale === "en") return text;
  return LITERALS[locale][text] || LITERALS[locale][text.trim()] || text;
}
