"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import { Anchor, Container } from "./shared";

const FINAL_CTA_MESSAGE =
  "Hi, I'd like the full 7 day itinerary planned for my dates:";

const FinalCta = styled.section`
  padding: 84px 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
`;

const Inner = styled.div`
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0 0 14px;
  color: white;
  font-size: 2.2rem;
  line-height: 1.08;
`;

const Text = styled.p`
  margin: 0 auto 24px;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.85;
`;

const TrustRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  margin-bottom: 24px;
`;

const TrustItem = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
`;

export default function ItineraryFinalCta() {
  const link = buildWhatsAppLink(FINAL_CTA_MESSAGE);

  return (
    <FinalCta>
      <Container>
        <Inner>
          <Title>Ready to Book the Week?</Title>
          <Text>
            Message us with your dates, group size, and hotel (or the hotel you&apos;re considering). We come back with the right vehicle, a flat weekly quote, and a draft day-by-day plan, usually within 30 minutes.
          </Text>

          <TrustRow>
            <TrustItem>Same Driver All 7 Days</TrustItem>
            <TrustItem>Flat Weekly Price</TrustItem>
            <TrustItem>One Point of Contact</TrustItem>
            <TrustItem>Airport to Airport</TrustItem>
          </TrustRow>

          <Anchor
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "itinerary_final_cta",
                label: "Book 7 Day Cape Town Package",
                tour: "7 Day Cape Town Itinerary",
              })
            }
          >
            <Button as="span">Book the 7 Day Package</Button>
          </Anchor>
        </Inner>
      </Container>
    </FinalCta>
  );
}