import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { brand } from "../../../../lib/brand";
import { businessRef, withInLanguage } from "../../../../lib/seo";
import { localizeMetadata, localizedPath } from "../../../../lib/i18n/metadata";
import { localeFromParam } from "../../../../lib/i18n/config";
import { getContent, overlayContent } from "../../../../lib/i18n/slugs";
import PrivateTourDetailView from "../../../../components/sections/private-tour-detail/PrivateTourDetailView";
import { getTourContent } from "../../../../lib/tourPageContent";
import { getTourSeo, TOUR_ORDER } from "../../../../lib/tourSeo";

import { serverT, setRequestLocale } from "../../../../lib/i18n/server";
import { enT } from "../../../../lib/i18n/messages";
import type { TFunction } from "../../../../lib/i18n/messages";
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
    slug: string;
    locale: string;
  }>;
};

const SITE_URL = brand.siteUrl;

function toZarNum(val: string | number): number {
  return Math.round(Number(String(val).replace(/[^0-9.]/g, "")));
}

function formatVehiclePrice(price?: string | number, tt: TFunction = enT) {
  if (price === undefined || price === null || price === "") return "";
  const num = toZarNum(price);
  return num === 0 ? "" : tt("slug.from-r-per-day", { toLocaleString: num.toLocaleString() });
}

function truncateText(text?: string, maxLength = 140) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

async function getAllExperiences(): Promise<ExperienceListItem[]> {
  try {
    const response = await fetch(
      "https://web-production-1ab9.up.railway.app/api/experiences/all/",
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return [];
    return response.json();
  } catch {
    return [];
  }
}

async function getAllVehicles(): Promise<CarsApiItem[]> {
  try {
    const response = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
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

async function getExperienceIdBySlug(slug: string) {
  const data = await getAllExperiences();
  const lower = slug.toLowerCase();
  const match = data.find((item) => item?.experience?.slug?.toLowerCase() === lower);
  return match?.experience?.id || null;
}

async function getExperienceDetails(
  id: number
): Promise<ExperienceDetailResponse | Experience> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      `https://web-production-1ab9.up.railway.app/api/experiences/${id}/details/`,
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
  return `${keyword} | Private Chauffeur Tour | ${brand.name}`;
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
  currentSlug: string, tt: TFunction
): RelatedTour[] {
  return allExperiences
    .map((item) => item.experience)
    .filter((tour) => tour.slug && tour.slug !== currentSlug)
    .map((tour) => ({
      title: tour.title || tt("slug.private-tour"),
      description:
        tour.short_description ||
        tour.highlight ||
        tt("slug.discover-another-premium-private-tour"),
      image:
        [...(tour.cover_photos || [])].sort((a, b) => a.order - b.order)[0]
          ?.cover_photos || "",
      href: `/tours/${tour.slug}`,
    }));
}

function mapVehicles(items: CarsApiItem[], tt: TFunction): TourVehicle[] {
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
        tt("slug.a-premium-chauffeur-driven-vehicle");

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
        price: formatVehiclePrice(car.price, tt),
        priceRaw: rawZar,
      };
    });
}

const FALLBACK_TOUR_SLUGS = TOUR_ORDER;

export async function generateStaticParams() {
  try {
    const data = await getAllExperiences();
    const apiSlugs = data
      .map((item) => item?.experience?.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => slug.toLowerCase());
    return Array.from(new Set([...apiSlugs, ...FALLBACK_TOUR_SLUGS])).map(
      (slug) => ({ slug })
    );
  } catch {
    return FALLBACK_TOUR_SLUGS.map((slug) => ({ slug }));
  }
}

async function baseGenerateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experienceId = await getExperienceIdBySlug(slug);

  if (!experienceId) {
    return {
      title: `Private Tour | ${brand.name}`,
      description: "Luxury private tours in Cape Town",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }

  const raw = await getExperienceDetails(experienceId);
  const experience = normalizeExperience(raw);

  if (!experience?.title) {
    const ogImage = `${SITE_URL}/images/og-cape-town-concierge.jpg`;
    return {
      title: `Private Tour | ${brand.name}`,
      description: "Luxury private tours in Cape Town",
      openGraph: {
        images: [{ url: ogImage, alt: "Cape Town Concierge, Luxury Private Tours" }],
      },
      twitter: {
        card: "summary_large_image",
        images: [ogImage],
      },
    };
  }


  const override = getTourSeo(slug);
  const title = override?.title || getPageTitle(experience);
  const description = override?.description || getPageDescription(experience);
  const socialTitle = override?.title || getSocialTitle(experience);
  const socialDescription = override?.description || getSocialDescription(experience);
  const image = getPrimaryImage(experience);
  const canonicalUrl = `${SITE_URL}/tours/${slug.toLowerCase()}`;
  const ogImage = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

  const keyword = override?.cardName || getSeoKeyword(experience);

  return {
    title,
    description,
    keywords: [
      keyword,
      `${override?.cardName || experience.title} Cape Town`,
      `${override?.cardName || experience.title} with chauffeur`,
      "private tours Cape Town",
      "luxury private tours Cape Town",
      "chauffeur tours Cape Town",
    ].filter(Boolean),
    alternates: {
      canonical: canonicalUrl,
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
      title: socialTitle,
      description: socialDescription,
      url: canonicalUrl,
      siteName: brand.name,
      type: "website",
      locale: "en_ZA",
      images: [
        {
          url: image || ogImage,
          alt: image
            ? override?.imageAlt || `${experience.title || "Private Tour"} Cape Town, private chauffeur experience`
            : "Cape Town Concierge, Luxury Private Tours",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [image || ogImage],
    },
  };
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const base = await baseGenerateMetadata(props);
  const { slug, locale } = await props.params;
  return localizeMetadata(base, locale, {
    path: `/tours/${slug.toLowerCase()}`,
    detail: { kind: "tours", slug: slug.toLowerCase() },
  });
}

export default async function PrivateTourDetailPage({ params }: PageProps) {
  const { slug, locale: localeParam } = await params;
  const locale = localeFromParam(localeParam);
  setRequestLocale(locale);
  const tt = serverT();

  const [allExperiences, allVehicles, experienceId] = await Promise.all([
    getAllExperiences(),
    getAllVehicles(),
    getExperienceIdBySlug(slug),
  ]);

  if (!experienceId) {
    notFound();
  }

  const raw = await getExperienceDetails(experienceId);
  const experienceBase = normalizeExperience(raw);

  if (!experienceBase) {
    notFound();
  }
  const experience = overlayContent(experienceBase, getContent(locale, "tours", slug));

  const relatedTours = mapRelatedTours(allExperiences, slug, tt);
  const vehicles = mapVehicles(allVehicles, tt);

  const lowestVehiclePrice = (() => {
    const zarPrice = allVehicles
      .map((item) => {
        const car = (item as CarsApiItem).car || (item as unknown as Car);
        const p = car?.price;
        if (!p || (car as { is_active?: boolean }).is_active === false) return null;
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
  const canonicalUrl = `${SITE_URL}${localizedPath(locale, "", { kind: "tours", slug: slug.toLowerCase() })}`;
  // Tours are priced at the chosen vehicle's full-day rate; the database tour price is never shown.
  const priceZarForSchema = lowestVehiclePrice;

  const seo = getTourSeo(slug);
  const tourName = seo?.cardName || experience.title || "private tour";
  const tourKeyword = tourName;
  const pageDescription = seo?.description || getPageDescription(experience);
  const tourContent = getTourContent(slug, tt);

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
    provider: businessRef,
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withInLanguage(faqJsonLd, locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withInLanguage(breadcrumbJsonLd, locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(withInLanguage(tourJsonLd, locale)) }}
      />

      <PrivateTourDetailView
        experience={experience}
        relatedTours={relatedTours}
        vehicles={vehicles}
        lowestVehiclePrice={lowestVehiclePrice}
        slug={slug}
      />
    </>
  );
}