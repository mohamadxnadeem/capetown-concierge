import type { TFunction } from "./i18n/messages";
// Copy for the /tours hub page. Facts match the CMS tour data and the
// individual tour pages. Prices are per vehicle, never per person.

export type HubFaq = { question: string; answer: string };

export const HUB_INTRO = (tt: TFunction) => ([
  tt("tourHub.looking-for-the-best-things"),
  tt("tourHub.every-tour-is-fully-private"),
]);

export const HUB_FAQS = (tt: TFunction): HubFaq[] => ([
  {
    question: tt("tourHub.which-is-the-best-private"),
    answer:
      tt("tourHub.it-depends-on-what-you"),
  },
  {
    question: tt("tourHub.how-much-do-private-tours"),
    answer:
      tt("tourHub.our-private-tours-are-priced"),
  },
  {
    question: tt("tourHub.how-many-days-do-i"),
    answer:
      tt("tourHub.each-private-tour-is-a"),
  },
  {
    question: tt("tourHub.are-these-tours-private-or"),
    answer:
      tt("tourHub.all-of-our-tours-are"),
  },
  {
    question: tt("tourHub.is-a-big-5-safari"),
    answer:
      tt("tourHub.yes-the-big-5-are"),
  },
  {
    question: tt("tourHub.can-i-combine-tours-or"),
    answer:
      tt("tourHub.yes-every-tour-can-be"),
  },
  {
    question: tt("tourHub.how-do-i-book-a"),
    answer:
      tt("tourHub.the-fastest-way-is-whatsapp"),
  },
]);

export const HUB_LINKS = (tt: TFunction) => ([
  { href: "/best-activities-to-do-in-cape-town", label: tt("tourHub.best-activities-to-do-in") },
  { href: "/7-day-cape-town-itinerary", label: tt("tourHub.7-day-cape-town-itinerary") },
  { href: "/best-wine-farms-in-cape-town", label: tt("tourHub.best-wine-farms-in-cape") },
  { href: "/chauffeur-hire", label: tt("tourHub.private-chauffeur-hire-in-cape") },
  { href: "/airport-transfers-cape-town", label: tt("tourHub.cape-town-airport-transfers") },
]);
