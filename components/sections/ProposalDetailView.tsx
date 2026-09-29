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
  padding-bottom: 80px;
  min-height: calc(100vh - 82px);
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
  margin-bottom: 18px;
`;

const GroupRef = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.82);
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

// ─── Card + content primitives ────────────────────────────────────────

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

const BookingCard = styled.section`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.div`
  position: relative;
  height: 240px;
  background: linear-gradient(
    135deg,
    rgba(11, 91, 51, 0.18) 0%,
    rgba(6, 62, 35, 0.1) 100%
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 300px;
  }
`;

const CardImagePlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.88);
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
`;

const CardBody = styled.div`
  padding: 24px 26px 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const CardHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  align-items: baseline;
  justify-content: space-between;
`;

const CarTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.3rem;
  line-height: 1.2;
`;

const RefTag = styled.span`
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
`;

const DriverLine = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`;

const SubHeading = styled.h4`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
`;

const ScheduleSummary = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 10px;
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
  padding: 12px 16px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
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
  font-size: 0.96rem;
`;

const DayTime = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`;

const DayNotes = styled.p`
  margin: 6px 0 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.55;
  white-space: pre-line;
`;

const PickupGrid = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const PickupTile = styled.div`
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
`;

const PickupLabel = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const PickupValue = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.45;
`;

const TripDescription = styled.p`
  margin: 4px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-style: italic;
  font-size: 0.94rem;
  line-height: 1.6;
  white-space: pre-line;
`;

const AccommList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AccommRow = styled.div`
  display: grid;
  gap: 14px;
  grid-template-columns: 100px 1fr;
  align-items: center;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 76px 1fr;
    gap: 12px;
    padding: 10px;
  }
`;

const AccommThumb = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(11, 91, 51, 0.14), rgba(6, 62, 35, 0.06));

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 60px;
  }
`;

const AccommBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const AccommTitle = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  font-size: 1rem;
`;

const AccommMeta = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;

const AccommNotes = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.85rem;
  margin-top: 4px;
  white-space: pre-line;
`;

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

function pickPhoto(photos: BookingPhoto[] | null | undefined): string | null {
  if (!photos?.length) return null;
  const valid = photos.filter((p) => Boolean(p?.cover_photos));
  if (!valid.length) return null;
  const sorted = [...valid].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return (sorted.find((p) => p.is_featured) ?? sorted[0]).cover_photos ?? null;
}

function parseIsoDate(iso: string): Date | null {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
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

function formatShortDate(iso: string, includeYear = false): string {
  const d = parseIsoDate(iso);
  if (!d) return iso;
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    ...(includeYear ? { year: "numeric" } : {}),
  });
}

function formatTime(t: string | null): string | null {
  if (!t) return null;
  const parts = t.split(":");
  if (parts.length < 2) return t;
  return `${parts[0]}:${parts[1]}`;
}

function pickCarPhoto(car: ProposalBooking["car"]): string | null {
  return car ? pickPhoto(car.cover_photos ?? null) : null;
}

function computeGroupRange(group: BookingGroup): { start: string; end: string } | null {
  const dates: string[] = [];
  group.bookings.forEach((b) => {
    b.days.forEach((d) => {
      if (d.date) dates.push(d.date);
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

function formatDateRange(startIso: string, endIso: string): string {
  const start = parseIsoDate(startIso);
  const end = parseIsoDate(endIso);
  if (!start || !end) return `${startIso} to ${endIso}`;
  const sameYear = start.getFullYear() === end.getFullYear();
  if (start.getTime() === end.getTime()) {
    return start.toLocaleDateString(undefined, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
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

function bookingDateRange(
  b: ProposalBooking
): { start: string; end: string } | null {
  const days = [...b.days].map((d) => d.date).filter(Boolean).sort();
  if (!days.length) return null;
  return { start: days[0], end: days[days.length - 1] };
}

function propertyFromSegment(
  segment: ProposalAccommodationSegment
): ProposalAccommodationSegment["villa"] | null {
  if (segment.kind === "villa") return segment.villa;
  if (segment.kind === "hotel") return segment.hotel;
  return segment.villa ?? segment.hotel ?? null;
}

// ─── Booking card ─────────────────────────────────────────────────────

function ProposalBookingCard({ booking }: { booking: ProposalBooking }) {
  const car = booking.car;
  const photo = pickCarPhoto(car);
  const range = bookingDateRange(booking);
  const dayCount = booking.days.length;
  const hasVehicle = Boolean(car);

  return (
    <BookingCard>
      <CardImage>
        {hasVehicle && photo ? (
          <SmartImage
            src={photo}
            alt={car?.title ?? "Vehicle"}
            sizes="(max-width: 768px) 100vw, 900px"
          />
        ) : hasVehicle ? (
          <CardImagePlaceholder>
            {(car?.title || "?").trim().charAt(0).toUpperCase()}
          </CardImagePlaceholder>
        ) : (
          <CardImagePlaceholder>🏨</CardImagePlaceholder>
        )}
      </CardImage>

      <CardBody>
        <CardHead>
          {hasVehicle ? (
            <CarTitle>{car?.title}</CarTitle>
          ) : (
            <CarTitle>Accommodation-only booking</CarTitle>
          )}
          <RefTag>Booking {booking.booking_reference}</RefTag>
        </CardHead>

        {hasVehicle ? (
          <DriverLine>
            {booking.driver
              ? `Driver: ${booking.driver.full_name}`
              : "Driver assigned separately"}
          </DriverLine>
        ) : null}

        {dayCount > 0 ? (
          <div>
            <SubHeading>Schedule</SubHeading>
            <ScheduleSummary>
              {dayCount} day{dayCount === 1 ? "" : "s"}
              {range ? `, ${formatDateRange(range.start, range.end)}` : ""}
            </ScheduleSummary>
            <DayList>
              {booking.days.map((day, index) => (
                <DayItem key={`${booking.booking_reference}-${day.date}-${index}`}>
                  <DayHead>
                    <DayLabel>{formatFullDate(day.date)}</DayLabel>
                    <DayTime>{describeDay(day) ?? ""}</DayTime>
                  </DayHead>
                  {day.notes ? <DayNotes>{day.notes}</DayNotes> : null}
                </DayItem>
              ))}
            </DayList>
          </div>
        ) : null}

        {hasVehicle && (booking.pickup_location || booking.dropoff_location) ? (
          <div>
            <SubHeading>Pickup and drop-off</SubHeading>
            <PickupGrid>
              <PickupTile>
                <PickupLabel>📍 Pickup</PickupLabel>
                <PickupValue>
                  {booking.pickup_location || "To be confirmed"}
                </PickupValue>
              </PickupTile>
              <PickupTile>
                <PickupLabel>📍 Drop-off</PickupLabel>
                <PickupValue>
                  {booking.dropoff_location || "To be confirmed"}
                </PickupValue>
              </PickupTile>
            </PickupGrid>
            {booking.trip_description ? (
              <TripDescription>{booking.trip_description}</TripDescription>
            ) : null}
          </div>
        ) : null}

        {!hasVehicle && booking.trip_description ? (
          <div>
            <SubHeading>Details</SubHeading>
            <TripDescription>{booking.trip_description}</TripDescription>
          </div>
        ) : null}

        {booking.accommodation_segments.length > 0 ? (
          <div>
            <SubHeading>Accommodation</SubHeading>
            <AccommList>
              {booking.accommodation_segments.map((segment, index) => {
                const property = propertyFromSegment(segment);
                const thumb = property
                  ? pickPhoto(property.cover_photos ?? null)
                  : null;
                return (
                  <AccommRow
                    key={`${booking.booking_reference}-accom-${index}`}
                  >
                    <AccommThumb>
                      {thumb ? (
                        <SmartImage
                          src={thumb}
                          alt={property?.name ?? "Accommodation"}
                          sizes="120px"
                        />
                      ) : null}
                    </AccommThumb>
                    <AccommBody>
                      <AccommTitle>
                        {property?.name ??
                          (segment.kind === "hotel" ? "Hotel" : "Villa")}
                      </AccommTitle>
                      <AccommMeta>
                        {[property?.location, formatDateRange(segment.start_date, segment.end_date)]
                          .filter(Boolean)
                          .join(" · ")}
                      </AccommMeta>
                      {segment.notes ? (
                        <AccommNotes>{segment.notes}</AccommNotes>
                      ) : null}
                    </AccommBody>
                  </AccommRow>
                );
              })}
            </AccommList>
          </div>
        ) : null}
      </CardBody>
    </BookingCard>
  );
}

function describeDay(day: ProposalDay): string | null {
  const start = formatTime(day.start_time);
  const end = formatTime(day.end_time);
  if (start && end) return `${start} to ${end}`;
  if (start) return `from ${start}`;
  if (end) return `until ${end}`;
  return null;
}

// ─── Root view ────────────────────────────────────────────────────────

type Props = {
  group: BookingGroup;
};

export default function ProposalDetailView({ group }: Props) {
  const status: DisplayStatus = group.status;
  const bookingsCount = group.bookings.length;
  const vehicleCount = group.bookings.filter((b) => b.car).length;

  const heroPhoto = useMemo(() => {
    for (const b of group.bookings) {
      const p = pickCarPhoto(b.car);
      if (p) return p;
    }
    return null;
  }, [group]);

  const range = useMemo(() => computeGroupRange(group), [group]);

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
                alt={group.title}
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

          <HeroTitle>{group.title}</HeroTitle>
          <HeroSubtitle>Booking confirmation for {group.customer_name}</HeroSubtitle>

          <HeroChipRow>
            {range ? (
              <HeroChip>
                🗓 {formatDateRange(range.start, range.end)}
              </HeroChip>
            ) : null}
            {vehicleCount > 1 ? (
              <HeroChip>🚙 {vehicleCount} vehicles</HeroChip>
            ) : vehicleCount === 1 ? (
              <HeroChip>🚙 1 vehicle</HeroChip>
            ) : null}
          </HeroChipRow>
        </HeroInner>
      </Hero>

      <Article>
        {bookingsCount === 0 ? (
          <EmptyState>
            Your booking is being assembled, refresh in a moment.
          </EmptyState>
        ) : (
          <>
            <div>
              <SectionTitle>Your booking details</SectionTitle>
              <SectionIntro>
                Everything included in this booking is listed below. Save the
                reference above, and message us any time if plans change.
              </SectionIntro>
            </div>

            {group.bookings.map((b) => (
              <ProposalBookingCard
                key={b.booking_reference}
                booking={b}
              />
            ))}
          </>
        )}

        <AboutCard>
          <AboutHeading>Need to change something?</AboutHeading>
          <AboutBody>
            Message us on WhatsApp with your reference and we&apos;ll pick up
            from there. Same driver, same vehicle, same team looking after
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
              Reference: <code>{group.group_reference}</code>
            </ReferenceLine>
          </AboutRow>
        </AboutCard>
      </Article>
    </Wrapper>
  );
}
