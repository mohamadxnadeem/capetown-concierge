"use client";

import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";
import { itineraryDays, itineraryFaqItems } from "./data";
import HotelsInItinerary from "./HotelsInItinerary";
import ItineraryAddOns from "./ItineraryAddOns";
import ItineraryAuthoritySection from "./ItineraryAuthoritySection";
import ItineraryFaq from "./ItineraryFaq";
import ItineraryFinalCta from "./ItineraryFinalCta";
import ItineraryHero from "./ItineraryHero";
import ItineraryTimeline from "./ItineraryTimeline";
import PeakSeasonNotice from "./PeakSeasonNotice";
import WeeklyPricing from "./WeeklyPricing";
import { PageWrap } from "./shared";
import { ItineraryHotelCard, WeeklyPricingVehicle } from "./types";

type Props = {
  vehicles: WeeklyPricingVehicle[];
  hotels: ItineraryHotelCard[];
};

export default function ItineraryPage({ vehicles, hotels }: Props) {
  return (
    <PageWrap>
      <ItineraryHero />
      <ItineraryTimeline items={itineraryDays} />
      <WeeklyPricing items={vehicles} />
      {/* Hotels section temporarily hidden — re-enable once records are live. */}
      {false && <HotelsInItinerary items={hotels} />}
      <ItineraryAuthoritySection />
      <TestimonialsSection />
      <TestimonialsCta />
      <ItineraryAddOns />
      <ItineraryFaq items={itineraryFaqItems} />
      <PeakSeasonNotice />
      <ItineraryFinalCta />
    </PageWrap>
  );
}
