import type { MetadataRoute } from "next";

const SITE_URL = "https://capetown-concierge.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
      url: `${SITE_URL}/best-wine-farms-in-cape-town`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/best-activities-in-cape-town`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/7-day-cape-town-itinerary`,
      lastModified: new Date(),
      priority: 0.9,
    },
  ];
}