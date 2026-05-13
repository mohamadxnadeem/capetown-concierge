"use client";

import Image from "next/image";
import styled from "styled-components";

import Container from "../../common/Container";
import { brand } from "../../../lib/brand";
import { shimmerPlaceholder } from "../../../lib/shimmer";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import ChauffeurGallery from "../chauffeur-services/ChauffeurGallery";
import type { Booking, BookingCarPhoto, BookingStatus } from "./types";

type Props = {
  booking: Booking;
};

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

// Hero --------------------------------------------------------------------

const Hero = styled.section`
  position: relative;
  width: 100%;
  min-height: 460px;
  overflow: hidden;
  background: linear-gradient(135deg, #0b5b33 0%, #063e23 100%);

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 520px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 580px;
  }
`;

const HeroImageLayer = styled.div`
  position: absolute;
  inset: 0;
`;

// Dark, neutral overlay (no green tint) so the vehicle photo's real
// colours show through. Heavier at the bottom so the title and meta
// row stay readable.
const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0.45) 40%,
    rgba(0, 0, 0, 0.1) 75%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 460px;
  padding: 48px 0 56px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 520px;
    padding: 64px 0 72px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 580px;
    padding: 80px 0 96px;
  }
`;

const HeroEyebrow = styled.div`
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 14px;
`;

const HeroTitle = styled.h1`
  margin: 0 0 16px;
  color: #ffffff;
  font-size: 2.2rem;
  line-height: 1.05;
  max-width: 760px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.8rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3.6rem;
  }
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 1rem;
`;

const HeroDates = styled.span`
  font-weight: 600;
`;

const StatusPill = styled.span<{ $status: BookingStatus }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: ${({ $status }) =>
    $status === "confirmed"
      ? "rgba(255, 255, 255, 0.95)"
      : $status === "completed"
      ? "rgba(255, 255, 255, 0.18)"
      : $status === "cancelled"
      ? "rgba(161, 38, 38, 0.92)"
      : "rgba(245, 158, 11, 0.92)"};
  color: ${({ $status }) =>
    $status === "confirmed"
      ? "#063e23"
      : $status === "cancelled"
      ? "#ffffff"
      : $status === "completed"
      ? "#ffffff"
      : "#1f2a24"};
  border: 1px solid ${({ $status }) =>
    $status === "confirmed"
      ? "rgba(255, 255, 255, 0.6)"
      : "transparent"};
`;

// Page wrapper / cards ----------------------------------------------------

const PageWrap = styled.main`
  background: ${({ theme }) => theme.colors.background};
  padding-bottom: 72px;
`;

const StackWrap = styled.section`
  padding: 48px 0 8px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 64px 0 16px;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 28px;
  margin-bottom: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 36px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 44px;
  }
`;

const CardEyebrow = styled.div`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const CardTitle = styled.h2`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.6rem;
  line-height: 1.2;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.9rem;
  }
`;

const CardCopy = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1rem;
  line-height: 1.75;
`;

const FactsGrid = styled.dl`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  margin: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px 32px;
  }
`;

const Fact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FactLabel = styled.dt`
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const FactValue = styled.dd`
  margin: 0;
  font-size: 1.02rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 600;
`;

// Day-by-day --------------------------------------------------------------

const DayList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const DayRow = styled.li`
  display: grid;
  grid-template-columns: 36px 1fr;
  gap: 16px;
  align-items: flex-start;
  padding: 18px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.backgroundSoft};
`;

const DayBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.86rem;
  font-weight: 700;
`;

const DayBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DayDate = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.02rem;
  font-weight: 700;
`;

const DayMeta = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
  line-height: 1.6;
`;

// Contact card / WhatsApp -------------------------------------------------

const WhatsAppLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: #25d366;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.98rem;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba(37, 211, 102, 0.32);
  }
`;

// Helpers -----------------------------------------------------------------

function getHeroImage(photos?: BookingCarPhoto[]): string | null {
  if (!photos || photos.length === 0) return null;
  const sorted = [...photos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const featured = sorted.find((p) => p.is_featured);
  return (featured?.cover_photos || sorted[0]?.cover_photos) ?? null;
}

const DATE_FMT_FULL = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const DATE_FMT_DAY_MONTH = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
});

const DATE_FMT_DAY_WEEKDAY = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

function parseISODate(value: string): Date | null {
  // Dates arrive as "YYYY-MM-DD". Construct in UTC to avoid TZ drift.
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
}

function formatDateRange(start?: string, end?: string): string {
  if (!start) return "Date TBC";
  const startDate = parseISODate(start);
  if (!startDate) return start;

  if (!end || end === start) {
    return DATE_FMT_FULL.format(startDate);
  }

  const endDate = parseISODate(end);
  if (!endDate) return DATE_FMT_FULL.format(startDate);

  const sameYear = startDate.getUTCFullYear() === endDate.getUTCFullYear();
  const sameMonth = sameYear && startDate.getUTCMonth() === endDate.getUTCMonth();

  if (sameMonth) {
    return `${startDate.getUTCDate()} – ${DATE_FMT_FULL.format(endDate)}`;
  }
  if (sameYear) {
    return `${DATE_FMT_DAY_MONTH.format(startDate)} – ${DATE_FMT_FULL.format(endDate)}`;
  }
  return `${DATE_FMT_FULL.format(startDate)} – ${DATE_FMT_FULL.format(endDate)}`;
}

function formatLongDate(value: string): string {
  const date = parseISODate(value);
  return date ? DATE_FMT_DAY_WEEKDAY.format(date) : value;
}

function formatTime(time: string | null): string | null {
  if (!time) return null;
  // Time arrives as "HH:MM:SS"; trim seconds.
  const match = /^(\d{2}):(\d{2})/.exec(time);
  return match ? `${match[1]}:${match[2]}` : time;
}

function formatDayType(dayType: "full_day" | "half_day"): string {
  return dayType === "full_day" ? "Full day" : "Half day";
}

function reassuranceCopy(status: BookingStatus): string {
  if (status === "cancelled") {
    return "This booking has been cancelled. If this looks like a mistake, please get in touch on WhatsApp and we'll sort it out right away.";
  }
  if (status === "completed") {
    return "Thanks for travelling with us. We've kept the details below for your records — and we'd love to welcome you back next time you're in Cape Town.";
  }
  // Clients only see this page after we've confirmed the booking on
  // WhatsApp, so treat `pending` and `confirmed` the same.
  return "All the details for your trip are below. Save this page or screenshot it — you'll only need it on the day. Anything to change? WhatsApp us and we'll handle it.";
}

// Component ---------------------------------------------------------------

export default function BookingConfirmationView({ booking }: Props) {
  const heroImage = getHeroImage(booking.car?.cover_photos);
  const firstDay = booking.days?.[0];
  const lastDay = booking.days?.[booking.days.length - 1];
  const dateRangeLabel = formatDateRange(firstDay?.date, lastDay?.date);

  const whatsappMessage = `Hi, I have a question about my booking ${booking.booking_reference}.`;
  const whatsappHref = buildWhatsAppLink(whatsappMessage);

  const customerFirstName = booking.customer_name?.split(" ")[0] || "there";

  return (
    <PageWrap>
      <Hero>
        {heroImage ? (
          <HeroImageLayer>
            <Image
              src={heroImage}
              alt={`${booking.car?.title || "Vehicle"} — Cape Town Concierge booking`}
              fill
              priority
              fetchPriority="high"
              quality={85}
              placeholder="blur"
              blurDataURL={shimmerPlaceholder(1400, 900)}
              sizes="100vw"
              style={{ objectFit: "cover" }}
            />
          </HeroImageLayer>
        ) : null}
        <HeroOverlay />

        <Container>
          <HeroContent>
            <HeroEyebrow>Booking · {booking.booking_reference}</HeroEyebrow>
            <HeroTitle>
              {booking.car?.title || booking.title || "Your booking"}
            </HeroTitle>
            <HeroMeta>
              <HeroDates>{dateRangeLabel}</HeroDates>
              <StatusPill $status={booking.status}>
                {STATUS_LABEL[booking.status] || booking.status}
              </StatusPill>
            </HeroMeta>
          </HeroContent>
        </Container>
      </Hero>

      <StackWrap>
        <Container>
          <Card>
            <CardEyebrow>Booking confirmation</CardEyebrow>
            <CardTitle>
              Hi {customerFirstName} — your booking is{" "}
              {booking.status === "cancelled" || booking.status === "completed"
                ? STATUS_LABEL[booking.status].toLowerCase()
                : "confirmed"}
            </CardTitle>
            <CardCopy>{reassuranceCopy(booking.status)}</CardCopy>

            <FactsGrid>
              <Fact>
                <FactLabel>Date{booking.is_multi_day ? "s" : ""}</FactLabel>
                <FactValue>{dateRangeLabel}</FactValue>
              </Fact>
              <Fact>
                <FactLabel>Vehicle</FactLabel>
                <FactValue>
                  {booking.car?.title || "—"}
                  {booking.car?.number_of_seats
                    ? ` · ${booking.car.number_of_seats} seats`
                    : ""}
                </FactValue>
              </Fact>
              {booking.driver?.full_name ? (
                <Fact>
                  <FactLabel>Driver</FactLabel>
                  <FactValue>{booking.driver.full_name}</FactValue>
                </Fact>
              ) : null}
              {booking.pickup_location ? (
                <Fact>
                  <FactLabel>Pickup</FactLabel>
                  <FactValue>{booking.pickup_location}</FactValue>
                </Fact>
              ) : null}
              {booking.dropoff_location ? (
                <Fact>
                  <FactLabel>Drop-off</FactLabel>
                  <FactValue>{booking.dropoff_location}</FactValue>
                </Fact>
              ) : null}
              {firstDay?.start_time ? (
                <Fact>
                  <FactLabel>Start time</FactLabel>
                  <FactValue>{formatTime(firstDay.start_time)}</FactValue>
                </Fact>
              ) : null}
            </FactsGrid>

            {booking.trip_description ? (
              <>
                <FactLabel style={{ marginTop: 28 }}>Trip notes</FactLabel>
                <CardCopy style={{ marginTop: 8, marginBottom: 0 }}>
                  {booking.trip_description}
                </CardCopy>
              </>
            ) : null}
          </Card>

          {booking.car?.cover_photos && booking.car.cover_photos.length > 0 ? (
            <Card>
              <CardEyebrow>Your vehicle</CardEyebrow>
              <CardTitle>{booking.car.title}</CardTitle>
              {booking.car.short_description ? (
                <CardCopy>{booking.car.short_description}</CardCopy>
              ) : null}
              <ChauffeurGallery
                images={booking.car.cover_photos}
                title={null}
              />
            </Card>
          ) : null}

          {booking.is_multi_day && booking.days?.length > 1 ? (
            <Card>
              <CardEyebrow>Day-by-day</CardEyebrow>
              <CardTitle>Your itinerary</CardTitle>
              <CardCopy>
                Here&apos;s how the days break down. Times are guides — your
                driver will adapt around traffic and your pace.
              </CardCopy>
              <DayList>
                {booking.days.map((day, index) => {
                  const time = formatTime(day.start_time);
                  const dayType = formatDayType(day.day_type);
                  return (
                    <DayRow key={day.id}>
                      <DayBadge>{index + 1}</DayBadge>
                      <DayBody>
                        <DayDate>{formatLongDate(day.date)}</DayDate>
                        <DayMeta>
                          {dayType}
                          {time ? ` · Starts ${time}` : ""}
                          {day.notes ? ` · ${day.notes}` : ""}
                        </DayMeta>
                      </DayBody>
                    </DayRow>
                  );
                })}
              </DayList>
            </Card>
          ) : null}

          <Card>
            <CardEyebrow>Need anything?</CardEyebrow>
            <CardTitle>Questions? WhatsApp us</CardTitle>
            <CardCopy>
              Changes, pickup tweaks, last-minute additions — message us
              directly and we usually reply within 30 minutes.
            </CardCopy>
            <WhatsAppLink
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  source: "booking_confirmation",
                  label: `Booking ${booking.booking_reference}`,
                })
              }
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.556 4.12 1.527 5.849L.057 23.535a.75.75 0 0 0 .928.928l5.701-1.476A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.713 9.713 0 0 1-4.93-1.343l-.355-.21-3.685.953.978-3.565-.229-.367A9.713 9.713 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
              </svg>
              Message {brand.name} on WhatsApp
            </WhatsAppLink>
          </Card>
        </Container>
      </StackWrap>
    </PageWrap>
  );
}
