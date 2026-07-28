"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import { Anchor, Container, Section } from "./shared";

const PEAK_MESSAGE =
  "Hi, I'm looking at booking the 7 day Cape Town itinerary for December or January. My arrival date is";

const Notice = styled.div`
  padding: 32px;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.14);

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 44px;
  }
`;

const Eyebrow = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.75rem;
  line-height: 1.15;
  max-width: 720px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.1rem;
  }
`;

const Body = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
  max-width: 760px;

  p {
    margin: 0 0 14px;
  }

  p:last-of-type {
    margin-bottom: 22px;
  }
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export default function PeakSeasonNotice() {
  const link = buildWhatsAppLink(PEAK_MESSAGE);

  return (
    <Section>
      <Container>
        <Notice>
          <Eyebrow>Peak Season</Eyebrow>
          <Title>Booking for December or January</Title>
          <Body>
            <p>
              Peak season runs from mid-December to the end of January and our vehicles are committed months ahead. Most clients travelling then book between August and October.
            </p>
            <p>
              If your dates fall in that window, message us early even if the rest of the trip isn&apos;t settled. We can hold a vehicle while you finalise flights and hotels.
            </p>
          </Body>
          <CtaRow>
            <Anchor
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "itinerary_peak_season",
                  label: "Check December January Availability",
                  tour: "7 Day Cape Town Itinerary",
                })
              }
            >
              <Button as="span">Check My Dates</Button>
            </Anchor>
          </CtaRow>
        </Notice>
      </Container>
    </Section>
  );
}
