"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import styled from "styled-components";
import Container from "../../common/Container";
import Button from "../../common/Button";
import { buildWhatsAppLink, buildGeneralWhatsAppMessage } from "../../../lib/whatsapp";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { MULTI_DAY_INTRO, MULTI_DAY_STEPS } from "../../../lib/multiDay";
import type { GoogleReview } from "../../../lib/googleReviews";
import { ReviewCard } from "../testimonials/TestimonialsSection";

import { useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
const Band = styled.section<{ $soft?: boolean }>`
  padding: 72px 0;
  background: ${({ theme, $soft }) => ($soft ? theme.colors.backgroundSoft : theme.colors.background)};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

const H2 = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.8rem;
  }
`;

const Lead = styled.p`
  margin: 0 0 32px;
  max-width: 760px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const Cards = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SpecCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 28px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const SpecTitle = styled.h3`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.3rem;
`;

const SpecText = styled.p`
  margin: 0 0 20px;
  flex: 1;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
`;

const TextLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: underline;
`;

const SpecialismCards = (tt: TFunction) => ([
  {
    title: tt("HomeSections.private-chauffeured-drives"),
    text: tt("HomeSections.airport-transfers-business-travel-dinners"),
    label: tt("HomeSections.chauffeur-hire-in-cape-town"),
    href: "/chauffeur-hire",
  },
  {
    title: tt("HomeSections.day-tours"),
    text: tt("HomeSections.full-day-private-tours-of"),
    label: tt("HomeSections.see-day-tours"),
    href: "#tours",
  },
  {
    title: tt("HomeSections.multi-day-trips"),
    text: tt("HomeSections.the-same-chauffeur-and-vehicle"),
    label: tt("HomeSections.multi-day-trips-2"),
    // The /multi-day-chauffeur-cape-town page exists but is unlinked for now (King Mo, 2026-11-15).
    href: "#multi-day",
  },
]);

export function SpecialismsSection() {
  const tt = useT();
  return (
    <Band>
      <Container>
        <H2>{tt("HomeSections.our-chauffeur-service-in-cape")}</H2>
        <Cards style={{ marginTop: 28 }}>
          {SpecialismCards(tt).map((c) => (
            <SpecCard key={c.title}>
              <SpecTitle>{c.title}</SpecTitle>
              <SpecText>{c.text}</SpecText>
              <TextLink href={tt.path(c.href)}>{c.label}</TextLink>
            </SpecCard>
          ))}
        </Cards>
      </Container>
    </Band>
  );
}

const Steps = styled.ol`
  display: grid;
  gap: 16px;
  margin: 0 0 36px;
  padding: 0;
  list-style: none;
  counter-reset: step;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Step = styled.li`
  counter-increment: step;
  padding: 22px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 600;
  line-height: 1.5;

  &::before {
    content: counter(step);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    margin-bottom: 12px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    font-size: 0.95rem;
  }
`;

const ReviewGridWrap = styled.div`
  display: grid;
  gap: 18px;
  margin-bottom: 36px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export function ReviewGrid({ reviews }: { reviews: GoogleReview[] }) {
  const tt = useT();
  return (
    <ReviewGridWrap>
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </ReviewGridWrap>
  );
}

export function MultiDaySteps() {
  const tt = useT();
  return (
    <Steps>
      {MULTI_DAY_STEPS(tt).map((s) => (
        <Step key={s}>{s}</Step>
      ))}
    </Steps>
  );
}

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
`;

const Anchor = styled.a`
  display: inline-flex;
`;

const ScrollLink = styled.a`
  display: inline-flex;
`;

const QuoteNote = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`;

export function WhatsAppCta({
  source,
  label = "Plan on WhatsApp",
  context = "a multi-day chauffeur in Cape Town",
}: {
  source: string;
  label?: string;
  context?: string;
}) {
  return (
    <Anchor
      href={buildWhatsAppLink(buildGeneralWhatsAppMessage(context))}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick({ source, label })}
    >
      <Button as="span">{label}</Button>
    </Anchor>
  );
}

type MultiDayProps = {
  reviews: GoogleReview[];
  /** Slot for a row of package cards later. Renders nothing when empty. */
  packages?: ReactNode;
};

export function MultiDaySection({ reviews, packages }: MultiDayProps) {
  const tt = useT();
  return (
    <Band $soft id="multi-day">
      <Container>
        <H2>{tt("HomeSections.your-chauffeur-for-the-whole")}</H2>
        <Lead>{MULTI_DAY_INTRO(tt)}</Lead>
        <MultiDaySteps />
        {packages ? <div style={{ marginBottom: 36 }}>{packages}</div> : null}
        {reviews.length ? <ReviewGrid reviews={reviews} /> : null}
        <CtaRow>
          <ScrollLink href="#enquiry">
            <Button as="span">{tt("HomeSections.plan-my-trip")}</Button>
          </ScrollLink>
        </CtaRow>
      </Container>
    </Band>
  );
}

export { Band, H2, Lead, CtaRow, QuoteNote, TextLink };
