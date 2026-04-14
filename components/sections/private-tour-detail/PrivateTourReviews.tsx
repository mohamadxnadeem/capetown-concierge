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
        <SectionEyebrow>What Our Guests Say</SectionEyebrow>
        <SectionTitle>Trusted by Travellers Around the World</SectionTitle>
        <SectionText>
          Real clients. Real experiences. Our guests come from over 40 countries — here's what they say about travelling the Cape with us.
        </SectionText>
      </SectionHeader>

      <VerifiedLine>Over 200 verified five-star reviews across Google and direct bookings.</VerifiedLine>

      <ReviewsGrid>
        {reviews.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`}>
            <QuoteMark>"</QuoteMark>
            <ReviewQuote>{review.quote}</ReviewQuote>
            <ReviewFooter>
              <ReviewName>{review.name}</ReviewName>
              <ReviewSubtitle>{review.subtitle}</ReviewSubtitle>
            </ReviewFooter>
          </ReviewCard>
        ))}
      </ReviewsGrid>

      <GoogleRow>
        <GoogleButton
          href="https://share.google/P13pnsYwTEQGoPaSh"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Read all reviews on Google"
        >
          <GoogleG>G</GoogleG>
          <GoogleStars>★★★★★</GoogleStars>
          4.9 · See all reviews on Google
        </GoogleButton>
      </GoogleRow>
    </>
  );
}