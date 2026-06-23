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
      // Non-www → www canonical redirect.
      // Google indexed the www version (canonical siteUrl = www); without
      // this redirect, clicks from Google land on the bare domain and 404.
      {
        source: "/:path*",
        has: [{ type: "host", value: "capetown-concierge.co.za" }],
        destination: "https://www.capetown-concierge.co.za/:path*",
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
      // NOTE: do NOT add case-only redirects (e.g. BMW-X5 → bmw-x5).
      // Next.js matches sources case-insensitively so they loop on the
      // lowercase URL. Slug lowercasing is handled in code instead.
    ];
  },
};

export default nextConfig;
