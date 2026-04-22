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

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const SeasonCard = styled(InfoCard)`
  padding: 22px;
`;

const SeasonLabel = styled.div`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
`;

const SeasonTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.05rem;
  line-height: 1.2;
`;

const SeasonText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  font-size: 0.92rem;
`;

const TipBox = styled.div`
  margin-top: 24px;
  padding: 20px 22px;
  border-radius: 18px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.14);
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  font-size: 0.95rem;
`;

const seasons = [
  {
    label: "Oct – Dec",
    title: "Spring & Early Summer",
    text: "The vines are lush and green, wildflowers are still out, and the crowds haven't yet arrived. Ideal weather for outdoor tastings and estate picnics. A genuinely beautiful time to visit.",
  },
  {
    label: "Jan – Mar",
    title: "Peak Summer & Harvest",
    text: "The hottest and busiest period. Harvest begins from late January and the estates come alive with activity — grape picking, cellar tours, and pairing events. Book tables and tours well in advance.",
  },
  {
    label: "Apr – Jun",
    title: "Autumn Winelands",
    text: "The leaves turn gold and red across the vineyards, the temperatures cool to a perfect 18–22°C, and the restaurants are quieter. Many consider this the most beautiful time to visit the Cape Winelands.",
  },
  {
    label: "Jul – Sep",
    title: "Winter — Best Value",
    text: "Fewer tourists, lower restaurant prices, roaring fireplaces at estate cellars, and hearty red wine pairings. It rains more but rarely all day. Franschhoek in winter is particularly atmospheric.",
  },
];

export default function WineBestTime() {
  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionEyebrow>Seasonal Guide</SectionEyebrow>
          <SectionTitle>Best Time to Visit Cape Town Wine Farms</SectionTitle>
          <SectionText>
            The Cape Winelands are worth visiting year-round — each season offers a different kind of experience.
            Here is what to expect across the calendar so you can choose the version that suits you best.
          </SectionText>
        </SectionHeader>

        <Grid>
          {seasons.map((s) => (
            <SeasonCard key={s.label}>
              <SeasonLabel>{s.label}</SeasonLabel>
              <SeasonTitle>{s.title}</SeasonTitle>
              <SeasonText>{s.text}</SeasonText>
            </SeasonCard>
          ))}
        </Grid>

        <TipBox>
          <strong>Practical tip:</strong> Regardless of season, a private chauffeur is the best way to experience the Cape Winelands. It removes the stress of driving mountain passes, allows you to taste freely at every estate, and gives you the flexibility to stay longer somewhere you love or add an unplanned stop along the way.
        </TipBox>
      </Container>
    </Section>
  );
}
