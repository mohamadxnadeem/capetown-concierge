import type { MetadataRoute } from "next";
import {
  HTML_LANG,
  LOCALES,
  STATIC_PAGE_PATHS,
  type Locale,
} from "../lib/i18n/config";
import { staticVersions, absoluteUrl, type LocaleVersions } from "../lib/i18n/seo";
import { versionsFromTranslations, type Translations } from "../lib/i18n/content";


// Fallback slugs used when the Railway API is unreachable during build.
// Update this list whenever a new tour or vehicle is added to the CMS.
const FALLBACK_TOUR_SLUGS = [
  "cape-peninsula-tour",
  "winelands-chauffeur-drive",
  "cape-town-city-tour",
  "big-5-safari-from-cape-town",
];

// Vehicle fallbacks intentionally empty — wrong slugs here would pollute the sitemap.
// The sitemap uses real CMS slugs when the API is reachable.
const FALLBACK_VEHICLE_SLUGS: string[] = [];

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

type ApiItem = {
  car?: { slug?: string; translations?: Translations };
  experience?: { slug?: string; translations?: Translations };
  slug?: string;
  translations?: Translations;
};

async function getItems(url: string, revalidate: number): Promise<ApiItem[] | null> {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
  } catch {
    return null;
  }
}

/** One sitemap entry per reviewed language version, each listing all reviewed alternates. */
function entriesFor(
  versions: LocaleVersions,
  changeFrequency: Freq,
  priority: number
): MetadataRoute.Sitemap {
  const live = (LOCALES as readonly Locale[]).filter((l) => {
    const v = versions[l];
    return v && (l === "en" || v.status === "reviewed");
  });
  const languages: Record<string, string> = {};
  for (const l of live) languages[HTML_LANG[l]] = absoluteUrl(versions[l]!.path);
  if (versions.en) languages["x-default"] = absoluteUrl(versions.en.path);
  return live.map((l) => ({
    url: absoluteUrl(versions[l]!.path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    ...(live.length > 1 ? { alternates: { languages } } : {}),
  }));
}

function dynamicEntries(
  section: string,
  items: ApiItem[] | null,
  fallbackSlugs: string[],
  changeFrequency: Freq,
  priority: number
): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();
  for (const item of items ?? []) {
    const obj = item?.experience || item?.car || item;
    const slug = obj?.slug?.toLowerCase();
    if (!slug) continue;
    const enSlug = (obj?.translations?.en?.slug || slug).toLowerCase();
    seen.add(enSlug);
    out.push(
      ...entriesFor(versionsFromTranslations(section, obj?.translations, enSlug), changeFrequency, priority)
    );
  }
  for (const slug of fallbackSlugs) {
    if (seen.has(slug)) continue;
    out.push(...entriesFor(versionsFromTranslations(section, undefined, slug), changeFrequency, priority));
  }
  return out;
}

const STATIC_META: Record<string, { freq: Freq; priority: number }> = {
  "/": { freq: "weekly", priority: 1.0 },
  "/chauffeur-hire": { freq: "weekly", priority: 0.9 },
  "/tours": { freq: "weekly", priority: 0.9 },
  "/airport-transfers-cape-town": { freq: "weekly", priority: 0.9 },
  "/best-wine-farms-in-cape-town": { freq: "monthly", priority: 0.8 },
  "/best-activities-to-do-in-cape-town": { freq: "monthly", priority: 0.8 },
  "/7-day-cape-town-itinerary": { freq: "monthly", priority: 0.7 },
  "/contact": { freq: "monthly", priority: 0.5 },
  "/cancellation-policy": { freq: "yearly", priority: 0.3 },
  "/privacy": { freq: "yearly", priority: 0.3 },
};

/**
 * One sitemap of every indexable URL in every language. Draft translations
 * are left out. Villas and hotels are hidden for now.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [vehicles, experiences] = await Promise.all([
    getItems("https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/", 300),
    getItems("https://web-production-1ab9.up.railway.app/api/experiences/all/", 3600),
  ]);

  const staticRoutes = (STATIC_PAGE_PATHS as readonly string[]).flatMap((path) =>
    entriesFor(staticVersions(path), STATIC_META[path].freq, STATIC_META[path].priority)
  );

  return [
    ...staticRoutes,
    ...dynamicEntries("/chauffeur-hire", vehicles, FALLBACK_VEHICLE_SLUGS, "monthly", 0.75),
    ...dynamicEntries("/tours", experiences, FALLBACK_TOUR_SLUGS, "monthly", 0.85),
  ];
}
