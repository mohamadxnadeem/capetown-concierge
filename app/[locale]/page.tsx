import type { Metadata } from "next";
import HeroBanner from "../../components/sections/HeroBanner";
import FeaturedVehicles from "../../components/sections/FeaturedVehicles";
import FeaturedExperiences from "../../components/sections/FeaturedExperiences";
import TestimonialsSection from "../../components/sections/testimonials/TestimonialsSection";
import GoogleRatingBadge from "../../components/common/GoogleRatingBadge";
import HomeEnquiry from "../../components/sections/home/HomeEnquiry";
import { SpecialismsSection, MultiDaySection } from "../../components/sections/home/HomeSections";
import { fetchHomepageData } from "../../lib/homepageData";
import { reviewsWithTag } from "../../lib/googleReviews";
import { buildWhatsAppLink, buildGeneralWhatsAppMessage } from "../../lib/whatsapp";
import { brand } from "../../lib/brand";
import { businessRef } from "../../lib/seo";
import { localizeMetadata } from "../../lib/i18n/metadata";
import { localeFromParam } from "../../lib/i18n/config";
import { withInLanguage } from "../../lib/seo";

const SITE_URL = brand.siteUrl;
const OG_IMAGE = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

const TITLE = "Chauffeur Service Cape Town | Private Driver & Day Tours";
const DESCRIPTION =
  "Chauffeur service in Cape Town: private drivers, full-day tours and multi-day trips with your own chauffeur and guide. Enquire on WhatsApp for a quote.";

const baseMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
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
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: brand.name,
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Cape Town Concierge chauffeur service in Cape Town, with day tours and multi-day trips",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const provider = businessRef;
const areaServed = { "@type": "City", name: "Cape Town" };

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeFromParam(localeParam);
  const { vehicles, tours, lowestVehiclePrice, heroImages } = await fetchHomepageData();
  const multiDayReviews = reviewsWithTag("multi-day");

  const tourItems = tours.map((t) => ({
    title: t.title,
    description: t.description,
    href: t.href,
    image: t.image,
    alt: t.alt,
    priceUsd: lowestVehiclePrice,
    priceSuffix: "per vehicle",
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", name: brand.name, url: SITE_URL },
      {
        "@type": "WebPage",
        name: TITLE,
        url: SITE_URL,
        about: businessRef,
        description: DESCRIPTION,
        image: [`${SITE_URL}/images/hero-car.jpg`],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }],
      },
      {
        "@type": "Service",
        serviceType: "Private Chauffeured Drives",
        name: "Private Chauffeured Drives",
        provider,
        areaServed,
        description:
          "Airport transfers, business travel, dinners and as-directed hire by the hour or day in Cape Town. Always private, never shared.",
      },
      {
        "@type": "Service",
        serviceType: "Day Tours",
        name: "Day Tours",
        provider,
        areaServed,
        description:
          "Full-day private tours of the Cape Peninsula, Winelands, city and safari, with your chauffeur as your guide, at your own pace.",
      },
      {
        "@type": "Service",
        serviceType: "Multi-Day Trips",
        name: "Multi-Day Trips",
        provider,
        areaServed,
        description:
          "The same chauffeur and vehicle for your whole stay, with each day planned around you, from Cape Town and the Winelands to Hermanus and the Garden Route.",
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
        eyebrow={brand.name}
        title="Private chauffeur service, day tours and multi-day trips in Cape Town"
        description="A private chauffeur service in Cape Town, with your own chauffeur and guide for a single journey, a full day, or your entire stay."
        primaryCtaLabel="Enquire on WhatsApp"
        primaryCtaHref={buildWhatsAppLink(
          buildGeneralWhatsAppMessage("a private chauffeur, day tour or multi-day trip in Cape Town")
        )}
        secondaryCtaLabel="View Tours"
        secondaryCtaHref="#tours"
        showSecondaryCta
        image="/images/car.jpg"
        images={heroImages.map((h) => h.src)}
        imageAlts={heroImages.map((h) => h.alt)}
        imageAlt="Chauffeur service in Cape Town: private chauffeur vehicle ready for guests"
      >
        <GoogleRatingBadge />
      </HeroBanner>

      <SpecialismsSection />

      {vehicles.length ? (
      <FeaturedVehicles
        id="vehicles"
        eyebrow=""
        title="Choose your chauffeur vehicle"
        description="Every vehicle comes with a professional chauffeur, fuel and bottled water."
        items={vehicles.map((v) => ({
          title: v.title,
          href: v.href,
          image: v.image,
          alt: v.alt,
          seats: v.seats,
          description: v.description,
          priceUsd: v.price,
        }))}
        footerLabel="View all vehicles"
        footerHref="/chauffeur-hire"
      />
      ) : null}

      {tourItems.length ? (
      <FeaturedExperiences
        id="tours"
        eyebrow=""
        title="Recommended full-day private tours from Cape Town"
        description="Private tours with your own chauffeur-guide. Leave when you like, stop where you like."
        items={tourItems}
        footerLabel="View all tours"
        footerHref="/tours"
      />
      ) : null}

      <MultiDaySection reviews={multiDayReviews} />

      <HomeEnquiry />

      <TestimonialsSection tags={["homepage"]} count={60} readAllHref="/reviews" />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localizeMetadata(baseMetadata, locale, { path: "/" });
}
