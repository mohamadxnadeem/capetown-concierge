import type { Metadata } from "next";
import HeroBanner from "../components/sections/HeroBanner";
import FeaturedVehicles from "../components/sections/FeaturedVehicles";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import FeaturedExperiences from "../components/sections/FeaturedExperiences";
import TestimonialsSection from "../components/sections/testimonials/TestimonialsSection";
import TestimonialsCta from "../components/sections/testimonials/TestimonialsCta";
import ChauffeurAuthoritySection from "../components/sections/ChauffeurAuthoritySection";

const SITE_URL = "https://capetown-concierge.co.za";

export const metadata: Metadata = {
  title: "Luxury Chauffeur Service & Private Tours Cape Town | Cape Town Concierge",
  description:
    "Book the #1 rated luxury chauffeur service and private tours in Cape Town. Premium airport transfers, bespoke itineraries, and a 5-star fleet including Mercedes V-Class and BMW X5. All-inclusive, professional, and reliable.",
  alternates: {
    canonical: SITE_URL,
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
    title: "Luxury Chauffeur Service & Private Tours Cape Town | WhyCapeTown",
    description:
      "Book the #1 rated luxury chauffeur service and private tours in Cape Town. Premium airport transfers, bespoke itineraries, and a 5-star fleet including Mercedes V-Class and BMW X5. All-inclusive, professional, and reliable.",
    url: SITE_URL,
    siteName: "WhyCapeTown",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/hero-car.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury chauffeur service Cape Town with premium private travel experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Chauffeur Service & Private Tours Cape Town | WhyCapeTown",
    description:
      "Book the #1 rated luxury chauffeur service and private tours in Cape Town. Premium airport transfers, bespoke itineraries, and a 5-star fleet including Mercedes V-Class and BMW X5.",
    images: [`${SITE_URL}/images/hero-car.jpg`],
  },
};

const trustItems = [
  {
    title: "Professional Chauffeur Service",
    description:
      "Enjoy a polished, private, and dependable experience with professional service from start to finish.",
  },
  {
    title: "Luxury Travel Presentation",
    description:
      "Every journey is designed to feel refined, comfortable, and premium, with attention to the details that matter.",
  },
  {
    title: "Tailored Cape Town Experiences",
    description:
      "From airport transfers to private tours, each booking is shaped around your schedule, style, and preferences.",
  },
  {
    title: "Local Knowledge You Can Trust",
    description:
      "Travel with confidence through Cape Town with trusted local insight, smooth coordination, and thoughtful planning.",
  },
];

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
};

type CarPhoto = {
  cover_photos?: string;
  is_featured?: boolean;
};

type CarItem = {
  title?: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  cover_photos?: CarPhoto[];
  images?: CarPhoto[];
  number_of_seats?: number;
  price?: string | number;
};

type CarsApiItem = {
  car?: CarItem;
} & Partial<CarItem>;

type FeaturedVehicleItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  seats?: number;
  price?: string;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function formatPrice(price?: string | number) {
  if (price === undefined || price === null || price === "") return "";
  return `R${price}`;
}

function isFeaturedExperienceItem(
  item: FeaturedExperienceItem | null
): item is FeaturedExperienceItem {
  return item !== null;
}

function isFeaturedVehicleItem(
  item: FeaturedVehicleItem | null
): item is FeaturedVehicleItem {
  return item !== null;
}

async function getFeaturedExperiences(): Promise<FeaturedExperienceItem[]> {
  try {
    const response = await fetch(
      "https://web-production-1ab9.up.railway.app/api/experiences/all/",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch experiences");
    }

    const data: ExperienceApiItem[] = await response.json();

    const mapped: Array<FeaturedExperienceItem | null> = data.map(
      (item: ExperienceApiItem) => {
        const experience = item?.experience || item;

        if (!experience?.title) return null;

        const featuredPhoto =
          experience.cover_photos?.find((photo) => photo.is_featured)
            ?.cover_photos ||
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
          href: experience.slug
            ? `/private-tours/${experience.slug}`
            : "/private-tours",
          image: featuredPhoto,
          alt: `Private ${experience.title} in Cape Town with Professional Driver`,
        };
      }
    );

    return mapped.filter(isFeaturedExperienceItem);
  } catch (error) {
    console.error("Error loading featured experiences:", error);
    return [];
  }
}

async function getFeaturedVehicles(): Promise<FeaturedVehicleItem[]> {
  try {
    const response = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cars for hire");
    }

    const data = await response.json();

    const sourceArray: CarsApiItem[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
      ? data.results
      : [];

    const mapped: Array<FeaturedVehicleItem | null> = sourceArray.map(
      (item: CarsApiItem) => {
        const car = item?.car || item;

        if (!car?.title) return null;

        const imageArray = car.cover_photos || car.images || [];

        const featuredPhoto =
          imageArray.find((photo: CarPhoto) => photo?.is_featured)
            ?.cover_photos ||
          imageArray[0]?.cover_photos ||
          "";

        const plainTextBody = stripHtml(car.body || "");
        const description =
          car.short_description ||
          car.highlight ||
          truncateText(plainTextBody, 140) ||
          "Luxury chauffeur vehicle available for private travel in Cape Town.";

        const href =
          typeof car.slug === "string" && car.slug.trim()
            ? `/chauffeur-services/${car.slug.trim()}`
            : "/chauffeur-services";

        return {
          title: car.title,
          description,
          href,
          image: featuredPhoto,
          alt: `Luxury ${car.title} Chauffeur Service Cape Town - VIP Transport`,
          seats: car.number_of_seats,
          price: formatPrice(car.price),
        };
      }
    );

    return mapped.filter(isFeaturedVehicleItem);
  } catch (error) {
    console.error("Error loading vehicles:", error);
    return [];
  }
}

export default async function HomePage() {
  const [featuredVehicleItems, featuredExperienceItems] = await Promise.all([
    getFeaturedVehicles(),
    getFeaturedExperiences(),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "WhyCapeTown",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        description:
          "Luxury chauffeur services, private tours, airport transfers, and curated travel experiences in Cape Town.",
      },
      {
        "@type": "WebSite",
        name: "WhyCapeTown",
        url: SITE_URL,
      },
      {
        "@type": "WebPage",
        name: "Luxury Chauffeur Service & Private Tours Cape Town | WhyCapeTown",
        url: SITE_URL,
        description:
          "Book the #1 rated luxury chauffeur service and private tours in Cape Town. Premium airport transfers, bespoke itineraries, and a 5-star fleet including Mercedes V-Class and BMW X5. All-inclusive, professional, and reliable.",
        image: [`${SITE_URL}/images/hero-car.jpg`],
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
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is included in your chauffeur pricing in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our chauffeur pricing is designed to be all-inclusive, covering the vehicle, professional driver, and route-based travel arrangements so clients enjoy a seamless premium experience without hidden surprises.",
            },
          },
          {
            "@type": "Question",
            name: "Can I customise my Cape Town chauffeur itinerary?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We offer fully bespoke itineraries for airport transfers, private city touring, Cape Peninsula routes, Winelands days, corporate travel, and multi-day private travel in and around Cape Town.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer airport transfers in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We provide premium airport transfers in Cape Town with luxury vehicles, professional drivers, punctual pickups, and a polished arrival or departure experience.",
            },
          },
          {
            "@type": "Question",
            name: "Is your chauffeur service safe and reliable?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Our service focuses on safety, professionalism, local route knowledge, and reliable communication so clients can travel with complete peace of mind.",
            },
          },
          {
            "@type": "Question",
            name: "What vehicles are available for private chauffeur service in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our fleet includes premium chauffeur options such as Mercedes V-Class, BMW X5, and group-friendly vehicles, allowing us to tailor transport to couples, families, executives, and VIP travellers.",
            },
          },
        ],
      },
      {
        "@type": "Service",
        serviceType: "Private Chauffeur Services",
        name: "Private Chauffeur Services",
        provider: {
          "@type": "Organization",
          name: "WhyCapeTown",
          url: SITE_URL,
        },
        areaServed: {
          "@type": "City",
          name: "Cape Town",
        },
        description:
          "Luxury chauffeur service in Cape Town for airport transfers, executive transport, private travel, bespoke day planning, and all-inclusive premium journeys with professional drivers.",
      },
      {
        "@type": "Service",
        serviceType: "Custom Cape Town Tours",
        name: "Custom Cape Town Tours",
        provider: {
          "@type": "Organization",
          name: "WhyCapeTown",
          url: SITE_URL,
        },
        areaServed: {
          "@type": "City",
          name: "Cape Town",
        },
        description:
          "Custom private tours in Cape Town including Cape Peninsula, Cape Winelands, Table Mountain, coastal routes, and tailored chauffeur-driven itineraries designed around each client’s pace and preferences.",
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

      <HeroBanner
        eyebrow="Cape Town Concierge"
        title="Luxury Chauffeur Services in Cape Town"
        description="Premium airport transfers, private chauffeur services, and curated travel experiences designed for clients who value comfort, elegance, and reliability."
        primaryCtaLabel="Book Your Ride"
        primaryCtaHref="/contact"
        secondaryCtaLabel="Explore Services"
        secondaryCtaHref="/chauffeur-services"
        image="/images/hero-car.jpg"
        imageAlt="Luxury chauffeur fleet in Cape Town featuring premium private transport vehicles"
      />

      <TestimonialsSection />
      <TestimonialsCta />

      <FeaturedVehicles items={featuredVehicleItems} />

      <WhyChooseUs items={trustItems} />

      <ChauffeurAuthoritySection />

      <FeaturedExperiences items={featuredExperienceItems} />
    </>
  );
}