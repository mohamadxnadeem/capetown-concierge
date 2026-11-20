import * as React from "react";
import type { Locale } from "./config";
import { getT, type TFunction } from "./messages";
import { tl } from "./literals";

// `cache` only exists in the server (RSC) build of React. Fall back to a plain store otherwise.
const cache: <T extends () => unknown>(fn: T) => T =
  (React as unknown as { cache?: <T extends () => unknown>(fn: T) => T }).cache ?? ((fn) => fn);

const store = cache(() => ({ locale: "en" as Locale }));

/** Call at the top of every page (params are available there) before rendering server components. */
export function setRequestLocale(locale: Locale) {
  store().locale = locale;
}

export function getRequestLocale(): Locale {
  return store().locale;
}

/** Translator for server components. Needs setRequestLocale() to have run in the page. */
export function serverT(): TFunction {
  return getT(getRequestLocale());
}

/** Server translator for English literals (props, API text). See lib/i18n/literals.ts. */
export function serverTl(): (text: string | undefined | null) => string {
  const locale = getRequestLocale();
  return (text) => (text ? tl(locale, text) : "");
}
