export const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://web-production-1ab9.up.railway.app";

const join = (path: string) => `${BACKEND_URL}${path}`;

export const endpoints = {
  villas: {
    all: () => join(`/api/villas/`),
    featured: () => join(`/api/villas/featured/`),
    detail: (slug: string) => join(`/api/villas/${encodeURIComponent(slug)}/`),
    availability: (slug: string) =>
      join(`/api/villas/${encodeURIComponent(slug)}/availability/`),
  },
  hotels: {
    all: () => join(`/api/hotels/`),
    featured: () => join(`/api/hotels/featured/`),
    detail: (slug: string) => join(`/api/hotels/${encodeURIComponent(slug)}/`),
  },
  carsForHire: {
    all: () => join(`/api/cars-for-hire/`),
  },
  bookings: {
    publicDetail: (ref: string) =>
      join(`/api/public/bookings/${encodeURIComponent(ref)}/`),
  },
} as const;
