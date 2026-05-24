"use client";

import styled, { css } from "styled-components";
import { brand } from "../../lib/brand";
import { trackWhatsAppClick } from "../../lib/tracking";
import type {
  Booking,
  BookingDay,
  BookingDriver,
  BookingStatus,
} from "../../lib/bookings";

const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  padding: 48px 20px 80px;
  min-height: calc(100vh - 82px);
`;

const Article = styled.article`
  max-width: 820px;
  margin: 0 auto;
`;

const Header = styled.header`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px 24px 0 0;
  padding: 32px 36px;
  border-bottom: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 24px 22px;
    border-radius: 18px 18px 0 0;
  }
`;

const Eyebrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const HeadingRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
  justify-content: space-between;
`;

const Heading = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.9rem;
  line-height: 1.15;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  letter-spacing: 0.02em;
  word-break: break-all;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.45rem;
  }
`;

const Subtitle = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.6;
`;

const statusPalette: Record<BookingStatus, { bg: string; fg: string; border: string }> = {
  pending: { bg: "#fff5e0", fg: "#7a5300", border: "#f1d28a" },
  confirmed: { bg: "#e6f4ec", fg: "#0b5b33", border: "#bcdfc8" },
  completed: { bg: "#eef0f3", fg: "#34414c", border: "#d4dae0" },
  cancelled: { bg: "#fbe9e9", fg: "#9a1f1f", border: "#eec3c3" },
};

const StatusBadge = styled.span<{ $status: BookingStatus }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  ${({ $status }) => {
    const p = statusPalette[$status];
    return css`
      background: ${p.bg};
      color: ${p.fg};
      border: 1px solid ${p.border};
    `;
  }}
`;

const StatusBanner = styled.div<{ $status: BookingStatus }>`
  padding: 14px 20px;
  font-size: 0.95rem;
  line-height: 1.5;
  ${({ $status }) => {
    const p = statusPalette[$status];
    return css`
      background: ${p.bg};
      color: ${p.fg};
      border-top: 1px solid ${p.border};
      border-bottom: 1px solid ${p.border};
    `;
  }}
`;

const Card = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 28px 36px;
  border-top: none;

  &:last-of-type {
    border-radius: 0 0 24px 24px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 22px;

    &:last-of-type {
      border-radius: 0 0 18px 18px;
    }
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const DefinitionList = styled.dl`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 12px 24px;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: 4px 0;

    & > dt + dd {
      margin-bottom: 12px;
    }
  }
`;

const Term = styled.dt`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  font-weight: 600;
  padding-top: 2px;
`;

const Detail = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.55;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Muted = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;

const DayList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DayItem = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 14px;
  padding: 14px 18px;
`;

const DayHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  align-items: baseline;
  margin-bottom: 4px;
`;

const DayLabel = styled.span`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 1rem;
`;

const DayTime = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`;

const Pill = styled.span`
  padding: 3px 10px;
  border-radius: 999px;
  background: ${({ theme }) => `${theme.colors.primary}14`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const DayNotes = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.92rem;
  line-height: 1.6;
  white-space: pre-line;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
`;

const Tag = styled.span`
  padding: 3px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.78rem;
  font-weight: 600;
`;

const Prose = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.98rem;
  line-height: 1.7;
  white-space: pre-line;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
`;

const ButtonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
`;

const PrimaryAction = styled.a`
  ${ButtonBase}
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }
`;

const SecondaryAction = styled.button`
  ${ButtonBase}
  background: white;
  color: ${({ theme }) => theme.colors.heading};
  border-color: ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  @media print {
    display: none;
  }
`;

const TertiaryAction = styled.a`
  ${ButtonBase}
  background: white;
  color: ${({ theme }) => theme.colors.heading};
  border-color: ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

const STATUS_HINTS: Record<BookingStatus, string> = {
  pending:
    "We've received your booking and are confirming availability. We'll email you shortly.",
  confirmed: "Your booking is confirmed. See you soon!",
  completed: "Trip complete. Thank you!",
  cancelled: "This booking has been cancelled.",
};

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(t: string): string {
  const parts = t.split(":");
  if (parts.length < 2) return t;
  return `${parts[0]}:${parts[1]}`;
}

function describeDay(day: BookingDay): string | null {
  const start = day.start_time ? formatTime(day.start_time) : null;
  const end = day.end_time ? formatTime(day.end_time) : null;

  if (day.day_type === "half_day") {
    if (start && end) return `Half day · ${start}–${end}`;
    if (start) return `Half day · from ${start}`;
    return "Half day";
  }
  if (start && end) return `Full day · ${start}–${end}`;
  if (start) return `Full day · from ${start}`;
  return "Full day";
}

function whatsappLink(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}`;
}

function vehicleSummary(car: NonNullable<Booking["car"]>): string {
  const bits: string[] = [];
  if (car.vehicle_type) bits.push(car.vehicle_type);
  if (car.number_of_seats) bits.push(`${car.number_of_seats} seats`);
  if (typeof car.luggage_capacity === "number") {
    bits.push(`${car.luggage_capacity} bags`);
  }
  return bits.join(" · ");
}

interface Props {
  booking: Booking;
}

export default function BookingDetailView({ booking }: Props) {
  const driver: BookingDriver | null = booking.driver ?? booking.car?.driver ?? null;
  const supportMailto = `mailto:${brand.contactEmail}?subject=${encodeURIComponent(
    `Booking ${booking.booking_reference}`
  )}`;
  const supportWhatsApp = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    `Hi, I have a question about booking ${booking.booking_reference}.`
  )}`;

  return (
    <Wrapper>
      <Article>
        <Header>
          <Eyebrow>{brand.name} · Booking</Eyebrow>
          <HeadingRow>
            <Heading>{booking.booking_reference}</Heading>
            <StatusBadge $status={booking.status}>
              {STATUS_LABELS[booking.status]}
            </StatusBadge>
          </HeadingRow>
          {booking.title ? <Subtitle>{booking.title}</Subtitle> : null}
        </Header>

        <StatusBanner $status={booking.status}>
          {STATUS_HINTS[booking.status]}
        </StatusBanner>

        <Card>
          <SectionTitle>Booking summary</SectionTitle>
          <DefinitionList>
            {booking.car ? (
              <>
                <Term>Vehicle</Term>
                <Detail>
                  <div>{booking.car.title}</div>
                  {vehicleSummary(booking.car) ? (
                    <Muted>{vehicleSummary(booking.car)}</Muted>
                  ) : null}
                  {booking.car.features?.length ? (
                    <Tags>
                      {booking.car.features.map((f) => (
                        <Tag key={f}>{f}</Tag>
                      ))}
                    </Tags>
                  ) : null}
                </Detail>
              </>
            ) : null}

            <Term>{booking.is_multi_day ? "Trip dates" : "Date"}</Term>
            <Detail>
              <DayList>
                {booking.days.map((day, idx) => {
                  const meta = describeDay(day);
                  return (
                    <DayItem key={day.id}>
                      <DayHead>
                        {booking.is_multi_day ? (
                          <Pill>Day {idx + 1}</Pill>
                        ) : null}
                        <DayLabel>{formatDate(day.date)}</DayLabel>
                        {meta ? <DayTime>{meta}</DayTime> : null}
                      </DayHead>
                      {day.notes ? <DayNotes>{day.notes}</DayNotes> : null}
                    </DayItem>
                  );
                })}
              </DayList>
            </Detail>

            {booking.customer_name ? (
              <>
                <Term>Guest</Term>
                <Detail>
                  <div>{booking.customer_name}</div>
                  {booking.customer_email || booking.customer_phone ? (
                    <Muted>
                      {[booking.customer_email, booking.customer_phone]
                        .filter(Boolean)
                        .join(" · ")}
                    </Muted>
                  ) : null}
                </Detail>
              </>
            ) : null}

            {booking.pickup_location ? (
              <>
                <Term>Pickup</Term>
                <Detail>{booking.pickup_location}</Detail>
              </>
            ) : null}

            {booking.dropoff_location ? (
              <>
                <Term>Drop-off</Term>
                <Detail>{booking.dropoff_location}</Detail>
              </>
            ) : null}
          </DefinitionList>
        </Card>

        <Card>
          <SectionTitle>Your driver</SectionTitle>
          {driver ? (
            <DefinitionList>
              <Term>Name</Term>
              <Detail>{driver.full_name}</Detail>

              {driver.phone ? (
                <>
                  <Term>Phone</Term>
                  <Detail>
                    <a href={`tel:${driver.phone.replace(/\s/g, "")}`}>
                      {driver.phone}
                    </a>
                  </Detail>
                </>
              ) : null}

              {driver.whatsapp ? (
                <>
                  <Term>WhatsApp</Term>
                  <Detail>
                    <a
                      href={whatsappLink(driver.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick({
                          source: "booking_detail_driver",
                          label: "Message driver",
                        })
                      }
                    >
                      {driver.whatsapp}
                    </a>
                  </Detail>
                </>
              ) : null}
            </DefinitionList>
          ) : (
            <Muted>
              Driver to be assigned — we&apos;ll share their details closer to
              your trip date.
            </Muted>
          )}
        </Card>

        {booking.trip_description ? (
          <Card>
            <SectionTitle>Trip notes</SectionTitle>
            <Prose>{booking.trip_description}</Prose>
          </Card>
        ) : null}

        <Card>
          <SectionTitle>Need to change something?</SectionTitle>
          <Prose>
            Reply to your confirmation email, or reach out below — we&apos;ll
            update your booking and confirm the change in writing.
          </Prose>
          <Actions>
            <PrimaryAction
              href={supportWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "booking_detail_support",
                  label: "Message support",
                })
              }
            >
              💬&nbsp; Message us on WhatsApp
            </PrimaryAction>
            <TertiaryAction href={supportMailto}>Email support</TertiaryAction>
            <SecondaryAction
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") window.print();
              }}
            >
              Print
            </SecondaryAction>
          </Actions>
        </Card>
      </Article>
    </Wrapper>
  );
}
