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
  async redirects() {
    return [
      {
        source: "/private-tours/cape-peninsular-tour",
        destination: "/private-tours/cape-peninsula-tour",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
