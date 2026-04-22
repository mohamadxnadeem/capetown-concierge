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

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 32px;
`;

const StepCard = styled.div`
  display: grid;
  grid-template-columns: 52px 1fr;
  gap: 18px;
  align-items: flex-start;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 22px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const StepNumber = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 1.1rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

const StepContent = styled.div``;

const StepTitle = styled.h3`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.05rem;
  line-height: 1.3;
`;

const StepText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  font-size: 0.95rem;
`;

const steps = [
  {
    title: "Choose your region",
    text: "Decide whether you want Stellenbosch (most variety), Franschhoek (most refined), Constantia (closest to Cape Town), or a combination of two. Your choice shapes the whole day.",
  },
  {
    title: "Pick 3 to 4 estates",
    text: "Three estates is the sweet spot for a full day — enough variety to compare styles without feeling rushed. Four works if you keep tastings tight. More than four rarely adds anything and usually means skipping the parts you'd have enjoyed most.",
  },
  {
    title: "Book your chauffeur first",
    text: "Confirm your private chauffeur before anything else. The vehicle, pick-up time, and route form the backbone of the day. Everything else — estate reservations, lunch timing, extra stops — can be built around it.",
  },
  {
    title: "Reserve a restaurant table",
    text: "The best estate restaurants (Graff at Delaire, Babel at Babylonstoren, Tokara Restaurant) book out days or weeks ahead in peak season. Decide on your lunch stop when you confirm the route, then call directly.",
  },
  {
    title: "Leave time to linger",
    text: "The best moments on a Cape Winelands day are unplanned — an extra glass while watching the sunset over the vines, a spontaneous detour through the estate garden, a conversation that goes on longer than expected. Build slack into the plan.",
  },
];

export default function WinePlanningGuide() {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>Planning Guide</SectionEyebrow>
          <SectionTitle>How to Plan Your Cape Winelands Day</SectionTitle>
          <SectionText>
            A well-planned wine day in the Cape is one of the great travel experiences.
            A poorly planned one is a long drive with disappointing tastings and no time for lunch.
            Here is how to do it right.
          </SectionText>
        </SectionHeader>

        <Steps>
          {steps.map((step, i) => (
            <StepCard key={step.title}>
              <StepNumber>{i + 1}</StepNumber>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepText>{step.text}</StepText>
              </StepContent>
            </StepCard>
          ))}
        </Steps>

        <Anchor
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "wine_planning_guide",
              label: "Plan My Private Wine Tour",
            })
          }
        >
          <Button as="span">Plan My Private Wine Tour on WhatsApp</Button>
        </Anchor>
      </Container>
    </Section>
  );
}
