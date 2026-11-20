import { enT } from "./i18n/messages";
import type { TFunction } from "./i18n/messages";
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
  (tt: TFunction) => (tt("tourPageContent.send-us-a-whatsapp-with"));

const BADGES = (tt: TFunction) => ([
  tt("tourPageContent.100-private-your-vehicle-your"),
  tt("tourPageContent.flexible-itinerary-you-set-the"),
  tt("tourPageContent.professional-chauffeur-local-guide-included"),
]);

const NO_SHARED = (tt: TFunction): HighlightItem => ({
  heading: tt("tourPageContent.no-shared-vehicle-ever"),
  body: tt("tourPageContent.your-group-books-the-entire"),
});

const EVERYTHING = (tt: TFunction): HighlightItem => ({
  heading: tt("tourPageContent.everything-taken-care-of"),
  body: tt("tourPageContent.hotel-pickup-cold-water-in"),
});

const CAPE_PENINSULA = (tt: TFunction): TourPageContent => ({
  trustBadges: BADGES(tt),
  itineraryTitle: tt("tourPageContent.your-cape-point-and-cape"),
  itinerarySubheading:
    tt("tourPageContent.no-group-timetables-and-no"),
  highlightsTitle: tt("tourPageContent.why-take-the-cape-peninsula"),
  highlights: [
    NO_SHARED(tt),
    {
      heading: tt("tourPageContent.a-chauffeur-who-knows-the"),
      body: tt("tourPageContent.your-driver-knows-this-route"),
    },
    {
      heading: tt("tourPageContent.your-schedule-not-ours"),
      body: tt("tourPageContent.spend-20-minutes-at-one"),
    },
    EVERYTHING(tt),
  ],
  midCtaTitle: tt("tourPageContent.ready-to-see-cape-point"),
  midCtaBody:
    tt("tourPageContent.the-cape-peninsula-is-one"),
  midCtaButtonLabel: tt("tourPageContent.check-availability-we-respond-in"),
  ctaTitle: tt("tourPageContent.ready-to-book-here-s"),
  ctaBody: SHARED_CTA_BODY(tt),
  faqTitle: tt("tourPageContent.cape-point-private-tour-your"),
  inclusionsTitle: tt("tourPageContent.what-s-included-in-your"),
  vehiclesTitle: tt("tourPageContent.your-vehicle-for-the-cape"),
  faqItems: [
    {
      question: tt("tourPageContent.how-long-does-the-cape"),
      answer:
        tt("tourPageContent.plan-for-about-8-hours"),
    },
    {
      question: tt("tourPageContent.what-do-we-see-on"),
      answer:
        tt("tourPageContent.the-suggested-route-includes-muizenberg"),
    },
    {
      question: tt("tourPageContent.will-we-see-the-penguins"),
      answer:
        tt("tourPageContent.boulders-beach-is-home-to"),
    },
    {
      question: tt("tourPageContent.where-do-we-stop-for"),
      answer:
        tt("tourPageContent.lunch-at-dixie-s-in"),
    },
    {
      question: tt("tourPageContent.can-we-change-the-cape"),
      answer:
        tt("tourPageContent.yes-the-suggested-route-is"),
    },
    {
      question: tt("tourPageContent.is-the-cape-peninsula-tour"),
      answer:
        tt("tourPageContent.very-much-so-the-private"),
    },
  ],
});

const CAPE_TOWN_CITY = (tt: TFunction): TourPageContent => ({
  trustBadges: BADGES(tt),
  itineraryTitle: tt("tourPageContent.your-cape-town-city-and"),
  itinerarySubheading:
    tt("tourPageContent.cape-town-s-most-iconic"),
  highlightsTitle: tt("tourPageContent.why-see-cape-town-s"),
  highlights: [
    NO_SHARED(tt),
    {
      heading: tt("tourPageContent.a-chauffeur-who-knows-the-2"),
      body: tt("tourPageContent.your-driver-knows-cape-town"),
    },
    {
      heading: tt("tourPageContent.table-mountain-timed-around-you"),
      body: tt("tourPageContent.table-mountain-depends-on-the"),
    },
    EVERYTHING(tt),
  ],
  midCtaTitle: tt("tourPageContent.ready-to-see-cape-town"),
  midCtaBody:
    tt("tourPageContent.a-private-chauffeur-day-gives"),
  midCtaButtonLabel: tt("tourPageContent.check-availability-we-respond-in"),
  ctaTitle: tt("tourPageContent.ready-to-book-here-s"),
  ctaBody: SHARED_CTA_BODY(tt),
  faqTitle: tt("tourPageContent.cape-town-city-tour-your"),
  inclusionsTitle: tt("tourPageContent.what-s-included-in-your-2"),
  vehiclesTitle: tt("tourPageContent.your-vehicle-for-the-city"),
  faqItems: [
    {
      question: tt("tourPageContent.what-does-the-private-cape"),
      answer:
        tt("tourPageContent.the-suggested-day-covers-bo"),
    },
    {
      question: tt("tourPageContent.how-long-is-the-city"),
      answer:
        tt("tourPageContent.plan-for-about-8-hours-2"),
    },
    {
      question: tt("tourPageContent.what-if-the-weather-is"),
      answer:
        tt("tourPageContent.table-mountain-is-weather-dependent"),
    },
    {
      question: tt("tourPageContent.can-we-add-the-helicopter"),
      answer:
        tt("tourPageContent.yes-a-scenic-helicopter-flight"),
    },
    {
      question: tt("tourPageContent.can-we-customise-the-city"),
      answer:
        tt("tourPageContent.absolutely-want-to-spend-longer"),
    },
    {
      question: tt("tourPageContent.is-the-city-tour-suitable"),
      answer:
        tt("tourPageContent.very-much-so-the-private-2"),
    },
  ],
});

const WINELANDS = (tt: TFunction): TourPageContent => ({
  trustBadges: [
    tt("tourPageContent.100-private-your-vehicle-your"),
    tt("tourPageContent.flexible-itinerary-you-choose-the"),
    tt("tourPageContent.professional-chauffeur-local-guide-included"),
  ],
  itineraryTitle: tt("tourPageContent.your-winelands-estates-stop-by"),
  itinerarySubheading:
    tt("tourPageContent.no-shuttle-timetable-and-no"),
  highlightsTitle: tt("tourPageContent.why-choose-a-private-winelands"),
  highlights: [
    NO_SHARED(tt),
    {
      heading: tt("tourPageContent.a-chauffeur-who-knows-the-3"),
      body: tt("tourPageContent.your-driver-knows-the-wine"),
    },
    {
      heading: tt("tourPageContent.your-pace-not-a-shuttle"),
      body: tt("tourPageContent.spend-45-minutes-at-one"),
    },
    EVERYTHING(tt),
  ],
  midCtaTitle: tt("tourPageContent.ready-to-experience-the-cape"),
  midCtaBody:
    tt("tourPageContent.don-t-leave-your-wine"),
  midCtaButtonLabel: tt("tourPageContent.check-availability-we-respond-in"),
  ctaTitle: tt("tourPageContent.ready-to-book-here-s"),
  ctaBody: SHARED_CTA_BODY(tt),
  faqTitle: tt("tourPageContent.private-winelands-tour-your-questions"),
  inclusionsTitle: tt("tourPageContent.what-s-included-in-your-3"),
  vehiclesTitle: tt("tourPageContent.your-vehicle-for-the-winelands"),
  faqItems: [
    {
      question: tt("tourPageContent.which-wine-estates-are-on"),
      answer:
        tt("tourPageContent.the-suggested-route-visits-waterford"),
    },
    {
      question: tt("tourPageContent.how-long-is-the-winelands"),
      answer:
        tt("tourPageContent.plan-for-about-8-hours-3"),
    },
    {
      question: tt("tourPageContent.can-we-visit-franschhoek-or"),
      answer:
        tt("tourPageContent.yes-the-suggested-route-is-2"),
    },
    {
      question: tt("tourPageContent.can-we-taste-wine-freely"),
      answer:
        tt("tourPageContent.yes-a-professional-chauffeur-drives"),
    },
    {
      question: tt("tourPageContent.is-the-winelands-tour-good"),
      answer:
        tt("tourPageContent.it-is-a-popular-day"),
    },
  ],
});

const SAFARI = (tt: TFunction): TourPageContent => ({
  trustBadges: [
    tt("tourPageContent.100-private-your-vehicle-your"),
    tt("tourPageContent.transport-meals-included"),
    tt("tourPageContent.professional-chauffeur-local-guide-included"),
  ],
  itineraryTitle: tt("tourPageContent.your-big-5-safari-day"),
  itinerarySubheading:
    tt("tourPageContent.no-shared-game-vehicles-with"),
  highlightsTitle: tt("tourPageContent.why-choose-a-private-safari"),
  highlights: [
    {
      heading: tt("tourPageContent.private-transport-both-ways"),
      body: tt("tourPageContent.no-shared-shuttle-with-strangers"),
    },
    {
      heading: tt("tourPageContent.a-chauffeur-who-plans-around"),
      body: tt("tourPageContent.your-driver-coordinates-timing-knows"),
    },
    {
      heading: tt("tourPageContent.everything-included"),
      body: tt("tourPageContent.transport-game-drive-meals-and"),
    },
    {
      heading: tt("tourPageContent.a-safari-without-a-multi"),
      body: tt("tourPageContent.the-big-5-are-not"),
    },
  ],
  midCtaTitle: tt("tourPageContent.ready-for-a-big-5"),
  midCtaBody:
    tt("tourPageContent.you-can-do-a-big"),
  midCtaButtonLabel: tt("tourPageContent.check-availability-we-respond-in"),
  ctaTitle: tt("tourPageContent.ready-to-book-here-s"),
  ctaBody: SHARED_CTA_BODY(tt),
  faqTitle: tt("tourPageContent.big-5-safari-day-trip"),
  inclusionsTitle: tt("tourPageContent.what-s-included-in-your-4"),
  vehiclesTitle: tt("tourPageContent.your-vehicle-for-the-safari"),
  faqItems: [
    {
      question: tt("tourPageContent.how-far-is-aquila-from"),
      answer:
        tt("tourPageContent.aquila-private-game-reserve-is"),
    },
    {
      question: tt("tourPageContent.what-time-do-we-leave"),
      answer:
        tt("tourPageContent.on-the-suggested-itinerary-your"),
    },
    {
      question: tt("tourPageContent.which-animals-can-we-see"),
      answer:
        tt("tourPageContent.aquila-s-big-5-are"),
    },
    {
      question: tt("tourPageContent.are-meals-and-the-game"),
      answer:
        tt("tourPageContent.yes-the-package-includes-private"),
    },
    {
      question: tt("tourPageContent.is-the-safari-suitable-for"),
      answer:
        tt("tourPageContent.families-often-tell-us-it"),
    },
    {
      question: tt("tourPageContent.can-we-change-the-timing"),
      answer:
        tt("tourPageContent.the-game-drive-time-is"),
    },
  ],
});

const GENERIC = (tt: TFunction): TourPageContent => ({
  trustBadges: BADGES(tt),
  itineraryTitle: tt("tourPageContent.your-private-tour-stop-by"),
  itinerarySubheading:
    tt("tourPageContent.no-group-timetables-and-no-2"),
  highlightsTitle: tt("tourPageContent.why-choose-a-private-tour"),
  highlights: [
    NO_SHARED(tt),
    {
      heading: tt("tourPageContent.a-chauffeur-who-knows-cape"),
      body: tt("tourPageContent.your-driver-knows-the-route"),
    },
    {
      heading: tt("tourPageContent.your-schedule-not-ours"),
      body: tt("tourPageContent.we-build-the-day-around"),
    },
    EVERYTHING(tt),
  ],
  midCtaTitle: tt("tourPageContent.ready-to-plan-your-private"),
  midCtaBody:
    tt("tourPageContent.message-us-and-we-ll"),
  midCtaButtonLabel: tt("tourPageContent.check-availability-we-respond-in"),
  ctaTitle: tt("tourPageContent.ready-to-book-here-s"),
  ctaBody: SHARED_CTA_BODY(tt),
  faqTitle: tt("tourPageContent.your-questions-answered"),
  inclusionsTitle: tt("tourPageContent.what-s-included-in-your-5"),
  vehiclesTitle: tt("tourPageContent.travel-in-comfort-travel-in"),
  faqItems: [
    {
      question: tt("tourPageContent.is-this-a-private-tour"),
      answer:
        tt("tourPageContent.it-is-completely-private-you"),
    },
    {
      question: tt("tourPageContent.can-we-customise-the-itinerary"),
      answer:
        tt("tourPageContent.yes-tell-us-when-you"),
    },
  ],
});

const TOUR_CONTENT = (tt: TFunction): Record<string, TourPageContent> => ({
  "cape-peninsula-tour": CAPE_PENINSULA(tt),
  "cape-town-city-tour": CAPE_TOWN_CITY(tt),
  "winelands-chauffeur-drive": WINELANDS(tt),
  "big-5-safari-from-cape-town": SAFARI(tt),
});

export function getTourContent(slug?: string, tt: TFunction = enT): TourPageContent {
  if (!slug) return GENERIC(tt);
  return TOUR_CONTENT(tt)[slug.toLowerCase()] ?? GENERIC(tt);
}
