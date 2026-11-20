import { ActivityItem, ServiceItem, TravelerTypeItem } from "./types";

import type { TFunction } from "../../../lib/i18n/messages";
export const activities = (tt: TFunction): ActivityItem[] => ([
  {
    title: tt("data.table-mountain"),
    image: "/images/activities/tablemountain.jpg",
    description:
      tt("data.one-of-cape-town-s"),
    bestFor: tt("data.first-time-visitors-couples-photographers"),
    idealBooking:
      tt("data.best-paired-with-a-private"),
  },
  {
    title: tt("data.cape-peninsula-tour"),
    image: "/images/activities/capepoint.jpg",
    description:
      tt("data.a-full-scenic-day-covering"),
    bestFor: tt("data.first-time-visitors-couples-families"),
    idealBooking:
      tt("data.perfect-as-a-private-full"),
  },
  {
    title: tt("data.boulders-beach-penguins"),
    image: "/images/activities/boulders.jpg",
    description:
      tt("data.a-unique-wildlife-experience-where"),
    bestFor: tt("data.families-couples-wildlife-lovers"),
    idealBooking:
      tt("data.usually-best-included-as-part"),
  },
  {
    title: tt("data.cape-of-good-hope-cape"),
    image: "/images/activities/capeofgoodhope.jpg",
    description:
      tt("data.enjoy-rugged-cliffs-ocean-scenery"),
    bestFor: tt("data.nature-lovers-couples-explorers"),
    idealBooking:
      tt("data.works-best-with-a-private"),
  },
  {
    title: tt("data.winelands-in-stellenbosch-franschhoek"),
    image: "/images/activities/winelands.jpg",
    description:
      tt("data.discover-beautiful-wine-estates-tastings"),
    bestFor: tt("data.couples-groups-luxury-travellers"),
    idealBooking:
      tt("data.best-done-with-a-chauffeur"),
  },
  {
    title: tt("data.chapman-s-peak-drive"),
    image: "/images/activities/chapmans.jpg",
    description:
      tt("data.one-of-the-world-s"),
    bestFor: tt("data.couples-photographers-luxury-travellers"),
    idealBooking:
      tt("data.ideal-as-part-of-a"),
  },
  {
    title: tt("data.helicopter-ride-over-cape-town"),
    image: "/images/activities/helicopter.jpg",
    description:
      tt("data.a-premium-aerial-experience-offering"),
    bestFor: tt("data.luxury-travellers-special-occasions-couples"),
    idealBooking:
      tt("data.perfect-with-private-chauffeur-transfers"),
  },
  // {
  //   title: "Private Yacht Charter",
  //   image: "/images/activities/yacht-charter.jpg",
  //   description:
  //     "Take in Cape Town’s coastline from the water with a private yacht experience designed for sunsets, celebrations, and relaxed luxury.",
  //   bestFor: "Couples, groups, celebrations",
  //   idealBooking:
  //     "Best paired with private chauffeur transfers and a custom itinerary.",
  // },
  {
    title: tt("data.safari-day-trip"),
    image: "/images/activities/safari.jpg",
    description:
      tt("data.add-a-big-five-wildlife"),
    bestFor: tt("data.families-first-time-visitors-luxury"),
    idealBooking:
      tt("data.great-as-a-full-day"),
  },
  {
    title: tt("data.camps-bay-clifton"),
    image: "/images/activities/campsbay.jpg",
    description:
      tt("data.relax-along-cape-town-s"),
    bestFor: tt("data.couples-lifestyle-travellers-groups"),
    idealBooking:
      tt("data.a-great-stop-on-a"),
  },
  {
    title: tt("data.kirstenbosch-botanical-gardens"),
    image: "/images/activities/kirstenbosch.jpg",
    description:
      tt("data.a-beautiful-and-slower-paced"),
    bestFor: tt("data.families-couples-nature-lovers"),
    idealBooking:
      tt("data.easy-to-include-in-a"),
  },
  {
    title: tt("data.fine-dining-experiences"),
    image: "/images/activities/finedining.jpg",
    description:
      tt("data.cape-town-is-one-of"),
    bestFor: tt("data.couples-luxury-travellers-food-lovers"),
    idealBooking:
      tt("data.best-enjoyed-with-chauffeur-service"),
  },
]);

export const travelerTypes = (tt: TFunction): TravelerTypeItem[] => ([
  {
    title: tt("data.for-couples"),
    text: tt("data.wine-estates-sunsets-in-camps"),
  },
  {
    title: tt("data.for-families"),
    text: tt("data.penguins-at-boulders-beach-table"),
  },
  {
    title: tt("data.for-luxury-travellers"),
    text: tt("data.private-chauffeur-service-helicopter-flights"),
  },
  {
    title: tt("data.for-first-time-visitors"),
    text: tt("data.table-mountain-cape-peninsula-chapman"),
  },
]);

export const services = (tt: TFunction): ServiceItem[] => ([
  {
    title: tt("data.private-tours"),
    description:
      tt("data.explore-cape-town-with-a"),
    href: "/tours",
    cta: tt("data.explore-private-tours"),
  },
  {
    title: tt("data.chauffeur-services"),
    description:
      tt("data.travel-in-comfort-with-private"),
    href: "/chauffeur-hire",
    cta: tt("data.view-chauffeur-options"),
  },
]);