"use client";

import styled from "styled-components";
import { trackWhatsAppClick } from "../../lib/tracking";

const WHATSAPP =
  "https://wa.me/27636746131?text=Hey%2C%20I%27d%20like%20to%20make%20a%20booking.%20Please%20can%20you%20assist%3F";

const Wrapper = styled.main`
  min-height: calc(100vh - 82px);
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
`;

const Card = styled.div`
  width: min(540px, 100%);
  padding: 48px 40px;
  border-radius: 28px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  text-align: center;
`;

const Eyebrow = styled.div`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Heading = styled.h1`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2.2rem;
  line-height: 1.1;
`;

const Body = styled.p`
  margin: 0 0 32px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.8;
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 54px;
  padding: 0 28px;
  border-radius: 16px;
  background: #0b5b33;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(11, 91, 51, 0.28);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: #063e23;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(11, 91, 51, 0.36);
  }
`;

const ResponseBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.82rem;
  font-weight: 700;
`;

const Divider = styled.div`
  margin: 28px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Detail = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  line-height: 1.7;

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function ContactContent() {
  return (
    <Wrapper>
      <Card>
        <Eyebrow>Cape Town Concierge</Eyebrow>
        <Heading>Get in Touch</Heading>
        <Body>
          The fastest way to book a chauffeur service, airport transfer, or
          private tour in Cape Town is via WhatsApp. We typically respond within
          30 minutes and can confirm availability and pricing on the same
          message.
        </Body>

        <WhatsAppButton
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick({ source: "contact_page", label: "Chat on WhatsApp" })}
        >
          💬&nbsp; Chat on WhatsApp
        </WhatsAppButton>

        <ResponseBadge>⚡ We typically respond within 30 minutes</ResponseBadge>

        <Divider />

        <Detail>
          You can also reach us by email at{" "}
          <a href="mailto:zaid@capetown-concierge.co.za">
            zaid@capetown-concierge.co.za
          </a>
        </Detail>
      </Card>
    </Wrapper>
  );
}
