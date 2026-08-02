"use client";

import Link from "next/link";
import styled from "styled-components";
import { brand } from "../../lib/brand";

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
  left: 0;
  width: min(360px, 88vw);
  height: 100vh;
  background: linear-gradient(180deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  box-shadow: 10px 0 30px rgba(18, 61, 43, 0.2);
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
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
  gap: 4px;
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

const NavGroupLabel = styled.div`
  margin: 20px 16px 6px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const SubNavLink = styled(Link)`
  padding: 12px 16px;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.78);
  font-weight: 500;
  font-size: 0.95rem;
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
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <Drawer $isOpen={isOpen}>
        <TopRow>
          <Title>{brand.name}</Title>
          <CloseButton onClick={onClose} aria-label="Close menu">
            ×
          </CloseButton>
        </TopRow>

        <Nav>
          <NavLink href="/chauffeur-hire" onClick={onClose}>
            Chauffeur Hire
          </NavLink>
          <NavLink href="/airport-transfers-cape-town" onClick={onClose}>
            Airport Transfers
          </NavLink>
          <NavLink href="/tours" onClick={onClose}>
            Day Tours
          </NavLink>
          <NavLink href="/7-day-cape-town-itinerary" onClick={onClose}>
            7 Day Itinerary
          </NavLink>
          <NavLink href="/villas" onClick={onClose}>
            Villas
          </NavLink>
          <NavLink href="/contact" onClick={onClose}>
            Contact
          </NavLink>

          <NavGroupLabel>Guides</NavGroupLabel>
          <SubNavLink href="/best-wine-farms-in-cape-town" onClick={onClose}>
            Wine Farms
          </SubNavLink>
          <SubNavLink href="/best-activities-to-do-in-cape-town" onClick={onClose}>
            Experiences
          </SubNavLink>
        </Nav>

        <FooterNote>
          Private chauffeur hire and guided touring in Cape Town.
        </FooterNote>
      </Drawer>
    </>
  );
}