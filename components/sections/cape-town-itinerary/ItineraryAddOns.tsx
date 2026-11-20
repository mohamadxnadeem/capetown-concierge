"use client";

import styled from "styled-components";
import {
  Container,
  Section,
  SectionEyebrow,
  SectionHeader,
  SectionText,
  SectionTitle,
  InfoCard,
} from "./shared";
import { AddOnItem } from "./types";
import { addOnItems } from "./data";

import { useT } from "../../../lib/i18n/LocaleContext";
const Grid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled(InfoCard)`
  padding: 24px;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.1rem;
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

export default function ItineraryAddOns() {
  const tt = useT();
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>{tt("ItineraryAddOns.optional-upgrades")}</SectionEyebrow>
          <SectionTitle>{tt("ItineraryAddOns.enhance-your-cape-town-experience")}</SectionTitle>
          <SectionText>
            {tt("ItineraryAddOns.if-you-want-to-elevate")}</SectionText>
        </SectionHeader>

        <Grid>
          {addOnItems(tt).map((item: AddOnItem) => (
            <Card key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.description}</CardText>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}