"use client";

import Link from "next/link";
import styled from "styled-components";

import { trackWhatsAppClick } from "../../../lib/tracking";
import { buildWhatsAppLink } from "../../../lib/whatsapp";

const NOT_FOUND_WHATSAPP_MESSAGE =
  "Hi, I'm trying to open my booking confirmation page but the link doesn't seem to work. Can you help?";

const Wrap = styled.main`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 72px 24px;
  background: ${({ theme }) => theme.colors.background};
`;

const Eyebrow = styled.p`
  margin: 0 0 12px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h1`
  margin: 0 0 18px;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.heading};
  line-height: 1.1;
  max-width: 520px;
`;

const Body = styled.p`
  margin: 0 0 32px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  max-width: 520px;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const PrimaryWhatsApp = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  border-radius: 14px;
  background: #25d366;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.96rem;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba(37, 211, 102, 0.32);
  }
`;

const Secondary = styled(Link)`
  padding: 14px 22px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 0.96rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-decoration: none;
`;

export default function BookingNotFound() {
  return (
    <Wrap>
      <Eyebrow>Booking not found</Eyebrow>
      <Title>We couldn&apos;t find that booking</Title>
      <Body>
        Double-check the link we sent you on WhatsApp — references are
        case-sensitive. If it still doesn&apos;t open, message us and
        we&apos;ll resend the right one.
      </Body>
      <Actions>
        <PrimaryWhatsApp
          href={buildWhatsAppLink(NOT_FOUND_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "booking_not_found",
              label: "Booking link broken",
            })
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.12 1.527 5.849L.057 23.535a.75.75 0 0 0 .928.928l5.701-1.476A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 0 1-4.93-1.343l-.355-.21-3.685.953.978-3.565-.229-.367A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
          </svg>
          WhatsApp us
        </PrimaryWhatsApp>
        <Secondary href="/">Back to home</Secondary>
      </Actions>
    </Wrap>
  );
}
