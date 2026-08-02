"use client";

import styled from "styled-components";
import Link from "next/link";
import Button from "../common/Button";
import Container from "../common/Container";
import { useCurrency } from "../../context/CurrencyContext";
import { buildWhatsAppLink } from "../../lib/whatsapp";
import { trackWhatsAppClick } from "../../lib/tracking";
import { WeeklyPricingVehicle } from "./cape-town-itinerary/types";

const MULTIDAY_WA_MESSAGE =
  "Hi, I'd like a private chauffeur for the full length of my Cape Town trip. My dates are";

function roundToNearest50(n: number): number {
  return Math.round(n / 50) * 50;
}

const Wrapper = styled.section`
  padding: 72px 0;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

const Intro = styled.div`
  max-width: 780px;
  margin: 0 0 32px;
`;

const Eyebrow = styled.div`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.6rem;
  }
`;

const Text = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
`;

const RateGrid = styled.div`
  display: grid;
  gap: 14px;
  margin: 26px 0 28px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const RateCard = styled.div`
  padding: 20px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const RateTitle = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 1.05rem;
  margin-bottom: 2px;
`;

const RateSeats = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.88rem;
  margin-bottom: 12px;
`;

const RateLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const RateAmount = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.35rem;
  font-weight: 700;
`;

const RateAside = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  margin-top: 4px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  text-decoration: none;
`;

const Anchor = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

type Props = {
  vehicles: WeeklyPricingVehicle[];
};

export default function HomepageMultiDay({ vehicles }: Props) {
  const { format, isReady } = useCurrency();

  const money = (zar: number) =>
    isReady ? format(zar) : `R${Math.round(zar).toLocaleString()}`;

  const waLink = buildWhatsAppLink(MULTIDAY_WA_MESSAGE);

  const priced = vehicles
    .filter((v) => v.dailyRateZar > 0)
    .slice()
    .sort((a, b) => a.seats - b.seats)
    .slice(0, 3);

  return (
    <Wrapper>
      <Container>
        <Intro>
          <Eyebrow>Multi-Day Chauffeur Hire</Eyebrow>
          <Title>Staying a week or more</Title>
          <Text>
            Most of our work is multi-day. One vehicle and one driver for the length of your trip, so nobody re-explains the plan each morning. A week costs less per day than the same days booked separately, and the vehicle is held for your dates.
          </Text>
        </Intro>

        {priced.length > 0 ? (
          <RateGrid>
            {priced.map((v) => {
              const singleDayTotal = v.dailyRateZar * 7;
              const packagePrice = roundToNearest50(
                singleDayTotal * (1 - v.discountPercent / 100)
              );
              const effectiveDaily = packagePrice / 7;

              return (
                <RateCard key={v.slug}>
                  <RateTitle>{v.title}</RateTitle>
                  <RateSeats>Up to {v.seats} guests</RateSeats>
                  <RateLabel>7 day package</RateLabel>
                  <RateAmount>{money(packagePrice)}</RateAmount>
                  <RateAside>
                    Works out at {money(effectiveDaily)} a day
                  </RateAside>
                </RateCard>
              );
            })}
          </RateGrid>
        ) : null}

        <Actions>
          <Anchor
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "homepage_multi_day",
                label: "Message About Multi-Day Hire",
              })
            }
          >
            <Button as="span">Get a Multi-Day Quote</Button>
          </Anchor>
          <StyledLink href="/7-day-cape-town-itinerary">
            <Button as="span" $variant="secondary">
              See the 7 Day Itinerary
            </Button>
          </StyledLink>
        </Actions>
      </Container>
    </Wrapper>
  );
}
