"use client";

import styled from "styled-components";
import { brand } from "../../lib/brand";
import { trackWhatsAppClick } from "../../lib/tracking";

const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 82px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
`;

const Card = styled.div`
  width: min(540px, 100%);
  padding: 44px 36px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 32px 22px;
  }
`;

const Eyebrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const Heading = styled.h1`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.7rem;
  line-height: 1.2;
`;

const Body = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.7;
`;

const Reference = styled.code`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.heading};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.95rem;
  word-break: break-all;
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 50px;
  padding: 0 24px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 700;
  font-size: 0.98rem;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(11, 91, 51, 0.25);

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

interface Props {
  reference: string;
}

export default function BookingNotFoundView({ reference }: Props) {
  const whatsappHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    `Hi, I can't load my booking ${reference} on the website. Could you help?`
  )}`;

  return (
    <Wrapper>
      <Card>
        <Eyebrow>{brand.name}</Eyebrow>
        <Heading>We couldn&apos;t find that booking</Heading>
        <Body>
          No booking matches reference <Reference>{reference}</Reference>.
          Double-check the link in your confirmation email or message us and
          we&apos;ll sort it out right away.
        </Body>
        <WhatsAppButton
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "booking_not_found",
              label: "Message support",
            })
          }
        >
          💬&nbsp; Message us on WhatsApp
        </WhatsAppButton>
      </Card>
    </Wrapper>
  );
}
