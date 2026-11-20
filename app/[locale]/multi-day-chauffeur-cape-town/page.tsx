import type { Metadata } from "next";
import Container from "../../../components/common/Container";
import FaqSection from "../../../components/sections/FaqSection";
import {
  Band,
  H2,
  Lead,
  CtaRow,
  QuoteNote,
  MultiDaySteps,
  ReviewGrid,
  WhatsAppCta,
} from "../../../components/sections/home/HomeSections";
import { MULTI_DAY_FAQS, MULTI_DAY_INTRO } from "../../../lib/multiDay";
import { reviewsWithTag } from "../../../lib/googleReviews";
import { brand } from "../../../lib/brand";
import { localizeMetadata } from "../../../lib/i18n/metadata";
import { localeFromParam } from "../../../lib/i18n/config";
import { withInLanguage } from "../../../lib/seo";

import { serverT, setRequestLocale } from "../../../lib/i18n/server";
const SITE_URL = brand.siteUrl;
const URL = `${SITE_URL}/multi-day-chauffeur-cape-town`;
const TITLE = "Multi-Day Chauffeur in Cape Town | Cape Town Concierge";
const DESCRIPTION =
  "Book the same private chauffeur for several days in Cape Town, the Winelands, Hermanus and the Garden Route. Each day planned around you. Tailored quote within 30 minutes.";

const baseMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: brand.name,
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: `${SITE_URL}/images/og-cape-town-concierge.jpg`,
        width: 1200,
        height: 630,
        alt: "Multi-day private chauffeur in Cape Town with Cape Town Concierge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/images/og-cape-town-concierge.jpg`],
  },
};

export default async function MultiDayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeFromParam(localeParam);
  setRequestLocale(locale);
  const tt = serverT();
  const reviews = reviewsWithTag("multi-day");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: MULTI_DAY_FAQS(tt).map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Multi-Day Chauffeur in Cape Town", item: URL },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(withInLanguage(jsonLd, locale)) }} />

      <Band>
        <Container>
          <h1 style={{ margin: "0 0 16px", fontSize: "clamp(2.2rem, 6vw, 3.6rem)", lineHeight: 1.08 }}>
            {tt("multi-day-chauffeur-cape-town.multi-day-chauffeur-in-cape")}</h1>
          <Lead>{MULTI_DAY_INTRO(tt)}</Lead>
          <CtaRow>
            <WhatsAppCta source="multi_day_hero" label="Plan on WhatsApp" />
            <QuoteNote>{tt("multi-day-chauffeur-cape-town.tailored-quote-within-30-minutes")}</QuoteNote>
          </CtaRow>
        </Container>
      </Band>

      <Band $soft>
        <Container>
          <H2>{tt("multi-day-chauffeur-cape-town.how-it-works")}</H2>
          <MultiDaySteps />
        </Container>
      </Band>

      {reviews.length ? (
        <Band>
          <Container>
            <H2>{tt("multi-day-chauffeur-cape-town.what-clients-say")}</H2>
            <ReviewGrid reviews={reviews} />
          </Container>
        </Band>
      ) : null}

      <FaqSection title={tt("multi-day-chauffeur-cape-town.multi-day-chauffeur-questions")} items={MULTI_DAY_FAQS(tt)} />

      <Band $soft>
        <Container>
          <H2>{tt("multi-day-chauffeur-cape-town.tell-us-your-dates")}</H2>
          <Lead>{tt("multi-day-chauffeur-cape-town.share-your-dates-the-number")}</Lead>
          <CtaRow>
            <WhatsAppCta source="multi_day_footer" label="Enquire on WhatsApp" />
            <QuoteNote>{tt("multi-day-chauffeur-cape-town.tailored-quote-within-30-minutes")}</QuoteNote>
          </CtaRow>
        </Container>
      </Band>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return localizeMetadata(baseMetadata, locale, { path: "/multi-day-chauffeur-cape-town" });
}
