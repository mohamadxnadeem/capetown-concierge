import type { Metadata } from "next";
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
  metadataBase: new URL("https://capetown-concierge.co.za"),
  title: brand.name,
  description: brand.tagline,
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TouristInformationCenter"],
  name: "Cape Town Concierge",
  url: "https://capetown-concierge.co.za",
  logo: "https://capetown-concierge.co.za/images/logo.svg",
  image: "https://capetown-concierge.co.za/images/hero-car.jpg",
  description:
    "Cape Town Concierge offers luxury private chauffeur services, bespoke private tours, and premium airport transfers across Cape Town and the Western Cape.",
  telephone: "+27636746131",
  email: "info@capetown-concierge.co.za",
  priceRange: "$$$$",
  currenciesAccepted: "ZAR",
  paymentAccepted: "Cash, EFT, Credit Card",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cape Town",
    addressRegion: "Western Cape",
    postalCode: "8001",
    addressCountry: "ZA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.9249,
    longitude: 18.4241,
  },
  areaServed: [
    "Cape Town",
    "Cape Peninsula",
    "Stellenbosch",
    "Franschhoek",
    "Western Cape",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Private Tours & Chauffeur Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Private Chauffeur Service Cape Town",
          url: "https://capetown-concierge.co.za/chauffeur-services",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Private Tours Cape Town",
          url: "https://capetown-concierge.co.za/private-tours",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Airport Transfers Cape Town",
          url: "https://capetown-concierge.co.za/airport-transfers-cape-town",
        },
      },
    ],
  },
  sameAs: [
    "https://wa.me/27636746131",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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