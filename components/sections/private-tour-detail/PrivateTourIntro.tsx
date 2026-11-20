"use client";

import styled from "styled-components";
import { googleSummary } from "../../../lib/googleReviews";
import Money from "../../common/Money";

import { useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
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

const DEFAULT_TRUST_BADGES = (tt: TFunction) => ([
  tt("PrivateTourIntro.100-private-your-vehicle-your"),
  tt("PrivateTourIntro.flexible-itinerary-you-set-the"),
  tt("PrivateTourIntro.professional-chauffeur-local-guide-included"),
]);

type Props = {
  title: string;
  shortDescription?: string;
  highlight?: string;
  duration?: string;
  location?: string;
  lowestVehiclePrice?: number;
  trustBadges?: string[];
};

export default function PrivateTourIntro({
  title,
  shortDescription,
  highlight,
  duration,
  location,
  lowestVehiclePrice,
  trustBadges: trustBadgesProp,
}: Props) {
  const tt = useT();
  const trustBadges = trustBadgesProp ?? DEFAULT_TRUST_BADGES(tt);
  return (
    <SectionHeader>
      <SectionEyebrow>{tt("PrivateTourIntro.private-tour-in-cape-town")}</SectionEyebrow>
      <Title>{title}</Title>

      <SubText>
        {shortDescription ||
          highlight ||
          tt("PrivateTourIntro.skip-the-group-buses-and", { title })}
      </SubText>

      <TrustBar>
        <TrustBadge>⭐ {googleSummary(tt)}</TrustBadge>
        {trustBadges.map((badge) => (
          <TrustBadge key={badge}>{badge}</TrustBadge>
        ))}
      </TrustBar>

      <QuickInfoRow>
        {duration ? <QuickInfoBadge>⏱ {duration}</QuickInfoBadge> : null}
        {location ? <QuickInfoBadge>📍 {location}</QuickInfoBadge> : null}
        <QuickInfoBadge>{tt("PrivateTourIntro.hotel-pickup-included")}</QuickInfoBadge>
        {lowestVehiclePrice ? (
          <QuickInfoBadge>
            <Money usd={lowestVehiclePrice} prefix="From " suffix="per vehicle, for your whole group" />
          </QuickInfoBadge>
        ) : null}
      </QuickInfoRow>


      <AlertCard>
        <AlertText>
          {tt("PrivateTourIntro.peak-season-dates-book-out")}</AlertText>
      </AlertCard>
    </SectionHeader>
  );
}
