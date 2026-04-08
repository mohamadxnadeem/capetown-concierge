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
        <CTAEyebrow>Ready to Book?</CTAEyebrow>
        <CTATitle>{title || "Book Your Private Cape Peninsula Tour"}</CTATitle>
        <CTAText>
          {body || "Message us on WhatsApp to check availability, ask any questions, and lock in your preferred date. We respond within 30 minutes — usually much faster."}
        </CTAText>

        <CTAButtons>
          <CTAAnchor
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "private_tour_cta",
                label: "Book This Tour",
              })
            }
          >
            <Button as="span">Book This Tour →</Button>
          </CTAAnchor>

          <CTAAnchor
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "private_tour_cta",
                label: "Chat on WhatsApp",
              })
            }
          >
            <Button as="span" $variant="secondary">
              Chat on WhatsApp →
            </Button>
          </CTAAnchor>
        </CTAButtons>
      </CTABox>
    </CTASection>
  );
}