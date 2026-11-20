"use client";

import styled from "styled-components";
import {
  GOOGLE_REVIEWS_URL,
  googleRatingLabel,
  googleReviewCount,
  googleSummaryText,
  type GoogleReview,
} from "../../../lib/googleReviews";

import { useT } from "../../../lib/i18n/LocaleContext";
const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 28px;
`;

const SectionEyebrow = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;
`;

const SectionText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const VerifiedLine = styled.p`
  margin: 0 0 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
`;

const GoogleRow = styled.div`
  margin-top: 28px;
  display: flex;
  justify-content: center;
`;

const GoogleButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 12px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-decoration: none;
  font-size: 0.84rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: border-color 0.18s ease;
  white-space: nowrap;

  &:hover {
    border-color: #4285f4;
  }
`;

const GoogleG = styled.span`
  font-size: 1.05rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4285f4 0%, #34a853 40%, #fbbc05 70%, #ea4335 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`;

const GoogleStars = styled.span`
  color: #fbbc05;
  font-size: 0.78rem;
  letter-spacing: 1px;
`;

const ReviewsGrid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ReviewCard = styled.div`
  height: 100%;
  padding: 26px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const QuoteMark = styled.div`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
`;

const ReviewQuote = styled.p`
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.heading};
  line-height: 1.85;
  min-height: 120px;
  white-space: pre-line;
  overflow-wrap: anywhere;
`;

const ReviewFooter = styled.div`
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ReviewName = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  margin-bottom: 4px;
`;

const ReviewSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.94rem;
`;

type Props = {
  reviews: GoogleReview[];
};

export default function PrivateTourReviews({ reviews }: Props) {
  const tt = useT();
  return (
    <>
      <SectionHeader>
        <SectionEyebrow>{tt("PrivateTourReviews.what-our-guests-say")}</SectionEyebrow>
        <SectionTitle>{tt("PrivateTourReviews.trusted-by-travellers-around-the")}</SectionTitle>
        <SectionText>
          {tt("PrivateTourReviews.real-clients-real-experiences-our")}</SectionText>
      </SectionHeader>

      <VerifiedLine>{googleSummaryText}</VerifiedLine>

      <ReviewsGrid>
        {reviews.map((review) => (
          <ReviewCard key={review.id}>
            <QuoteMark>"</QuoteMark>
            <ReviewQuote>{review.text}</ReviewQuote>
            <ReviewFooter>
              <ReviewName>{review.reviewer_name}</ReviewName>
              <ReviewSubtitle>
                {tt("PrivateTourReviews.google-review")}{review.date_label ? tt("PrivateTourReviews.text", { date_label: review.date_label }) : ""}
              </ReviewSubtitle>
              {review.translated_from ? (
                <ReviewSubtitle>{tt("PrivateTourReviews.translated-from")}{" "}{review.translated_from}</ReviewSubtitle>
              ) : null}
            </ReviewFooter>
          </ReviewCard>
        ))}
      </ReviewsGrid>

      <GoogleRow>
        <GoogleButton
          href={tt.path(GOOGLE_REVIEWS_URL)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={tt("PrivateTourReviews.read-all-reviews-on-google")}
        >
          <GoogleG>{tt("PrivateTourReviews.g")}</GoogleG>
          <GoogleStars>★★★★★</GoogleStars>
          {googleRatingLabel} {tt("PrivateTourReviews.from")}{" "}{googleReviewCount} {tt("PrivateTourReviews.google-reviews-see-all-reviews")}</GoogleButton>
      </GoogleRow>
    </>
  );
}