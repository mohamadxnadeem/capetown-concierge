import type { MetadataRoute } from "next";
import { brand } from "../lib/brand";

const SITE_URL = brand.siteUrl;

// Fallback slugs used when the Railway API is unreachable during build.
// Update this list whenever a new tour or vehicle is added to the CMS.
const FALLBACK_TOUR_SLUGS = [
  "cape-peninsula-tour",
  "winelands-chauffeur-drive",
  "cape-town-city-tour",
  "safari-day-trip",
  "sunset-safari-experience",
  "table-mountain-tour",
];

const FALLBACK_VEHICLE_SLUGS: string[] = [
  "bmw-x5-for-hire-with-driver",
  "bmw-5-series-for-hire-with-driver",
  "mercedes-v-class-private-chauffeur-service",
  "mercedes-sprinter-with-driver-cape-town",
  "range-rover-sport-chauffeur-service-cape-town",
  "8-seater-staria-van-with-driver",
];

type CarsApiItem = {
  car?: { slug?: string };
  slug?: string;
};

type ExperienceListItem = {
  experience?: { slug?: string };
  slug?: string;
};

async function getVehicleSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return FALLBACK_VEHICLE_SLUGS;
    const data = await res.json();
    const items: CarsApiItem[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
      ? data.results
      : [];
    const apiSlugs = items
      .map((item) => item?.car?.slug || item?.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => slug.toLowerCase());
    return Array.from(new Set([...apiSlugs, ...FALLBACK_VEHICLE_SLUGS]));
  } catch {
    return FALLBACK_VEHICLE_SLUGS;
  }
}

async function getExperienceSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://web-production-1ab9.up.railway.app/api/experiences/all/",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return FALLBACK_TOUR_SLUGS;
    const data: ExperienceListItem[] = await res.json();
    const apiSlugs = data
      .map((item) => item?.experience?.slug || item?.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => slug.toLowerCase());
    return Array.from(new Set([...apiSlugs, ...FALLBACK_TOUR_SLUGS]));
  } catch {
    return FALLBACK_TOUR_SLUGS;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [vehicleSlugs, experienceSlugs] = await Promise.all([
    getVehicleSlugs(),
    getExperienceSlugs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/chauffeur-services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/private-tours`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/airport-transfers-cape-town`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/best-wine-farms-in-cape-town`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/best-activities-to-do-in-cape-town`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/7-day-cape-town-itinerary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const vehicleRoutes: MetadataRoute.Sitemap = vehicleSlugs.map((slug) => ({
    url: `${SITE_URL}/chauffeur-services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const tourRoutes: MetadataRoute.Sitemap = experienceSlugs.map((slug) => ({
    url: `${SITE_URL}/private-tours/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...vehicleRoutes, ...tourRoutes];
}
