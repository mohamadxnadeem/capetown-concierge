import { NextResponse, type NextRequest } from "next/server";

// ─────────────────────────────────────────────────────────────────────
// Site-wide lowercase-slug enforcement.
//
// Next.js's `redirects()` config matches sources case-insensitively, so
// it can't 301 /BMW-X5-for-hire-with-driver → /bmw-x5-for-hire-with-driver
// without infinite-looping. Middleware sees the raw case-preserved URL
// and can 301 any capitalised pathname to its lowercase canonical
// exactly once.
//
// Skips:
//   - Next.js internals (/_next, /api routes)
//   - Static asset paths that legitimately contain uppercase segments
//     (favicons, images, sitemap, robots)
// ─────────────────────────────────────────────────────────────────────

const SKIP_PREFIXES = ["/_next", "/api", "/static"];

const SKIP_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".ico",
  ".xml",
  ".txt",
  ".pdf",
  ".mp4",
  ".webm",
  ".css",
  ".js",
  ".map",
  ".woff",
  ".woff2",
  ".ttf",
];

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (SKIP_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const lower = pathname.toLowerCase();
  if (lower === pathname) {
    return NextResponse.next();
  }

  if (SKIP_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = lower;
  url.search = search;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    // Every request except Next internals and static file assets. The
    // handler above does the same skip, but the matcher trims work at
    // the edge for the common case.
    "/((?!_next/|api/|.*\\..*).*)",
  ],
};
