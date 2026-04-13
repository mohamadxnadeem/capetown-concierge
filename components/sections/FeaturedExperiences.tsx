"use client";

import Link from "next/link";
import { useRef } from "react";
import styled from "styled-components";
import Container from "../common/Container";
import SmartImage from "../common/SmartImage";
import Money from "../common/Money";

type ExperienceItem = {
  title: string;
  description: string;
  href: string;
  image?: string;
  alt?: string;
  priceUsd?: number;
};

type FeaturedExperiencesProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: ExperienceItem[];
};

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
  gap: 24px;
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
  line-height: 1.08;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.8rem;
  }
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.8;
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
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.heading};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-color: rgba(11, 91, 51, 0.2);
  }
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
  -ms-overflow-style: none;

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
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-color: rgba(11, 91, 51, 0.22);
  }
`;

const CardImageWrap = styled.div`
  position: relative;
  height: 260px;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.18), rgba(6, 62, 35, 0.1));
`;

const CardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  margin-bottom: 14px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const CardTitle = styled.h3`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.22rem;
  line-height: 1.2;
`;

const CardText = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.98rem;
  line-height: 1.75;
  flex: 1;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const ViewButton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 18px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: background 0.2s ease, transform 0.2s ease;

  ${Card}:hover & {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const InlineArrow = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: 700;
`;

const EmptyState = styled.div`
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

function getExperienceAltText(title: string) {
  return `Private ${title} in Cape Town with Professional Driver`;
}

export default function FeaturedExperiences({
  eyebrow = "Private Tours",
  title = "Explore Signature Private Tours in Cape Town",
  description = "Discover some of our most requested private tours, scenic routes, and curated full-day experiences across Cape Town and beyond.",
  items = [],
}: FeaturedExperiencesProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);

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
            <Eyebrow>{eyebrow}</Eyebrow>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </Intro>

          {!!items.length && (
            <Controls>
              <ArrowButton
                type="button"
                aria-label="Scroll private tours left"
                onClick={() => scrollByAmount("left")}
              >
                ←
              </ArrowButton>
              <ArrowButton
                type="button"
                aria-label="Scroll private tours right"
                onClick={() => scrollByAmount("right")}
              >
                →
              </ArrowButton>
            </Controls>
          )}
        </TopBar>

        {!items.length ? (
          <EmptyState>No private tours loaded yet.</EmptyState>
        ) : (
          <Slider ref={sliderRef}>
            {items.map((item, index) => (
              <Card key={`${item.title}-${index}`} href={item.href}>
                <CardImageWrap>
                  {item.image ? (
                    <SmartImage
                      src={item.image}
                      alt={item.alt || getExperienceAltText(item.title)}
                      sizes="(max-width: 768px) 85vw, (max-width: 1200px) 48vw, 32vw"
                    />
                  ) : null}
                </CardImageWrap>

                <CardContent>
                  <Badge>{item.priceUsd ? <Money usd={item.priceUsd} /> : "Private Tour"}</Badge>
                  <CardTitle>{item.title}</CardTitle>
                  <CardText>{item.description}</CardText>

                  <CardFooter>
                    <ViewButton>View Tour</ViewButton>
                    <InlineArrow>→</InlineArrow>
                  </CardFooter>
                </CardContent>
              </Card>
            ))}
          </Slider>
        )}
      </Container>
    </Wrapper>
  );
}