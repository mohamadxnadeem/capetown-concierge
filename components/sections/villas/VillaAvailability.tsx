"use client";

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { brand } from "../../../lib/brand";
import { trackWhatsAppClick } from "../../../lib/tracking";
import type { Villa, VillaAvailability } from "../../../lib/villas";

const Wrapper = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  padding: 28px 26px;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 22px 18px;
    border-radius: 18px;
  }
`;

const Heading = styled.h2`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.4rem;
`;

const Subhead = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const CalendarWrap = styled.div`
  --rdp-accent-color: ${({ theme }) => theme.colors.primary};
  --rdp-accent-background-color: ${({ theme }) => theme.colors.primary};
  --rdp-range_start-color: white;
  --rdp-range_end-color: white;
  --rdp-range_middle-color: ${({ theme }) => theme.colors.heading};
  --rdp-range_middle-background-color: ${({ theme }) => `${theme.colors.primary}1f`};
  --rdp-today-color: ${({ theme }) => theme.colors.primary};

  .rdp-root {
    margin: 0;
    --rdp-day-height: 40px;
    --rdp-day-width: 40px;
  }

  .rdp-month_caption {
    color: ${({ theme }) => theme.colors.heading};
    font-weight: 700;
  }

  .rdp-weekday {
    color: ${({ theme }) => theme.colors.textMuted};
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.72rem;
  }

  .rdp-day {
    font-size: 0.9rem;
  }

  .rdp-day_button {
    border-radius: 10px;
  }

  .rdp-day_button:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Unavailable: coral, no click */
  .rdp-day_unavailable .rdp-day_button {
    background: #ffe2dc;
    color: #a23a26;
    cursor: not-allowed;
    text-decoration: line-through;
    opacity: 0.85;
  }

  /* Check-in / check-out only: amber, still selectable */
  .rdp-day_partial .rdp-day_button {
    background: #fff0c2;
    color: #7b5a00;
  }

  .rdp-day_partial.rdp-selected .rdp-day_button {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  /* Disabled days outside the bookable window: muted */
  .rdp-day_disabled:not(.rdp-day_unavailable) .rdp-day_button {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 0.4;
  }

  .rdp-nav_button {
    border-radius: 10px;
  }
`;

const Legend = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.82rem;
`;

const Swatch = styled.span<{ $bg: string; $fg?: string }>`
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: ${({ $bg }) => $bg};
  margin-right: 6px;
  vertical-align: middle;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const SelectedRow = styled.div`
  margin-top: 18px;
  padding: 14px 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  align-items: baseline;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};

  strong {
    color: ${({ theme }) => theme.colors.heading};
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
`;

const PrimaryCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 52px;
  padding: 0 22px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.98rem;
  flex: 1;
  min-width: 240px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0 18px;
  border-radius: 14px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

function parseIsoDate(iso: string): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function formatLongDate(d: Date): string {
  return d.toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function startOfToday(): Date {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
}

interface Props {
  villa: Villa;
  availability: VillaAvailability;
}

export default function VillaAvailability({ villa, availability }: Props) {
  const today = startOfToday();
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [isDesktop, setIsDesktop] = useState(false);

  // Match desktop ≥ 1024px without reading window during SSR
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const unavailableDates = useMemo(
    () =>
      availability.unavailable
        .map(parseIsoDate)
        .filter((d): d is Date => d !== null),
    [availability.unavailable]
  );

  const partialDates = useMemo(
    () =>
      [...availability.checkin_only, ...availability.checkout_only]
        .map(parseIsoDate)
        .filter((d): d is Date => d !== null),
    [availability.checkin_only, availability.checkout_only]
  );

  const maxDate = useMemo(
    () => parseIsoDate(availability.max_allowed_date ?? ""),
    [availability.max_allowed_date]
  );

  const endMonth = maxDate
    ? startOfMonth(maxDate)
    : startOfMonth(new Date(today.getFullYear() + 1, today.getMonth(), 1));

  const disabled = useMemo(() => {
    const matchers: Array<Date | { before: Date } | { after: Date }> = [
      { before: today },
      ...unavailableDates,
    ];
    if (maxDate) matchers.push({ after: maxDate });
    return matchers;
  }, [today, unavailableDates, maxDate]);

  const messageBase = `Hi ${brand.name}, I'd like to enquire about ${villa.name}`;
  const message =
    range?.from && range?.to
      ? `${messageBase} from ${formatLongDate(range.from)} to ${formatLongDate(
          range.to
        )}. Please confirm availability and pricing. Thank you!`
      : `${messageBase}. Please share availability and pricing options. Thank you!`;

  const whatsappHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Wrapper>
      <Heading>Check availability</Heading>
      <Subhead>
        Greyed dates are already taken. Pick your check-in and check-out and
        we&apos;ll come back with pricing on WhatsApp.
      </Subhead>

      <CalendarWrap>
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={isDesktop ? 2 : 1}
          startMonth={startOfMonth(today)}
          endMonth={endMonth}
          disabled={disabled}
          modifiers={{ unavailable: unavailableDates, partial: partialDates }}
          modifiersClassNames={{
            unavailable: "rdp-day_unavailable",
            partial: "rdp-day_partial",
          }}
          weekStartsOn={1}
        />
      </CalendarWrap>

      <Legend>
        <li>
          <Swatch $bg="#ffe2dc" /> Unavailable
        </li>
        <li>
          <Swatch $bg="#fff0c2" /> Check-in or check-out only
        </li>
        <li>
          <Swatch $bg="white" /> Available
        </li>
      </Legend>

      {range?.from || range?.to ? (
        <SelectedRow>
          <strong>Selected:</strong>
          <span>
            {range?.from ? formatLongDate(range.from) : "—"}
            {" → "}
            {range?.to ? formatLongDate(range.to) : "Pick check-out"}
          </span>
        </SelectedRow>
      ) : null}

      <Actions>
        <PrimaryCta
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackWhatsAppClick({
              source: "villa_availability",
              label: villa.name,
            })
          }
        >
          💬&nbsp; Enquire on WhatsApp
        </PrimaryCta>
        {range?.from || range?.to ? (
          <ClearButton type="button" onClick={() => setRange(undefined)}>
            Clear dates
          </ClearButton>
        ) : null}
      </Actions>
    </Wrapper>
  );
}
