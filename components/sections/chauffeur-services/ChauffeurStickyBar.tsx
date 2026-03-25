"use client";

import styled from "styled-components";
import { trackWhatsAppClick } from "../../../lib/tracking";

type Props = {
  title: string;
  priceText?: string;
  whatsappLink: string;
};

const StickyBar = styled.div`
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.92);
  backdrop-filter: blur(14px);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.22);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 860px;
    margin: 0 auto;
  }
`;

const StickyCopy = styled.div`
  min-width: 0;
`;

const StickyTitle = styled.div`
  color: white;
  font-weight: 700;
  font-size: 0.98rem;
  line-height: 1.2;
  margin-bottom: 2px;
`;

const StickySubtext = styled.div`
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.84rem;
  line-height: 1.3;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 700;
  text-decoration: none;
`;

export default function ChauffeurStickyBar({
  title,
  priceText,
  whatsappLink,
}: Props) {
  return (
    <StickyBar>
      <StickyCopy>
        <StickyTitle>{title}</StickyTitle>
        <StickySubtext>
          {priceText || "Private chauffeur vehicle"} • Check availability now
        </StickySubtext>
      </StickyCopy>

      <Button
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackWhatsAppClick({
            source: "chauffeur_sticky_bar",
            label: "Book",
            vehicle: title,
          })
        }
      >
        Book
      </Button>
    </StickyBar>
  );
}