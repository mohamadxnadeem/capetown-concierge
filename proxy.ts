import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing.
 *  - English lives at the root with no prefix. Un-prefixed paths are rewritten
 *    to the internal /en/... route, so English URLs are unchanged.
 *  - /ar, /pt-br and /ru pass straight through.
 *  - Booking, driver, villas, hotels and api routes are English only and stay
 *    outside the locale segment.
 *  - Never redirects by language or country. For first-time visitors on an
 *    English page whose browser prefers ar, pt or ru, we set a cookie that the
 *    page uses to offer a dismissible banner.
 */

const PREFIXES = ["ar", "pt-br", "ru"];
const EN_ONLY = ["booking", "booking-confirmation", "driver", "villas", "hotels", "api"];
const BOT_RE =
  /bot|crawl|spider|slurp|facebookexternalhit|lighthouse|pagespeed|headless|preview|monitor|curl|wget/i;

const CHOICE_COOKIE = "ctc_lang_choice";
const SUGGEST_COOKIE = "ctc_lang_suggest";

function preferredPrefix(header: string | null): string | null {
  if (!header) return null;
  let best: { tag: string; q: number } | null = null;
  for (const part of header.split(",")) {
    const [tagRaw, ...params] = part.trim().split(";");
    const tag = tagRaw.trim().toLowerCase();
    if (!tag || tag === "*") continue;
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? parseFloat(qParam.trim().slice(2)) : 1;
    if (Number.isNaN(q) || q <= 0) continue;
    if (!best || q > best.q) best = { tag, q };
  }
  if (!best) return null;
  const primary = best.tag.split("-")[0];
  if (primary === "ar") return "ar";
  if (primary === "pt") return "pt-br";
  if (primary === "ru") return "ru";
  return null;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const segments = pathname.split("/");
  const first = segments[1] ?? "";
  const firstLower = first.toLowerCase();

  // /en/... is never a public URL: send to the un-prefixed English URL.
  if (firstLower === "en") {
    const url = request.nextUrl.clone();
    url.pathname = "/" + segments.slice(2).join("/");
    return NextResponse.redirect(url, 308);
  }

  // Locale prefixes pass through (normalise case).
  if (PREFIXES.includes(firstLower)) {
    if (first !== firstLower) {
      const url = request.nextUrl.clone();
      url.pathname = "/" + [firstLower, ...segments.slice(2)].join("/");
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }

  // English-only routes stay as they are.
  if (EN_ONLY.includes(first)) return NextResponse.next();

  // English page: rewrite internally to /en/...
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  url.search = search;
  const response = NextResponse.rewrite(url);

  // First-visit language suggestion (cookie only, never a redirect).
  if (
    request.method === "GET" &&
    !request.cookies.get(CHOICE_COOKIE) &&
    !BOT_RE.test(request.headers.get("user-agent") ?? "")
  ) {
    const suggestion = preferredPrefix(request.headers.get("accept-language"));
    if (suggestion) {
      response.cookies.set(SUGGEST_COOKIE, suggestion, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
      });
    }
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
