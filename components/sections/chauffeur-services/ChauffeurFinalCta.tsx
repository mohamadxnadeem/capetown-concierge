"use client";

import styled from "styled-components";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { PAYMENT_BADGE } from "../../../lib/vehicleTrustBadges";

type Props = {
  title: string;
  whatsappLink: string;
};

const FinalCta = styled.section`
  padding: 84px 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
`;

const FinalCtaInner = styled.div`
  max-width: 820px;
  margin: 0 auto;
  text-align: center;
`;

const FinalCtaTitle = styled.h2`
  margin: 0 0 14px;
  color: white;
  font-size: 2.1rem;
  line-height: 1.1;
`;

const FinalCtaText = styled.p`
  margin: 0 auto 24px;
  max-width: 700px;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.85;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 22px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 700;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const PayBadge = styled.p`
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
  margin: 20px auto 0;
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gold}4D;
  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.cream};
  font-size: 0.82rem;
  line-height: 1.4;

  strong {
    font-size: 0.9rem;
  }

  span {
    opacity: 0.85;
  }
`;

export default function ChauffeurFinalCta({ title, whatsappLink }: Props) {
  return (
    <FinalCta>
      <FinalCtaInner>
        <FinalCtaTitle>Ready to Book {title}?</FinalCtaTitle>
        <FinalCtaText>
          Message us on WhatsApp to confirm availability, pricing, and the best
          chauffeur option for your Cape Town travel plans.
        </FinalCtaText>

        <PrimaryButton
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "chauffeur_final_cta",
              label: "Book on WhatsApp",
              vehicle: title,
            })
          }
        >
          Check Availability on WhatsApp
        </PrimaryButton>

        <div>
          <PayBadge>
            <strong>{PAYMENT_BADGE.title}</strong>
            <span>{PAYMENT_BADGE.subtitle}</span>
          </PayBadge>
        </div>
      </FinalCtaInner>
    </FinalCta>
  );
}