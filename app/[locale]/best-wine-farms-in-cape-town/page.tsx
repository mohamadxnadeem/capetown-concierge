// app/best-wine-farms-in-cape-town/page.tsx

import RelatedLinks from "../../../components/common/RelatedLinks";
import JsonLd from "../../../components/i18n/JsonLd";
import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/i18n/seo";
import { localeFromParam, type LocaleParams } from "../../../lib/i18n/server";
import { brand } from "../../../lib/brand";
import WineFarmsPage from "../../../components/sections/wine-farms/WineFarmsPage";

const SITE_URL = brand.siteUrl;

const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = localeFromParam((await params).locale);
  return pageMetadata(locale, "/best-wine-farms-in-cape-town", "wine");
}

export default function BestWineFarmsInCapeTownPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline:
          "10 Best Wine Farms in Cape Town, Stellenbosch & Franschhoek",
        description:
          "A complete guide to the best wine farms near Cape Town, including luxury estates, family-friendly farms, and scenic wine routes.",
        image: [`${SITE_URL}/images/wine/graff.jpg`],
        author: {
          "@type": "Organization",
          name: brand.name,
        },
        publisher: {
          "@type": "Organization",
          name: brand.name,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/images/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/best-wine-farms-in-cape-town`,
        },
      },

      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What are the best wine farms to visit near Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Some of the best wine farms include Delaire Graff, Babylonstoren, Boschendal, Tokara, and Groot Constantia. Each offers a unique experience from luxury wine tasting to scenic vineyard views.",
            },
          },
          {
            "@type": "Question",
            name: "How many wine farms can you visit in one day?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most private wine tours include 3 to 4 wine farms in one day depending on travel time, tastings, and whether you include a lunch stop.",
            },
          },
          {
            "@type": "Question",
            name: "Is Stellenbosch or Franschhoek better for wine tasting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Stellenbosch offers a wider variety of estates while Franschhoek is known for a more refined, luxury food and wine experience. The best option is to combine both in one private tour.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need a chauffeur for a wine tour in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, a private chauffeur allows you to fully enjoy wine tastings without driving, while also providing a more relaxed and premium experience.",
            },
          },
          {
            "@type": "Question",
            name: "Are there family-friendly wine farms near Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, estates like Babylonstoren, Boschendal, Spier, and Vredenheim are ideal for families, offering open spaces, activities, and relaxed environments.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <WineFarmsPage />
      <RelatedLinks
        title="Private tours in Cape Town"
        text="Turn this guide into a plan with a private chauffeur and no shared groups."
        links={[
          { href: "/tours/winelands-chauffeur-drive", label: "Private Winelands tour from Cape Town" },
          { href: "/tours", label: "See all our private tours in Cape Town" },
        ]}
      />
    </>
  );
}