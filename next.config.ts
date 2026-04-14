import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  compiler: {
    styledComponents: true,
  },
  images: {
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "why-cpt-storage.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "web-production-1ab9.up.railway.app",
      },
    ],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      // Mixed-case slug corrections (301 permanent)
      {
        source: "/private-tours/cape-peninsular-tour",
        destination: "/private-tours/cape-peninsula-tour",
        permanent: true,
      },
      {
        source: "/chauffeur-services/BMW-X5-for-hire-with-driver",
        destination: "/chauffeur-services/bmw-x5-for-hire-with-driver",
        permanent: true,
      },
      {
        source: "/chauffeur-services/Mercedes-sprinter-with-driver-cape-town",
        destination: "/chauffeur-services/mercedes-sprinter-with-driver-cape-town",
        permanent: true,
      },
      {
        source: "/chauffeur-services/Mercedes-v-class-private-chauffeur-service",
        destination: "/chauffeur-services/mercedes-v-class-private-chauffeur-service",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
