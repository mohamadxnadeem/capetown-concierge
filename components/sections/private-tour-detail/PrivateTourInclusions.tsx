"use client";

import styled from "styled-components";

import { useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 28px;
`;

const SectionEyebrow = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Column = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 26px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const ColumnTitle = styled.h3`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.1rem;
  font-weight: 700;
`;

const ItemList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Item = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
  font-size: 0.95rem;
`;

const IncludedIcon = styled.span`
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(11, 91, 51, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  margin-top: 1px;
`;

const ExcludedIcon = styled.span`
  flex: 0 0 auto;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(100, 100, 100, 0.08);
  color: #888;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  margin-top: 1px;
`;

const HelperText = styled.p`
  margin: 18px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  line-height: 1.7;
`;

const INCLUDED = (tt: TFunction) => ([
  tt("PrivateTourInclusions.private-vehicle-for-your-group"),
  tt("PrivateTourInclusions.professional-pdp-licensed-chauffeur"),
  tt("PrivateTourInclusions.hotel-or-accommodation-pickup-and"),
  tt("PrivateTourInclusions.fuel-and-all-toll-fees"),
  tt("PrivateTourInclusions.chilled-bottled-water-in-the"),
  tt("PrivateTourInclusions.flexible-itinerary-you-set-the"),
  tt("PrivateTourInclusions.flight-tracking-for-airport-connected"),
  tt("PrivateTourInclusions.local-route-knowledge-and-stop"),
]);

const NOT_INCLUDED = (tt: TFunction) => ([
  tt("PrivateTourInclusions.entrance-fees-to-attractions-e"),
  tt("PrivateTourInclusions.meals-and-drinks-unless-specified"),
  tt("PrivateTourInclusions.gratuity-for-your-chauffeur-discretionary"),
  tt("PrivateTourInclusions.travel-insurance"),
]);

export default function PrivateTourInclusions({ title }: { title?: string }) {
  const tt = useT();
  return (
    <>
      <SectionHeader>
        <SectionEyebrow>{tt("PrivateTourInclusions.transparency")}</SectionEyebrow>
        <SectionTitle>{title || tt("PrivateTourInclusions.what-s-included-in-your")}</SectionTitle>
      </SectionHeader>

      <Grid>
        <Column>
          <ColumnTitle>{tt("PrivateTourInclusions.included")}</ColumnTitle>
          <ItemList>
            {INCLUDED(tt).map((item) => (
              <Item key={item}>
                <IncludedIcon>✓</IncludedIcon>
                {item}
              </Item>
            ))}
          </ItemList>
        </Column>

        <Column>
          <ColumnTitle>{tt("PrivateTourInclusions.not-included")}</ColumnTitle>
          <ItemList>
            {NOT_INCLUDED(tt).map((item) => (
              <Item key={item}>
                <ExcludedIcon>-</ExcludedIcon>
                {item}
              </Item>
            ))}
          </ItemList>
          <HelperText>
            {tt("PrivateTourInclusions.not-sure-what-s-relevant")}</HelperText>
        </Column>
      </Grid>
    </>
  );
}
