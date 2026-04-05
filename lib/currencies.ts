export type CurrencyCode = "USD" | "GBP" | "EUR" | "ZAR" | "AUD" | "CAD";

export interface CurrencyMeta {
  symbol: string;
  name: string;
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  USD: { symbol: "$",  name: "US Dollar",            flag: "🇺🇸" },
  GBP: { symbol: "£",  name: "British Pound",         flag: "🇬🇧" },
  EUR: { symbol: "€",  name: "Euro",                  flag: "🇪🇺" },
  ZAR: { symbol: "R",  name: "South African Rand",    flag: "🇿🇦" },
  AUD: { symbol: "A$", name: "Australian Dollar",     flag: "🇦🇺" },
  CAD: { symbol: "C$", name: "Canadian Dollar",       flag: "🇨🇦" },
};

export const CURRENCY_LIST = Object.keys(CURRENCIES) as CurrencyCode[];

// Fallback rates relative to 1 USD (used if API fails)
export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  ZAR: 18.5,
  AUD: 1.54,
  CAD: 1.36,
};

// Country code → preferred currency
export const COUNTRY_TO_CURRENCY: Partial<Record<string, CurrencyCode>> = {
  US: "USD", PR: "USD", GU: "USD", VI: "USD",
  GB: "GBP",
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR",
  AT: "EUR", PT: "EUR", GR: "EUR", FI: "EUR", IE: "EUR", LU: "EUR",
  SK: "EUR", SI: "EUR", EE: "EUR", LV: "EUR", LT: "EUR", CY: "EUR", MT: "EUR",
  ZA: "ZAR",
  AU: "AUD", NZ: "AUD",
  CA: "CAD",
};

export async function fetchLiveRates(): Promise<Record<CurrencyCode, number>> {
  try {
    const res = await fetch(
      "https://api.frankfurter.app/latest?from=USD&to=GBP,EUR,ZAR,AUD,CAD",
      { cache: "no-store" }
    );
    if (!res.ok) return FALLBACK_RATES;
    const data = await res.json();
    return {
      USD: 1,
      GBP: data.rates?.GBP ?? FALLBACK_RATES.GBP,
      EUR: data.rates?.EUR ?? FALLBACK_RATES.EUR,
      ZAR: data.rates?.ZAR ?? FALLBACK_RATES.ZAR,
      AUD: data.rates?.AUD ?? FALLBACK_RATES.AUD,
      CAD: data.rates?.CAD ?? FALLBACK_RATES.CAD,
    };
  } catch {
    return FALLBACK_RATES;
  }
}

export function convertFromUsd(
  usd: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number>
): number {
  return Math.round(usd * rates[currency]);
}

export function formatMoney(
  usd: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number>
): string {
  const amount = convertFromUsd(usd, currency, rates);
  const { symbol } = CURRENCIES[currency];
  // Format with comma separators for larger amounts
  const formatted = amount.toLocaleString("en-US");
  return `${symbol}${formatted}`;
}
