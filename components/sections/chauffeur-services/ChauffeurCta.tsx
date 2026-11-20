"use client";

import styled from "styled-components";
import Button from "../../common/Button";

import { useT } from "../../../lib/i18n/LocaleContext";
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
};

export default function ChauffeurCta({ whatsappLink }: Props) {
  const tt = useT();
  return (
    <CTASection>
      <CTABox>
        <CTAEyebrow>{tt("ChauffeurCta.ready-to-book")}</CTAEyebrow>
        <CTATitle>{tt("ChauffeurCta.plan-your-chauffeur-booking-in")}</CTATitle>
        <CTAText>
          {tt("ChauffeurCta.message-us-on-whatsapp-to")}</CTAText>

        <CTAButtons>
          <CTAAnchor href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button as="span">{tt("ChauffeurCta.book-on-whatsapp")}</Button>
          </CTAAnchor>
        </CTAButtons>
      </CTABox>
    </CTASection>
  );
}