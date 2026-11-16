// Copy for the /tours hub page. Facts match the CMS tour data and the
// individual tour pages. Prices are per vehicle, never per person.

export type HubFaq = { question: string; answer: string };

export const HUB_INTRO = [
  "Looking for the best things to do in Cape Town with a private driver? Our private tours turn the four classic days out into your own: Cape Point and the Cape Peninsula, the Cape Winelands, a Cape Town city and Table Mountain day, and a Big 5 safari at Aquila.",
  "Every tour is fully private. You travel in your own luxury vehicle with a professional chauffeur, with hotel pickup, no shared groups and no fixed timetable. Pricing is per vehicle, not per person, so the whole group shares one rate.",
];

export const HUB_FAQS: HubFaq[] = [
  {
    question: "Which is the best private tour in Cape Town?",
    answer:
      "It depends on what you want to see. The Cape Point and Cape Peninsula tour is the classic choice for a first visit, the Winelands tour suits wine lovers and couples, the city and Table Mountain tour covers the main landmarks, and the Big 5 safari is the one for wildlife. You can compare all four on this page.",
  },
  {
    question: "How much do private tours in Cape Town cost?",
    answer:
      "Our private tours are priced per vehicle, not per person, so your whole group travels for one rate. The price depends on the tour and the vehicle you choose. Send us a WhatsApp with your dates and group size and we will confirm exact pricing within 30 minutes.",
  },
  {
    question: "How many days do I need for private tours in Cape Town?",
    answer:
      "Each private tour is a full day of about 8 hours, so four days covers all four tours. If you have less time, the Cape Point and Cape Peninsula tour and the city and Table Mountain tour are the usual first choices. Our 7 day Cape Town itinerary shows how to fit them into a week.",
  },
  {
    question: "Are these tours private or shared?",
    answer:
      "All of our tours are completely private. You travel only with your own group, with no shared passengers, and your itinerary and pace are your own.",
  },
  {
    question: "Is a Big 5 safari possible as a day trip from Cape Town?",
    answer:
      "Yes. The Big 5 are not in Cape Town itself, but Aquila Private Game Reserve is about 2 hours away. On the suggested itinerary your chauffeur collects you from your hotel at around 12h30, the game drive starts at 16h00 and you are back at your hotel at around 21h00.",
  },
  {
    question: "Can I combine tours or change the itinerary?",
    answer:
      "Yes. Every tour can be tailored around your interests, timing and preferred stops. If you book three private tours together, ask us about a group rate.",
  },
  {
    question: "How do I book a private tour in Cape Town?",
    answer:
      "The fastest way is WhatsApp. Share your dates, group size and the tour you like, and we will confirm availability and a quote, usually within 30 minutes.",
  },
];

export const HUB_LINKS = [
  { href: "/best-activities-to-do-in-cape-town", label: "Best activities to do in Cape Town: the full guide" },
  { href: "/7-day-cape-town-itinerary", label: "7 day Cape Town itinerary for first-time visitors" },
  { href: "/best-wine-farms-in-cape-town", label: "Best wine farms in Cape Town and the Winelands" },
  { href: "/chauffeur-hire", label: "Private chauffeur hire in Cape Town by the day" },
  { href: "/airport-transfers-cape-town", label: "Cape Town airport transfers" },
];
