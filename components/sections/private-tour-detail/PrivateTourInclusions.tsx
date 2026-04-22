"use client";

import styled from "styled-components";

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

const INCLUDED = [
  "Private vehicle for your group",
  "Professional PDP-licensed chauffeur",
  "Hotel or accommodation pickup and drop-off",
  "Fuel and all toll fees",
  "Chilled bottled water in the vehicle",
  "Flexible itinerary — you set the pace",
  "Flight tracking for airport-connected bookings",
  "Local route knowledge and stop recommendations",
];

const NOT_INCLUDED = [
  "Entrance fees to attractions (e.g. Cape Point Nature Reserve ~R380pp, Boulders Beach ~R260pp, Table Mountain Cable Car — payable on the day)",
  "Meals and drinks unless specified in the tour",
  "Gratuity for your chauffeur (discretionary but appreciated)",
  "Travel insurance",
];

export default function PrivateTourInclusions() {
  return (
    <>
      <SectionHeader>
        <SectionEyebrow>Transparency</SectionEyebrow>
        <SectionTitle>What's included in your tour</SectionTitle>
      </SectionHeader>

      <Grid>
        <Column>
          <ColumnTitle>Included</ColumnTitle>
          <ItemList>
            {INCLUDED.map((item) => (
              <Item key={item}>
                <IncludedIcon>✓</IncludedIcon>
                {item}
              </Item>
            ))}
          </ItemList>
        </Column>

        <Column>
          <ColumnTitle>Not included</ColumnTitle>
          <ItemList>
            {NOT_INCLUDED.map((item) => (
              <Item key={item}>
                <ExcludedIcon>—</ExcludedIcon>
                {item}
              </Item>
            ))}
          </ItemList>
          <HelperText>
            Not sure what's relevant for your tour? Message us and we'll walk you through exactly what to expect and budget for.
          </HelperText>
        </Column>
      </Grid>
    </>
  );
}
