import { AddOnItem, FaqItem, ItineraryDay } from "./types";

export const itineraryDays: ItineraryDay[] = [
  {
    day: "Day 1",
    title: "Arrival, Hotel Check-In & Atlantic Seaboard Sunset",
    image: "/images/activities/campsbay.jpg",
    distance:
      "Airport to city, 20km, 25 minutes. Camps Bay for sunset is 15 minutes from the Waterfront.",
    description:
      "A smooth airport pickup, private transfer to your hotel, then a relaxed afternoon around the V&A Waterfront, Clifton, or Camps Bay before sunset. Your driver waits at Arrivals with a name board, so you skip the taxi queue and go straight to the car.",
    highlights: ["Airport pickup", "Hotel transfer", "V&A Waterfront", "Camps Bay sunset"],
    bestBookedAs:
      "A chauffeur-driven arrival day with flexible stops depending on your flight time.",
  },
  {
    day: "Day 2",
    title: "Cape Peninsula Private Tour",
    image: "/images/activities/capepoint.jpg",
    distance:
      "Cape Point is 70km south. With Chapman's Peak and Boulders, expect around 4 hours of driving across the day.",
    description:
      "The full coastal loop: Chapman's Peak Drive, Hout Bay, Cape Point, the Cape of Good Hope, and the Boulders Beach penguin colony on the way back. Your driver knows when the queues at Cape Point empty out, so you time the funicular right.",
    highlights: ["Chapman's Peak", "Cape Point", "Cape of Good Hope", "Penguins"],
    bestBookedAs:
      "A full-day private peninsula tour with chauffeur service and flexible scenic stops.",
    whatsappMessage:
      "Hi, I'd like to include the Cape Peninsula day in my 7 day itinerary",
  },
  {
    day: "Day 3",
    title: "Wine Farms in Stellenbosch or Franschhoek",
    image: "/images/wine/graff.jpg",
    distance:
      "Stellenbosch is 50km east, Franschhoek 80km. About an hour each way, and nobody in the car has to stay sober.",
    description:
      "A Winelands day covering two or three estates for tastings, mountain views, and a long lunch. Because your driver stays with you, nobody has to be the designated driver and you set the pace estate to estate.",
    highlights: ["Wine tasting", "Estate lunch", "Franschhoek Pass", "Scenic countryside"],
    bestBookedAs:
      "A private wine tour with chauffeur service so you can fully enjoy the tastings.",
    whatsappMessage:
      "Hi, I'd like a Winelands day in my itinerary. How many estates do you recommend?",
  },
  {
    day: "Day 4",
    title: "Table Mountain, Kirstenbosch & Atlantic Seaboard",
    image: "/images/activities/tablemountain.jpg",
    distance:
      "A loop through the city and back along the coast. Table Mountain to Hout Bay via Camps Bay is 25km, Kirstenbosch is 15km from the CBD.",
    description:
      "Table Mountain first thing, before the cable car queue builds and while the cloud is usually still off the summit. Bo-Kaap after, then across to Kirstenbosch Botanical Gardens for a walk under the tree canopy. Down the coast for lunch in Hout Bay, then back along Camps Bay with time for a swim or a drink on the strip. If the cable car is closed for wind, we move the day around rather than lose it. Optional helicopter flight from the Waterfront on the way back to the hotel.",
    highlights: [
      "Table Mountain",
      "Bo-Kaap",
      "Kirstenbosch Gardens",
      "Hout Bay",
      "Camps Bay",
      "Optional helicopter",
    ],
    bestBookedAs:
      "A full-day private city and coast experience with chauffeur-driven transport.",
  },
  {
    day: "Day 5",
    title: "Beach, Leisure & Scenic Lifestyle Day",
    image: "/images/activities/beach.jpg",
    distance:
      "Clifton, Camps Bay and Llandudno sit along 12km of coast road.",
    description:
      "A slower day. Clifton 4th if you want the sheltered beach, Camps Bay if you want the strip. Your driver stays with the car, so you can leave everything in it and swim.",
    highlights: ["Clifton", "Camps Bay", "Coastal drive", "Relaxed pace"],
    bestBookedAs:
      "A chauffeur-driven leisure day with beach stops, lunch, and flexible timing.",
  },
  {
    day: "Day 6",
    title: "Aquila Big Five Safari",
    image: "/images/activities/safari.jpg",
    distance:
      "Aquila is 180km inland, roughly 2 hours each way. A full day, and self-drive is not permitted on the reserve.",
    description:
      "A full day at Aquila Private Game Reserve for a Big Five safari. Early departure from the hotel, game drive on arrival, lunch on the reserve, a second drive, and back to Cape Town in time for dinner. Your driver stays with the car at the reserve — no shuttle transfers, no waiting for the group.",
    highlights: ["Aquila Reserve", "Big Five", "Guided game drives", "Full day"],
    bestBookedAs:
      "A private full-day safari transfer with your chauffeur handling the whole route.",
    whatsappMessage:
      "Hi, I'm interested in adding the safari day to a 7 day itinerary",
  },
  {
    day: "Day 7",
    title: "Final Morning, Last Stops & Departure",
    image: "/images/activities/capetown.jpg",
    distance:
      "Hotel to airport, 25 minutes. We build in a buffer and track your flight.",
    description:
      "A relaxed breakfast, last-minute shopping at the Waterfront or Watershed, or one final scenic stop on the way out before your private airport transfer. Your driver watches the clock so you don't have to.",
    highlights: ["Final stop", "Shopping", "Relaxed morning", "Airport transfer"],
    bestBookedAs:
      "A private chauffeur departure service with an optional final city or coastal stop.",
  },
];

export const addOnItems: AddOnItem[] = [
  {
    title: "Helicopter Ride",
    description:
      "A scenic aerial loop over Cape Town, Robben Island, and the Atlantic Seaboard. About 20 to 30 minutes in the air.",
  },
  {
    title: "Private Yacht Charter",
    description:
      "Sunset cruising along the Atlantic Seaboard, or a full-day charter for a celebration on the water.",
  },
  {
    title: "Safari Day Trip",
    description:
      "A Big Five wildlife day at Aquila Private Game Reserve, roughly 2 hours from Cape Town.",
  },
];

export const itineraryFaqItems: FaqItem[] = [
  {
    question: "Is 7 days enough for Cape Town?",
    answer:
      "Yes. 7 days gives you time for the Peninsula, a Winelands day, Table Mountain, a beach day, and one add-on like safari or a helicopter loop, without any of it feeling rushed.",
  },
  {
    question: "What is the best way to get around Cape Town during a 7 day trip?",
    answer:
      "A private chauffeur is the most efficient option. There is no Uber waiting at Cape Point or on Chapman's Peak, and the Winelands are 50km outside the city, so having the same vehicle and driver for the week saves hours a day.",
  },
  {
    question: "Can this itinerary be customised?",
    answer:
      "Yes. We adjust around your hotel location, travel pace, and which days you want to keep slow. Days can be swapped or reshaped based on weather or how the group is feeling.",
  },
  {
    question: "Can wine farms and Cape Peninsula be done in one day?",
    answer:
      "They are best done on separate days. They point in opposite directions from the city and each one is a full-day route on its own, so combining them means cutting both short.",
  },
  {
    question: "Is this itinerary good for couples?",
    answer:
      "Yes. The mix of scenic driving, wine estates, beach time, and one big-ticket add-on works well for couples, honeymoons, and small groups.",
  },
  {
    question: "Can you arrange the full itinerary with chauffeur service?",
    answer:
      "Yes. The whole 7 day plan can be booked with private chauffeur-driven transport, airport transfers included, and one point of contact for all the route planning.",
  },
];
