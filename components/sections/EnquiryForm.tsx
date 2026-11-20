"use client";

import { useState } from "react";
import styled from "styled-components";
import { useLocale, useT } from "../../lib/i18n/LocaleContext";
import { LANGUAGE_FIELD } from "../../lib/i18n/config";
import type { TFunction } from "../../lib/i18n/messages";

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
  color: #e53e3e;
`;

const SuccessMsg = styled.div`
  padding: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 1rem;
`;

const CheckGroup = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
  min-width: 0;
`;

const CheckLegend = styled.legend`
  padding: 0;
  margin-bottom: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const CheckRow = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  input {
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const PrivacyNote = styled.p`
  margin: 14px 0 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const FULL_SERVICES = [
  "Private chauffeured drives",
  "Day tours",
  "Multi-day trip",
  "Airport transfer",
  "Other",
];

const FULL_SERVICE_KEYS: Record<string, string> = {
  "Private chauffeured drives": "enquiry.svc.chauffeur",
  "Day tours": "enquiry.svc.dayTours",
  "Multi-day trip": "enquiry.svc.multiDay",
  "Airport transfer": "enquiry.svc.airport",
  Other: "enquiry.svc.other",
};

const CONTACT_EMAIL = "zaid@capetown-concierge.co.za";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  groupSize: string;
  message: string;
  arrival: string;
  departure: string;
  services: string[];
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState, full: boolean, t: TFunction): Errors {
  const errors: Errors = {};
  if (!form.name.trim()) errors.name = t("enquiry.err.name");
  if (!form.email.trim()) {
    errors.email = t("enquiry.err.emailRequired");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t("enquiry.err.emailInvalid");
  }
  if (full) {
    if (!form.services.length) errors.services = t("enquiry.err.services");
  } else if (!form.service) {
    errors.service = t("enquiry.err.service");
  }
  return errors;
}

type EnquiryFormProps = {
  /** "full" adds arrival and departure dates and multi-select services. Default keeps the original form. */
  variant?: "simple" | "full";
};

export default function EnquiryForm({ variant = "simple" }: EnquiryFormProps) {
  const full = variant === "full";
  const t = useT();
  const locale = useLocale();
  const language = LANGUAGE_FIELD[locale];
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    groupSize: "",
    message: "",
    arrival: "",
    departure: "",
    services: [],
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

  function toggleService(svc: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter((x) => x !== svc)
        : [...prev.services, svc],
    }));
    if (errors.services) setErrors((prev) => ({ ...prev, services: undefined }));
  }

  async function handleSubmit() {
    const newErrors = validate(form, full, t);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    try {
      const serviceText = full ? form.services.join(", ") : form.service;
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.phone ? `Phone/WhatsApp: ${form.phone}` : null,
        `Service: ${serviceText}`,
        !full && form.date ? `Travel Date: ${form.date}` : null,
        full && form.arrival ? `Arrival Date: ${form.arrival}` : null,
        full && form.departure ? `Departure Date: ${form.departure}` : null,
        form.groupSize ? (full ? `Guests: ${form.groupSize}` : `Group Size: ${form.groupSize}`) : null,
        form.message ? `Message: ${form.message}` : null,
        locale !== "en" ? `Language: ${language}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `[${language}] New Enquiry: ${serviceText}`,
          language,
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
        <SuccessMsg>{t("enquiry.success")}</SuccessMsg>
      </Wrap>
    );
  }

  return (
    <Wrap>
      <FormTitle>{t("enquiry.title")}</FormTitle>
      <FormSubtitle>
        {t("enquiry.subtitle")}
      </FormSubtitle>

      <FieldGrid>
        <div>
          <Label htmlFor="enq-name">{t("enquiry.name")}</Label>
          <Input
            id="enq-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("enquiry.namePlaceholder")}
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
        </div>

        <div>
          <Label htmlFor="enq-email">{t("enquiry.email")}</Label>
          <Input
            id="enq-email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("enquiry.emailPlaceholder")}
          />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </div>

        <div>
          <Label htmlFor="enq-phone">{full ? t("enquiry.phoneFull") : t("enquiry.phone")}</Label>
          <Input
            id="enq-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder={t("enquiry.phonePlaceholder")}
          />
        </div>

        {full && (
          <>
            <div>
              <Label htmlFor="enq-arrival">{t("enquiry.arrival")}</Label>
              <Input id="enq-arrival" name="arrival" type="date" value={form.arrival} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="enq-departure">{t("enquiry.departure")}</Label>
              <Input
                id="enq-departure"
                name="departure"
                type="date"
                min={form.arrival || undefined}
                value={form.departure}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="enq-group">{t("enquiry.guests")}</Label>
              <Input
                id="enq-group"
                name="groupSize"
                type="number"
                min="1"
                max="50"
                value={form.groupSize}
                onChange={handleChange}
                placeholder={t("enquiry.guestsPlaceholder")}
              />
            </div>
            <FullWidth>
              <CheckGroup>
                <CheckLegend>{t("enquiry.needs")}</CheckLegend>
                {FULL_SERVICES.map((svc) => (
                  <CheckRow key={svc}>
                    <input
                      type="checkbox"
                      checked={form.services.includes(svc)}
                      onChange={() => toggleService(svc)}
                    />
                    {t(FULL_SERVICE_KEYS[svc])}
                  </CheckRow>
                ))}
                {errors.services && <ErrorMsg>{errors.services}</ErrorMsg>}
              </CheckGroup>
            </FullWidth>
          </>
        )}

        {!full && (
          <>
        <div>
          <Label htmlFor="enq-service">{t("enquiry.serviceType")}</Label>
          <Select
            id="enq-service"
            name="service"
            value={form.service}
            onChange={handleChange}
          >
            <option value="">{t("enquiry.selectService")}</option>
            <option value="Airport Transfer">{t("enquiry.opt.airport")}</option>
            <option value="Full-Day Chauffeur">{t("enquiry.opt.fullDay")}</option>
            <option value="Private Tour">{t("enquiry.opt.privateTour")}</option>
            <option value="Winelands Tour">{t("enquiry.opt.winelands")}</option>
            <option value="Safari Day Trip">{t("enquiry.opt.safari")}</option>
            <option value="Other">{t("enquiry.opt.other")}</option>
          </Select>
          {errors.service && <ErrorMsg>{errors.service}</ErrorMsg>}
        </div>

        <div>
          <Label htmlFor="enq-date">{t("enquiry.travelDate")}</Label>
          <Input
            id="enq-date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="enq-group">{t("enquiry.groupSize")}</Label>
          <Input
            id="enq-group"
            name="groupSize"
            type="number"
            min="1"
            max="50"
            value={form.groupSize}
            onChange={handleChange}
            placeholder={t("enquiry.guestsPlaceholder")}
          />
        </div>

          </>
        )}

        <FullWidth>
          <Label htmlFor="enq-message">{t("enquiry.message")}</Label>
          <Textarea
            id="enq-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t("enquiry.messagePlaceholder")}
          />
        </FullWidth>
      </FieldGrid>

      <SubmitButton onClick={handleSubmit} disabled={submitting}>
        {submitting ? t("enquiry.sending") : t("enquiry.send")}
      </SubmitButton>
      {full ? (
        <PrivacyNote>{t("enquiry.privacyNote")}</PrivacyNote>
      ) : null}
    </Wrap>
  );
}
