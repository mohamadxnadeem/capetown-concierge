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
const trustCore = [
  {
    title: "Presentation & Discretion",
    text: "Smartly-presented PDP-licensed drivers, spotlessly kept vehicles, and a quiet, low-key manner of service. Your guest steps into the car and forgets the logistics ever existed.",
  },
  {
    title: "Punctuality, Flight Tracked",
    text: "Airport pickups track your inbound flight in real time. Your driver is on the kerb before the wheels touch the tarmac — early flight, late flight, or a diverted one.",
  },
  {
    title: "Reliability, Not Rideshare",
    text: "A named driver assigned to your booking and a named account manager in the office. No app roulette, no last-minute cancellations, no substitute cars you weren't expecting.",
  },
  {
    title: "One Point of Contact",
    text: "Message us on WhatsApp for the entire trip — quote, confirmation, driver details, live updates. Median response inside 30 minutes, seven days a week.",
  },
];

// Executive / Corporate section
const executiveBullets = [
  {
    title: "Trusted by executive assistants",
    text: "Assistants book us for CEOs, founders, and family principals visiting Cape Town. You brief us once. We handle the rest.",
  },
  {
    title: "Fixed pricing, no surge",
    text: "Every quote is flat and confirmed in writing before the trip. No fare estimates, no per-minute meters, no surprise supplements.",
  },
  {
    title: "Meet-and-greet at CPT arrivals",
    text: "Your driver waits inside the arrivals hall with a name board. Luggage is loaded straight into the boot. The car is on the kerb ready to move.",
  },
  {
    title: "Full-day executive hire",
    text: "Board meetings, back-to-back site visits, restaurant runs, off-site retreats — the same vehicle and the same driver stay with your principal for the day.",
  },
  {
    title: "Multi-day and multi-city",
    text: "One driver, multiple days. Extending into the Winelands, the Garden Route, or up to Hermanus? We plan the route and coordinate the overnights.",
  },
  {
    title: "Discreet, sensible drivers",
    text: "Our chauffeurs are experienced at driving VIP and executive guests. Conversation only if invited. Nothing leaves the car.",
  },
];

// Private / Leisure section
const leisureBullets = [
  {
    title: "Family-friendly by default",
    text: "Child seats and boosters on request, boot space for a proper family's luggage, and drivers who are patient and warm with kids.",
  },
  {
    title: "Wine-country day hire",
    text: "A chauffeur means nobody in your party is the designated driver. Stellenbosch, Franschhoek, Constantia — tasted properly, driven home safely.",
  },
  {
    title: "Scenic routes, unhurried",
    text: "Chapman's Peak, Cape Point, the Twelve Apostles — your driver knows where to stop for the view, and where the light is best late afternoon.",
  },
  {
    title: "Effortless multi-day trip",
    text: "One driver and one vehicle for the whole stay. Villas, restaurants, tours, transfers — coordinated together instead of booked separately every day.",
  },
];

const includedItems = [
  {
    title: "Professional PDP-Licensed Driver",
    text: "A named chauffeur assigned to your booking, fully licensed, focused on service, presentation, and route planning throughout the journey.",
  },
  {
    title: "Luxury Chauffeur-Driven Fleet",
    text: "Choose from a hand-picked fleet of premium vehicles for executive travel, family trips, airport transfers, and full-day chauffeur hire in Cape Town.",
  },
  {
    title: "Fully Flexible Itinerary",
    text: "Your route can be shaped around airport transfers, executive meetings, restaurants, private tours, wine farms, and scenic Cape Town travel — planned around your schedule.",
  },
];

const serviceFaqs = [
  {
    question: "What is included when I hire a chauffeur in Cape Town?",
    answer:
      "Every chauffeur hire booking includes the vehicle, a professional PDP-licensed chauffeur, fuel, and toll fees. For airport transfers your driver tracks your flight and meets you at arrivals with a name board. For full-day chauffeur hire we plan the route around your schedule.",
  },
  {
    question: "Do you offer chauffeur-driven airport transfers in Cape Town?",
    answer:
      "Yes. We provide 24/7 chauffeured airport transfers to and from Cape Town International — meet-and-greet at arrivals, real-time flight tracking, and luggage assistance are included in every transfer.",
  },
  {
    question: "Can I hire a chauffeur for a full day?",
    answer:
      "Yes. Full-day chauffeur hire is available for city travel, wine routes, meetings, restaurant runs, scenic drives, and bespoke itineraries. The day runs entirely on your schedule with the same driver and vehicle throughout.",
  },
  {
    question: "Which vehicles are available for chauffeur hire?",
    answer:
      "Our fleet includes the BMW 5-Series, BMW X5, Hyundai Staria (9 seats), Mercedes V-Class (6 seats), and Range Rover Sport. All vehicles are premium, climate-controlled, and privately driven — no ride-sharing.",
  },
  {
    question: "Is a private chauffeur better than self-driving in Cape Town?",
    answer:
      "For most visitors, yes — especially for airport transfers, wine routes, and long scenic drives. You arrive relaxed, your group travels together, and there's no parking, no navigation, and no designated driver required.",
  },
  {
    question: "How do we book a chauffeur for a visiting executive?",
    answer:
      "Message us on WhatsApp with the flight details, arrival time, hotel, and any onward schedule. We confirm the driver, the vehicle, and the flat fare in writing — usually within 30 minutes.",
  },
];

export default function ChauffeurServicesPage({ vehicles = [] }: { vehicles?: FeaturedVehicleItem[] }) {
  const whatsappLink = "https://wa.me/27636746131?text=Hi%2C+I%27d+like+to+enquire+about+chauffeur+hire+in+Cape+Town.+Please+assist.";

  const heroPool = vehicles.slice(0, 6);
  const heroImages = heroPool
    .map((v) => v.image)
    .filter((u): u is string => Boolean(u));
  const heroAlts = heroPool.map((v, i) =>
    i === 0
      ? `${v.title} — chauffeur hire in Cape Town with a professional private driver`
      : i === 1
      ? `Chauffeur hire in Cape Town — ${v.title} with luxury interior and vetted driver`
      : `${v.title} chauffeur-driven private hire, Cape Town`
  );

  return (
    <PageWrap>
      <HeroBanner
        eyebrow={brand.name}
        title="Chauffeur Hire in Cape Town"
        description="Private drivers and luxury vehicles for airport transfers, executive travel, and full-day chauffeur hire across Cape Town and the Western Cape. Flat pricing, PDP-licensed chauffeurs, meet-and-greet at Cape Town International."
        primaryCtaLabel="Enquire on WhatsApp"
        primaryCtaHref={whatsappLink}
        secondaryCtaLabel="View Fleet"
        secondaryCtaHref="#chauffeur-fleet"
        image="/images/hero-car.jpg"
        images={heroImages}
        imageAlt="Chauffeur hire in Cape Town — luxury private driver and premium vehicle"
        imageAlts={heroAlts}
      />

      <Section>
        <Container>
          <Header>
            <Eyebrow>Chauffeur Hire in Cape Town</Eyebrow>
            <Title>Private drivers and luxury vehicles, arranged properly</Title>
            <Intro>
              Chauffeur hire in Cape Town from a small, hand-run operation. A
              named driver, a hand-picked vehicle, one point of contact from
              the enquiry through to the last drop-off. Used equally by
              executive assistants booking transfers for principals, and by
              families here on holiday who want the trip to feel effortless.
            </Intro>
          </Header>

          <CardGrid>
            {trustCore.map((item) => (
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
          title="Choose Your Chauffeur-Driven Vehicle"
          description="The vehicles available for chauffeur hire in Cape Town, with real per-day pricing. Every car is climate-controlled, privately driven, and assigned to your booking — no ride-sharing."
          items={vehicles}
        />
      </div>

      <Section>
        <Container>
          <Header>
            <Eyebrow>Executive &amp; Corporate</Eyebrow>
            <Title>Executive chauffeur hire in Cape Town</Title>
            <Intro>
              Booking a driver for a CEO, founder, or family principal
              visiting Cape Town? This is the section for you. Below is what
              we handle without needing to be asked, so you can brief us once
              and go back to the rest of your day.
            </Intro>
          </Header>

          <AuthorityWrap>
            <AuthorityCard>
              <AuthorityCardTitle>What executive assistants use us for</AuthorityCardTitle>
              <BulletList>
                {executiveBullets.map((b) => (
                  <Bullet key={b.title}>
                    <strong>{b.title}</strong>
                    {b.text}
                  </Bullet>
                ))}
              </BulletList>
            </AuthorityCard>

            <RichText>
              <p>
                For an incoming executive the trip should be invisible. The
                car is where it is meant to be, the driver is smartly
                presented and waiting, luggage is loaded, and the ride to the
                hotel is quiet. That is the standard we work to on every
                executive chauffeur hire in Cape Town — whether it&apos;s a
                one-hour transfer from{" "}
                <Link href="/airport-transfers-cape-town" style={{color:"inherit"}}>
                  Cape Town International
                </Link>{" "}
                or a five-day multi-city schedule.
              </p>

              <p>
                We work in pairs: your driver on the road, and a single point
                of contact in the office you can message on WhatsApp for the
                entire booking. Flight delays, schedule changes, an extra
                stop on the way to the hotel — one message, sorted. No
                dispatch queue, no ticket numbers, no repeating yourself.
              </p>

              <p>
                Every quote is confirmed in writing before the trip, at a
                flat rate. There is no surge pricing, no per-minute meter,
                and no supplement for late-night arrivals. If the schedule
                changes on the day, we tell you the new price before we make
                the change — never after.
              </p>

              <p>
                The fleet is chosen with executive guests in mind: a BMW
                5-Series or Range Rover Sport for a solo principal, a
                Mercedes V-Class or BMW X5 for a family or a small
                delegation, a Hyundai Staria (9 seats) for a larger party.
                All climate-controlled, all recently kept, all driven by the
                same PDP-licensed chauffeurs.
              </p>
            </RichText>
          </AuthorityWrap>
        </Container>
      </Section>

      <Section>
        <Container>
          <Header>
            <Eyebrow>Private &amp; Family</Eyebrow>
            <Title>Chauffeur hire for private and family travel</Title>
            <Intro>
              The same standard of service for guests who are here for the
              trip itself — honeymoons, milestone birthdays, family holidays,
              and Winelands weekends. Discreet, unhurried, and shaped around
              how you want the day to feel.
            </Intro>
          </Header>

          <AuthorityWrap>
            <AuthorityCard>
              <AuthorityCardTitle>Private clients hire us to</AuthorityCardTitle>
              <BulletList>
                {leisureBullets.map((b) => (
                  <Bullet key={b.title}>
                    <strong>{b.title}</strong>
                    {b.text}
                  </Bullet>
                ))}
              </BulletList>
            </AuthorityCard>

            <RichText>
              <p>
                A private chauffeur across a holiday changes the shape of a
                Cape Town trip. Nobody is navigating, nobody is designated
                driver, nobody is watching the meter on a rideshare. You get
                out of the car at the top of Chapman&apos;s Peak, at the
                penguin colony, at the cellar door, at the restaurant. Then
                you get back in.
              </p>

              <p>
                For families with children we prepare boosters and child
                seats on request, and pick drivers who are patient and warm
                with younger passengers. Popular routes include{" "}
                <Link href="/tours/cape-peninsula-tour" style={{color:"inherit"}}>
                  the Cape Peninsula
                </Link>{" "}
                as a full day, an unhurried loop of the{" "}
                <Link href="/best-wine-farms-in-cape-town" style={{color:"inherit"}}>
                  Cape Winelands
                </Link>{" "}
                through Stellenbosch and Franschhoek, and quieter town
                mornings around the V&amp;A Waterfront and Kirstenbosch.
              </p>

              <p>
                For couples and honeymoons we tend to pair a Range Rover Sport
                or a Mercedes V-Class with a route planned for scenery and
                timing — the light along Chapman&apos;s Peak late afternoon,
                a stop at Boulders Beach before the crowds, dinner in Camps
                Bay to catch sunset over the Atlantic.
              </p>

              <p>
                We keep it low-key. Your driver is a courteous, seasoned
                professional who will offer local knowledge when asked and
                stay quietly out of the way when not. That balance —
                helpful, never intrusive — is what makes the trip feel
                private.
              </p>
            </RichText>
          </AuthorityWrap>
        </Container>
      </Section>

      <Section>
        <Container>
          <Header>
            <Eyebrow>What&rsquo;s Included</Eyebrow>
            <Title>Included with every chauffeur hire</Title>
            <Intro>
              Every booking is built to make Cape Town travel feel more
              comfortable, more efficient, and more polished — same
              standards whether you&apos;re here for a meeting or a holiday.
            </Intro>
          </Header>

          <IncludedGrid>
            {includedItems.map((item) => (
              <IncludedCard key={item.title}>
                <IncludedTitle>{item.title}</IncludedTitle>
                <IncludedText>{item.text}</IncludedText>
              </IncludedCard>
            ))}
          </IncludedGrid>
        </Container>
      </Section>

      <TestimonialsSection />
      <TestimonialsCta />

      <Section>
        <Container>
          <Header>
            <Eyebrow>Chauffeur Hire FAQ</Eyebrow>
            <Title>Common questions about chauffeur hire in Cape Town</Title>
          </Header>

          <FaqList>
            {serviceFaqs.map((item) => (
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
          <FinalTitle>Enquire about chauffeur hire in Cape Town</FinalTitle>
          <FinalText>
            Message us on WhatsApp with the dates, the arrival time, and how
            you want the trip to feel. We come back with a flat quote,
            usually within 30 minutes.
          </FinalText>

          <ButtonRow>
            <Anchor
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({ source: "chauffeur_hire_cta", label: "Enquire on WhatsApp" })}
            >
              <Button as="span">Enquire on WhatsApp →</Button>
            </Anchor>
          </ButtonRow>
        </FinalCtaInner>
      </FinalCta>
    </PageWrap>
  );
}
