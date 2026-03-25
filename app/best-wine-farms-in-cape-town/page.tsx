// app/best-wine-farms-in-cape-town/page.tsx

import type { Metadata } from "next";
import WineFarmsPage from "../../components/sections/wine-farms/WineFarmsPage";

export const metadata: Metadata = {
  title: "Best Wine Farms in Cape Town | WhyCapeTown",
  description:
    "Discover the best wine farms in Cape Town, Stellenbosch, and Franschhoek. Plan your private wine tour with a chauffeur-driven experience.",
};

export default function BestWineFarmsInCapeTownPage() {
  return <WineFarmsPage />;
}