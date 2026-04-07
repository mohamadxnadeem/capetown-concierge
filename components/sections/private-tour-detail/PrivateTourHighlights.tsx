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

type HighlightItem = {
  heading: string;
  body: string;
};

const DEFAULT_TITLE = "Why Guests Choose a Private Tour Over a Group Bus";

const DEFAULT_ITEMS: HighlightItem[] = [
  {
    heading: "No Shared Vehicle. Ever.",
    body: "Your group books the entire vehicle. No strangers, no compromises, no waiting for 20 people to get back on board. It’s your day — completely.",
  },
  {
    heading: "A Chauffeur Who Knows the Peninsula",
    body: "Your driver has done this route dozens of times. They know where the light is best for photos, which viewpoints the buses skip, and when to suggest lingering a little longer. It’s like having a local friend with a luxury car.",
  },
  {
    heading: "Your Schedule, Not Ours",
    body: "Spend 20 minutes at one stop or two hours — it’s your call. We build the day around what matters to you, not a preset timetable designed for the lowest common denominator.",
  },
  {
    heading: "Everything Taken Care Of",
    body: "Hotel pickup, cold water in the car, toll fees, fuel, local guidance — it’s all included. You focus on the experience. We handle everything else.",
  },
];

type Props = {
  tourTitle?: string;
  title?: string;
  items?: HighlightItem[];
};

export default function PrivateTourHighlights({ tourTitle, title, items }: Props) {
  const resolvedItems = items || DEFAULT_ITEMS;
  return (
    <Wrapper>
      <Title>{title || DEFAULT_TITLE}</Title>

      <Grid>
        {resolvedItems.map((item) => (
          <Item key={item.heading}>
            <Icon>✓</Icon>
            <TextWrap>
              <ItemTitle>{item.heading}</ItemTitle>
              <ItemText>{item.body}</ItemText>
            </TextWrap>
          </Item>
        ))}
      </Grid>
    </Wrapper>
  );
}