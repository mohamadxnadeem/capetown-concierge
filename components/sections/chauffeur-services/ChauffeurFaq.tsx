"use client";

import { useState } from "react";
import styled from "styled-components";
import { FaqItem } from "./types";

type Props = {
  items: FaqItem[];
};

const Title = styled.h2`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.95rem;
  line-height: 1.12;
`;

const FaqList = styled.div`
  display: grid;
  gap: 14px;
`;

const FaqItemWrap = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
`;

const FaqButton = styled.button`
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

const FaqQuestion = styled.span`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  line-height: 1.5;
  font-size: 1rem;
`;

const FaqIcon = styled.span<{ $open: boolean }>`
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

const FaqAnswerWrap = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "260px" : "0")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: max-height 0.25s ease, opacity 0.2s ease;
  overflow: hidden;
`;

const FaqAnswerInner = styled.div`
  padding: 0 24px 22px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

export default function ChauffeurFaq({ items }: Props) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <>
      <Title>Frequently Asked Questions</Title>

      <FaqList>
        {items.map((faq, index) => {
          const isOpen = openFaqIndex === index;

          return (
            <FaqItemWrap key={`${faq.question}-${index}`}>
              <FaqButton
                type="button"
                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`vehicle-faq-${index}`}
              >
                <FaqQuestion>{faq.question}</FaqQuestion>
                <FaqIcon $open={isOpen}>+</FaqIcon>
              </FaqButton>

              <FaqAnswerWrap $open={isOpen} id={`vehicle-faq-${index}`}>
                <FaqAnswerInner>{faq.answer}</FaqAnswerInner>
              </FaqAnswerWrap>
            </FaqItemWrap>
          );
        })}
      </FaqList>
    </>
  );
}