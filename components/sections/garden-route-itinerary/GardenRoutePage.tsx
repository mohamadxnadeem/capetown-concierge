"use client";

import ItineraryFaq from "../cape-town-itinerary/ItineraryFaq";
import ItineraryTimeline from "../cape-town-itinerary/ItineraryTimeline";
import { PageWrap } from "../cape-town-itinerary/shared";
import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";
import CombinedTripBlock from "../shared/CombinedTripBlock";
import { GardenRouteVehicle } from "../../../lib/vehicles";
import { gardenRouteDays, gardenRouteFaqItems } from "./data";
import AccommodationNotice from "./AccommodationNotice";
import GardenRouteFinalCta from "./GardenRouteFinalCta";
import GardenRouteHero from "./GardenRouteHero";
import GardenRoutePricing from "./GardenRoutePricing";
import ReserveOptions from "./ReserveOptions";

type Props = {
  vehicles: GardenRouteVehicle[];
  combinedFromZar?: number;
  combinedVehicleTitle?: string;
};

export default function GardenRoutePage({
  vehicles,
  combinedFromZar,
  combinedVehicleTitle,
}: Props) {
  return (
    <PageWrap>
      <GardenRouteHero />
      <ItineraryTimeline
        items={gardenRouteDays}
        sectionTitle="Day by Day"
        sectionText="Seven days east from Cape Town, with two nights each on a private reserve, in Knysna and in Plett. Days can be swapped around flight times and reserve availability."
        defaultWaMessagePrefix="Hi, I'd like to build the 7 day Garden Route itinerary around"
        altSuffix="on a 7 day Garden Route itinerary from Cape Town"
        trackingSource="garden_route_timeline"
      />
      <ReserveOptions />
      <GardenRoutePricing items={vehicles} />
      <AccommodationNotice />
      <TestimonialsSection />
      <TestimonialsCta />
      <ItineraryFaq items={gardenRouteFaqItems} />
      <CombinedTripBlock
        orientation="garden-route"
        combinedFromZar={combinedFromZar}
        combinedVehicleTitle={combinedVehicleTitle}
      />
      <GardenRouteFinalCta />
    </PageWrap>
  );
}
