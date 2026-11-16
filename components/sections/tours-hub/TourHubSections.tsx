"use client";

import Link from "next/link";
import styled from "styled-components";
import Container from "../../common/Container";
import Money from "../../common/Money";
import { HUB_INTRO, HUB_FAQS } from "../../../lib/tourHub";
import { TOUR_ORDER, TOUR_SEO } from "../../../lib/tourSeo";

const Section = styled.section`
  padding: 48px 0;
`;

const H2 = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.12;
`;

const P = styled.p`
  margin: 0 0 14px;
  max-width: 820px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;
  margin-top: 24px;

  @media (min-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  padding: 22px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const H3 = styled.h3`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.2rem;
`;

const Facts = styled.dl`
  margin: 0 0 14px;
  display: grid;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;

  dt {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.heading};
  }

  dd {
    margin: 0;
  }
`;

const CardLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: underline;
`;

const FaqItem = styled.details`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 16px 20px;
  margin-bottom: 12px;

  summary {
    cursor: pointer;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.heading};
    line-height: 1.5;
  }

  p {
    margin: 12px 0 0;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.8;
  }
`;

export function TourHubIntro({ lowestVehiclePrice }: { lowestVehiclePrice?: number }) {
  return (
    <Section id="compare">
      <Container>
        <H2>Compare our private tours in Cape Town</H2>
        {HUB_INTRO.map((text) => (
          <P key={text}>{text}</P>
        ))}
        <Grid>
          {TOUR_ORDER.map((slug) => {
            const tour = TOUR_SEO[slug];
            return (
              <Card key={slug}>
                <H3>{tour.cardName}</H3>
                <Facts>
                  <div>
                    <dt>Duration</dt>
                    <dd>{tour.duration}</dd>
                  </div>
                  <div>
                    <dt>Highlights</dt>
                    <dd>{tour.highlights}</dd>
                  </div>
                  <div>
                    <dt>Best for</dt>
                    <dd>{tour.suits}</dd>
                  </div>
                  <div>
                    <dt>Price</dt>
                    <dd>
                      {lowestVehiclePrice ? (
                        <>
                          Priced per vehicle, for your whole group. Vehicles start{" "}
                          <Money usd={lowestVehiclePrice} prefix="from " suffix="" />. Message us for your exact quote.
                        </>
                      ) : (
                        "Priced per vehicle, for your whole group. Message us for your exact quote."
                      )}
                    </dd>
                  </div>
                </Facts>
                <CardLink href={`/tours/${slug}`} aria-label={`Read more about the ${tour.cardName}`}>
                  See the {tour.cardName}
                </CardLink>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}

export function TourHubFaq() {
  return (
    <Section>
      <Container>
        <H2>Private tours in Cape Town: your questions, answered</H2>
        {HUB_FAQS.map((faq) => (
          <FaqItem key={faq.question}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </FaqItem>
        ))}
      </Container>
    </Section>
  );
}
