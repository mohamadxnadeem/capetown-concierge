"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";
import {
  Anchor,
  Container,
  StyledLink,
  whatsappLink,
} from "./shared";

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

const Description = styled.p`
  margin: 0 0 26px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.9;
  font-size: 1.02rem;
  max-width: 820px;
`;

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
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
  return (
    <Hero>
      <Container>
        <Inner>
          <Eyebrow>Cape Town Travel Guide</Eyebrow>
          <Title>7 Day Cape Town Itinerary</Title>
          <Description>
            Discover the perfect 7 day Cape Town itinerary with a balanced mix
            of scenic touring, wine farms, beaches, city highlights, and
            premium private chauffeur-driven travel. Ideal for travellers who
            want to experience Cape Town properly without wasting time planning
            every detail themselves.
          </Description>

          <ButtonRow>
            <Anchor
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "itinerary_hero",
                  label: "Plan My 7 Day Itinerary",
                })
              }
            >
              <Button as="span">Plan My 7 Day Itinerary</Button>
            </Anchor>

            <StyledLink href="/chauffeur-services">
              <Button as="span" $variant="secondary">
                View Chauffeur Services
              </Button>
            </StyledLink>
          </ButtonRow>

          <ValueStrip>
            <ValueItem>7 Day Planning Guide</ValueItem>
            <ValueItem>Private Chauffeur Travel</ValueItem>
            <ValueItem>Wine Farms & Tours</ValueItem>
            <ValueItem>Flexible Itinerary</ValueItem>
            <ValueItem>Luxury Experience</ValueItem>
          </ValueStrip>
        </Inner>
      </Container>
    </Hero>
  );
}