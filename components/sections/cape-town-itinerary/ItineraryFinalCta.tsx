"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { Anchor, Container, whatsappLink } from "./shared";

import { useT } from "../../../lib/i18n/LocaleContext";
const FinalCta = styled.section`
  padding: 84px 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
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
  const tt = useT();
  return (
    <FinalCta>
      <Container>
        <Inner>
          <Title>{tt("ItineraryFinalCta.want-this-cape-town-trip")}</Title>
          <Text>
            {tt("ItineraryFinalCta.message-us-on-whatsapp-and")}</Text>

          <TrustRow>
            <TrustItem>{tt("ItineraryFinalCta.private-chauffeur-service")}</TrustItem>
            <TrustItem>{tt("ItineraryFinalCta.flexible-itinerary")}</TrustItem>
            <TrustItem>{tt("ItineraryFinalCta.luxury-experience")}</TrustItem>
            <TrustItem>{tt("ItineraryFinalCta.custom-planning")}</TrustItem>
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
            <Button as="span">{tt("ItineraryFinalCta.plan-my-7-day-cape")}</Button>
          </Anchor>
        </Inner>
      </Container>
    </FinalCta>
  );
}