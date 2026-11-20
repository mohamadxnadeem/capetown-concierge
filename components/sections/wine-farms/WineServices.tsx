"use client";

import styled from "styled-components";
import Button from "../../common/Button";
import {
  Container,
  Section,
  SectionHeader,
  SectionTitle,
  SectionText,
  StyledLink,
  Anchor,
  whatsappLink,
} from "./shared";
import { trackWhatsAppClick } from "../../../lib/tracking";

import { useT } from "../../../lib/i18n/LocaleContext";
const Grid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  padding: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.heading};
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  font-size: 0.95rem;
`;

const CTAWrap = styled.div`
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

export default function WineServices() {
  const tt = useT();
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>
            {tt("WineServices.the-best-way-to-experience")}</SectionTitle>

          <SectionText>
            {tt("WineServices.while-you-can-visit-wine")}</SectionText>
        </SectionHeader>

        <Grid>
          <Card>
            <CardTitle>{tt("WineServices.no-driving-stress")}</CardTitle>
            <CardText>
              {tt("WineServices.enjoy-every-wine-tasting-without")}</CardText>
          </Card>

          <Card>
            <CardTitle>{tt("WineServices.custom-wine-route")}</CardTitle>
            <CardText>
              {tt("WineServices.build-your-ideal-itinerary-with")}</CardText>
          </Card>

          <Card>
            <CardTitle>{tt("WineServices.luxury-experience")}</CardTitle>
            <CardText>
              {tt("WineServices.travel-in-comfort-with-a")}</CardText>
          </Card>
        </Grid>

        <CTAWrap>
          <Anchor
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                source: "wine_services",
                label: "Plan Wine Tour",
              })
            }
          >
            <Button as="span">{tt("WineServices.plan-my-wine-tour")}</Button>
          </Anchor>

          <StyledLink href={tt.path("/chauffeur-hire")}>
            <Button as="span" $variant="secondary">
              {tt("WineServices.view-chauffeur-services")}</Button>
          </StyledLink>
        </CTAWrap>
      </Container>
    </Section>
  );
}