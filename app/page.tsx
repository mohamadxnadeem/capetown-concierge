import type { Metadata } from "next";
import HeroBanner from "../components/sections/HeroBanner";
import ServiceTiles from "../components/sections/ServiceTiles";
import FeaturedVillas from "../components/sections/FeaturedVillas";
import FeaturedVehicles from "../components/sections/FeaturedVehicles";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import FeaturedExperiences from "../components/sections/FeaturedExperiences";
import TestimonialsSection from "../components/sections/testimonials/TestimonialsSection";
import TestimonialsCta from "../components/sections/testimonials/TestimonialsCta";
import HomepageEnquiryCollapsible from "../components/sections/HomepageEnquiryCollapsible";
import GoogleRatingBadge from "../components/common/GoogleRatingBadge";
import { fetchFeaturedVillas, getVillaPrimaryPhoto } from "../lib/villas";
import { brand } from "../lib/brand";

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
  is_active?: boolean;
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
            ? `/tours/${experience.slug}`
            : "/tours",
          image: featuredPhoto,
          alt: `Private ${experience.title} in Cape Town with Professional Driver`,
          priceUsd: expPriceUsd,
        };
      }
    );

    return mapped.filter(isFeaturedExperienceItem);
  } catch (error) {
    console.error("Error loading featured experiences:", error);
    return FALLBACK_EXPERIENCES;
  }
}

const FALLBACK_EXPERIENCES: FeaturedExperienceItem[] = [
  {
    title: "Cape Peninsula Private Tour",
    description: "Chapman's Peak, Boulders Beach penguins & Cape Point in one private full day. No shared groups, entirely at your pace.",
    href: "/tours/cape-peninsula-tour",
    image: "",
    alt: "Private Cape Peninsula Tour Cape Town with Professional Chauffeur",
  },
  {
    title: "Cape Winelands Private Tour",
    description: "Private chauffeur through Stellenbosch & Franschhoek. World-class wine estates, no timetables, no strangers.",
    href: "/tours/winelands-chauffeur-drive",
    image: "",
    alt: "Private Cape Winelands Tour Stellenbosch Franschhoek Chauffeur",
  },
  {
    title: "Cape Town City Private Tour",
    description: "Table Mountain, Bo-Kaap, Camps Bay & the V&A Waterfront with a dedicated private driver. Fully flexible itinerary.",
    href: "/tours/cape-town-city-tour",
    image: "",
    alt: "Private Cape Town City Tour with Chauffeur Driver",
  },
];

const FALLBACK_VEHICLES: FeaturedVehicleItem[] = [
  {
    title: "Range Rover Sport Chauffeur",
    description: "Bold, refined and fully private. Ideal for couples and executives who want presence on the road.",
    href: "/chauffeur-hire/range-rover-sport-chauffeur-service-cape-town",
    image: "",
    alt: "Range Rover Sport Chauffeur Service Cape Town",
  },
  {
    title: "Mercedes V-Class Private Chauffeur",
    description: "Six-seat luxury people carrier for families, VIP groups and executive travel across Cape Town.",
    href: "/chauffeur-hire/mercedes-v-class-private-chauffeur-service",
    image: "",
    alt: "Mercedes V-Class Private Chauffeur Cape Town",
  },
  {
    title: "BMW X5 Chauffeur Cape Town",
    description: "Premium SUV with elevated ride quality. Perfect for airport transfers, day tours and small groups.",
    href: "/chauffeur-hire/bmw-x5-for-hire-with-driver",
    image: "",
    alt: "BMW X5 Chauffeur Cape Town with Driver",
  },
];

async function getFeaturedVehicles(): Promise<FeaturedVehicleItem[]> {
  try {
    const response = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
      { next: { revalidate: 300 } }
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
            ? `/chauffeur-hire/${car.slug.trim()}`
            : "/chauffeur-hire";

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
    return FALLBACK_VEHICLES;
  }
}

export default async function HomePage() {
  const [featuredVehicleItems, featuredExperienceItems, villas] =
    await Promise.all([
      getFeaturedVehicles(),
      getFeaturedExperiences(),
      fetchFeaturedVillas().catch(() => []),
    ]);

  // Cover images for the service tiles — pull from real CMS data, fall
  // back to bundled assets if a category has none yet.
  const villaTileImages = villas
    .slice(0, 4)
    .map((v) => getVillaPrimaryPhoto(v))
    .filter((u): u is string => Boolean(u));
  const vehicleTileImages = featuredVehicleItems
    .slice(0, 4)
    .map((v) => v.image)
    .filter((u): u is string => Boolean(u));
  const tourTileImages = featuredExperienceItems
    .slice(0, 4)
    .map((t) => t.image)
    .filter((u): u is string => Boolean(u));

  const serviceTiles = [
    {
      href: "/villas",
      eyebrow: "Stay",
      title: "Luxury Villas",
      description:
        "Hand-picked villas in Camps Bay, Clifton, Constantia and the Winelands — concierge from arrival to departure.",
      images: villaTileImages.length ? villaTileImages : ["/images/hero-image.jpg"],
      alt: "Luxury Cape Town villa rentals with concierge service",
    },
    {
      href: "/chauffeur-hire",
      eyebrow: "Drive",
      title: "Chauffeur Hire",
      description:
        "Hourly, daily, and multi-day private chauffeur hire in a Mercedes, Range Rover, or BMW with a professional driver.",
      images: vehicleTileImages.length ? vehicleTileImages : ["/images/car.jpg"],
      alt: "Private chauffeur hire in Cape Town with luxury vehicle and driver",
    },
    {
      href: "/tours",
      eyebrow: "Explore",
      title: "Day Tours",
      description:
        "Curated private day tours — Cape Point, Winelands, Table Mountain — entirely at your own pace.",
      images: tourTileImages.length ? tourTileImages : ["/images/hero-car.jpg"],
      alt: "Private day tours in Cape Town with chauffeur guide",
    },
  ];

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
        title="Cape Town's luxury concierge — villas, chauffeurs, and curated day tours."
        description="A single team that plans, books, and runs the whole trip. Villas in the city's best addresses, private chauffeur hire in luxury vehicles, and concierge-led day tours of Cape Town and the Winelands."
        primaryCtaLabel="Chat on WhatsApp"
        primaryCtaHref="https://wa.me/27636746131?text=Hi%2C+I%27d+like+to+plan+a+stay+with+Cape+Town+Concierge.+Please+assist."
        secondaryCtaLabel="Explore villas"
        secondaryCtaHref="/villas"
        image="/images/car.jpg"
        imageAlt="Cape Town Concierge — luxury villas, chauffeur hire and private day tours"
      />

      <ServiceTiles tiles={serviceTiles} />

      <div style={{ textAlign: "center", padding: "20px 20px 0" }}>
        <GoogleRatingBadge />
      </div>

      <FeaturedVillas villas={villas} />

      <FeaturedVehicles items={featuredVehicleItems} />

      <FeaturedExperiences items={featuredExperienceItems} />

      <WhyChooseUs items={trustItems} />

      <TestimonialsSection />
      <TestimonialsCta />

      <HomepageEnquiryCollapsible />
    </>
  );
}