"use client";

import HeroBanner from "../HeroBanner";
import FeaturedVehicles from "../FeaturedVehicles";
import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";
import styled from "styled-components";
import Button from "../../common/Button";
import {
  buildGeneralWhatsAppMessage,
  buildWhatsAppLink,
} from "../../../lib/whatsapp";
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

const serviceHighlights = [
  {
    title: "Airport Transfers",
    text: "Private Cape Town airport pickups and drop-offs with premium presentation, comfort, and punctual service.",
  },
  {
    title: "Full-Day Chauffeur Hire",
    text: "Book a chauffeur for private city travel, meetings, restaurants, shopping, and custom route planning across the day.",
  },
  {
    title: "Executive Travel",
    text: "A polished solution for business visitors, VIP guests, and clients who need dependable private transport in Cape Town.",
  },
  {
    title: "Private Touring",
    text: "Combine chauffeur service with scenic routes, Cape Peninsula travel, wine farms, and bespoke day itineraries.",
  },
];

const includedItems = [
  {
    title: "Professional Driver",
    text: "Travel with a reliable chauffeur focused on service, route planning, and a smooth guest experience throughout the journey.",
  },
  {
    title: "Luxury Vehicles",
    text: "Choose from premium chauffeur-driven vehicles suited to couples, families, executives, airport transfers, and private day hire.",
  },
  {
    title: "Flexible Itinerary",
    text: "Your route can be shaped around airport transfers, meetings, restaurants, private tours, wine farms, or scenic Cape Town travel.",
  },
];

const serviceFaqs = [
  {
    question: "What is included in your chauffeur service?",
    answer:
      "Every booking includes the vehicle, a professional PDP-licensed chauffeur, fuel, and toll fees. For airport transfers, your driver will track your flight and meet you at arrivals with a name board. For full-day hire, we plan the route around your schedule.",
  },
  {
    question: "Do you offer airport transfers in Cape Town?",
    answer:
      "Yes. We provide 24/7 premium airport transfers to and from Cape Town International Airport — meet and greet at arrivals, flight tracking, and luggage assistance included.",
  },
  {
    question: "Can I book a chauffeur for a full day?",
    answer:
      "Yes. Full-day private chauffeur hire is available for city travel, wine routes, meetings, restaurant runs, scenic drives, and bespoke itineraries. The day runs entirely on your schedule.",
  },
  {
    question: "Which vehicles are available?",
    answer:
      "Our fleet includes the BMW 5-Series, BMW X5, Hyundai Staria (8 seats), Mercedes Sprinter (14 seats), Mercedes V-Class (6 seats), and Range Rover Sport. All vehicles are premium, climate-controlled, and privately driven.",
  },
  {
    question: "Is a private chauffeur better than self-driving in Cape Town?",
    answer:
      "For most visitors, yes — especially for airport transfers, wine routes, and long scenic drives. You arrive relaxed, your group travels together, and there's no parking, no navigation, and no designated driver required.",
  },
];

export default function ChauffeurServicesPage({ vehicles = [] }: { vehicles?: FeaturedVehicleItem[] }) {

  const whatsappLink = buildWhatsAppLink(
    buildGeneralWhatsAppMessage("booking a chauffeur service in Cape Town")
  );

  return (
    <PageWrap>
      <HeroBanner
        eyebrow={brand.name}
        title="Chauffeur Service in Cape Town"
        description="Premium private chauffeur hire for airport transfers, full-day city travel, executive transport, and bespoke touring across Cape Town and the Western Cape."
        primaryCtaLabel="Book Chauffeur Service"
        primaryCtaHref={buildWhatsAppLink("Hi, I'd like to book a chauffeur service in Cape Town. Please can you assist?")}
        secondaryCtaLabel="View Fleet"
        secondaryCtaHref="#chauffeur-fleet"
        image="/images/hero-car.jpg"
        imageAlt="Luxury chauffeur service in Cape Town with premium private transport vehicles"
      />

      <Section>
        <Container>
          <Header>
            <Eyebrow>Private Chauffeur Travel</Eyebrow>
            <Title>Luxury Chauffeur Service for Cape Town Travel</Title>
            <Intro>
              Whether you need a polished airport transfer, a private driver for
              the day, or executive travel across Cape Town, our chauffeur
              service is built for comfort, flexibility, and a more premium way
              to move through the city.
            </Intro>
          </Header>

          <CardGrid>
            {serviceHighlights.map((item) => (
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
          title="Choose the Right Chauffeur Vehicle in Cape Town"
          description="Explore premium chauffeur-driven vehicles for airport transfers, executive transport, private travel, and full-day hire in Cape Town."
          items={vehicles}
        />
      </div>

      <Section>
        <Container>
          <Header>
            <Eyebrow>What Sets Us Apart</Eyebrow>
            <Title>The Premier Chauffeur Experience in Cape Town</Title>
            <Intro>
              A true chauffeur service should feel seamless, private, and dependable from the first message to the final drop-off.
            </Intro>
          </Header>

          <AuthorityWrap>
            <AuthorityCard>
              <AuthorityCardTitle>Why clients book us</AuthorityCardTitle>
              <RichText>
                <p>
                  Whether you need a seamless airport pickup, a private driver for the day, or a premium vehicle for executive travel — we build every booking around comfort, discretion, and your exact schedule. Our clients range from international travellers arriving at Cape Town International to business executives, VIP guests, and families who simply want to move through the city without the hassle.
                </p>
              </RichText>
            </AuthorityCard>

            <RichText>
              <p>
                Booking a chauffeur service in Cape Town should be about more
                than simply getting from one destination to another. It should
                feel private, smooth, and well-planned from start to finish. Our
                service is designed for travellers who value comfort,
                punctuality, presentation, and flexibility, whether for airport
                transfers, executive travel, or bespoke day hire.
              </p>

              <p>
                Many clients use our chauffeur service for full-day city travel,
                private dining plans, meetings, luxury shopping, scenic coastal
                routes, and tailor-made touring. It is especially valuable for
                travellers who want the convenience of private transport without
                the pressure of driving, navigating, parking, or coordinating
                several separate bookings.
              </p>

              <p>
                For couples, families, VIP guests, and business visitors, a
                private chauffeur in Cape Town creates a far more refined travel
                experience. It gives you the freedom to focus on your schedule,
                your comfort, and the overall quality of the journey rather than
                the logistics.
              </p>
            </RichText>
          </AuthorityWrap>
        </Container>
      </Section>

      <Section>
        <Container>
          <Header>
            <Eyebrow>What’s Included</Eyebrow>
            <Title>Built Around a Premium Guest Experience</Title>
            <Intro>
              Every booking is designed to make Cape Town travel feel more
              comfortable, more efficient, and more polished.
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
            <Eyebrow>Chauffeur Service FAQ</Eyebrow>
            <Title>Common Questions About Chauffeur Service in Cape Town</Title>
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
          <FinalTitle>Book Your Cape Town Chauffeur Service</FinalTitle>
          <FinalText>
            Message us on WhatsApp to check vehicle availability, get a price, or plan your full Cape Town itinerary. We respond within 30 minutes.
          </FinalText>

          <ButtonRow>
            <Anchor
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({ source: "chauffeur_services_cta", label: "Check Availability" })}
            >
              <Button as="span">Check Availability →</Button>
            </Anchor>
          </ButtonRow>
        </FinalCtaInner>
      </FinalCta>
    </PageWrap>
  );
}