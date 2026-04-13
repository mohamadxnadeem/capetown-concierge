"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CurrencyCode,
  COUNTRY_TO_CURRENCY,
  FALLBACK_RATES,
  fetchLiveRates,
  formatMoney,
} from "../lib/currencies";

const STORAGE_KEY = "ctc_currency";
const RATES_STORAGE_KEY = "ctc_rates";
const RATES_TTL = 1000 * 60 * 60; // 1 hour

interface CurrencyContextValue {
  currency: CurrencyCode;
  detectedCurrency: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  setCurrency: (code: CurrencyCode) => void;
  format: (usd: number) => string;
  isReady: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "USD",
  detectedCurrency: "USD",
  rates: FALLBACK_RATES,
  setCurrency: () => {},
  format: (usd) => `$${usd}`,
  isReady: false,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [detectedCurrency, setDetectedCurrency] = useState<CurrencyCode>("USD");
  const [rates, setRates] = useState<Record<CurrencyCode, number>>(FALLBACK_RATES);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      // 1. Load cached rates if fresh
      let resolvedRates = FALLBACK_RATES;
      try {
        const cachedRatesRaw = localStorage.getItem(RATES_STORAGE_KEY);
        if (cachedRatesRaw) {
          const cached = JSON.parse(cachedRatesRaw);
          if (Date.now() - cached.timestamp < RATES_TTL) {
            resolvedRates = cached.rates;
          }
        }
      } catch {}

      // 2. Fetch fresh rates in background if stale
      fetchLiveRates().then((freshRates) => {
        setRates(freshRates);
        try {
          localStorage.setItem(
            RATES_STORAGE_KEY,
            JSON.stringify({ rates: freshRates, timestamp: Date.now() })
          );
        } catch {}
      });

      setRates(resolvedRates);

      // 3. Determine currency — user preference takes priority
      const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
      if (saved && ["USD", "GBP", "EUR", "ZAR", "AUD", "CAD"].includes(saved)) {
        setCurrencyState(saved);
        setIsReady(true);
        return;
      }

      // 4. Auto-detect from IP
      try {
        const res = await fetch("/api/geo");
        if (res.ok) {
          const { country } = await res.json();
          const detected = COUNTRY_TO_CURRENCY[country] ?? "USD";
          setDetectedCurrency(detected);
          setCurrencyState(detected);
        }
      } catch {}

      setIsReady(true);
    }

    init();
  }, []);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {}
  }, []);

  const format = useCallback(
    (usd: number) => formatMoney(usd, currency, rates),
    [currency, rates]
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
