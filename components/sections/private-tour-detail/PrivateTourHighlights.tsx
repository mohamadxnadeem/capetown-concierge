"use client";

import styled from "styled-components";

import { useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
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

const DEFAULT_TITLE = (tt: TFunction) => (tt("PrivateTourHighlights.why-guests-choose-a-private"));

const DEFAULT_ITEMS = (tt: TFunction): HighlightItem[] => ([
  {
    heading: tt("PrivateTourHighlights.no-shared-vehicle-ever"),
    body: tt("PrivateTourHighlights.your-group-books-the-entire"),
  },
  {
    heading: tt("PrivateTourHighlights.a-chauffeur-who-knows-the"),
    body: tt("PrivateTourHighlights.your-driver-has-done-this"),
  },
  {
    heading: tt("PrivateTourHighlights.your-schedule-not-ours"),
    body: tt("PrivateTourHighlights.spend-20-minutes-at-one"),
  },
  {
    heading: tt("PrivateTourHighlights.everything-taken-care-of"),
    body: tt("PrivateTourHighlights.hotel-pickup-cold-water-in"),
  },
]);

type Props = {
  tourTitle?: string;
  title?: string;
  items?: HighlightItem[];
};

export default function PrivateTourHighlights({ tourTitle, title, items }: Props) {
  const tt = useT();
  const resolvedItems = items || DEFAULT_ITEMS(tt);
  return (
    <Wrapper>
      <Title>{title || DEFAULT_TITLE(tt)}</Title>

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