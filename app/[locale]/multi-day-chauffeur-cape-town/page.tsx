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
  const reviews = reviewsWithTag("multi-day");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: MULTI_DAY_FAQS.map((f) => ({
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
            Multi-Day Chauffeur in Cape Town
          </h1>
          <Lead>{MULTI_DAY_INTRO}</Lead>
          <CtaRow>
            <WhatsAppCta source="multi_day_hero" label="Plan on WhatsApp" />
            <QuoteNote>Tailored quote within 30 minutes</QuoteNote>
          </CtaRow>
        </Container>
      </Band>

      <Band $soft>
        <Container>
          <H2>How it works</H2>
          <MultiDaySteps />
        </Container>
      </Band>

      {reviews.length ? (
        <Band>
          <Container>
            <H2>What clients say</H2>
            <ReviewGrid reviews={reviews} />
          </Container>
        </Band>
      ) : null}

      <FaqSection title="Multi-day chauffeur questions" items={MULTI_DAY_FAQS} />

      <Band $soft>
        <Container>
          <H2>Tell us your dates</H2>
          <Lead>Share your dates, the number of guests and what you enjoy. We will send a day-by-day plan.</Lead>
          <CtaRow>
            <WhatsAppCta source="multi_day_footer" label="Enquire on WhatsApp" />
            <QuoteNote>Tailored quote within 30 minutes</QuoteNote>
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
