"use client";

import styled from "styled-components";

type Props = {
  items: string[];
};

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardInner = styled.div`
  padding: 28px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 34px;
  }
`;

const Title = styled.h2`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.95rem;
  line-height: 1.12;
`;

const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Tag = styled.div`
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.86rem;
  font-weight: 700;
`;

export default function ChauffeurIdealFor({ items }: Props) {
  return (
    <Card>
      <CardInner>
        <Title>Ideal For</Title>
        <TagsWrap>
          {items.map((item, index) => (
            <Tag key={`${item}-${index}`}>{item}</Tag>
          ))}
        </TagsWrap>
      </CardInner>
    </Card>
  );
}