import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ENGLISH_ONLY_SEGMENTS,
  LOCALES,
  LOCALE_PREFIX,
  type Locale,
} from "./lib/i18n/config";
import { CHOICE_COOKIE, SUGGEST_COOKIE, isBot, suggestedLocale } from "./lib/i18n/suggest";
import { englishSlugFor, type ContentKind } from "./lib/i18n/slugs";

/**
 * Locale routing.
 *   /tours            -> internally /en/tours   (English keeps its URLs, no prefix)
 *   /ru/tours         -> internally /ru/tours
 *   /ru/<local-slug>  -> internally /ru/tours/<english-slug>
 * Language prefixed versions of English-only pages (booking, villas, hotels, ...) return 404.
 */
const SLUG_KINDS: Record<string, ContentKind> = {
  tours: "tours",
  "chauffeur-hire": "vehicles",
};

const CASE_SENSITIVE_SEGMENTS = ["booking", "booking-confirmation", "driver", "proposal"];

const PREFIXED = LOCALES.filter((l) => l !== "en");

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0]?.toLowerCase();

  // SEO: one URL per page. Any path with capital letters gets a permanent redirect to its
  // lowercase version (e.g. /chauffeur-hire/Mercedes-v-class-... -> lowercase), so Google stops
  // counting the capitalised copies separately. Booking, confirmation and driver links carry
  // case-sensitive references, so they are left exactly as they are.
  if (
    pathname !== pathname.toLowerCase() &&
    !CASE_SENSITIVE_SEGMENTS.includes(first ?? "")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  // English is served from the root only. /en/... is not a public URL.
  if (first === "en") {
    const url = request.nextUrl.clone();
    url.pathname = "/" + parts.slice(1).join("/");
    return NextResponse.redirect(url, 308);
  }

  const locale = PREFIXED.find((l) => LOCALE_PREFIX[l] === first) as Locale | undefined;

  if (!locale) {
    const url = request.nextUrl.clone();
    url.pathname = "/en" + (pathname === "/" ? "" : pathname);
    const res = NextResponse.rewrite(url);
    // Language suggestion for the client banner: only real browsers, no saved choice, and only
    // on pages that have translations. English visitors get no cookie and identical HTML.
    if (
      request.method === "GET" &&
      !request.cookies.has(CHOICE_COOKIE) &&
      !(first && ENGLISH_ONLY_SEGMENTS.includes(first)) &&
      !isBot(request.headers.get("user-agent"))
    ) {
      const suggest = suggestedLocale(request.headers.get("accept-language"));
      if (suggest) {
        res.cookies.set(SUGGEST_COOKIE, suggest, { path: "/", maxAge: 86400, sameSite: "lax" });
      }
    }
    return res;
  }

  const rest = parts.slice(1);
  const url = request.nextUrl.clone();

  if (rest[0] && ENGLISH_ONLY_SEGMENTS.includes(rest[0])) {
    url.pathname = `/${LOCALE_PREFIX[locale]}/not-available-in-this-language`;
    return NextResponse.rewrite(url);
  }

  const kind = SLUG_KINDS[rest[0] ?? ""];
  if (kind && rest[1]) {
    rest[1] = englishSlugFor(locale, kind, rest[1]);
  }
  url.pathname = `/${LOCALE_PREFIX[locale]}${rest.length ? "/" + rest.join("/") : ""}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, images and any file with an extension
  // (sitemap.xml, robots.txt, icon.png, favicon, ...).
  matcher: ["/((?!api|_next|images|.*\\..*).*)"],
};
