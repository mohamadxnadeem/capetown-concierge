"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Hamburger from "./Hamburger";
import {
  buildGeneralWhatsAppMessage,
  buildWhatsAppLink,
} from "../../lib/whatsapp";
import { trackWhatsAppClick } from "../../lib/tracking";
import CurrencySelector from "./CurrencySelector";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocale, useT } from "../../lib/i18n/LocaleContext";
import { brand } from "../../lib/brand";

const TELEGRAM_LINK = process.env.NEXT_PUBLIC_TELEGRAM_LINK || "";

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1100;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  box-shadow: 0 10px 30px rgba(6, 62, 35, 0.18);
`;

const HeaderContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 28px;
  }
`;

const Inner = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 20px;
  }
`;

const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;

// Same box sizes as before. The logo is a tightly cropped, high-resolution PNG
// (served by next/image as sharp 2x/3x WebP/AVIF), sized to match the previous
// on-screen size exactly: 21px tall on phones, 31px on tablets, 38px on desktop.
const LogoImage = styled.div`
  position: relative;
  width: 165px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.35));

  img {
    display: block;
    width: auto;
    height: 21px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 240px;
    height: 65px;

    img {
      height: 31px;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 300px;
    height: 80px;

    img {
      height: 38px;
    }
  }
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-right: 0;
  }
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

const MobileWhatsApp = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: #25d366;
  color: white;
  text-decoration: none;
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  flex: 0 0 auto;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(37, 211, 102, 0.45);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export default function Header() {
  const t = useT();
  const locale = useLocale();
  const headerWhatsappLink = buildWhatsAppLink(
    buildGeneralWhatsAppMessage("booking a private chauffeur or tour in Cape Town", locale)
  );
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
        <HeaderContainer>
          <Inner>
            <Logo href={t.path("/")}>
              <LogoImage>
                <Image
                  src="/images/logo-header.png"
                  alt={brand.name}
                  width={642}
                  height={328}
                  priority
                  quality={90}
                  sizes="(min-width: 1024px) 75px, (min-width: 768px) 61px, 42px"
                />
              </LogoImage>
            </Logo>

            <RightSide>
              <LanguageSwitcher />
              <CurrencySelector />

              <MobileWhatsApp
                href={headerWhatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("header.whatsappAria")}
                onClick={() =>
                  trackWhatsAppClick({
                    source: "header_mobile_whatsapp",
                    label: "WhatsApp Icon",
                  })
                }
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.12 1.527 5.849L.057 23.535a.75.75 0 0 0 .928.928l5.701-1.476A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 0 1-4.93-1.343l-.355-.21-3.685.953.978-3.565-.229-.367A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
              </MobileWhatsApp>

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
                {t("header.bookOnWhatsapp")}
              </HeaderCta>

              {locale === "ru" && TELEGRAM_LINK ? (
                <HeaderCta
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    window.gtag?.("event", "telegram_click", { source: "header_telegram" })
                  }
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: 8 }}>
                    <path d="M21.9 4.3 18.7 19.5c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.5 13.3 1.8 11.8c-1-.3-1-1 .2-1.5L20.3 3.2c.9-.3 1.6.2 1.6 1.1z" />
                  </svg>
                  {t("header.telegram")}
                </HeaderCta>
              ) : null}

              <Hamburger onClick={toggleSidebar} />
            </RightSide>
          </Inner>
        </HeaderContainer>
      </Wrapper>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}