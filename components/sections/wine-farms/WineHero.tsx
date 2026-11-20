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
  const tt = useT();
  return (
    <Hero>
      <Container>
        <HeroInner>
          <Eyebrow>{tt("WineHero.cape-winelands-guide")}</Eyebrow>

          <Title>{tt("WineHero.best-wine-farms-in-cape")}</Title>

          <Description>
            {tt("WineHero.discover-some-of-the-most")}</Description>

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
              <Button as="span">{tt("WineHero.plan-my-private-wine-tour")}</Button>
            </Anchor>

            <StyledLink href={tt.path("/chauffeur-hire")}>
              <Button as="span" $variant="secondary">
                {tt("WineHero.chauffeur-hire-in-cape-town")}</Button>
            </StyledLink>
          </ButtonRow>

          <ValueStrip>
            <ValueItem>{tt("WineHero.private-chauffeur-service")}</ValueItem>
            <ValueItem>{tt("WineHero.flexible-wine-route")}</ValueItem>
            <ValueItem>{tt("WineHero.no-driving-stress")}</ValueItem>
            <ValueItem>{tt("WineHero.luxury-wine-estates")}</ValueItem>
            <ValueItem>{tt("WineHero.custom-itinerary")}</ValueItem>
          </ValueStrip>
        </HeroInner>
      </Container>
    </Hero>
  );
}