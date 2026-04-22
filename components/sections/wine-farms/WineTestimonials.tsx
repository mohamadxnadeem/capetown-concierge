"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import {
  Anchor,
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionText,
  SectionTitle,
  whatsappLink,
} from "./shared";
import { trackWhatsAppClick } from "../../../lib/tracking";

const Grid = styled.div`
  display: grid;
  gap: 18px;
  margin-bottom: 28px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 22px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: flex;
  flex-direction: column;
`;

const CardTop = styled.div`
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

const Meta = styled.div``;

const Name = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 4px;
  line-height: 1.2;
`;

const ServiceTag = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.74rem;
  font-weight: 700;
`;

const Stars = styled.div`
  display: flex;
  gap: 3px;
  margin-bottom: 12px;
  color: #d4a017;
  font-size: 0.95rem;
`;

const Review = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  font-size: 0.97rem;
  flex: 1;
`;

const reviews = [
  {
    name: "Kresmir",
    service: "Stellenbosch Winelands Tour",
    review:
      "The Winelands tour was everything we hoped for. Three estates in Stellenbosch, a beautiful lunch, and a scenic drive back through Franschhoek. No rush, no group, just us. The driver recommended Babylonstoren and it was the best stop of the day.",
  },
  {
    name: "Marie",
    service: "Stellenbosch Winelands Tour",
    review:
      "Our winelands experience was genuinely beautiful. Three estates in Stellenbosch and we ended the day at a farm restaurant in Franschhoek. Having a private driver meant we could actually taste everything without a care in the world. Would do it again.",
  },
  {
    name: "Ruth",
    service: "Stellenbosch Winelands Tour",
    review:
      "We didn't want a shared shuttle to Stellenbosch so booked the private winelands tour instead. Best decision we made. We picked our own estates, lingered over a long lunch, and got back to Cape Town when we were ready. No timetable, no rushing.",
  },
];

export default function WineTestimonials() {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>Client Reviews</SectionEyebrow>
          <SectionTitle>What Guests Say About Our Wine Tours</SectionTitle>
          <SectionText>
            Feedback from travellers who booked private chauffeur-driven wine experiences in Stellenbosch and Franschhoek.
          </SectionText>
        </SectionHeader>

        <Grid>
          {reviews.map((r) => (
            <Card key={r.name}>
              <CardTop>
                <Initial>{r.name.charAt(0)}</Initial>
                <Meta>
                  <Name>{r.name}</Name>
                  <ServiceTag>{r.service}</ServiceTag>
                </Meta>
              </CardTop>
              <Stars aria-label="5 star rating">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </Stars>
              <Review>"{r.review}"</Review>
            </Card>
          ))}
        </Grid>

        <Anchor
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "wine_testimonials",
              label: "Book My Wine Tour",
            })
          }
        >
          <Button as="span">Book My Private Wine Tour</Button>
        </Anchor>
      </Container>
    </Section>
  );
}
