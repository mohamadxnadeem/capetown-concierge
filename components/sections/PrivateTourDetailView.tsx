"use client";

import { useState } from "react";
import styled from "styled-components";
import Container from "../common/Container";
import Button from "../common/Button";
import SmartImage from "../common/SmartImage";
import RotatingImage from "../common/RotatingImage";
import {
  buildWhatsAppLink,
  buildTourWhatsAppMessage,
} from "../../lib/whatsapp";

import { useT } from "../../lib/i18n/LocaleContext";
import { enT } from "../../lib/i18n/messages";
import type { TFunction } from "../../lib/i18n/messages";
/* =========================
   TYPES
========================= */

type ExperiencePhoto = {
  id: number;
  experience?: number;
  cover_photos: string;
  order: number;
  is_featured?: boolean;
};

type ExperienceStop = {
  id: number;
  title: string;
  short_description?: string;
  highlight?: string;
  image?: string;
  order: number;
  estimated_time?: string;
  stop_type?: string;
};

type Experience = {
  title?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  duration?: string;
  location?: string;
  price_from?: string;
  price_to?: string;
  currency?: string;
  cover_photos?: ExperiencePhoto[];
  stops?: ExperienceStop[];
};

type FAQItem = {
  question: string;
  answer: string;
};

type ReviewItem = {
  quote: string;
  name: string;
  subtitle: string;
};

/* =========================
   DATA
========================= */

const faqItems = (tt: TFunction): FAQItem[] => ([
  {
    question: tt("PrivateTourDetailView.how-long-does-the-cape"),
    answer:
      tt("PrivateTourDetailView.most-cape-peninsula-private-tours"),
  },
  {
    question: tt("PrivateTourDetailView.is-this-a-private-tour"),
    answer:
      tt("PrivateTourDetailView.this-is-a-private-tour"),
  },
  {
    question: tt("PrivateTourDetailView.can-the-itinerary-be-customised"),
    answer:
      tt("PrivateTourDetailView.yes-the-tour-can-be"),
  },
  {
    question: tt("PrivateTourDetailView.does-the-tour-include-chauffeur"),
    answer:
      tt("PrivateTourDetailView.yes-the-experience-is-designed"),
  },
  {
    question: tt("PrivateTourDetailView.is-this-tour-suitable-for"),
    answer:
      tt("PrivateTourDetailView.yes-this-private-tour-works"),
  },
]);

const reviewItems = (tt: TFunction): ReviewItem[] => ([
  {
    quote:
      tt("PrivateTourDetailView.absolutely-incredible-from-start-to"),
    name: tt("PrivateTourDetailView.james-r"),
    subtitle: tt("PrivateTourDetailView.london-uk"),
  },
  {
    quote:
      tt("PrivateTourDetailView.the-perfect-way-to-experience"),
    name: tt("PrivateTourDetailView.sophie-daniel"),
    subtitle: tt("PrivateTourDetailView.dubai-uae"),
  },
  {
    quote:
      tt("PrivateTourDetailView.a-polished-and-memorable-experience"),
    name: tt("PrivateTourDetailView.nadia-k"),
    subtitle: tt("PrivateTourDetailView.johannesburg-south-africa"),
  },
]);

/* =========================
   HELPERS
========================= */

function formatPriceRange(
  priceFrom?: string,
  priceTo?: string,
  currency?: string, tt: TFunction = enT
) {
  if (!priceFrom && !priceTo) return "";
  const symbol = currency === "USD" || !currency ? "$" : currency === "ZAR" ? "R" : `${currency} `;
  if (priceFrom && priceTo) return tt("PrivateTourDetailView.from", { symbol, priceFrom, symbol2: symbol, priceTo });
  if (priceFrom) return tt("PrivateTourDetailView.from-2", { symbol, priceFrom });
  return `${symbol}${priceTo}`;
}

/* =========================
   STYLES
========================= */

const PageWrap = styled.main`
  background: ${({ theme }) => theme.colors.background};
`;

const Section = styled.section`
  padding: 64px 0;
`;

const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 28px;
`;

const SectionEyebrow = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SectionTitle = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;
`;

const SectionText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.heading};
  margin: 0 0 16px;
  line-height: 1.05;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.6rem;
  }
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  margin: 0;
  max-width: 860px;
  font-size: 1.04rem;
`;

const QuickInfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
`;

const QuickInfoBadge = styled.div`
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  border: 1px solid rgba(11, 91, 51, 0.12);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.9rem;
  font-weight: 700;
`;

/* gallery */

const Gallery = styled.div`
  display: grid;
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MainImage = styled.div`
  position: relative;
  height: 420px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.card};

  @media (min-width: 768px) {
    height: 560px;
  }
`;

const SideGrid = styled.div`
  display: grid;
  gap: 12px;
`;

const SideImage = styled.div`
  position: relative;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

/* cards */

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 30px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const RichContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.9;
  font-size: 1rem;

  h2, h3, h4 {
    color: ${({ theme }) => theme.colors.heading};
    margin-top: 28px;
    margin-bottom: 12px;
    line-height: 1.25;
  }

  p {
    margin: 0 0 18px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  ul, ol {
    margin: 0 0 18px 18px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  li {
    margin-bottom: 10px;
  }

  strong {
    color: ${({ theme }) => theme.colors.heading};
  }
`;

const HighlightCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.12);
  padding: 28px;
  border-radius: 20px;
`;

const HighlightTitle = styled.h3`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.35rem;
`;

const HighlightText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

/* itinerary */

const TimelineWrap = styled.div`
  position: relative;
  display: grid;
  gap: 22px;
`;

const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 18px;
  align-items: start;
`;

const TimelineRail = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  min-height: 100%;
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 0;
  bottom: -22px;
  width: 2px;
  background: linear-gradient(
    180deg,
    rgba(11, 91, 51, 0.24) 0%,
    rgba(11, 91, 51, 0.08) 100%
  );
`;

const TimelineDot = styled.div`
  position: relative;
  z-index: 2;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  box-shadow: 0 10px 25px rgba(11, 91, 51, 0.18);
`;

const StopCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 22px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const StopTop = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 220px minmax(0, 1fr);
    align-items: start;
  }
`;

const StopImage = styled.div`
  position: relative;
  height: 180px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.12), rgba(6, 62, 35, 0.06));
`;

const StopEyebrow = styled.div`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const StopTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.35rem;
  line-height: 1.2;
`;

const StopText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const StopMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 14px;
`;

const StopMeta = styled.div`
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.85rem;
  font-weight: 600;
`;

/* reviews */

const ReviewsGrid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ReviewCard = styled.div`
  height: 100%;
  padding: 26px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const QuoteMark = styled.div`
  margin-bottom: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
`;

const ReviewQuote = styled.p`
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.heading};
  line-height: 1.85;
  min-height: 120px;
`;

const ReviewFooter = styled.div`
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ReviewName = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  margin-bottom: 4px;
`;

const ReviewSubtitle = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.94rem;
`;

/* faq */

const FAQList = styled.div`
  display: grid;
  gap: 14px;
`;

const FAQItemWrap = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
`;

const FAQButton = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  padding: 22px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  text-align: left;
  cursor: pointer;
`;

const FAQQuestion = styled.span`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  line-height: 1.5;
  font-size: 1rem;
`;

const FAQIcon = styled.span<{ $open: boolean }>`
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  transform: ${({ $open }) => ($open ? "rotate(45deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

const FAQAnswerWrap = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "260px" : "0")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: max-height 0.25s ease, opacity 0.2s ease;
  overflow: hidden;
`;

const FAQAnswerInner = styled.div`
  padding: 0 24px 22px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

/* cta */

const CTASection = styled.section`
  padding: 84px 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
`;

const CTABox = styled.div`
  text-align: center;
  max-width: 860px;
  margin: 0 auto;
`;

const CTAEyebrow = styled.div`
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CTATitle = styled.h2`
  margin: 0 0 14px;
  color: white;
  font-size: 2.1rem;
  line-height: 1.1;
`;

const CTAText = styled.p`
  margin: 0 auto 24px;
  max-width: 700px;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.8;
`;

const CTAButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
`;

const CTAAnchor = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

/* =========================
   COMPONENT
========================= */

export default function PrivateTourDetailView({
  experience,
}: {
  experience: Experience;
}) {
  const tt = useT();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const safeTourTitle = experience?.title || "private tour";
  const tourWhatsAppLink = buildWhatsAppLink(
    buildTourWhatsAppMessage(safeTourTitle)
  );

  const images = [...(experience.cover_photos || [])].sort(
    (a, b) => a.order - b.order
  );
  const stops = [...(experience.stops || [])].sort((a, b) => a.order - b.order);

  const mainImage = images[0]?.cover_photos || "";
  const mainRotationImages = images
    .map((i) => i?.cover_photos)
    .filter((u): u is string => Boolean(u))
    .slice(0, 6);
  const sideImages = images.slice(1, 3);

  const priceText = formatPriceRange(
    experience.price_from,
    experience.price_to,
    experience.currency, tt
  );

  return (
    <PageWrap>
      <Section>
        <Container>
          <Gallery>
            <MainImage>
              {mainRotationImages.length > 1 ? (
                <RotatingImage
                  images={mainRotationImages}
                  alt={tt("PrivateTourDetailView.private-tour-in-cape-town", { safeTourTitle })}
                  priority
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              ) : mainImage ? (
                <SmartImage
                  src={mainImage}
                  alt={tt("PrivateTourDetailView.private-tour-in-cape-town", { safeTourTitle })}
                  priority
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
              ) : null}
            </MainImage>

            <SideGrid>
              {sideImages.length ? (
                sideImages.map((img) => (
                  <SideImage key={img.id}>
                    <SmartImage
                      src={img.cover_photos}
                      alt={tt("PrivateTourDetailView.tour-gallery-image", { safeTourTitle })}
                      sizes="(max-width: 768px) 100vw, 34vw"
                    />
                  </SideImage>
                ))
              ) : (
                <>
                  {mainImage ? (
                    <>
                      <SideImage>
                        <SmartImage
                          src={mainImage}
                          alt={tt("PrivateTourDetailView.tour-gallery-image", { safeTourTitle })}
                          sizes="(max-width: 768px) 100vw, 34vw"
                        />
                      </SideImage>
                      <SideImage>
                        <SmartImage
                          src={mainImage}
                          alt={tt("PrivateTourDetailView.tour-gallery-image", { safeTourTitle })}
                          sizes="(max-width: 768px) 100vw, 34vw"
                        />
                      </SideImage>
                    </>
                  ) : null}
                </>
              )}
            </SideGrid>
          </Gallery>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader>
            <SectionEyebrow>{tt("PrivateTourDetailView.private-tour-in-cape-town-2")}</SectionEyebrow>
            <Title>{safeTourTitle}</Title>
            <SubText>
              {experience.short_description ||
                experience.highlight ||
                tt("PrivateTourDetailView.experience-cape-town-like-never")}
            </SubText>

            <QuickInfoRow>
              {experience.duration ? (
                <QuickInfoBadge>{experience.duration}</QuickInfoBadge>
              ) : null}
              {experience.location ? (
                <QuickInfoBadge>{experience.location}</QuickInfoBadge>
              ) : null}
              {priceText ? <QuickInfoBadge>{priceText}</QuickInfoBadge> : null}
              <QuickInfoBadge>{tt("PrivateTourDetailView.private-experience")}</QuickInfoBadge>
            </QuickInfoRow>
          </SectionHeader>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card>
            <SectionTitle>{tt("PrivateTourDetailView.tour-overview")}</SectionTitle>
            <RichContent
              dangerouslySetInnerHTML={{
                __html: experience.body || "<p>Tour details coming soon.</p>",
              }}
            />
          </Card>
        </Container>
      </Section>

      {!!stops.length && (
        <Section>
          <Container>
            <SectionHeader>
              <SectionEyebrow>{tt("PrivateTourDetailView.itinerary")}</SectionEyebrow>
              <SectionTitle>{tt("PrivateTourDetailView.how-the-day-flows")}</SectionTitle>
              <SectionText>
                {tt("PrivateTourDetailView.explore-how-your-private-tour")}</SectionText>
            </SectionHeader>

            <TimelineWrap>
              {stops.map((stop, index) => {
                const isLast = index === stops.length - 1;

                return (
                  <TimelineItem key={stop.id}>
                    <TimelineRail>
                      {!isLast && <TimelineLine />}
                      <TimelineDot>{index + 1}</TimelineDot>
                    </TimelineRail>

                    <StopCard>
                      <StopTop>
                        <StopImage>
                          {stop.image ? (
                            <SmartImage
                              src={stop.image}
                              alt={tt("PrivateTourDetailView.on-the", { title: stop.title, safeTourTitle })}
                              sizes="(max-width: 768px) 100vw, 220px"
                            />
                          ) : null}
                        </StopImage>

                        <div>
                          <StopEyebrow>
                            {stop.stop_type ? tt("PrivateTourDetailView.stop", { stop_type: stop.stop_type }) : tt("PrivateTourDetailView.tour-stop")}
                          </StopEyebrow>
                          <StopTitle>{stop.title}</StopTitle>
                          <StopText>
                            {stop.short_description ||
                              stop.highlight ||
                              tt("PrivateTourDetailView.a-memorable-stop-along-your")}
                          </StopText>

                          <StopMetaRow>
                            {stop.estimated_time ? (
                              <StopMeta>{stop.estimated_time}</StopMeta>
                            ) : null}
                            {stop.highlight ? <StopMeta>{stop.highlight}</StopMeta> : null}
                          </StopMetaRow>
                        </div>
                      </StopTop>
                    </StopCard>
                  </TimelineItem>
                );
              })}
            </TimelineWrap>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <HighlightCard>
            <HighlightTitle>{tt("PrivateTourDetailView.why-this-tour-stands-out")}</HighlightTitle>
            <HighlightText>
              {experience.highlight ||
                tt("PrivateTourDetailView.enjoy-a-premium-private-touring")}
            </HighlightText>

            <CTAButtons style={{ justifyContent: "flex-start", marginTop: "22px" }}>
              <CTAAnchor
                href={tt.path(tourWhatsAppLink)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button as="span">{tt("PrivateTourDetailView.book-this-tour")}</Button>
              </CTAAnchor>

              <CTAAnchor
                href={tt.path(tourWhatsAppLink)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button as="span" $variant="secondary">
                  {tt("PrivateTourDetailView.enquire-on-whatsapp")}</Button>
              </CTAAnchor>
            </CTAButtons>
          </HighlightCard>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader>
            <SectionEyebrow>{tt("PrivateTourDetailView.client-feedback")}</SectionEyebrow>
            <SectionTitle>{tt("PrivateTourDetailView.what-guests-love-about-this")}</SectionTitle>
            <SectionText>
              {tt("PrivateTourDetailView.social-proof-helps-travellers-feel")}</SectionText>
          </SectionHeader>

          <ReviewsGrid>
            {reviewItems(tt).map((review, index) => (
              <ReviewCard key={`${review.name}-${index}`}>
                <QuoteMark>“</QuoteMark>
                <ReviewQuote>{review.quote}</ReviewQuote>
                <ReviewFooter>
                  <ReviewName>{review.name}</ReviewName>
                  <ReviewSubtitle>{review.subtitle}</ReviewSubtitle>
                </ReviewFooter>
              </ReviewCard>
            ))}
          </ReviewsGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader>
            <SectionEyebrow>{tt("PrivateTourDetailView.faq")}</SectionEyebrow>
            <SectionTitle>{tt("PrivateTourDetailView.frequently-asked-questions")}</SectionTitle>
            <SectionText>
              {tt("PrivateTourDetailView.answering-common-questions-improves-confidence")}</SectionText>
          </SectionHeader>

          <FAQList>
            {faqItems(tt).map((item, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <FAQItemWrap key={item.question}>
                  <FAQButton
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <FAQQuestion>{item.question}</FAQQuestion>
                    <FAQIcon $open={isOpen}>+</FAQIcon>
                  </FAQButton>

                  <FAQAnswerWrap $open={isOpen} id={`faq-answer-${index}`}>
                    <FAQAnswerInner>{item.answer}</FAQAnswerInner>
                  </FAQAnswerWrap>
                </FAQItemWrap>
              );
            })}
          </FAQList>
        </Container>
      </Section>

      <CTASection>
        <Container>
          <CTABox>
            <CTAEyebrow>{tt("PrivateTourDetailView.ready-to-book")}</CTAEyebrow>
            <CTATitle>{tt("PrivateTourDetailView.plan-your-private-cape-town")}</CTATitle>
            <CTAText>
              {tt("PrivateTourDetailView.message-us-on-whatsapp-to")}</CTAText>

            <CTAButtons>
              <CTAAnchor
                href={tt.path(tourWhatsAppLink)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button as="span">{tt("PrivateTourDetailView.book-this-tour")}</Button>
              </CTAAnchor>

              <CTAAnchor
                href={tt.path(tourWhatsAppLink)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button as="span" $variant="secondary">
                  {tt("PrivateTourDetailView.chat-on-whatsapp")}</Button>
              </CTAAnchor>
            </CTAButtons>
          </CTABox>
        </Container>
      </CTASection>
    </PageWrap>
  );
}