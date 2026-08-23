"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import SmartImage from "../../common/SmartImage";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { useCurrency } from "../../../context/CurrencyContext";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import { GardenRouteVehicle } from "../../../lib/vehicles";
import {
  Anchor,
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionText,
  SectionTitle,
  StyledLink,
} from "../cape-town-itinerary/shared";

const PRICING_HEADING_MESSAGE =
  "Hi, can you quote me for a 7 day Garden Route trip? Dates and group size:";

function buildVehiclePackageMessage(vehicleTitle: string) {
  return `Hi, I'd like a 7 day Garden Route quote for the ${vehicleTitle}. Our dates are`;
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

const PackagePrice = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 4px 0;
`;

const StrikeRow = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;

const StrikeAmount = styled.span`
  text-decoration: line-through;
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

type Props = {
  items: GardenRouteVehicle[];
};

export default function GardenRoutePricing({ items }: Props) {
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
            <SectionEyebrow>7 Day Garden Route Package Pricing</SectionEyebrow>
            <SectionTitle>What a Chauffeur-Driven Garden Route Week Costs</SectionTitle>
            <SectionText>
              Rates are per vehicle, not per person. The same price whether there are two of you or seven.
            </SectionText>
            <IntroCopy>
              Every week includes your driver, fuel, tolls, parking, the driver&apos;s accommodation and meals throughout, and airport transfers at the Cape Town end. Your own accommodation, reserve fees, and activities are booked separately and billed at cost.
            </IntroCopy>
            <HeadingCta>
              <Anchor
                href={headingLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source: "garden_route_pricing_heading",
                    label: "Get a Garden Route Quote",
                    tour: "7 Day Garden Route Itinerary",
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
              const vehicleWaLink = buildWhatsAppLink(
                buildVehiclePackageMessage(v.title)
              );

              return (
                <Card key={v.slug}>
                  <CardImage>
                    {v.primaryImage ? (
                      <SmartImage
                        src={v.primaryImage}
                        alt={`${v.title} 7 day Garden Route chauffeur package`}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                  </CardImage>

                  <CardBody>
                    <CardTitle>{v.title}</CardTitle>
                    <CardSeats>Up to {v.seats} guests</CardSeats>

                    <PriceBlock>
                      <PriceLabel>7 Day Package</PriceLabel>
                      <PackagePrice>{money(v.packagePriceZar)}</PackagePrice>
                      <StrikeRow>
                        Instead of <StrikeAmount>{money(v.singleDayTotalZar)}</StrikeAmount> booked as 7 separate days
                      </StrikeRow>
                      <SavingRow>Saves you {money(v.savingZar)}</SavingRow>
                      <EffectiveRow>
                        Works out at {money(v.packageDailyZar)} a day
                      </EffectiveRow>
                    </PriceBlock>

                    <IncludesLine>
                      Includes driver, fuel, tolls, parking, and the driver&apos;s accommodation and meals.
                    </IncludesLine>

                    <Actions>
                      <Anchor
                        href={vehicleWaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick({
                            source: "garden_route_pricing_card",
                            label: "Reserve Garden Route Package",
                            vehicle: v.title,
                            tour: "7 Day Garden Route Itinerary",
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
        </Container>
      </Section>
    </Anchored>
  );
}
