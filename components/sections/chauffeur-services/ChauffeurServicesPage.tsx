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

type FeaturedVehicleItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
  seats?: number;
  price?: string;
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
  background: #0b5b33;
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
    question: "What is included in your chauffeur service in Cape Town?",
    answer:
      "Our chauffeur service is designed around a premium private travel experience, typically including the vehicle, professional driver, and tailored route planning based on your itinerary.",
  },
  {
    question: "Do you offer airport transfers in Cape Town?",
    answer:
      "Yes, we provide premium airport transfers in Cape Town with professional chauffeurs and luxury vehicles suited to couples, families, and executive travellers.",
  },
  {
    question: "Can I book a chauffeur for a full day in Cape Town?",
    answer:
      "Yes, full-day private chauffeur hire is available for meetings, restaurants, city travel, scenic routes, wine estates, and bespoke itineraries.",
  },
  {
    question: "Which vehicles are available for chauffeur service?",
    answer:
      "Our fleet includes premium chauffeur-driven vehicles suited to executive travel, airport transfers, family transport, private day hire, and VIP group travel.",
  },
  {
    question: "Is private chauffeur service better than self-drive in Cape Town?",
    answer:
      "For many travellers, yes. A private chauffeur gives you more comfort, flexibility, and convenience, especially for airport transfers, wine routes, long scenic drives, and clients who want a more polished luxury experience.",
  },
];

export default function ChauffeurServicesPage({ vehicles = [] }: { vehicles?: FeaturedVehicleItem[] }) {

  const whatsappLink = buildWhatsAppLink(
    buildGeneralWhatsAppMessage("booking a chauffeur service in Cape Town")
  );

  return (
    <PageWrap>
      <HeroBanner
        eyebrow="Cape Town Concierge"
        title="Chauffeur Service in Cape Town"
        description="Book a luxury chauffeur service in Cape Town for airport transfers, executive travel, private driver hire, and bespoke day planning with premium vehicles and professional service."
        primaryCtaLabel="Book Chauffeur Service"
        primaryCtaHref="https://wa.me/27636746131?text=Hi%2C%20I%27d%20like%20to%20book%20a%20chauffeur%20service%20in%20Cape%20Town.%20Please%20can%20you%20assist%3F"
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
              <BulletList>
                <Bullet>Premium airport transfers with polished presentation</Bullet>
                <Bullet>Flexible full-day private chauffeur hire</Bullet>
                <Bullet>Executive travel and VIP guest transport</Bullet>
                <Bullet>Cape Town routes tailored around your timing</Bullet>
                <Bullet>Luxury vehicles suited to couples, families, and business travel</Bullet>
              </BulletList>
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
          <FinalTitle>Book Your Chauffeur Service in Cape Town</FinalTitle>
          <FinalText>
            Message us to check vehicle availability, airport transfer options,
            full-day chauffeur pricing, or a tailored private travel plan for
            your dates in Cape Town.
          </FinalText>

          <ButtonRow>
            <Anchor
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({ source: "chauffeur_services_cta", label: "Check Availability" })}
            >
              <Button as="span">Check Availability</Button>
            </Anchor>
          </ButtonRow>
        </FinalCtaInner>
      </FinalCta>
    </PageWrap>
  );
}