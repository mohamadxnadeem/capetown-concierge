import type { Metadata } from "next";
import HeroBanner from "../components/sections/HeroBanner";
import ServiceTiles from "../components/sections/ServiceTiles";
import FeaturedVehicles from "../components/sections/FeaturedVehicles";
import FeaturedExperiences from "../components/sections/FeaturedExperiences";
import HomepageMultiDay from "../components/sections/HomepageMultiDay";
import AirportTransfersTeaser from "../components/sections/AirportTransfersTeaser";
import HowWeWork from "../components/sections/HowWeWork";
import BeyondTheDrive from "../components/sections/BeyondTheDrive";
import TestimonialsSection from "../components/sections/testimonials/TestimonialsSection";
import TestimonialsCta from "../components/sections/testimonials/TestimonialsCta";
import HomepageEnquiryCollapsible from "../components/sections/HomepageEnquiryCollapsible";
import GoogleRatingBadge from "../components/common/GoogleRatingBadge";
import { fetchItineraryWeeklyVehicles } from "../lib/vehicles";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { brand } from "../lib/brand";

const SITE_URL = brand.siteUrl;

const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

const HOMEPAGE_META_DESCRIPTION =
  "Private chauffeur hire and guided touring in Cape Town. One vehicle, one driver, for a transfer or for a fortnight. Priced per vehicle, not per person. Book on WhatsApp.";

export const metadata: Metadata = {
  title: "Luxury Chauffeur Service Cape Town | Cape Town Concierge",
  description: HOMEPAGE_META_DESCRIPTION,
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
    description: HOMEPAGE_META_DESCRIPTION,
    url: SITE_URL,
    siteName: brand.name,
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Cape Town Concierge, private chauffeur hire and guided touring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Chauffeur Service Cape Town | Cape Town Concierge",
    description: HOMEPAGE_META_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const HERO_WA_MESSAGE =
  "Hi, I'd like a private chauffeur in Cape Town. My dates and group size are";

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
  const [featuredVehicleItems, featuredExperienceItems, weeklyVehicles] =
    await Promise.all([
      getFeaturedVehicles(),
      getFeaturedExperiences(),
      fetchItineraryWeeklyVehicles().catch(() => []),
    ]);

  const vehicleTileImages = featuredVehicleItems
    .slice(0, 4)
    .map((v) => v.image)
    .filter((u): u is string => Boolean(u));
  const tourTileImages = featuredExperienceItems
    .slice(0, 4)
    .map((t) => t.image)
    .filter((u): u is string => Boolean(u));

  const heroRotationImages: string[] = [];
  const maxRotation = Math.max(vehicleTileImages.length, tourTileImages.length);
  for (let i = 0; i < maxRotation; i++) {
    if (vehicleTileImages[i]) heroRotationImages.push(vehicleTileImages[i]);
    if (tourTileImages[i]) heroRotationImages.push(tourTileImages[i]);
  }

  const serviceTiles = [
    {
      href: "/chauffeur-hire",
      eyebrow: "Drive",
      title: "Chauffeur Hire",
      description:
        "One vehicle, one driver, for a transfer or a full week. Priced per vehicle, not per person.",
      images: vehicleTileImages.length ? vehicleTileImages : ["/images/car.jpg"],
      alt: "Private chauffeur hire in Cape Town with a professional driver",
    },
    {
      href: "/airport-transfers-cape-town",
      eyebrow: "Arrive",
      title: "Airport Transfers",
      description:
        "Meet-and-greet at CPT, flight tracking, and one flat price. 24 hours a day.",
      images: vehicleTileImages.length ? vehicleTileImages : ["/images/car.jpg"],
      alt: "Cape Town International airport transfers with a private driver",
    },
    {
      href: "/tours",
      eyebrow: "Explore",
      title: "Day Tours",
      description:
        "Cape Point, the Winelands, Table Mountain. Full day, private, at your own pace.",
      images: tourTileImages.length ? tourTileImages : ["/images/hero-car.jpg"],
      alt: "Private day tours in Cape Town with a chauffeur guide",
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
          "Private chauffeur hire and guided touring in Cape Town. Airport transfers, day tours, and multi-day charters priced per vehicle.",
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
          "Private chauffeur hire and guided touring in Cape Town. Airport transfers, day tours, and multi-day charters priced per vehicle.",
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
        name: "Luxury Chauffeur Service Cape Town | Cape Town Concierge",
        url: SITE_URL,
        description:
          "Private chauffeur hire and guided touring in Cape Town. Airport transfers, full-day tours, and multi-day packages with the same driver and vehicle throughout.",
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
              text: "Every booking includes the vehicle, a PDP-licensed driver, fuel, tolls, and route planning. Airport transfers are quoted as a flat fare. Attraction entry and meals are billed separately and we can arrange those for you.",
            },
          },
          {
            "@type": "Question",
            name: "Can I customise my Cape Town chauffeur itinerary?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Every day is built around your dates and preferences: airport transfers, city days, Cape Peninsula, the Winelands, or a full week with the same vehicle and driver throughout.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer airport transfers in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Private transfers to and from Cape Town International, 24 hours a day. Your driver tracks the flight and meets you at Arrivals with a name board. One flat price per vehicle, no surge.",
            },
          },
          {
            "@type": "Question",
            name: "Is your chauffeur service safe and reliable?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Every driver is PDP licensed and personally vetted. We do not dispatch from a pool. One client per vehicle per day, so nobody is squeezed in around another booking.",
            },
          },
          {
            "@type": "Question",
            name: "What vehicles are available for private chauffeur service in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The fleet includes an executive Audi, BMW X5, Range Rover Sport, Mercedes V-Class, and Hyundai Staria for larger groups. Full daily rates and package pricing are on the chauffeur hire page.",
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
          "Private chauffeur hire in Cape Town for airport transfers, day touring, and multi-day charters. One vehicle and one driver, priced per vehicle rather than per person.",
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
          "Private full-day tours in Cape Town including the Cape Peninsula, the Winelands, Table Mountain, and coastal routes. Driven by your chauffeur, at your own pace.",
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
        title="Private chauffeur hire and guided touring in Cape Town"
        description="One vehicle, one driver, for a transfer or for a fortnight. Your chauffeur knows the roads, the routes and the city, and through him everything else gets arranged. Priced per vehicle, not per person."
        primaryCtaLabel="Chat on WhatsApp"
        primaryCtaHref={buildWhatsAppLink(HERO_WA_MESSAGE)}
        secondaryCtaLabel="See the Fleet"
        secondaryCtaHref="#fleet"
        image="/images/car.jpg"
        images={heroRotationImages}
        imageAlt="Cape Town Concierge, private chauffeur hire and guided touring"
      />

      <ServiceTiles tiles={serviceTiles} />

      <div style={{ textAlign: "center", padding: "20px 20px 0" }}>
        <GoogleRatingBadge />
      </div>

      <div id="fleet">
        <FeaturedVehicles
          items={featuredVehicleItems}
          eyebrow="The Fleet"
          title="Vehicles for private chauffeur hire in Cape Town"
          description="A small fleet, kept immaculate, driven by the same team every day. Pick the size that fits the group and the rest follows."
        />
      </div>

      <HomepageMultiDay vehicles={weeklyVehicles} />

      <AirportTransfersTeaser />

      <HowWeWork />

      <FeaturedExperiences
        items={featuredExperienceItems}
        eyebrow="Most Popular"
        title="Most Popular Day Tours in Cape Town"
        description="Full-day private tours, driven by your chauffeur, at your own pace. Pick a route, we handle everything else."
      />

      <BeyondTheDrive />

      <TestimonialsSection />
      <TestimonialsCta />

      <HomepageEnquiryCollapsible />
    </>
  );
}