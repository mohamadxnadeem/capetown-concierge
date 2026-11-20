"use client";

import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { Anchor, Container, StyledLink, whatsappLink } from "./shared";
import styled from "styled-components";

import { useT } from "../../../lib/i18n/LocaleContext";
const Hero = styled.section`
  padding: 92px 0 72px;
  background:
    radial-gradient(circle at top right, rgba(11, 91, 51, 0.12), transparent 28%),
    linear-gradient(180deg, #f8fbf9 0%, ${({ theme }) => theme.colors.background} 100%);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 120px 0 88px;
  }
`;

const HeroInner = styled.div`
  max-width: 860px;
`;

const Eyebrow = styled.div`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2.5rem;
  line-height: 1.02;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 4rem;
  }
`;

const HeroText = styled.p`
  margin: 0 0 26px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.9;
  font-size: 1.02rem;
  max-width: 780px;
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

export default function ActivitiesHero() {
  const tt = useT();
  return (
    <Hero>
      <Container>
        <HeroInner>
          <Eyebrow>{tt("ActivitiesHero.cape-town-travel-guide")}</Eyebrow>
          <HeroTitle>{tt("ActivitiesHero.best-activities-to-do-in")}</HeroTitle>
          <HeroText>
            {tt("ActivitiesHero.from-table-mountain-and-cape")}</HeroText>

          <HeroButtons>
            <Anchor
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "best_activities_hero",
                  label: "Plan My Cape Town Itinerary",
                })
              }
            >
              <Button as="span">{tt("ActivitiesHero.plan-my-cape-town-itinerary")}</Button>
            </Anchor>

            {/* <StyledLink href="/tours">
              <Button as="span" $variant="secondary">
                Explore Private Tours
              </Button>
            </StyledLink> */}
          </HeroButtons>
        </HeroInner>
      </Container>
    </Hero>
  );
}