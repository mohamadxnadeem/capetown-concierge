import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(
      "https://api.frankfurter.app/latest?from=USD&to=GBP,EUR,ZAR,AUD,CAD",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) {
      return NextResponse.json({ error: "upstream error" }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json({ error: "fetch failed" }, { status: 502 });
  }
}
