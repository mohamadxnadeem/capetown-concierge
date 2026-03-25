"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { Anchor, Container, whatsappLink } from "./shared";

const FinalCta = styled.section`
  padding: 84px 0;
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);
`;

const FinalCtaInner = styled.div`
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
`;

const FinalCtaTitle = styled.h2`
  margin: 0 0 14px;
  color: white;
  font-size: 2.2rem;
  line-height: 1.08;
`;

const FinalCtaText = styled.p`
  margin: 0 auto 24px;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.86);
  line-height: 1.85;
`;

export default function ActivitiesFinalCta() {
  return (
    <FinalCta>
      <Container>
        <FinalCtaInner>
          <FinalCtaTitle>Want the Best of Cape Town Planned for You?</FinalCtaTitle>
          <FinalCtaText>
            Message us on WhatsApp and we can help you build a private Cape Town
            itinerary with the right activities, the right pacing, and the right
            chauffeur-driven experience for your stay.
          </FinalCtaText>

          <Anchor
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "best_activities_final_cta",
                label: "Start Planning on WhatsApp",
              })
            }
          >
            <Button as="span">Start Planning on WhatsApp</Button>
          </Anchor>
        </FinalCtaInner>
      </Container>
    </FinalCta>
  );
}