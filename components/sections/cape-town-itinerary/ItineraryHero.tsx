"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import { Anchor, Container } from "./shared";

const HERO_WA_MESSAGE =
  "Hi, I'm looking at the 7 day Cape Town itinerary. My dates are";

const Hero = styled.section`
  padding: 96px 0 72px;
  background:
    radial-gradient(circle at top right, rgba(11, 91, 51, 0.12), transparent 28%),
    linear-gradient(180deg, #f8fbf9 0%, ${({ theme }) => theme.colors.background} 100%);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 120px 0 88px;
  }
`;

const Inner = styled.div`
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

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 4rem;
  }
`;

const Description = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.9;
  font-size: 1.02rem;
  max-width: 820px;

  p {
    margin: 0 0 14px;
  }

  p:last-of-type {
    margin-bottom: 26px;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const ScrollLink = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

const ValueStrip = styled.div`
  margin-top: 28px;
  padding: 18px 20px;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.12);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ValueItem = styled.div`
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.84rem;
  font-weight: 700;
`;

export default function ItineraryHero() {
  const waLink = buildWhatsAppLink(HERO_WA_MESSAGE);

  return (
    <Hero>
      <Container>
        <Inner>
          <Eyebrow>7 Day Cape Town Itinerary</Eyebrow>
          <Title>A Full Week of Cape Town, Driven for You.</Title>
          <Description>
            <p>
              Cape Town&apos;s best days are spread across a peninsula. Cape Point is 70km from the city. Stellenbosch is 50km the other way. Chapman&apos;s Peak, Boulders, the Winelands and Table Mountain don&apos;t sit near each other, and there&apos;s no Uber waiting at any of them.
            </p>
            <p>
              This is the week we build for our clients. Seven days, one vehicle, one driver who knows the routes. You choose the pace, we handle everything else.
            </p>
            <p>Priced per vehicle, not per person.</p>
          </Description>

          <ButtonRow>
            <Anchor
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "itinerary_hero",
                  label: "Plan My Week",
                  tour: "7 Day Cape Town Itinerary",
                })
              }
            >
              <Button as="span">Plan My Week</Button>
            </Anchor>

            <ScrollLink href="#pricing-block">
              <Button as="span" $variant="secondary">
                See Vehicles and Rates
              </Button>
            </ScrollLink>
          </ButtonRow>

          <ValueStrip>
            <ValueItem>One Driver, All 7 Days</ValueItem>
            <ValueItem>Fuel & Tolls Included</ValueItem>
            <ValueItem>Airport Transfers Included</ValueItem>
            <ValueItem>Flat Weekly Price</ValueItem>
          </ValueStrip>
        </Inner>
      </Container>
    </Hero>
  );
}
