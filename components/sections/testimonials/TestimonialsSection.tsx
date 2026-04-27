"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import { testimonials } from "./data";

const GOOGLE_REVIEWS_URL = "https://share.google/P13pnsYwTEQGoPaSh";

const Section = styled.section`
  padding: 80px 0;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

const Container = styled.div`
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(1180px, calc(100% - 64px));
  }
`;

const Header = styled.div`
  max-width: 760px;
  margin-bottom: 32px;
`;

const Eyebrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.6rem;
  }
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
`;

const MetaStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MetaBadge = styled.div`
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  border: 1px solid rgba(11, 91, 51, 0.12);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  font-weight: 700;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
`;

const Arrow = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.heading};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-color: rgba(11, 91, 51, 0.18);
  }
`;

const Slider = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 86%;
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
    grid-auto-columns: 60%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-auto-columns: 42%;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-auto-columns: 31%;
  }
`;

const Card = styled.div`
  scroll-snap-align: start;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 22px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
`;

const Initial = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex: 0 0 auto;
  background: rgba(11, 91, 51, 0.1);
  border: 1px solid rgba(11, 91, 51, 0.15);
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 1.15rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ClientMeta = styled.div`
  min-width: 0;
`;

const Name = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 6px;
  line-height: 1.2;
`;

const VerifiedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.74rem;
  font-weight: 700;
`;

const Stars = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 14px;
  color: #d4a017;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
`;

const Review = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  font-size: 0.98rem;
  flex: 1;
`;

const FooterNote = styled.div`
  margin-top: 18px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
`;

const GoogleButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 12px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-decoration: none;
  font-size: 0.84rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
  white-space: nowrap;

  &:hover {
    border-color: #4285f4;
    box-shadow: 0 4px 14px rgba(66, 133, 244, 0.15);
  }
`;

const GoogleG = styled.span`
  font-size: 1.05rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4285f4 0%, #34a853 40%, #fbbc05 70%, #ea4335 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
`;

const GoogleStars = styled.span`
  color: #fbbc05;
  font-size: 0.78rem;
  letter-spacing: 1px;
`;

const SliderFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 28px;
`;

function StarRating({ count = 5 }: { count?: number }) {
  return <>{Array.from({ length: count }).map((_, i) => <span key={i}>★</span>)}</>;
}

export default function TestimonialsSection({ pinnedNames }: { pinnedNames?: string[] } = {}) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const autoScrollRef = useRef<number | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;

    const amount = sliderRef.current.clientWidth * 0.9;

    sliderRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      window.clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const startAutoScroll = () => {
    if (!sliderRef.current) return;

    stopAutoScroll();

    autoScrollRef.current = window.setInterval(() => {
      const slider = sliderRef.current;
      if (!slider) return;

      const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
      const nextPosition = slider.scrollLeft + slider.clientWidth * 0.9;

      if (nextPosition >= maxScrollLeft - 10) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: slider.clientWidth * 0.9, behavior: "smooth" });
      }
    }, 4200);
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Client Reviews</Eyebrow>
          <Title>Trusted by Travellers Visiting Cape Town</Title>
          <Description>
            Real feedback from clients who booked private chauffeur drives, tours,
            and curated Cape Town experiences with us.
          </Description>
        </Header>

        <TopBar>
          <MetaStrip>
            <MetaBadge>5-Star Rated Experience</MetaBadge>
            <MetaBadge>Verified Client Reviews</MetaBadge>
            <MetaBadge>Luxury Travel Service</MetaBadge>
          </MetaStrip>

          <Controls>
            <Arrow type="button" aria-label="Scroll testimonials left" onClick={() => scroll("left")}>
              ←
            </Arrow>
            <Arrow type="button" aria-label="Scroll testimonials right" onClick={() => scroll("right")}>
              →
            </Arrow>
          </Controls>
        </TopBar>

        <Slider
          ref={sliderRef}
          onMouseEnter={stopAutoScroll}
          onMouseLeave={startAutoScroll}
          onTouchStart={stopAutoScroll}
          onTouchEnd={startAutoScroll}
        >
          {(pinnedNames && pinnedNames.length > 0
            ? [
                ...testimonials.filter((t) => pinnedNames.includes(t.name)),
                ...testimonials.filter((t) => !pinnedNames.includes(t.name)),
              ]
            : testimonials
          ).map((item, index) => (
            <Card key={`${item.name}-${index}`}>
              <CardHeader>
                <Initial>{item.name.charAt(0)}</Initial>

                <ClientMeta>
                  <Name>{item.name}</Name>
                  <VerifiedBadge>Verified Client</VerifiedBadge>
                </ClientMeta>
              </CardHeader>

              <Stars aria-label="5 star rating">
                <StarRating />
              </Stars>

              <Review>”{item.review}”</Review>

              <FooterNote>{item.service}</FooterNote>
            </Card>
          ))}
        </Slider>

        <SliderFooter>
          <GoogleButton
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read all reviews on Google"
          >
            <GoogleG>G</GoogleG>
            <GoogleStars>★★★★★</GoogleStars>
            4.9 · Read all reviews on Google
          </GoogleButton>
        </SliderFooter>
      </Container>
    </Section>
  );
}