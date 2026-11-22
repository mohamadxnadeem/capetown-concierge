import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // S3 buckets — covers any bucket/region (*.s3.amazonaws.com,
      // *.s3.eu-north-1.amazonaws.com, etc.)
      // Current bucket: cape-town-concierge (eu-north-1)
      // Legacy bucket:  why-cpt-storage (us-east-1)
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      // TODO: when CloudFront is added in front of S3, add its domain here, e.g.:
      // { protocol: "https", hostname: "d123abc.cloudfront.net" },
      {
        protocol: "https",
        hostname: "**.railway.app",
      },
    ],
  },
  experimental: {
    // Unmatched URLs render the English 404 inside the site shell (the root layout is [locale]).
    globalNotFound: true,
  },
  reactStrictMode: true,
  trailingSlash: false,
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Old domains: permanent, path-preserving redirects to the live site.
      ...[
        "capetown-concierge.com",
        "www.capetown-concierge.com",
        "whycapetown.com",
        "www.whycapetown.com",
      ].map((host) => ({
        source: "/:path*",
        has: [{ type: "host" as const, value: host }],
        destination: "https://www.capetown-concierge.co.za/:path*",
        permanent: true,
      })),
      // Non-www → www canonical redirect.
      // Google indexed the www version (canonical siteUrl = www); without
      // this redirect, clicks from Google land on the bare domain and 404.
      {
        source: "/:path*",
        has: [{ type: "host", value: "capetown-concierge.co.za" }],
        destination: "https://www.capetown-concierge.co.za/:path*",
        permanent: true,
      },
      // Shared group links from the app used /proposal/<ref>/
      {
        source: "/proposal/:ref",
        destination: "/booking-confirmation/:ref",
        permanent: true,
      },
      // IA rename: chauffeur-services → chauffeur-hire
      {
        source: "/chauffeur-services",
        destination: "/chauffeur-hire",
        permanent: true,
      },
      {
        source: "/chauffeur-services/:slug",
        destination: "/chauffeur-hire/:slug",
        permanent: true,
      },
      // Retired pages that still collect Google clicks or impressions (Search Console, Nov 2026).
      // Each one goes to the closest live page instead of a 404.
      {
        source: "/7-day-garden-route-itinerary",
        destination: "/multi-day-chauffeur-cape-town",
        permanent: true,
      },
      {
        source: "/tours/table-mountain-tour",
        destination: "/tours/cape-town-city-tour",
        permanent: true,
      },
      {
        source: "/private-tours/sunset-safari-experience",
        destination: "/tours/big-5-safari-from-cape-town",
        permanent: true,
      },
      {
        source: "/tours/sunset-safari-experience",
        destination: "/tours/big-5-safari-from-cape-town",
        permanent: true,
      },
      // IA rename: private-tours → tours
      {
        source: "/private-tours",
        destination: "/tours",
        permanent: true,
      },
      {
        source: "/private-tours/:slug",
        destination: "/tours/:slug",
        permanent: true,
      },
      // Typo fix — safe: source and destination differ meaningfully
      // (peninsular vs peninsula are genuinely different strings)
      {
        source: "/tours/cape-peninsular-tour",
        destination: "/tours/cape-peninsula-tour",
        permanent: true,
      },
      // Route rename: /proposal → /booking-confirmation. The mobile app,
      // WhatsApp templates and any existing shared links still resolve
      // via this 301 while new shares can adopt the new URL.
      {
        source: "/proposal/:group_reference",
        destination: "/booking-confirmation/:group_reference",
        permanent: true,
      },
      // V-Class slug was briefly changed in admin to "mercedes-v-class".
      // King Mo (2026-11-15): keep the original URL. Not a case-only redirect,
      // the destination is a different, longer slug, so it cannot loop.
      {
        source: "/chauffeur-hire/mercedes-v-class",
        destination: "/chauffeur-hire/mercedes-v-class-private-chauffeur-service",
        permanent: true,
      },
      // NOTE: do NOT add case-only redirects (e.g. BMW-X5 → bmw-x5).
      // Next.js matches sources case-insensitively so they loop on the
      // lowercase URL. Slug lowercasing is handled in code instead.
    ];
  },
};

export default nextConfig;
