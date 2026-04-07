"use client";

import styled from "styled-components";
import Money from "../../common/Money";

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

type Props = {
  title: string;
  shortDescription?: string;
  highlight?: string;
  duration?: string;
  location?: string;
  lowestVehiclePrice?: number;
};

export default function PrivateTourIntro({
  title,
  shortDescription,
  highlight,
  duration,
  location,
  lowestVehiclePrice,
}: Props) {
  return (
    <SectionHeader>
      <SectionEyebrow>Private Tour in Cape Town</SectionEyebrow>
      <Title>{title}</Title>

      <SubText>
        {shortDescription ||
          highlight ||
          `Skip the group buses and crowded shuttles. The ${title} is a fully private, chauffeur-driven experience — your vehicle, your schedule, your pace. No shared passengers. No fixed stops you didn't ask for.`}
      </SubText>

      <TrustBar>
        <TrustBadge>⭐ 4.9 Rated by international travellers</TrustBadge>
        <TrustBadge>✔ 100% Private — no shared rides</TrustBadge>
        <TrustBadge>✔ Flexible itinerary</TrustBadge>
        <TrustBadge>✔ Professional chauffeur included</TrustBadge>
      </TrustBar>

      <QuickInfoRow>
        {duration ? <QuickInfoBadge>⏱ {duration}</QuickInfoBadge> : null}
        {location ? <QuickInfoBadge>📍 {location}</QuickInfoBadge> : null}
        <QuickInfoBadge>🚗 Hotel pickup included</QuickInfoBadge>
        {lowestVehiclePrice ? (
          <QuickInfoBadge>
            <Money usd={lowestVehiclePrice} prefix="From " suffix="per vehicle" />
          </QuickInfoBadge>
        ) : null}
      </QuickInfoRow>

      <AlertCard>
        <AlertTitle>⚡ Peak-season dates fill fast</AlertTitle>
        <AlertText>
          Private tours book out 2–3 weeks in advance during peak season.
          Message us now to lock in your preferred date — we respond within 30 minutes.
        </AlertText>
      </AlertCard>
    </SectionHeader>
  );
}
