"use client";

import styled from "styled-components";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 30px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const SectionTitle = styled.h2`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;
`;

const RichContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.9;
  font-size: 1rem;

  h2, h3, h4 {
    color: ${({ theme }) => theme.colors.heading};
    margin-top: 28px;
    margin-bottom: 12px;
    line-height: 1.25;
  }

  p {
    margin: 0 0 18px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  ul, ol {
    margin: 0 0 18px 18px;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  li {
    margin-bottom: 10px;
  }

  strong {
    color: ${({ theme }) => theme.colors.heading};
  }
`;

type Props = {
  body?: string;
};

export default function PrivateTourWhatToExpect({ body }: Props) {
  return (
    <Card>
      <SectionTitle>What to Expect</SectionTitle>
      <RichContent
        dangerouslySetInnerHTML={{
          __html: body || "<p>Tour details coming soon.</p>",
        }}
      />
    </Card>
  );
}