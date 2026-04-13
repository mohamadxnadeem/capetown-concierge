"use client";

import { useState } from "react";
import styled from "styled-components";

const Wrap = styled.div`
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 32px 28px;
  max-width: 680px;
  margin: 0 auto;
`;

const FormTitle = styled.h3`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.25rem;
`;

const FormSubtitle = styled.p`
  margin: 0 0 24px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const FieldGrid = styled.div`
  display: grid;
  gap: 14px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

const Label = styled.label`
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.white};
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.white};
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.white};
  outline: none;
  resize: vertical;
  min-height: 90px;
  box-sizing: border-box;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  padding: 13px 28px;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMsg = styled.p`
  margin: 2px 0 0;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.error};
`;

const SuccessMsg = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 1rem;
`;

const CONTACT_EMAIL = "zaid@capetown-concierge.co.za";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  groupSize: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = "Full name is required.";
  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.service) errors.service = "Please select a service type.";
  return errors;
}

export default function EnquiryForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    groupSize: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit() {
    const newErrors = validate(form);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    try {
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.phone ? `Phone: ${form.phone}` : null,
        `Service: ${form.service}`,
        form.date ? `Travel Date: ${form.date}` : null,
        form.groupSize ? `Group Size: ${form.groupSize}` : null,
        form.message ? `Message: ${form.message}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `New Enquiry — ${form.service}`,
          message: body,
          _captcha: "false",
        }),
      });

      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Wrap>
        <SuccessMsg>Thanks — we&apos;ll be in touch within 30 minutes.</SuccessMsg>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <FormTitle>Send an Enquiry</FormTitle>
      <FormSubtitle>
        Prefer email? Fill in your details and we&apos;ll get back to you within 30 minutes.
      </FormSubtitle>

      <FieldGrid>
        <div>
          <Label htmlFor="enq-name">Full Name *</Label>
          <Input
            id="enq-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </div>

        <div>
          <Label htmlFor="enq-email">Email Address *</Label>
          <Input
            id="enq-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
          />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </div>

        <div>
          <Label htmlFor="enq-phone">Phone (with country code)</Label>
          <Input
            id="enq-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 555 000 0000"
          />
        </div>

        <div>
          <Label htmlFor="enq-service">Service Type *</Label>
          <Select
            id="enq-service"
            name="service"
            value={form.service}
            onChange={handleChange}
          >
            <option value="">Select a service…</option>
            <option value="Airport Transfer">Airport Transfer</option>
            <option value="Full-Day Chauffeur">Full-Day Chauffeur</option>
            <option value="Private Tour">Private Tour</option>
            <option value="Winelands Tour">Winelands Tour</option>
            <option value="Safari Day Trip">Safari Day Trip</option>
            <option value="Other">Other</option>
          </Select>
          {errors.service && <ErrorMsg>{errors.service}</ErrorMsg>}
        </div>

        <div>
          <Label htmlFor="enq-date">Travel Date</Label>
          <Input
            id="enq-date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="enq-group">Group Size</Label>
          <Input
            id="enq-group"
            name="groupSize"
            type="number"
            min="1"
            max="50"
            value={form.groupSize}
            onChange={handleChange}
            placeholder="2"
          />
        </div>

        <FullWidth>
          <Label htmlFor="enq-message">Message</Label>
          <Textarea
            id="enq-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Any specific requests or questions…"
          />
        </FullWidth>
      </FieldGrid>

      <SubmitButton onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Sending…" : "Send Enquiry"}
      </SubmitButton>
    </Wrap>
  );
}
