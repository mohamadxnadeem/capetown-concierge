"use client";

import { PageWrap } from "./shared";
import WineHero from "./WineHero";
import WineTimeline from "./WineTimeline";
import WineRegions from "./WineRegions";
import WineByTravelStyle from "./WineByTravelStyle";
import WineServices from "./WineServices";
import WineFaq from "./WineFaq";
import WineFinalCta from "./WineFinalCta";
import AvailableVehicles from "../shared/AvailableVehicles";
import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";
import { wineFarms, wineFaqItems } from "./data";

export default function WineFarmsPage() {
  return (
    <PageWrap>
      <WineHero />
      <WineTimeline items={wineFarms} />

      <TestimonialsSection />
      <TestimonialsCta />
      <AvailableVehicles title="Private Wine Tour in Cape Town" />
      
      <WineRegions />
      <WineByTravelStyle />
      <WineServices />

      
      <TestimonialsSection />
      <TestimonialsCta />
      <AvailableVehicles title="Private Wine Tour in Cape Town" />


      <WineFaq items={wineFaqItems} />
      <WineFinalCta />
    </PageWrap>
  );
}