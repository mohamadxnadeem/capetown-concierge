"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import {
  Anchor,
  Container,
  StyledLink,
  whatsappLink,
  ValueItem,
  ValueStrip,
} from "./shared";
import { trackWhatsAppClick } from "../../../lib/tracking";

const Hero = styled.section`
  padding: 96px 0 72px;
  background:
    radial-gradient(circle at top right, rgba(11, 91, 51, 0.12), transparent 28%),
    linear-gradient(180deg, #f8fbf9 0%, ${({ theme }) => theme.colors.background} 100%);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 120px 0 88px;
  }
`;

const HeroInner = styled.div`
  max-width: 920px;
`;

const Eyebrow = styled.div`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2.5rem;
  line-height: 1.02;
  max-width: 860px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 4rem;
  }
`;

const Description = styled.p`
  margin: 0 0 26px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.9;
  font-size: 1.02rem;
  max-width: 800px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

export default function WineHero() {
  return (
    <Hero>
      <Container>
        <HeroInner>
          <Eyebrow>Cape Winelands Guide</Eyebrow>

          <Title>Best Wine Farms in Cape Town</Title>

          <Description>
            Discover some of the most beautiful wine estates in Stellenbosch,
            Franschhoek, and the surrounding Cape Winelands — from luxury wine
            tastings and fine dining to relaxed countryside escapes. The best
            way to experience them is with a private chauffeur-driven wine tour
            that lets you enjoy the day without worrying about driving, timing,
            or planning the route.
          </Description>

          <ButtonRow>
            <Anchor
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "wine_hero",
                  label: "Plan My Private Wine Tour",
                })
              }
            >
              <Button as="span">Plan My Private Wine Tour</Button>
            </Anchor>

            <StyledLink href="/chauffeur-services">
              <Button as="span" $variant="secondary">
                View Chauffeur Services
              </Button>
            </StyledLink>
          </ButtonRow>

          <ValueStrip>
            <ValueItem>Private Chauffeur Service</ValueItem>
            <ValueItem>Flexible Wine Route</ValueItem>
            <ValueItem>No Driving Stress</ValueItem>
            <ValueItem>Luxury Wine Estates</ValueItem>
            <ValueItem>Custom Itinerary</ValueItem>
          </ValueStrip>
        </HeroInner>
      </Container>
    </Hero>
  );
}