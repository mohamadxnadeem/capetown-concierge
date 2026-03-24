"use client";

import { useState } from "react";
import styled from "styled-components";
import Container from "../common/Container";
import Button from "../common/Button";
import Image from "next/image";
import {
  buildWhatsAppLink,
  buildTourWhatsAppMessage,
} from "../../lib/whatsapp";

/* =========================
   SHIMMER IMAGE
========================= */

function shimmer(w: number, h: number) {
  return `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f2f4f3" offset="20%" />
          <stop stop-color="#e8ece9" offset="50%" />
          <stop stop-color="#f2f4f3" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f2f4f3" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
    </svg>`;
}

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

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

const faqItems: FAQItem[] = [
  {
    question: "How long does the Cape Peninsula private tour take?",
    answer:
      "Most Cape Peninsula private tours take around a full day, depending on the pace, traffic, and how many photo or sightseeing stops you would like to include.",
  },
  {
    question: "Is this a private tour or a shared group tour?",
    answer:
      "This is a private tour experience designed around your schedule, comfort, and preferences.",
  },
  {
    question: "Can the itinerary be customised?",
    answer:
      "Yes. The tour can be tailored around your interests, timing, and preferred stops where possible.",
  },
  {
    question: "Does the tour include chauffeur transport?",
    answer:
      "Yes. The experience is designed around private chauffeur-driven transport for a smoother and more premium touring experience.",
  },
  {
    question: "Is this tour suitable for couples and families?",
    answer:
      "Yes. This private tour works especially well for couples, families, and travellers looking for a more relaxed and exclusive Cape Town experience.",
  },
];

const reviewItems: ReviewItem[] = [
  {
    quote:
      "Absolutely incredible from start to finish. The route, comfort, and attention to detail made this one of the highlights of our Cape Town trip.",
    name: "James R.",
    subtitle: "London, UK",
  },
  {
    quote:
      "The perfect way to experience Cape Town privately. Everything felt smooth, premium, and beautifully organised.",
    name: "Sophie & Daniel",
    subtitle: "Dubai, UAE",
  },
  {
    quote:
      "A polished and memorable experience with amazing scenery throughout the day. Far better than a standard group tour.",
    name: "Nadia K.",
    subtitle: "Johannesburg, South Africa",
  },
];

/* =========================
   HELPERS
========================= */

function formatPriceRange(
  priceFrom?: string,
  priceTo?: string,
  currency?: string
) {
  if (!priceFrom && !priceTo) return "";
  const symbol = currency === "ZAR" || !currency ? "R" : `${currency} `;
  if (priceFrom && priceTo) return `From ${symbol}${priceFrom} - ${symbol}${priceTo}`;
  if (priceFrom) return `From ${symbol}${priceFrom}`;
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
  min-height: 180px;
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
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
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
  const sideImages = images.slice(1, 3);

  const priceText = formatPriceRange(
    experience.price_from,
    experience.price_to,
    experience.currency
  );

  return (
    <PageWrap>
      <Section>
        <Container>
          <Gallery>
            <MainImage>
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={`${safeTourTitle} private tour in Cape Town`}
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(1200, 800)
                  )}`}
                  sizes="(max-width: 768px) 100vw, 66vw"
                  style={{ objectFit: "cover" }}
                />
              ) : null}
            </MainImage>

            <SideGrid>
              {sideImages.length ? (
                sideImages.map((img) => (
                  <SideImage key={img.id}>
                    <Image
                      src={img.cover_photos}
                      alt={`${safeTourTitle} tour gallery image`}
                      fill
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(600, 400)
                      )}`}
                      sizes="(max-width: 768px) 100vw, 34vw"
                      style={{ objectFit: "cover" }}
                    />
                  </SideImage>
                ))
              ) : (
                <>
                  {mainImage ? (
                    <>
                      <SideImage>
                        <Image
                          src={mainImage}
                          alt={`${safeTourTitle} tour gallery image`}
                          fill
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            shimmer(600, 400)
                          )}`}
                          sizes="(max-width: 768px) 100vw, 34vw"
                          style={{ objectFit: "cover" }}
                        />
                      </SideImage>
                      <SideImage>
                        <Image
                          src={mainImage}
                          alt={`${safeTourTitle} tour gallery image`}
                          fill
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            shimmer(600, 400)
                          )}`}
                          sizes="(max-width: 768px) 100vw, 34vw"
                          style={{ objectFit: "cover" }}
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
            <SectionEyebrow>Private Tour in Cape Town</SectionEyebrow>
            <Title>{safeTourTitle}</Title>
            <SubText>
              {experience.short_description ||
                experience.highlight ||
                "Experience Cape Town like never before with a luxury private tour designed around comfort, flexibility, and unforgettable scenic moments."}
            </SubText>

            <QuickInfoRow>
              {experience.duration ? (
                <QuickInfoBadge>{experience.duration}</QuickInfoBadge>
              ) : null}
              {experience.location ? (
                <QuickInfoBadge>{experience.location}</QuickInfoBadge>
              ) : null}
              {priceText ? <QuickInfoBadge>{priceText}</QuickInfoBadge> : null}
              <QuickInfoBadge>Private Experience</QuickInfoBadge>
            </QuickInfoRow>
          </SectionHeader>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card>
            <SectionTitle>Tour Overview</SectionTitle>
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
              <SectionEyebrow>Itinerary</SectionEyebrow>
              <SectionTitle>How the Day Flows</SectionTitle>
              <SectionText>
                Explore how your private tour unfolds from the first stop to the final scenic moments of the day.
              </SectionText>
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
                            <Image
                              src={stop.image}
                              alt={`${stop.title} on the ${safeTourTitle}`}
                              fill
                              placeholder="blur"
                              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                shimmer(600, 400)
                              )}`}
                              sizes="(max-width: 768px) 100vw, 220px"
                              style={{ objectFit: "cover" }}
                            />
                          ) : null}
                        </StopImage>

                        <div>
                          <StopEyebrow>
                            {stop.stop_type ? `${stop.stop_type} stop` : "Tour stop"}
                          </StopEyebrow>
                          <StopTitle>{stop.title}</StopTitle>
                          <StopText>
                            {stop.short_description ||
                              stop.highlight ||
                              "A memorable stop along your private Cape Town tour."}
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
            <HighlightTitle>Why This Tour Stands Out</HighlightTitle>
            <HighlightText>
              {experience.highlight ||
                "Enjoy a premium private touring experience designed around scenic beauty, flexibility, and memorable moments across Cape Town."}
            </HighlightText>

            <CTAButtons style={{ justifyContent: "flex-start", marginTop: "22px" }}>
              <CTAAnchor
                href={tourWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button as="span">Book This Tour</Button>
              </CTAAnchor>

              <CTAAnchor
                href={tourWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button as="span" $variant="secondary">
                  Enquire on WhatsApp
                </Button>
              </CTAAnchor>
            </CTAButtons>
          </HighlightCard>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader>
            <SectionEyebrow>Client Feedback</SectionEyebrow>
            <SectionTitle>What Guests Love About This Tour</SectionTitle>
            <SectionText>
              Social proof helps travellers feel confident before booking a private experience.
            </SectionText>
          </SectionHeader>

          <ReviewsGrid>
            {reviewItems.map((review, index) => (
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
            <SectionEyebrow>FAQ</SectionEyebrow>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <SectionText>
              Answering common questions improves confidence and helps strengthen the page for SEO.
            </SectionText>
          </SectionHeader>

          <FAQList>
            {faqItems.map((item, index) => {
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
            <CTAEyebrow>Ready to Book?</CTAEyebrow>
            <CTATitle>Plan Your Private Cape Town Tour</CTATitle>
            <CTAText>
              Message us on WhatsApp to check availability, ask questions, and secure your preferred date for this experience.
            </CTAText>

            <CTAButtons>
              <CTAAnchor
                href={tourWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button as="span">Book This Tour</Button>
              </CTAAnchor>

              <CTAAnchor
                href={tourWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button as="span" $variant="secondary">
                  Chat on WhatsApp
                </Button>
              </CTAAnchor>
            </CTAButtons>
          </CTABox>
        </Container>
      </CTASection>
    </PageWrap>
  );
}