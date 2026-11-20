"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import styled from "styled-components";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import { trackWhatsAppClick } from "../../../lib/tracking";

type Props = {
  vehicle: string;
};

type Errors = Partial<Record<"start" | "end" | "guests" | "pickup" | "name", string>>;

const LEAD_EMAIL = "zaid@capetown-concierge.co.za";
// brand.colors.error exists at runtime but is not in the Theme type; avoid editing shared types.
const ERROR_COLOR = "#a12626";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function todayLocalISO() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

const Card = styled.div`
  margin-top: 16px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardInner = styled.div`
  padding: 28px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 34px;
  }
`;

const Title = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.12;
`;

const Form = styled.form`
  display: grid;
  gap: 16px;
`;

const Field = styled.div`
  display: grid;
  gap: 6px;
  min-width: 0;
`;

const DateRow = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.9rem;
  font-weight: 600;
`;

const GroupLabel = styled.span`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 0.9rem;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}33;
  }

  &[aria-invalid="true"] {
    border-color: ${ERROR_COLOR};
  }
`;

const ErrorText = styled.span`
  color: ${ERROR_COLOR};
  font-size: 0.82rem;
`;

const Submit = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 52px;
  padding: 0 22px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.25s ease;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    border-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}55;
  }
`;

const Note = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.84rem;
  text-align: center;
`;

export default function ChauffeurDateEnquiry({ vehicle }: Props) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [guests, setGuests] = useState("2");
  const [pickup, setPickup] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function validate(): Errors {
    const today = todayLocalISO();
    const e: Errors = {};
    if (!start) e.start = "Please choose a start date.";
    else if (start < today) e.start = "Start date cannot be in the past.";
    if (!end) e.end = "Please choose an end date.";
    else if (start && end < start) e.end = "End date cannot be before the start date.";
    const g = Number(guests);
    if (!guests || !Number.isInteger(g) || g < 1 || g > 8) e.guests = "Enter 1 to 8 guests.";
    if (!pickup.trim()) e.pickup = "Please tell us the pickup area or hotel.";
    if (!name.trim()) e.name = "Please enter your name.";
    return e;
  }

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const guestCount = Number(guests);
    const message =
      `Hi, I'd like to check availability for the ${vehicle} chauffeur service.\n` +
      `Dates: ${formatDate(start)} to ${formatDate(end)}\n` +
      `Guests: ${guestCount}\n` +
      `Pickup: ${pickup.trim()}\n` +
      `Name: ${name.trim()}`;

    // Open WhatsApp synchronously so mobile browsers do not block it.
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");

    // Lead backup, fire and forget.
    try {
      void fetch(`https://formsubmit.co/ajax/${LEAD_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          subject: `Date enquiry: ${vehicle}`,
          _subject: `Date enquiry: ${vehicle}`,
          message,
          _captcha: "false",
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }

    try {
      trackWhatsAppClick({
        source: "chauffeur_date_form",
        label: "Send on WhatsApp",
        vehicle,
      });
      window.gtag?.("event", "date_enquiry_submit", {
        vehicle,
        guests: guestCount,
        start_date: start,
        end_date: end,
      });
    } catch {
      // ignore
    }
  }

  const today = todayLocalISO();

  return (
    <Card>
      <CardInner>
        <Title>Check Your Dates</Title>

        <Form onSubmit={handleSubmit} noValidate>
          <Field role="group" aria-labelledby="cde-dates-label">
            <GroupLabel id="cde-dates-label">Your travel dates</GroupLabel>
            <DateRow>
              <Field>
                <Label htmlFor="cde-start">Start date</Label>
                <Input
                  id="cde-start"
                  type="date"
                  min={today}
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  aria-invalid={errors.start ? "true" : "false"}
                  aria-describedby={errors.start ? "cde-start-err" : undefined}
                  required
                />
                {errors.start ? <ErrorText id="cde-start-err">{errors.start}</ErrorText> : null}
              </Field>
              <Field>
                <Label htmlFor="cde-end">End date</Label>
                <Input
                  id="cde-end"
                  type="date"
                  min={start || today}
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  aria-invalid={errors.end ? "true" : "false"}
                  aria-describedby={errors.end ? "cde-end-err" : undefined}
                  required
                />
                {errors.end ? <ErrorText id="cde-end-err">{errors.end}</ErrorText> : null}
              </Field>
            </DateRow>
          </Field>

          <Field>
            <Label htmlFor="cde-guests">Guests</Label>
            <Input
              id="cde-guests"
              type="number"
              inputMode="numeric"
              min={1}
              max={8}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              aria-invalid={errors.guests ? "true" : "false"}
              aria-describedby={errors.guests ? "cde-guests-err" : undefined}
              required
            />
            {errors.guests ? <ErrorText id="cde-guests-err">{errors.guests}</ErrorText> : null}
          </Field>

          <Field>
            <Label htmlFor="cde-pickup">Pickup area or hotel</Label>
            <Input
              id="cde-pickup"
              type="text"
              placeholder="e.g. One&Only, V&A Waterfront"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              aria-invalid={errors.pickup ? "true" : "false"}
              aria-describedby={errors.pickup ? "cde-pickup-err" : undefined}
              required
            />
            {errors.pickup ? <ErrorText id="cde-pickup-err">{errors.pickup}</ErrorText> : null}
          </Field>

          <Field>
            <Label htmlFor="cde-name">Name</Label>
            <Input
              id="cde-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "cde-name-err" : undefined}
              required
            />
            {errors.name ? <ErrorText id="cde-name-err">{errors.name}</ErrorText> : null}
          </Field>

          <Submit type="submit">Send on WhatsApp</Submit>
        </Form>

        <Note>We reply within 30 minutes. No payment needed to ask.</Note>
      </CardInner>
    </Card>
  );
}
