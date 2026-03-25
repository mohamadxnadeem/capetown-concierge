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
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>Optional Upgrades</SectionEyebrow>
          <SectionTitle>Enhance Your Cape Town Experience</SectionTitle>
          <SectionText>
            If you want to elevate the trip further, these premium additions can
            be added to your itinerary based on your interests and travel style.
          </SectionText>
        </SectionHeader>

        <Grid>
          {addOnItems.map((item: AddOnItem) => (
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