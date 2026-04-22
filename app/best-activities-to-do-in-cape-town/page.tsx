import type { Metadata } from "next";
import { brand } from "../../lib/brand";
import BestActivitiesPage from "../../components/sections/cape-town-activities/BestActivitiesPage";

type ExperiencePhoto = {
  id: number;
  cover_photos: string;
  is_featured: boolean;
  order: number;
};

type Experience = {
  id: number;
  title: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  cover_photos?: ExperiencePhoto[];
  price?: string | number;
};

type ExperienceApiItem = {
  experience?: Experience;
} & Partial<Experience>;

type FeaturedExperienceItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  price?: string;
};

function formatApiPrice(price?: string | number): string | undefined {
  if (!price && price !== 0) return undefined;
  const num = Number(String(price).replace(/[^0-9.]/g, ""));
  if (isNaN(num) || num === 0) return undefined;
  return `From $${Math.round(num)} per day`;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

async function getFeaturedExperiences(): Promise<FeaturedExperienceItem[]> {
  try {
    const response = await fetch(
      "https://web-production-1ab9.up.railway.app/api/experiences/all/",
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) throw new Error("Failed to fetch experiences");

    const data: ExperienceApiItem[] = await response.json();

    return (data.map((item: ExperienceApiItem) => {
      const experience = item?.experience || item;
      if (!experience?.title) return null;

      const featuredPhoto =
        experience.cover_photos?.find((photo) => photo.is_featured)?.cover_photos ||
        experience.cover_photos?.[0]?.cover_photos ||
        "";

      const plainTextBody = stripHtml(experience.body || "");
      const description =
        experience.short_description ||
        experience.highlight ||
        truncateText(plainTextBody, 140) ||
        "Discover a premium private tour in Cape Town.";

      return {
        title: experience.title,
        description,
        href: experience.slug ? `/private-tours/${experience.slug}` : "/private-tours",
        image: featuredPhoto,
        alt: `Private ${experience.title} in Cape Town with Professional Driver`,
        price: formatApiPrice(experience.price),
      };
    }) as Array<FeaturedExperienceItem | null>).filter(
      (item): item is FeaturedExperienceItem => item !== null
    );
  } catch (error) {
    console.error("Error loading featured experiences:", error);
    return [];
  }
}

const SITE_URL = brand.siteUrl;

const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

export const metadata: Metadata = {
  title: "Things to Do in Cape Town | Luxury Experiences",
  description:
    "Discover Cape Town's best activities — from safaris to scenic drives. Privately curated experiences with a dedicated chauffeur. Plan your trip today.",
  alternates: {
    canonical: `${SITE_URL}/best-activities-to-do-in-cape-town`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Things to Do in Cape Town | Luxury Experiences",
    description:
      "Discover Cape Town's best activities — from safaris to scenic drives. Privately curated experiences with a dedicated chauffeur. Plan your trip today.",
    url: `${SITE_URL}/best-activities-to-do-in-cape-town`,
    siteName: brand.name,
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Cape Town Concierge — Luxury Chauffeur Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Things to Do in Cape Town | Luxury Experiences",
    description:
      "Discover Cape Town's best activities — from safaris to scenic drives. Privately curated experiences with a dedicated chauffeur. Plan your trip today.",
    images: [OG_IMAGE],
  },
};

export default async function BestActivitiesToDoInCapeTownPage() {
  const featuredExperiences = await getFeaturedExperiences();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Best Activities to Do in Cape Town",
        description:
          "A complete guide to the best activities in Cape Town including Table Mountain, Cape Peninsula, wine tours, helicopter rides, safari day trips, and private chauffeur-driven experiences.",
        image: [`${SITE_URL}/images/activities/table-mountain.jpg`],
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
          "@id": `${SITE_URL}/best-activities-to-do-in-cape-town`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What are the best activities to do in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Some of the best activities in Cape Town include Table Mountain, Cape Peninsula, Cape Point, Boulders Beach penguins, Cape Winelands tours, helicopter rides, yacht charters, and scenic private chauffeur-driven experiences.",
            },
          },
          {
            "@type": "Question",
            name: "Can I do Cape Town activities with a private chauffeur?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, many of the best Cape Town activities can be enjoyed with a private chauffeur, making the day more comfortable, flexible, and seamless from start to finish.",
            },
          },
          {
            "@type": "Question",
            name: "How many Cape Town activities can you do in one day?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "That depends on the route and pace, but most private day experiences comfortably combine 2 to 4 major activities in one day.",
            },
          },
          {
            "@type": "Question",
            name: "Are Cape Town private tours better than self-drive planning?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Private tours are often a better option for travellers who want local knowledge, route planning, flexibility, and a more premium experience without the stress of driving and logistics.",
            },
          },
          {
            "@type": "Question",
            name: "Which Cape Town activities are best for first-time visitors?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "For first-time visitors, Table Mountain, Cape Peninsula, Cape Point, Boulders Beach, scenic coastal drives, and a Cape Winelands tour are among the most popular and rewarding experiences.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Best Activities in Cape Town",
            item: `${SITE_URL}/best-activities-to-do-in-cape-town`,
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

      <BestActivitiesPage featuredExperiences={featuredExperiences} />
    </>
  );
}