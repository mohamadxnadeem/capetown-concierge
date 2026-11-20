"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import type { Locale } from "./config";
import { withLocalePrefix } from "./config";
import { getT, type TFunction } from "./messages";

const LocaleContext = createContext<Locale>("en");

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useT(): TFunction {
  const locale = useLocale();
  return useMemo(() => getT(locale), [locale]);
}

/** Returns a function that prefixes internal paths with the current locale. */
export function useLocalePath(): (path: string) => string {
  const locale = useLocale();
  return useCallback((path: string) => withLocalePrefix(locale, path), [locale]);
}
