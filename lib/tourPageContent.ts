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
  faqTitle: string;
  inclusionsTitle: string;
  vehiclesTitle: string;
};

const SHARED_CTA_BODY =
  "Send us a WhatsApp with your travel dates and group size. We'll confirm availability and send you a price within 30 minutes. No deposit is required to hold a date while you decide. Just message us and we'll take it from there.";

const BADGES = [
  "✔ 100% Private: your vehicle, your group, your pace",
  "✔ Flexible itinerary: you set the stops",
  "✔ Professional chauffeur & local guide included",
];

const NO_SHARED: HighlightItem = {
  heading: "No Shared Vehicle. Ever.",
  body: "Your group books the entire vehicle. No strangers, no compromises, no waiting for 20 people to get back on board. It's your day, completely.",
};

const EVERYTHING: HighlightItem = {
  heading: "Everything Taken Care Of",
  body: "Hotel pickup, cold water in the car, toll fees, fuel and local guidance are all included. You focus on the experience. We handle everything else.",
};

const CAPE_PENINSULA: TourPageContent = {
  trustBadges: BADGES,
  itineraryTitle: "Your Cape Point and Cape Peninsula Route, Stop by Stop",
  itinerarySubheading:
    "No group timetables and no one rushing you back to the bus. Linger with the penguins at Boulders Beach, take your time at Cape Point, or ask your chauffeur to pull over for a photo on the coast road.",
  highlightsTitle: "Why Take the Cape Peninsula Privately",
  highlights: [
    NO_SHARED,
    {
      heading: "A Chauffeur Who Knows the Peninsula",
      body: "Your driver knows this route well. They know where the light is best for photos, which viewpoints the big buses skip, and when to suggest lingering a little longer.",
    },
    {
      heading: "Your Schedule, Not Ours",
      body: "Spend 20 minutes at one stop or two hours. We build the day around what matters to you, not a preset timetable.",
    },
    EVERYTHING,
  ],
  midCtaTitle: "Ready to See Cape Point Privately?",
  midCtaBody:
    "The Cape Peninsula is one of the most popular days out from Cape Town. Message us and we will plan the day around you instead of a shared tour bus.",
  midCtaButtonLabel: "Check Availability: We Respond in 30 Minutes",
  ctaTitle: "Ready to book? Here's how it works",
  ctaBody: SHARED_CTA_BODY,
  faqTitle: "Cape Point Private Tour: Your Questions, Answered",
  inclusionsTitle: "What's included in your Cape Peninsula tour",
  vehiclesTitle: "Your vehicle for the Cape Peninsula",
  faqItems: [
    {
      question: "How long does the Cape Point private tour take?",
      answer:
        "Plan for about 8 hours from hotel pickup to drop-off. We build in flexibility by design, so if you want longer at Boulders Beach or Cape Point, just say so.",
    },
    {
      question: "What do we see on the Cape Peninsula tour?",
      answer:
        "The suggested route includes Muizenberg Beach, Boulders Beach and its penguin colony, Cape Point Lighthouse, the Cape of Good Hope, lunch at Dixie's in Simon's Town and the scenic Chapman's Peak drive on the way back.",
    },
    {
      question: "Will we see the penguins at Boulders Beach?",
      answer:
        "Boulders Beach is home to a colony of African penguins and is a planned stop on the tour. Your chauffeur will give you as much time there as you want.",
    },
    {
      question: "Where do we stop for lunch on the Cape Peninsula tour?",
      answer:
        "Lunch at Dixie's in Simon's Town is part of the suggested route. If you prefer somewhere else or have dietary needs, tell us when you book and we will plan around it.",
    },
    {
      question: "Can we change the Cape Peninsula route?",
      answer:
        "Yes. The suggested route is a starting point. Want to skip a stop, add one or fit around a lunch reservation? Tell us when you book and we will tailor the day.",
    },
    {
      question: "Is the Cape Peninsula tour suitable for families and children?",
      answer:
        "Very much so. The private format means no rushing and no crowds, and your chauffeur will adapt the pace to your group. Boulders Beach and Cape Point are particular hits with younger travellers.",
    },
  ],
};

const CAPE_TOWN_CITY: TourPageContent = {
  trustBadges: BADGES,
  itineraryTitle: "Your Cape Town City and Table Mountain Day",
  itinerarySubheading:
    "Cape Town's most iconic landmarks, explored at your pace with your own chauffeur. Spend longer where you love it and skip what you do not.",
  highlightsTitle: "Why See Cape Town's Landmarks Privately",
  highlights: [
    NO_SHARED,
    {
      heading: "A Chauffeur Who Knows the City",
      body: "Your driver knows Cape Town's streets, viewpoints and quieter corners. They know where the light is best for photos and when to suggest lingering a little longer.",
    },
    {
      heading: "Table Mountain Timed Around You",
      body: "Table Mountain depends on the weather on the day, so we keep the order of your stops flexible and plan the mountain for the best conditions.",
    },
    EVERYTHING,
  ],
  midCtaTitle: "Ready to See Cape Town Properly?",
  midCtaBody:
    "A private chauffeur day gives you the full picture of the city without the queues or a shared bus. Message us and let's plan your day.",
  midCtaButtonLabel: "Check Availability: We Respond in 30 Minutes",
  ctaTitle: "Ready to book? Here's how it works",
  ctaBody: SHARED_CTA_BODY,
  faqTitle: "Cape Town City Tour: Your Questions, Answered",
  inclusionsTitle: "What's included in your city and Table Mountain tour",
  vehiclesTitle: "Your vehicle for the city tour",
  faqItems: [
    {
      question: "What does the private Cape Town city tour include?",
      answer:
        "The suggested day covers Bo-Kaap, Signal Hill, Camps Bay, the V&A Waterfront and sunset at Table Mountain. A harbour cruise and a scenic helicopter flight can be added.",
    },
    {
      question: "How long is the city and Table Mountain tour?",
      answer:
        "Plan for about 8 hours from hotel pickup to drop-off. Saving Table Mountain for the late afternoon means you can finish with the city lights coming on.",
    },
    {
      question: "What if the weather is bad on Table Mountain?",
      answer:
        "Table Mountain is weather dependent. Because the day is private, your chauffeur can reorder the stops and move the mountain to the clearest part of the day.",
    },
    {
      question: "Can we add the helicopter flight or a harbour cruise?",
      answer:
        "Yes. A scenic helicopter flight and a harbour cruise from the V&A Waterfront are listed as options on the itinerary. Message us on WhatsApp and we will help you plan them into the day.",
    },
    {
      question: "Can we customise the city tour?",
      answer:
        "Absolutely. Want to spend longer at the Waterfront, skip a stop or add somewhere new? Tell us when you book and we will tailor the day around you.",
    },
    {
      question: "Is the city tour suitable for families and children?",
      answer:
        "Very much so. The private format means no rushing and the flexibility to adapt the day for younger travellers. Camps Bay and the Waterfront are easy favourites with families.",
    },
  ],
};

const WINELANDS: TourPageContent = {
  trustBadges: [
    "✔ 100% Private: your vehicle, your group, your pace",
    "✔ Flexible itinerary: you choose the estates",
    "✔ Professional chauffeur & local guide included",
  ],
  itineraryTitle: "Your Winelands Estates, Stop by Stop",
  itinerarySubheading:
    "No shuttle timetable and no one rushing you between estates. Linger over a tasting, explore the gardens at Babylonstoren, or ask your chauffeur to stop at a viewpoint along the way.",
  highlightsTitle: "Why Choose a Private Winelands Tour Over a Shared Shuttle",
  highlights: [
    NO_SHARED,
    {
      heading: "A Chauffeur Who Knows the Winelands",
      body: "Your driver knows the wine routes well. They know which estates are worth the detour, the best time to arrive before the crowds, and when to suggest one more stop.",
    },
    {
      heading: "Your Pace, Not a Shuttle Timetable",
      body: "Spend 45 minutes at one estate or three hours. Nobody is herding you back onto a bus. The day flows around your appetite, your conversation and how good the wine turns out to be.",
    },
    EVERYTHING,
  ],
  midCtaTitle: "Ready to Experience the Cape Winelands?",
  midCtaBody:
    "Don't leave your wine day to a shared shuttle. Message us and we'll plan it around you, your group and the estates you most want to see.",
  midCtaButtonLabel: "Check Availability: We Respond in 30 Minutes",
  ctaTitle: "Ready to book? Here's how it works",
  ctaBody: SHARED_CTA_BODY,
  faqTitle: "Private Winelands Tour: Your Questions, Answered",
  inclusionsTitle: "What's included in your Winelands tour",
  vehiclesTitle: "Your vehicle for the Winelands",
  faqItems: [
    {
      question: "Which wine estates are on the private Winelands tour?",
      answer:
        "The suggested route visits Waterford Estate, Babylonstoren and Delaire Graff Estate in the Stellenbosch Winelands, then returns to Cape Town in the early evening.",
    },
    {
      question: "How long is the Winelands tour?",
      answer:
        "Plan for about 8 hours from hotel pickup to drop-off. If you want to linger over lunch or a tasting, just say so.",
    },
    {
      question: "Can we visit Franschhoek or choose different estates?",
      answer:
        "Yes. The suggested route is a starting point, not a rule. Franschhoek is not on the standard route, but you can ask for different estates when you book and we will build the day around your preferences.",
    },
    {
      question: "Can we taste wine freely?",
      answer:
        "Yes. A professional chauffeur drives all day, so your group can enjoy the tastings without worrying about driving.",
    },
    {
      question: "Is the Winelands tour good for a romantic trip or anniversary?",
      answer:
        "It is a popular day for couples and special occasions. A private vehicle, vineyard views and no strangers make it feel special. Let us know the occasion when you book.",
    },
  ],
};

const SAFARI: TourPageContent = {
  trustBadges: [
    "✔ 100% Private: your vehicle, your group, your pace",
    "✔ Transport & meals included",
    "✔ Professional chauffeur & local guide included",
  ],
  itineraryTitle: "Your Big 5 Safari Day, from Hotel Pickup to Game Drive",
  itinerarySubheading:
    "No shared game vehicles with strangers and no rigid schedule. Your chauffeur collects you from your hotel, drives you to Aquila and brings you back to Cape Town the same night.",
  highlightsTitle: "Why Choose a Private Safari Day Trip from Cape Town",
  highlights: [
    {
      heading: "Private Transport, Both Ways",
      body: "No shared shuttle with strangers. Your group has a dedicated luxury vehicle and chauffeur for the full day, from hotel pickup to the drive back after dark.",
    },
    {
      heading: "A Chauffeur Who Plans Around You",
      body: "Your driver coordinates timing, knows the route and handles every logistical detail so you arrive relaxed and ready for the game drive.",
    },
    {
      heading: "Everything Included",
      body: "Transport, game drive, meals and local guidance are all in. You focus on the experience. We handle the rest.",
    },
    {
      heading: "A Safari Without a Multi-Day Trip",
      body: "The Big 5 are not in Cape Town itself. Aquila is about two hours away, so you can see them on a single private day and be back at your hotel the same night.",
    },
  ],
  midCtaTitle: "Ready for a Big 5 Safari Day from Cape Town?",
  midCtaBody:
    "You can do a Big 5 safari and be back in Cape Town the same night. Message us and we'll sort the transport, the timing and everything in between.",
  midCtaButtonLabel: "Check Availability: We Respond in 30 Minutes",
  ctaTitle: "Ready to book? Here's how it works",
  ctaBody: SHARED_CTA_BODY,
  faqTitle: "Big 5 Safari Day Trip: Your Questions, Answered",
  inclusionsTitle: "What's included in your safari day trip",
  vehiclesTitle: "Your vehicle for the safari day trip",
  faqItems: [
    {
      question: "How far is Aquila from Cape Town?",
      answer:
        "Aquila Private Game Reserve is about 2 hours from Cape Town. Your chauffeur handles the full drive both ways.",
    },
    {
      question: "What time do we leave and when are we back?",
      answer:
        "On the suggested itinerary your chauffeur collects you from your hotel at around 12h30, the game drive starts at 16h00 and you are back at your hotel at around 21h00. Message us if you need a different pickup time.",
    },
    {
      question: "Which animals can we see on the Big 5 safari?",
      answer:
        "Aquila's Big 5 are lion, elephant, rhino, buffalo and leopard. Sightings vary by day, as with any wildlife experience.",
    },
    {
      question: "Are meals and the game drive included?",
      answer:
        "Yes. The package includes private transport to and from Cape Town, welcome drinks and snacks on arrival, the game drive and meals at the reserve.",
    },
    {
      question: "Is the safari suitable for children?",
      answer:
        "Families often tell us it is one of the most memorable days of their trip. Tell us the ages of your children when you book and we will confirm the details with the reserve.",
    },
    {
      question: "Can we change the timing or add extra activities?",
      answer:
        "The game drive time is set by the reserve, but we can adjust your pickup time and return journey to suit your hotel plans. Message us and we'll work it out.",
    },
  ],
};

const GENERIC: TourPageContent = {
  trustBadges: BADGES,
  itineraryTitle: "Your Private Tour, Stop by Stop",
  itinerarySubheading:
    "No group timetables and no strangers. Every stop is yours to explore at your own pace with your dedicated chauffeur.",
  highlightsTitle: "Why Choose a Private Tour",
  highlights: [
    NO_SHARED,
    {
      heading: "A Chauffeur Who Knows Cape Town",
      body: "Your driver knows the route well and will suggest the best moments to linger.",
    },
    {
      heading: "Your Schedule, Not Ours",
      body: "We build the day around what matters to you, not a preset timetable.",
    },
    EVERYTHING,
  ],
  midCtaTitle: "Ready to plan your private tour?",
  midCtaBody:
    "Message us and we'll plan the day around you instead of a shared tour bus.",
  midCtaButtonLabel: "Check Availability: We Respond in 30 Minutes",
  ctaTitle: "Ready to book? Here's how it works",
  ctaBody: SHARED_CTA_BODY,
  faqTitle: "Your Questions, Answered",
  inclusionsTitle: "What's included in your tour",
  vehiclesTitle: "Travel in Comfort. Travel in Style.",
  faqItems: [
    {
      question: "Is this a private tour or a shared group tour?",
      answer:
        "It is completely private. You and your group have the vehicle to yourselves for the full day.",
    },
    {
      question: "Can we customise the itinerary?",
      answer:
        "Yes. Tell us when you book and we will tailor the day around you.",
    },
  ],
};

const TOUR_CONTENT: Record<string, TourPageContent> = {
  "cape-peninsula-tour": CAPE_PENINSULA,
  "cape-town-city-tour": CAPE_TOWN_CITY,
  "winelands-chauffeur-drive": WINELANDS,
  "big-5-safari-from-cape-town": SAFARI,
};

export function getTourContent(slug?: string): TourPageContent {
  if (!slug) return GENERIC;
  return TOUR_CONTENT[slug.toLowerCase()] ?? GENERIC;
}
