"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { buildWhatsAppLink, buildGeneralWhatsAppMessage } from "../../../lib/whatsapp";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { googleSummary } from "../../../lib/googleReviews";

import { useT } from "../../../lib/i18n/LocaleContext";
const whatsappLink = "https://wa.me/27636746131?text=Hi%2C+I%27d+like+to+book+a+luxury+chauffeur+or+private+tour+in+Cape+Town.+Please+assist.";

const Section = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
`;

const Container = styled.div`
  width: min(900px, calc(100% - 32px));
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 14px;
  color: white;
  font-size: 2.2rem;
`;

const Text = styled.p`
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.8;
`;

const TrustRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 24px;
`;

const TrustItem = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
`;

const Anchor = styled.a`
  display: inline-flex;
`;

export default function TestimonialsCta() {
  const tt = useT();
  return (
    <Section>
      <Container>
        <Title>{tt("TestimonialsCta.ready-to-experience-cape-town")}</Title>

        <Text>
          {tt("TestimonialsCta.message-us-on-whatsapp-and")}</Text>

        <TrustRow>
          <TrustItem>⭐ {googleSummary(tt)}</TrustItem>
          <TrustItem>{tt("TestimonialsCta.private-chauffeur")}</TrustItem>
          <TrustItem>{tt("TestimonialsCta.custom-itinerary")}</TrustItem>
          <TrustItem>{tt("TestimonialsCta.responds-in-30-min")}</TrustItem>
        </TrustRow>

        <Anchor
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "testimonial_cta",
              label: "Plan My Trip",
            })
          }
        >
          <Button as="span">{tt("TestimonialsCta.get-in-touch-on-whatsapp")}</Button>
        </Anchor>
      </Container>
    </Section>
  );
}