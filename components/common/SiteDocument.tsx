import type { Locale } from "../../lib/i18n/config";
import Script from "next/script";
import { Cormorant_Garamond } from "next/font/google";

import { brand } from "../../lib/brand";
import { buildBusinessSchema } from "../../lib/seo";
import { LocaleProvider } from "../../lib/i18n/LocaleContext";
import {
  HTML_LANG,
  isRtl,
} from "../../lib/i18n/config";
import StyledComponentsRegistry from "../../lib/styled-components-registry";
import Providers from "./Providers";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import LanguageBanner from "./LanguageBanner";
import ScrollTracking from "../tracking/ScrollTracking";
import EngagementTracking from "../tracking/EngagementTracking";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-cormorant",
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;


export default function SiteDocument({
  locale,
  children,
}: Readonly<{
  locale: Locale;
  children: React.ReactNode;
}>) {
  const localBusinessSchema = buildBusinessSchema(locale);
  return (
    <html
      lang={HTML_LANG[locale]}
      {...(isRtl(locale) ? { dir: "rtl" } : {})}
      className={cormorant.variable}
    >
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
            <LocaleProvider locale={locale}>
            <ScrollTracking />
            <EngagementTracking />
            <Header />
            {children}
            <Footer />
            <FloatingWhatsApp />
            <LanguageBanner />
            </LocaleProvider>
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

                // Language of the page (event parameter and user property)
                gtag('set', { page_locale: '${HTML_LANG[locale]}' });
                gtag('set', 'user_properties', { page_locale: '${HTML_LANG[locale]}' });

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