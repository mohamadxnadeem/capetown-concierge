"use client";

import { useState } from "react";
import styled from "styled-components";
import EnquiryForm from "./EnquiryForm";

const Wrap = styled.section`
  padding: 40px 0 56px;
  background: ${({ theme }) => theme.colors.background};
`;

const Inner = styled.div`
  width: min(720px, calc(100% - 32px));
  margin: 0 auto;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 12px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  transition: border-color 0.18s, color 0.18s;
  width: 100%;
  justify-content: space-between;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.heading};
  }
`;

const Arrow = styled.span<{ $open: boolean }>`
  font-size: 0.75rem;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s;
  display: inline-block;
`;

const FormWrap = styled.div<{ $open: boolean }>`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? "1000px" : "0")};
  transition: max-height 0.35s ease;
  margin-top: ${({ $open }) => ($open ? "20px" : "0")};
`;

export default function HomepageEnquiryCollapsible() {
  const [open, setOpen] = useState(false);

  return (
    <Wrap>
      <Inner>
        <ToggleButton
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          type="button"
        >
          <span>Prefer email? Send an enquiry</span>
          <Arrow $open={open}>▼</Arrow>
        </ToggleButton>

        <FormWrap $open={open} aria-hidden={!open}>
          <EnquiryForm />
        </FormWrap>
      </Inner>
    </Wrap>
  );
}
