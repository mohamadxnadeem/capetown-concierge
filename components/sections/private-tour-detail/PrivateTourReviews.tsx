"use client";

import styled from "styled-components";
import { ReviewItem } from "./types";

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
  reviews: ReviewItem[];
};

export default function PrivateTourReviews({ reviews }: Props) {
  return (
    <>
      <SectionHeader>
        <SectionEyebrow>Client Feedback</SectionEyebrow>
        <SectionTitle>What Guests Love About This Tour</SectionTitle>
        <SectionText>
          Social proof helps travellers feel confident before booking a private experience.
        </SectionText>
      </SectionHeader>

      <ReviewsGrid>
        {reviews.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`}>
            <QuoteMark>“</QuoteMark>
            <ReviewQuote>{review.quote}</ReviewQuote>
            <ReviewFooter>
              <ReviewName>{review.name}</ReviewName>
              <ReviewSubtitle>{review.subtitle}</ReviewSubtitle>
            </ReviewFooter>
          </ReviewCard>
        ))}
      </ReviewsGrid>
    </>
  );
}