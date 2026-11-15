"use client";

import { useCurrency } from "../../context/CurrencyContext";
import { formatMoney } from "../../lib/currencies";

type Props = {
  /** Amount in South African Rand (the currency system is ZAR based). */
  zar: number | string | null | undefined;
  prefix?: string;
  suffix?: string;
};

/**
 * "From R8,850 per day (approx. $478)". Rand always comes first, followed by
 * the visitor's selected currency. If that is ZAR (or not set) we show USD.
 * Updates live when the currency selector changes.
 */
export default function ApproxPrice({ zar, prefix = "From ", suffix = "per day" }: Props) {
  const { currency, rates } = useCurrency();
  const amount = Number(String(zar ?? "").replace(/[^0-9.]/g, ""));
  if (!amount || Number.isNaN(amount)) return null;

  const target = !currency || currency === "ZAR" ? "USD" : currency;
  const approx = formatMoney(amount, target, rates);

  return (
    <>
      {prefix}R{Math.round(amount).toLocaleString("en-US")}
      {suffix ? ` ${suffix}` : ""} (approx. {approx})
    </>
  );
}
