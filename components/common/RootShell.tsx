import Script from "next/script";

import { brand } from "../../lib/brand";
import StyledComponentsRegistry from "../../lib/styled-components-registry";
import Providers from "../../app/providers";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import ScrollTracking from "../tracking/ScrollTracking";
import EngagementTracking from "../tracking/EngagementTracking";
import { LocaleProvider } from "../i18n/LocaleProvider";
import WhatsAppLocalizer from "../i18n/WhatsAppLocalizer";
import JsonLd from "../i18n/JsonLd";
import { LanguageBanner, DraftNotice, type BannerTexts } from "../i18n/LanguageBanner";
import { HTML_LANG, isRtl, type Locale } from "../../lib/i18n/config";
import { getAllPageStatuses, getCommonMessages } from "../../lib/i18n/messages";

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

/**
 * Shared <html> shell used by the [locale] root layout and the English-only
 * root layout (booking, driver, villas, hotels).
 */
export default function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const pageLocale = HTML_LANG[locale];
  const messages = getCommonMessages(locale);
  const statuses = getAllPageStatuses();
  const bannerTexts: BannerTexts = {};
  for (const l of ["ar", "pt-BR", "ru"] as const) {
    const m = getCommonMessages(l);
    bannerTexts[l] = {
      text: m["banner.text"],
      switch: m["banner.switch"],
      stay: m["banner.stay"],
      dismiss: m["banner.dismiss"],
    };
  }
  return (
    <html lang={pageLocale} dir={isRtl(locale) ? "rtl" : "ltr"}>
      <head>
        <link rel="preconnect" href="https://cape-town-concierge.s3.eu-north-1.amazonaws.com" />
        <link rel="dns-prefetch" href="//wa.me" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <LocaleProvider locale={locale} messages={messages} statuses={statuses}>
            <JsonLd data={localBusinessSchema} />
            <Providers>
              <ScrollTracking />
              <EngagementTracking />
              <Header />
              <DraftNotice />
              <WhatsAppLocalizer />
              <LanguageBanner texts={bannerTexts} />
              {children}
              <Footer />
              <FloatingWhatsApp />
            </Providers>
          </LocaleProvider>
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
                gtag('set', 'user_properties', { page_locale: '${pageLocale}' });
                gtag('config', '${gaId}', { page_locale: '${pageLocale}' });

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
