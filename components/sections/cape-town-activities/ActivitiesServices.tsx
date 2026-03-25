"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import { Container, Section, SectionHeader, SectionText, SectionTitle, StyledLink } from "./shared";
import { ServiceItem } from "./types";

const ServicesGrid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ServiceCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 26px;
`;

const ServiceTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.3rem;
`;

const ServiceText = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

type Props = {
  items: ServiceItem[];
};

export default function ActivitiesServices({ items }: Props) {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>How We Help You Experience Cape Town Better</SectionTitle>
          <SectionText>
            Instead of trying to piece everything together yourself, we help you
            enjoy Cape Town with private tours, chauffeur service, and a smoother
            itinerary built around the experiences that suit you best.
          </SectionText>
        </SectionHeader>

        <ServicesGrid>
          {items.map((service) => (
            <ServiceCard key={service.title}>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceText>{service.description}</ServiceText>

              <StyledLink href={service.href}>
                <Button as="span" $variant="secondary">
                  {service.cta}
                </Button>
              </StyledLink>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </Section>
  );
}