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

export default function PrivacyContent() {
  return (
    <Wrapper>
      <Article>
        <Eyebrow>{brand.name}</Eyebrow>
        <Title>Privacy Policy</Title>
        <Updated>Last updated: 16 May 2026</Updated>

        <Lead>
          Cape Town Concierge (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) provides luxury
          chauffeur and private tour services in Cape Town. This privacy policy
          explains how we collect, use, and protect personal information when
          you engage with us &mdash; through our website, WhatsApp, our booking
          management application, or in person.
        </Lead>

        <Paragraph>
          This policy is intended to comply with the Protection of Personal
          Information Act, 2013 (POPIA) of South Africa.
        </Paragraph>

        <SectionHeading>1. Information we collect</SectionHeading>
        <Paragraph>When you book a service with us, we collect:</Paragraph>
        <List>
          <li>Your full name</li>
          <li>Phone number and WhatsApp number</li>
          <li>Email address</li>
          <li>Pickup and dropoff locations</li>
          <li>Trip dates, times, and any specific requests you share with us</li>
        </List>
        <Paragraph>
          We also collect minimal technical information when you visit our
          website &mdash; anonymous analytics such as page views and device type.
        </Paragraph>

        <SectionHeading>2. How we use your information</SectionHeading>
        <Paragraph>We use the information you provide to:</Paragraph>
        <List>
          <li>Coordinate and deliver the chauffeur or tour service you booked</li>
          <li>Communicate with you about your booking via WhatsApp, phone, or email</li>
          <li>Send you a booking confirmation with the details of your trip</li>
          <li>Respond to enquiries you send us</li>
          <li>Maintain operational records of our services</li>
        </List>

        <SectionHeading>3. Who we share your information with</SectionHeading>
        <Paragraph>We share your booking details with:</Paragraph>
        <List>
          <li>
            The driver assigned to your trip &mdash; limited to your name, contact
            number, and pickup location, so they can perform the service
          </li>
          <li>
            Payment processors (e.g. Yoco) if you pay through a payment link we
            send you &mdash; limited to what is required to process the payment
          </li>
          <li>
            Our hosting and infrastructure providers (Railway, AWS, Apple,
            Google) &mdash; strictly to operate the service
          </li>
        </List>
        <Paragraph>
          We do NOT sell your information to third parties. We do not use it
          for marketing communications without your consent.
        </Paragraph>

        <SectionHeading>4. Data retention</SectionHeading>
        <Paragraph>
          We retain your booking records for as long as needed to provide the
          service, comply with our legal obligations (such as tax records),
          and resolve any disputes that may arise. You may request deletion of
          your records at any time, subject to those obligations (see &ldquo;Your
          rights&rdquo; below).
        </Paragraph>

        <SectionHeading>5. Your rights</SectionHeading>
        <Paragraph>Under POPIA you have the right to:</Paragraph>
        <List>
          <li>Access the personal information we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>
            Request that we delete your information (subject to our legal
            obligations)
          </li>
          <li>Object to processing in certain circumstances</li>
          <li>
            Lodge a complaint with the Information Regulator of South Africa
            (inforegulator.org.za)
          </li>
        </List>
        <Paragraph>
          To exercise any of these rights, contact us using the details at the
          end of this policy.
        </Paragraph>

        <SectionHeading>6. Security</SectionHeading>
        <Paragraph>We take reasonable steps to protect your information:</Paragraph>
        <List>
          <li>All data is transmitted over encrypted (HTTPS) connections</li>
          <li>Access to our operational systems is restricted to authorised staff</li>
          <li>
            We use trusted cloud providers (Railway, AWS) with industry-standard
            security practices
          </li>
        </List>
        <Paragraph>
          No online system is perfectly secure, but we work to keep your
          information safe.
        </Paragraph>

        <SectionHeading>7. Cookies</SectionHeading>
        <Paragraph>
          Our website uses minimal cookies &mdash; only those necessary for the
          site to function plus basic anonymous analytics. We do not use
          third-party advertising cookies.
        </Paragraph>

        <SectionHeading>8. Children</SectionHeading>
        <Paragraph>
          Our services are intended for adults (18+). We do not knowingly
          collect information from children. If you believe we have, please
          contact us and we will delete it.
        </Paragraph>

        <SectionHeading>9. Changes to this policy</SectionHeading>
        <Paragraph>
          We may update this policy from time to time. The &ldquo;Last updated&rdquo;
          date at the top reflects the most recent change. We encourage you to
          review the policy periodically.
        </Paragraph>

        <SectionHeading>10. Contact us</SectionHeading>
        <Paragraph>
          For any privacy-related question or to exercise your rights, contact:
        </Paragraph>
        <ContactBlock>
          <strong>Cape Town Concierge</strong>
          <br />
          Email: <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>
          <br />
          WhatsApp: <a href={`https://wa.me/${brand.whatsappNumber}`}>{brand.phone}</a>
          <br />
          Website: <a href={brand.siteUrl}>{brand.siteUrl.replace(/^https?:\/\//, "")}</a>
        </ContactBlock>
      </Article>
    </Wrapper>
  );
}
