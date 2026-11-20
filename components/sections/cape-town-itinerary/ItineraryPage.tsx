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

import { useT } from "../../../lib/i18n/LocaleContext";
export default function ItineraryPage() {
  const tt = useT();
  return (
    <PageWrap>
      <ItineraryHero />
      <ItineraryTimeline items={itineraryDays(tt)} />
      <ItineraryAuthoritySection />
      <TestimonialsSection />
      <TestimonialsCta />
      <AvailableVehicles title={tt("ItineraryPage.7-day-cape-town-itinerary")} />


      


      <ItineraryAddOns />

      

      <ItineraryFaq items={itineraryFaqItems(tt)} />
      <ItineraryFinalCta />
    </PageWrap>
  );
}