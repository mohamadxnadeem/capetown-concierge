import type { MetadataRoute } from "next";

const SITE_URL = "https://capetown-concierge.co.za";

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
    if (!res.ok) return [];
    const data = await res.json();
    const items: CarsApiItem[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
      ? data.results
      : [];
    return items
      .map((item) => item?.car?.slug || item?.slug)
      .filter((slug): slug is string => Boolean(slug));
  } catch {
    return [];
  }
}

async function getExperienceSlugs(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://web-production-1ab9.up.railway.app/api/experiences/all/",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data: ExperienceListItem[] = await res.json();
    return data
      .map((item) => item?.experience?.slug || item?.slug)
      .filter((slug): slug is string => Boolean(slug));
  } catch {
    return [];
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
      priority: 1,
    },
    {
      url: `${SITE_URL}/chauffeur-services`,
      lastModified: new Date(),
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/private-tours`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/airport-transfers-cape-town`,
      lastModified: new Date(),
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/best-wine-farms-in-cape-town`,
      lastModified: new Date(),
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/best-activities-to-do-in-cape-town`,
      lastModified: new Date(),
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/7-day-cape-town-itinerary`,
      lastModified: new Date(),
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      priority: 0.6,
    },
  ];

  const vehicleRoutes: MetadataRoute.Sitemap = vehicleSlugs.map((slug) => ({
    url: `${SITE_URL}/chauffeur-services/${slug}`,
    lastModified: new Date(),
    priority: 0.9,
  }));

  const tourRoutes: MetadataRoute.Sitemap = experienceSlugs.map((slug) => ({
    url: `${SITE_URL}/private-tours/${slug}`,
    lastModified: new Date(),
    priority: 0.9,
  }));

  return [...staticRoutes, ...vehicleRoutes, ...tourRoutes];
}
