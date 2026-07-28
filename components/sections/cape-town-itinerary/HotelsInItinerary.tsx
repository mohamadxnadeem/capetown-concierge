"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import SmartImage from "../../common/SmartImage";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { useCurrency } from "../../../context/CurrencyContext";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
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
import { ItineraryHotelCard } from "./types";

function buildHotelMessage(hotelName: string) {
  return `Hi, we're looking at staying at ${hotelName} for 7 days. Can you quote us for chauffeur service?`;
}

const Grid = styled.div`
  display: grid;
  gap: 18px;
  margin-top: 24px;

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

const HotelName = styled.h3`
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.2rem;
  line-height: 1.2;
`;

const HotelMeta = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  margin-bottom: 12px;
`;

const HotelDesc = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  font-size: 0.95rem;
`;

const PriceLine = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 16px;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
`;

const FullListRow = styled.div`
  margin-top: 22px;
`;

type Props = {
  items: ItineraryHotelCard[];
};

function starsDisplay(stars: number | null): string | null {
  if (!stars || stars <= 0) return null;
  const rounded = Math.min(5, Math.max(1, Math.round(stars)));
  return "★".repeat(rounded);
}

export default function HotelsInItinerary({ items }: Props) {
  const { format, isReady } = useCurrency();

  if (!items || items.length === 0) return null;

  const money = (zar: number) =>
    isReady ? format(zar) : `R${Math.round(zar).toLocaleString()}`;

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>Hotels in this Itinerary</SectionEyebrow>
          <SectionTitle>Where to Stay</SectionTitle>
          <SectionText>
            These are the properties we collect from and return to most often. All are within easy reach of the routes in this itinerary, and we know the access, the parking and the concierge teams at each.
          </SectionText>
        </SectionHeader>

        <Grid>
          {items.slice(0, 6).map((h) => {
            const stars = starsDisplay(h.starRating);
            const hotelLink = buildWhatsAppLink(buildHotelMessage(h.name));

            return (
              <Card key={h.slug}>
                <CardImage>
                  {h.primaryImage ? (
                    <SmartImage
                      src={h.primaryImage}
                      alt={`${h.name}, ${h.location} — Cape Town hotel`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                </CardImage>

                <CardBody>
                  <HotelName>{h.name}</HotelName>
                  <HotelMeta>
                    {h.location}
                    {stars ? ` · ${stars}` : ""}
                  </HotelMeta>

                  {h.shortDescription ? (
                    <HotelDesc>{h.shortDescription}</HotelDesc>
                  ) : null}

                  {h.priceFromZar ? (
                    <PriceLine>From {money(h.priceFromZar)} per night</PriceLine>
                  ) : null}

                  <Actions>
                    <Anchor
                      href={hotelLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick({
                          source: "itinerary_hotel_card",
                          label: "Check Hotel Availability",
                          tour: "7 Day Cape Town Itinerary",
                          vehicle: h.name,
                        })
                      }
                    >
                      <Button as="span">Check Availability</Button>
                    </Anchor>

                    <StyledLink href={`/hotels/${h.slug}`}>
                      <Button as="span" $variant="secondary">
                        View Hotel
                      </Button>
                    </StyledLink>
                  </Actions>
                </CardBody>
              </Card>
            );
          })}
        </Grid>

        <FullListRow>
          <StyledLink href="/hotels">
            <Button as="span" $variant="secondary">
              Browse All Hotels
            </Button>
          </StyledLink>
        </FullListRow>
      </Container>
    </Section>
  );
}
