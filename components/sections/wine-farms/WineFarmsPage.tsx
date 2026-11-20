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

import { useT } from "../../../lib/i18n/LocaleContext";
export default function WineFarmsPage() {
  const tt = useT();
  return (
    <PageWrap>
      <WineHero />
      <WineTimeline items={wineFarms(tt)} />
      <TestimonialsSection />
      <TestimonialsCta />
      <AvailableVehicles title={tt("WineFarmsPage.private-wine-tour-in-cape")} />

      <WineRegions />
      <WineByTravelStyle />
      <WineServices />

      

      

      <WineFaq items={wineFaqItems(tt)} />
      <WineFinalCta />
    </PageWrap>
  );
}