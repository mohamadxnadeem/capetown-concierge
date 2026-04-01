import type { Metadata } from "next";
import HeroBanner from "../../components/sections/HeroBanner";
import WhyChooseUs from "../../components/sections/WhyChooseUs";
import FeaturedVehicles from "../../components/sections/FeaturedVehicles";
import TestimonialsSection from "../../components/sections/testimonials/TestimonialsSection";
import TestimonialsCta from "../../components/sections/testimonials/TestimonialsCta";

const SITE_URL = "https://capetown-concierge.co.za";
const WHATSAPP =
  "https://wa.me/27636746131?text=Hi%2C%20I%27d%20like%20to%20book%20an%20airport%20transfer%20in%20Cape%20Town.%20Please%20can%20you%20assist%3F";

export const metadata: Metadata = {
  title: "Airport Transfers Cape Town | Luxury Private Chauffeur Service",
  description:
    "Book a luxury airport transfer in Cape Town. Professional chauffeur meets you at arrivals, handles your luggage, and delivers you in comfort. Available 24/7 for Cape Town International Airport. No hidden fees.",
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
    title: "Airport Transfers Cape Town | Luxury Private Chauffeur Service",
    description:
      "Professional airport transfers in Cape Town. Meet & greet at arrivals, luxury vehicles, 24/7 availability. Book via WhatsApp.",
    url: `${SITE_URL}/airport-transfers-cape-town`,
    siteName: "Cape Town Concierge",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/hero-car.jpg`,
        width: 1200,
        height: 630,
        alt: "Luxury airport transfer Cape Town with professional chauffeur service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Airport Transfers Cape Town | Luxury Private Chauffeur",
    description:
      "Meet & greet airport transfers in Cape Town. Luxury vehicles, professional drivers, 24/7. Book via WhatsApp.",
    images: [`${SITE_URL}/images/hero-car.jpg`],
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

    return items
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
          price: car.price ? `R${car.price}` : undefined,
        };
      })
      .filter((item): item is FeaturedVehicleItem => item !== null);
  } catch {
    return [];
  }
}

const whyItems = [
  {
    title: "Meet & Greet at Arrivals",
    description:
      "Your chauffeur tracks your flight in real time and meets you at the arrivals hall with a name board — no waiting, no confusion.",
  },
  {
    title: "24/7 Availability",
    description:
      "Early morning, late night, or midday — we operate around the clock for all Cape Town International Airport arrivals and departures.",
  },
  {
    title: "No Hidden Fees",
    description:
      "Your quoted price covers the vehicle, chauffeur, and fuel. Parking and toll fees are included. No surprises on arrival.",
  },
  {
    title: "Luxury Fleet for Every Group",
    description:
      "From executive sedans to the spacious Mercedes V-Class, we match the right vehicle to your group size and luggage requirements.",
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
              text: "Airport transfer pricing in Cape Town depends on your vehicle choice, pickup location, and drop-off destination. Contact us via WhatsApp for a fast, personalised quote — we typically respond within 30 minutes.",
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
              text: "Your transfer includes a professionally presented chauffeur, premium vehicle with fuel, flight tracking, meet and greet with name board, and luggage assistance. There are no hidden fees — parking and tolls are included.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <HeroBanner
        eyebrow="Airport Transfers Cape Town"
        title="Luxury Airport Transfers in Cape Town"
        description="Professional meet & greet at Cape Town International Airport. Your chauffeur tracks your flight, handles your luggage, and delivers you in comfort — 24/7, no hidden fees."
        primaryCtaLabel="Book Your Transfer"
        primaryCtaHref={WHATSAPP}
        image="/images/car.jpg"
        imageAlt="Luxury airport transfer Cape Town with professional chauffeur meet and greet service"
      />

      <TestimonialsSection />
      <TestimonialsCta />

      <FeaturedVehicles
        eyebrow="Transfer Fleet"
        title="Choose Your Airport Transfer Vehicle"
        description="Every vehicle comes with a professional chauffeur, flight tracking, and meet & greet at arrivals."
        items={vehicles}
      />

      <WhyChooseUs items={whyItems} />
    </>
  );
}
