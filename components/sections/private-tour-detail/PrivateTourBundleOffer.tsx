"use client";

import styled from "styled-components";
import Button from "../../common/Button";

const OfferCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.12);
  padding: 30px;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Eyebrow = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;
`;

const Text = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  max-width: 760px;
`;

const CTAAnchor = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

type Props = {
  whatsappLink: string;
};

export default function PrivateTourBundleOffer({ whatsappLink }: Props) {
  return (
    <OfferCard>
      <Eyebrow>Special Offer</Eyebrow>
      <Title>Save More When You Book 3 Tours</Title>
      <Text>
        Planning to explore more of Cape Town? Book any 3 private tours together
        and ask us about a special bundled rate. It’s the perfect option for
        travellers who want to enjoy more experiences while keeping their trip
        smooth, stylish, and well organised.
      </Text>

      <CTAAnchor href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <Button as="span">Get Multi-Tour Offer on WhatsApp</Button>
      </CTAAnchor>
    </OfferCard>
  );
}