"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { Anchor, Container, whatsappLink } from "./shared";
import { trackWhatsAppClick } from "../../../lib/tracking";

const Section = styled.section`
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

export default function WineFinalCta() {
  return (
    <Section>
      <Container>
        <Inner>
          <Title>Plan Your Private Wine Tour in Cape Town</Title>

          <Text>
            Let us help you create the perfect wine experience — from selecting
            the best estates to planning your route, reservations, and
            chauffeur-driven travel for a seamless, stress-free day.
          </Text>

          <TrustRow>
            <TrustItem>✔ Private Chauffeur Service</TrustItem>
            <TrustItem>✔ Custom Wine Route</TrustItem>
            <TrustItem>✔ Luxury Experience</TrustItem>
            <TrustItem>✔ Flexible Itinerary</TrustItem>
          </TrustRow>

          <Anchor
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "wine_final_cta",
                label: "Start Planning Wine Tour",
              })
            }
          >
            <Button as="span">Start Planning Your Wine Tour</Button>
          </Anchor>
        </Inner>
      </Container>
    </Section>
  );
}