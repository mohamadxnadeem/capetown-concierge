"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { buildWhatsAppLink, buildGeneralWhatsAppMessage } from "../../../lib/whatsapp";
import { trackWhatsAppClick } from "../../../lib/tracking";

const whatsappLink = buildWhatsAppLink(
  buildGeneralWhatsAppMessage("planning a Cape Town trip")
);

const Section = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
`;

const Container = styled.div`
  width: min(900px, calc(100% - 32px));
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 14px;
  color: white;
  font-size: 2.2rem;
`;

const Text = styled.p`
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
`;

const TrustRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 24px;
`;

const TrustItem = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
`;

const Anchor = styled.a`
  display: inline-flex;
`;

export default function TestimonialsCta() {
  return (
    <Section>
      <Container>
        <Title>Ready to Experience Cape Town Like This?</Title>

        <Text>
          Message us on WhatsApp and we’ll plan your entire trip — from chauffeur
          drives and tours to wine farms and luxury experiences.
        </Text>

        <TrustRow>
          <TrustItem>Private Chauffeur</TrustItem>
          <TrustItem>Custom Itinerary</TrustItem>
          <TrustItem>Luxury Experiences</TrustItem>
          <TrustItem>Local Expertise</TrustItem>
        </TrustRow>

        <Anchor
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "testimonial_cta",
              label: "Plan My Trip",
            })
          }
        >
          <Button as="span">Plan My Cape Town Trip</Button>
        </Anchor>
      </Container>
    </Section>
  );
}