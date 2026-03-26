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

const Grid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Card = styled(InfoCard)`
  padding: 24px;
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.1rem;
  line-height: 1.2;
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

export default function WineByTravelStyle() {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>Choose the Right Experience</SectionEyebrow>
          <SectionTitle>Best Wine Farms by Travel Style</SectionTitle>
          <SectionText>
            Not every wine farm offers the same kind of experience. Some are
            better for couples, some are more family friendly, and others are
            ideal for luxury travellers, scenic lunches, or shorter outings
            closer to Cape Town.
          </SectionText>
        </SectionHeader>

        <Grid>
          <Card>
            <CardTitle>Most Romantic Wine Farms</CardTitle>
            <CardText>
              Delaire Graff, Waterford Estate, Lanzerac, and Postcard Café are
              especially good for couples thanks to their views, elegant
              atmosphere, and more intimate overall feel.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Best Wine Farms for Families</CardTitle>
            <CardText>
              Babylonstoren, Boschendal, Spier, and Vredenheim work especially
              well for families and mixed groups because they offer more space,
              broader appeal, and a more relaxed atmosphere.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Best Luxury Wine Estates</CardTitle>
            <CardText>
              Delaire Graff, Waterford Estate, and Lanzerac are ideal for
              travellers looking for a more polished, premium wine tasting
              experience with refined surroundings.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Best Scenic Lunch & View Stops</CardTitle>
            <CardText>
              Postcard Café, Tokara, Babylonstoren, and Delaire Graff are strong
              options if you want beautiful vineyard views, scenic routes, and a
              memorable lunch stop during the day.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Best Wine Farms for First-Time Visitors</CardTitle>
            <CardText>
              Delaire Graff, Tokara, Babylonstoren, Boschendal, and Groot
              Constantia are excellent starting points for travellers wanting a
              well-rounded first Cape Winelands experience.
            </CardText>
          </Card>

          <Card>
            <CardTitle>Best for Shorter Wine Days</CardTitle>
            <CardText>
              Groot Constantia is a great option for shorter outings because it
              is closer to Cape Town and can easily be paired with city,
              coastline, or sunset plans on the same day.
            </CardText>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}