"use client";

import styled from "styled-components";

const Wrapper = styled.div`
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.08) 0%,
    rgba(6, 62, 35, 0.04) 100%
  );
  border: 1px solid rgba(11, 91, 51, 0.12);
  border-radius: 20px;
  padding: 32px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Title = styled.h2`
  margin: 0 0 20px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.9rem;
  line-height: 1.2;
`;

const Grid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Item = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

const Icon = styled.div`
  min-width: 28px;
  height: 28px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 700;
`;

const TextWrap = styled.div``;

const ItemTitle = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
  margin-bottom: 4px;
`;

const ItemText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
  font-size: 0.95rem;
`;

type Props = {
  tourTitle?: string;
};

export default function PrivateTourHighlights({ tourTitle }: Props) {
  return (
    <Wrapper>
      <Title>What Makes This Different</Title>

      <Grid>
        <Item>
          <Icon>✓</Icon>
          <TextWrap>
            <ItemTitle>No Shared Vehicle. Ever.</ItemTitle>
            <ItemText>
              Your group has the vehicle entirely to themselves. No strangers, no compromises on timing, no waiting for anyone else.
            </ItemText>
          </TextWrap>
        </Item>

        <Item>
          <Icon>✓</Icon>
          <TextWrap>
            <ItemTitle>Professional Local Chauffeur</ItemTitle>
            <ItemText>
              Your driver knows Cape Town’s roads, viewpoints, and hidden spots. You get local knowledge without the awkward tour group dynamic.
            </ItemText>
          </TextWrap>
        </Item>

        <Item>
          <Icon>✓</Icon>
          <TextWrap>
            <ItemTitle>Stay Longer Where It Matters</ItemTitle>
            <ItemText>
              Spend 10 minutes or an hour at any stop. Nobody is rushing you. Your {tourTitle || "tour"} runs on your schedule, not a bus timetable.
            </ItemText>
          </TextWrap>
        </Item>

        <Item>
          <Icon>✓</Icon>
          <TextWrap>
            <ItemTitle>Hotel Pickup. Luggage Help. Water Included.</ItemTitle>
            <ItemText>
              We collect you from your hotel, help with luggage, and have cold water in the vehicle. Small details that make the day noticeably better.
            </ItemText>
          </TextWrap>
        </Item>
      </Grid>
    </Wrapper>
  );
}