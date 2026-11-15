"use client";

import styled from "styled-components";
import Container from "../../common/Container";
import Button from "../../common/Button";
import EnquiryForm from "../EnquiryForm";
import { buildWhatsAppLink, buildGeneralWhatsAppMessage } from "../../../lib/whatsapp";
import { trackWhatsAppClick } from "../../../lib/tracking";

const Wrap = styled.section`
  padding: 72px 0;
  background: ${({ theme }) => theme.colors.background};
  scroll-margin-top: 90px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

const H2 = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.8rem;
  }
`;

const Lead = styled.p`
  margin: 0 0 32px;
  max-width: 760px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const Split = styled.div`
  display: grid;
  gap: 24px;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1.4fr;
  }
`;

const WaCard = styled.div`
  padding: 32px 28px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const WaTitle = styled.h3`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.25rem;
`;

const WaText = styled.p`
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  font-size: 0.95rem;
`;

const Anchor = styled.a`
  display: inline-flex;
`;

const FormSide = styled.div`
  > div {
    max-width: none;
  }
`;

export default function HomeEnquiry() {
  const href = buildWhatsAppLink(
    buildGeneralWhatsAppMessage("a private chauffeur, day tour or multi-day trip in Cape Town")
  );
  return (
    <Wrap id="enquiry">
      <Container>
        <H2>Plan your trip</H2>
        <Lead>Message us on WhatsApp for the fastest reply, or send the form and we will reply by email.</Lead>
        <Split>
          <WaCard>
            <WaTitle>Enquire on WhatsApp</WaTitle>
            <WaText>Tell us your dates and what you would like to do. We reply with a tailored quote within 30 minutes.</WaText>
            <Anchor
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({ source: "homepage_enquiry", label: "Enquire on WhatsApp" })}
            >
              <Button as="span">Enquire on WhatsApp</Button>
            </Anchor>
          </WaCard>
          <FormSide>
            <EnquiryForm variant="full" />
          </FormSide>
        </Split>
      </Container>
    </Wrap>
  );
}
