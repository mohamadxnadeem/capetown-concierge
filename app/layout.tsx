import type { Metadata, Viewport } from "next";
import Script from "next/script";

import { brand } from "../lib/brand";
import StyledComponentsRegistry from "../lib/styled-components-registry";
import Providers from "./providers";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import FloatingWhatsApp from "../components/common/FloatingWhatsApp";
import ScrollTracking from "../components/tracking/ScrollTracking";
import EngagementTracking from "../components/tracking/EngagementTracking";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: brand.name,
  description: brand.tagline,
};

export const viewport: Viewport = {
  themeColor: "#0b5b33",
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TouristInformationCenter"],
  name: brand.name,
  url: brand.siteUrl,
  logo: `${brand.siteUrl}${brand.logoPath}`,
  image: `${brand.siteUrl}${brand.heroImagePath}`,
  description:
    `${brand.name} offers luxury private chauffeur services, bespoke private tours, and premium airport transfers across ${brand.address.locality} and the ${brand.address.region}.`,
  telephone: brand.phone,
  email: brand.contactEmail,
  priceRange: "$$$",
  currenciesAccepted: "ZAR, USD",
  paymentAccepted: "Cash, EFT, Credit Card",
  address: {
    "@type": "PostalAddress",
    addressLocality: brand.address.locality,
    addressRegion: brand.address.region,
    postalCode: brand.address.postalCode,
    addressCountry: brand.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: brand.geo.lat,
    longitude: brand.geo.lng,
  },
  openingHoursSpecification: [
    "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
  ].map((day) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: day,
    opens: "00:00",
    closes: "23:59",
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "27",
    bestRating: "5",
  },
  touristType: ["LuxuryTourist", "BusinessTraveler", "FamilyTourist"],
  areaServed: "Cape Town, Western Cape, South Africa",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Private Tours & Chauffeur Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Private Chauffeur Service Cape Town",
          url: `${brand.siteUrl}/chauffeur-hire`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Private Tours Cape Town",
          url: `${brand.siteUrl}/tours`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Airport Transfers Cape Town",
          url: `${brand.siteUrl}/airport-transfers-cape-town`,
        },
      },
    ],
  },
  sameAs: [
    `https://wa.me/${brand.whatsappNumber}`,
    brand.social?.instagram,
    brand.social?.tiktok,
    brand.social?.facebook,
    brand.social?.youtube,
  ].filter((u): u is string => Boolean(u)),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cape-town-concierge.s3.eu-north-1.amazonaws.com" />
        <link rel="dns-prefetch" href="//wa.me" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <StyledComponentsRegistry>
          <Providers>
            <ScrollTracking />
            <EngagementTracking />
            <Header />
            {children}
            <Footer />
            <FloatingWhatsApp />
          </Providers>
        </StyledComponentsRegistry>

        {/* Google Analytics + Google Ads */}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());

                // Google Analytics
                gtag('config', '${gaId}');

                // Google Ads (IMPORTANT)
                gtag('config', '${googleAdsId || "AW-11020060137"}');
              `}
            </Script>
          </>
        ) : null}

        {/* Meta Pixel */}
        {metaPixelId ? (
          <>
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');

                fbq('init', '${metaPixelId}');
                fbq('track', 'PageView');
              `}
            </Script>

            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        ) : null}
      </body>
    </html>
  );
}