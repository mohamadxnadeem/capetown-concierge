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
} from "../../lib/bookings";

// ─── Layout shells ────────────────────────────────────────────────────

const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  padding-bottom: 56px;
  min-height: calc(100vh - 82px);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-bottom: 48px;
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
  padding: 48px 20px 72px;
  margin-bottom: 0;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    #0b5b33 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 72px 20px 88px;
  }
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
    label: "BOOKING DETAILS",
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
    label: "CONFIRMED",
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

const VehicleName = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.15rem;
  line-height: 1.2;
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
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.55;
  white-space: pre-line;
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

const VCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const VPhoto = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.18) 0%,
    rgba(6, 62, 35, 0.1) 100%
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    aspect-ratio: 21 / 9;
  }
`;

const VBody = styled.div`
  padding: 18px 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 22px 26px 26px;
  }
`;

const VHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const PlateLine = styled.div`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.82rem;
  letter-spacing: 0.04em;
`;

const RouteBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0.94rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.text};
`;

const RouteRow = styled.div`
  display: flex;
  gap: 12px;
`;

const RouteLabel = styled.span`
  flex: none;
  width: 68px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-top: 2px;
`;

const DayList = styled.div`
  display: flex;
  flex-direction: column;
`;

const DayBlock = styled.div`
  padding: 16px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const DayDate = styled.h4`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.05rem;
  line-height: 1.3;
`;

const DayTimes = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 0.98rem;
`;

const BarWrap = styled.div`
  margin-top: 12px;
`;


// ─── Helpers ──────────────────────────────────────────────────────────

function orderedPhotos(photos: BookingPhoto[] | null | undefined): string[] {
  if (!photos?.length) return [];
  const valid = photos.filter((p) => Boolean(p?.cover_photos));
  const sorted = [...valid].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const featured = sorted.filter((p) => p.is_featured);
  const rest = sorted.filter((p) => !p.is_featured);
  return [...featured, ...rest].map((p) => p.cover_photos as string);
}

// Gives each card a photo that has not been shown yet on the page. Falls back
// to the first photo when every photo of that item is already used.
function takeUnusedPhoto(
  photos: BookingPhoto[] | null | undefined,
  used: Set<string>
): string | null {
  const list = orderedPhotos(photos);
  if (!list.length) return null;
  const pick = list.find((u) => !used.has(u)) ?? list[0];
  used.add(pick);
  return pick;
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

function formatShortDate(iso: string): string {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  return d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }).replace(",", "");
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


// ─── Vehicles and time bars ───────────────────────────────────────────
// One card per vehicle (grouped by car.id). Each date the vehicle works gets
// a 00:00 to 24:00 time bar, like the app's DayScheduleBar. Two or more rows
// on the same date are split shifts, drawn in different colours.

const SHIFT_COLORS = ["#0b5b33", "#b8923a", "#2f6f9f", "#8a4f7d"];

type BarShift = {
  start: string | null;
  end: string | null;
  endNextDay: boolean;
  driverName: string | null;
  color: string;
};

type VehicleDate = { date: string; shifts: BarShift[]; notes: string[] };

type VehicleGroup = {
  key: string;
  car: NonNullable<ProposalBooking["car"]>;
  plate: string | null;
  bookings: ProposalBooking[];
  dates: VehicleDate[];
};

function toHours(t: string | null | undefined): number | null {
  if (!t) return null;
  const m = /^(\d{1,2}):(\d{2})/.exec(t.trim());
  return m ? parseInt(m[1], 10) + parseInt(m[2], 10) / 60 : null;
}

function buildVehicleGroups(group: BookingGroup): VehicleGroup[] {
  const map = new Map<string, VehicleGroup>();
  group.bookings.forEach((b) => {
    if (!b.car) return;
    const key = b.car.id != null ? `car-${b.car.id}` : `ref-${b.booking_reference}`;
    let vg = map.get(key);
    if (!vg) {
      vg = { key, car: b.car, plate: null, bookings: [], dates: [] };
      map.set(key, vg);
    }
    vg.bookings.push(b);
    if (!vg.plate && b.vehicle_plate) vg.plate = b.vehicle_plate;
  });
  map.forEach((vg) => {
    const byDate = new Map<string, Omit<BarShift, "color">[]>();
    const notesByDate = new Map<string, string[]>();
    vg.bookings.forEach((b) => {
      b.days.forEach((d) => {
        if (!d.date) return;
        const list = byDate.get(d.date) ?? [];
        list.push({
          start: d.start_time,
          end: d.end_time,
          endNextDay: Boolean(d.end_next_day),
          driverName: d.driver_name ?? b.driver?.full_name ?? null,
        });
        byDate.set(d.date, list);
        if (d.notes?.trim()) {
          const n = notesByDate.get(d.date) ?? [];
          if (!n.includes(d.notes.trim())) n.push(d.notes.trim());
          notesByDate.set(d.date, n);
        }
      });
    });
    vg.dates = [...byDate.keys()].sort().map((date) => ({
      date,
      notes: notesByDate.get(date) ?? [],
      shifts: (byDate.get(date) ?? [])
        .sort((a, c) => (a.start ?? "99").localeCompare(c.start ?? "99"))
        .map((s, i) => ({ ...s, color: SHIFT_COLORS[i % SHIFT_COLORS.length] })),
    }));
  });
  return [...map.values()];
}

function shiftTimes(s: BarShift): string {
  const start = formatTime(s.start);
  const end = formatTime(s.end);
  const next = s.endNextDay ? " next day" : "";
  if (start && end) return `${start} to ${end}${next}`;
  if (start) return `from ${start}`;
  if (end) return `until ${end}${next}`;
  return "Times to be confirmed";
}

const BarTrack = styled.div`
  position: relative;
  height: 14px;
  border-radius: 7px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const BarBlock = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  min-width: 4px;
`;

const BarAxis = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.68rem;
`;

const ShiftRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 4px;
  font-size: 0.9rem;
`;

const ShiftDot = styled.span`
  flex: none;
  width: 10px;
  height: 10px;
  margin-top: 5px;
  border-radius: 50%;
`;

const ShiftSub = styled.div`
  margin-top: 1px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.82rem;
`;

function DayBar({ shifts }: { shifts: BarShift[] }) {
  return (
    <div role="img" aria-label="Time bar from 00:00 to 24:00">
      <BarTrack>
        {shifts.map((s, i) => {
          const a = toHours(s.start);
          const e = toHours(s.end);
          if (a == null) return null;
          const overnight = s.endNextDay && e != null && e < a;
          const to = overnight ? 24 : e != null && e > a ? e : a;
          const left = (a / 24) * 100;
          const width = Math.max(((to - a) / 24) * 100, 0.8);
          return (
            <BarBlock
              key={i}
              style={{
                left: `${left}%`,
                width: `${Math.min(width, 100 - left)}%`,
                background: s.color,
                opacity: s.end == null ? 0.6 : 1,
                borderRadius: overnight ? "3px 0 0 3px" : 3,
              }}
            />
          );
        })}
      </BarTrack>
      <BarAxis>
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>24:00</span>
      </BarAxis>
    </div>
  );
}

function uniqueText(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  values.forEach((v) => {
    const t = v?.trim();
    if (t && !seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  });
  return out;
}

function VehicleScheduleCard({
  vg,
  priority,
  photo,
}: {
  vg: VehicleGroup;
  photo: string | null;
  priority: boolean;
}) {
  const pickups = uniqueText(vg.bookings.map((b) => b.pickup_location));
  const dropoffs = uniqueText(vg.bookings.map((b) => b.dropoff_location));
  const descriptions = uniqueText(vg.bookings.map((b) => b.trip_description));
  const hasRoute = pickups.length > 0 || dropoffs.length > 0;

  return (
    <VCard>
      <VPhoto>
        {photo ? (
          <SmartImage
            src={photo}
            alt={vg.car.title}
            sizes="(max-width: 940px) 100vw, 900px"
            priority={priority}
          />
        ) : (
          <VehiclePhotoPlaceholder aria-hidden="true">
            {(vg.car.title || "?").trim().charAt(0).toUpperCase()}
          </VehiclePhotoPlaceholder>
        )}
      </VPhoto>

      <VBody>
        <VHead>
          <div>
            <VehicleName>{vg.car.title}</VehicleName>
            {vg.plate ? <PlateLine>Number plate {vg.plate}</PlateLine> : null}
          </div>
        </VHead>

        {hasRoute ? (
          <RouteBlock>
            {pickups.length > 0 ? (
              <RouteRow>
                <RouteLabel>Pickup</RouteLabel>
                <span>{pickups.join(", ")}</span>
              </RouteRow>
            ) : null}
            {dropoffs.length > 0 ? (
              <RouteRow>
                <RouteLabel>Drop-off</RouteLabel>
                <span>{dropoffs.join(", ")}</span>
              </RouteRow>
            ) : null}
          </RouteBlock>
        ) : null}

        {descriptions.map((t) => (
          <TripDescription key={t}>{t}</TripDescription>
        ))}

        {vg.dates.length > 0 ? (
          <DayList>
            {vg.dates.map(({ date, shifts, notes }) => (
              <DayBlock key={date}>
                <DayDate>{formatShortDate(date)}</DayDate>
                {shifts.map((s, i) => (
                  <ShiftRow key={i}>
                    {shifts.length > 1 ? <ShiftDot style={{ background: s.color }} /> : null}
                    <div>
                      <DayTimes>{shiftTimes(s)}</DayTimes>
                      {s.driverName ? <ShiftSub>Driver {s.driverName}</ShiftSub> : null}
                    </div>
                  </ShiftRow>
                ))}
                <BarWrap>
                  <DayBar shifts={shifts} />
                </BarWrap>
                {notes.map((n) => (
                  <DayNotes key={n}>{n}</DayNotes>
                ))}
              </DayBlock>
            ))}
          </DayList>
        ) : (
          <ShiftSub>Dates to be confirmed</ShiftSub>
        )}
      </VBody>
    </VCard>
  );
}

// ─── Root view ────────────────────────────────────────────────────────

type Props = {
  group: BookingGroup;
};

export default function ProposalDetailView({ group }: Props) {
  const status: DisplayStatus = group.status;
  const isCancelled = status === "cancelled";

  const range = useMemo(() => computeGroupRange(group), [group]);
  const accommSegments = useMemo(() => collectAccommodation(group), [group]);
  const vehicleGroups = useMemo(() => buildVehicleGroups(group), [group]);
  // One distinct photo per vehicle card, then per accommodation card.
  const { vehiclePhotos, accommPhotos } = useMemo(() => {
    const used = new Set<string>();
    const vehiclePhotos = vehicleGroups.map((vg) =>
      takeUnusedPhoto(vg.car.cover_photos, used)
    );
    const accommPhotos = accommSegments.map((seg) =>
      takeUnusedPhoto(propertyFromSegment(seg)?.cover_photos, used)
    );
    return { vehiclePhotos, accommPhotos };
  }, [vehicleGroups, accommSegments]);

  const title = group.title || `Trip for ${group.customer_name}`;

  const whatsappHref = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    `Hi, about my booking ${group.group_reference}. `
  )}`;

  return (
    <Wrapper>
      <Hero>
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

          {range ? (
            <HeroChipRow>
              <HeroChip>{formatDateRange(range.start, range.end)}</HeroChip>
            </HeroChipRow>
          ) : null}
        </HeroInner>
      </Hero>

      <Article>
        {isCancelled ? (
          <CancelledBanner>
            This booking has been cancelled. Please contact us if you&apos;d
            like help re-planning.
          </CancelledBanner>
        ) : null}

        {vehicleGroups.length > 0 ? (
          <>
            <div>
              <SectionTitle>
                {vehicleGroups.length > 1 ? "Your vehicles" : "Your vehicle"}
              </SectionTitle>
              <SectionIntro>
                Dates and times for each vehicle. Where a day is split between
                drivers, each part has its own colour.
              </SectionIntro>
            </div>
            {vehicleGroups.map((vg, i) => (
              <VehicleScheduleCard
                key={vg.key}
                vg={vg}
                photo={vehiclePhotos[i]}
                priority={i === 0}
              />
            ))}
          </>
        ) : (
          <EmptyState>Itinerary being finalized. Refresh in a moment.</EmptyState>
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
                const thumb = accommPhotos[index];
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