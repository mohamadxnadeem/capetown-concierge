"use client";

import { useCurrency } from "../../context/CurrencyContext";
import { useLocale } from "../i18n/LocaleProvider";
import { formatZar } from "../../lib/currencies";

interface MoneyProps {
  /** ZAR amount (prices from the API are ZAR; the prop name is kept for existing callers). */
  usd?: number | string | null;
  suffix?: string;
  prefix?: string;
}

export default function Money({ usd, suffix = "per day", prefix = "From " }: MoneyProps) {
  const { format, isReady, currency } = useCurrency();
  const locale = useLocale();

  const amount = usd !== undefined && usd !== null && usd !== ""
    ? Number(String(usd).replace(/[^0-9.]/g, ""))
    : NaN;

  if (isNaN(amount) || amount === 0) return null;

  // The server and first render show ZAR; the client swaps before paint.
  const converted = isReady && currency !== "ZAR";
  const display = converted ? format(amount) : formatZar(amount);

  // Latin prices inside Arabic text need their own direction so they do not reorder.
  const price = locale === "ar" ? (
    <bdi dir="ltr">{display}</bdi>
  ) : (
    display
  );

  return (
    <>
      {prefix}
      {price}
      {suffix ? ` ${suffix}` : ""}
    </>
  );
}
