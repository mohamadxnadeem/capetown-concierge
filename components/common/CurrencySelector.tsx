"use client";

import { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useCurrency } from "../../context/CurrencyContext";
import { CURRENCIES, CURRENCY_LIST, CurrencyCode } from "../../lib/currencies";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Pill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 38px;
  padding: 0 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
  white-space: nowrap;
  backdrop-filter: blur(6px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.6);
    outline-offset: 2px;
  }
`;

const Flag = styled.span`
  font-size: 1rem;
  line-height: 1;
`;

const Code = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
`;

const Chevron = styled.span<{ $open: boolean }>`
  font-size: 0.6rem;
  opacity: 0.75;
  transition: transform 0.2s ease;
  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownWrap = styled.div`
  position: relative;
`;

const Panel = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 9999;
  width: 260px;
  border-radius: 18px;
  background: rgba(6, 32, 18, 0.97);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.45),
    0 4px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  overflow: hidden;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${slideDown} 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
    `}
`;

const PanelHeader = styled.div`
  padding: 14px 16px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

const PanelTitle = styled.div`
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
`;

const CurrencyList = styled.div`
  padding: 8px 0;
`;

const CurrencyRow = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: ${({ $active }) =>
    $active ? "rgba(11, 91, 51, 0.35)" : "transparent"};
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
  text-align: left;

  &:hover {
    background: ${({ $active }) =>
      $active ? "rgba(11, 91, 51, 0.45)" : "rgba(255, 255, 255, 0.06)"};
  }

  &:focus-visible {
    outline: none;
    background: rgba(255, 255, 255, 0.08);
  }
`;

const RowFlag = styled.span`
  font-size: 1.25rem;
  line-height: 1;
  flex: 0 0 auto;
`;

const RowInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const RowName = styled.div`
  font-size: 0.88rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.2;
`;

const RowCode = styled.div`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 1px;
  text-transform: uppercase;
`;

const RowRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  flex: 0 0 auto;
`;

const ActiveDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 6px rgba(74, 222, 128, 0.7);
`;

const AutoBadge = styled.span`
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(74, 222, 128, 0.9);
  background: rgba(74, 222, 128, 0.12);
  border: 1px solid rgba(74, 222, 128, 0.25);
  border-radius: 4px;
  padding: 1px 5px;
`;

export default function CurrencySelector() {
  const { currency, detectedCurrency, setCurrency, rates } = useCurrency();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const current = CURRENCIES[currency];

  const formatRate = (code: CurrencyCode) => {
    if (code === "USD") return "";
    const rate = rates[code];
    if (!rate) return "";
    return `1 USD = ${code === "ZAR" || code === "AUD" || code === "CAD" ? rate.toFixed(2) : rate.toFixed(2)} ${code}`;
  };

  return (
    <DropdownWrap ref={wrapRef}>
      <Pill
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={`Currency: ${current.name}. Click to change.`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Flag>{current.flag}</Flag>
        <Code>{currency}</Code>
        <Chevron $open={open}>▼</Chevron>
      </Pill>

      <Panel $visible={open} role="listbox" aria-label="Select currency">
        <PanelHeader>
          <PanelTitle>Select Currency</PanelTitle>
        </PanelHeader>

        <CurrencyList>
          {CURRENCY_LIST.map((code) => {
            const meta = CURRENCIES[code];
            const isActive = code === currency;
            const isDetected = code === detectedCurrency;

            return (
              <CurrencyRow
                key={code}
                $active={isActive}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
              >
                <RowFlag>{meta.flag}</RowFlag>
                <RowInfo>
                  <RowName>{meta.name}</RowName>
                  <RowCode>
                    {code} · {meta.symbol}
                    {formatRate(code) ? ` · ${formatRate(code)}` : ""}
                  </RowCode>
                </RowInfo>
                <RowRight>
                  {isActive && <ActiveDot />}
                  {isDetected && !isActive && <AutoBadge>Auto</AutoBadge>}
                  {isDetected && isActive && <AutoBadge>Auto</AutoBadge>}
                </RowRight>
              </CurrencyRow>
            );
          })}
        </CurrencyList>
      </Panel>
    </DropdownWrap>
  );
}
