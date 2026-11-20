import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "../../../lib/brand";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import HeroBanner from "../../../components/sections/HeroBanner";
import FeaturedExperiences from "../../../components/sections/FeaturedExperiences";
import TestimonialsSection from "../../../components/sections/testimonials/TestimonialsSection";
import TestimonialsCta from "../../../components/sections/testimonials/TestimonialsCta";
import WhyChooseUs from "../../../components/sections/WhyChooseUs";
import Breadcrumbs from "../../../components/common/Breadcrumbs";
import RelatedLinks from "../../../components/common/RelatedLinks";
import { TourHubIntro, TourHubFaq } from "../../../components/sections/tours-hub/TourHubSections";
import { HUB_FAQS, HUB_LINKS } from "../../../lib/tourHub";
import { TOUR_ORDER, TOUR_SEO, getTourSeo } from "../../../lib/tourSeo";
import { localizeMetadata } from "../../../lib/i18n/metadata";
import { localeFromParam } from "../../../lib/i18n/config";
import { withInLanguage } from "../../../lib/seo";

import { serverT, setRequestLocale } from "../../../lib/i18n/server";
import { enT } from "../../../lib/i18n/messages";
import type { TFunction } from "../../../lib/i18n/messages";
const SITE_URL = brand.siteUrl;

const TITLE =
  "Best Private Tours in Cape Town | Cape Point, Winelands, Safari and City";
const DESCRIPTION =
  "Compare the best private tours in Cape Town: Cape Point, Winelands, city and Table Mountain, and a Big 5 safari. Your own chauffeur. Book on WhatsApp.";

const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

const baseMetadata: Metadata = {
  title: TITLE,
  description:
    DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/tours`,
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
    title: TITLE,
    description:
      DESCRIPTION,
    url: `${SITE_URL}/tours`,
    siteName: brand.name,
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Cape Town Concierge, luxury private chauffeur tours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description:
      DESCRIPTION,
    images: [OG_IMAGE],
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

function formatApiPrice(price?: string | number, tt: TFunction = enT): string | undefined {
  if (!price && price !== 0) return undefined;
  const num = Number(String(price).replace(/[^0-9.]/g, ""));
  if (isNaN(num) || num === 0) return undefined;
  return tt("tours.from-per-day", { num: Math.round(num) });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

async function getAllExperiences(tt: TFunction): Promise<FeaturedExperienceItem[]> {
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
          tt("tours.discover-a-premium-private-tour");

        const seo = getTourSeo(exp.slug);

        return {
          title: seo?.cardName || exp.title,
          description,
          href: exp.slug ? `/tours/${exp.slug}` : "/tours",
          image: featuredPhoto,
          alt: seo?.imageAlt || tt("tours.private-from-cape-town-with", { title: exp.title }),
          price: formatApiPrice(exp.price, tt),
        };
      }) as Array<FeaturedExperienceItem | null>)
      .filter((item): item is FeaturedExperienceItem => item !== null)
      .sort((a, b) => {
        const rank = (href: string) => {
          const i = TOUR_ORDER.indexOf(href.replace("/tours/", ""));
          return i === -1 ? 99 : i;
        };
        return rank(a.href) - rank(b.href);
      });
  } catch {
    return [];
  }
}

async function getLowestVehiclePrice(): Promise<number | undefined> {
  try {
    const res = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return undefined;
    const data = await res.json();
    const items: Array<{ car?: { price?: string | number }; price?: string | number }> =
      Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
    const prices = items
      .map((item) => Number(String((item.car || item)?.price ?? "").replace(/[^0-9.]/g, "")))
      .filter((n) => n > 0 && !isNaN(n))
      .sort((a, b) => a - b);
    return prices[0] ? Math.round(prices[0]) : undefined;
  } catch {
    return undefined;
  }
}

const whyItems = (tt: TFunction) => ([
  {
    title: tt("tours.fully-private-experiences"),
    description:
      tt("tours.every-tour-is-exclusively-yours"),
  },
  {
    title: tt("tours.bespoke-itineraries"),
    description:
      tt("tours.we-shape-each-tour-around"),
  },
  {
    title: tt("tours.professional-local-knowledge"),
    description:
      tt("tours.our-chauffeurs-know-cape-town"),
  },
  {
    title: tt("tours.luxury-transport-included"),
    description:
      tt("tours.all-tours-include-a-premium"),
  },
]);

export default async function PrivateToursLandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeFromParam(localeParam);
  setRequestLocale(locale);
  const tt = serverT();
  const [experiences, lowestVehiclePrice] = await Promise.all([
    getAllExperiences(tt),
    getLowestVehiclePrice(),
  ]);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/tours#webpage`,
        name: TITLE,
        url: `${SITE_URL}/tours`,
        description: DESCRIPTION,
        image: [`${SITE_URL}/images/hero-car.jpg`],
        breadcrumb: { "@id": `${SITE_URL}/tours#breadcrumb` },
        mainEntity: { "@id": `${SITE_URL}/tours#itemlist` },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/tours#itemlist`,
        name: "Private tours in Cape Town",
        numberOfItems: TOUR_ORDER.length,
        itemListElement: TOUR_ORDER.map((slug, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: TOUR_SEO[slug].cardName,
          url: `${SITE_URL}/tours/${slug}`,
        })),
      },
      {
        "@type": "Service",
        name: "Best Private Tours in Cape Town",
        serviceType: "Private Chauffeur Tours",
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
          { "@type": "State", name: "Western Cape" },
        ],
        image: [`${SITE_URL}/images/hero-car.jpg`],
        description:
          "Private chauffeur-driven tours in Cape Town: Cape Point and the Cape Peninsula, the Cape Winelands, a city and Table Mountain day, and a Big 5 safari day trip.",
        url: `${SITE_URL}/tours`,
      },
      {
        "@type": "FAQPage",
        mainEntity: HUB_FAQS(tt).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/tours#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Tours", item: `${SITE_URL}/tours` },
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
        eyebrow="Private Tours Cape Town"
        title={tt("tours.best-private-tours-in-cape")}
        description="The best things to do in Cape Town, done privately: Cape Point, the Winelands, Table Mountain and a Big 5 safari, with your own chauffeur."
        primaryCtaLabel="Explore Tours"
        primaryCtaHref="#compare"
        secondaryCtaLabel="Book via WhatsApp"
        secondaryCtaHref="https://wa.me/27636746131?text=Hi%2C+I%27d+like+to+book+a+luxury+chauffeur+or+private+tour+in+Cape+Town.+Please+assist."
        image="/images/car.jpg"
        images={experiences
          .slice(0, 6)
          .map((e) => e.image)
          .filter((u): u is string => Boolean(u))}
        imageAlt="Luxury chauffeur-driven vehicle on a private tour in Cape Town"
      />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tours" }]} />
      <TourHubIntro lowestVehiclePrice={lowestVehiclePrice} />

      <TestimonialsSection tags={["tours"]} />
      <TestimonialsCta />
      <div style={{textAlign:"center",padding:"8px 0 4px",fontSize:"0.9rem",color:"#6c7a74"}}>
        {tt("tours.also-need-an")}{" "}<Link href={tt.path("/airport-transfers-cape-town")} style={{color:"inherit",textDecoration:"underline"}}>{tt("tours.airport-transfer")}</Link> {tt("tours.to-or-from-cape-town")}</div>

      <FeaturedExperiences
        eyebrow="Our Experiences"
        title={tt("tours.our-private-tours-in-cape")}
        description="Every experience is designed around your group, with no shared schedules and no rushing."
        items={experiences}
      />

      <TourHubFaq />

      <WhyChooseUs items={whyItems(tt)} />

      <RelatedLinks
        title={tt("tours.plan-your-cape-town-trip")}
        text="Guides and services to help you plan private days out in Cape Town."
        links={HUB_LINKS(tt)}
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
  return localizeMetadata(baseMetadata, locale, { path: "/tours" });
}
