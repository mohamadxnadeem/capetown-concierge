import type { Metadata } from "next";
import HeroBanner from "../../components/sections/HeroBanner";
import FeaturedExperiences from "../../components/sections/FeaturedExperiences";
import TestimonialsSection from "../../components/sections/testimonials/TestimonialsSection";
import TestimonialsCta from "../../components/sections/testimonials/TestimonialsCta";
import WhyChooseUs from "../../components/sections/WhyChooseUs";

const SITE_URL = "https://capetown-concierge.co.za";

export const metadata: Metadata = {
  title: "Private Tours Cape Town | Luxury Chauffeur-Driven Experiences",
  description:
    "Book a private tour in Cape Town with a professional chauffeur. Cape Peninsula, Cape Winelands, Table Mountain, and bespoke itineraries tailored to your pace and preferences. All-inclusive luxury travel.",
  alternates: {
    canonical: `${SITE_URL}/private-tours`,
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
    title: "Private Tours in Cape Town — Fully Tailored, Chauffeur-Driven",
    description:
      "Cape Peninsula, Winelands, Table Mountain, and more. Every tour is private, flexible, and designed around you. No shared groups. Book via WhatsApp.",
    url: `${SITE_URL}/private-tours`,
    siteName: "Cape Town Concierge",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/hero-car.jpg`,
        width: 1200,
        height: 630,
        alt: "Private tours Cape Town — luxury chauffeur-driven experiences",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Tours in Cape Town — Fully Tailored, Chauffeur-Driven",
    description:
      "Cape Peninsula, Winelands, Table Mountain, and more. Every tour is private, flexible, and designed around you. No shared groups. Book via WhatsApp.",
    images: [`${SITE_URL}/images/hero-car.jpg`],
  },
};

type ExperiencePhoto = {
  cover_photos: string;
  is_featured: boolean;
  order: number;
};

type Experience = {
  id: number;
  title?: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  cover_photos?: ExperiencePhoto[];
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

const tourPrices: Record<string, string> = {
  "cape peninsula private tour": "R1,800 per person",
  "city and table mountain tour": "R1,200 per person",
  "romantic stellenbosch winelands experience": "R1,500 per person",
  "sunset safari day trip": "R2,200 per person",
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

async function getAllExperiences(): Promise<FeaturedExperienceItem[]> {
  try {
    const res = await fetch(
      "https://web-production-1ab9.up.railway.app/api/experiences/all/",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data: ExperienceApiItem[] = await res.json();

    return (data
      .map((item) => {
        const exp = item?.experience || item;
        if (!exp?.title) return null;

        const featuredPhoto =
          exp.cover_photos?.find((p) => p.is_featured)?.cover_photos ||
          exp.cover_photos?.[0]?.cover_photos ||
          "";

        const plainText = stripHtml(exp.body || "");
        const description =
          exp.short_description ||
          exp.highlight ||
          truncateText(plainText, 140) ||
          "Discover a premium private tour experience in Cape Town.";

        return {
          title: exp.title,
          description,
          href: exp.slug ? `/private-tours/${exp.slug}` : "/private-tours",
          image: featuredPhoto,
          alt: `Private ${exp.title} Cape Town with professional chauffeur`,
          price: tourPrices[exp.title.toLowerCase()] ?? undefined,
        };
      }) as Array<FeaturedExperienceItem | null>)
      .filter((item): item is FeaturedExperienceItem => item !== null);
  } catch {
    return [];
  }
}

const whyItems = [
  {
    title: "Fully Private Experiences",
    description:
      "Every tour is exclusively yours — no shared groups, no fixed schedules, and no rushing. Travel at your own pace with a dedicated chauffeur.",
  },
  {
    title: "Bespoke Itineraries",
    description:
      "We shape each tour around your interests, from wine estate preferences to scenic stop requests. No two itineraries are the same.",
  },
  {
    title: "Professional Local Knowledge",
    description:
      "Our chauffeurs know Cape Town intimately — from the best viewpoints on Chapman's Peak to the most celebrated estates in Franschhoek.",
  },
  {
    title: "Luxury Transport Included",
    description:
      "All tours include a premium vehicle and professional chauffeur, so you can focus entirely on the experience rather than navigation.",
  },
];

export default async function PrivateToursLandingPage() {
  const experiences = await getAllExperiences();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Private Tours Cape Town | Luxury Chauffeur-Driven Experiences",
        url: `${SITE_URL}/private-tours`,
        description:
          "Book a private tour in Cape Town with a professional chauffeur. Cape Peninsula, Cape Winelands, Table Mountain, and bespoke itineraries.",
        image: [`${SITE_URL}/images/hero-car.jpg`],
      },
      {
        "@type": "Service",
        name: "Private Tours Cape Town",
        serviceType: "Private Chauffeur Tours",
        provider: {
          "@type": "LocalBusiness",
          name: "Cape Town Concierge",
          url: SITE_URL,
          telephone: "+27636746131",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Cape Town",
            addressRegion: "Western Cape",
            addressCountry: "ZA",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -33.9249,
            longitude: 18.4241,
          },
          priceRange: "$$$$",
        },
        areaServed: [
          { "@type": "City", name: "Cape Town" },
          { "@type": "State", name: "Western Cape" },
        ],
        image: [`${SITE_URL}/images/hero-car.jpg`],
        description:
          "Luxury private tours in Cape Town including Cape Peninsula, Cape Winelands, Table Mountain, and fully bespoke chauffeur-driven itineraries.",
        url: `${SITE_URL}/private-tours`,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What private tours are available in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We offer a range of private tours including the Cape Peninsula, Cape Winelands (Stellenbosch, Franschhoek, Constantia), Table Mountain, city tours, and fully bespoke itineraries tailored around your preferences.",
            },
          },
          {
            "@type": "Question",
            name: "Are your Cape Town tours private or shared?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "All our tours are completely private. You travel exclusively with your group, with no shared passengers. Your itinerary and pace are entirely your own.",
            },
          },
          {
            "@type": "Question",
            name: "Is transport included in your private tours?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. All our private tours include a premium vehicle and professional chauffeur. The transport is central to the experience, ensuring you travel comfortably between each destination.",
            },
          },
          {
            "@type": "Question",
            name: "Can I customise my private Cape Town tour itinerary?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We can build a fully bespoke itinerary around your interests, timing, and preferences. Just let us know what you'd like to see and we'll take care of the rest.",
            },
          },
          {
            "@type": "Question",
            name: "How do I book a private tour in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The fastest way is via WhatsApp. We typically confirm availability and provide a tailored quote within 30 minutes. Same-day bookings are welcomed where possible.",
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Private Tours",
            item: `${SITE_URL}/private-tours`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroBanner
        eyebrow="Private Tours Cape Town"
        title="Private Tours in Cape Town"
        description="Chauffeur-driven private tours across Cape Town's most celebrated destinations — Cape Peninsula, Cape Winelands, Table Mountain, and beyond. Fully bespoke, fully private."
        primaryCtaLabel="Explore Tours"
        primaryCtaHref="#tours"
        secondaryCtaLabel="Book via WhatsApp"
        secondaryCtaHref="https://wa.me/27636746131?text=I%27m%20interested%20in%20booking%20a%20private%20tour%20in%20Cape%20Town.%20Please%20can%20you%20share%20more%20details%3F"
        image="/images/car.jpg"
        imageAlt="Private tour in Cape Town with luxury chauffeur-driven transport"
      />

      <TestimonialsSection />
      <TestimonialsCta />

      <FeaturedExperiences
        eyebrow="Our Experiences"
        title="Private Tours in Cape Town"
        description="Every experience is designed around your group — no shared schedules, no rushing."
        items={experiences}
      />

      <WhyChooseUs items={whyItems} />
    </>
  );
}
