"use client";

import styled from "styled-components";
import { Container, Section, SectionHeader, SectionText, SectionTitle } from "./shared";
import { TravelerTypeItem } from "./types";

const TravellerGrid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const TravellerCard = styled.div`
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.12);
  border-radius: 20px;
  padding: 22px;
`;

const TravellerTitle = styled.h3`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.05rem;
`;

const TravellerText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

type Props = {
  items: TravelerTypeItem[];
};

export default function ActivitiesTravellerTypes({ items }: Props) {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Best Cape Town Activities by Travel Style</SectionTitle>
          <SectionText>
            Whether you are planning a honeymoon, a family holiday, or a luxury
            Cape Town escape, these experiences can be shaped around the kind of
            trip you want to have.
          </SectionText>
        </SectionHeader>

        <TravellerGrid>
          {items.map((item) => (
            <TravellerCard key={item.title}>
              <TravellerTitle>{item.title}</TravellerTitle>
              <TravellerText>{item.text}</TravellerText>
            </TravellerCard>
          ))}
        </TravellerGrid>
      </Container>
    </Section>
  );
}