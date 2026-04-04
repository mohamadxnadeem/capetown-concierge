"use client";

import styled, { keyframes } from "styled-components";
import { trackWhatsAppClick } from "../../lib/tracking";
import {
  buildWhatsAppLink,
  buildGeneralWhatsAppMessage,
} from "../../lib/whatsapp";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
  70% { box-shadow: 0 0 0 12px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
`;

const Wrap = styled.a`
  position: fixed;
  bottom: 24px;
  right: 20px;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px 12px 14px;
  border-radius: 999px;
  background: #25d366;
  color: #fff;
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.22);
  animation: ${pulse} 2.4s ease-in-out infinite;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.28);
    animation: none;
  }

  /* Hide label on very small screens, show just icon */
  @media (max-width: 360px) {
    padding: 13px;
  }
`;

const Icon = styled.svg`
  width: 22px;
  height: 22px;
  flex: 0 0 auto;
`;

const Label = styled.span`
  @media (max-width: 360px) {
    display: none;
  }
`;

const whatsappLink = buildWhatsAppLink(
  buildGeneralWhatsAppMessage("booking a private tour or chauffeur service in Cape Town")
);

export default function FloatingWhatsApp() {
  return (
    <Wrap
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() =>
        trackWhatsAppClick({
          source: "floating_button",
          label: "Chat on WhatsApp",
        })
      }
    >
      <Icon viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.12 1.527 5.849L.057 23.535a.75.75 0 0 0 .928.928l5.701-1.476A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 0 1-4.93-1.343l-.355-.21-3.685.953.978-3.565-.229-.367A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
      </Icon>
      <Label>Chat on WhatsApp</Label>
    </Wrap>
  );
}
