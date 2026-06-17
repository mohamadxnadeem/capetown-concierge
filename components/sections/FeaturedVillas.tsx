"use client";

import Link from "next/link";
import { useRef } from "react";
import styled from "styled-components";
import Container from "../common/Container";
import SmartImage from "../common/SmartImage";
import Money from "../common/Money";
import {
  getVillaArea,
  getVillaCapacity,
  getVillaNightlyRate,
  getVillaPrimaryPhoto,
  type Villa,
} from "../../lib/villas";

const Wrapper = styled.section`
  padding: 72px 0;
  background: ${({ theme }) => theme.colors.backgroundSoft};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 40px;
  }
`;

const Intro = styled.div`
  max-width: 760px;
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
  line-height: 1.12;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.6rem;
  }
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.8;
`;

const Slider = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 85%;
  gap: 18px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding-bottom: 8px;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-auto-columns: 48%;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-auto-columns: 32%;
  }
`;

const Card = styled(Link)`
  scroll-snap-align: start;
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
  height: 240px;
`;

const CardBody = styled.div`
  padding: 18px 20px 22px;
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
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 0.92rem;
`;

const SeeAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
`;

const ArrowButton = styled.button`
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 14px;
  background: white;
  color: ${({ theme }) => theme.colors.heading};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  cursor: pointer;
`;

const EmptyState = styled.div`
  padding: 28px;
  border-radius: 22px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
`;

interface Props {
  villas: Villa[];
}

export default function FeaturedVillas({ villas }: Props) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const items = villas
    .filter((v) => v.is_active !== false)
    .sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return 0;
    })
    .slice(0, 6);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const amount = sliderRef.current.clientWidth * 0.9;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <Wrapper>
      <Container>
        <TopBar>
          <Intro>
            <Eyebrow>Luxury Villas</Eyebrow>
            <Title>Stay in a hand-picked Cape Town villa</Title>
            <Description>
              From sea-view homes in Camps Bay to vineyard estates in
              Franschhoek — every villa in the collection is personally
              vetted, with full concierge and chauffeur add-ons available.
            </Description>
          </Intro>
          {items.length > 0 ? (
            <Controls>
              <ArrowButton type="button" aria-label="Scroll villas left" onClick={() => scrollByAmount("left")}>
                ←
              </ArrowButton>
              <ArrowButton type="button" aria-label="Scroll villas right" onClick={() => scrollByAmount("right")}>
                →
              </ArrowButton>
            </Controls>
          ) : null}
        </TopBar>

        {items.length === 0 ? (
          <EmptyState>
            Villas loading. Reach out on WhatsApp and we&apos;ll send the
            current collection straight away.
          </EmptyState>
        ) : (
          <Slider ref={sliderRef}>
            {items.map((villa) => {
              const photo = getVillaPrimaryPhoto(villa);
              const area = getVillaArea(villa);
              const capacity = getVillaCapacity(villa);
              const rate = getVillaNightlyRate(villa);
              return (
                <Card key={villa.id} href={`/villas/${villa.slug}`}>
                  <CardImage>
                    {photo ? (
                      <SmartImage
                        src={photo}
                        alt={`${villa.title} — luxury villa in ${area ?? "Cape Town"}`}
                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 48vw, 32vw"
                      />
                    ) : null}
                  </CardImage>
                  <CardBody>
                    {area ? <AreaBadge>{area}</AreaBadge> : null}
                    <CardTitle>{villa.title}</CardTitle>
                    <CardMeta>
                      {villa.bedrooms ? <span>{villa.bedrooms} bed</span> : null}
                      {capacity ? <span>sleeps {capacity}</span> : null}
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
          </Slider>
        )}

        <SeeAll href="/villas">See all villas →</SeeAll>
      </Container>
    </Wrapper>
  );
}
