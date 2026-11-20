"use client";

import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { makeT, type Dict, type PageStatus, type TFunction } from "../../lib/i18n/messages";
import type { Locale } from "../../lib/i18n/config";
import type { LocaleVersions } from "../../lib/i18n/seo";

type Ctx = {
  locale: Locale;
  t: TFunction;
  /** Statuses of hardcoded pages, keyed by locale then English path. */
  statuses: Record<string, Record<string, PageStatus>>;
  /** Versions registered by dynamic pages (tours, vehicles). */
  dynamicVersions: LocaleVersions | null;
  setDynamicVersions: (v: LocaleVersions | null) => void;
};

const LocaleContext = createContext<Ctx>({
  locale: "en",
  t: (k) => k,
  statuses: {},
  dynamicVersions: null,
  setDynamicVersions: () => {},
});

export function LocaleProvider({
  locale,
  messages,
  statuses,
  children,
}: {
  locale: Locale;
  messages: Dict;
  statuses: Record<string, Record<string, PageStatus>>;
  children: React.ReactNode;
}) {
  const t = useMemo(() => makeT(messages), [messages]);
  const [dynamicVersions, setDv] = useState<LocaleVersions | null>(null);
  const setDynamicVersions = useCallback((v: LocaleVersions | null) => setDv(v), []);
  const value = useMemo(
    () => ({ locale, t, statuses, dynamicVersions, setDynamicVersions }),
    [locale, t, statuses, dynamicVersions, setDynamicVersions]
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export const useLocaleContext = () => useContext(LocaleContext);
export const useLocale = () => useContext(LocaleContext).locale;
export const useT = () => useContext(LocaleContext).t;
