export type HighlightItem = {
  heading: string;
  body: string;
};

export type TourFAQItem = {
  question: string;
  answer: string;
};

export type TourPageContent = {
  trustBadges: string[];
  itineraryTitle: string;
  itinerarySubheading: string;
  highlightsTitle: string;
  highlights: HighlightItem[];
  midCtaTitle: string;
  midCtaBody: string;
  midCtaButtonLabel: string;
  ctaTitle: string;
  ctaBody: string;
  faqItems: TourFAQItem[];
};

const SHARED_HIGHLIGHTS_1: HighlightItem = {
  heading: "No Shared Vehicle. Ever.",
  body: "Your group books the entire vehicle. No strangers, no compromises, no waiting for 20 people to get back on board. It's your day — completely.",
};

const SHARED_HIGHLIGHTS_3: HighlightItem = {
  heading: "Your Schedule, Not Ours",
  body: "Spend 20 minutes at one stop or two hours — it's your call. We build the day around what matters to you, not a preset timetable designed for the lowest common denominator.",
};

const SHARED_HIGHLIGHTS_4: HighlightItem = {
  heading: "Everything Taken Care Of",
  body: "Hotel pickup, cold water in the car, toll fees, fuel, local guidance — it's all included. You focus on the experience. We handle everything else.",
};

const SHARED_FAQ_PRIVATE: TourFAQItem = {
  question: "Is this a private tour or a shared group tour?",
  answer:
    "100% private. You and your group have the entire vehicle to yourselves for the full day. We never combine bookings or add strangers to your tour.",
};

const SHARED_FAQ_TRANSPORT: TourFAQItem = {
  question: "Is transport included?",
  answer:
    "Yes — a professional chauffeur-driven vehicle is the foundation of the experience. Hotel pickup, drop-off, all driving, toll fees, and fuel are included in your booking.",
};

const SHARED_CTA_BODY =
  "Message us on WhatsApp to check availability, ask any questions, and lock in your preferred date. We respond within 30 minutes — usually much faster.";

const CAPE_PENINSULA: TourPageContent = {
  trustBadges: [
    "✔ 100% Private — your vehicle, your group, your pace",
    "✔ Flexible itinerary — you set the stops",
    "✔ Professional chauffeur & local guide included",
  ],
  itineraryTitle: "Every Stop, Yours to Explore",
  itinerarySubheading:
    "No group timetables. No strangers. No one rushing you back to the bus. This is the Cape Peninsula on your terms — linger at the penguin colony, take your time at the cliff edge, or ask your chauffeur to pull over for a photo. Every moment is yours.",
  highlightsTitle: "Why Guests Choose a Private Tour Over a Group Bus",
  highlights: [
    SHARED_HIGHLIGHTS_1,
    {
      heading: "A Chauffeur Who Knows the Peninsula",
      body: "Your driver has done this route dozens of times. They know where the light is best for photos, which viewpoints the buses skip, and when to suggest lingering a little longer. It's like having a local friend with a luxury car.",
    },
    SHARED_HIGHLIGHTS_3,
    SHARED_HIGHLIGHTS_4,
  ],
  midCtaTitle: "Ready to See the Cape Peninsula?",
  midCtaBody:
    "Most guests tell us the Peninsula is the highlight of their entire Cape Town trip. Don't leave it to chance with a shared tour bus — message us and we'll plan the day around you.",
  midCtaButtonLabel: "Plan My Cape Town Day →",
  ctaTitle: "Book Your Private Cape Peninsula Tour",
  ctaBody: SHARED_CTA_BODY,
  faqItems: [
    {
      question: "How long does the Cape Peninsula private tour take?",
      answer:
        "The full route typically runs 7–9 hours, depending on your pace and preferred stops. We build in flexibility by design — if you want to spend longer at Boulders Beach or take a detour, just say the word.",
    },
    SHARED_FAQ_PRIVATE,
    {
      question: "Can we customise the itinerary?",
      answer:
        "Absolutely. The suggested route is a starting point, not a rule. Want to skip a stop, add one, or adjust timing around a lunch reservation? Tell us when you book and we'll tailor the day accordingly.",
    },
    SHARED_FAQ_TRANSPORT,
    {
      question: "Is this tour suitable for families and children?",
      answer:
        "Very much so. The private format makes this especially good for families — no rushing, no crowds, and your chauffeur will adapt the pace to suit your group. Boulders Beach and Cape Point are particular hits with younger travellers.",
    },
  ],
};

const CAPE_TOWN_CITY: TourPageContent = {
  trustBadges: [
    "✔ 100% Private — your vehicle, your group, your pace",
    "✔ Flexible itinerary — you set the stops",
    "✔ Professional chauffeur & local guide included",
  ],
  itineraryTitle: "Every Stop, Yours to Explore",
  itinerarySubheading:
    "No group timetables. No strangers. No one rushing you back to the bus. Cape Town's most iconic landmarks — explored entirely on your terms, at your pace, with your dedicated chauffeur for the day.",
  highlightsTitle: "Why Guests Choose a Private Tour Over a Group Bus",
  highlights: [
    SHARED_HIGHLIGHTS_1,
    {
      heading: "A Chauffeur Who Knows the City",
      body: "Your driver has navigated Cape Town's streets, viewpoints, and hidden gems dozens of times. They know where the light is best for photos, which spots the buses skip, and when to suggest lingering a little longer. It's like having a local friend with a luxury car.",
    },
    SHARED_HIGHLIGHTS_3,
    SHARED_HIGHLIGHTS_4,
  ],
  midCtaTitle: "Ready to See Cape Town Properly?",
  midCtaBody:
    "Most visitors only scratch the surface of what Cape Town offers. A private chauffeur day gives you the full picture — without the crowds, the queues, or the shared bus. Message us and let's plan your day.",
  midCtaButtonLabel: "Plan My Cape Town Day →",
  ctaTitle: "Book Your Private City Tour",
  ctaBody: SHARED_CTA_BODY,
  faqItems: [
    {
      question: "How long does the City & Table Mountain tour take?",
      answer:
        "The full route typically runs 7–9 hours, depending on your pace and which stops you want to prioritise. Table Mountain at sunset is always worth saving time for.",
    },
    SHARED_FAQ_PRIVATE,
    {
      question: "Can we customise the itinerary?",
      answer:
        "Absolutely. Want to spend longer at the Waterfront, skip a stop, or add Bo-Kaap to the route? Tell us when you book and we'll tailor the day around you.",
    },
    SHARED_FAQ_TRANSPORT,
    {
      question: "Is this tour suitable for families and children?",
      answer:
        "Very much so. The private format means no rushing, no crowds, and the flexibility to adapt the day to suit younger travellers. The cable car and Camps Bay are particular favourites with families.",
    },
  ],
};

const WINELANDS: TourPageContent = {
  trustBadges: [
    "✔ 100% Private — your vehicle, your group, your pace",
    "✔ Flexible itinerary — you choose the estates",
    "✔ Professional chauffeur & local guide included",
  ],
  itineraryTitle: "Every Stop, Yours to Savour",
  itinerarySubheading:
    "No shared shuttle. No strangers. No being rushed back before you've finished your glass. This is the Stellenbosch Winelands at your pace — linger over the wine and chocolate pairing, wander the gardens at Babylonstoren, or simply sit on the terrace at Delaire Graff and take in the view. Every moment is yours.",
  highlightsTitle: "Why Guests Choose a Private Tour Over a Shared Shuttle",
  highlights: [
    SHARED_HIGHLIGHTS_1,
    {
      heading: "A Chauffeur Who Knows the Winelands",
      body: "Your driver has navigated the wine routes of Stellenbosch and Franschhoek dozens of times. They know which estates are worth the detour, the best time to arrive before the crowds, and when to suggest one more stop. It's like having a knowledgeable local friend behind the wheel.",
    },
    {
      heading: "Your Pace, Not a Shuttle Timetable",
      body: "Spend 45 minutes at one estate or three hours — it's entirely your call. Nobody is herding you back onto a bus. The day flows around your appetite, your conversation, and how good the wine turns out to be.",
    },
    SHARED_HIGHLIGHTS_4,
  ],
  midCtaTitle: "Ready to Experience the Winelands Privately?",
  midCtaBody:
    "The Stellenbosch Winelands deserve more than a shared shuttle and a hurried tasting. Message us and we'll plan a day in the vineyards that's entirely built around you.",
  midCtaButtonLabel: "Plan My Winelands Day →",
  ctaTitle: "Book Your Private Winelands Experience",
  ctaBody: SHARED_CTA_BODY,
  faqItems: [
    {
      question: "How long does the Winelands tour take?",
      answer:
        "The full day typically runs 7–9 hours from hotel pickup to drop-off. The pace is yours — if you want to linger at Babylonstoren or add a fourth estate, just say the word.",
    },
    {
      question: "Is this a private tour or a shared shuttle?",
      answer:
        "100% private. You and your group have the entire vehicle to yourselves. We never combine bookings or add other guests to your day.",
    },
    {
      question: "Can we choose which wine estates to visit?",
      answer:
        "Absolutely. The suggested route is a starting point. Want to swap an estate, add a cheese tasting, or visit a specific favourite? Tell us when you book and we'll build the day around you.",
    },
    {
      question: "Is transport included?",
      answer:
        "Yes — a professional chauffeur handles all driving so your group can taste freely. Hotel pickup, drop-off, all driving, toll fees, and fuel are included.",
    },
    {
      question: "Is this suitable for a romantic trip or anniversary?",
      answer:
        "It's one of our most popular experiences for couples. A private vehicle, beautiful estates, great wine, and no strangers — it makes for a genuinely special day.",
    },
  ],
};

const SUNSET_SAFARI: TourPageContent = {
  trustBadges: [
    "✔ 100% Private — your vehicle, your group, your pace",
    "✔ Transport & meals included",
    "✔ Professional chauffeur & local guide included",
  ],
  itineraryTitle: "Your Safari Day, From Door to Game Drive",
  itinerarySubheading:
    "No shared game vehicles with strangers. No rigid resort schedules. Your chauffeur collects you from your hotel, drives you through the dramatic Hex River Valley to Aquila, and you're back in Cape Town with the evening still ahead. Everything — transport, game drive, meals — is taken care of.",
  highlightsTitle: "Why Guests Choose This Over a Standard Safari Transfer",
  highlights: [
    {
      heading: "Private Transport, Both Ways",
      body: "No shared shuttle with strangers. Your group has a dedicated luxury vehicle and chauffeur for the full day — from hotel pickup through to the drive back as the Karoo sky turns dark.",
    },
    {
      heading: "A Chauffeur Who Plans Around You",
      body: "Your driver coordinates timing, knows the route, and handles every logistical detail so you arrive relaxed and ready. The two-hour drive through the Hex River Valley is part of the experience, not just a transfer.",
    },
    {
      heading: "Everything Included",
      body: "Transport, game drive, meals, and local guidance — it's all in. You focus on the experience. We handle the rest.",
    },
    {
      heading: "Back in Cape Town for the Evening",
      body: "The sunset timing means you finish the game drive with golden light on the Karoo, then head back to Cape Town in comfort. It's a full day out — without losing your evening.",
    },
  ],
  midCtaTitle: "Ready for a Safari Day from Cape Town?",
  midCtaBody:
    "Most visitors don't realise you can do a Big 5 safari and be back in Cape Town for dinner. Message us — we'll sort the transport, the timing, and everything in between.",
  midCtaButtonLabel: "Plan My Safari Day →",
  ctaTitle: "Book Your Private Safari Day Trip",
  ctaBody: SHARED_CTA_BODY,
  faqItems: [
    {
      question: "How far is Aquila from Cape Town?",
      answer:
        "Aquila Private Game Reserve is approximately 2 hours from Cape Town, through the scenic Hex River Valley. Your chauffeur handles the full drive both ways.",
    },
    {
      question: "What animals can we expect to see?",
      answer:
        "Aquila is home to the Big 5 — lion, elephant, rhino, buffalo, and leopard — as well as giraffe, zebra, wildebeest, and a wide variety of bird species. Sightings vary by day, but the reserve is well-stocked and the guides are experienced.",
    },
    {
      question: "Are meals and the game drive included?",
      answer:
        "Yes. The package includes welcome drinks and snacks on arrival, the sunset game drive, and meals at the reserve. Your private transport to and from Cape Town is also included.",
    },
    {
      question: "Is this suitable for children?",
      answer:
        "Yes — families with children find this one of the most memorable experiences of their Cape Town trip. The open game vehicle, the animal sightings, and the Karoo landscape make a big impression on younger travellers.",
    },
    {
      question: "Can we customise the timing or add extra activities?",
      answer:
        "The afternoon and sunset timing is set by the reserve's game drive schedule, but we can adjust your pickup time and return journey to suit your hotel plans. Message us and we'll work it out.",
    },
  ],
};

const DEFAULT_CONTENT: TourPageContent = CAPE_PENINSULA;

const TOUR_CONTENT: Record<string, TourPageContent> = {
  "cape-peninsula-tour": CAPE_PENINSULA,
  "cape-town-city-tour": CAPE_TOWN_CITY,
  "winelands-chauffeur-drive": WINELANDS,
  "sunset-safari-experience": SUNSET_SAFARI,
};

export function getTourContent(slug?: string): TourPageContent {
  if (!slug) return DEFAULT_CONTENT;
  return TOUR_CONTENT[slug.toLowerCase()] ?? DEFAULT_CONTENT;
}
