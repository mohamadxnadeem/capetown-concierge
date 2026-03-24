"use client";

import styled from "styled-components";
import { ReviewItem } from "./types";

type Props = {
  reviews: ReviewItem[];
};

const Title = styled.h2`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.95rem;
  line-height: 1.12;
`;

const ReviewsGrid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ReviewCard = styled.div`
  padding: 24px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const QuoteMark = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

const ReviewText = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.heading};
  line-height: 1.85;
`;

const ReviewName = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
`;

const ReviewSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  margin-top: 4px;
`;

export default function ChauffeurReviews({ reviews }: Props) {
  return (
    <>
      <Title>Client Feedback</Title>

      <ReviewsGrid>
        {reviews.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`}>
            <QuoteMark>“</QuoteMark>
            <ReviewText>{review.quote}</ReviewText>
            <ReviewName>{review.name}</ReviewName>
            <ReviewSubtitle>{review.subtitle}</ReviewSubtitle>
          </ReviewCard>
        ))}
      </ReviewsGrid>
    </>
  );
}