"use client";

import styled from "styled-components";
import Link from "next/link";

const SectionHeader = styled.div`
  max-width: 860px;
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

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.heading};
  margin: 0 0 16px;
  line-height: 1.05;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.6rem;
  }
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  margin: 0;
  max-width: 860px;
  font-size: 1.04rem;
`;

const TrustBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
`;

const TrustBadge = styled.div`
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.06);
  border: 1px solid rgba(11, 91, 51, 0.1);
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.84rem;
  font-weight: 700;
`;

const QuickInfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
`;

const QuickInfoBadge = styled.div`
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  border: 1px solid rgba(11, 91, 51, 0.12);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 700;
`;

const AlertCard = styled.div`
  margin-top: 22px;
  padding: 16px 18px;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.1) 0%,
    rgba(212, 175, 55, 0.04) 100%
  );
  border: 1px solid rgba(212, 175, 55, 0.22);
`;

const AlertTitle = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  margin-bottom: 6px;
`;

const AlertText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

const InlineLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;
`;

type Props = {
  title: string;
  shortDescription?: string;
  highlight?: string;
  duration?: string;
  location?: string;
  priceText?: string;
};

export default function PrivateTourIntro({
  title,
  shortDescription,
  highlight,
  duration,
  location,
  priceText,
}: Props) {
  return (
    <SectionHeader>
      <SectionEyebrow>Private Tour in Cape Town</SectionEyebrow>
      <Title>{title}</Title>

      <SubText>
        {shortDescription ||
          highlight ||
          "Experience Cape Town like never before with a luxury private tour designed around comfort, flexibility, and unforgettable scenic moments."}{" "}
        Explore more curated <InlineLink href="/private-tours">private tours</InlineLink>{" "}
        or pair this with our <InlineLink href="/chauffeur-services">chauffeur services</InlineLink>{" "}
        for a smoother luxury travel experience.
      </SubText>

      <TrustBar>
        <TrustBadge>⭐ Trusted by international travellers</TrustBadge>
        <TrustBadge>✔ Private experience</TrustBadge>
        <TrustBadge>✔ Flexible itinerary</TrustBadge>
        <TrustBadge>✔ Premium chauffeur service</TrustBadge>
      </TrustBar>

      <QuickInfoRow>
        {duration ? <QuickInfoBadge>{duration}</QuickInfoBadge> : null}
        {location ? <QuickInfoBadge>{location}</QuickInfoBadge> : null}
        {priceText ? <QuickInfoBadge>{priceText}</QuickInfoBadge> : null}
        <QuickInfoBadge>Hotel pickup available</QuickInfoBadge>
      </QuickInfoRow>

      <AlertCard>
        <AlertTitle>Popular with first-time Cape Town visitors</AlertTitle>
        <AlertText>
          Peak-season dates can book out quickly, especially for premium private touring.
          Message us early to secure your preferred date and vehicle.
        </AlertText>
      </AlertCard>
    </SectionHeader>
  );
}