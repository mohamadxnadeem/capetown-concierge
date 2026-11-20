"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { Anchor, Container, whatsappLink } from "./shared";
import { trackWhatsAppClick } from "../../../lib/tracking";

import { useT } from "../../../lib/i18n/LocaleContext";
const Section = styled.section`
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

export default function WineFinalCta() {
  const tt = useT();
  return (
    <Section>
      <Container>
        <Inner>
          <Title>{tt("WineFinalCta.plan-your-private-wine-tour")}</Title>

          <Text>
            {tt("WineFinalCta.let-us-help-you-create")}</Text>

          <TrustRow>
            <TrustItem>{tt("WineFinalCta.private-chauffeur-service")}</TrustItem>
            <TrustItem>{tt("WineFinalCta.custom-wine-route")}</TrustItem>
            <TrustItem>{tt("WineFinalCta.luxury-experience")}</TrustItem>
            <TrustItem>{tt("WineFinalCta.flexible-itinerary")}</TrustItem>
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
            <Button as="span">{tt("WineFinalCta.start-planning-your-wine-tour")}</Button>
          </Anchor>
        </Inner>
      </Container>
    </Section>
  );
}