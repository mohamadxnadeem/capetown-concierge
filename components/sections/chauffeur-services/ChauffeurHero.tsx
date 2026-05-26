"use client";

import Link from "next/link";
import styled from "styled-components";
import Container from "../../common/Container";
import SmartImage from "../../common/SmartImage";
import { trackWhatsAppClick } from "../../../lib/tracking";
import Money from "../../common/Money";

type Props = {
  title: string;
  description: string;
  vehicleType?: string;
  seats?: number;
  luggage?: number;
  priceUsd?: number;
  image?: string;
  whatsappLink: string;
};

const Hero = styled.section`
  position: relative;
  padding: 120px 0 90px;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.16), rgba(6, 62, 35, 0.08));
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 150px 0 110px;
  }
`;

const HeroImageLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(8, 18, 16, 0.72) 0%,
    rgba(8, 18, 16, 0.52) 38%,
    rgba(8, 18, 16, 0.72) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
`;

const HeroInner = styled.div`
  max-width: 820px;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const HeroTitle = styled.p`
  margin: 0 0 16px;
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.03;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 4rem;
  }
`;

const HeroText = styled.p`
  margin: 0 0 24px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.05rem;
  line-height: 1.85;
  max-width: 760px;
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const HeroMetaItem = styled.div`
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 22px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 700;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

export default function ChauffeurHero({
  title,
  description,
  vehicleType,
  seats,
  luggage,
  priceUsd,
  image,
  whatsappLink,
}: Props) {
  return (
    <Hero>
      {image && (
        <HeroImageLayer>
          <SmartImage src={image} alt={title} priority sizes="100vw" />
        </HeroImageLayer>
      )}
      <HeroOverlay />
      <HeroContent>
        <Container>
          <HeroInner>
            <Eyebrow>Private Chauffeur Vehicle</Eyebrow>
            <HeroTitle>{title}</HeroTitle>
            <HeroText>{description}</HeroText>
            <HeroMeta>
              {vehicleType && <HeroMetaItem>{vehicleType}</HeroMetaItem>}
              {seats && <HeroMetaItem>{seats} Seats</HeroMetaItem>}
              {luggage && <HeroMetaItem>{luggage} Luggage</HeroMetaItem>}
              {priceUsd ? <HeroMetaItem><Money usd={priceUsd} /></HeroMetaItem> : null}
            </HeroMeta>
            <HeroButtons>
              <PrimaryButton
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source: "chauffeur_hero",
                    label: "Book on WhatsApp",
                    vehicle: title,
                  })
                }
              >
                Check Availability on WhatsApp
              </PrimaryButton>
            </HeroButtons>
          </HeroInner>
        </Container>
      </HeroContent>
    </Hero>
  );
}
