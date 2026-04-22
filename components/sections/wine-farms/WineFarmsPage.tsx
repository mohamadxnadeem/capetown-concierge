"use client";

import { PageWrap } from "./shared";
import WineHero from "./WineHero";
import WineRegionalTimeline from "./WineRegionalTimeline";
import WineRegions from "./WineRegions";
import WineByTravelStyle from "./WineByTravelStyle";
import WinePlanningGuide from "./WinePlanningGuide";
import WineBestTime from "./WineBestTime";
import WineServices from "./WineServices";
import WineTestimonials from "./WineTestimonials";
import WineFaq from "./WineFaq";
import WineFinalCta from "./WineFinalCta";
import AvailableVehicles from "../shared/AvailableVehicles";
import { wineFarmRegions, wineFaqItems } from "./data";

export default function WineFarmsPage() {
  return (
    <PageWrap>
      <WineHero />
      <WineRegionalTimeline regions={wineFarmRegions} />
      <WineRegions />
      <WineByTravelStyle />
      <WinePlanningGuide />
      <WineBestTime />
      <WineServices />
      <WineTestimonials />
      <AvailableVehicles title="Private Wine Tour in Cape Town" />
      <WineFaq items={wineFaqItems} />
      <WineFinalCta />
    </PageWrap>
  );
}
