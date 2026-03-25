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
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const RegionCard = styled(InfoCard)`
  padding: 24px;
`;

const RegionTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.15rem;
  line-height: 1.2;
`;

const RegionText = styled.p`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const Highlight = styled.div`
  padding: 12px 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  line-height: 1.65;
`;

export default function WineRegions() {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>Wine Regions Guide</SectionEyebrow>
          <SectionTitle>Stellenbosch vs Franschhoek vs Constantia</SectionTitle>
          <SectionText>
            Each wine region offers a different kind of experience. The right
            choice depends on whether you want variety, luxury dining, scenery,
            or a shorter day close to Cape Town.
          </SectionText>
        </SectionHeader>

        <Grid>
          <RegionCard>
            <RegionTitle>Stellenbosch</RegionTitle>
            <RegionText>
              Stellenbosch offers the widest variety of estates and is ideal for
              travellers who want a full wine day with iconic vineyards,
              excellent tastings, and beautiful mountain scenery.
            </RegionText>
            <Highlight>
              <strong>Best for:</strong> First-time visitors, wine lovers, and
              full-day private wine tours.
            </Highlight>
          </RegionCard>

          <RegionCard>
            <RegionTitle>Franschhoek</RegionTitle>
            <RegionText>
              Franschhoek is known for a more refined and luxury feel, with
              elegant estates, exceptional food, and a slower, more romantic
              atmosphere.
            </RegionText>
            <Highlight>
              <strong>Best for:</strong> Couples, luxury travellers, and premium
              wine-and-lunch experiences.
            </Highlight>
          </RegionCard>

          <RegionCard>
            <RegionTitle>Constantia</RegionTitle>
            <RegionText>
              Constantia is the closest wine region to Cape Town and works well
              for shorter outings, more relaxed half-day experiences, or pairing
              wine tasting with other city and coastal stops.
            </RegionText>
            <Highlight>
              <strong>Best for:</strong> Shorter itineraries, easy access, and
              combining wine estates with Cape Town sightseeing.
            </Highlight>
          </RegionCard>
        </Grid>
      </Container>
    </Section>
  );
}