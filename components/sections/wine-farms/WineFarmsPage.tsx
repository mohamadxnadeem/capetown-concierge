"use client";

import { PageWrap } from "./shared";
import WineHero from "./WineHero";
import WineTimeline from "./WineTimeline";
import WineRegions from "./WineRegions";
import WineServices from "./WineServices";
import WineFaq from "./WineFaq";
import WineFinalCta from "./WineFinalCta";
import AvailableVehicles from "../shared/AvailableVehicles";
import { wineFarms, wineFaqItems } from "./data";

export default function WineFarmsPage() {
  return (
    <PageWrap>
      <WineHero />
      <WineTimeline items={wineFarms} />
      <AvailableVehicles title="Private Wine Tour in Cape Town" />
      <WineRegions />
      <WineServices />
      
      <WineFaq items={wineFaqItems} />
      <WineFinalCta />
    </PageWrap>
  );
}