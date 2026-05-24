"use client";

import Link from "next/link";
import styled, { css } from "styled-components";
import { brand } from "../../lib/brand";
import { trackWhatsAppClick } from "../../lib/tracking";
import type {
  Booking,
  BookingDay,
  BookingDriver,
  BookingStatus,
  UpsellTour,
} from "../../lib/bookings";
import type { CarPhoto } from "./chauffeur-services/types";
import ChauffeurGallery from "./chauffeur-services/ChauffeurGallery";
import SmartImage from "../common/SmartImage";
import Money from "../common/Money";

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

function parseAmount(value: string | null | undefined): number | null {
  if (!value) return null;
  const num = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) && num > 0 ? num : null;
}

function getDailyRate(car: NonNullable<Booking["car"]>) {
  const from = parseAmount(car.price_from);
  const to = parseAmount(car.price_to);
  const single = parseAmount(car.price);
  if (from && to && to > from) return { from, to };
  if (from) return { from, to: null };
  if (single) return { from: single, to: null };
  return null;
}

interface Props {
  booking: Booking;
  carPhotos: CarPhoto[];
  upsellTours: UpsellTour[];
}

export default function BookingDetailView({
  booking,
  carPhotos,
  upsellTours,
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

                {(() => {
                  const rate = getDailyRate(booking.car);
                  if (!rate) return null;
                  return (
                    <>
                      <Term>Daily rate</Term>
                      <Detail>
                        {rate.to ? (
                          <>
                            <Money usd={rate.from} prefix="From " suffix="" />
                            {" – "}
                            <Money usd={rate.to} prefix="" suffix="per day" />
                          </>
                        ) : (
                          <Money
                            usd={rate.from}
                            prefix={booking.car.price_from ? "From " : ""}
                            suffix="per day"
                          />
                        )}
                      </Detail>
                    </>
                  );
                })()}
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
            <TertiaryAction
              href={`/booking/${booking.booking_reference}/invoice?print=1`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ⬇&nbsp; Download invoice
            </TertiaryAction>
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
