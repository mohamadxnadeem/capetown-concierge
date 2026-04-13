"use client";

import styled from "styled-components";

const Badge = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  text-decoration: none;
  transition: border-color 0.18s;

  &:hover {
    border-color: #4285f4;
  }
`;

const GoogleG = styled.span`
  font-size: 1.15rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4285f4 0%, #34a853 40%, #fbbc05 70%, #ea4335 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  flex-shrink: 0;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Score = styled.span`
  font-size: 0.92rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
  line-height: 1;
`;

const Stars = styled.span`
  color: #fbbc05;
  font-size: 0.75rem;
  letter-spacing: 1px;
  line-height: 1;
`;

const Label = styled.span`
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1;
`;

export default function GoogleRatingBadge() {
  return (
    <Badge
      href="https://www.google.com/search?q=Cape+Town+Concierge+reviews"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cape Town Concierge — 4.9 Google Reviews"
    >
      <GoogleG>G</GoogleG>
      <Info>
        <RatingRow>
          <Score>4.9</Score>
          <Stars>★★★★★</Stars>
        </RatingRow>
        <Label>Google Reviews</Label>
      </Info>
    </Badge>
  );
}
