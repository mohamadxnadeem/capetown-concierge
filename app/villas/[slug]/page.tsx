import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VillaDetailView from "../../../components/sections/villas/VillaDetailView";
import {
  fetchVillaBySlug,
  getVillaArea,
  getVillaCapacity,
  getVillaPrimaryPhoto,
} from "../../../lib/villas";
import { brand } from "../../../lib/brand";

const SITE_URL = brand.siteUrl;
const FALLBACK_OG = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const villa = await fetchVillaBySlug(slug);

  if (!villa) {
    return {
      title: `Luxury Villa Rentals in Cape Town | ${brand.name}`,
      description:
        "Hand-picked luxury villas to rent in Cape Town. Concierge service, chauffeur add-ons, premium properties.",
      robots: { index: false, follow: true },
    };
  }

  const area = getVillaArea(villa);
  const capacity = getVillaCapacity(villa);
  const ogImage = getVillaPrimaryPhoto(villa) ?? FALLBACK_OG;
  const canonical = `${SITE_URL}/villas/${villa.slug.toLowerCase()}`;

  const title = area
    ? `${villa.title} — Luxury Villa in ${area}, Cape Town`
    : `${villa.title} — Luxury Villa in Cape Town`;

  const description =
    villa.short_description ||
    villa.highlight ||
    `${villa.title}: ${villa.bedrooms ?? ""}${villa.bedrooms ? "-bedroom " : ""}luxury villa${
      area ? ` in ${area}` : ""
    }${capacity ? `, sleeps ${capacity}` : ""}. Book with full concierge service.`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical },
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
      title,
      description: description.slice(0, 200),
      url: canonical,
      siteName: brand.name,
      type: "website",
      locale: "en_ZA",
      images: [{ url: ogImage, alt: villa.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.slice(0, 200),
      images: [ogImage],
    },
  };
}

export default async function VillaPage({ params }: PageProps) {
  const { slug } = await params;
  const villa = await fetchVillaBySlug(slug);
  if (!villa) notFound();

  const area = getVillaArea(villa);
  const photo = getVillaPrimaryPhoto(villa);
  const canonical = `${SITE_URL}/villas/${villa.slug.toLowerCase()}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: villa.title,
    url: canonical,
    description: villa.short_description || villa.highlight || undefined,
    image: photo || undefined,
    address: area
      ? {
          "@type": "PostalAddress",
          addressLocality: area,
          addressRegion: brand.address.region,
          addressCountry: brand.address.country,
        }
      : undefined,
    numberOfRooms: villa.bedrooms || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <VillaDetailView villa={villa} />
    </>
  );
}
