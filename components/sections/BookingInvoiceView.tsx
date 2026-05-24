"use client";

import { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { brand } from "../../lib/brand";
import type { Booking, BookingDay } from "../../lib/bookings";

const InvoicePageStyles = createGlobalStyle`
  header, footer, [data-floating-whatsapp] {
    display: none !important;
  }

  body {
    background: white !important;
  }

  @media print {
    @page {
      margin: 16mm 14mm;
    }
    html, body {
      background: white !important;
    }
  }
`;

const Page = styled.div`
  background: white;
  color: #1f2a24;
  min-height: 100vh;
  padding: 48px 32px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;

  @media print {
    padding: 0;
  }
`;

const Sheet = styled.div`
  max-width: 760px;
  margin: 0 auto;
  background: white;
  border: 1px solid #e3e8e5;
  padding: 48px;

  @media print {
    border: none;
    padding: 32px 24px;
    max-width: 100%;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 2px solid #0b5b33;
  margin-bottom: 28px;
`;

const Brand = styled.div``;

const BrandName = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  color: #123d2b;
  margin-bottom: 4px;
`;

const BrandMeta = styled.div`
  font-size: 0.82rem;
  color: #6c7a74;
  line-height: 1.6;
`;

const DocLabel = styled.div`
  text-align: right;
`;

const DocTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0b5b33;
  margin-bottom: 4px;
`;

const DocRef = styled.div`
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 0.95rem;
  color: #123d2b;
  font-weight: 700;
`;

const DocDate = styled.div`
  font-size: 0.82rem;
  color: #6c7a74;
  margin-top: 4px;
`;

const Section = styled.section`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #0b5b33;
  border-bottom: 1px solid #e3e8e5;
  padding-bottom: 6px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 8px 16px;
  font-size: 0.93rem;
  line-height: 1.6;
  padding: 6px 0;
`;

const RowLabel = styled.div`
  color: #6c7a74;
  font-weight: 600;
`;

const RowValue = styled.div`
  color: #1f2a24;
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media print {
    gap: 24px;
  }
`;

const DayTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
  margin-top: 6px;

  th,
  td {
    text-align: left;
    padding: 8px 10px;
    border-bottom: 1px solid #e3e8e5;
  }

  th {
    color: #6c7a74;
    font-weight: 700;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    background: #f6f8f7;
  }

  td.notes {
    color: #6c7a74;
    font-size: 0.88rem;
  }
`;

const Notes = styled.p`
  margin: 0;
  white-space: pre-line;
  font-size: 0.93rem;
  line-height: 1.7;
  color: #1f2a24;
`;

const Footer = styled.footer`
  margin-top: 36px;
  padding-top: 18px;
  border-top: 1px solid #e3e8e5;
  font-size: 0.82rem;
  line-height: 1.7;
  color: #6c7a74;
  text-align: center;
`;

const Toolbar = styled.div`
  max-width: 760px;
  margin: 0 auto 16px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media print {
    display: none;
  }
`;

const ToolbarButton = styled.button`
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  background: #0b5b33;
  color: white;
  font-weight: 700;
  font-size: 0.88rem;
  border: none;
  cursor: pointer;

  &:hover {
    background: #063e23;
  }
`;

const ToolbarLink = styled.a`
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  background: white;
  color: #123d2b;
  font-weight: 700;
  font-size: 0.88rem;
  border: 1px solid #e3e8e5;
  text-decoration: none;

  &:hover {
    background: #f6f8f7;
  }
`;

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(t: string | null): string {
  if (!t) return "";
  const parts = t.split(":");
  if (parts.length < 2) return t;
  return `${parts[0]}:${parts[1]}`;
}

function describeDay(day: BookingDay): string {
  const start = formatTime(day.start_time);
  const end = formatTime(day.end_time);
  const base = day.day_type === "half_day" ? "Half day" : "Full day";
  if (start && end) return `${base} · ${start}–${end}`;
  if (start) return `${base} · from ${start}`;
  return base;
}

interface Props {
  booking: Booking;
}

export default function BookingInvoiceView({ booking }: Props) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `Booking ${booking.booking_reference} — ${brand.name}`;
    const params = new URLSearchParams(window.location.search);
    if (params.get("print") === "1") {
      const timer = window.setTimeout(() => {
        window.print();
      }, 400);
      return () => {
        window.clearTimeout(timer);
        document.title = previousTitle;
      };
    }
    return () => {
      document.title = previousTitle;
    };
  }, [booking.booking_reference]);

  const driver = booking.driver ?? booking.car?.driver ?? null;
  const issuedOn = new Date().toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Page>
      <InvoicePageStyles />
      <Toolbar>
        <ToolbarButton type="button" onClick={() => window.print()}>
          Download / Print
        </ToolbarButton>
        <ToolbarLink href={`/booking/${booking.booking_reference}`}>
          Back to booking
        </ToolbarLink>
      </Toolbar>

      <Sheet>
        <TopBar>
          <Brand>
            <BrandName>{brand.name}</BrandName>
            <BrandMeta>
              {brand.address.locality}, {brand.address.region}
              <br />
              {brand.contactEmail}
              <br />
              {brand.phone}
            </BrandMeta>
          </Brand>
          <DocLabel>
            <DocTitle>Booking Confirmation</DocTitle>
            <DocRef>{booking.booking_reference}</DocRef>
            <DocDate>Issued {issuedOn}</DocDate>
          </DocLabel>
        </TopBar>

        <TwoCol>
          <Section>
            <SectionTitle>Guest</SectionTitle>
            {booking.customer_name ? (
              <RowValue style={{ fontWeight: 700 }}>{booking.customer_name}</RowValue>
            ) : (
              <RowValue style={{ color: "#6c7a74" }}>—</RowValue>
            )}
            {booking.customer_email ? (
              <RowValue style={{ fontSize: "0.88rem", color: "#6c7a74", marginTop: 4 }}>
                {booking.customer_email}
              </RowValue>
            ) : null}
            {booking.customer_phone ? (
              <RowValue style={{ fontSize: "0.88rem", color: "#6c7a74" }}>
                {booking.customer_phone}
              </RowValue>
            ) : null}
          </Section>

          <Section>
            <SectionTitle>Status</SectionTitle>
            <RowValue style={{ fontWeight: 700, textTransform: "capitalize" }}>
              {booking.status === "pending" ? "Confirmed" : booking.status}
            </RowValue>
            {booking.title ? (
              <RowValue style={{ fontSize: "0.88rem", color: "#6c7a74", marginTop: 4 }}>
                {booking.title}
              </RowValue>
            ) : null}
          </Section>
        </TwoCol>

        {booking.car ? (
          <Section>
            <SectionTitle>Vehicle</SectionTitle>
            <Row>
              <RowLabel>Vehicle</RowLabel>
              <RowValue>{booking.car.title}</RowValue>
            </Row>
            {booking.car.vehicle_type ? (
              <Row>
                <RowLabel>Type</RowLabel>
                <RowValue>{booking.car.vehicle_type}</RowValue>
              </Row>
            ) : null}
            {booking.car.number_of_seats ? (
              <Row>
                <RowLabel>Capacity</RowLabel>
                <RowValue>
                  {booking.car.number_of_seats} seats
                  {typeof booking.car.luggage_capacity === "number"
                    ? ` · ${booking.car.luggage_capacity} bags`
                    : ""}
                </RowValue>
              </Row>
            ) : null}
            {booking.car.features?.length ? (
              <Row>
                <RowLabel>Features</RowLabel>
                <RowValue>{booking.car.features.join(", ")}</RowValue>
              </Row>
            ) : null}
          </Section>
        ) : null}

        <Section>
          <SectionTitle>
            {booking.is_multi_day ? "Trip dates" : "Trip date"}
          </SectionTitle>
          <DayTable>
            <thead>
              <tr>
                {booking.is_multi_day ? <th style={{ width: 60 }}>#</th> : null}
                <th>Date</th>
                <th>Duration</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {booking.days.map((day, idx) => (
                <tr key={day.id}>
                  {booking.is_multi_day ? <td>Day {idx + 1}</td> : null}
                  <td>{formatDate(day.date)}</td>
                  <td>{describeDay(day)}</td>
                  <td className="notes">{day.notes || "—"}</td>
                </tr>
              ))}
            </tbody>
          </DayTable>
        </Section>

        {(booking.pickup_location || booking.dropoff_location) && (
          <Section>
            <SectionTitle>Route</SectionTitle>
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
          </Section>
        )}

        {driver ? (
          <Section>
            <SectionTitle>Driver</SectionTitle>
            <Row>
              <RowLabel>Name</RowLabel>
              <RowValue>{driver.full_name}</RowValue>
            </Row>
            {driver.phone ? (
              <Row>
                <RowLabel>Phone</RowLabel>
                <RowValue>{driver.phone}</RowValue>
              </Row>
            ) : null}
            {driver.whatsapp ? (
              <Row>
                <RowLabel>WhatsApp</RowLabel>
                <RowValue>{driver.whatsapp}</RowValue>
              </Row>
            ) : null}
          </Section>
        ) : null}

        {booking.trip_description ? (
          <Section>
            <SectionTitle>Trip notes</SectionTitle>
            <Notes>{booking.trip_description}</Notes>
          </Section>
        ) : null}

        <Footer>
          Thank you for choosing {brand.name}. For any changes or questions, contact us at{" "}
          {brand.contactEmail} or {brand.phone}.
          <br />
          {brand.siteUrl.replace(/^https?:\/\//, "")}
        </Footer>
      </Sheet>
    </Page>
  );
}
