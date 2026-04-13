"use client";

import { useCurrency } from "../../context/CurrencyContext";

interface MoneyProps {
  usd?: number | string | null;
  suffix?: string;
  prefix?: string;
}

export default function Money({ usd, suffix = "per day", prefix = "From " }: MoneyProps) {
  const { format, isReady } = useCurrency();

  const amount = usd !== undefined && usd !== null && usd !== ""
    ? Number(String(usd).replace(/[^0-9.]/g, ""))
    : NaN;

  if (isNaN(amount) || amount === 0) return null;

  // Show USD immediately during hydration, swap once ready
  const display = isReady ? format(amount) : `$${Math.round(amount)}`;

  return (
    <>
      {prefix}
      {display}
      {suffix ? ` ${suffix}` : ""}
    </>
  );
}
