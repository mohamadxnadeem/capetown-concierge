"use client";

import { useState } from "react";
import styled from "styled-components";
import {
  Container,
  Section,
  SectionHeader,
  SectionTitle,
  SectionText,
} from "./shared";

type FaqItem = {
  question: string;
  answer: string;
};

type Props = {
  items: FaqItem[];
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Item = styled.div`
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
`;

const Trigger = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  border: none;
  background: transparent;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(11, 91, 51, 0.03);
  }
`;

const Question = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  line-height: 1.5;
  font-size: 1rem;
`;

const Icon = styled.div<{ $isOpen: boolean }>`
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: 700;
  transition: transform 0.2s ease, background 0.2s ease;

  transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "rotate(0deg)")};
`;

const AnswerWrap = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
  transition: grid-template-rows 0.25s ease;
`;

const AnswerInner = styled.div`
  overflow: hidden;
`;

const Answer = styled.p`
  margin: 0;
  padding: 0 22px 22px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
`;

export default function WineFaq({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <Section>
      <Container>
        <SectionHeader>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <SectionText>
            Here are some common questions about visiting wine farms in Cape
            Town and planning a private chauffeur-driven wine experience.
          </SectionText>
        </SectionHeader>

        <List>
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Item key={item.question}>
                <Trigger
                  type="button"
                  $isOpen={isOpen}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`wine-faq-answer-${index}`}
                >
                  <Question>{item.question}</Question>
                  <Icon $isOpen={isOpen}>+</Icon>
                </Trigger>

                <AnswerWrap $isOpen={isOpen} id={`wine-faq-answer-${index}`}>
                  <AnswerInner>
                    <Answer>{item.answer}</Answer>
                  </AnswerInner>
                </AnswerWrap>
              </Item>
            );
          })}
        </List>
      </Container>
    </Section>
  );
}