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

const SectionHeader = styled.div`
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

export default function ChauffeurAuthoritySection() {
  const [open, setOpen] = useState(false);

  return (
    <Section>
      <Container>
        <SectionHeader>
          <Eyebrow>Chauffeur Service Cape Town</Eyebrow>
          <Title>The Premier Chauffeur & Private Tour Service in Cape Town</Title>
          <Intro>
            Discover a more polished way to experience Cape Town with private
            chauffeur-driven travel, premium vehicles, and custom touring
            designed around comfort, reliability, and a five-star guest
            experience.
          </Intro>
        </SectionHeader>

        <Grid>
          <Card>
            <CardTitle>Luxury Fleet</CardTitle>
            <CardText>
              Travel in premium vehicles including the Mercedes V-Class,
              Hyundai Staria, and executive options suited to airport transfers,
              VIP travel, couples, and families.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Private Touring</CardTitle>
            <CardText>
              Enjoy tailored experiences such as Cape Peninsula routes, scenic
              coastal drives, and Cape Winelands days with private chauffeur
              service from start to finish.
            </CardText>
          </Card>

          <Card>
            <CardTitle>All-Inclusive Experience</CardTitle>
            <CardText>
              Our service is designed to feel seamless, with professional
              drivers, route planning, comfort, and attention to detail that
              elevates the whole journey.
            </CardText>
          </Card>
        </Grid>

        <ExpandWrap>
          <ExpandButton type="button" onClick={() => setOpen((v) => !v)}>
            <ExpandTitle>Why our chauffeur service stands out in Cape Town</ExpandTitle>
            <ExpandIcon $open={open}>+</ExpandIcon>
          </ExpandButton>

          <ExpandBody $open={open}>
            <ExpandInner>
              <RichText>
                <p>
                  If you are searching for the best chauffeur service in Cape
                  Town, the experience should be about far more than simply
                  getting from one place to another. At Cape Town Concierge, we
                  focus on delivering a private, polished, and premium standard
                  of travel for clients who value comfort, reliability, and
                  attention to detail. Our chauffeur service in Cape Town is
                  designed for airport transfers, full-day private driving,
                  business transport, and custom travel experiences that feel
                  seamless from start to finish.
                </p>

                <p>
                  Our fleet is carefully positioned for different travel styles.
                  The Mercedes V-Class is ideal for premium group travel, family
                  trips, and VIP clients who want space and elegance. The
                  Hyundai Staria offers a modern, comfortable option for airport
                  transfers and full-day touring, while executive vehicles are
                  perfect for couples, professionals, and travellers who want a
                  more private luxury feel.
                </p>

                <p>
                  We also specialise in private tours and tailor-made
                  itineraries. Some of the most requested experiences include
                  the{" "}
                  <InlineLink href="/private-tours">
                    Cape Peninsula private tour
                  </InlineLink>
                  , scenic coastal drives, and curated{" "}
                  <InlineLink href="/best-wine-farms-in-cape-town">
                    Cape Winelands wine tours
                  </InlineLink>{" "}
                  through Stellenbosch and Franschhoek. Many clients combine
                  chauffeur service with airport transfers, custom wine days,
                  and multi-day route planning for a more elevated Cape Town
                  experience.
                </p>
              </RichText>
            </ExpandInner>
          </ExpandBody>
        </ExpandWrap>
      </Container>
    </Section>
  );
}