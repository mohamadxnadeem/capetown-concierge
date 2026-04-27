import type { Metadata } from "next";
import { brand } from "../../lib/brand";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import dynamic from "next/dynamic";
import HeroBanner from "../../components/sections/HeroBanner";
import FeaturedVehicles from "../../components/sections/FeaturedVehicles";

const WhyChooseUs = dynamic(() => import("../../components/sections/WhyChooseUs"));
const FaqSection = dynamic(() => import("../../components/sections/FaqSection"));
const TestimonialsSection = dynamic(() => import("../../components/sections/testimonials/TestimonialsSection"));
const TestimonialsCta = dynamic(() => import("../../components/sections/testimonials/TestimonialsCta"));

const SITE_URL = brand.siteUrl;
const WHATSAPP = "https://wa.me/27636746131?text=Hi%2C+I%27d+like+to+book+an+airport+transfer+in+Cape+Town.+Please+assist.";

const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

export const metadata: Metadata = {
  title: "Airport Transfers Cape Town | Luxury Meet & Greet",
  description:
    "Private luxury airport transfers to & from Cape Town International. Flight tracking, meet & greet, 24/7 availability. Get an instant quote on WhatsApp.",
  alternates: {
    canonical: `${SITE_URL}/airport-transfers-cape-town`,
  },
  keywords: [
    "airport transfers Cape Town",
    "Cape Town airport transfer",
    "Cape Town International Airport transfer",
    "luxury airport transfer Cape Town",
    "private airport transfer Cape Town",
    "chauffeur airport Cape Town",
    "airport pickup Cape Town",
  ],
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
    title: "Airport Transfers Cape Town | Luxury Meet & Greet",
    description:
      "Private luxury airport transfers to & from Cape Town International. Flight tracking, meet & greet, 24/7 availability. Get an instant quote on WhatsApp.",
    url: `${SITE_URL}/airport-transfers-cape-town`,
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
    title: "Airport Transfers Cape Town | Luxury Meet & Greet",
    description:
      "Private luxury airport transfers to & from Cape Town International. Flight tracking, meet & greet, 24/7 availability. Get an instant quote on WhatsApp.",
    images: [OG_IMAGE],
  },
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

const AIRPORT_VEHICLE_DESC: Record<string, string> = {
  "Hyundai Staria": "A premium 8-seat people carrier with generous legroom — perfect for families or groups arriving with luggage who want a spacious, comfortable ride into the city.",
  "BMW X5": "A luxury SUV with a refined interior and serious boot space — ideal for couples or small groups who want a more elevated arrival experience.",
};

async function getVehicles(): Promise<FeaturedVehicleItem[]> {
  try {
    const res = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const items: CarsApiItem[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
      ? data.results
      : [];

    return (items
      .map((item) => {
        const car = item?.car || item;
        if (!car?.title) return null;
        const imageArray = car.cover_photos || car.images || [];
        const image =
          imageArray.find((p: CarPhoto) => p?.is_featured)?.cover_photos ||
          imageArray[0]?.cover_photos ||
          "";
        const plainText = stripHtml(car.body || "");
        const description =
          AIRPORT_VEHICLE_DESC[car.title] ||
          car.short_description ||
          car.highlight ||
          truncateText(plainText, 140) ||
          "Luxury chauffeur vehicle available for airport transfers in Cape Town.";
        return {
          title: car.title,
          description,
          href: car.slug ? `/chauffeur-services/${car.slug}` : "/chauffeur-services",
          image,
          alt: `${car.title} airport transfer Cape Town`,
          seats: car.number_of_seats,
          priceUsd: car.price ? Number(String(car.price).replace(/[^0-9.]/g, "")) || undefined : undefined,
        };
      }) as Array<FeaturedVehicleItem | null>)
      .filter((item): item is FeaturedVehicleItem => item !== null);
  } catch {
    return [];
  }
}

const whyItems = [
  {
    title: "Meet & Greet at Arrivals",
    description:
      "Your chauffeur tracks your flight in real time and meets you in the arrivals hall with a name board — no waiting around trying to find your ride.",
  },
  {
    title: "24/7 Availability",
    description:
      "Early morning, last flight of the night, or anything in between — we operate around the clock for all Cape Town International arrivals and departures.",
  },
  {
    title: "No Hidden Fees",
    description:
      "Your quoted price covers the vehicle, chauffeur, fuel, parking, and toll fees. What you see is what you pay — no surprises after a long flight.",
  },
  {
    title: "The Right Vehicle for Your Group",
    description:
      "From executive sedans for solo travellers to the 14-seat Mercedes Sprinter for large groups — we match the vehicle to your party size and luggage. Just tell us what you need.",
  },
];

export default async function AirportTransfersCapeTownPage() {
  const vehicles = await getVehicles();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Airport Transfers Cape Town | Luxury Private Chauffeur Service",
        url: `${SITE_URL}/airport-transfers-cape-town`,
        description:
          "Book a luxury airport transfer in Cape Town. Professional chauffeur, meet & greet at arrivals, 24/7 availability.",
        image: [`${SITE_URL}/images/hero-car.jpg`],
      },
      {
        "@type": "Service",
        name: "Airport Transfers Cape Town",
        serviceType: "Airport Transfer",
        provider: {
          "@type": "LocalBusiness",
          name: brand.name,
          url: SITE_URL,
          telephone: brand.phone,
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
          priceRange: "$$$$",
        },
        areaServed: [
          { "@type": "City", name: "Cape Town" },
          { "@type": "Airport", name: "Cape Town International Airport" },
        ],
        image: [`${SITE_URL}/images/hero-car.jpg`],
        description:
          "Luxury airport transfer service in Cape Town. Professional chauffeur meets you at arrivals with a name board, assists with luggage, and transfers you in a premium vehicle. Available 24/7.",
        url: `${SITE_URL}/airport-transfers-cape-town`,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Do you track flights for airport transfers in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We monitor your flight in real time and adjust your driver's arrival time automatically if your flight is early or delayed. You do not need to contact us — we handle it.",
            },
          },
          {
            "@type": "Question",
            name: "What is included in a Cape Town airport transfer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Your transfer includes a professional meet and greet at arrivals with a name board, luggage assistance, real-time flight tracking, and door-to-door delivery to your accommodation. No hidden fees.",
            },
          },
          {
            "@type": "Question",
            name: "How far in advance should I book an airport transfer in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We recommend booking at least 24 hours in advance, though we can often accommodate same-day requests. Message us on WhatsApp to check availability.",
            },
          },
          {
            "@type": "Question",
            name: "What happens if my flight is delayed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We monitor your flight and automatically adjust. Your driver will be there when you land, not when you were originally scheduled to land. There is no additional charge for flight delays.",
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
            name: "Airport Transfers Cape Town",
            item: `${SITE_URL}/airport-transfers-cape-town`,
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
        eyebrow="Airport Transfers Cape Town"
        title="Luxury Airport Transfers in Cape Town"
        description="Your chauffeur meets you at arrivals, tracks your flight in real time, and has you at your hotel in a premium vehicle — without the queues, the metered taxis, or the guesswork."
        primaryCtaLabel="Book Your Transfer"
        primaryCtaHref={WHATSAPP}
        image="/images/car.jpg"
        imageAlt="Luxury airport transfer Cape Town with professional chauffeur meet and greet service"
      />

      <TestimonialsSection pinnedNames={["Achmat", "Jones", "Mampuru"]} />
      <TestimonialsCta />

      <FeaturedVehicles
        eyebrow="Transfer Fleet"
        title="Choose Your Airport Transfer Vehicle"
        description="Every vehicle comes with a professional chauffeur, flight tracking, and meet & greet at arrivals."
        items={vehicles}
      />
      <div style={{textAlign:"center",padding:"0 0 24px",fontSize:"0.9rem",color:"#6c7a74"}}>
        Also available for <a href="/chauffeur-services" style={{color:"inherit",textDecoration:"underline"}}>full-day chauffeur hire</a> across Cape Town.
      </div>

      <WhyChooseUs
        eyebrow="Why Choose Us"
        title="Premium Airport Transfers Built Around You"
        items={whyItems}
      />

      <FaqSection
        eyebrow="Airport Transfer FAQ"
        title="Common Questions About Airport Transfers in Cape Town"
        items={[
          {
            question: "Do you track flights for airport transfers in Cape Town?",
            answer:
              "Yes. We monitor your flight in real time and adjust your driver's arrival time automatically if your flight is early or delayed. You do not need to contact us — we handle it.",
          },
          {
            question: "What is included in a Cape Town airport transfer?",
            answer:
              "Your transfer includes a professional meet and greet at arrivals with a name board, luggage assistance, real-time flight tracking, and door-to-door delivery to your accommodation. No hidden fees.",
          },
          {
            question: "How far in advance should I book an airport transfer in Cape Town?",
            answer:
              "We recommend booking at least 24 hours in advance, though we can often accommodate same-day requests. Message us on WhatsApp to check availability.",
          },
          {
            question: "What happens if my flight is delayed?",
            answer:
              "We monitor your flight and automatically adjust. Your driver will be there when you land, not when you were originally scheduled to land. There is no additional charge for flight delays.",
          },
        ]}
      />
    </>
  );
}
