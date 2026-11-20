"use client";

import styled from "styled-components";
import Link from "next/link";
import Button from "../../common/Button";
import { Container, Section, SectionHeader, SectionText, SectionTitle, StyledLink } from "./shared";
import { ServiceItem } from "./types";

import { useT } from "../../../lib/i18n/LocaleContext";
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
  const tt = useT();
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>{tt("ActivitiesServices.how-we-help-you-experience")}</SectionTitle>
          <SectionText>
            {tt("ActivitiesServices.instead-of-trying-to-piece")}{" "}
            <Link href={tt.path("/tours/cape-peninsula-tour")} style={{color:"inherit",textDecoration:"underline"}}>
              {tt("ActivitiesServices.private-cape-peninsula-tour")}</Link>{" "}
            {tt("ActivitiesServices.and")}{" "}
            <Link href={tt.path("/tours/winelands-chauffeur-drive")} style={{color:"inherit",textDecoration:"underline"}}>
              {tt("ActivitiesServices.private-winelands-tour")}</Link>
            {tt("ActivitiesServices.plus")}{" "}
            <Link href={tt.path("/chauffeur-hire")} style={{color:"inherit",textDecoration:"underline"}}>
              {tt("ActivitiesServices.chauffeur-hire-in-cape-town")}</Link>
            {tt("ActivitiesServices.and-a-smoother-itinerary-built")}</SectionText>
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