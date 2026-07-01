import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HotelDetailView from "../../../components/sections/hotels/HotelDetailView";
import {
  fetchHotelBySlug,
  getHotelAreaDisplay,
  getHotelPrimaryPhoto,
} from "../../../lib/hotels";
import { brand } from "../../../lib/brand";

const SITE_URL = brand.siteUrl;
const FALLBACK_OG = `${SITE_URL}/images/og-cape-town-concierge.jpg`;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hotel = await fetchHotelBySlug(slug);

  if (!hotel) {
    return {
      title: `Luxury Hotels in Cape Town | ${brand.name}`,
      description:
        "Hand-picked luxury hotels across Cape Town, the Winelands, and the Atlantic Seaboard.",
      robots: { index: false, follow: true },
    };
  }

  const area = getHotelAreaDisplay(hotel);
  const ogImage = getHotelPrimaryPhoto(hotel) ?? FALLBACK_OG;
  const canonical = `${SITE_URL}/hotels/${hotel.slug.toLowerCase()}`;

  const starText = hotel.star_rating ? `${hotel.star_rating}-star ` : "";
  const title = `${hotel.name} — Luxury ${starText}Hotel in ${area}`;

  const description =
    hotel.short_description ||
    `${hotel.name}: ${starText}luxury hotel in ${area}${
      hotel.max_guests ? `, sleeps up to ${hotel.max_guests}` : ""
    }. Book with full concierge service.`;

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
      images: [{ url: ogImage, alt: hotel.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.slice(0, 200),
      images: [ogImage],
    },
  };
}

export default async function HotelPage({ params }: PageProps) {
  const { slug } = await params;
  const hotel = await fetchHotelBySlug(slug);
  if (!hotel) notFound();

  const area = getHotelAreaDisplay(hotel);
  const photo = getHotelPrimaryPhoto(hotel);
  const canonical = `${SITE_URL}/hotels/${hotel.slug.toLowerCase()}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    url: canonical,
    description: hotel.short_description || undefined,
    image: photo || undefined,
    starRating: hotel.star_rating
      ? { "@type": "Rating", ratingValue: hotel.star_rating, bestRating: 5 }
      : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: area,
      addressRegion: brand.address.region,
      addressCountry: brand.address.country,
    },
    numberOfRooms: hotel.bedrooms || undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HotelDetailView hotel={hotel} />
    </>
  );
}
