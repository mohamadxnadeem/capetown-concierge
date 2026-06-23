export const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://web-production-1ab9.up.railway.app";

const join = (path: string) => `${BACKEND_URL}${path}`;

export const endpoints = {
  villas: {
    all: () => join(`/api/villas/`),
    featured: () => join(`/api/villas/featured/`),
    detail: (slug: string) => join(`/api/villas/${encodeURIComponent(slug)}/`),
  },
} as const;
