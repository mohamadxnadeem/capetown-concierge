"use client";

import styled from "styled-components";

import { useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
type Props = {
  features: string[];
};

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardInner = styled.div`
  padding: 28px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 34px;
  }
`;

const Title = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.95rem;
  line-height: 1.12;
`;

const IntroText = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
  max-width: 860px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  gap: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FeatureCard = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.12);
`;

const FeatureTitle = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  margin-bottom: 8px;
`;

const FeatureText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

function getBenefitDescription(feature: string, tt: TFunction) {
  const normalized = feature.toLowerCase();

  if (normalized.includes("private chauffeur")) {
    return tt("ChauffeurFeatures.enjoy-a-more-exclusive-and");
  }

  if (normalized.includes("premium travel") || normalized.includes("presentation")) {
    return tt("ChauffeurFeatures.travel-with-a-higher-level");
  }

  if (normalized.includes("airport")) {
    return tt("ChauffeurFeatures.skip-the-stress-of-waiting");
  }

  if (normalized.includes("tour")) {
    return tt("ChauffeurFeatures.a-private-chauffeur-service-gives");
  }

  if (normalized.includes("executive")) {
    return tt("ChauffeurFeatures.perfect-for-professionals-who-value");
  }

  if (normalized.includes("comfort")) {
    return tt("ChauffeurFeatures.sit-back-and-enjoy-a");
  }

  return tt("ChauffeurFeatures.a-private-chauffeur-service-helps");
}

export default function ChauffeurFeatures({ features }: Props) {
  const tt = useT();
  const defaultBenefits = [
    tt("ChauffeurFeatures.private-chauffeur-service"),
    tt("ChauffeurFeatures.premium-travel-presentation"),
    tt("ChauffeurFeatures.reliable-airport-transfers"),
    tt("ChauffeurFeatures.flexible-private-touring"),
    tt("ChauffeurFeatures.executive-level-comfort"),
    tt("ChauffeurFeatures.stress-free-local-travel"),
  ];

  const items = features.length ? features : defaultBenefits;

  return (
    <Card>
      <CardInner>
        <Title>{tt("ChauffeurFeatures.why-travellers-choose-a-private")}</Title>

        <IntroText>
          {tt("ChauffeurFeatures.a-private-chauffeur-service-offers")}</IntroText>

        <FeaturesGrid>
          {items.map((feature, index) => (
            <FeatureCard key={`${feature}-${index}`}>
              <FeatureTitle>{feature}</FeatureTitle>
              <FeatureText>{getBenefitDescription(feature, tt)}</FeatureText>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </CardInner>
    </Card>
  );
}