"use client";

import Link from "next/link";
import styled from "styled-components";
import Container from "../../common/Container";
import SmartImage from "../../common/SmartImage";
import Money from "../../common/Money";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { brand } from "../../../lib/brand";
import {
  AREA_DISPLAY,
  getVillaAreaDisplay,
  getVillaNightlyRate,
  getVillaPrimaryPhoto,
  type Villa,
  type VillaArea,
} from "../../../lib/villas";

const WHATSAPP = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
  "Hi, I'd like to enquire about a luxury villa stay in Cape Town."
)}`;

const Hero = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
  color: white;
  padding: 96px 0 72px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 128px 0 96px;
  }
`;

const HeroInner = styled.div`
  max-width: 820px;
`;

const Eyebrow = styled.div`
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0 0 18px;
  font-size: 2.4rem;
  line-height: 1.1;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.4rem;
  }
`;

const HeroLead = styled.p`
  margin: 0 0 24px;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
  max-width: 680px;
`;

const HeroCtas = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 50px;
  padding: 0 24px;
  border-radius: 14px;
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 50px;
  padding: 0 24px;
  border-radius: 14px;
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.45);
  font-weight: 700;
  text-decoration: none;
`;

const Section = styled.section`
  padding: 72px 0;
  background: ${({ theme }) => theme.colors.background};

  &:nth-of-type(even) {
    background: ${({ theme }) => theme.colors.backgroundSoft};
  }
`;

const SectionHeading = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.9rem;
  line-height: 1.2;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.3rem;
  }
`;

const SectionLead = styled.p`
  margin: 0 0 28px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.02rem;
  line-height: 1.85;
  max-width: 780px;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-color: rgba(11, 91, 51, 0.22);
  }
`;

const CardImage = styled.div`
  position: relative;
  height: 220px;
`;

const CardBody = styled.div`
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const AreaBadge = styled.span`
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ theme }) => `${theme.colors.primary}14`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.18rem;
  line-height: 1.25;
`;

const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`;

const CardCta = styled.span`
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 0.92rem;
`;

const EmptyState = styled.div`
  padding: 28px;
  border-radius: 22px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  line-height: 1.75;
`;

const AreaGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  margin-top: 16px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const AreaCard = styled.div`
  background: white;
  border-radius: 18px;
  padding: 22px 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const AreaName = styled.h3`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.15rem;
`;

const AreaDescription = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.96rem;
  line-height: 1.7;
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 18px;
`;

const FaqItem = styled.details`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 16px 18px;

  & summary {
    cursor: pointer;
    list-style: none;
    color: ${({ theme }) => theme.colors.heading};
    font-weight: 700;
    font-size: 1rem;
  }

  & summary::-webkit-details-marker {
    display: none;
  }

  &[open] summary {
    margin-bottom: 8px;
  }

  & p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.96rem;
    line-height: 1.75;
  }
`;

const CrossLinkRow = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;
  margin-top: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const CrossLinkCard = styled(Link)`
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  padding: 20px 22px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.15s ease, transform 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(11, 91, 51, 0.32);
  }

  & strong {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.98rem;
  }

  & p {
    margin: 6px 0 0;
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.92rem;
    line-height: 1.65;
  }
`;

const AREA_BLURBS: Partial<Record<VillaArea, string>> = {
  camps_bay:
    "Cape Town's beachfront postcode. Mountain-backed villas overlooking the Atlantic — most with a pool, many within a short walk of the promenade. Ideal for guests who want sea views and easy access to restaurants and beach clubs.",
  clifton:
    "Four cove beaches and some of the most sought-after villa addresses in the country. Sheltered, sunset-facing, and intensely private. Perfect for honeymoons, milestone trips, and clients who want presence and quiet in equal measure.",
  bantry_bay:
    "Quieter neighbour to Camps Bay with sweeping ocean views and modern architectural villas. Excellent value if you want the Atlantic Seaboard look without the Camps Bay tariff.",
  constantia:
    "Cape Town's old-money valley — sprawling estates, oak-lined lanes, and the original Cape vineyards on the doorstep. Best for families, wine-focused trips, and longer stays where you want garden, pool, and space.",
  franschhoek:
    "The Winelands village — French-Huguenot heritage, fine-dining institutions, and farm villas within walking distance of cellar doors. Pair with a chauffeured wine-tour day.",
  stellenbosch:
    "University town in the heart of the Winelands. Vineyard villas with mountain backdrops, a 30-minute hop from the city, and the densest cluster of world-class restaurants outside Cape Town itself.",
};

interface Props {
  villas: Villa[];
}

export default function VillasLandingPage({ villas }: Props) {
  const featuredFirst = [...villas].sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1;
    if (!a.is_featured && b.is_featured) return 1;
    return a.sort_order - b.sort_order;
  });
  const areasShown = new Set<VillaArea>(featuredFirst.map((v) => v.area));

  return (
    <>
      <Hero>
        <Container>
          <HeroInner>
            <Eyebrow>{brand.name}</Eyebrow>
            <Title>Luxury Villa Rentals in Cape Town</Title>
            <HeroLead>
              A hand-picked collection of luxury villas across Cape Town&apos;s
              most sought-after addresses — Camps Bay, Clifton, Bantry Bay,
              Constantia, Franschhoek, and Stellenbosch. Every stay comes with
              full concierge support, optional chauffeur add-ons, and the local
              connections to make a Cape Town holiday feel effortless.
            </HeroLead>
            <HeroCtas>
              <PrimaryButton
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    source: "villas_hero",
                    label: "Enquire on WhatsApp",
                  })
                }
              >
                💬&nbsp; Enquire on WhatsApp
              </PrimaryButton>
              <SecondaryButton href="#villa-collection">
                Browse the collection
              </SecondaryButton>
            </HeroCtas>
          </HeroInner>
        </Container>
      </Hero>

      <Section>
        <Container>
          <SectionHeading>What a concierge villa stay looks like</SectionHeading>
          <SectionLead>
            A luxury villa rental in Cape Town with us is closer to a private
            boutique hotel than a self-catering booking. Every property in the
            collection is personally vetted — sea or mountain views, chef-grade
            kitchens, properly staffed (or staff-on-call), and within easy reach
            of the city, the Winelands, and the beaches. From the moment you
            land we coordinate the airport meet-and-greet, stock the fridge to
            your preferences, and stand by for restaurant bookings, in-villa
            chefs, private tours, and chauffeur transport for the duration of
            your stay.
          </SectionLead>
          <SectionLead>
            Most clients pair the villa with a multi-day chauffeur so the cars
            and drivers are dedicated to you — touring the Cape Peninsula one
            day, tasting in Franschhoek the next, dinner in town in the
            evening. It&apos;s a way to see Cape Town without ever planning the
            logistics yourself.
          </SectionLead>
        </Container>
      </Section>

      <Section id="villa-collection">
        <Container>
          <SectionHeading>The villa collection</SectionHeading>
          <SectionLead>
            Featured properties from our hand-picked Cape Town villa
            collection. Tap any villa for the full brief, photos, and to start
            an enquiry.
          </SectionLead>
          {featuredFirst.length === 0 ? (
            <EmptyState>
              Our latest villas are loading. In the meantime, message us on
              WhatsApp and we&apos;ll share the right options for your dates and
              party size within 30 minutes.
            </EmptyState>
          ) : (
            <Grid>
              {featuredFirst.map((villa) => {
                const photo = getVillaPrimaryPhoto(villa);
                const area = getVillaAreaDisplay(villa);
                const rate = getVillaNightlyRate(villa);
                return (
                  <Card key={villa.id} href={`/villas/${villa.slug}`}>
                    <CardImage>
                      {photo ? (
                        <SmartImage
                          src={photo}
                          alt={`${villa.name} — luxury villa rental in ${area}`}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : null}
                    </CardImage>
                    <CardBody>
                      <AreaBadge>{area}</AreaBadge>
                      <CardTitle>{villa.name}</CardTitle>
                      <CardMeta>
                        {villa.bedrooms ? (
                          <span>{villa.bedrooms} bed</span>
                        ) : null}
                        {villa.max_guests ? <span>sleeps {villa.max_guests}</span> : null}
                        {rate ? (
                          <span>
                            from <Money usd={rate} prefix="" suffix="/ night" />
                          </span>
                        ) : null}
                      </CardMeta>
                      <CardCta>View villa →</CardCta>
                    </CardBody>
                  </Card>
                );
              })}
            </Grid>
          )}
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading>Where we have villas</SectionHeading>
          <SectionLead>
            A quick orientation to Cape Town&apos;s luxury villa neighbourhoods
            — what each area is best for and the kind of stay you should expect.
          </SectionLead>
          <AreaGrid>
            {(Object.entries(AREA_BLURBS) as [VillaArea, string][])
              .filter(([area]) => areasShown.size === 0 || areasShown.has(area))
              .map(([area, blurb]) => (
                <AreaCard key={area}>
                  <AreaName>{AREA_DISPLAY[area]} villas</AreaName>
                  <AreaDescription>{blurb}</AreaDescription>
                </AreaCard>
              ))}
          </AreaGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading>Frequently asked</SectionHeading>
          <FaqList>
            <FaqItem>
              <summary>What&apos;s included in the concierge service?</summary>
              <p>
                Pre-arrival planning (airport meet-and-greet, grocery
                pre-stocking, restaurant reservations), a single point of
                contact for the duration of the stay, and on-call coordination
                of chefs, drivers, tours, and any extras. Standard with every
                booking.
              </p>
            </FaqItem>
            <FaqItem>
              <summary>Can I add a chauffeur to my villa stay?</summary>
              <p>
                Yes — most guests pair the villa with multi-day chauffeur hire.
                See{" "}
                <Link href="/chauffeur-hire" style={{ color: "#0b5b33" }}>
                  /chauffeur-hire
                </Link>{" "}
                for the fleet. We coordinate driver schedules around your
                itinerary.
              </p>
            </FaqItem>
            <FaqItem>
              <summary>Are villas suitable for kids and families?</summary>
              <p>
                Many are — Constantia and Franschhoek estates in particular
                have the space, gardens, and pools families want. Tell us how
                old your kids are and we&apos;ll filter the options to villas
                with cribs, child-safe pool covers, and family-friendly layouts.
              </p>
            </FaqItem>
            <FaqItem>
              <summary>How does check-in work?</summary>
              <p>
                A villa manager meets you on arrival, walks you through the
                property, and hands over keys. If you book a chauffeur transfer
                from the airport, your driver coordinates timing directly with
                the villa team.
              </p>
            </FaqItem>
            <FaqItem>
              <summary>What about peak vs off-peak rates?</summary>
              <p>
                Cape Town&apos;s peak season runs December through mid-January
                and over Easter — villa rates roughly double over those weeks.
                February, March, October, and November are exceptional value
                with weather that often outshines summer.
              </p>
            </FaqItem>
            <FaqItem>
              <summary>How do I confirm a booking?</summary>
              <p>
                Message us with your dates, party size, and preferred area —
                we&apos;ll come back within 30 minutes with availability and a
                quote. A deposit secures the dates; balance is due before
                arrival.
              </p>
            </FaqItem>
          </FaqList>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading>Pair your stay</SectionHeading>
          <SectionLead>
            A villa is one piece of the trip. Most guests add a chauffeur for
            the duration and one or two private day tours.
          </SectionLead>
          <CrossLinkRow>
            <CrossLinkCard href="/chauffeur-hire">
              <strong>Add a chauffeur to your stay →</strong>
              <p>
                Hourly, daily, and multi-day private chauffeur hire in a luxury
                vehicle. Mercedes V-Class, Range Rover, BMW X5, and the rest of
                the fleet.
              </p>
            </CrossLinkCard>
            <CrossLinkCard href="/tours">
              <strong>Explore day tours →</strong>
              <p>
                Private, chauffeur-driven Cape Town day tours — Cape Point,
                Winelands, Table Mountain, and Garden Route extensions.
              </p>
            </CrossLinkCard>
          </CrossLinkRow>
        </Container>
      </Section>
    </>
  );
}
