import { NextRequest, NextResponse } from "next/server";
import { currencyForCountry } from "../../../lib/currencies";

export async function GET(request: NextRequest) {
  const country =
    request.headers.get("x-vercel-ip-country") ||
    request.headers.get("cf-ipcountry") ||
    "";

  return NextResponse.json(
    { country, currency: currencyForCountry(country) },
    { headers: { "Cache-Control": "private, max-age=86400" } }
  );
}
