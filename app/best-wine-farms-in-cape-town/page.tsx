// app/best-wine-farms-in-cape-town/page.tsx

import type { Metadata } from "next";
import WineFarmsPage from "../../components/sections/wine-farms/WineFarmsPage";

const SITE_URL = "https://capetown-concierge.co.za";

export const metadata: Metadata = {
  title:
    "10 Best Wine Farms in Cape Town, Stellenbosch & Franschhoek (2026 Guide)",
  description:
    "Discover the best wine farms in Cape Town, Stellenbosch, and Franschhoek. Explore luxury estates like Delaire Graff, Babylonstoren, and Boschendal. Book a private chauffeur-driven wine tour today.",

  alternates: {
    canonical: `${SITE_URL}/best-wine-farms-in-cape-town`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title:
      "10 Best Wine Farms in Cape Town, Stellenbosch & Franschhoek",
    description:
      "Explore the top wine farms in Cape Town including Delaire Graff, Babylonstoren, Boschendal, and more. Plan your private wine tour with a chauffeur.",
    url: `${SITE_URL}/best-wine-farms-in-cape-town`,
    siteName: "Cape Town Concierge",
    type: "article",
    images: [
      {
        url: `${SITE_URL}/images/wine/graff.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury wine estate in Stellenbosch with vineyard views",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "10 Best Wine Farms in Cape Town (Luxury Wine Guide)",
    description:
      "Plan your Cape Winelands experience with the best wine farms in Stellenbosch, Franschhoek, and Constantia.",
    images: [`${SITE_URL}/images/wine/graff.jpg`],
  },
};

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
          name: "Cape Town Concierge",
        },
        publisher: {
          "@type": "Organization",
          name: "Cape Town Concierge",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <WineFarmsPage />
    </>
  );
}