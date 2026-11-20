"use client";

import { useCurrency } from "../../context/CurrencyContext";
import { formatMoneyLocale } from "../../lib/currencies";
import { formatNumber } from "../../lib/i18n/numbers";
import { useLocale, useTl } from "../../lib/i18n/LocaleContext";

interface MoneyProps {
  usd?: number | string | null;
  suffix?: string;
  prefix?: string;
}

/** Price formatter for the page language. Same amounts and currency logic as useCurrency().format. */
export function useMoneyFormat(): (usd: number) => string {
  const { currency, rates } = useCurrency();
  const locale = useLocale();
  return (usd: number) => formatMoneyLocale(usd, currency, rates, locale);
}

export default function Money({ usd, suffix = "per day", prefix = "From " }: MoneyProps) {
  const { currency, rates, isReady } = useCurrency();
  const locale = useLocale();
  const tl = useTl();

  const amount = usd !== undefined && usd !== null && usd !== ""
    ? Number(String(usd).replace(/[^0-9.]/g, ""))
    : NaN;

  if (isNaN(amount) || amount === 0) return null;

  // Show ZAR immediately during hydration (default currency), swap once ready
  const display = isReady
    ? formatMoneyLocale(amount, currency, rates, locale)
    : `R${formatNumber(locale, Math.round(amount))}`;

  // Arabic pages: keep the symbol and digits in one left to right run.
  const shown = locale === "ar" ? <bdi dir="ltr">{display}</bdi> : display;

  return (
    <>
      {prefix ? tl(prefix) : prefix}
      {shown}
      {suffix ? ` ${tl(suffix)}` : ""}
    </>
  );
}
