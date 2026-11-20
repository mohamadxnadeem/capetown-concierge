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

import { useT } from "../../../lib/i18n/LocaleContext";
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
  const tt = useT();
  return (
    <Hero>
      <Container>
        <Inner>
          <Eyebrow>{tt("ItineraryHero.cape-town-travel-guide")}</Eyebrow>
          <Title>{tt("ItineraryHero.7-day-cape-town-itinerary")}</Title>
          <Description>
            {tt("ItineraryHero.discover-the-perfect-7-day")}</Description>

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
              <Button as="span">{tt("ItineraryHero.plan-my-7-day-itinerary")}</Button>
            </Anchor>

            <StyledLink href={tt.path("/chauffeur-hire")}>
              <Button as="span" $variant="secondary">
                {tt("ItineraryHero.view-chauffeur-services")}</Button>
            </StyledLink>
          </ButtonRow>

          <ValueStrip>
            <ValueItem>{tt("ItineraryHero.7-day-planning-guide")}</ValueItem>
            <ValueItem>{tt("ItineraryHero.private-chauffeur-travel")}</ValueItem>
            <ValueItem>{tt("ItineraryHero.wine-farms-tours")}</ValueItem>
            <ValueItem>{tt("ItineraryHero.flexible-itinerary")}</ValueItem>
            <ValueItem>{tt("ItineraryHero.luxury-experience")}</ValueItem>
          </ValueStrip>
        </Inner>
      </Container>
    </Hero>
  );
}