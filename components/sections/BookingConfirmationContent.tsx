"use client";

import styled from "styled-components";
import { brand } from "../../lib/brand";
import { trackWhatsAppClick } from "../../lib/tracking";

const Wrapper = styled.main`
  min-height: calc(100vh - 82px);
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
`;

const Card = styled.div`
  width: min(600px, 100%);
  padding: 48px 40px;
  border-radius: 28px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.card};
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 36px 24px;
    border-radius: 20px;
  }
`;

const CheckBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: 20px;
  border-radius: 50%;
  background: ${({ theme }) => `${theme.colors.primary}14`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;
  font-weight: 800;
`;

const Eyebrow = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Heading = styled.h1`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.15;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.65rem;
  }
`;

const Body = styled.p`
  margin: 0 0 28px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.8;
`;

const ReferenceLabel = styled.div`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 8px;
`;

const ReferenceValue = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.heading};
  word-break: break-all;
`;

const ReferenceBox = styled.div`
  padding: 20px;
  margin-bottom: 28px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 54px;
  padding: 0 28px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0 8px 24px rgba(11, 91, 51, 0.28);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(11, 91, 51, 0.36);
  }
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

interface Props {
  reference: string;
}

export default function BookingConfirmationContent({ reference }: Props) {
  const whatsappMessage = `Hi, I'd like to confirm details for my booking — reference ${reference}.`;
  const whatsappHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Wrapper>
      <Card>
        <CheckBadge aria-hidden="true">✓</CheckBadge>
        <Eyebrow>{brand.name}</Eyebrow>
        <Heading>Your booking is confirmed</Heading>
        <Body>
          Thank you for booking with Cape Town Concierge. Your reservation is
          confirmed and a member of our team will be in touch with the full
          itinerary, pickup details, and your assigned chauffeur ahead of your
          trip.
        </Body>

        <ReferenceBox>
          <ReferenceLabel>Booking reference</ReferenceLabel>
          <ReferenceValue>{reference}</ReferenceValue>
        </ReferenceBox>

        <WhatsAppButton
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "booking_confirmation_page",
              label: "View booking on WhatsApp",
            })
          }
        >
          💬&nbsp; Message us for full booking details
        </WhatsAppButton>

        <Divider />

        <Detail>
          Quote your reference{" "}
          <strong style={{ color: "inherit" }}>{reference}</strong> when you
          message us. You can also reach us by email at{" "}
          <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>.
        </Detail>
      </Card>
    </Wrapper>
  );
}
