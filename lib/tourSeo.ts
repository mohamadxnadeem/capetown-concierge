// SEO copy for the four private tours, keyed by the LIVE slug.
// The CMS (Django admin) still holds the old names. Code overrides win for
// headings and metadata so Google sees one consistent name per tour.
// Do not change the slugs: they are live URLs.

export type TourSeo = {
  slug: string;
  /** Page <title> */
  title: string;
  /** Meta description, under about 155 characters */
  description: string;
  /** Visible H1 on the tour page */
  h1: string;
  /** Short name used on hub cards and related-tour links */
  cardName: string;
  /** Alt text for the tour cards and gallery */
  imageAlt: string;
  /** Matching guide page, shown on the tour page */
  guideHref: string;
  guideLabel: string;
  /** Hub comparison block. Facts come from the CMS itinerary stops. */
  duration: string;
  highlights: string;
  suits: string;
};

export const TOUR_SEO: Record<string, TourSeo> = {
  "cape-peninsula-tour": {
    slug: "cape-peninsula-tour",
    title: "Cape Point Private Tour from Cape Town | Cape Peninsula Full Day",
    description:
      "A private full day to Cape Point, Boulders Beach penguins and Chapman's Peak with your own chauffeur. No shared groups. Book on WhatsApp.",
    h1: "Cape Point Private Tour from Cape Town (Cape Peninsula Full Day)",
    cardName: "Cape Point and Cape Peninsula Private Tour",
    imageAlt: "Private Cape Point and Cape Peninsula tour with a chauffeur from Cape Town",
    guideHref: "/best-activities-to-do-in-cape-town",
    guideLabel: "Best activities to do in Cape Town",
    duration: "About 8 hours",
    highlights:
      "Muizenberg, Boulders Beach penguins, Cape Point Lighthouse, the Cape of Good Hope, lunch at Dixie's in Simon's Town and Chapman's Peak.",
    suits:
      "First-time visitors, families and anyone who wants the classic Cape Town coastline in one day.",
  },
  "winelands-chauffeur-drive": {
    slug: "winelands-chauffeur-drive",
    title: "Private Winelands Tour Cape Town | Stellenbosch Wine Estates",
    description:
      "A private chauffeur-driven day through the Cape Winelands, visiting Waterford, Babylonstoren and Delaire Graff. No shuttle, no timetable.",
    h1: "Private Winelands Tour from Cape Town (Stellenbosch Wine Estates)",
    cardName: "Private Winelands Tour",
    imageAlt: "Private Cape Winelands tour with a chauffeur through Stellenbosch wine estates",
    guideHref: "/best-wine-farms-in-cape-town",
    guideLabel: "Best wine farms in Cape Town",
    duration: "About 8 hours",
    highlights:
      "Waterford Estate, Babylonstoren and Delaire Graff Estate, with a chauffeur so everyone can taste freely.",
    suits:
      "Couples, wine lovers and groups celebrating a special occasion.",
  },
  "cape-town-city-tour": {
    slug: "cape-town-city-tour",
    title: "Private Cape Town City and Table Mountain Tour | Chauffeur Driven",
    description:
      "See Table Mountain, Bo-Kaap, Signal Hill, Camps Bay and the V&A Waterfront on a private day with your own chauffeur. Book on WhatsApp.",
    h1: "Private Cape Town City and Table Mountain Tour",
    cardName: "Private Cape Town City and Table Mountain Tour",
    imageAlt: "Private Cape Town city and Table Mountain tour with a chauffeur",
    guideHref: "/7-day-cape-town-itinerary",
    guideLabel: "7 day Cape Town itinerary",
    duration: "About 8 hours",
    highlights:
      "Bo-Kaap, Signal Hill, Camps Bay, the V&A Waterfront and sunset at Table Mountain, with an optional helicopter flight.",
    suits:
      "A first day in the city, short stays and travellers who want the main landmarks without queues or a shared bus.",
  },
  "big-5-safari-from-cape-town": {
    slug: "big-5-safari-from-cape-town",
    title: "Best Safari Day Trip from Cape Town | Private Big 5 Tour",
    description:
      "Private Big 5 safari day tour from Cape Town to Aquila. Hotel pickup, golden-hour game drive, back the same night. Book on WhatsApp.",
    h1: "Private Big 5 Safari Day Trip from Cape Town (Aquila)",
    cardName: "Private Big 5 Safari Day Trip from Cape Town",
    imageAlt: "Private Big 5 safari day trip from Cape Town to Aquila game reserve",
    guideHref: "/best-activities-to-do-in-cape-town",
    guideLabel: "Best activities to do in Cape Town",
    duration: "About 8 hours, pickup around 12h30",
    highlights:
      "A two-hour private drive to Aquila, welcome drinks, a Big 5 game drive at golden hour and sundowners.",
    suits:
      "Wildlife lovers and families who want a safari without a multi-day trip.",
  },
};

// Order shown on the hub page.
export const TOUR_ORDER = [
  "cape-peninsula-tour",
  "winelands-chauffeur-drive",
  "cape-town-city-tour",
  "big-5-safari-from-cape-town",
];

export function getTourSeo(slug?: string): TourSeo | undefined {
  return slug ? TOUR_SEO[slug.toLowerCase()] : undefined;
}

export function slugFromHref(href: string): string {
  return href.replace(/^\/tours\//, "").toLowerCase();
}

// Spelling fixes for CMS stop copy. Remove once the CMS text is corrected.
const TEXT_FIXES: Array<[RegExp, string]> = [
  [/Cape of Goodhope/gi, "Cape of Good Hope"],
  [/Light House/g, "Lighthouse"],
  [/Chapmans Peak/g, "Chapman's Peak"],
  [/Chapman’s Peak/g, "Chapman's Peak"],
  [/\bDixies\b/g, "Dixie's"],
  [/\bDixie’s\b/g, "Dixie's"],
];

export function fixTourText(text?: string): string | undefined {
  if (!text) return text;
  return TEXT_FIXES.reduce((acc, [re, to]) => acc.replace(re, to), text);
}
