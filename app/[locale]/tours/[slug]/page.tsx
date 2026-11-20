import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "../../../../lib/i18n/seo";
import { localeFromParam } from "../../../../lib/i18n/server";
import { LOCALES, URL_PREFIX, DEFAULT_LOCALE, type Locale } from "../../../../lib/i18n/config";
import {
  englishSlug,
  translationStatus,
  versionsFromTranslations,
  withLang,
  type Translations,
} from "../../../../lib/i18n/content";
import { RegisterVersions } from "../../../../components/i18n/PageVersions";
import JsonLd from "../../../../components/i18n/JsonLd";
import { brand } from "../../../../lib/brand";
import PrivateTourDetailView from "../../../../components/sections/private-tour-detail/PrivateTourDetailView";
import { getTourContent } from "../../../../lib/tourPageContent";
import { getTourSeo, TOUR_ORDER } from "../../../../lib/tourSeo";

type ExperiencePhoto = {
  id: number;
  experience?: number;
  cover_photos: string;
  order: number;
  is_featured?: boolean;
};

type ExperienceStop = {
  id: number;
  title: string;
  short_description?: string;
  highlight?: string;
  image?: string;
  order: number;
  estimated_time?: string;
  stop_type?: string;
};

type Experience = {
  id: number;
  title?: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  location?: string;
  duration?: string;
  tags?: string[];
  price_from?: string;
  price_to?: string;
  currency?: string;
  body?: string;
  cover_photos?: ExperiencePhoto[];
  stops?: ExperienceStop[];
  meta_title?: string;
  meta_description?: string;
  translations?: Translations;
  lang?: string;
};

type ExperienceListItem = {
  experience: Experience;
};

type ExperienceDetailResponse = {
  experience: Experience;
};

type RelatedTour = {
  title: string;
  description?: string;
  image?: string;
  href: string;
  price?: string;
};

type CarPhoto = {
  id: number;
  cover_photos: string;
  is_featured?: boolean;
  order?: number;
};

type Car = {
  id: number;
  title?: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  number_of_seats?: number;
  price?: string | number;
  price_from?: string | number;
  price_to?: string | number;
  currency?: string;
  cover_photos?: CarPhoto[];
  images?: CarPhoto[];
  is_active?: boolean;
};

type CarsApiItem = {
  car: Car;
};

type TourVehicle = {
  title: string;
  image?: string;
  seats?: number;
  description?: string;
  price?: string;
};

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const SITE_URL = brand.siteUrl;

function toZarNum(val: string | number): number {
  return Math.round(Number(String(val).replace(/[^0-9.]/g, "")));
}

function formatPriceRange(
  priceFrom?: string | number,
  priceTo?: string | number,
) {
  if (
    (priceFrom === undefined || priceFrom === null || priceFrom === "") &&
    (priceTo === undefined || priceTo === null || priceTo === "")
  ) {
    return "";
  }
  const from = priceFrom ? toZarNum(priceFrom) : 0;
  const to = priceTo ? toZarNum(priceTo) : 0;
  if (from && to) return `From R${from.toLocaleString()} - R${to.toLocaleString()}`;
  if (from) return `From R${from.toLocaleString()}`;
  return `R${to.toLocaleString()}`;
}

function formatVehiclePrice(price?: string | number) {
  if (price === undefined || price === null || price === "") return "";
  const num = toZarNum(price);
  return num === 0 ? "" : `From R${num.toLocaleString()} per day`;
}

function truncateText(text?: string, maxLength = 140) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

async function getAllExperiences(locale: Locale): Promise<ExperienceListItem[]> {
  try {
    const response = await fetch(
      withLang("https://web-production-1ab9.up.railway.app/api/experiences/all/", locale),
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

async function getAllVehicles(locale: Locale): Promise<CarsApiItem[]> {
  try {
    const response = await fetch(
      withLang("https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/", locale),
      { next: { revalidate: 300 } }
    );
    if (!response.ok) return [];
    const data = await response.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
  } catch {
    return [];
  }
}

async function getExperienceBySlug(slug: string, locale: Locale) {
  const data = await getAllExperiences(locale);
  const lower = slug.toLowerCase();
  const match = data.find((item) => item?.experience?.slug?.toLowerCase() === lower);
  return match?.experience || null;
}

async function getExperienceDetails(
  id: number,
  locale: Locale
): Promise<ExperienceDetailResponse | Experience> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      withLang(`https://web-production-1ab9.up.railway.app/api/experiences/${id}/details/`, locale),
      { next: { revalidate: 3600 }, signal: controller.signal }
    );
    clearTimeout(timeout);

    if (!response.ok) {
      clearTimeout(timeout);
      return null as unknown as ExperienceDetailResponse;
    }

    return response.json();
  } catch {
    clearTimeout(timeout);
    return null as unknown as ExperienceDetailResponse;
  }
}

function normalizeExperience(data: ExperienceDetailResponse | Experience): Experience {
  return (data as ExperienceDetailResponse)?.experience || (data as Experience);
}

function getPrimaryImage(experience: Experience) {
  const sorted = [...(experience.cover_photos || [])].sort(
    (a, b) => a.order - b.order
  );

  return (
    sorted.find((photo) => photo.is_featured)?.cover_photos ||
    sorted[0]?.cover_photos ||
    ""
  );
}

function getSeoKeyword(experience: Experience): string {
  const name = experience.title || "Private Tour";
  return `${name} Cape Town`;
}

function getPageTitle(experience: Experience) {
  if (experience.meta_title) return experience.meta_title;
  const keyword = getSeoKeyword(experience);
  const priceZar = experience.price_from ? toZarNum(experience.price_from) || undefined : undefined;
  const priceStr = priceZar ? ` | From R${priceZar.toLocaleString()}` : "";
  return `${keyword} | Private Chauffeur Tour${priceStr} | ${brand.name}`;
}

function getPageDescription(experience: Experience) {
  if (experience.meta_description) return experience.meta_description;
  const keyword = getSeoKeyword(experience);
  const base =
    experience.short_description ||
    experience.highlight ||
    `${keyword}, a fully private, chauffeur-driven experience.`;
  return truncateText(
    `${base} Private, bespoke, and tailored to your pace. Book via WhatsApp.`,
    155
  );
}

function getSocialTitle(experience: Experience) {
  const name = experience.title || "Private Tour";
  return `${name}, Private Chauffeur Tour in Cape Town`;
}

function getSocialDescription(experience: Experience) {
  const hook =
    experience.short_description ||
    experience.highlight ||
    `A fully private, chauffeur-driven ${experience.title || "tour"} in Cape Town tailored entirely to your pace.`;
  const clean = hook.length > 115 ? `${hook.slice(0, 115).trim()}...` : hook;
  return `${clean} Book privately via WhatsApp, we respond in 30 min.`;
}

function mapRelatedTours(
  allExperiences: ExperienceListItem[],
  currentSlug: string
): RelatedTour[] {
  return allExperiences
    .map((item) => item.experience)
    .filter((tour) => tour.slug && tour.slug !== currentSlug)
    .map((tour) => ({
      title: tour.title || "Private Tour",
      description:
        tour.short_description ||
        tour.highlight ||
        "Discover another premium private tour experience in Cape Town.",
      image:
        [...(tour.cover_photos || [])].sort((a, b) => a.order - b.order)[0]
          ?.cover_photos || "",
      href: `/tours/${tour.slug}`,
      price: formatPriceRange(tour.price_from, tour.price_to),
    }));
}

function mapVehicles(items: CarsApiItem[]): TourVehicle[] {
  return items
    .map((item) => item?.car || item)
    .filter((car) => car?.title)
    .map((car) => {
      const imageArray = car.cover_photos || car.images || [];
      const sortedImages = [...imageArray].sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );

      const featuredPhoto =
        sortedImages.find((photo) => photo?.is_featured)?.cover_photos ||
        sortedImages[0]?.cover_photos ||
        "";

      const description =
        car.short_description ||
        car.highlight ||
        truncateText(car.body, 120) ||
        "A premium chauffeur-driven vehicle suitable for private touring in Cape Town.";

      const rawZar = (() => {
        const p = car.price ?? car.price_from;
        if (!p) return undefined;
        const n = Number(String(p).replace(/[^0-9.]/g, ""));
        return isNaN(n) || n === 0 ? undefined : n;
      })();

      return {
        title: car.title || "Vehicle",
        image: featuredPhoto,
        seats: car.number_of_seats,
        description,
        price: formatVehiclePrice(car.price),
        priceRaw: rawZar,
      };
    });
}

const FALLBACK_TOUR_SLUGS = TOUR_ORDER;

export async function generateStaticParams() {
  const out: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    const param = locale === DEFAULT_LOCALE ? "en" : URL_PREFIX[locale];
    const data = await getAllExperiences(locale);
    const slugs = data
      .filter((item) => translationStatus(item?.experience?.translations, locale))
      .map((item) => item?.experience?.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => slug.toLowerCase());
    const all = locale === DEFAULT_LOCALE ? Array.from(new Set([...slugs, ...FALLBACK_TOUR_SLUGS])) : slugs;
    for (const slug of all) out.push({ locale: param, slug });
  }
  return out;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = localeFromParam(localeParam);
  const listed = await getExperienceBySlug(slug, locale);
  if (!listed || !translationStatus(listed.translations, locale)) {
    return {
      title: `Private Tour | ${brand.name}`,
      description: "Luxury private tours in Cape Town",
      robots: { index: false, follow: true },
    };
  }
  const raw = await getExperienceDetails(listed.id, locale);
  const experience = normalizeExperience(raw);
  if (!experience?.title) {
    const ogImage = `${SITE_URL}/images/og-cape-town-concierge.jpg`;
    return {
      title: `Private Tour | ${brand.name}`,
      description: "Luxury private tours in Cape Town",
      robots: { index: false, follow: true },
      openGraph: {
        images: [{ url: ogImage, alt: "Cape Town Concierge, Luxury Private Tours" }],
      },
      twitter: {
        card: "summary_large_image",
        images: [ogImage],
      },
    };
  }
  const translations = experience.translations ?? listed.translations;
  const enSlug = englishSlug(translations, slug);
  const english = locale === DEFAULT_LOCALE;
  // Hand-tuned English SEO overrides only apply to English pages.
  const override = english ? getTourSeo(enSlug) : undefined;
  const title = override?.title || (english ? getPageTitle(experience) : experience.meta_title || `${experience.title} | ${brand.name}`);
  const description = override?.description || (english ? getPageDescription(experience) : experience.meta_description || truncateText(experience.short_description || experience.highlight || experience.title, 155));
  const socialTitle = override?.title || (english ? getSocialTitle(experience) : title);
  const socialDescription = override?.description || (english ? getSocialDescription(experience) : description);
  const image = getPrimaryImage(experience);
  const keyword = override?.cardName || getSeoKeyword(experience);
  const meta = buildMetadata({
    locale,
    versions: versionsFromTranslations("/tours", translations, slug.toLowerCase()),
    title,
    description,
    keywords: english
      ? [
          keyword,
          `${override?.cardName || experience.title} Cape Town`,
          `${override?.cardName || experience.title} with chauffeur`,
          "private tours Cape Town",
          "luxury private tours Cape Town",
          "chauffeur tours Cape Town",
        ].filter(Boolean)
      : undefined,
    ogImage: image || undefined,
    ogAlt: image
      ? override?.imageAlt || `${experience.title || "Private Tour"} Cape Town, private chauffeur experience`
      : "Cape Town Concierge, Luxury Private Tours",
  });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, title: socialTitle, description: socialDescription },
    twitter: { ...meta.twitter, title: socialTitle, description: socialDescription },
  };
}

export default async function PrivateTourDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  const locale = localeFromParam(localeParam);

  const [allExperiences, allVehicles, listed] = await Promise.all([
    getAllExperiences(locale),
    getAllVehicles(locale),
    getExperienceBySlug(slug, locale),
  ]);

  // Non-English pages exist only when the API reports a translation for them.
  if (!listed || !translationStatus(listed.translations, locale)) {
    notFound();
  }

  const raw = await getExperienceDetails(listed.id, locale);
  const experience = normalizeExperience(raw);

  if (!experience) {
    notFound();
  }

  const translations = experience.translations ?? listed.translations;
  const enSlug = englishSlug(translations, slug);
  const versions = versionsFromTranslations("/tours", translations, slug.toLowerCase());
  const relatedTours = mapRelatedTours(
    allExperiences.filter((item) => translationStatus(item?.experience?.translations, locale)),
    slug
  );
  const vehicles = mapVehicles(allVehicles);

  const lowestVehiclePrice = (() => {
    const zarPrice = allVehicles
      .map((item) => {
        const car = (item as CarsApiItem).car || (item as unknown as Car);
        const p = car?.price;
        if (!p) return null;
        const n = Number(String(p).replace(/[^0-9.]/g, ""));
        return isNaN(n) || n === 0 ? null : n;
      })
      .filter((p): p is number => p !== null)
      .sort((a, b) => a - b)[0];
    return zarPrice ? Math.round(zarPrice) : undefined;
  })();

  const primaryImage = getPrimaryImage(experience);
  const ogImage = `${SITE_URL}/images/og-cape-town-concierge.jpg`;
  const schemaImage = primaryImage || ogImage;
  const canonicalUrl = `${SITE_URL}${versions[locale]?.path ?? `/tours/${slug.toLowerCase()}`}`;
  const price = experience.price_from || experience.price_to || "";
  const priceZarForSchema = toZarNum(price);

  const seo = getTourSeo(enSlug);
  const tourName = seo?.cardName || experience.title || "private tour";
  const tourKeyword = tourName;
  const pageDescription = seo?.description || getPageDescription(experience);
  const tourContent = getTourContent(enSlug);

  // FAQPage must match the visible FAQ. The visible list also has a price
  // question that depends on the visitor's currency, which is left out here.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tourContent.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tours",
        item: `${SITE_URL}/tours`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tourName,
        item: canonicalUrl,
      },
    ],
  };

  const tourJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tourKeyword,
    description: pageDescription,
    image: [schemaImage],
    url: canonicalUrl,
    provider: {
      "@type": "LocalBusiness",
      name: brand.name,
      url: SITE_URL,
      telephone: brand.phone,
      sameAs: ["https://share.google/xrWoPQWHwQYfzukgz"],
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
    touristType: ["Luxury Travelers", "Couples", "Families"],
    offers: priceZarForSchema
      ? {
          "@type": "Offer",
          priceCurrency: "ZAR",
          price: priceZarForSchema,
          availability: "https://schema.org/InStock",
          url: canonicalUrl,
        }
      : undefined,
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={tourJsonLd} />

      <PrivateTourDetailView
        experience={experience}
        relatedTours={relatedTours}
        vehicles={vehicles}
        lowestVehiclePrice={lowestVehiclePrice}
        slug={enSlug}
      />
      <RegisterVersions versions={versions} />
    </>
  );
}