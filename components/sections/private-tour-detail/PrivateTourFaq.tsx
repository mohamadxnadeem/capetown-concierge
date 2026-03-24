"use client";

import styled from "styled-components";
import { useState } from "react";
import { FAQItem } from "./types";

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
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;
`;

const SectionText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const FAQList = styled.div`
  display: grid;
  gap: 14px;
`;

const FAQItemWrap = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
`;

const FAQButton = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  padding: 22px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  text-align: left;
  cursor: pointer;
`;

const FAQQuestion = styled.span`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  line-height: 1.5;
  font-size: 1rem;
`;

const FAQIcon = styled.span<{ $open: boolean }>`
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  transform: ${({ $open }) => ($open ? "rotate(45deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

const FAQAnswerWrap = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "260px" : "0")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: max-height 0.25s ease, opacity 0.2s ease;
  overflow: hidden;
`;

const FAQAnswerInner = styled.div`
  padding: 0 24px 22px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

type Props = {
  items: FAQItem[];
};

export default function PrivateTourFaq({ items }: Props) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <>
      <SectionHeader>
        <SectionEyebrow>FAQ</SectionEyebrow>
        <SectionTitle>Frequently Asked Questions</SectionTitle>
        <SectionText>
          Answering common questions improves confidence and helps strengthen the page for SEO.
        </SectionText>
      </SectionHeader>

      <FAQList>
        {items.map((item, index) => {
          const isOpen = openFaqIndex === index;

          return (
            <FAQItemWrap key={item.question}>
              <FAQButton
                type="button"
                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <FAQQuestion>{item.question}</FAQQuestion>
                <FAQIcon $open={isOpen}>+</FAQIcon>
              </FAQButton>

              <FAQAnswerWrap $open={isOpen} id={`faq-answer-${index}`}>
                <FAQAnswerInner>{item.answer}</FAQAnswerInner>
              </FAQAnswerWrap>
            </FAQItemWrap>
          );
        })}
      </FAQList>
    </>
  );
}