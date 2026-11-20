"use client";

import Link from "./LocaleLink";
import styled from "styled-components";
import { brand } from "../../lib/brand";
import { useT } from "../i18n/LocaleProvider";
import LanguageSwitcher from "../i18n/LanguageSwitcher";

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(6, 62, 35, 0.35);
  backdrop-filter: blur(3px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: 0.25s ease;
  z-index: 1200;
`;

const Drawer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  inset-inline-start: 0;
  width: min(360px, 88vw);
  height: 100vh;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  box-shadow: 10px 0 30px rgba(18, 61, 43, 0.2);
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});

  /* Arabic: the menu slides in from the right edge */
  [dir="rtl"] & {
    transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "100%")});
    box-shadow: -10px 0 30px rgba(18, 61, 43, 0.2);
  }
  transition: transform 0.3s ease;
  z-index: 1300;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.04em;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.14);
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  transition: 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavLink = styled(Link)`
  padding: 14px 16px;
  border-radius: 14px;
  color: rgba(255, 255, 255, 0.92);
  font-weight: 600;
  transition: 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: white;
  }
`;

const FooterNote = styled.div`
  margin-top: auto;
  padding-top: 24px;
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.9rem;
  line-height: 1.6;
`;

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const t = useT();
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <Drawer $isOpen={isOpen}>
        <TopRow>
          <Title>{brand.name}</Title>
          <CloseButton onClick={onClose} aria-label={t("nav.closeMenu")}>
            ×
          </CloseButton>
        </TopRow>

        <Nav>
          <NavLink href="/" onClick={onClose}>
            {t("nav.home")}
          </NavLink>
          <NavLink href="/chauffeur-hire" onClick={onClose}>
            {t("nav.chauffeurHire")}
          </NavLink>
          <NavLink href="/tours" onClick={onClose}>
            {t("nav.dayTours")}
          </NavLink>
          <NavLink href="/airport-transfers-cape-town" onClick={onClose}>
            {t("nav.airportTransfers")}
          </NavLink>
          <NavLink href="/best-wine-farms-in-cape-town" onClick={onClose}>
            {t("nav.wineFarms")}
          </NavLink>
          <NavLink href="/best-activities-to-do-in-cape-town" onClick={onClose}>
            {t("nav.experiences")}
          </NavLink>
          <NavLink href="/7-day-cape-town-itinerary" onClick={onClose}>
            {t("nav.itinerary")}
          </NavLink>
        </Nav>

        <LanguageSwitcher />
        <FooterNote>{t("nav.sidebarNote")}</FooterNote>
      </Drawer>
    </>
  );
}