"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { Anchor, Container, whatsappLink } from "./shared";

const FinalCta = styled.section`
  padding: 84px 0;
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
`;

const Inner = styled.div`
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0 0 14px;
  color: white;
  font-size: 2.2rem;
  line-height: 1.08;
`;

const Text = styled.p`
  margin: 0 auto 24px;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.85;
`;

const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-bottom: 24px;
`;

const TrustItem = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
`;

export default function ItineraryFinalCta() {
  return (
    <FinalCta>
      <Container>
        <Inner>
          <Title>Want This Cape Town Trip Planned for You?</Title>
          <Text>
            Message us on WhatsApp and we can help you turn this 7 day itinerary
            into a private, chauffeur-driven Cape Town experience tailored to
            your dates, preferences, and travel style.
          </Text>

          <TrustRow>
            <TrustItem>Private Chauffeur Service</TrustItem>
            <TrustItem>Flexible Itinerary</TrustItem>
            <TrustItem>Luxury Experience</TrustItem>
            <TrustItem>Custom Planning</TrustItem>
          </TrustRow>

          <Anchor
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "itinerary_final_cta",
                label: "Plan My 7 Day Cape Town Trip",
              })
            }
          >
            <Button as="span">Plan My 7 Day Cape Town Trip</Button>
          </Anchor>
        </Inner>
      </Container>
    </FinalCta>
  );
}