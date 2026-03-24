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
      <Title>Why Travelers Choose This Experience</Title>

      <Grid>
        <Item>
          <Icon>✓</Icon>
          <TextWrap>
            <ItemTitle>Private & Flexible Experience</ItemTitle>
            <ItemText>
              Enjoy a fully private tour with the freedom to move at your own pace,
              without being tied to a group schedule.
            </ItemText>
          </TextWrap>
        </Item>

        <Item>
          <Icon>✓</Icon>
          <TextWrap>
            <ItemTitle>Premium Chauffeur Service</ItemTitle>
            <ItemText>
              Travel in comfort with a professional driver who knows Cape Town
              and ensures a smooth, refined experience throughout the day.
            </ItemText>
          </TextWrap>
        </Item>

        <Item>
          <Icon>✓</Icon>
          <TextWrap>
            <ItemTitle>Scenic Routes & Hidden Gems</ItemTitle>
            <ItemText>
              Experience more than just the standard stops with access to scenic
              routes and viewpoints many travellers miss.
            </ItemText>
          </TextWrap>
        </Item>

        <Item>
          <Icon>✓</Icon>
          <TextWrap>
            <ItemTitle>Designed Around You</ItemTitle>
            <ItemText>
              Whether it’s photo stops, coffee breaks, or extra time at a location,
              your {tourTitle || "tour"} adapts to your preferences.
            </ItemText>
          </TextWrap>
        </Item>
      </Grid>
    </Wrapper>
  );
}