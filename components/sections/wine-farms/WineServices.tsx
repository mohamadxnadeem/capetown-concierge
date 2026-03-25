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
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>
            The Best Way to Experience Cape Town Wine Farms
          </SectionTitle>

          <SectionText>
            While you can visit wine farms on your own, the experience is far
            more enjoyable with a private chauffeur who takes care of the
            driving, timing, and route — allowing you to fully relax and enjoy
            each tasting.
          </SectionText>
        </SectionHeader>

        <Grid>
          <Card>
            <CardTitle>No Driving Stress</CardTitle>
            <CardText>
              Enjoy every wine tasting without worrying about driving,
              directions, or safety between estates.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Custom Wine Route</CardTitle>
            <CardText>
              Build your ideal itinerary with the best wine farms, lunch stops,
              and scenic routes tailored to your preferences.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Luxury Experience</CardTitle>
            <CardText>
              Travel in comfort with a premium chauffeur-driven vehicle designed
              for relaxed, all-day wine touring.
            </CardText>
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
            <Button as="span">Plan My Wine Tour</Button>
          </Anchor>

          <StyledLink href="/chauffeur-services">
            <Button as="span" $variant="secondary">
              View Chauffeur Services
            </Button>
          </StyledLink>
        </CTAWrap>
      </Container>
    </Section>
  );
}