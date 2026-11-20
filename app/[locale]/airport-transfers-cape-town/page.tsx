import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "../../../lib/brand";
import { businessRef, vehicleHref } from "../../../lib/seo";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import HeroBanner from "../../../components/sections/HeroBanner";
import WhyChooseUs from "../../../components/sections/WhyChooseUs";
import FeaturedVehicles from "../../../components/sections/FeaturedVehicles";
import FaqSection from "../../../components/sections/FaqSection";
import TestimonialsSection from "../../../components/sections/testimonials/TestimonialsSection";
import TestimonialsCta from "../../../components/sections/testimonials/TestimonialsCta";
import { localizeMetadata } from "../../../lib/i18n/metadata";
import { localeFromParam } from "../../../lib/i18n/config";
import { withInLanguage } from "../../../lib/seo";

import { serverT, setRequestLocale } from "../../../lib/i18n/server";
import type { TFunction } from "../../../lib/i18n/messages";
const SITE_URL = brand.siteUrl;
const WHATSAPP = "https://wa.me/27636746131?text=Hi%2C+I%27d+like+to+book+an+airport+transfer+in+Cape+Town.+Please+assist.";

const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

const baseMetadata: Metadata = {
  title: "Private Airport Transfers Cape Town (CPT) | Meet & Greet",
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
    title: "Private Airport Transfers Cape Town (CPT) | Meet & Greet",
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
        alt: "Cape Town Concierge private airport transfers in Cape Town",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Airport Transfers Cape Town (CPT) | Meet & Greet",
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

const AIRPORT_VEHICLE_DESC = (tt: TFunction): Record<string, string> => ({
    "BMW X5": tt("airport-transfers-cape-town.a-luxury-suv-with-a"),
});

async function getVehicles(tt: TFunction): Promise<FeaturedVehicleItem[]> {
  try {
    const res = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
      { next: { revalidate: 300 } }
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
          (car.title === "Hyundai Staria" && car.number_of_seats
            ? tt("airport-transfers-cape-town.a-premium-seat-people-carrier", { number_of_seats: car.number_of_seats })
            : undefined) ||
          AIRPORT_VEHICLE_DESC(tt)[car.title] ||
          car.short_description ||
          car.highlight ||
          truncateText(plainText, 140) ||
          tt("airport-transfers-cape-town.luxury-chauffeur-vehicle-available-for");
        return {
          title: car.title,
          description,
          href: vehicleHref(car.slug),
          image,
          alt: tt("airport-transfers-cape-town.airport-transfer-cape-town", { title: car.title }),
          seats: car.number_of_seats,
          priceUsd: car.price ? Number(String(car.price).replace(/[^0-9.]/g, "")) || undefined : undefined,
        };
      }) as Array<FeaturedVehicleItem | null>)
      .filter((item): item is FeaturedVehicleItem => item !== null);
  } catch {
    return [];
  }
}

const whyItems = (tt: TFunction) => ([
  {
    title: tt("airport-transfers-cape-town.meet-greet-at-arrivals"),
    description:
      tt("airport-transfers-cape-town.your-chauffeur-tracks-your-flight"),
  },
  {
    title: tt("airport-transfers-cape-town.24-7-availability"),
    description:
      tt("airport-transfers-cape-town.early-morning-last-flight-of"),
  },
  {
    title: tt("airport-transfers-cape-town.no-hidden-fees"),
    description:
      tt("airport-transfers-cape-town.your-quoted-price-covers-the"),
  },
  {
    title: tt("airport-transfers-cape-town.the-right-vehicle-for-your"),
    description:
      tt("airport-transfers-cape-town.from-executive-sedans-for-solo"),
  },
]);

export default async function AirportTransfersCapeTownPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeFromParam(localeParam);
  setRequestLocale(locale);
  const tt = serverT();
  const vehicles = await getVehicles(tt);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Private Airport Transfers Cape Town (CPT) | Meet & Greet",
        url: `${SITE_URL}/airport-transfers-cape-town`,
        description:
          "Book a luxury airport transfer in Cape Town. Professional chauffeur, meet & greet at arrivals, 24/7 availability.",
        image: [`${SITE_URL}/images/hero-car.jpg`],
      },
      {
        "@type": "Service",
        name: "Airport Transfers Cape Town",
        serviceType: "Airport Transfer",
        provider: businessRef,
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
            name: "How much does an airport transfer in Cape Town cost?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Airport transfer pricing in Cape Town depends on your vehicle choice, pickup location, and drop-off destination. Contact us via WhatsApp for a fast, personalised quote. We typically respond within 30 minutes.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer meet and greet at Cape Town International Airport?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Your chauffeur tracks your flight in real time and meets you in the arrivals hall with a name board. They will assist with your luggage and escort you directly to the vehicle.",
            },
          },
          {
            "@type": "Question",
            name: "Are your Cape Town airport transfers available 24 hours?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We operate 24 hours a day, 7 days a week, including early morning, late night, and public holiday flights. Early bookings are recommended for early morning departures.",
            },
          },
          {
            "@type": "Question",
            name: "What vehicles are available for airport transfers in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our airport transfer fleet includes the BMW X5, Mercedes V-Class, Range Rover Sport, and other premium vehicles. We match the vehicle to your group size and luggage requirements.",
            },
          },
          {
            "@type": "Question",
            name: "What is included in a Cape Town airport transfer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Your transfer includes a professionally presented chauffeur, premium vehicle with fuel, flight tracking, meet and greet with name board, and luggage assistance. There are no hidden fees, and parking and tolls are included.",
            },
          },
          {
            "@type": "Question",
            name: "How do I book an airport transfer in Cape Town?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The fastest way is via WhatsApp. Share your flight details, arrival time, and destination and we will confirm availability and pricing within 30 minutes. Same-day bookings are welcomed.",
            },
          },
          {
            "@type": "Question",
            name: "Do you offer airport transfers from Cape Town to Stellenbosch or Franschhoek?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We offer airport transfers to all major destinations including Stellenbosch, Franschhoek, Constantia, the Atlantic Seaboard, the City Bowl, and all surrounding areas. Long-distance transfers are also available.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withInLanguage(structuredData, locale)) }}
      />

      <HeroBanner
        eyebrow="Airport Transfers Cape Town (CPT)"
        title={tt("airport-transfers-cape-town.private-vip-airport-transfers-in")}
        description="Private airport transfers to and from Cape Town International (CPT). Your driver meets you at arrivals, tracks your flight in real time, and has you at your hotel in a premium vehicle, without the queues, the metered taxis, or the guesswork."
        primaryCtaLabel="Book Your Transfer"
        primaryCtaHref={WHATSAPP}
        image="/images/car.jpg"
        imageAlt="Luxury airport transfer Cape Town with professional chauffeur meet and greet service"
      />

      <TestimonialsSection tags={["airport-transfers"]} />
      <TestimonialsCta />

      <FeaturedVehicles
        eyebrow="Transfer Fleet"
        title={tt("airport-transfers-cape-town.choose-your-airport-transfer-vehicle")}
        description="Every vehicle comes with a professional chauffeur, flight tracking, and meet & greet at arrivals."
        items={vehicles}
      />
      <div style={{textAlign:"center",padding:"0 0 24px",fontSize:"0.9rem",color:"#6c7a74"}}>
        {tt("airport-transfers-cape-town.need-a-driver-beyond-the")}{" "}<Link href={tt.path("/chauffeur-hire")} style={{color:"inherit",textDecoration:"underline"}}>{tt("airport-transfers-cape-town.hire-a-private-driver")}</Link> {tt("airport-transfers-cape-town.across-the-day-week-or")}</div>

      <WhyChooseUs
        eyebrow="Why Choose Us"
        title={tt("airport-transfers-cape-town.premium-airport-transfers-built-around")}
        items={whyItems(tt)}
      />

      <FaqSection
        eyebrow="Airport Transfer FAQ"
        title={tt("airport-transfers-cape-town.common-questions-about-airport-transfers")}
        items={[
          {
            question: "Where will my driver meet me at Cape Town International Airport?",
            answer:
              "Your chauffeur will be waiting in the arrivals hall with a name board. Exact meeting point details are included in your booking confirmation.",
          },
          {
            question: "What happens if my flight is delayed?",
            answer:
              "We track your flight in real time. If your flight is delayed, your chauffeur will adjust their arrival time accordingly, at no extra charge.",
          },
          {
            question: "How far is Cape Town Airport from the city centre?",
            answer:
              "Cape Town International Airport is approximately 20km from the city centre, typically a 20 to 30 minute drive depending on traffic.",
          },
          {
            question: "Is payment required upfront?",
            answer:
              "Yes, payment is confirmed at the time of booking. Your quoted price is fixed and inclusive. No surprises on the day.",
          },
          {
            question: "Can I book a return airport transfer at the same time?",
            answer:
              "Yes. When you message us on WhatsApp, let us know your outbound and return flight details and we'll arrange both transfers together.",
          },
          {
            question: "Do you offer child seats?",
            answer:
              "Yes, child seats can be arranged on request. Please mention this when making your booking so we can prepare the right vehicle.",
          },
        ]}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localizeMetadata(baseMetadata, locale, { path: "/airport-transfers-cape-town" });
}
