"use client";

import styled, { css } from "styled-components";
import { useMemo } from "react";
import { brand } from "../../lib/brand";
import { trackWhatsAppClick } from "../../lib/tracking";
import SmartImage from "../common/SmartImage";
import type {
  BookingGroup,
  BookingPhoto,
  ProposalAccommodationSegment,
  ProposalBooking,
  ProposalDay,
} from "../../lib/bookings";

// ─── Layout shells ────────────────────────────────────────────────────

const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  padding-bottom: 120px;
  min-height: calc(100vh - 82px);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-bottom: 140px;
  }
`;

const Article = styled.article`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

// ─── Hero ─────────────────────────────────────────────────────────────

const Hero = styled.header`
  position: relative;
  isolation: isolate;
  color: white;
  padding: 56px 20px 48px;
  margin-bottom: 20px;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #0b5b33 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 84px 20px 68px;
  }
`;

const HeroBackdrop = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  opacity: 0.35;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.86) 0%,
    rgba(6, 62, 35, 0.94) 100%
  );
`;

const HeroInner = styled.div`
  max-width: 860px;
  margin: 0 auto;
`;

const HeroTopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
`;

const GroupRef = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.82);
`;

const BrandStrip = styled.div`
  color: #e2f6ea;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

type DisplayStatus = "pending" | "confirmed" | "completed" | "cancelled";

const statusPalette: Record<
  DisplayStatus,
  { bg: string; fg: string; border: string; label: string }
> = {
  pending: {
    bg: "#fff3d6",
    fg: "#8a6411",
    border: "#eecd7a",
    label: "PENDING",
  },
  confirmed: {
    bg: "#ffffff",
    fg: "#0b5b33",
    border: "#bcdfc8",
    label: "CONFIRMED",
  },
  completed: {
    bg: "#eef0f3",
    fg: "#34414c",
    border: "#d4dae0",
    label: "COMPLETED",
  },
  cancelled: {
    bg: "#fbe9e9",
    fg: "#b03b3b",
    border: "#eec3c3",
    label: "CANCELLED",
  },
};

const StatusBadge = styled.span<{ $status: DisplayStatus }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
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

const HeroTitle = styled.h1`
  margin: 0 0 10px;
  color: white;
  font-size: 1.9rem;
  line-height: 1.15;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.6rem;
  }
`;

const HeroSubtitle = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.86);
  font-size: 1rem;
  line-height: 1.6;
`;

const HeroChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 22px;
`;

const HeroChip = styled.div`
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: rgba(255, 255, 255, 0.94);
  font-size: 0.86rem;
  font-weight: 700;
`;

// ─── Sticky summary bar ───────────────────────────────────────────────

const SummaryBar = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  padding: 20px 24px;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: sticky;
    top: 12px;
    z-index: 8;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: 12px;
    z-index: 20;
    padding: 14px 18px;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(6, 62, 35, 0.28);
  }
`;

const SummaryLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SummaryLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SummaryTotal = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: 0.01em;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.35rem;
  }
`;

const SummaryRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1 1 auto;
  justify-content: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 0 0 auto;
  }
`;

const PayButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52px;
  padding: 0 22px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 800;
  font-size: 0.98rem;
  text-decoration: none;
  box-shadow: 0 10px 28px rgba(11, 91, 51, 0.28);

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 46px;
    font-size: 0.92rem;
    padding: 0 16px;
  }
`;

const PaidPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  background: #e6f4ec;
  border: 1px solid #bcdfc8;
  color: #0b5b33;
  font-weight: 800;
  font-size: 0.98rem;
`;

const PendingNote = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  line-height: 1.4;
  max-width: 320px;
  text-align: right;
`;

const CancelledBanner = styled.div`
  background: #fbe9e9;
  border: 1px solid #eec3c3;
  color: #b03b3b;
  border-radius: 18px;
  padding: 20px 22px;
  font-weight: 700;
  line-height: 1.5;
`;

// ─── Section header + itinerary primitives ────────────────────────────

const SectionTitle = styled.h2`
  margin: 8px 0 4px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.4rem;
  line-height: 1.2;
`;

const SectionIntro = styled.p`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ItineraryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DateBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DateHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 10px 14px;
  padding: 6px 2px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const DateHeading = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.15rem;
  line-height: 1.3;
`;

const DayCounter = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 700;
`;

const VehicleCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 220px 1fr;
  }
`;

const VehiclePhoto = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.18) 0%,
    rgba(6, 62, 35, 0.1) 100%
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 100%;
    min-height: 180px;
  }
`;

const VehiclePhotoPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
`;

const VehicleBody = styled.div`
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TailBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  background: #fff3d6;
  border: 1px solid #eecd7a;
  color: #8a6411;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  align-self: flex-start;
`;

const VehicleName = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.15rem;
  line-height: 1.2;
`;

const DriverLine = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;

const TimeLine = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 1rem;
`;

const PickupLine = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.94rem;
  line-height: 1.5;
`;

const Pin = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 6px;
`;

const TripDescription = styled.p`
  margin: 4px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-style: italic;
  font-size: 0.9rem;
  line-height: 1.55;
  white-space: pre-line;
`;

const DayNotes = styled.p`
  margin: 2px 0 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.55;
  white-space: pre-line;
`;

const RefChip = styled.span`
  margin-left: auto;
  padding: 2px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.7rem;
  letter-spacing: 0.04em;
`;

const AccommSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const AccommCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 180px 1fr;
  }
`;

const AccommPhoto = styled.div`
  position: relative;
  height: 160px;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.14), rgba(6, 62, 35, 0.06));

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 100%;
    min-height: 150px;
  }
`;

const AccommBody = styled.div`
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const AccommKind = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const AccommName = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.1rem;
`;

const AccommMeta = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;

const AccommNotes = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  margin-top: 4px;
  white-space: pre-line;
`;

// ─── About + empty state ──────────────────────────────────────────────

const AboutCard = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  padding: 26px 28px 28px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const AboutHeading = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.2rem;
`;

const AboutBody = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  line-height: 1.65;
`;

const AboutRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  align-items: center;
`;

const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 46px;
  padding: 0 20px;
  border-radius: 14px;
  background: #25d366;
  color: white;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 6px 18px rgba(37, 211, 102, 0.36);

  &:hover {
    filter: brightness(1.05);
  }
`;

const ReferenceLine = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 6px;
    padding: 2px 8px;
    color: ${({ theme }) => theme.colors.heading};
  }
`;

const EmptyState = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  padding: 32px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.98rem;
  line-height: 1.6;
`;

// ─── Helpers ──────────────────────────────────────────────────────────

function parseMoney(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function formatCurrency(amount: number, currency: string): string {
  if (currency === "ZAR") return `R${Math.round(amount).toLocaleString()}`;
  return `${currency} ${Math.round(amount).toLocaleString()}`;
}

function pickPhoto(photos: BookingPhoto[] | null | undefined): string | null {
  if (!photos?.length) return null;
  const valid = photos.filter((p) => Boolean(p?.cover_photos));
  if (!valid.length) return null;
  const sorted = [...valid].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (sorted.find((p) => p.is_featured) ?? sorted[0]).cover_photos ?? null;
}

function pickCarPhoto(car: ProposalBooking["car"]): string | null {
  return car ? pickPhoto(car.cover_photos ?? null) : null;
}

function parseIsoDate(iso: string): Date | null {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

function addOneDay(iso: string): string {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  d.setDate(d.getDate() + 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatFullDate(iso: string): string {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(t: string | null | undefined): string | null {
  if (!t) return null;
  const parts = t.split(":");
  if (parts.length < 2) return t;
  return `${parts[0]}:${parts[1]}`;
}

function formatDateRange(startIso: string, endIso: string): string {
  const start = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);
  if (!start || !end) return `${startIso} to ${endIso}`;
  if (start.getTime() === end.getTime()) {
    return start.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  const sameYear = start.getFullYear() === end.getFullYear();
  const startFmt = start.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
  });
  const endFmt = end.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `${startFmt} to ${endFmt}`;
}

function computeGroupRange(group: BookingGroup): { start: string; end: string } | null {
  const dates: string[] = [];
  group.bookings.forEach((b) => {
    b.days.forEach((d) => {
      if (d.date) dates.push(d.date);
      if (d.end_next_day && d.date) dates.push(addOneDay(d.date));
    });
    b.accommodation_segments.forEach((s) => {
      if (s.start_date) dates.push(s.start_date);
      if (s.end_date) dates.push(s.end_date);
    });
  });
  if (!dates.length) return null;
  const sorted = [...dates].sort();
  return { start: sorted[0], end: sorted[sorted.length - 1] };
}

// ─── Itinerary assembly ───────────────────────────────────────────────

type ItineraryEntry = {
  booking: ProposalBooking;
  day: ProposalDay | null;
  isMorningTail: boolean;
  tailEndTime: string | null; // end_time from previous day's shift
};

type ItineraryDate = {
  date: string;
  dayNumber: number;
  totalDays: number;
  entries: ItineraryEntry[];
};

function buildItineraryDates(group: BookingGroup): ItineraryDate[] {
  const byDate = new Map<string, ItineraryEntry[]>();

  group.bookings.forEach((booking) => {
    booking.days.forEach((day) => {
      if (!day.date) return;
      const entries = byDate.get(day.date) ?? [];
      entries.push({ booking, day, isMorningTail: false, tailEndTime: null });
      byDate.set(day.date, entries);

      if (day.end_next_day) {
        const next = addOneDay(day.date);
        const tail = byDate.get(next) ?? [];
        tail.push({
          booking,
          day,
          isMorningTail: true,
          tailEndTime: day.end_time ?? null,
        });
        byDate.set(next, tail);
      }
    });
  });

  const sortedDates = [...byDate.keys()].sort();
  return sortedDates.map((date, index) => {
    const raw = byDate.get(date) ?? [];
    // Morning tails first on each date so they're visible at the top.
    const entries = [
      ...raw.filter((e) => e.isMorningTail),
      ...raw.filter((e) => !e.isMorningTail),
    ];
    return {
      date,
      dayNumber: index + 1,
      totalDays: sortedDates.length,
      entries,
    };
  });
}

function propertyFromSegment(
  segment: ProposalAccommodationSegment
): ProposalAccommodationSegment["villa"] {
  if (segment.kind === "villa") return segment.villa;
  if (segment.kind === "hotel") return segment.hotel;
  return segment.villa ?? segment.hotel ?? null;
}

type GroupedAccommSegment = ProposalAccommodationSegment & {
  booking_reference: string;
};

function collectAccommodation(group: BookingGroup): GroupedAccommSegment[] {
  const list: GroupedAccommSegment[] = [];
  group.bookings.forEach((b) => {
    b.accommodation_segments.forEach((s) => {
      list.push({ ...s, booking_reference: b.booking_reference });
    });
  });
  // Sort by start date ascending, then by name for stability.
  return list.sort((a, b) => {
    if (a.start_date !== b.start_date) return a.start_date.localeCompare(b.start_date);
    const nameA = propertyFromSegment(a)?.name ?? "";
    const nameB = propertyFromSegment(b)?.name ?? "";
    return nameA.localeCompare(nameB);
  });
}

// ─── Entry card ───────────────────────────────────────────────────────

function describeTimeWindow(day: ProposalDay): string | null {
  const start = formatTime(day.start_time);
  const end = formatTime(day.end_time);
  if (!start && !end) return null;
  const base =
    start && end ? `${start} – ${end}` : start ? `from ${start}` : `until ${end}`;
  return day.end_next_day ? `${base} (next morning)` : base;
}

function ItineraryVehicleCard({ entry }: { entry: ItineraryEntry }) {
  const car = entry.booking.car;
  const photo = pickCarPhoto(car);
  const hasVehicle = Boolean(car);
  const tailLabel = entry.isMorningTail && entry.tailEndTime
    ? `Continues from previous evening until ${formatTime(entry.tailEndTime)}`
    : entry.isMorningTail
    ? "Continues from previous evening"
    : null;

  return (
    <VehicleCard>
      <VehiclePhoto>
        {hasVehicle && photo ? (
          <SmartImage
            src={photo}
            alt={car?.title ?? "Vehicle"}
            sizes="(max-width: 640px) 100vw, 220px"
          />
        ) : hasVehicle ? (
          <VehiclePhotoPlaceholder>
            {(car?.title || "?").trim().charAt(0).toUpperCase()}
          </VehiclePhotoPlaceholder>
        ) : (
          <VehiclePhotoPlaceholder>🏨</VehiclePhotoPlaceholder>
        )}
      </VehiclePhoto>

      <VehicleBody>
        {tailLabel ? <TailBadge>{tailLabel}</TailBadge> : null}

        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <VehicleName>
            {hasVehicle ? car?.title : "Accommodation only"}
          </VehicleName>
          <RefChip>Booking {entry.booking.booking_reference}</RefChip>
        </div>

        {hasVehicle ? (
          <DriverLine>
            {entry.booking.driver
              ? `Driver: ${entry.booking.driver.full_name}`
              : "Driver assigned separately"}
          </DriverLine>
        ) : null}

        {entry.day && !entry.isMorningTail ? (
          <TimeLine>{describeTimeWindow(entry.day) ?? "Timing to be confirmed"}</TimeLine>
        ) : null}

        {hasVehicle && (entry.booking.pickup_location || entry.booking.dropoff_location) ? (
          <PickupLine>
            <Pin>📍</Pin>
            {entry.booking.pickup_location || "Pickup to be confirmed"}
            <span style={{ margin: "0 8px", color: "#9aa5a0" }}>→</span>
            <Pin>📍</Pin>
            {entry.booking.dropoff_location || "Drop-off to be confirmed"}
          </PickupLine>
        ) : null}

        {entry.booking.trip_description ? (
          <TripDescription>{entry.booking.trip_description}</TripDescription>
        ) : null}

        {entry.day?.notes && !entry.isMorningTail ? (
          <DayNotes>{entry.day.notes}</DayNotes>
        ) : null}
      </VehicleBody>
    </VehicleCard>
  );
}

// ─── Root view ────────────────────────────────────────────────────────

type Props = {
  group: BookingGroup;
};

export default function ProposalDetailView({ group }: Props) {
  const totalAmount = parseMoney(group.total_client_amount);
  const totalFormatted = totalAmount !== null
    ? formatCurrency(totalAmount, group.currency)
    : "";
  const status: DisplayStatus = group.status;
  const isCancelled = status === "cancelled";
  const isPaid = group.is_paid === true;

  const heroPhoto = useMemo(() => {
    for (const b of group.bookings) {
      const p = pickCarPhoto(b.car);
      if (p) return p;
    }
    return null;
  }, [group]);

  const range = useMemo(() => computeGroupRange(group), [group]);
  const itineraryDates = useMemo(() => buildItineraryDates(group), [group]);
  const accommSegments = useMemo(() => collectAccommodation(group), [group]);

  const title = group.title || `Trip for ${group.customer_name}`;

  const whatsappHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    `Hi, about my booking ${group.group_reference}. `
  )}`;

  return (
    <Wrapper>
      <Hero>
        {heroPhoto ? (
          <>
            <HeroBackdrop>
              <SmartImage
                src={heroPhoto}
                alt={title}
                sizes="100vw"
                priority
              />
            </HeroBackdrop>
            <HeroOverlay />
          </>
        ) : null}

        <HeroInner>
          <HeroTopRow>
            <GroupRef>{group.group_reference}</GroupRef>
            <StatusBadge $status={status}>
              {statusPalette[status].label}
            </StatusBadge>
          </HeroTopRow>

          <BrandStrip>Your {brand.name} booking confirmation</BrandStrip>

          <HeroTitle>{title}</HeroTitle>
          <HeroSubtitle>Prepared for {group.customer_name}</HeroSubtitle>

          <HeroChipRow>
            {range ? (
              <HeroChip>🗓 {formatDateRange(range.start, range.end)}</HeroChip>
            ) : null}
          </HeroChipRow>
        </HeroInner>
      </Hero>

      <Article>
        {isCancelled ? (
          <CancelledBanner>
            This booking has been cancelled. Please contact us if you&apos;d
            like help re-planning.
          </CancelledBanner>
        ) : (
          <SummaryBar>
            <SummaryLeft>
              <SummaryLabel>Total</SummaryLabel>
              <SummaryTotal>{totalFormatted || "—"}</SummaryTotal>
            </SummaryLeft>
            <SummaryRight>
              {isPaid ? (
                <PaidPill>✓ Paid</PaidPill>
              ) : status === "confirmed" && group.payment_link ? (
                <PayButton
                  href={group.payment_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pay securely {totalFormatted ? `— ${totalFormatted}` : ""}
                </PayButton>
              ) : (
                <PendingNote>Awaiting confirmation from {brand.name}</PendingNote>
              )}
            </SummaryRight>
          </SummaryBar>
        )}

        {itineraryDates.length === 0 ? (
          <EmptyState>Itinerary being finalized. Refresh in a moment.</EmptyState>
        ) : (
          <>
            <div>
              <SectionTitle>Your day-by-day itinerary</SectionTitle>
              <SectionIntro>
                Every day of the trip, in order. Where more than one vehicle
                operates on a date, each is listed below that day&apos;s
                heading.
              </SectionIntro>
            </div>

            <ItineraryList>
              {itineraryDates.map((d) => (
                <DateBlock key={d.date}>
                  <DateHeader>
                    <DateHeading>{formatFullDate(d.date)}</DateHeading>
                    <DayCounter>
                      Day {d.dayNumber} of {d.totalDays}
                    </DayCounter>
                  </DateHeader>
                  {d.entries.map((entry, i) => (
                    <ItineraryVehicleCard
                      key={`${d.date}-${entry.booking.booking_reference}-${entry.isMorningTail ? "tail" : "main"}-${i}`}
                      entry={entry}
                    />
                  ))}
                </DateBlock>
              ))}
            </ItineraryList>
          </>
        )}

        {accommSegments.length > 0 ? (
          <>
            <div>
              <SectionTitle>Accommodation</SectionTitle>
              <SectionIntro>
                Where you&apos;re staying across the trip.
              </SectionIntro>
            </div>
            <AccommSection>
              {accommSegments.map((segment, index) => {
                const property = propertyFromSegment(segment);
                const thumb = property ? pickPhoto(property.cover_photos ?? null) : null;
                const kindLabel = segment.kind === "hotel" ? "Hotel" : "Villa";
                return (
                  <AccommCard key={`${segment.booking_reference}-accom-${index}`}>
                    <AccommPhoto>
                      {thumb ? (
                        <SmartImage
                          src={thumb}
                          alt={property?.name ?? "Accommodation"}
                          sizes="(max-width: 640px) 100vw, 180px"
                        />
                      ) : null}
                    </AccommPhoto>
                    <AccommBody>
                      <AccommKind>{kindLabel}</AccommKind>
                      <AccommName>
                        {property?.name ?? kindLabel}
                      </AccommName>
                      <AccommMeta>
                        {[property?.location, formatDateRange(segment.start_date, segment.end_date)]
                          .filter(Boolean)
                          .join(" · ")}
                      </AccommMeta>
                      {segment.notes ? (
                        <AccommNotes>{segment.notes}</AccommNotes>
                      ) : null}
                    </AccommBody>
                  </AccommCard>
                );
              })}
            </AccommSection>
          </>
        ) : null}

        <AboutCard>
          <AboutHeading>Need to change something?</AboutHeading>
          <AboutBody>
            Message us on WhatsApp with your reference and we&apos;ll pick it
            up from there. Same driver, same vehicle, same team looking after
            you from arrival to departure.
          </AboutBody>
          <AboutRow>
            <WhatsAppButton
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "booking_confirmation_about",
                  label: "Message us about booking",
                  tour: group.group_reference,
                })
              }
            >
              💬 Message us on WhatsApp
            </WhatsAppButton>
            <ReferenceLine>
              Quote reference: <code>{group.group_reference}</code>
            </ReferenceLine>
          </AboutRow>
        </AboutCard>
      </Article>
    </Wrapper>
  );
}
