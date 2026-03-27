"use client";

import AvailableVehicles from "../shared/AvailableVehicles";
import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";
import { itineraryDays, itineraryFaqItems } from "./data";
import ItineraryAddOns from "./ItineraryAddOns";
import ItineraryAuthoritySection from "./ItineraryAuthoritySection";
import ItineraryFaq from "./ItineraryFaq";
import ItineraryFinalCta from "./ItineraryFinalCta";
import ItineraryHero from "./ItineraryHero";
import ItineraryTimeline from "./ItineraryTimeline";
import { PageWrap } from "./shared";

export default function ItineraryPage() {
  return (
    <PageWrap>
      <ItineraryHero />
      <ItineraryTimeline items={itineraryDays} />
      <ItineraryAuthoritySection />
      <TestimonialsSection />
      <TestimonialsCta />
      <AvailableVehicles title="7 Day Cape Town Itinerary" />


      


      <ItineraryAddOns />

      

      <ItineraryFaq items={itineraryFaqItems} />
      <ItineraryFinalCta />
    </PageWrap>
  );
}