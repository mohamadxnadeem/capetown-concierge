"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Container from "./Container";
import Sidebar from "./Sidebar";
import Hamburger from "./Hamburger";
import {
  buildGeneralWhatsAppMessage,
  buildWhatsAppLink,
} from "../../lib/whatsapp";
import { trackWhatsAppClick } from "../../lib/tracking";

const headerWhatsappLink = buildWhatsAppLink(
  buildGeneralWhatsAppMessage("booking a private chauffeur or tour in Cape Town")
);

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1100;
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
  box-shadow: 0 10px 30px rgba(6, 62, 35, 0.18);
`;

const Inner = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.div`
  position: relative;
  width: 240px;
  height: 65px;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.35));

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 300px;
    height: 80px;
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderCta = styled.a`
  display: none;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: translateY(-1px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline-flex;
  }
`;

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <Wrapper>
        <Container>
          <Inner>
            <Logo href="/">
              <LogoImage>
                <Image
                  src="/images/logo.svg"
                  alt="Cape Town Concierge"
                  fill
                  priority
                  style={{
                    objectFit: "contain",
                    transform: "scale(1.15)",
                  }}
                />
              </LogoImage>
            </Logo>

            <RightSide>
              <HeaderCta
                href={headerWhatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source: "header_cta",
                    label: "Book Now",
                  })
                }
              >
                Book Now
              </HeaderCta>

              <Hamburger onClick={toggleSidebar} />
            </RightSide>
          </Inner>
        </Container>
      </Wrapper>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}