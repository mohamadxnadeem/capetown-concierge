"use client";

import { useState } from "react";
import styled from "styled-components";

import { useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 30px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 22px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;
`;

const IntroText = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  max-width: 860px;
`;

const IncludesGrid = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 14px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const IncludeCard = styled.button<{ $expanded: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  gap: 6px;
  width: 100%;
  padding: 12px;
  border-radius: 14px;
  border: 1px solid rgba(11, 91, 51, 0.1);
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.06) 0%,
    rgba(6, 62, 35, 0.03) 100%
  );
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  font: inherit;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.soft};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    cursor: default;
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    gap: 10px;
    padding: 14px;
    transform: none;
  }
`;

const IconWrap = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  font-size: 0.85rem;
  flex: 0 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 36px;
    height: 36px;
    font-size: 0.95rem;
  }
`;

const IncludeContent = styled.div`
  min-width: 0;
  width: 100%;
`;

const IncludeTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: space-between;
  }
`;

const IncludeTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.8rem;
  line-height: 1.2;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.95rem;
    margin: 0 0 4px;
  }
`;

const ExpandIcon = styled.span<{ $expanded: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.95rem;
  font-weight: 700;
  transform: ${({ $expanded }) => ($expanded ? "rotate(45deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const IncludeTextWrap = styled.div<{ $expanded: boolean }>`
  display: grid;
  grid-template-rows: ${({ $expanded }) => ($expanded ? "1fr" : "0fr")};
  width: 100%;
  transition: grid-template-rows 0.22s ease;
  margin-top: ${({ $expanded }) => ($expanded ? "6px" : "0")};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
    grid-template-rows: none;
    margin-top: 0;
  }
`;

const IncludeTextInner = styled.div`
  overflow: hidden;
`;

const IncludeText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
  font-size: 0.82rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.85rem;
  }
`;

const expectations = (tt: TFunction) => ([
  {
    icon: "🚘",
    title: tt("PrivateTourWhatToExpect.professional-chauffeur"),
    text: tt("PrivateTourWhatToExpect.travel-with-a-polished-private"),
  },
  {
    icon: "🗺️",
    title: tt("PrivateTourWhatToExpect.local-tour-guide"),
    text: tt("PrivateTourWhatToExpect.enjoy-local-insight-scenic-recommendations"),
  },
  {
    icon: "⛽",
    title: tt("PrivateTourWhatToExpect.fuel-included"),
    text: tt("PrivateTourWhatToExpect.your-tour-pricing-is-structured"),
  },
  {
    icon: "🌊",
    title: tt("PrivateTourWhatToExpect.toll-fees-included"),
    text: tt("PrivateTourWhatToExpect.key-scenic-toll-routes-can"),
  },
  {
    icon: "📸",
    title: tt("PrivateTourWhatToExpect.flexible-stops"),
    text: tt("PrivateTourWhatToExpect.pause-for-coffee-photos-viewpoints"),
  },
  {
    icon: "✨",
    title: tt("PrivateTourWhatToExpect.insider-tips"),
    text: tt("PrivateTourWhatToExpect.get-access-to-lunch-spots"),
  },
]);

export default function PrivateTourWhatToExpect() {
  const tt = useT();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <Card>
      <SectionTitle>{tt("PrivateTourWhatToExpect.what-to-expect")}</SectionTitle>

      <IntroText>
        {tt("PrivateTourWhatToExpect.enjoy-a-more-comfortable-flexible")}</IntroText>

      <IncludesGrid>
        {expectations(tt).map((item, index) => {
          const isExpanded = openIndex === index;

          return (
            <IncludeCard
              key={item.title}
              type="button"
              $expanded={isExpanded}
              onClick={() => toggleCard(index)}
              aria-expanded={isExpanded}
            >
              <IconWrap aria-hidden="true">{item.icon}</IconWrap>

              <IncludeContent>
                <IncludeTitleRow>
                  <IncludeTitle>{item.title}</IncludeTitle>
                  <ExpandIcon $expanded={isExpanded}>+</ExpandIcon>
                </IncludeTitleRow>

                <IncludeTextWrap $expanded={isExpanded}>
                  <IncludeTextInner>
                    <IncludeText>{item.text}</IncludeText>
                  </IncludeTextInner>
                </IncludeTextWrap>
              </IncludeContent>
            </IncludeCard>
          );
        })}
      </IncludesGrid>
    </Card>
  );
}