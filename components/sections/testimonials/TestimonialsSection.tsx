"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  GOOGLE_REVIEWS_URL,
  googleRatingLabel,
  googleReviewCount,
  selectReviews,
  type GoogleReview,
} from "../../../lib/googleReviews";

import { useT } from "../../../lib/i18n/LocaleContext";
const DEFAULT_COUNT = 27;
const LONG_REVIEW_CHARS = 280;

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
  white-space: pre-line;
  overflow-wrap: anywhere;
  flex: 1;

  &[data-clamped="true"] {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 7;
    overflow: hidden;
  }
`;

const ReadMore = styled.button`
  align-self: flex-start;
  margin-top: 10px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.85rem;
  font-weight: 700;
  text-decoration: underline;
`;

const CardGoogle = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

const TranslatedNote = styled.div`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.78rem;
  font-style: italic;
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

const ReadAllLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: underline;
`;

const SliderFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: center;
  margin-top: 28px;
`;

export function ReviewCard({ review }: { review: GoogleReview }) {
  const tt = useT();
  const isLong = review.text.length > LONG_REVIEW_CHARS;
  const [expanded, setExpanded] = useState(false);
  const initial = Array.from(review.reviewer_name.trim())[0] || "G";

  return (
    <Card>
      <CardHeader>
        <Initial aria-hidden="true">{initial}</Initial>

        <ClientMeta>
          <Name>{review.reviewer_name}</Name>
          <VerifiedBadge>
            <CardGoogle>
              <GoogleG>{tt("TestimonialsSection.g")}</GoogleG>{tt("TestimonialsSection.google-review")}{review.date_label ? tt("TestimonialsSection.text", { date_label: review.date_label }) : ""}
            </CardGoogle>
          </VerifiedBadge>
        </ClientMeta>
      </CardHeader>

      <Stars aria-label={tt("TestimonialsSection.star-rating", { rating: review.rating })}>
        <StarRating count={review.rating} />
      </Stars>

      <Review data-clamped={isLong && !expanded ? "true" : "false"}>{review.text}</Review>

      {isLong ? (
        <ReadMore type="button" aria-expanded={expanded} onClick={() => setExpanded((v) => !v)}>
          {expanded ? tt("TestimonialsSection.show-less") : tt("TestimonialsSection.read-more")}
        </ReadMore>
      ) : null}

      {review.translated_from ? (
        <TranslatedNote>{tt("TestimonialsSection.translated-from")}{" "}{review.translated_from}</TranslatedNote>
      ) : null}
    </Card>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  return <>{Array.from({ length: count }).map((_, i) => <span key={i}>★</span>)}</>;
}

type TestimonialsSectionProps = {
  /** Optional link shown under the Google badge, for example to /reviews. */
  readAllHref?: string;
  /** Review tags for this page, in priority order. Empty means newest eligible reviews. */
  tags?: string[];
  count?: number;
};

export default function TestimonialsSection({
  tags = [],
  count = DEFAULT_COUNT,
  readAllHref,
}: TestimonialsSectionProps) {
  const tt = useT();
  const reviews = selectReviews(tags, count);
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
          <Eyebrow>{tt("TestimonialsSection.client-reviews")}</Eyebrow>
          <Title>{tt("TestimonialsSection.trusted-by-travellers-visiting-cape")}</Title>
          <Description>
            {tt("TestimonialsSection.real-feedback-from-clients-who")}</Description>
        </Header>

        <TopBar>
          <MetaStrip>
            <MetaBadge>{tt("TestimonialsSection.5-star-rated-experience")}</MetaBadge>
            <MetaBadge>{googleReviewCount} {tt("TestimonialsSection.google-reviews")}</MetaBadge>
            <MetaBadge>{tt("TestimonialsSection.private-chauffeur-service")}</MetaBadge>
          </MetaStrip>

          <Controls>
            <Arrow type="button" aria-label={tt("TestimonialsSection.scroll-testimonials-left")} onClick={() => scroll("left")}>
              ←
            </Arrow>
            <Arrow type="button" aria-label={tt("TestimonialsSection.scroll-testimonials-right")} onClick={() => scroll("right")}>
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
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Slider>

        <SliderFooter>
          <GoogleButton
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={tt("TestimonialsSection.read-all-reviews-on-google")}
          >
            <GoogleG>{tt("TestimonialsSection.g")}</GoogleG>
            <GoogleStars>★★★★★</GoogleStars>
            {googleRatingLabel} {tt("TestimonialsSection.from")}{" "}{googleReviewCount} {tt("TestimonialsSection.google-reviews-read-all-reviews")}</GoogleButton>
          {readAllHref ? <ReadAllLink href={readAllHref}>{tt("TestimonialsSection.read-all-reviews")}</ReadAllLink> : null}
        </SliderFooter>
      </Container>
    </Section>
  );
}