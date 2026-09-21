"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import { trackWhatsAppClick } from "../../../lib/tracking";

const SAFARI_CTA_MESSAGE =
  "Hi, I'd like to book the Big 5 safari day trip from Cape Town. My dates and group size are";

const Wrapper = styled.section`
  padding: 64px 0;
  background: ${({ theme }) => theme.colors.backgroundSoft};
`;

const Inner = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: 0 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 32px;
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
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.85rem;
  line-height: 1.15;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.35rem;
  }
`;

const Body = styled.p`
  margin: 0 0 22px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.85;
  font-size: 1.05rem;
`;

const CtaAnchor = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

export default function SafariCanYouDoIt() {
  return (
    <Wrapper>
      <Inner>
        <Eyebrow>Safari From Cape Town</Eyebrow>
        <Title>Can You Do a Safari in Cape Town?</Title>
        <Body>
          Yes, as a day trip. Cape Town has no wildlife reserves with the Big 5, so most visitors think they need to fly to Kruger. They don&apos;t. Aquila Private Game Reserve is a malaria-free Big 5 reserve in the Karoo, about two hours from the city. Our private chauffeur takes you there and back, so you get a real safari without an extra flight, extra hotel or a shared tour bus. We arrange the reserve booking for you alongside the chauffeur, so it&apos;s one WhatsApp thread from your first message to drop-off at your hotel.
        </Body>
        <CtaAnchor
          href={buildWhatsAppLink(SAFARI_CTA_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "safari_can_you_do_it",
              label: "Book Safari Day Trip",
              tour: "Big 5 Safari from Cape Town",
            })
          }
        >
          <Button as="span">Book the Safari Day</Button>
        </CtaAnchor>
      </Inner>
    </Wrapper>
  );
}
