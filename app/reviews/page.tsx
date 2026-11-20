import type { Metadata } from "next";
import Container from "../../components/common/Container";
import { Band, Lead, ReviewGrid, TextLink } from "../../components/sections/home/HomeSections";
import {
  GOOGLE_REVIEWS_URL,
  allEligibleReviews,
  googleSummaryText,
} from "../../lib/googleReviews";
import { brand } from "../../lib/brand";

const SITE_URL = brand.siteUrl;
const URL = `${SITE_URL}/reviews`;
const TITLE = "Client Reviews | Cape Town Concierge";
const DESCRIPTION = `${googleSummaryText}. Read what guests say about their private chauffeur, day tours and multi-day trips in Cape Town.`;

export const metadata: Metadata = {
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
        alt: "Cape Town Concierge client reviews",
      },
    ],
  },
};

export default function ReviewsPage() {
  const reviews = allEligibleReviews();
  // No AggregateRating or Review markup: Google does not allow it for reviews taken from another site.
  return (
    <Band>
      <Container>
        <h1 style={{ margin: "0 0 12px", fontSize: "clamp(2.2rem, 6vw, 3.4rem)", lineHeight: 1.08 }}>
          Client reviews
        </h1>
        <Lead>
          {googleSummaryText}.{" "}
          <TextLink href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            Read all reviews on Google
          </TextLink>
        </Lead>
        <ReviewGrid reviews={reviews} />
      </Container>
    </Band>
  );
}
