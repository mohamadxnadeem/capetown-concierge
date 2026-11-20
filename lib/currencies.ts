export type CurrencyCode =
  | "USD" | "GBP" | "EUR" | "ZAR" | "AUD" | "CAD"
  | "RUB" | "BRL" | "AED" | "SAR" | "QAR" | "KWD" | "BHD" | "OMR";

export interface CurrencyMeta {
  symbol: string;
  name: string;
  flag: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyMeta> = {
  USD: { symbol: "$",   name: "US Dollar",            flag: "🇺🇸" },
  GBP: { symbol: "£",   name: "British Pound",        flag: "🇬🇧" },
  EUR: { symbol: "€",   name: "Euro",                 flag: "🇪🇺" },
  ZAR: { symbol: "R",   name: "South African Rand",   flag: "🇿🇦" },
  AUD: { symbol: "A$",  name: "Australian Dollar",    flag: "🇦🇺" },
  CAD: { symbol: "C$",  name: "Canadian Dollar",      flag: "🇨🇦" },
  AED: { symbol: "AED", name: "UAE Dirham",           flag: "🇦🇪" },
  SAR: { symbol: "SAR", name: "Saudi Riyal",          flag: "🇸🇦" },
  QAR: { symbol: "QAR", name: "Qatari Riyal",         flag: "🇶🇦" },
  KWD: { symbol: "KWD", name: "Kuwaiti Dinar",        flag: "🇰🇼" },
  BHD: { symbol: "BHD", name: "Bahraini Dinar",       flag: "🇧🇭" },
  OMR: { symbol: "OMR", name: "Omani Rial",           flag: "🇴🇲" },
  RUB: { symbol: "RUB", name: "Russian Ruble",        flag: "🇷🇺" },
  BRL: { symbol: "R$",  name: "Brazilian Real",       flag: "🇧🇷" },
};

export const CURRENCY_LIST = Object.keys(CURRENCIES) as CurrencyCode[];

export function isCurrencyCode(v: unknown): v is CurrencyCode {
  return typeof v === "string" && v in CURRENCIES;
}

/** Cookie holding the visitor's currency. Source of truth for all pages. */
export const CURRENCY_COOKIE = "ctc_currency";
/** Set to "1" when the visitor picked a currency by hand. Detection never overwrites it. */
export const CURRENCY_MANUAL_COOKIE = "ctc_currency_manual";

// Fallback rates relative to 1 ZAR (final fallback if the rates API and its cache fail)
export const FALLBACK_RATES: Record<CurrencyCode, number> = {
  ZAR: 1,
  USD: 0.054,
  GBP: 0.043,
  EUR: 0.050,
  AUD: 0.083,
  CAD: 0.073,
  RUB: 4.3,
  BRL: 0.29,
  AED: 0.198,
  SAR: 0.203,
  QAR: 0.197,
  KWD: 0.0166,
  BHD: 0.0204,
  OMR: 0.0208,
};

/** Fallback when the country is unknown or has no mapped currency. */
export const DEFAULT_CURRENCY: CurrencyCode = "USD";

// Country code -> preferred currency
export const COUNTRY_TO_CURRENCY: Partial<Record<string, CurrencyCode>> = {
  US: "USD", PR: "USD", GU: "USD", VI: "USD",
  GB: "GBP",
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR",
  AT: "EUR", PT: "EUR", GR: "EUR", FI: "EUR", IE: "EUR", LU: "EUR",
  SK: "EUR", SI: "EUR", EE: "EUR", LV: "EUR", LT: "EUR", CY: "EUR", MT: "EUR",
  ZA: "ZAR",
  AU: "AUD", NZ: "AUD",
  CA: "CAD",
  RU: "RUB",
  BR: "BRL",
  AE: "AED",
  SA: "SAR",
  QA: "QAR",
  KW: "KWD",
  BH: "BHD",
  OM: "OMR",
};

export function currencyForCountry(country: string | null | undefined): CurrencyCode {
  return COUNTRY_TO_CURRENCY[(country ?? "").toUpperCase()] ?? DEFAULT_CURRENCY;
}

const ROUND_STEP: Partial<Record<CurrencyCode, number>> = {
  AED: 10, SAR: 10, QAR: 10, BRL: 10,
  KWD: 1, BHD: 1, OMR: 1,
  RUB: 100,
};

export async function fetchLiveRates(): Promise<Record<CurrencyCode, number>> {
  try {
    const res = await fetch("/api/rates");
    if (!res.ok) return FALLBACK_RATES;
    const data = await res.json();
    const out = { ...FALLBACK_RATES };
    for (const code of CURRENCY_LIST) {
      const r = data.rates?.[code];
      if (typeof r === "number" && r > 0) out[code] = r;
    }
    out.ZAR = 1;
    return out;
  } catch {
    return FALLBACK_RATES;
  }
}

/** Convert a ZAR amount (prices from the API are ZAR) into the target currency. */
export function convertFromZar(
  zar: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number>
): number {
  const raw = zar * rates[currency];
  const step = ROUND_STEP[currency] ?? 1;
  return Math.round(raw / step) * step;
}
/** @deprecated old name, amounts are ZAR. */
export const convertFromUsd = convertFromZar;

const INTL_LOCALE: Record<string, string> = {
  en: "en-US",
  ar: "ar-u-nu-latn", // Latin digits so prices stay consistent across languages
  "pt-BR": "pt-BR",
  ru: "ru-RU",
};

function nf(locale: string, currency: CurrencyCode, amount: number): string {
  try {
    return new Intl.NumberFormat(INTL_LOCALE[locale] ?? "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${CURRENCIES[currency].symbol}${amount.toLocaleString("en-US")}`;
  }
}

/** ZAR price as shown on the server: "R9,850". Stable across locales. */
export function formatZar(zar: number): string {
  return `R${Math.round(zar).toLocaleString("en-US")}`;
}

/**
 * "≈ AED 2,450 (R9,850)" for converted currencies, or just "R9,850" for ZAR.
 */
export function formatMoney(
  zar: number,
  currency: CurrencyCode,
  rates: Record<CurrencyCode, number>,
  locale = "en"
): string {
  if (currency === "ZAR") return formatZar(zar);
  const amount = convertFromZar(zar, currency, rates);
  return `≈ ${nf(locale, currency, amount)} (${formatZar(zar)})`;
}
