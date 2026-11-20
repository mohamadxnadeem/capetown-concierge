import { NextResponse } from "next/server";
import { CURRENCY_LIST, FALLBACK_RATES } from "../../../lib/currencies";

export const runtime = "edge";
export const revalidate = 86400;

const SOURCE = "https://open.er-api.com/v6/latest/ZAR";

// Last good rates kept in memory (per server instance) in case the source fails.
let lastGood: { rates: Record<string, number>; updated: string } | null = null;

export async function GET() {
  try {
    const res = await fetch(SOURCE, { next: { revalidate: 86400 } });
    if (res.ok) {
      const data = await res.json();
      if (data?.result === "success" && data.rates) {
        const rates: Record<string, number> = { ZAR: 1 };
        for (const code of CURRENCY_LIST) {
          const r = data.rates[code];
          if (typeof r === "number" && r > 0) rates[code] = r;
        }
        if (Object.keys(rates).length > 3) {
          lastGood = { rates, updated: data.time_last_update_utc ?? "" };
        }
      }
    }
  } catch {
    // fall through to cached or fallback rates
  }
  const body = lastGood
    ? { base: "ZAR", source: "live", ...lastGood }
    : { base: "ZAR", source: "fallback", rates: FALLBACK_RATES, updated: "" };
  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
