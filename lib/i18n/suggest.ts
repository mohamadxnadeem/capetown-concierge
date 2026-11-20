import type { TranslatedLocale } from "./config";

export const CHOICE_COOKIE = "ctc_lang_choice";
export const SUGGEST_COOKIE = "ctc_lang_suggest";

const BOT_RE =
  /googlebot|bingbot|yandex|duckduckbot|baiduspider|facebookexternalhit|twitterbot|linkedinbot|whatsapp|slackbot|applebot|ahrefsbot|semrushbot|bot|crawler|spider|preview|lighthouse|headless/i;

export function isBot(userAgent: string | null | undefined): boolean {
  // A missing user agent is treated as a bot: real browsers always send one.
  return !userAgent || BOT_RE.test(userAgent);
}

const PRIMARY: Record<string, TranslatedLocale | "en"> = {
  ar: "ar",
  pt: "pt-BR",
  ru: "ru",
  en: "en",
};

/**
 * Returns ar / pt-BR / ru when that language is the visitor's top preference and ranks above
 * English in Accept-Language. Otherwise null.
 */
export function suggestedLocale(header: string | null | undefined): TranslatedLocale | null {
  if (!header) return null;
  const langs = header
    .split(",")
    .map((part, index) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const quality = q ? parseFloat(q.slice(2)) : 1;
      return {
        base: tag.trim().toLowerCase().split("-")[0],
        q: Number.isFinite(quality) ? quality : 0,
        index,
      };
    })
    .filter((l) => l.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  const top = langs.find((l) => l.base in PRIMARY);
  if (!top || top.base === "en") return null;
  const target = PRIMARY[top.base];
  return target === "en" ? null : target;
}
