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

import { useT } from "../../../lib/i18n/LocaleContext";
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
  const tt = useT();
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>{tt("WineRegions.wine-regions-guide")}</SectionEyebrow>
          <SectionTitle>{tt("WineRegions.stellenbosch-vs-franschhoek-vs-constantia")}</SectionTitle>
          <SectionText>
            {tt("WineRegions.each-wine-region-offers-a")}</SectionText>
        </SectionHeader>

        <Grid>
          <RegionCard>
            <RegionTitle>{tt("WineRegions.stellenbosch")}</RegionTitle>
            <RegionText>
              {tt("WineRegions.stellenbosch-offers-the-widest-variety")}</RegionText>
            <Highlight>
              <strong>{tt("WineRegions.best-for")}</strong> {tt("WineRegions.first-time-visitors-wine-lovers")}</Highlight>
          </RegionCard>

          <RegionCard>
            <RegionTitle>{tt("WineRegions.franschhoek")}</RegionTitle>
            <RegionText>
              {tt("WineRegions.franschhoek-is-known-for-a")}</RegionText>
            <Highlight>
              <strong>{tt("WineRegions.best-for")}</strong> {tt("WineRegions.couples-luxury-travellers-and-premium")}</Highlight>
          </RegionCard>

          <RegionCard>
            <RegionTitle>{tt("WineRegions.constantia")}</RegionTitle>
            <RegionText>
              {tt("WineRegions.constantia-is-the-closest-wine")}</RegionText>
            <Highlight>
              <strong>{tt("WineRegions.best-for")}</strong> {tt("WineRegions.shorter-itineraries-easy-access-and")}</Highlight>
          </RegionCard>
        </Grid>
      </Container>
    </Section>
  );
}