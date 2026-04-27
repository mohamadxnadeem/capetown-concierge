import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroBanner from "../components/sections/HeroBanner";
import FeaturedVehicles from "../components/sections/FeaturedVehicles";
import FeaturedExperiences from "../components/sections/FeaturedExperiences";
import GoogleRatingBadge from "../components/common/GoogleRatingBadge";

const TestimonialsSection = dynamic(() => import("../components/sections/testimonials/TestimonialsSection"));
const TestimonialsCta = dynamic(() => import("../components/sections/testimonials/TestimonialsCta"), { ssr: false });
const WhyChooseUs = dynamic(() => import("../components/sections/WhyChooseUs"), { ssr: false });
const ChauffeurAuthoritySection = dynamic(() => import("../components/sections/ChauffeurAuthoritySection"), { ssr: false });
const HomepageEnquiryCollapsible = dynamic(() => import("../components/sections/HomepageEnquiryCollapsible"), { ssr: false });
import { brand } from "../lib/brand";
import { buildWhatsAppLink } from "../lib/whatsapp";

const SITE_URL = brand.siteUrl;

const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

export const metadata: Metadata = {
  title: "Luxury Chauffeur Service Cape Town | Cape Town Concierge",
  description:
    "Premium private chauffeur hire, airport transfers & bespoke tours in Cape Town. Trusted by international travellers. Book via WhatsApp in minutes.",
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
    title: "Luxury Chauffeur Service Cape Town | Cape Town Concierge",
    description:
      "Premium private chauffeur hire, airport transfers & bespoke tours in Cape Town. Trusted by international travellers. Book via WhatsApp in minutes.",
    url: SITE_URL,
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
    title: "Luxury Chauffeur Service Cape Town | Cape Town Concierge",
    description:
      "Premium private chauffeur hire, airport transfers & bespoke tours in Cape Town. Trusted by international travellers. Book via WhatsApp in minutes.",
    images: [OG_IMAGE],
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
  priceUsd?: number;
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
  priceUsd?: number;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
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
      { next: { revalidate: 3600 } }
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

        const expPriceUsd = experience.price
          ? Number(String(experience.price).replace(/[^0-9.]/g, "")) || undefined
          : undefined;

        return {
          title: experience.title,
          description,
          href: experience.slug
            ? `/private-tours/${experience.slug}`
            : "/private-tours",
          image: featuredPhoto,
          alt: `Private ${experience.title} in Cape Town with Professional Driver`,
          priceUsd: expPriceUsd,
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
      { next: { revalidate: 3600 } }
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

        const carPriceUsd = car.price
          ? Number(String(car.price).replace(/[^0-9.]/g, "")) || undefined
          : undefined;

        return {
          title: car.title,
          description,
          href,
          image: featuredPhoto,
          alt: `Luxury ${car.title} Chauffeur Service Cape Town - VIP Transport`,
          seats: car.number_of_seats,
          priceUsd: carPriceUsd,
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
        name: brand.name,
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        telephone: brand.phone,
        email: brand.contactEmail,
        description:
          "Luxury chauffeur services, private tours, airport transfers, and curated travel experiences in Cape Town.",
        sameAs: [
          "https://www.facebook.com/capetownconcierge",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: brand.name,
        url: SITE_URL,
        telephone: brand.phone,
        email: brand.contactEmail,
        priceRange: "$$$$",
        image: `${SITE_URL}/images/hero-car.jpg`,
        logo: `${SITE_URL}/images/logo.png`,
        description:
          "Luxury chauffeur services, private tours, airport transfers, and curated travel experiences in Cape Town.",
        address: {
          "@type": "PostalAddress",
          addressLocality: brand.address.locality,
          addressRegion: brand.address.region,
          addressCountry: brand.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: brand.geo.lat,
          longitude: brand.geo.lng,
        },
        areaServed: [
          { "@type": "City", name: "Cape Town" },
          { "@type": "State", name: "Western Cape" },
        ],
        serviceType: ["Private Chauffeur Service", "Private Tours", "Airport Transfers"],
      },
      {
        "@type": "WebSite",
        name: brand.name,
        url: SITE_URL,
      },
      {
        "@type": "WebPage",
        name: "Luxury Chauffeur Service & Private Tours Cape Town | Cape Town Concierge",
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
          name: brand.name,
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
          name: brand.name,
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
        eyebrow={brand.name}
        title="Luxury Chauffeur Services in Cape Town"
        description="Premium airport transfers, private chauffeur services, and curated travel experiences designed for clients who value comfort, elegance, and reliability."
        primaryCtaLabel="Book on WhatsApp"
        primaryCtaHref="https://wa.me/27636746131?text=Hi%2C+I%27d+like+to+book+a+luxury+chauffeur+or+private+tour+in+Cape+Town.+Please+assist."
        secondaryCtaLabel="Explore Services"
        secondaryCtaHref="/chauffeur-services"
        image="/images/car.jpg"
        imageAlt="Luxury chauffeur fleet in Cape Town featuring premium private transport vehicles"
      />

      <div style={{ textAlign: "center", padding: "20px 20px 0" }}>
        <GoogleRatingBadge />
      </div>

      <TestimonialsSection />
      <TestimonialsCta />

      <FeaturedVehicles items={featuredVehicleItems} />

      <WhyChooseUs items={trustItems} />

      <ChauffeurAuthoritySection />

      <FeaturedExperiences items={featuredExperienceItems} />

      <HomepageEnquiryCollapsible />
    </>
  );
}