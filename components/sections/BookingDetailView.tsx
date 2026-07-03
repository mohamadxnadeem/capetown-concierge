"use client";

import Link from "next/link";
import styled, { css } from "styled-components";
import { brand } from "../../lib/brand";
import { trackWhatsAppClick } from "../../lib/tracking";
import type {
  AccommodationSegment,
  Booking,
  BookingDay,
  BookingDriver,
  BookingExperience,
  BookingHotel,
  BookingPackage,
  BookingPhoto,
  BookingStatus,
  BookingVilla,
  UpsellTour,
} from "../../lib/bookings";
import Money from "../common/Money";
import BookingPayNow from "./BookingPayNow";
import BookingUpsell from "./BookingUpsell";
import type { UpsellVehicle } from "../../lib/vehicles";
import type { CarPhoto } from "./chauffeur-services/types";
import ChauffeurGallery from "./chauffeur-services/ChauffeurGallery";
import SmartImage from "../common/SmartImage";

const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  padding: 40px 20px 80px;
  min-height: calc(100vh - 82px);
`;

const Article = styled.article`
  max-width: 820px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const HeaderCard = styled.header`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  padding: 28px 32px;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 22px;
    border-radius: 18px;
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
  font-size: 1.85rem;
  line-height: 1.15;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  letter-spacing: 0.02em;
  word-break: break-all;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.4rem;
  }
`;

const Subtitle = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.6;
`;

type DisplayStatus = "confirmed" | "completed" | "cancelled";

const statusPalette: Record<DisplayStatus, { bg: string; fg: string; border: string }> = {
  confirmed: { bg: "#e6f4ec", fg: "#0b5b33", border: "#bcdfc8" },
  completed: { bg: "#eef0f3", fg: "#34414c", border: "#d4dae0" },
  cancelled: { bg: "#fbe9e9", fg: "#9a1f1f", border: "#eec3c3" },
};

const StatusBadge = styled.span<{ $status: DisplayStatus }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.05em;
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

const Card = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  padding: 28px 32px;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 22px;
    border-radius: 18px;
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

const TertiaryAction = styled.a`
  ${ButtonBase}
  background: white;
  color: ${({ theme }) => theme.colors.heading};
  border-color: ${({ theme }) => theme.colors.border};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const UpsellSection = styled.section`
  margin-top: 28px;
`;

const UpsellHeader = styled.div`
  margin-bottom: 18px;
`;

const UpsellEyebrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const UpsellTitle = styled.h2`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.6rem;
  line-height: 1.2;
`;

const UpsellSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const UpsellGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const UpsellCard = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.card};
    border-color: rgba(11, 91, 51, 0.22);
  }
`;

const UpsellImageWrap = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.18), rgba(6, 62, 35, 0.1));
`;

const UpsellBody = styled.div`
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const UpsellName = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.1rem;
  line-height: 1.25;
`;

const UpsellText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  line-height: 1.6;
  flex: 1;
`;

const UpsellCta = styled.span`
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 0.9rem;
`;

const STATUS_LABELS: Record<DisplayStatus, string> = {
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

function toDisplayStatus(status: BookingStatus): DisplayStatus {
  return status === "pending" ? "confirmed" : status;
}

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

// ─── Bundle cards (villa / experience / package) ─────────────────────

const BundleGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const BundleCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.soft};
    border-color: rgba(11, 91, 51, 0.22);
  }
`;

const BundleImage = styled.div`
  position: relative;
  height: 180px;
  background: ${({ theme }) => theme.colors.background};
`;

const BundleBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px 16px;
  flex: 1;
`;

const BundleBadge = styled.span`
  align-self: flex-start;
  padding: 3px 9px;
  border-radius: 999px;
  background: ${({ theme }) => `${theme.colors.primary}14`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const BundleTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.05rem;
  line-height: 1.25;
`;

const BundleMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.88rem;
`;

const BundleText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  line-height: 1.55;
`;

function pickPhoto(
  photos: BookingPhoto[] | undefined | null
): string | null {
  if (!photos?.length) return null;
  const valid = photos.filter((p) => Boolean(p?.cover_photos));
  if (!valid.length) return null;
  const sorted = [...valid].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (sorted.find((p) => p.is_featured) ?? sorted[0]).cover_photos ?? null;
}

function parseMoney(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function ExperienceBundleCard({ experience }: { experience: BookingExperience }) {
  const photo = pickPhoto(experience.cover_photos);
  const rate = parseMoney(experience.price_from);
  const description = experience.short_description ?? experience.highlight ?? null;
  const href = experience.slug ? `/tours/${experience.slug}` : "/tours";
  return (
    <BundleCard href={href}>
      <BundleImage>
        {photo ? (
          <SmartImage
            src={photo}
            alt={`${experience.title} — private tour`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : null}
      </BundleImage>
      <BundleBody>
        <BundleBadge>Private tour</BundleBadge>
        <BundleTitle>{experience.title}</BundleTitle>
        <BundleMeta>
          {experience.duration ? <span>{experience.duration}</span> : null}
          {rate ? (
            <span>
              from <Money usd={rate} prefix="" suffix="" />
            </span>
          ) : null}
        </BundleMeta>
        {description ? <BundleText>{description}</BundleText> : null}
      </BundleBody>
    </BundleCard>
  );
}

function PackageBundleCard({ pkg }: { pkg: BookingPackage }) {
  const photo = pickPhoto(pkg.cover_photos);
  const rate = parseMoney(pkg.price_from);
  const tagline = pkg.tagline ?? pkg.short_description ?? null;
  return (
    <BundleCard href={`/packages/${pkg.slug}`}>
      <BundleImage>
        {photo ? (
          <SmartImage
            src={photo}
            alt={`${pkg.name} — travel package`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : null}
      </BundleImage>
      <BundleBody>
        <BundleBadge>Package</BundleBadge>
        <BundleTitle>{pkg.name}</BundleTitle>
        <BundleMeta>
          {pkg.duration_nights ? (
            <span>
              {pkg.duration_nights} night{pkg.duration_nights === 1 ? "" : "s"}
            </span>
          ) : null}
          {pkg.max_guests ? <span>up to {pkg.max_guests} guests</span> : null}
          {rate ? (
            <span>
              from <Money usd={rate} prefix="" suffix="" />
            </span>
          ) : null}
        </BundleMeta>
        {tagline ? <BundleText>{tagline}</BundleText> : null}
      </BundleBody>
    </BundleCard>
  );
}

// ─── Accommodation itinerary ─────────────────────────────────────────

const ItineraryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ItineraryCard = styled.article`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const ItineraryHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  font-size: 0.86rem;
  color: ${({ theme }) => theme.colors.text};
`;

const KindPill = styled.span<{ $kind: "villa" | "hotel" }>`
  padding: 3px 10px;
  border-radius: 999px;
  background: ${({ theme, $kind }) =>
    $kind === "villa" ? `${theme.colors.primary}14` : "#f2e6d0"};
  color: ${({ theme, $kind }) =>
    $kind === "villa" ? theme.colors.primary : "#6b4a10"};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const DateRange = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.heading};
`;

const NightsBadge = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

const HeroPhoto = styled.div`
  position: relative;
  height: 220px;
  background: ${({ theme }) => theme.colors.background};

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 280px;
  }
`;

const ItineraryBody = styled.div`
  padding: 16px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PropertyName = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.15rem;
  line-height: 1.25;
`;

const PropertyMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;

const Stars = styled.span`
  color: #c99a2b;
  letter-spacing: 0.05em;
`;

const RateLine = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 0.98rem;
`;

const GalleryStrip = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 120px;
  gap: 8px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 4px;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Thumb = styled.div`
  position: relative;
  height: 82px;
  border-radius: 10px;
  overflow: hidden;
  scroll-snap-align: start;
  background: ${({ theme }) => theme.colors.background};
`;

const ItineraryNotes = styled.p`
  margin: 0;
  padding: 10px 12px;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.92rem;
  line-height: 1.6;
  font-style: italic;
`;

const DeepLink = styled(Link)`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

function parseIsoDate(iso: string): Date | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map((n) => Number(n));
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function formatItineraryRange(startIso: string, endIso: string): string {
  const s = parseIsoDate(startIso);
  const e = parseIsoDate(endIso);
  if (!s || !e) return `${startIso} → ${endIso}`;
  const sameYear = s.getFullYear() === e.getFullYear();
  const startFmt = new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
  }).format(s);
  const endFmt = new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(e);
  return `${startFmt} → ${endFmt}`;
}

function nightsBetween(startIso: string, endIso: string): number | null {
  const s = parseIsoDate(startIso);
  const e = parseIsoDate(endIso);
  if (!s || !e) return null;
  const ms = e.getTime() - s.getTime();
  const n = Math.round(ms / (1000 * 60 * 60 * 24));
  return n > 0 ? n : null;
}

interface SegmentEntry {
  segment: AccommodationSegment;
  start: string;
  end: string;
  notes: string[];
}

function mergeConsecutiveSegments(
  segments: AccommodationSegment[]
): SegmentEntry[] {
  const sorted = [...segments].sort((a, b) => a.order - b.order);
  const out: SegmentEntry[] = [];
  for (const seg of sorted) {
    const propId =
      seg.kind === "villa" ? seg.villa?.id ?? null : seg.hotel?.id ?? null;
    const last = out[out.length - 1];
    const lastPropId =
      last?.segment.kind === "villa"
        ? last.segment.villa?.id ?? null
        : last?.segment.hotel?.id ?? null;
    if (
      last &&
      last.segment.kind === seg.kind &&
      propId !== null &&
      lastPropId === propId
    ) {
      last.end = seg.end_date;
      if (seg.notes) last.notes.push(seg.notes);
    } else {
      out.push({
        segment: seg,
        start: seg.start_date,
        end: seg.end_date,
        notes: seg.notes ? [seg.notes] : [],
      });
    }
  }
  return out;
}

function bookingDateRange(booking: Booking): { start: string; end: string } | null {
  if (!booking.days.length) return null;
  const sorted = [...booking.days].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  return { start: sorted[0].date, end: sorted[sorted.length - 1].date };
}

function pickThumbs(
  photos: BookingPhoto[] | undefined | null
): { key: string; url: string }[] {
  if (!photos?.length) return [];
  const valid = photos.filter((p) => Boolean(p?.cover_photos));
  const sorted = [...valid].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return sorted.slice(0, 6).map((p, i) => ({
    key: `${p.cover_photos}-${i}`,
    url: p.cover_photos as string,
  }));
}

function starDisplay(stars: number | null | undefined): string | null {
  if (!stars || stars <= 0) return null;
  const rounded = Math.min(5, Math.max(1, Math.round(stars)));
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

function ItinerarySegmentCard({ entry }: { entry: SegmentEntry }) {
  const { segment, start, end, notes } = entry;
  const property: BookingVilla | BookingHotel | null =
    segment.kind === "villa" ? segment.villa : segment.hotel;
  if (!property) return null;

  const photo = pickPhoto(property.cover_photos);
  const thumbs = pickThumbs(property.cover_photos);
  const nights = nightsBetween(start, end);
  const dateLabel = formatItineraryRange(start, end);
  const kindLabel = segment.kind === "villa" ? "Villa" : "Hotel";
  const location =
    (property as BookingVilla).location ??
    (property as BookingVilla).area ??
    (property as BookingHotel).location ??
    null;
  const hotel = segment.kind === "hotel" ? (property as BookingHotel) : null;
  const villa = segment.kind === "villa" ? (property as BookingVilla) : null;
  const stars = starDisplay(hotel?.star_rating);
  const rate = parseMoney(
    villa?.price_per_night ?? hotel?.price_per_night_from ?? null
  );
  const rateLabel = rate
    ? villa
      ? `R${Math.round(rate).toLocaleString()} / night`
      : `from R${Math.round(rate).toLocaleString()} / night`
    : null;
  const href =
    segment.kind === "villa"
      ? `/villas/${property.slug}`
      : `/hotels/${property.slug}`;

  return (
    <ItineraryCard>
      <ItineraryHeader>
        <KindPill $kind={segment.kind}>{kindLabel}</KindPill>
        <DateRange>{dateLabel}</DateRange>
        {nights ? (
          <NightsBadge>· {nights} night{nights === 1 ? "" : "s"}</NightsBadge>
        ) : null}
      </ItineraryHeader>

      <HeroPhoto>
        {photo ? (
          <SmartImage
            src={photo}
            alt={`${property.name} — ${kindLabel.toLowerCase()}`}
            sizes="(max-width: 768px) 100vw, 720px"
          />
        ) : null}
      </HeroPhoto>

      <ItineraryBody>
        <PropertyName>{property.name}</PropertyName>
        <PropertyMeta>
          {location ? <span>{location}</span> : null}
          {stars ? <Stars aria-label={`${hotel?.star_rating} star hotel`}>{stars}</Stars> : null}
        </PropertyMeta>
        {rateLabel ? <RateLine>{rateLabel}</RateLine> : null}

        {thumbs.length > 1 ? (
          <GalleryStrip>
            {thumbs.map((t) => (
              <Thumb key={t.key}>
                <SmartImage
                  src={t.url}
                  alt=""
                  sizes="120px"
                />
              </Thumb>
            ))}
          </GalleryStrip>
        ) : null}

        {notes.map((n, i) => (
          <ItineraryNotes key={i}>{n}</ItineraryNotes>
        ))}

        <DeepLink href={href}>
          View {segment.kind === "villa" ? "villa" : "hotel"} details →
        </DeepLink>
      </ItineraryBody>
    </ItineraryCard>
  );
}

function buildItineraryEntries(booking: Booking): SegmentEntry[] {
  const segments = booking.accommodation_segments ?? [];
  if (segments.length > 0) return mergeConsecutiveSegments(segments);

  // Legacy fallback: single villa spanning the whole booking
  if (booking.villa) {
    const range = bookingDateRange(booking);
    if (!range) return [];
    return [
      {
        segment: {
          id: -1,
          start_date: range.start,
          end_date: range.end,
          kind: "villa",
          villa: booking.villa,
          hotel: null,
          notes: null,
          order: 0,
        },
        start: range.start,
        end: range.end,
        notes: [],
      },
    ];
  }

  return [];
}

interface Props {
  booking: Booking;
  carPhotos: CarPhoto[];
  upsellTours: UpsellTour[];
  hasVehicle: boolean;
  hasAccommodation: boolean;
  featuredVehicles: UpsellVehicle[];
}

export default function BookingDetailView({
  booking,
  carPhotos,
  upsellTours,
  hasVehicle,
  hasAccommodation,
  featuredVehicles,
}: Props) {
  const driver: BookingDriver | null = booking.driver ?? booking.car?.driver ?? null;
  const displayStatus = toDisplayStatus(booking.status);
  const supportMailto = `mailto:${brand.contactEmail}?subject=${encodeURIComponent(
    `Booking ${booking.booking_reference}`
  )}`;
  const supportWhatsApp = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    `Hi, I have a question about booking ${booking.booking_reference}.`
  )}`;

  return (
    <Wrapper>
      <Article>
        <HeaderCard>
          <Eyebrow>{brand.name} · Booking</Eyebrow>
          <HeadingRow>
            <Heading>{booking.booking_reference}</Heading>
            <StatusBadge $status={displayStatus}>
              {STATUS_LABELS[displayStatus]}
            </StatusBadge>
          </HeadingRow>
          {booking.title ? <Subtitle>{booking.title}</Subtitle> : null}
        </HeaderCard>

        {carPhotos.length > 0 ? (
          <Card>
            <ChauffeurGallery images={carPhotos} />
          </Card>
        ) : null}

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

        <BookingPayNow booking={booking} />

        {(() => {
          const itinerary = buildItineraryEntries(booking);
          if (itinerary.length === 0) return null;
          return (
            <Card>
              <SectionTitle>Your accommodation itinerary</SectionTitle>
              <ItineraryList>
                {itinerary.map((entry) => (
                  <ItinerarySegmentCard key={entry.segment.id} entry={entry} />
                ))}
              </ItineraryList>
            </Card>
          );
        })()}

        {booking.experiences && booking.experiences.length > 0 ? (
          <Card>
            <SectionTitle>Included experiences</SectionTitle>
            <BundleGrid>
              {booking.experiences.map((exp) => (
                <ExperienceBundleCard key={exp.id} experience={exp} />
              ))}
            </BundleGrid>
          </Card>
        ) : null}

        {booking.included_packages && booking.included_packages.length > 0 ? (
          <Card>
            <SectionTitle>Included packages</SectionTitle>
            <BundleGrid>
              {booking.included_packages.map((pkg) => (
                <PackageBundleCard key={pkg.id} pkg={pkg} />
              ))}
            </BundleGrid>
          </Card>
        ) : null}

        <BookingUpsell
          bookingReference={booking.booking_reference}
          hasVehicle={hasVehicle}
          hasAccommodation={hasAccommodation}
          featuredVehicles={featuredVehicles}
        />

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
          </Actions>
        </Card>

        {upsellTours.length > 0 ? (
          <UpsellSection>
            <UpsellHeader>
              <UpsellEyebrow>Private Tours</UpsellEyebrow>
              <UpsellTitle>Other experiences you might enjoy</UpsellTitle>
              <UpsellSubtitle>
                Hand-picked private tours across Cape Town — add one to your
                trip with a quick WhatsApp.
              </UpsellSubtitle>
            </UpsellHeader>
            <UpsellGrid>
              {upsellTours.map((tour) => (
                <UpsellCard key={tour.href} href={tour.href}>
                  <UpsellImageWrap>
                    {tour.image ? (
                      <SmartImage
                        src={tour.image}
                        alt={tour.alt}
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    ) : null}
                  </UpsellImageWrap>
                  <UpsellBody>
                    <UpsellName>{tour.title}</UpsellName>
                    <UpsellText>{tour.description}</UpsellText>
                    <UpsellCta>View tour →</UpsellCta>
                  </UpsellBody>
                </UpsellCard>
              ))}
            </UpsellGrid>
          </UpsellSection>
        ) : null}
      </Article>
    </Wrapper>
  );
}
