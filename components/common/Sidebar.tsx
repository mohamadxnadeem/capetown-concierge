"use client";

import Link from "next/link";
import styled from "styled-components";

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
  background: linear-gradient(180deg, #0b5b33 0%, #063e23 100%);
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
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <Drawer $isOpen={isOpen}>
        <TopRow>
          <Title>Cape Town Concierge</Title>
          <CloseButton onClick={onClose} aria-label="Close menu">
            ×
          </CloseButton>
        </TopRow>

        <Nav>
          <NavLink href="/" onClick={onClose}>
            Home
          </NavLink>
          <NavLink href="/best-activities-to-do-in-cape-town" onClick={onClose}>
            Experiences
          </NavLink>

            <NavLink href="/best-wine-farms-in-cape-town" onClick={onClose}>
              Wine Farms
            </NavLink>

            <NavLink href="/7-day-cape-town-itinerary" onClick={onClose}>
              7 Day Itinerary
            </NavLink>

          {/* <NavLink href="/chauffeur-services" onClick={onClose}>
            Chauffeur Services
          </NavLink>
          <NavLink href="/tours" onClick={onClose}>
            Tours
          </NavLink>
          <NavLink href="/accommodation" onClick={onClose}>
            Accommodation
          </NavLink>
          <NavLink href="/contact" onClick={onClose}>
            Contact
          </NavLink>
          <NavLink href="/portal" onClick={onClose}>
            Portal Login
          </NavLink> */}
        </Nav>

        <FooterNote>
          Premium chauffeur services, private tours, and curated Cape Town travel.
        </FooterNote>
      </Drawer>
    </>
  );
}