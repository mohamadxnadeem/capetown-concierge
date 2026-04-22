// app/best-wine-farms-in-cape-town/page.tsx

import type { Metadata } from "next";
import { brand } from "../../lib/brand";
import WineFarmsPage from "../../components/sections/wine-farms/WineFarmsPage";

const SITE_URL = brand.siteUrl;
const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

export const metadata: Metadata = {
  title: "Best Wine Farms in Cape Town to Visit (2025) | Private Winelands Tour",
  description:
    "Discover the best wine farms in Cape Town for 2025 — Stellenbosch, Franschhoek & Constantia. Honest estate reviews, tasting tips, seasonal guide, and private chauffeur wine tours from Cape Town.",

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
    title: "Best Wine Farms in Cape Town to Visit (2025) | Private Winelands Tour",
    description:
      "Discover the best wine farms in Cape Town for 2025 — Stellenbosch, Franschhoek & Constantia. Honest estate reviews, tasting tips, and private chauffeur wine tours.",
    url: `${SITE_URL}/best-wine-farms-in-cape-town`,
    siteName: brand.name,
    type: "article",
    locale: "en_ZA",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Best wine farms in Cape Town — Stellenbosch, Franschhoek & Constantia guide",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Best Wine Farms in Cape Town to Visit (2025)",
    description:
      "Honest guide to the best wine farms in Cape Town — Stellenbosch, Franschhoek & Constantia. Estate reviews, tasting tips & private chauffeur tours.",
    images: [OG_IMAGE],
  },
};

export default function BestWineFarmsInCapeTownPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Best Wine Farms in Cape Town to Visit in 2025",
        description:
          "A complete guide to the best wine farms near Cape Town, covering Stellenbosch, Franschhoek, and Constantia estates with honest reviews, planning advice, and seasonal tips.",
        image: [`${SITE_URL}/images/wine/graff.jpg`],
        datePublished: "2024-01-01",
        dateModified: "2025-04-01",
        author: {
          "@type": "Organization",
          name: brand.name,
          url: SITE_URL,
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
        keywords:
          "best wine farms Cape Town, best wine farms to visit in Cape Town, Stellenbosch wine farms, Franschhoek wine estates, Constantia wine farms, Cape Winelands guide, private wine tour Cape Town",
      },

      {
        "@type": "ItemList",
        name: "Best Wine Farms to Visit Near Cape Town",
        description:
          "Top wine estates in Stellenbosch, Franschhoek, and Constantia near Cape Town",
        numberOfItems: 10,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Delaire Graff Estate",
            description:
              "Luxury wine estate on the Helshoogte Pass with fine dining, sculpture, and panoramic vineyard views.",
            url: `${SITE_URL}/best-wine-farms-in-cape-town#delaire-graff`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tokara Wine Estate",
            description:
              "Premium Stellenbosch estate with award-winning wines and sweeping views across the valley to Table Mountain.",
            url: `${SITE_URL}/best-wine-farms-in-cape-town#tokara`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Waterford Estate",
            description:
              "Intimate Stellenbosch estate known for Bordeaux-style blends and the pioneering chocolate and wine pairing experience.",
            url: `${SITE_URL}/best-wine-farms-in-cape-town#waterford`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Lanzerac Wine Estate",
            description:
              "One of the oldest wine estates in Stellenbosch — a five-star heritage property with exceptional Pinotage.",
            url: `${SITE_URL}/best-wine-farms-in-cape-town#lanzerac`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Spier Wine Farm",
            description:
              "Accessible and family-friendly Stellenbosch estate with multiple restaurants and consistently good wines.",
            url: `${SITE_URL}/best-wine-farms-in-cape-town#spier`,
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Postcard Café",
            description:
              "Hidden gem in the Jonkershoek Valley with one of the most scenic vineyard lunch settings in the Cape.",
            url: `${SITE_URL}/best-wine-farms-in-cape-town#postcard-cafe`,
          },
          {
            "@type": "ListItem",
            position: 7,
            name: "Vredenheim Wild Cat Experience",
            description:
              "Stellenbosch wine estate combining quality tastings with a big cat sanctuary — a uniquely memorable stop.",
            url: `${SITE_URL}/best-wine-farms-in-cape-town#vredenheim`,
          },
          {
            "@type": "ListItem",
            position: 8,
            name: "Babylonstoren",
            description:
              "Iconic Franschhoek Valley estate with a celebrated walled garden, exceptional farm restaurants, and beautiful Cape Dutch architecture.",
            url: `${SITE_URL}/best-wine-farms-in-cape-town#babylonstoren`,
          },
          {
            "@type": "ListItem",
            position: 9,
            name: "Boschendal",
            description:
              "Historic 1685 estate in the Franschhoek Valley with award-winning wines, estate picnics, and a national monument homestead.",
            url: `${SITE_URL}/best-wine-farms-in-cape-town#boschendal`,
          },
          {
            "@type": "ListItem",
            position: 10,
            name: "Groot Constantia",
            description:
              "South Africa's oldest wine estate — a UNESCO-recognised landmark just 20 minutes from Cape Town's city bowl.",
            url: `${SITE_URL}/best-wine-farms-in-cape-town#groot-constantia`,
          },
        ],
      },

      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What are the best wine farms to visit near Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The top wine farms near Cape Town include Delaire Graff, Babylonstoren, Boschendal, Tokara, Groot Constantia, Waterford Estate, Vredenheim, Spier, Postcard Café, and Lanzerac. They span the Stellenbosch, Franschhoek, and Constantia wine routes and offer a range of experiences from luxury fine dining to relaxed estate picnics.",
            },
          },
          {
            "@type": "Question",
            name: "Is Stellenbosch or Franschhoek better for wine tasting?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Stellenbosch offers the widest variety of estates and is ideal for first-time visitors wanting a broad Winelands experience. Franschhoek is more refined and intimate, better suited to couples and luxury travellers who want exceptional food alongside the wine. The best option is to combine both regions on a private chauffeur-driven tour.",
            },
          },
          {
            "@type": "Question",
            name: "How many wine farms can you visit in one day?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Three to four wine farms is the ideal number for a full-day private wine tour. Three allows a relaxed pace with a long lunch. Four works if you keep tastings focused. More than four usually means rushing through the places you'd have most enjoyed lingering at.",
            },
          },
          {
            "@type": "Question",
            name: "How far are the wine farms from Cape Town city centre?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Groot Constantia in Constantia is approximately 20 minutes from the city bowl. Most Stellenbosch estates are 45 to 50 minutes away. Franschhoek estates are around 60 to 75 minutes from Cape Town. All three regions are easily accessible on a full-day private chauffeur tour.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need a chauffeur for a wine tour in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A private chauffeur is strongly recommended. It allows you to enjoy wine tastings fully at each estate without worrying about drink-driving laws, navigation, or parking. The experience is more relaxed, more flexible, and significantly more enjoyable when someone else manages the logistics.",
            },
          },
          {
            "@type": "Question",
            name: "What is the best time of year to visit Cape Town wine farms?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "October to April is the peak season with warm weather and lush green vineyards. Harvest runs from January to March and is the most active period at the estates. Autumn (April to June) offers golden vineyard colours and cooler temperatures. Winter (July to September) brings fewer crowds, lower prices, and a cosy atmosphere at cellar restaurants.",
            },
          },
          {
            "@type": "Question",
            name: "Are there family-friendly wine farms near Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Babylonstoren, Boschendal, Spier, and Vredenheim are especially family friendly. Babylonstoren has a celebrated garden and two restaurants. Boschendal offers estate picnics on vast open grounds. Spier has multiple dining options and outdoor spaces. Vredenheim adds a big cat sanctuary that children particularly enjoy.",
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
