/**
 * Search-led copy for the live tour pages, keyed by the live slug.
 * One target phrase per page, so the tours do not compete with each other.
 */
export type TourSeo = {
  /** Meta title, 60 characters or under, target phrase first. */
  title: string;
  /** Meta description, 155 characters or under, with a WhatsApp call to action. */
  description: string;
  /** Page H1. */
  h1: string;
  /** First paragraph under the H1. */
  intro: string;
};

export const TOUR_META: Record<string, TourSeo> = {
  "cape-peninsula-tour": {
    title: "Private Cape Peninsula Tour from Cape Town",
    description:
      "Private Cape Peninsula tour from Cape Town: Cape Point, Boulders Beach penguins and Chapman's Peak with your own chauffeur. Enquire on WhatsApp.",
    h1: "Private Cape Peninsula Tour from Cape Town",
    intro:
      "A private Cape Peninsula tour from Cape Town: two oceans, wild penguins and the most dramatic coastal drive in Africa, all in one fully private day with your own chauffeur.",
  },
  "winelands-chauffeur-drive": {
    title: "Private Winelands Tour | Stellenbosch & Franschhoek",
    description:
      "Private Winelands tour through Stellenbosch and Franschhoek with your own chauffeur. No shuttles, no timetable. Enquire on WhatsApp for a quote.",
    h1: "Private Winelands Tour: Stellenbosch and Franschhoek",
    intro:
      "A private Winelands tour through Stellenbosch and Franschhoek, with rolling vineyards, Cape Dutch estates and world-class tastings. Your chauffeur does the driving, with no shared shuttle and no set timetable.",
  },
  "cape-town-city-tour": {
    title: "Private Table Mountain & Cape Town City Tour",
    description:
      "Private Table Mountain and Cape Town city tour with your own chauffeur: Bo-Kaap, Camps Bay and the Waterfront at your pace. Enquire on WhatsApp.",
    h1: "Private Table Mountain and Cape Town City Tour",
    intro:
      "A private Table Mountain and Cape Town city tour: Table Mountain, the Bo-Kaap, Camps Bay and the Waterfront, explored at your pace with a dedicated chauffeur for the day.",
  },
  "big-5-safari-from-cape-town": {
    title: "Big 5 Safari from Cape Town | Private Day Trip",
    description:
      "Big 5 safari from Cape Town: a private day trip to Aquila with hotel pickup, a golden-hour game drive and your own chauffeur. Enquire on WhatsApp.",
    h1: "Big 5 Safari from Cape Town: Private Day Trip to Aquila",
    intro:
      "Take a Big 5 safari from Cape Town, done privately. There are no Big 5 in Cape Town itself. The closest is Aquila, 2 hours away, and we take you there in a luxury vehicle with hotel pickup. Expect lion, elephant, rhino, buffalo and leopard on a golden-hour game drive, in a malaria-free reserve.",
  },
};
