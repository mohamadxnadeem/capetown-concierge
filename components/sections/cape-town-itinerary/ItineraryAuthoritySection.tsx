"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const Section = styled.section`
  padding: 72px 0;
  background: ${({ theme }) => theme.colors.white};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(1120px, calc(100% - 64px));
  }
`;

const Header = styled.div`
  max-width: 760px;
  margin-bottom: 28px;
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
    font-size: 2.5rem;
  }
`;

const Intro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.9;
  font-size: 1rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;
  margin-bottom: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  padding: 22px;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.05rem;
  line-height: 1.2;
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  font-size: 0.95rem;
`;

const ExpandWrap = styled.div`
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
`;

const ExpandButton = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: rgba(11, 91, 51, 0.03);
  }
`;

const ExpandTitle = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  line-height: 1.4;
`;

const ExpandIcon = styled.div<{ $open: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  transform: ${({ $open }) => ($open ? "rotate(45deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

const ExpandBody = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.25s ease;
`;

const ExpandInner = styled.div`
  overflow: hidden;
`;

const RichText = styled.div`
  padding: 0 22px 22px;

  p {
    margin: 0 0 16px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.9;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const InlineLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default function ItineraryAuthoritySection() {
  const [open, setOpen] = useState(false);

  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Cape Town Travel Guide</Eyebrow>
          <Title>How to Plan the Perfect 7 Day Cape Town Itinerary</Title>
          <Intro>
            A strong Cape Town itinerary balances iconic sightseeing, scenic drives, wine days, and enough downtime that the trip doesn&apos;t feel like a work project.
          </Intro>
        </Header>

        <Grid>
          <Card>
            <CardTitle>See the Essentials</CardTitle>
            <CardText>
              A good 7 day plan covers Table Mountain, the Cape Peninsula, Cape Point, Boulders Beach, and the Winelands. That is the shortlist for a first Cape Town trip.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Travel in Comfort</CardTitle>
            <CardText>
              A private chauffeur handles the scenic routes, wine tastings, and daily route planning so no one in the group has to be the designated driver or the map reader.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Leave Space to Slow Down</CardTitle>
            <CardText>
              Build in beach time, a long lunch, and one big-ticket add-on like a helicopter loop, a yacht charter, or a safari day. A 7 day trip needs a slow day in the middle of it.
            </CardText>
          </Card>
        </Grid>

        <ExpandWrap>
          <ExpandButton type="button" onClick={() => setOpen((v) => !v)}>
            <ExpandTitle>Why this 7 day Cape Town itinerary works so well</ExpandTitle>
            <ExpandIcon $open={open}>+</ExpandIcon>
          </ExpandButton>

          <ExpandBody $open={open}>
            <ExpandInner>
              <RichText>
                <p>
                  Seven days is enough time to see Cape Town properly, as long as the days are grouped in the right order. Group the two long drives (Peninsula and Winelands) with a slower day between them, put Table Mountain on a stable-weather morning, and leave one day for a big-ticket experience. For most travellers that means arrival and Atlantic Seaboard, a{" "}
                  <InlineLink href="/tours/cape-peninsula-tour">
                    Cape Peninsula day
                  </InlineLink>
                  , a{" "}
                  <InlineLink href="/best-wine-farms-in-cape-town">
                    Winelands day
                  </InlineLink>
                  , Table Mountain and Bo-Kaap, a beach day, one add-on, and a departure day.
                </p>

                <p>
                  A private chauffeur across the full week is what makes this rhythm work. No one has to be sober for the tastings, no one has to find parking at Cape Point, and the same car and driver stay with the group all week. On days like Chapman&apos;s Peak or the Franschhoek Pass, that turns two of the most stressful drives in the region into the highlight of the day.
                </p>

                <p>
                  A good Cape Town itinerary is not about doing as much as possible. It&apos;s about pacing the right things together so the group actually enjoys the week. Long drives on the same day as long tastings ruin both. Seven days handled right leaves plenty of room for the natural beauty, the food, and the beach without the whole trip feeling rushed.
                </p>
              </RichText>
            </ExpandInner>
          </ExpandBody>
        </ExpandWrap>
      </Container>
    </Section>
  );
}