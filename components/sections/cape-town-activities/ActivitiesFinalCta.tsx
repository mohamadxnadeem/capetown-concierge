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

const FinalCtaInner = styled.div`
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
`;

const FinalCtaTitle = styled.h2`
  margin: 0 0 14px;
  color: white;
  font-size: 2.2rem;
  line-height: 1.08;
`;

const FinalCtaText = styled.p`
  margin: 0 auto 24px;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.85;
`;

export default function ActivitiesFinalCta() {
  const tt = useT();
  return (
    <FinalCta>
      <Container>
        <FinalCtaInner>
          <FinalCtaTitle>{tt("ActivitiesFinalCta.want-the-best-of-cape")}</FinalCtaTitle>
          <FinalCtaText>
            {tt("ActivitiesFinalCta.message-us-on-whatsapp-and")}</FinalCtaText>

          <Anchor
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "best_activities_final_cta",
                label: "Start Planning on WhatsApp",
              })
            }
          >
            <Button as="span">{tt("ActivitiesFinalCta.start-planning-on-whatsapp")}</Button>
          </Anchor>
        </FinalCtaInner>
      </Container>
    </FinalCta>
  );
}