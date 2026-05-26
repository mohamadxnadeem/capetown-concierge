"use client";

import styled, { css } from "styled-components";
import { brand } from "../../lib/brand";
import SmartImage from "../common/SmartImage";
import type {
  DriverBooking,
  DriverBookingDay,
  DriverBookingStatus,
} from "../../lib/driverBookings";

const Page = styled.main`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  padding-bottom: 64px;
`;

const Hero = styled.section`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);

  @media (min-width: 720px) {
    height: 340px;
  }
`;

const HeroImageLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(8, 18, 16, 0.45) 0%,
    rgba(8, 18, 16, 0.55) 55%,
    rgba(8, 18, 16, 0.82) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 20px 24px;
  color: white;
  max-width: 720px;
  margin: 0 auto;
`;

const HeroEyebrow = styled.div`
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 8px;
`;

const HeroRefRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
  align-items: center;
  margin-bottom: 6px;
`;

const HeroRef = styled.h1`
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 1.35rem;
  letter-spacing: 0.03em;
  word-break: break-all;
  color: white;

  @media (min-width: 720px) {
    font-size: 1.55rem;
  }
`;

const statusPalette: Record<
  "confirmed" | "completed" | "cancelled" | "pending",
  { bg: string; fg: string }
> = {
  confirmed: { bg: "rgba(255,255,255,0.92)", fg: "#0b5b33" },
  pending: { bg: "rgba(255,255,255,0.92)", fg: "#0b5b33" },
  completed: { bg: "rgba(255,255,255,0.82)", fg: "#34414c" },
  cancelled: { bg: "#fbe9e9", fg: "#9a1f1f" },
};

const StatusPill = styled.span<{ $status: DriverBookingStatus }>`
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  ${({ $status }) => {
    const p = statusPalette[$status] ?? statusPalette.confirmed;
    return css`
      background: ${p.bg};
      color: ${p.fg};
    `;
  }}
`;

const HeroDateRange = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);

  @media (min-width: 720px) {
    font-size: 1.08rem;
  }
`;

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 16px 16px 0;

  @media (min-width: 720px) {
    padding: 20px 20px 0;
  }
`;

const Banner = styled.div`
  margin: 0 0 16px;
  padding: 14px 16px;
  border-radius: 14px;
  background: #fbe9e9;
  border: 1px solid #eec3c3;
  color: #9a1f1f;
  font-weight: 700;
  font-size: 0.95rem;
  text-align: center;
`;

const Card = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  padding: 18px 18px 20px;
  margin-bottom: 14px;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (min-width: 720px) {
    padding: 22px 24px 24px;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 14px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px 16px;
  font-size: 0.98rem;
  line-height: 1.55;
  padding: 6px 0;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 2px;
    padding: 4px 0 10px;
  }
`;

const RowLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  font-weight: 600;
`;

const RowValue = styled.div`
  color: ${({ theme }) => theme.colors.text};
  word-break: break-word;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Notes = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.65;
  white-space: pre-line;
`;

const DayList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DayItem = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 12px 14px;
`;

const DayHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  align-items: baseline;
`;

const DayLabel = styled.span`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 1rem;
`;

const DayMeta = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`;

const Pill = styled.span`
  padding: 2px 9px;
  border-radius: 999px;
  background: ${({ theme }) => `${theme.colors.primary}14`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const EarningsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const EarningsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-of-type {
    border-bottom: none;
  }
`;

const EarningsLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.98rem;
`;

const EarningsAmount = styled.div`
  font-weight: 700;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  color: ${({ theme }) => theme.colors.heading};
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-top: 12px;
  padding-top: 14px;
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
`;

const TotalLabel = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const TotalAmount = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 800;
  font-size: 1.2rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
`;

const BrandFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 28px;
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

const BrandLogo = styled.img`
  height: 26px;
  width: auto;
`;

function parseAmount(value: string | null | undefined): number | null {
  if (!value) return null;
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function formatZar(amount: number): string {
  return `R${Math.round(amount).toLocaleString()}`;
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatShortDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
}

function formatTime(t: string | null): string {
  if (!t) return "";
  const parts = t.split(":");
  if (parts.length < 2) return t;
  return `${parts[0]}:${parts[1]}`;
}

function formatDateRange(start: string | null, end: string | null): string {
  if (!start && !end) return "";
  if (start && end && start !== end) {
    const startD = new Date(`${start}T00:00:00`);
    const endD = new Date(`${end}T00:00:00`);
    if (
      !Number.isNaN(startD.getTime()) &&
      !Number.isNaN(endD.getTime()) &&
      startD.getFullYear() === endD.getFullYear()
    ) {
      return `${formatShortDate(start)} – ${formatDate(end)}`;
    }
    return `${formatDate(start)} – ${formatDate(end)}`;
  }
  return formatDate(start || end);
}

function pickHeroImage(
  car: DriverBooking["car"]
): { url: string; alt: string } | null {
  if (!car?.cover_photos?.length) return null;
  const valid = car.cover_photos.filter((p) => p?.cover_photos);
  if (!valid.length) return null;
  const featured = valid.find((p) => p.is_featured);
  const url = (featured ?? valid[0]).cover_photos;
  return { url, alt: car.title };
}

function describeDay(day: DriverBookingDay): string {
  const start = formatTime(day.start_time);
  const end = formatTime(day.end_time);
  const base = day.day_type_display || "";
  if (start && end) return base ? `${base} · ${start}–${end}` : `${start}–${end}`;
  if (start) return base ? `${base} · from ${start}` : `from ${start}`;
  return base;
}

interface Props {
  booking: DriverBooking;
}

export default function DriverBookingView({ booking }: Props) {
  const hero = pickHeroImage(booking.car);
  const dateRange = formatDateRange(booking.start_date, booking.end_date);
  const totalDriver =
    parseAmount(booking.total_driver_amount) ??
    booking.days.reduce((acc, d) => acc + (parseAmount(d.driver_rate) ?? 0), 0);
  const hasAnyRate = booking.days.some((d) => parseAmount(d.driver_rate) !== null);
  const isMultiDay = booking.days.length > 1;
  const cancelled = booking.status === "cancelled";

  const customerPhoneHref = booking.customer_phone
    ? `tel:${booking.customer_phone.replace(/\s+/g, "")}`
    : null;

  return (
    <Page>
      <Hero>
        {hero ? (
          <HeroImageLayer>
            <SmartImage src={hero.url} alt={hero.alt} priority sizes="100vw" />
          </HeroImageLayer>
        ) : null}
        <HeroOverlay />
        <HeroContent>
          <HeroEyebrow>{brand.name} · Driver brief</HeroEyebrow>
          <HeroRefRow>
            <HeroRef>{booking.booking_reference}</HeroRef>
            <StatusPill $status={booking.status}>
              {booking.status_display || booking.status}
            </StatusPill>
          </HeroRefRow>
          {dateRange ? <HeroDateRange>{dateRange}</HeroDateRange> : null}
        </HeroContent>
      </Hero>

      <Container>
        {cancelled ? (
          <Banner>⚠ This booking has been cancelled</Banner>
        ) : null}

        <Card>
          <SectionTitle>Trip</SectionTitle>
          {booking.car ? (
            <Row>
              <RowLabel>Vehicle</RowLabel>
              <RowValue>
                <div>{booking.car.title}</div>
                {booking.car.registration_number ? (
                  <div style={{ color: "#6c7a74", fontSize: "0.9rem" }}>
                    {booking.car.registration_number}
                  </div>
                ) : null}
              </RowValue>
            </Row>
          ) : null}

          {booking.customer_name ? (
            <Row>
              <RowLabel>Customer</RowLabel>
              <RowValue>
                <div>{booking.customer_name}</div>
                {customerPhoneHref && booking.customer_phone ? (
                  <div>
                    <a href={customerPhoneHref}>{booking.customer_phone}</a>
                  </div>
                ) : null}
              </RowValue>
            </Row>
          ) : null}

          {booking.pickup_location ? (
            <Row>
              <RowLabel>Pickup</RowLabel>
              <RowValue>{booking.pickup_location}</RowValue>
            </Row>
          ) : null}

          {booking.dropoff_location ? (
            <Row>
              <RowLabel>Drop-off</RowLabel>
              <RowValue>{booking.dropoff_location}</RowValue>
            </Row>
          ) : null}

          {booking.trip_description ? (
            <Row>
              <RowLabel>Notes</RowLabel>
              <RowValue>
                <Notes>{booking.trip_description}</Notes>
              </RowValue>
            </Row>
          ) : null}
        </Card>

        <Card>
          <SectionTitle>Schedule</SectionTitle>
          <DayList>
            {booking.days.map((day, idx) => {
              const meta = describeDay(day);
              return (
                <DayItem key={`${day.date}-${idx}`}>
                  <DayHead>
                    {isMultiDay ? <Pill>Day {idx + 1}</Pill> : null}
                    <DayLabel>{formatDate(day.date)}</DayLabel>
                    {meta ? <DayMeta>{meta}</DayMeta> : null}
                  </DayHead>
                  {day.notes ? <Notes>{day.notes}</Notes> : null}
                </DayItem>
              );
            })}
          </DayList>
        </Card>

        <Card>
          <SectionTitle>Your earnings</SectionTitle>
          <EarningsList>
            {booking.days.map((day, idx) => {
              const rate = parseAmount(day.driver_rate);
              return (
                <EarningsRow key={`earn-${idx}`}>
                  <EarningsLabel>
                    {isMultiDay
                      ? `Day ${idx + 1} · ${formatShortDate(day.date)}`
                      : formatDate(day.date)}
                  </EarningsLabel>
                  <EarningsAmount>
                    {rate !== null ? formatZar(rate) : "—"}
                  </EarningsAmount>
                </EarningsRow>
              );
            })}
          </EarningsList>
          <TotalRow>
            <TotalLabel>Total</TotalLabel>
            <TotalAmount>
              {hasAnyRate ? formatZar(totalDriver) : "—"}
            </TotalAmount>
          </TotalRow>
        </Card>

        <BrandFooter>
          <BrandLogo
            src="/images/logo.svg"
            alt={brand.name}
            width={120}
            height={26}
          />
          <span>{brand.name}</span>
        </BrandFooter>
      </Container>
    </Page>
  );
}
