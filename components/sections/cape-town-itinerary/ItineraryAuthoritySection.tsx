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
          <Eyebrow>Luxury Cape Town Travel Guide</Eyebrow>
          <Title>How to Plan the Perfect 7 Day Cape Town Itinerary</Title>
          <Intro>
            A well-planned Cape Town itinerary should balance iconic
            sightseeing, scenic drives, luxury travel, relaxation, and enough
            flexibility to enjoy the city without feeling rushed.
          </Intro>
        </Header>

        <Grid>
          <Card>
            <CardTitle>See the Essentials</CardTitle>
            <CardText>
              A strong 7 day itinerary should include Table Mountain, Cape
              Peninsula, Cape Point, Boulders Beach, and the Cape Winelands for
              a complete first-time Cape Town experience.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Travel in Comfort</CardTitle>
            <CardText>
              Using a private chauffeur makes it easier to enjoy long scenic
              routes, flexible timing, wine tastings, and premium day planning
              without the stress of driving.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Leave Space for Luxury</CardTitle>
            <CardText>
              The best itineraries also include time for beaches, fine dining,
              sunset stops, and optional upgrades like helicopter rides, yacht
              charters, or spa experiences.
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
                  Planning a 7 day Cape Town itinerary gives you enough time to
                  see the city properly without rushing through the experience.
                  The key is to group activities in the right order, allowing
                  for scenic routes, iconic attractions, and enough downtime to
                  enjoy the city at a comfortable pace. For most travellers, a
                  strong itinerary should include arrival and city highlights, a{" "}
                  <InlineLink href="/private-tours/cape-peninsular-tour">
                    Cape Peninsula day
                  </InlineLink>
                  , a{" "}
                  <InlineLink href="/best-wine-farms-in-cape-town">
                    Cape Winelands experience
                  </InlineLink>
                  , leisure time around the Atlantic Seaboard, and at least one
                  premium add-on such as a helicopter ride, yacht charter, or
                  custom scenic drive.
                </p>

                <p>
                  One of the best ways to experience Cape Town in 7 days is with
                  a private chauffeur or curated day planning service. This
                  gives you much more flexibility, especially when combining
                  routes like Table Mountain, Bo-Kaap, Camps Bay, Chapman’s
                  Peak, Cape Point, and Stellenbosch. It also means you can
                  enjoy wine tastings, photo stops, and scenic lunches without
                  worrying about navigation, parking, or time pressure. For
                  couples, families, and luxury travellers, this creates a far
                  more seamless and elevated overall experience.
                </p>

                <p>
                  The best Cape Town itinerary is not just about seeing as much
                  as possible. It is about combining the right experiences in
                  the right rhythm. A thoughtful 7 day plan helps you enjoy the
                  city’s natural beauty, famous landmarks, beaches, wine farms,
                  and private tours in a way that feels premium, memorable, and
                  well paced from start to finish.
                </p>
              </RichText>
            </ExpandInner>
          </ExpandBody>
        </ExpandWrap>
      </Container>
    </Section>
  );
}