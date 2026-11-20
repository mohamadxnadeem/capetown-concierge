import { AddOnItem, FaqItem, ItineraryDay } from "./types";

import type { TFunction } from "../../../lib/i18n/messages";
export const itineraryDays = (tt: TFunction): ItineraryDay[] => ([
  {
    day: tt("data.day-1"),
    title: tt("data.arrival-hotel-check-in-atlantic"),
    image: "/images/activities/campsbay.jpg",
    description:
      tt("data.start-your-cape-town-trip"),
    highlights: [tt("data.airport-pickup"), tt("data.hotel-transfer"), tt("data.v-a-waterfront"), tt("data.camps-bay-sunset")],
    bestBookedAs:
      tt("data.a-private-chauffeur-driven-arrival"),
  },
  {
    day: tt("data.day-2"),
    title: tt("data.cape-peninsula-private-tour"),
    image: "/images/activities/capepoint.jpg",
    description:
      tt("data.spend-the-day-exploring-one"),
    highlights: [tt("data.chapman-s-peak"), tt("data.cape-point"), tt("data.cape-of-good-hope"), tt("data.penguins")],
    bestBookedAs:
      tt("data.a-full-day-private-peninsula"),
  },
  {
    day: tt("data.day-3"),
    title: tt("data.wine-farms-in-stellenbosch-or"),
    image: "/images/wine/graff.jpg",
    description:
      tt("data.enjoy-a-premium-winelands-experience"),
    highlights: [tt("data.wine-tasting"), tt("data.luxury-estates"), tt("data.lunch-stop-2"), tt("data.scenic-countryside")],
    bestBookedAs:
      tt("data.a-private-wine-tour-with"),
  },
  {
    day: tt("data.day-4"),
    title: tt("data.table-mountain-city-culture"),
    image: "/images/activities/tablemountain.jpg",
    description:
      tt("data.take-in-table-mountain-the"),
    highlights: [tt("data.table-mountain-2"), tt("data.bo-kaap"), tt("data.city-highlights"), tt("data.local-culture")],
    bestBookedAs:
      tt("data.a-half-day-or-full"),
  },
  {
    day: tt("data.day-5"),
    title: tt("data.beach-leisure-scenic-lifestyle-day"),
    image: "/images/activities/beach.jpg",
    description:
      tt("data.slow-the-pace-down-with"),
    highlights: [tt("data.clifton"), tt("data.camps-bay"), tt("data.coastal-drive"), tt("data.relaxed-luxury")],
    bestBookedAs:
      tt("data.a-chauffeur-driven-leisure-day"),
  },
  {
    day: tt("data.day-6"),
    title: tt("data.luxury-add-on-or-safari"),
    image: "/images/activities/safari.jpg",
    description:
      tt("data.choose-a-premium-experience-such"),
    highlights: [tt("data.helicopter-ride"), tt("data.yacht-charter"), tt("data.safari-option"), tt("data.luxury-add-on")],
    bestBookedAs:
      tt("data.a-custom-private-day-built"),
  },
  {
    day: tt("data.day-7"),
    title: tt("data.final-morning-last-stops-departure"),
    image: "/images/activities/capetown.jpg",
    description:
      tt("data.use-your-final-day-for"),
    highlights: [tt("data.final-stop"), tt("data.shopping"), tt("data.relaxed-morning"), tt("data.airport-transfer")],
    bestBookedAs:
      tt("data.a-private-chauffeur-departure-service"),
  },
]);

export const addOnItems = (tt: TFunction): AddOnItem[] => ([
  {
    title: tt("data.helicopter-ride-2"),
    description:
      tt("data.add-a-premium-aerial-experience"),
  },
  {
    title: tt("data.private-yacht-charter"),
    description:
      tt("data.perfect-for-sunset-cruising-celebrations"),
  },
  {
    title: tt("data.safari-day-trip-2"),
    description:
      tt("data.add-a-big-five-wildlife-2"),
  },
]);

export const itineraryFaqItems = (tt: TFunction): FaqItem[] => ([
  {
    question: tt("data.is-7-days-enough-for"),
    answer:
      tt("data.yes-7-days-is-enough"),
  },
  {
    question: tt("data.what-is-the-best-way"),
    answer:
      tt("data.a-private-chauffeur-is-one"),
  },
  {
    question: tt("data.can-this-itinerary-be-customised"),
    answer:
      tt("data.yes-the-itinerary-can-be"),
  },
  {
    question: tt("data.can-wine-farms-and-cape"),
    answer:
      tt("data.they-are-best-done-on"),
  },
  {
    question: tt("data.is-this-itinerary-good-for"),
    answer:
      tt("data.yes-this-itinerary-works-especially"),
  },
  {
    question: tt("data.can-you-arrange-the-full"),
    answer:
      tt("data.yes-the-full-7-day"),
  },
]);