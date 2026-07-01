"use client";

import styled from "styled-components";
import { brand } from "../../lib/brand";

const Wrapper = styled.main`
  background: ${({ theme }) => theme.colors.background};
  padding: 64px 20px 96px;
`;

const Article = styled.article`
  max-width: 760px;
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 56px 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 36px 24px;
    border-radius: 18px;
  }
`;

const Eyebrow = styled.p`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2.4rem;
  line-height: 1.15;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.9rem;
  }
`;

const Updated = styled.p`
  margin: 0 0 32px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`;

const Lead = styled.p`
  margin: 0 0 18px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.02rem;
  line-height: 1.8;
`;

const SectionHeading = styled.h2`
  margin: 40px 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.35rem;
  line-height: 1.3;
`;

const Paragraph = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.8;
`;

const List = styled.ul`
  margin: 0 0 16px;
  padding-left: 22px;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  line-height: 1.8;

  li {
    margin-bottom: 6px;
  }
`;

const ContactBlock = styled.div`
  margin-top: 12px;
  padding: 20px 22px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.98rem;
  line-height: 1.8;

  a {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function CancellationPolicyContent() {
  return (
    <Wrapper>
      <Article>
        <Eyebrow>{brand.name}</Eyebrow>
        <Title>Cancellation Policy</Title>
        <Updated>Last updated: 25 June 2026</Updated>

        <Lead>
          This policy explains how cancellations and changes work across the
          services Cape Town Concierge arranges — private chauffeur hire,
          day tours, villa and hotel stays, and combined trip packages. It
          applies to bookings made directly with us via WhatsApp, email, or
          our website.
        </Lead>

        <SectionHeading>1. Chauffeur hire &amp; day tours</SectionHeading>
        <Paragraph>
          Bookings for chauffeur services and private day tours (Cape
          Peninsula, Winelands, Table Mountain and similar):
        </Paragraph>
        <List>
          <li>
            <strong>More than 72 hours before pickup</strong> — free
            cancellation, full refund of any deposit paid.
          </li>
          <li>
            <strong>Between 48 and 72 hours before pickup</strong> — 50% of
            the trip fee is due; the balance is refundable.
          </li>
          <li>
            <strong>Less than 48 hours before pickup</strong> — the full
            trip fee is due. Where possible we&apos;ll try to re-book the
            driver and refund the portion recovered.
          </li>
          <li>
            <strong>No-show on the day</strong> — the full trip fee is due
            and no refund is offered.
          </li>
        </List>
        <Paragraph>
          Flight delays, medical emergencies, and severe weather are
          considered on a case-by-case basis and we&apos;ll always do what we
          can to be fair.
        </Paragraph>

        <SectionHeading>2. Airport transfers</SectionHeading>
        <List>
          <li>
            <strong>More than 24 hours before pickup</strong> — free
            cancellation.
          </li>
          <li>
            <strong>Less than 24 hours before pickup</strong> — 50% of the
            transfer fee is due.
          </li>
          <li>
            <strong>No-show</strong> — full transfer fee is due.
          </li>
          <li>
            Flight-tracked airport transfers automatically adjust for delays
            at no extra cost.
          </li>
        </List>

        <SectionHeading>3. Villa &amp; hotel stays</SectionHeading>
        <Paragraph>
          Accommodation cancellations follow the individual property&apos;s
          policy, which is confirmed to you in writing when your booking is
          issued. In most cases:
        </Paragraph>
        <List>
          <li>
            <strong>More than 60 days before arrival</strong> — deposit
            refundable less a small admin fee.
          </li>
          <li>
            <strong>30 to 60 days before arrival</strong> — deposit is
            non-refundable; balance is refundable.
          </li>
          <li>
            <strong>Less than 30 days before arrival</strong> — full
            booking value is due.
          </li>
          <li>
            <strong>Peak season</strong> (mid-December to mid-January and
            Easter week) — stricter terms usually apply. Full details are
            shared before you confirm.
          </li>
        </List>
        <Paragraph>
          Where a villa or hotel is booked through a third party (Nox,
          direct with the property, an OTA), that provider&apos;s cancellation
          policy takes precedence. We&apos;ll always highlight the applicable
          terms before you confirm.
        </Paragraph>

        <SectionHeading>4. Combined trip packages</SectionHeading>
        <Paragraph>
          Where a booking includes a mix of accommodation, chauffeur, and
          tour components, each component follows its own policy above.
          Cancellation of one component does not automatically cancel the
          others. We&apos;ll help you re-plan any remaining components
          wherever possible.
        </Paragraph>

        <SectionHeading>5. Changes &amp; re-scheduling</SectionHeading>
        <Paragraph>
          We&apos;ll always try to accommodate a date change instead of a
          cancellation:
        </Paragraph>
        <List>
          <li>
            Chauffeur and tour re-scheduling is free of charge up to 24
            hours before the trip, subject to availability.
          </li>
          <li>
            Accommodation date changes are subject to the property&apos;s
            availability and terms — we&apos;ll confirm any difference in
            price and any admin fee before making the change.
          </li>
        </List>

        <SectionHeading>6. Refunds</SectionHeading>
        <Paragraph>
          Refunds are processed to the original payment method within 7 to
          14 business days of the cancellation being confirmed. Card
          refunds may take an additional few days to reflect depending on
          your issuing bank.
        </Paragraph>

        <SectionHeading>7. Our right to cancel</SectionHeading>
        <Paragraph>
          On very rare occasions we may need to cancel a booking due to
          circumstances beyond our control — mechanical failure of the
          assigned vehicle, driver illness, extreme weather closing a route,
          or a property withdrawing its availability. In those cases:
        </Paragraph>
        <List>
          <li>
            We&apos;ll offer a replacement vehicle, driver, or property of
            equivalent or higher standard where possible.
          </li>
          <li>
            If no acceptable alternative can be arranged, you receive a full
            refund of any amount paid.
          </li>
        </List>

        <SectionHeading>8. How to cancel or change a booking</SectionHeading>
        <Paragraph>
          The fastest way to change or cancel a booking is via WhatsApp,
          which reaches our operations team directly:
        </Paragraph>
        <ContactBlock>
          <strong>Cape Town Concierge</strong>
          <br />
          WhatsApp: <a href={`https://wa.me/${brand.whatsappNumber}`}>{brand.phone}</a>
          <br />
          Email: <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>
          <br />
          Please include your booking reference in the message.
        </ContactBlock>

        <SectionHeading>9. Changes to this policy</SectionHeading>
        <Paragraph>
          We may update this policy from time to time. The &ldquo;Last
          updated&rdquo; date at the top reflects the most recent change.
          The policy in force at the time your booking is confirmed applies
          for the duration of that booking.
        </Paragraph>
      </Article>
    </Wrapper>
  );
}
