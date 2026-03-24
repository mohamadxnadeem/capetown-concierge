"use client";

import styled from "styled-components";

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

function getBenefitDescription(feature: string) {
  const normalized = feature.toLowerCase();

  if (normalized.includes("private chauffeur")) {
    return "Enjoy a more exclusive and seamless travel experience with a dedicated driver focused on your comfort, timing, and preferences.";
  }

  if (normalized.includes("premium travel") || normalized.includes("presentation")) {
    return "Travel with a higher level of comfort and presentation, ideal for visitors, VIP guests, business travel, and polished airport arrivals.";
  }

  if (normalized.includes("airport")) {
    return "Skip the stress of waiting, parking, or navigating unfamiliar routes with a reliable airport transfer experience designed around punctuality.";
  }

  if (normalized.includes("tour")) {
    return "A private chauffeur service gives you the flexibility to explore Cape Town at your own pace without being tied to group schedules.";
  }

  if (normalized.includes("executive")) {
    return "Perfect for professionals who value privacy, punctuality, and a refined travel standard while moving between meetings, hotels, and events.";
  }

  if (normalized.includes("comfort")) {
    return "Sit back and enjoy a smoother, more relaxed journey while your chauffeur handles the driving, route planning, and timing.";
  }

  return "A private chauffeur service helps create a smoother, more comfortable, and more personalised travel experience in Cape Town.";
}

export default function ChauffeurFeatures({ features }: Props) {
  const defaultBenefits = [
    "Private chauffeur service",
    "Premium travel presentation",
    "Reliable airport transfers",
    "Flexible private touring",
    "Executive-level comfort",
    "Stress-free local travel",
  ];

  const items = features.length ? features : defaultBenefits;

  return (
    <Card>
      <CardInner>
        <Title>Why Travelers Choose a Private Chauffeur Service</Title>

        <IntroText>
          A private chauffeur service offers more than just transport. It gives you
          a smoother, more refined way to move through Cape Town with added comfort,
          flexibility, privacy, and convenience throughout your journey.
        </IntroText>

        <FeaturesGrid>
          {items.map((feature, index) => (
            <FeatureCard key={`${feature}-${index}`}>
              <FeatureTitle>{feature}</FeatureTitle>
              <FeatureText>{getBenefitDescription(feature)}</FeatureText>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </CardInner>
    </Card>
  );
}