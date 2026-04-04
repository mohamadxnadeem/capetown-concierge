"use client";

import styled from "styled-components";
import Link from "next/link";
import Container from "./Container";
import { trackWhatsAppClick } from "../../lib/tracking";
import { buildWhatsAppLink, buildGeneralWhatsAppMessage } from "../../lib/whatsapp";

const footerWhatsappLink = buildWhatsAppLink(
  buildGeneralWhatsAppMessage("booking a private tour or chauffeur service in Cape Town")
);

const Wrapper = styled.footer`
  background: #0a1a10;
  color: rgba(255, 255, 255, 0.75);
  padding: 56px 0 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const Grid = styled.div`
  display: grid;
  gap: 40px;
  margin-bottom: 48px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 48px;
  }
`;

const Brand = styled.div``;

const BrandName = styled.div`
  color: white;
  font-weight: 800;
  font-size: 1.15rem;
  margin-bottom: 10px;
`;

const BrandText = styled.p`
  margin: 0 0 22px;
  line-height: 1.8;
  font-size: 0.9rem;
  max-width: 340px;
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 18px;
  border-radius: 12px;
  background: #25d366;
  color: white;
  font-weight: 700;
  font-size: 0.88rem;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(37, 211, 102, 0.4);
  }
`;

const Column = styled.div``;

const ColTitle = styled.div`
  color: white;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s ease;

  &:hover {
    color: white;
  }
`;

const ContactItem = styled.div`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 8px;
`;

const ContactLabel = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.78rem;
  display: block;
  margin-bottom: 2px;
`;

const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

const TrustBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.82rem;
  font-weight: 600;
`;

const Bottom = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;

const Copyright = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.35);
`;

const LegalLinks = styled.div`
  display: flex;
  gap: 18px;
`;

const LegalLink = styled(Link)`
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.35);
  text-decoration: none;

  &:hover {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <Container>
        <Grid>
          <Brand>
            <BrandName>Cape Town Concierge</BrandName>
            <BrandText>
              Premium private chauffeur services, bespoke tours, and luxury
              airport transfers across Cape Town and the Western Cape. Available
              7 days a week.
            </BrandText>
            <WhatsAppButton
              href={footerWhatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "footer_whatsapp",
                  label: "WhatsApp Us",
                })
              }
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.12 1.527 5.849L.057 23.535a.75.75 0 0 0 .928.928l5.701-1.476A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 0 1-4.93-1.343l-.355-.21-3.685.953.978-3.565-.229-.367A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              WhatsApp Us
            </WhatsAppButton>
          </Brand>

          <Column>
            <ColTitle>Services</ColTitle>
            <NavList>
              <NavItem><NavLink href="/chauffeur-services">Chauffeur Services</NavLink></NavItem>
              <NavItem><NavLink href="/private-tours">Private Tours</NavLink></NavItem>
              <NavItem><NavLink href="/airport-transfers-cape-town">Airport Transfers</NavLink></NavItem>
              <NavItem><NavLink href="/best-activities-to-do-in-cape-town">Best Activities</NavLink></NavItem>
              <NavItem><NavLink href="/contact">Contact Us</NavLink></NavItem>
            </NavList>
          </Column>

          <Column>
            <ColTitle>Contact</ColTitle>
            <ContactItem>
              <ContactLabel>WhatsApp / Phone</ContactLabel>
              +27 63 674 6131
            </ContactItem>
            <ContactItem>
              <ContactLabel>Location</ContactLabel>
              Cape Town, Western Cape
            </ContactItem>
            <ContactItem>
              <ContactLabel>Availability</ContactLabel>
              7 days a week
            </ContactItem>
            <ContactItem>
              <ContactLabel>Response Time</ContactLabel>
              Within 30 minutes
            </ContactItem>
          </Column>
        </Grid>

        <TrustRow>
          <TrustBadge>⭐ 4.9 Rated Service</TrustBadge>
          <TrustBadge>✔ Fully Licensed & Insured</TrustBadge>
          <TrustBadge>✔ Professional PDP Drivers</TrustBadge>
          <TrustBadge>✔ Private — No Shared Rides</TrustBadge>
          <TrustBadge>✔ Cape Town Based</TrustBadge>
        </TrustRow>

        <Bottom>
          <Copyright>
            © {new Date().getFullYear()} Cape Town Concierge. All rights reserved.
          </Copyright>
          <LegalLinks>
            <LegalLink href="/contact">Contact</LegalLink>
          </LegalLinks>
        </Bottom>
      </Container>
    </Wrapper>
  );
}
