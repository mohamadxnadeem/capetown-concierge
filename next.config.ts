import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      // Mixed-case slug redirects — 301 permanent
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
        source: "/chauffeur-services/Mercedes-sprinter-with-driver-cape-town",
        destination: "/chauffeur-services/mercedes-sprinter-with-driver-cape-town",
        permanent: true,
      },
      {
        source: "/chauffeur-services/Mercedes-v-class-private-chauffeur-service",
        destination: "/chauffeur-services/mercedes-v-class-private-chauffeur-service",
        permanent: true,
      },
      {
        source: "/chauffeur-services/Range-rover-sport-chauffeur-service-cape-town",
        destination: "/chauffeur-services/range-rover-sport-chauffeur-service-cape-town",
        permanent: true,
      },
      {
        source: "/private-tours/Cape-Town-City-Tour",
        destination: "/private-tours/cape-town-city-tour",
        permanent: true,
      },
      {
        source: "/private-tours/Cape-Peninsula-Tour",
        destination: "/private-tours/cape-peninsula-tour",
        permanent: true,
      },
      {
        source: "/private-tours/Winelands-Chauffeur-Drive",
        destination: "/private-tours/winelands-chauffeur-drive",
        permanent: true,
      },
      {
        source: "/private-tours/Safari-Day-Trip",
        destination: "/private-tours/safari-day-trip",
        permanent: true,
      },
      // 8-seater slug variant
      {
        source: "/chauffeur-services/8-Seater-staria-van-with-driver",
        destination: "/chauffeur-services/8-seater-staria-van-with-driver",
        permanent: true,
      },
      // Peninsular typo → Peninsula (correct spelling)
      {
        source: "/private-tours/cape-peninsular-tour",
        destination: "/private-tours/cape-peninsula-tour",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;