import type { Metadata } from "next";
import ItineraryPage from "../../components/sections/cape-town-itinerary/ItineraryPage";

export const metadata: Metadata = {
  title: "7 Day Cape Town Itinerary | WhyCapeTown",
  description:
    "Plan the perfect 7 day Cape Town itinerary with private chauffeur-driven travel, scenic tours, wine farms, beaches, and luxury experiences.",
};

export default function SevenDayCapeTownItineraryPage() {
  return <ItineraryPage />;
}