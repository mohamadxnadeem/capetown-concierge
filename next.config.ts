import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
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
  async redirects() {
    return [
      // Typo fix
      {
        source: "/private-tours/cape-peninsular-tour",
        destination: "/private-tours/cape-peninsula-tour",
        permanent: true,
      },
      // Uppercase slug → lowercase (consolidates ranking signals)
      {
        source: "/private-tours/Cape-Town-City-Tour",
        destination: "/private-tours/cape-town-city-tour",
        permanent: true,
      },
      {
        source: "/chauffeur-services/BMW-X5-for-hire-with-driver",
        destination: "/chauffeur-services/bmw-x5-for-hire-with-driver",
        permanent: true,
      },
      {
        source: "/chauffeur-services/BMW-5-series-for-hire-with-driver",
        destination: "/chauffeur-services/bmw-5-series-for-hire-with-driver",
        permanent: true,
      },
      {
        source: "/chauffeur-services/Mercedes-v-class-private-chauffeur-service",
        destination: "/chauffeur-services/mercedes-v-class-private-chauffeur-service",
        permanent: true,
      },
      {
        source: "/chauffeur-services/Mercedes-sprinter-with-driver-cape-town",
        destination: "/chauffeur-services/mercedes-sprinter-with-driver-cape-town",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
