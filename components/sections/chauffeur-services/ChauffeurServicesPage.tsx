"use client";

import HeroBanner from "../HeroBanner";
import FeaturedVehicles from "../FeaturedVehicles";
import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";
import styled from "styled-components";
import Button from "../../common/Button";
import Link from "next/link";
import { trackWhatsAppClick } from "../../../lib/tracking";
import { brand } from "../../../lib/brand";

import { useT } from "../../../lib/i18n/LocaleContext";
import type { TFunction } from "../../../lib/i18n/messages";
type FeaturedVehicleItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  seats?: number;
  priceUsd?: number;
};

const PageWrap = styled.main`
  background: ${({ theme }) => theme.colors.background};
`;

const Section = styled.section`
  padding: 72px 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 96px 0;
  }
`;

const Container = styled.div`
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(1120px, calc(100% - 64px));
  }
`;

const Header = styled.div`
  max-width: 760px;
  margin-bottom: 28px;
`;

const Eyebrow = styled.div`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const Intro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.9;
`;

const CardGrid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const Card = styled.div`
  padding: 22px;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const CardTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.02rem;
  line-height: 1.2;
`;

const CardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  font-size: 0.95rem;
`;

const AuthorityWrap = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 0.95fr 1.05fr;
    align-items: start;
  }
`;

const AuthorityCard = styled.div`
  padding: 24px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const AuthorityCardTitle = styled.h3`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.08rem;
  line-height: 1.2;
`;

const BulletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Bullet = styled.div`
  padding: 12px 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;

  strong {
    color: ${({ theme }) => theme.colors.heading};
    display: block;
    margin-bottom: 2px;
  }
`;

const RichText = styled.div`
  padding: 24px;
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  p {
    margin: 0 0 16px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.9;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const IncludedGrid = styled.div`
  display: grid;
  gap: 18px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const IncludedCard = styled.div`
  padding: 24px;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const IncludedTitle = styled.h3`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.05rem;
`;

const IncludedText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FaqItem = styled.details`
  padding: 20px 22px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};

  &[open] {
    border-color: rgba(11, 91, 51, 0.18);
  }
`;

const FaqQuestion = styled.summary`
  cursor: pointer;
  list-style: none;
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  line-height: 1.5;

  &::-webkit-details-marker {
    display: none;
  }
`;

const FaqAnswer = styled.p`
  margin: 14px 0 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.85;
`;

const FinalCta = styled.section`
  padding: 84px 0;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
`;

const FinalCtaInner = styled.div`
  width: min(980px, calc(100% - 32px));
  margin: 0 auto;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: min(980px, calc(100% - 64px));
  }
`;

const FinalTitle = styled.h2`
  margin: 0 0 14px;
  font-size: 2.1rem;
  line-height: 1.08;
`;

const FinalText = styled.p`
  margin: 0 auto 22px;
  max-width: 760px;
  line-height: 1.85;
  color: rgba(255, 255, 255, 0.9);
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
`;

const Anchor = styled.a`
  display: inline-flex;
  text-decoration: none;
`;

// ─── Content ────────────────────────────────────────────────────────

// Trust core — the shared promise for the executive assistant and the
// leisure principal. Every claim below is already verified live copy.
const trustCore = (tt: TFunction) => ([
  {
    title: tt("ChauffeurServicesPage.presentation-discretion"),
    text: tt("ChauffeurServicesPage.smartly-presented-pdp-licensed-drivers"),
  },
  {
    title: tt("ChauffeurServicesPage.punctuality-flight-tracked"),
    text: tt("ChauffeurServicesPage.airport-pickups-track-your-inbound"),
  },
  {
    title: tt("ChauffeurServicesPage.reliability-not-rideshare"),
    text: tt("ChauffeurServicesPage.a-named-driver-assigned-to"),
  },
  {
    title: tt("ChauffeurServicesPage.one-point-of-contact"),
    text: tt("ChauffeurServicesPage.message-us-on-whatsapp-for"),
  },
]);

// Executive / Corporate section
const executiveBullets = (tt: TFunction) => ([
  {
    title: tt("ChauffeurServicesPage.trusted-by-executive-assistants"),
    text: tt("ChauffeurServicesPage.assistants-book-us-for-ceos"),
  },
  {
    title: tt("ChauffeurServicesPage.fixed-pricing-no-surge"),
    text: tt("ChauffeurServicesPage.every-quote-is-flat-and"),
  },
  {
    title: tt("ChauffeurServicesPage.meet-and-greet-at-cpt"),
    text: tt("ChauffeurServicesPage.your-driver-waits-inside-the"),
  },
  {
    title: tt("ChauffeurServicesPage.full-day-executive-hire"),
    text: tt("ChauffeurServicesPage.board-meetings-back-to-back"),
  },
  {
    title: tt("ChauffeurServicesPage.multi-day-and-multi-city"),
    text: tt("ChauffeurServicesPage.one-driver-multiple-days-extending"),
  },
  {
    title: tt("ChauffeurServicesPage.discreet-sensible-drivers"),
    text: tt("ChauffeurServicesPage.our-chauffeurs-are-experienced-at"),
  },
]);

// Private / Leisure section
const leisureBullets = (tt: TFunction) => ([
  {
    title: tt("ChauffeurServicesPage.family-friendly-by-default"),
    text: tt("ChauffeurServicesPage.child-seats-and-boosters-on"),
  },
  {
    title: tt("ChauffeurServicesPage.wine-country-day-hire"),
    text: tt("ChauffeurServicesPage.a-chauffeur-means-nobody-in"),
  },
  {
    title: tt("ChauffeurServicesPage.scenic-routes-unhurried"),
    text: tt("ChauffeurServicesPage.chapman-s-peak-cape-point"),
  },
  {
    title: tt("ChauffeurServicesPage.effortless-multi-day-trip"),
    text: tt("ChauffeurServicesPage.one-driver-and-one-vehicle"),
  },
]);

const includedItems = (tt: TFunction) => ([
  {
    title: tt("ChauffeurServicesPage.professional-pdp-licensed-driver"),
    text: tt("ChauffeurServicesPage.a-named-chauffeur-assigned-to"),
  },
  {
    title: tt("ChauffeurServicesPage.luxury-chauffeur-driven-fleet"),
    text: tt("ChauffeurServicesPage.choose-from-a-hand-picked"),
  },
  {
    title: tt("ChauffeurServicesPage.fully-flexible-itinerary"),
    text: tt("ChauffeurServicesPage.your-route-can-be-shaped"),
  },
]);

const serviceFaqs = (tt: TFunction) => ([
  {
    question: tt("ChauffeurServicesPage.what-is-included-when-i"),
    answer:
      tt("ChauffeurServicesPage.every-chauffeur-hire-booking-includes"),
  },
  {
    question: tt("ChauffeurServicesPage.do-you-offer-chauffeur-driven"),
    answer:
      tt("ChauffeurServicesPage.yes-we-provide-24-7"),
  },
  {
    question: tt("ChauffeurServicesPage.can-i-hire-a-chauffeur"),
    answer:
      tt("ChauffeurServicesPage.yes-full-day-chauffeur-hire"),
  },
  {
    question: tt("ChauffeurServicesPage.which-vehicles-are-available-for"),
    answer:
      tt("ChauffeurServicesPage.our-fleet-includes-the-bmw"),
  },
  {
    question: tt("ChauffeurServicesPage.is-a-private-chauffeur-better"),
    answer:
      tt("ChauffeurServicesPage.for-most-visitors-yes-especially"),
  },
  {
    question: tt("ChauffeurServicesPage.how-do-we-book-a"),
    answer:
      tt("ChauffeurServicesPage.message-us-on-whatsapp-with"),
  },
]);

export default function ChauffeurServicesPage({ vehicles = [] }: { vehicles?: FeaturedVehicleItem[] }) {
  const tt = useT();
  const whatsappLink = "https://wa.me/27636746131?text=Hi%2C+I%27d+like+to+enquire+about+chauffeur+hire+in+Cape+Town.+Please+assist.";

  const heroPool = vehicles.slice(0, 6);
  const heroImages = heroPool
    .map((v) => v.image)
    .filter((u): u is string => Boolean(u));
  const heroAlts = heroPool.map((v, i) =>
    i === 0
      ? tt("ChauffeurServicesPage.chauffeur-hire-in-cape-town", { title: v.title })
      : i === 1
      ? tt("ChauffeurServicesPage.chauffeur-hire-in-cape-town-2", { title: v.title })
      : tt("ChauffeurServicesPage.chauffeur-driven-private-hire-cape", { title: v.title })
  );

  return (
    <PageWrap>
      <HeroBanner
        eyebrow={brand.name}
        title={tt("ChauffeurServicesPage.chauffeur-hire-in-cape-town-3")}
        description="Chauffeur hire in Cape Town with private drivers and luxury vehicles for airport transfers, executive travel and full days across the Western Cape. Flat pricing, PDP-licensed chauffeurs, meet-and-greet at Cape Town International."
        primaryCtaLabel="Enquire on WhatsApp"
        primaryCtaHref={whatsappLink}
        secondaryCtaLabel="View Fleet"
        secondaryCtaHref="#chauffeur-fleet"
        image="/images/hero-car.jpg"
        images={heroImages}
        imageAlt="Chauffeur hire in Cape Town, luxury private driver and premium vehicle"
        imageAlts={heroAlts}
      />

      <Section>
        <Container>
          <Header>
            <Eyebrow>{tt("ChauffeurServicesPage.chauffeur-hire-in-cape-town-3")}</Eyebrow>
            <Title>{tt("ChauffeurServicesPage.private-drivers-and-luxury-vehicles")}</Title>
            <Intro>
              {tt("ChauffeurServicesPage.chauffeur-hire-in-cape-town-4")}{" "}
              <Link href={tt.path("/")} style={{ color: "inherit", textDecoration: "underline" }}>
                {tt("ChauffeurServicesPage.chauffeur-service")}</Link>{" "}
              {tt("ChauffeurServicesPage.we-offer-across-the-cape")}</Intro>
          </Header>

          <CardGrid>
            {trustCore(tt).map((item) => (
              <Card key={item.title}>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.text}</CardText>
              </Card>
            ))}
          </CardGrid>
        </Container>
      </Section>

      <div id="chauffeur-fleet">
        <FeaturedVehicles
          eyebrow="Luxury Fleet"
          title={tt("ChauffeurServicesPage.choose-your-chauffeur-driven-vehicle")}
          description="The vehicles available for chauffeur hire in Cape Town, with real per-day pricing. Every car is climate-controlled, privately driven, and assigned to your booking, with no ride-sharing."
          items={vehicles}
        />
      </div>

      <Section>
        <Container>
          <Header>
            <Eyebrow>{tt("ChauffeurServicesPage.executive-corporate")}</Eyebrow>
            <Title>{tt("ChauffeurServicesPage.executive-chauffeur-hire-in-cape")}</Title>
            <Intro>
              {tt("ChauffeurServicesPage.booking-a-driver-for-a")}</Intro>
          </Header>

          <AuthorityWrap>
            <AuthorityCard>
              <AuthorityCardTitle>{tt("ChauffeurServicesPage.what-executive-assistants-use-us")}</AuthorityCardTitle>
              <BulletList>
                {executiveBullets(tt).map((b) => (
                  <Bullet key={b.title}>
                    <strong>{b.title}</strong>
                    {b.text}
                  </Bullet>
                ))}
              </BulletList>
            </AuthorityCard>

            <RichText>
              <p>
                {tt("ChauffeurServicesPage.for-an-incoming-executive-the")}{" "}
                <Link href={tt.path("/airport-transfers-cape-town")} style={{color:"inherit"}}>
                  {tt("ChauffeurServicesPage.cape-town-international")}</Link>{" "}
                {tt("ChauffeurServicesPage.or-a-five-day-multi")}</p>

              <p>
                {tt("ChauffeurServicesPage.we-work-in-pairs-your")}</p>

              <p>
                {tt("ChauffeurServicesPage.every-quote-is-confirmed-in")}</p>

              <p>
                {tt("ChauffeurServicesPage.the-fleet-is-chosen-with")}</p>
            </RichText>
          </AuthorityWrap>
        </Container>
      </Section>

      <Section>
        <Container>
          <Header>
            <Eyebrow>{tt("ChauffeurServicesPage.private-family")}</Eyebrow>
            <Title>{tt("ChauffeurServicesPage.chauffeur-hire-for-private-and")}</Title>
            <Intro>
              {tt("ChauffeurServicesPage.the-same-standard-of-service")}</Intro>
          </Header>

          <AuthorityWrap>
            <AuthorityCard>
              <AuthorityCardTitle>{tt("ChauffeurServicesPage.private-clients-hire-us-to")}</AuthorityCardTitle>
              <BulletList>
                {leisureBullets(tt).map((b) => (
                  <Bullet key={b.title}>
                    <strong>{b.title}</strong>
                    {b.text}
                  </Bullet>
                ))}
              </BulletList>
            </AuthorityCard>

            <RichText>
              <p>
                {tt("ChauffeurServicesPage.a-private-chauffeur-across-a")}</p>

              <p>
                {tt("ChauffeurServicesPage.for-families-with-children-we")}{" "}
                <Link href={tt.path("/tours/cape-peninsula-tour")} style={{color:"inherit"}}>
                  {tt("ChauffeurServicesPage.the-cape-peninsula")}</Link>{" "}
                {tt("ChauffeurServicesPage.as-a-full-day-an")}{" "}
                <Link href={tt.path("/best-wine-farms-in-cape-town")} style={{color:"inherit"}}>
                  {tt("ChauffeurServicesPage.cape-winelands")}</Link>{" "}
                {tt("ChauffeurServicesPage.through-stellenbosch-and-franschhoek-and")}</p>

              <p>
                {tt("ChauffeurServicesPage.for-couples-and-honeymoons-we")}</p>

              <p>
                {tt("ChauffeurServicesPage.we-keep-it-low-key")}</p>
            </RichText>
          </AuthorityWrap>
        </Container>
      </Section>

      <Section>
        <Container>
          <Header>
            <Eyebrow>{tt("ChauffeurServicesPage.what-s-included")}</Eyebrow>
            <Title>{tt("ChauffeurServicesPage.included-with-every-chauffeur-hire")}</Title>
            <Intro>
              {tt("ChauffeurServicesPage.every-booking-is-built-to")}</Intro>
          </Header>

          <IncludedGrid>
            {includedItems(tt).map((item) => (
              <IncludedCard key={item.title}>
                <IncludedTitle>{item.title}</IncludedTitle>
                <IncludedText>{item.text}</IncludedText>
              </IncludedCard>
            ))}
          </IncludedGrid>
        </Container>
      </Section>

      <TestimonialsSection tags={["chauffeur"]} />
      <TestimonialsCta />

      <Section>
        <Container>
          <Header>
            <Eyebrow>{tt("ChauffeurServicesPage.chauffeur-hire-faq")}</Eyebrow>
            <Title>{tt("ChauffeurServicesPage.common-questions-about-chauffeur-hire")}</Title>
          </Header>

          <FaqList>
            {serviceFaqs(tt).map((item) => (
              <FaqItem key={item.question}>
                <FaqQuestion>{item.question}</FaqQuestion>
                <FaqAnswer>{item.answer}</FaqAnswer>
              </FaqItem>
            ))}
          </FaqList>
        </Container>
      </Section>

      <FinalCta>
        <FinalCtaInner>
          <FinalTitle>{tt("ChauffeurServicesPage.enquire-about-chauffeur-hire-in")}</FinalTitle>
          <FinalText>
            {tt("ChauffeurServicesPage.message-us-on-whatsapp-with-2")}</FinalText>

          <ButtonRow>
            <Anchor
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({ source: "chauffeur_hire_cta", label: "Enquire on WhatsApp" })}
            >
              <Button as="span">{tt("ChauffeurServicesPage.enquire-on-whatsapp")}</Button>
            </Anchor>
          </ButtonRow>
        </FinalCtaInner>
      </FinalCta>
    </PageWrap>
  );
}
