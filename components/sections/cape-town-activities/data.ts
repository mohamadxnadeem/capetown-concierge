import { ActivityItem, ServiceItem, TravelerTypeItem } from "./types";

export const activities: ActivityItem[] = [
  {
    title: "Table Mountain",
    image: "/images/activities/tablemountain.jpg",
    description:
      "One of Cape Town’s most iconic experiences, with panoramic views over the city, ocean, and mountains. It is one of the first things most visitors want to do.",
    bestFor: "First-time visitors, couples, photographers",
    idealBooking:
      "Best paired with a private city tour or chauffeur-driven day itinerary.",
  },
  {
    title: "Cape Peninsula Tour",
    image: "/images/activities/capepoint.jpg",
    description:
      "A full scenic day covering dramatic coastlines, Cape Point, the Cape of Good Hope, Chapman’s Peak Drive, and unforgettable viewpoints along the route.",
    bestFor: "First-time visitors, couples, families",
    idealBooking:
      "Perfect as a private full-day tour with a chauffeur and flexible stops.",
  },
  {
    title: "Boulders Beach Penguins",
    image: "/images/activities/boulders.jpg",
    description:
      "A unique wildlife experience where you can see African penguins up close in one of the Cape’s most memorable beach settings.",
    bestFor: "Families, couples, wildlife lovers",
    idealBooking:
      "Usually best included as part of a Cape Peninsula private tour.",
  },
  {
    title: "Cape of Good Hope & Cape Point",
    image: "/images/activities/capeofgoodhope.jpg",
    description:
      "Enjoy rugged cliffs, ocean scenery, and one of the Cape’s most famous landmarks as part of a dramatic and scenic private day experience.",
    bestFor: "Nature lovers, couples, explorers",
    idealBooking:
      "Works best with a private guide and chauffeur for a relaxed full-day route.",
  },
  {
    title: "Winelands in Stellenbosch & Franschhoek",
    image: "/images/activities/winelands.jpg",
    description:
      "Discover beautiful wine estates, tastings, mountain scenery, and exceptional food in one of South Africa’s most loved luxury day experiences.",
    bestFor: "Couples, groups, luxury travellers",
    idealBooking:
      "Best done with a chauffeur so you can fully enjoy the tastings.",
  },
  {
    title: "Chapman’s Peak Drive",
    image: "/images/activities/chapmans.jpg",
    description:
      "One of the world’s most scenic coastal drives, with dramatic mountain and ocean views that are best enjoyed without the stress of driving yourself.",
    bestFor: "Couples, photographers, luxury travellers",
    idealBooking:
      "Ideal as part of a chauffeur-driven coastal route or peninsula day tour.",
  },
  {
    title: "Helicopter Ride Over Cape Town",
    image: "/images/activities/helicopter.jpg",
    description:
      "A premium aerial experience offering unforgettable views of Table Mountain, the coastline, and the Atlantic seaboard from above.",
    bestFor: "Luxury travellers, special occasions, couples",
    idealBooking:
      "Perfect with private chauffeur transfers before and after the flight.",
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
    title: "Safari Day Trip",
    image: "/images/activities/safari.jpg",
    description:
      "Add a Big Five wildlife experience to your stay with a premium day trip to a nearby safari reserve outside Cape Town.",
    bestFor: "Families, first-time visitors, luxury travellers",
    idealBooking:
      "Great as a full-day private experience with all transport arranged.",
  },
  {
    title: "Camps Bay & Clifton",
    image: "/images/activities/campsbay.jpg",
    description:
      "Relax along Cape Town’s most famous beach strip with stylish restaurants, ocean views, palm-lined roads, and unforgettable sunsets.",
    bestFor: "Couples, lifestyle travellers, groups",
    idealBooking:
      "A great stop on a private city, coastal, or sunset chauffeur itinerary.",
  },
  {
    title: "Kirstenbosch Botanical Gardens",
    image: "/images/activities/kirstenbosch.jpg",
    description:
      "A beautiful and slower-paced Cape Town experience with lush gardens, mountain backdrops, and peaceful walking routes.",
    bestFor: "Families, couples, nature lovers",
    idealBooking:
      "Easy to include in a tailored private day itinerary.",
  },
  {
    title: "Fine Dining Experiences",
    image: "/images/activities/finedining.jpg",
    description:
      "Cape Town is one of the best food cities in the world, making luxury dining a standout experience for couples and premium travellers.",
    bestFor: "Couples, luxury travellers, food lovers",
    idealBooking:
      "Best enjoyed with chauffeur service for a seamless evening out.",
  },
];

export const travelerTypes: TravelerTypeItem[] = [
  {
    title: "For Couples",
    text: "Wine estates, sunsets in Camps Bay, private yacht charters, helicopter rides, and scenic peninsula touring.",
  },
  {
    title: "For Families",
    text: "Penguins at Boulders Beach, Table Mountain, safari day trips, Kirstenbosch, and flexible private tours.",
  },
  {
    title: "For Luxury Travellers",
    text: "Private chauffeur service, helicopter flights, yacht experiences, wine tours, and curated custom itineraries.",
  },
  {
    title: "For First-Time Visitors",
    text: "Table Mountain, Cape Peninsula, Chapman’s Peak, Cape Point, and the Winelands in one seamless itinerary.",
  },
];

export const services: ServiceItem[] = [
  {
    title: "Private Tours",
    description:
      "Explore Cape Town with a private chauffeur-driven experience tailored around your pace, preferred stops, and travel style.",
    href: "/private-tours",
    cta: "Explore Private Tours",
  },
  {
    title: "Chauffeur Services",
    description:
      "Travel in comfort with private chauffeur service for full-day hire, scenic touring, airport transfers, and premium transport.",
    href: "/chauffeur-services",
    cta: "View Chauffeur Options",
  },
];