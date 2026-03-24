"use client";

import styled from "styled-components";

type Props = {
  html?: string;
  fallbackText: string;
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

const RichContent = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.9;

  p {
    margin: 0 0 16px;
  }

  h2,
  h3,
  h4 {
    color: ${({ theme }) => theme.colors.heading};
    margin: 24px 0 12px;
    line-height: 1.25;
  }

  ul,
  ol {
    margin: 0 0 16px 18px;
  }

  li {
    margin-bottom: 10px;
  }

  strong {
    color: ${({ theme }) => theme.colors.heading};
  }
`;

const BodyText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
`;

export default function ChauffeurWhatToExpect({ html, fallbackText }: Props) {
  return (
    <Card>
      <CardInner>
        <Title>What to Expect</Title>

        {html ? (
          <RichContent dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <BodyText>{fallbackText}</BodyText>
        )}
      </CardInner>
    </Card>
  );
}