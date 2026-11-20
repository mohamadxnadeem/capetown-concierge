"use client";

import styled from "styled-components";
import { brand } from "../../lib/brand";

import { useT } from "../../lib/i18n/LocaleContext";
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
  const tt = useT();
  return (
    <Wrapper>
      <Article>
        <Eyebrow>{brand.name}</Eyebrow>
        <Title>{tt("CancellationPolicyContent.cancellation-policy")}</Title>
        <Updated>{tt("CancellationPolicyContent.last-updated-25-june-2026")}</Updated>

        <Lead>
          {tt("CancellationPolicyContent.this-policy-explains-how-cancellations")}</Lead>

        <SectionHeading>{tt("CancellationPolicyContent.1-chauffeur-hire-day-tours")}</SectionHeading>
        <Paragraph>
          {tt("CancellationPolicyContent.bookings-for-chauffeur-services-and")}</Paragraph>
        <List>
          <li>
            <strong>{tt("CancellationPolicyContent.more-than-72-hours-before")}</strong>{tt("CancellationPolicyContent.free-cancellation-full-refund-of")}</li>
          <li>
            <strong>{tt("CancellationPolicyContent.between-48-and-72-hours")}</strong>{tt("CancellationPolicyContent.50-of-the-trip-fee")}</li>
          <li>
            <strong>{tt("CancellationPolicyContent.less-than-48-hours-before")}</strong>{tt("CancellationPolicyContent.the-full-trip-fee-is")}</li>
          <li>
            <strong>{tt("CancellationPolicyContent.no-show-on-the-day")}</strong>{tt("CancellationPolicyContent.the-full-trip-fee-is-2")}</li>
        </List>
        <Paragraph>
          {tt("CancellationPolicyContent.flight-delays-medical-emergencies-and")}</Paragraph>

        <SectionHeading>{tt("CancellationPolicyContent.2-airport-transfers")}</SectionHeading>
        <List>
          <li>
            <strong>{tt("CancellationPolicyContent.more-than-24-hours-before")}</strong>{tt("CancellationPolicyContent.free-cancellation")}</li>
          <li>
            <strong>{tt("CancellationPolicyContent.less-than-24-hours-before")}</strong>{tt("CancellationPolicyContent.50-of-the-transfer-fee")}</li>
          <li>
            <strong>{tt("CancellationPolicyContent.no-show")}</strong>{tt("CancellationPolicyContent.full-transfer-fee-is-due")}</li>
          <li>
            {tt("CancellationPolicyContent.flight-tracked-airport-transfers-automatically")}</li>
        </List>

        <SectionHeading>{tt("CancellationPolicyContent.3-villa-hotel-stays")}</SectionHeading>
        <Paragraph>
          {tt("CancellationPolicyContent.accommodation-cancellations-follow-the-individual")}</Paragraph>
        <List>
          <li>
            <strong>{tt("CancellationPolicyContent.more-than-60-days-before")}</strong>{tt("CancellationPolicyContent.deposit-refundable-less-a-small")}</li>
          <li>
            <strong>{tt("CancellationPolicyContent.30-to-60-days-before")}</strong>{tt("CancellationPolicyContent.deposit-is-non-refundable-balance")}</li>
          <li>
            <strong>{tt("CancellationPolicyContent.less-than-30-days-before")}</strong>{tt("CancellationPolicyContent.full-booking-value-is-due")}</li>
          <li>
            <strong>{tt("CancellationPolicyContent.peak-season")}</strong> {tt("CancellationPolicyContent.mid-december-to-mid-january")}</li>
        </List>
        <Paragraph>
          {tt("CancellationPolicyContent.where-a-villa-or-hotel")}</Paragraph>

        <SectionHeading>{tt("CancellationPolicyContent.4-combined-trip-packages")}</SectionHeading>
        <Paragraph>
          {tt("CancellationPolicyContent.where-a-booking-includes-a")}</Paragraph>

        <SectionHeading>{tt("CancellationPolicyContent.5-changes-re-scheduling")}</SectionHeading>
        <Paragraph>
          {tt("CancellationPolicyContent.we-ll-always-try-to")}</Paragraph>
        <List>
          <li>
            {tt("CancellationPolicyContent.chauffeur-and-tour-re-scheduling")}</li>
          <li>
            {tt("CancellationPolicyContent.accommodation-date-changes-are-subject")}</li>
        </List>

        <SectionHeading>{tt("CancellationPolicyContent.6-refunds")}</SectionHeading>
        <Paragraph>
          {tt("CancellationPolicyContent.refunds-are-processed-to-the")}</Paragraph>

        <SectionHeading>{tt("CancellationPolicyContent.7-our-right-to-cancel")}</SectionHeading>
        <Paragraph>
          {tt("CancellationPolicyContent.on-very-rare-occasions-we")}</Paragraph>
        <List>
          <li>
            {tt("CancellationPolicyContent.we-ll-offer-a-replacement")}</li>
          <li>
            {tt("CancellationPolicyContent.if-no-acceptable-alternative-can")}</li>
        </List>

        <SectionHeading>{tt("CancellationPolicyContent.8-how-to-cancel-or")}</SectionHeading>
        <Paragraph>
          {tt("CancellationPolicyContent.the-fastest-way-to-change")}</Paragraph>
        <ContactBlock>
          <strong>{tt("CancellationPolicyContent.cape-town-concierge")}</strong>
          <br />
          {tt("CancellationPolicyContent.whatsapp")}{" "}<a href={tt.path(`https://wa.me/${brand.whatsappNumber}`)}>{brand.phone}</a>
          <br />
          {tt("CancellationPolicyContent.email")}{" "}<a href={tt.path(`mailto:${brand.contactEmail}`)}>{brand.contactEmail}</a>
          <br />
          {tt("CancellationPolicyContent.please-include-your-booking-reference")}</ContactBlock>

        <SectionHeading>{tt("CancellationPolicyContent.9-changes-to-this-policy")}</SectionHeading>
        <Paragraph>
          {tt("CancellationPolicyContent.we-may-update-this-policy")}</Paragraph>
      </Article>
    </Wrapper>
  );
}
