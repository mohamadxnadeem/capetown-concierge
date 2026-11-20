import type { MetadataRoute } from "next";

// /ar/, /pt-br/ and /ru/ are deliberately NOT blocked.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.capetown-concierge.co.za/sitemap.xml",
  };
}
