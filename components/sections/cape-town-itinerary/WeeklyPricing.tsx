"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import SmartImage from "../../common/SmartImage";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { useCurrency } from "../../../context/CurrencyContext";
import {
  buildWhatsAppLink,
} from "../../../lib/whatsapp";
import {
  Anchor,
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionText,
  SectionTitle,
  StyledLink,
} from "./shared";
import { WeeklyPricingVehicle } from "./types";

const PRICING_HEADING_MESSAGE =
  "Hi, can you quote me for a 7 day private chauffeur week? Dates and group size:";

function buildVehiclePackageMessage(vehicleTitle: string) {
  return `Hi, I'd like a 7 day quote for the ${vehicleTitle}. Our dates are`;
}

function roundToNearest50(n: number): number {
  return Math.round(n / 50) * 50;
}

const Anchored = styled.div`
  scroll-margin-top: 90px;
`;

const IntroCopy = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
  max-width: 820px;
`;

const HeadingCta = styled.div`
  margin-top: 22px;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;
  margin-top: 28px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardImage = styled.div`
  position: relative;
  min-height: 200px;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.12), rgba(6, 62, 35, 0.06));
`;

const CardBody = styled.div`
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const CardTitle = styled.h3`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.25rem;
  line-height: 1.2;
`;

const CardSeats = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  margin-bottom: 16px;
`;

const PriceBlock = styled.div`
  padding: 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 16px;
`;

const PriceLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const StrikeRow = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;

const StrikeAmount = styled.span`
  text-decoration: line-through;
`;

const PackagePrice = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 4px 0;
`;

const SavingRow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 700;
`;

const EffectiveRow = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  margin-top: 6px;
`;

const IncludesLine = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  margin-bottom: 16px;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
`;

const FinePrint = styled.p`
  margin: 26px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.88rem;
  line-height: 1.75;
`;

type Props = {
  items: WeeklyPricingVehicle[];
};

export default function WeeklyPricing({ items }: Props) {
  const { format, isReady } = useCurrency();

  if (!items.length) return null;

  const money = (zar: number) =>
    isReady ? format(zar) : `R${Math.round(zar).toLocaleString()}`;

  const headingLink = buildWhatsAppLink(PRICING_HEADING_MESSAGE);

  return (
    <Anchored id="pricing-block">
      <Section>
        <Container>
          <SectionHeader>
            <SectionEyebrow>7 Day Package Pricing</SectionEyebrow>
            <SectionTitle>What a 7 Day Private Chauffeur Week Costs</SectionTitle>
            <SectionText>
              Rates are per vehicle, not per person. The same price whether there are two of you or seven.
            </SectionText>
            <IntroCopy>
              Every week includes your driver, fuel, all route planning, airport pickup on arrival and drop-off on departure. Attraction entry, meals and add-on experiences are booked separately and we arrange them for you.
            </IntroCopy>
            <HeadingCta>
              <Anchor
                href={headingLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source: "itinerary_pricing_heading",
                    label: "Get a 7 Day Quote",
                    tour: "7 Day Cape Town Itinerary",
                  })
                }
              >
                <Button as="span" $variant="secondary">
                  Get a 7 Day Quote on WhatsApp
                </Button>
              </Anchor>
            </HeadingCta>
          </SectionHeader>

          <Grid>
            {items.map((v) => {
              const singleDayTotal = v.dailyRateZar * 7;
              const packagePriceRaw =
                singleDayTotal * (1 - v.discountPercent / 100);
              const packagePrice = roundToNearest50(packagePriceRaw);
              const saving = singleDayTotal - packagePrice;
              const effectiveDaily = packagePrice / 7;

              const vehicleWaLink = buildWhatsAppLink(
                buildVehiclePackageMessage(v.title)
              );

              return (
                <Card key={v.slug}>
                  <CardImage>
                    {v.primaryImage ? (
                      <SmartImage
                        src={v.primaryImage}
                        alt={`${v.title} 7 day Cape Town chauffeur package`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                  </CardImage>

                  <CardBody>
                    <CardTitle>{v.title}</CardTitle>
                    <CardSeats>Up to {v.seats} guests</CardSeats>

                    <PriceBlock>
                      <PriceLabel>7 Day Package</PriceLabel>
                      <PackagePrice>{money(packagePrice)}</PackagePrice>
                      <StrikeRow>
                        Instead of <StrikeAmount>{money(singleDayTotal)}</StrikeAmount> booked as separate days
                      </StrikeRow>
                      <SavingRow>Saves you {money(saving)}</SavingRow>
                      <EffectiveRow>
                        Works out at {money(effectiveDaily)} a day
                      </EffectiveRow>
                    </PriceBlock>

                    <IncludesLine>
                      Includes driver, fuel, and all route planning.
                    </IncludesLine>

                    <Actions>
                      <Anchor
                        href={vehicleWaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick({
                            source: "itinerary_pricing_card",
                            label: "Reserve 7 Day Package",
                            vehicle: v.title,
                            tour: "7 Day Cape Town Itinerary",
                          })
                        }
                      >
                        <Button as="span">Reserve This Vehicle</Button>
                      </Anchor>

                      <StyledLink href={v.href}>
                        <Button as="span" $variant="secondary">
                          Vehicle Details
                        </Button>
                      </StyledLink>
                    </Actions>
                  </CardBody>
                </Card>
              );
            })}
          </Grid>

          <FinePrint>
            Larger groups travel in two vehicles that stay together all week with the same drivers. Child seats are provided at no charge. Arabic-speaking drivers can be arranged on request.{" "}
            <a
              href={headingLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", fontWeight: 700 }}
              onClick={() =>
                trackWhatsAppClick({
                  source: "itinerary_pricing_heading",
                  label: "Ask About Full Week Pricing",
                  tour: "7 Day Cape Town Itinerary",
                })
              }
            >
              Message us on WhatsApp
            </a>{" "}
            with dates and group size.
          </FinePrint>
        </Container>
      </Section>
    </Anchored>
  );
}
