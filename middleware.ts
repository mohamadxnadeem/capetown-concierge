import { NextResponse, type NextRequest } from "next/server";

// ─────────────────────────────────────────────────────────────────────
// Case-sensitive lowercase-slug enforcement for /chauffeur-hire/*.
//
// Next.js's redirects() config matches sources case-insensitively, so
// it can't 301 /BMW-X5-for-hire-with-driver → /bmw-x5-for-hire-with-driver
// without infinite-looping. Middleware sees the raw case-preserved URL
// and can distinguish, so it can safely 301 mixed-case slugs to their
// lowercase canonical.
// ─────────────────────────────────────────────────────────────────────

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith("/chauffeur-hire/")) {
    // ["", "chauffeur-hire", "<slug>"]
    const parts = pathname.split("/");
    if (parts.length === 3) {
      const slug = parts[2];
      if (slug && slug !== slug.toLowerCase()) {
        const url = req.nextUrl.clone();
        url.pathname = `/chauffeur-hire/${slug.toLowerCase()}`;
        // Search params preserved by .clone()
        url.search = search;
        return NextResponse.redirect(url, 301);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chauffeur-hire/:path*"],
};
