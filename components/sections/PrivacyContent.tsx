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

export default function PrivacyContent() {
  const tt = useT();
  return (
    <Wrapper>
      <Article>
        <Eyebrow>{brand.name}</Eyebrow>
        <Title>{tt("PrivacyContent.privacy-policy")}</Title>
        <Updated>{tt("PrivacyContent.last-updated-16-may-2026")}</Updated>

        <Lead>
          {tt("PrivacyContent.cape-town-concierge-we-us")}</Lead>

        <Paragraph>
          {tt("PrivacyContent.this-policy-is-intended-to")}</Paragraph>

        <SectionHeading>{tt("PrivacyContent.1-information-we-collect")}</SectionHeading>
        <Paragraph>{tt("PrivacyContent.when-you-book-a-service")}</Paragraph>
        <List>
          <li>{tt("PrivacyContent.your-full-name")}</li>
          <li>{tt("PrivacyContent.phone-number-and-whatsapp-number")}</li>
          <li>{tt("PrivacyContent.email-address")}</li>
          <li>{tt("PrivacyContent.pickup-and-dropoff-locations")}</li>
          <li>{tt("PrivacyContent.trip-dates-times-and-any")}</li>
        </List>
        <Paragraph>
          {tt("PrivacyContent.we-also-collect-minimal-technical")}</Paragraph>

        <SectionHeading>{tt("PrivacyContent.2-how-we-use-your")}</SectionHeading>
        <Paragraph>{tt("PrivacyContent.we-use-the-information-you")}</Paragraph>
        <List>
          <li>{tt("PrivacyContent.coordinate-and-deliver-the-chauffeur")}</li>
          <li>{tt("PrivacyContent.communicate-with-you-about-your")}</li>
          <li>{tt("PrivacyContent.send-you-a-booking-confirmation")}</li>
          <li>{tt("PrivacyContent.respond-to-enquiries-you-send")}</li>
          <li>{tt("PrivacyContent.maintain-operational-records-of-our")}</li>
        </List>

        <SectionHeading>{tt("PrivacyContent.3-who-we-share-your")}</SectionHeading>
        <Paragraph>{tt("PrivacyContent.we-share-your-booking-details")}</Paragraph>
        <List>
          <li>
            {tt("PrivacyContent.the-driver-assigned-to-your")}</li>
          <li>
            {tt("PrivacyContent.payment-processors-e-g-yoco")}</li>
          <li>
            {tt("PrivacyContent.our-hosting-and-infrastructure-providers")}</li>
        </List>
        <Paragraph>
          {tt("PrivacyContent.we-do-not-sell-your")}</Paragraph>

        <SectionHeading>{tt("PrivacyContent.4-data-retention")}</SectionHeading>
        <Paragraph>
          {tt("PrivacyContent.we-retain-your-booking-records")}</Paragraph>

        <SectionHeading>{tt("PrivacyContent.5-your-rights")}</SectionHeading>
        <Paragraph>{tt("PrivacyContent.under-popia-you-have-the")}</Paragraph>
        <List>
          <li>{tt("PrivacyContent.access-the-personal-information-we")}</li>
          <li>{tt("PrivacyContent.correct-inaccurate-information")}</li>
          <li>
            {tt("PrivacyContent.request-that-we-delete-your")}</li>
          <li>{tt("PrivacyContent.object-to-processing-in-certain")}</li>
          <li>
            {tt("PrivacyContent.lodge-a-complaint-with-the")}</li>
        </List>
        <Paragraph>
          {tt("PrivacyContent.to-exercise-any-of-these")}</Paragraph>

        <SectionHeading>{tt("PrivacyContent.6-security")}</SectionHeading>
        <Paragraph>{tt("PrivacyContent.we-take-reasonable-steps-to")}</Paragraph>
        <List>
          <li>{tt("PrivacyContent.all-data-is-transmitted-over")}</li>
          <li>{tt("PrivacyContent.access-to-our-operational-systems")}</li>
          <li>
            {tt("PrivacyContent.we-use-trusted-cloud-providers")}</li>
        </List>
        <Paragraph>
          {tt("PrivacyContent.no-online-system-is-perfectly")}</Paragraph>

        <SectionHeading>{tt("PrivacyContent.7-cookies")}</SectionHeading>
        <Paragraph>
          {tt("PrivacyContent.our-website-uses-minimal-cookies")}</Paragraph>

        <SectionHeading>{tt("PrivacyContent.8-children")}</SectionHeading>
        <Paragraph>
          {tt("PrivacyContent.our-services-are-intended-for")}</Paragraph>

        <SectionHeading>{tt("PrivacyContent.9-changes-to-this-policy")}</SectionHeading>
        <Paragraph>
          {tt("PrivacyContent.we-may-update-this-policy")}</Paragraph>

        <SectionHeading>{tt("PrivacyContent.10-contact-us")}</SectionHeading>
        <Paragraph>
          {tt("PrivacyContent.for-any-privacy-related-question")}</Paragraph>
        <ContactBlock>
          <strong>{tt("PrivacyContent.cape-town-concierge")}</strong>
          <br />
          {tt("PrivacyContent.email")}{" "}<a href={tt.path(`mailto:${brand.contactEmail}`)}>{brand.contactEmail}</a>
          <br />
          {tt("PrivacyContent.whatsapp")}{" "}<a href={tt.path(`https://wa.me/${brand.whatsappNumber}`)}>{brand.phone}</a>
          <br />
          {tt("PrivacyContent.website")}{" "}<a href={tt.path(brand.siteUrl)}>{brand.siteUrl.replace(/^https?:\/\//, "")}</a>
        </ContactBlock>
      </Article>
    </Wrapper>
  );
}
