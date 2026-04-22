"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";

const CTASection = styled.section`
  padding: 84px 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
`;

const CTABox = styled.div`
  text-align: center;
  max-width: 860px;
  margin: 0 auto;
`;

const CTAEyebrow = styled.div`
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CTATitle = styled.h2`
  margin: 0 0 14px;
  color: white;
  font-size: 2.1rem;
  line-height: 1.1;
`;

const CTAText = styled.p`
  margin: 0 auto 24px;
  max-width: 700px;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.8;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
`;

const CTAAnchor = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

type Props = {
  whatsappLink: string;
  title?: string;
  body?: string;
};

export default function PrivateTourCta({ whatsappLink, title, body }: Props) {
  return (
    <CTASection>
      <CTABox>
        <CTATitle>{title || "Ready to book? Here's how it works"}</CTATitle>
        <CTAText>
          {body || "Send us a WhatsApp with your travel dates and group size. We'll confirm availability and send you a price within 30 minutes. No deposit is required to hold a date while you decide — just message us and we'll take it from there."}
        </CTAText>

        <CTAButtons>
          <CTAAnchor
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "private_tour_cta",
                label: "Reserve My Date on WhatsApp",
              })
            }
          >
            <Button as="span">Reserve My Date on WhatsApp</Button>
          </CTAAnchor>

          <CTAAnchor
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "private_tour_cta",
                label: "Get a Price for My Group",
              })
            }
          >
            <Button as="span" $variant="secondary">
              Get a Price for My Group
            </Button>
          </CTAAnchor>
        </CTAButtons>
      </CTABox>
    </CTASection>
  );
}