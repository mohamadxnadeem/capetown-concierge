import type { Metadata } from "next";
import BestActivitiesPage from "../../components/sections/cape-town-activities/BestActivitiesPage";

export const metadata: Metadata = {
  title: "Best Activities to Do in Cape Town | WhyCapeTown",
  description:
    "Discover the best activities to do in Cape Town, from Table Mountain and Cape Point to wine tours, helicopter rides, safaris, and private chauffeur-driven experiences.",
};

export default function BestActivitiesToDoInCapeTownPage() {
  return <BestActivitiesPage />;
}