"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  CurrencyCode,
  CURRENCY_COOKIE,
  CURRENCY_MANUAL_COOKIE,
  DEFAULT_CURRENCY,
  FALLBACK_RATES,
  currencyForCountry,
  fetchLiveRates,
  formatMoney,
  formatZar,
  isCurrencyCode,
} from "../lib/currencies";
import { useLocale } from "../components/i18n/LocaleProvider";

const LEGACY_STORAGE_KEY = "ctc_currency";
const RATES_STORAGE_KEY = "ctc_rates_v2";
const RATES_TTL = 1000 * 60 * 60 * 24; // rates are refreshed daily
const YEAR = 60 * 60 * 24 * 365;

// useLayoutEffect on the client so the currency swaps before first paint (no flash, no layout shift).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function readCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

function writeCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; samesite=lax`;
}

interface CurrencyContextValue {
  currency: CurrencyCode;
  detectedCurrency: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  setCurrency: (code: CurrencyCode) => void;
  /** Formats a ZAR amount: "≈ AED 2,450 (R9,850)", or "R9,850" when ZAR. */
  format: (zar: number) => string;
  isReady: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "ZAR",
  detectedCurrency: "ZAR",
  rates: FALLBACK_RATES,
  setCurrency: () => {},
  format: (zar) => formatZar(zar),
  isReady: false,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  // The server always renders ZAR; the client swaps in the visitor's currency.
  const [currency, setCurrencyState] = useState<CurrencyCode>("ZAR");
  const [detectedCurrency, setDetectedCurrency] = useState<CurrencyCode>("ZAR");
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(FALLBACK_RATES);
  const [isReady, setIsReady] = useState(false);

  // 1. Resolve currency from the cookie before paint.
  useIsoLayoutEffect(() => {
    let chosen = readCookie(CURRENCY_COOKIE);
    let manual = readCookie(CURRENCY_MANUAL_COOKIE) === "1";

    // One-time migration of an older localStorage choice (it was always a manual pick).
    try {
      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacy) {
        if (isCurrencyCode(legacy) && !manual) {
          chosen = legacy;
          manual = true;
          writeCookie(CURRENCY_COOKIE, legacy, YEAR);
          writeCookie(CURRENCY_MANUAL_COOKIE, "1", YEAR);
        }
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }
    } catch {}

    if (isCurrencyCode(chosen)) {
      setCurrencyState(chosen);
      if (!manual) setDetectedCurrency(chosen);
      setIsReady(true);
      // Use cached daily rates before paint so converted prices are right first time.
      try {
        const raw = localStorage.getItem(RATES_STORAGE_KEY);
        if (raw) {
          const cached = JSON.parse(raw);
          if (Date.now() - cached.timestamp < RATES_TTL) {
            setRates({ ...FALLBACK_RATES, ...cached.rates });
          }
        }
      } catch {}
    }
  }, []);

  // 2. Load fresh rates, and fall back to IP lookup only if the cookie was missing.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = localStorage.getItem(RATES_STORAGE_KEY);
        const fresh = raw && Date.now() - JSON.parse(raw).timestamp < RATES_TTL;
        if (!fresh) {
          const live = await fetchLiveRates();
          if (cancelled) return;
          setRates(live);
          localStorage.setItem(
            RATES_STORAGE_KEY,
            JSON.stringify({ rates: live, timestamp: Date.now() })
          );
        }
      } catch {}

      if (!readCookie(CURRENCY_COOKIE)) {
        let detected: CurrencyCode = DEFAULT_CURRENCY;
        try {
          const res = await fetch("/api/geo");
          if (res.ok) {
            const { country } = await res.json();
            detected = currencyForCountry(country);
          }
        } catch {}
        if (cancelled) return;
        writeCookie(CURRENCY_COOKIE, detected, 60 * 60 * 24 * 30);
        setDetectedCurrency(detected);
        setCurrencyState(detected);
        setIsReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    writeCookie(CURRENCY_COOKIE, code, YEAR);
    writeCookie(CURRENCY_MANUAL_COOKIE, "1", YEAR);
  }, []);

  const format = useCallback(
    (zar: number) => formatMoney(zar, currency, rates, locale),
    [currency, rates, locale]
  );

  return (
    <CurrencyContext.Provider
      value={{ currency, detectedCurrency, rates, setCurrency, format, isReady }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
