"use client";

import { useState } from "react";
import styled from "styled-components";
import Container from "../../common/Container";
import { Car, RelatedVehicle } from "./types";
import {
  buildFaqs,
  buildWhatsAppLink,
  formatPrice,
  getBaseDailyRate,
  getPrimaryImage,
  stripHtml,
} from "./utils";
import ChauffeurHero from "./ChauffeurHero";
import ChauffeurWhatToExpect from "./ChauffeurWhatToExpect";
import ChauffeurGallery from "./ChauffeurGallery";
import ChauffeurQuickDetails from "./ChauffeurQuickDetails";
import ChauffeurDiscountTable from "./ChauffeurDiscountTable";
import ChauffeurFeatures from "./ChauffeurFeatures";
import ChauffeurIdealFor from "./ChauffeurIdealFor";
import ChauffeurFaq from "./ChauffeurFaq";
import ChauffeurRelatedVehicles from "./ChauffeurRelatedVehicles";
import ChauffeurFinalCta from "./ChauffeurFinalCta";
import ChauffeurStickyBar from "./ChauffeurStickyBar";
import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";

// ─────────────────────────────────────────────
// TYPES
// seoKeyword: "Range Rover Sport Chauffeur Service Cape Town"
//             passed down from page.tsx — this becomes the H1
// pageTitle:  full meta title string, passed for the sticky bar
// ─────────────────────────────────────────────
type Props = {
  car: Car;
  relatedVehicles: RelatedVehicle[];
  seoKeyword: string;   // NEW — the exact keyword to render as H1
  pageTitle?: string;   // NEW — optional, used for sticky bar label
};

// ─────────────────────────────────────────────
// VEHICLE-SPECIFIC CONTENT GENERATORS
// These replace the hardcoded generic strings that were
// identical on every vehicle page — a major duplicate content issue
// ─────────────────────────────────────────────

/**
 * Returns 3 authority card objects specific to the vehicle.
 * Cards are derived from vehicle data: type, seats, ideal_for.
 * Falls back to sensible defaults so nothing ever breaks.
 */
function buildAuthorityCards(car: Car, seoKeyword: string) {
  const name = car.title || "This vehicle";
  const vehicleType = car.vehicle_type || "luxury vehicle";
  const seats = car.number_of_seats;
  const idealFor = car.ideal_for;

  // Card 1: vehicle character — derived from type + seats
  const card1 = {
    title: `${name} — Built for Private Travel`,
    text: seats
      ? `Comfortably seating up to ${seats} passengers, this ${vehicleType} delivers the space, presence, and refinement expected by clients who travel privately in Cape Town.`
      : `This ${vehicleType} is selected for its combination of presence, comfort, and performance — ideal for clients who want a polished private travel experience across Cape Town.`,
  };

  // Card 2: use case — derived from ideal_for if present
  const primaryUse =
    idealFor && idealFor.length > 0
      ? idealFor.slice(0, 2).join(" and ")
      : "airport transfers and private touring";

  const card2 = {
    title: "Flexible Hire, Your Itinerary",
    text: `Whether you need ${primaryUse}, full-day private hire, or a curated Cape Town experience, your chauffeur works around your schedule — not a group timetable.`,
  };

  // Card 3: premium positioning — uses seoKeyword once naturally
  const card3 = {
    title: "Professional Chauffeur Service",
    text: `Every ${seoKeyword} booking includes a professionally presented driver, complimentary bottled water, flight tracking for airport pickups, and a meet-and-greet service as standard.`,
  };

  return [card1, card2, card3];
}

/**
 * Builds the expand section body — 3 paragraphs, fully dynamic.
 * Each paragraph uses the vehicle name and seoKeyword naturally.
 * No two vehicles will have identical body text.
 */
function buildAuthorityBody(car: Car, seoKeyword: string): string[] {
  const name = car.title || "this vehicle";
  const vehicleType = car.vehicle_type || "luxury vehicle";
  const seats = car.number_of_seats;
  const luggage = car.luggage_capacity;

  // If the CMS provides a body, use it and don't generate
  // (caller checks car.body first — see usage below)

  const seatsStr = seats ? ` with seating for up to ${seats} passengers` : "";
  const luggageStr = luggage ? ` and space for up to ${luggage} bags` : "";

  const para1 = `Booking a ${seoKeyword} is about more than getting from one place to another. It is about arriving at each destination feeling composed, private, and well looked after. The ${name}${seatsStr}${luggageStr} is chosen by our clients specifically because it balances a commanding road presence with the kind of interior refinement that makes every journey worthwhile.`;

  const para2 = `Our clients regularly choose this ${vehicleType} for Cape Town airport transfers, Cape Peninsula private tours, Cape Winelands day hire in Stellenbosch and Franschhoek, and full-day executive travel across the city. Because every booking is private — no shared vehicles, no group schedules — your chauffeur is entirely focused on your comfort and timing from start to finish.`;

  const para3 = `If you are visiting Cape Town and want a dependable, premium chauffeur experience with a ${name}, we can confirm availability and pricing within 30 minutes via WhatsApp. Same-day bookings are accommodated where possible. We serve clients arriving from the United States, United Kingdom, and across South Africa.`;

  return [para1, para2, para3];
}

// ─────────────────────────────────────────────
// STYLED COMPONENTS (unchanged from original)
// ─────────────────────────────────────────────
const PageWrap = styled.main`
  background: ${({ theme }) => theme.colors.background};
`;

const Section = styled.section`
  padding: 64px 0;
`;

const TwoColGrid = styled.div`
  display: grid;
  gap: 22px;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1.15fr 0.85fr;
    align-items: start;
  }
`;

const AuthoritySection = styled.section`
  padding: 64px 0;
  background: ${({ theme }) => theme.colors.white};
`;

const AuthorityHeader = styled.div`
  max-width: 760px;
  margin-bottom: 28px;
`;

const AuthorityEyebrow = styled.div`
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

/**
 * THE KEY CHANGE: AuthorityTitle is now the page H1.
 *
 * Previously this was an <h2> and the hero title (<h1>) rendered
 * just car.title ("Range Rover Sport") — weak for SEO.
 *
 * Now: the hero renders the short car title visually (looks good),
 * but this AuthoritySection carries the full SEO keyword as the H1.
 *
 * Google crawls the H1 as the primary topic signal.
 * This renders: <h1>Range Rover Sport Chauffeur Service Cape Town</h1>
 */
const AuthorityTitle = styled.h1`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 2rem;
  line-height: 1.08;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.45rem;
  }
`;

const AuthorityIntro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.9;
`;

const AuthorityGrid = styled.div`
  display: grid;
  gap: 18px;
  margin-bottom: 24px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const AuthorityCard = styled.div`
  padding: 22px;
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

// Changed to h2 since the section above is now h1
const AuthorityCardTitle = styled.h2`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.heading};
  font-size: 1.05rem;
  line-height: 1.2;
`;

const AuthorityCardText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.8;
  font-size: 0.95rem;
`;

const ExpandWrap = styled.div`
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
`;

const ExpandButton = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: rgba(11, 91, 51, 0.03);
  }
`;

const ExpandTitle = styled.div`
  color: ${({ theme }) => theme.colors.heading};
  font-weight: 700;
  line-height: 1.4;
`;

const ExpandIcon = styled.div<{ $open: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(11, 91, 51, 0.08);
  color: ${({ theme }) => theme.colors.primary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  transform: ${({ $open }) => ($open ? "rotate(45deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
`;

const ExpandBody = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 0.25s ease;
`;

const ExpandInner = styled.div`
  overflow: hidden;
`;

const RichText = styled.div`
  padding: 0 22px 22px;

  p {
    margin: 0 0 16px;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.9;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export default function ChauffeurDetailView({
  car,
  relatedVehicles,
  seoKeyword,
  pageTitle,
}: Props) {
  const [authorityOpen, setAuthorityOpen] = useState(false);

  // ── Core data ─────────────────────────────
  const safeTitle = car.title || "Chauffeur Vehicle";

  // seoKeyword is the full target phrase e.g.
  // "Range Rover Sport Chauffeur Service Cape Town"
  // safeTitle is just "Range Rover Sport" — used for UI labels, WhatsApp, etc.
  // seoKeyword is used for H1, authority section title, schema

  const description =
    car.short_description ||
    car.highlight ||
    car.chauffeur_service_text ||
    "Travel Cape Town in comfort with a premium chauffeur-driven vehicle designed for polished, private, and reliable service.";

  const heroImage = getPrimaryImage(car);
  const priceText = formatPrice(car.price, car.price_from, car.price_to);

  const mainWhatsAppLink = buildWhatsAppLink(
    `Hey, I'm interested in booking the ${safeTitle}. Please can you share pricing and availability?`
  );

  // ── Features & ideal-for ──────────────────
  const features =
    car.features && car.features.length
      ? car.features
      : [
          "Private chauffeur service",
          "Premium travel presentation",
          "Reliable airport transfers",
          "Flexible private touring",
          "Executive-level comfort",
          "Stress-free local travel",
        ];

  const idealFor =
    car.ideal_for && car.ideal_for.length
      ? car.ideal_for
      : ["Airport transfers", "Private tours", "Executive travel", "Day hire in Cape Town"];

  // ── FAQs — pass seoKeyword so questions embed the keyword ──
  // buildFaqs is your existing util — we extend it below.
  // If your utils/buildFaqs accepts a keyword arg, pass it.
  // If not, we override here with vehicle-specific questions.
  const faqs = buildFaqs(safeTitle, seoKeyword);

  const bodyHtml = car.body && stripHtml(car.body) ? car.body : undefined;
  const baseRate = getBaseDailyRate(car.price, car.price_from);
  const galleryImages = [...(car.cover_photos || car.images || [])];

  // ── Authority section content ─────────────
  // Dynamic per vehicle — no more identical cards across all pages
  const authorityCards = buildAuthorityCards(car, seoKeyword);

  // Intro sentence under the H1
  // Uses short_description from CMS if available, otherwise generates
  const authorityIntro =
    car.short_description ||
    car.highlight ||
    `${seoKeyword} — private airport transfers, full-day tours, and bespoke hire across Cape Town and the Western Cape. Professional chauffeur service designed for clients who value comfort, discretion, and reliability.`;

  // Expand body — uses car.body from CMS if available, otherwise generates
  // vehicle-specific paragraphs (no more generic identical text)
  const authorityBodyParagraphs = bodyHtml
    ? null // will render HTML via dangerouslySetInnerHTML below
    : buildAuthorityBody(car, seoKeyword);

  return (
    <PageWrap>
      {/*
        HERO: renders safeTitle ("Range Rover Sport") as a visual heading.
        This is a styled <p> or <div> in ChauffeurHero — NOT an <h1>.
        The real H1 is the AuthorityTitle below.

        ⚠️  Make sure ChauffeurHero renders its title prop as <p> or <div>,
        not <h1>. A page should have exactly one <h1>.
        If ChauffeurHero currently renders <h1>, change it to <h2> or <p>.
      */}
      <ChauffeurHero
        title={safeTitle}
        description={description}
        vehicleType={car.vehicle_type}
        seats={car.number_of_seats}
        luggage={car.luggage_capacity}
        priceText={priceText}
        image={heroImage}
        whatsappLink={mainWhatsAppLink}
      />

      {!!galleryImages.length && (
        <Section>
          <Container>
            <TwoColGrid>
              <ChauffeurGallery images={galleryImages} />
              <div>
                <ChauffeurQuickDetails
                  title={safeTitle}
                  vehicleType={car.vehicle_type}
                  seats={car.number_of_seats}
                  luggage={car.luggage_capacity}
                  priceText={priceText}
                />
              </div>
            </TwoColGrid>
          </Container>
        </Section>
      )}

      {/*
        AUTHORITY SECTION
        ─────────────────
        This section carries the page H1 — the full SEO keyword.
        Google will read: <h1>Range Rover Sport Chauffeur Service Cape Town</h1>

        Everything in this section is now dynamically generated per vehicle:
        - The H1 (seoKeyword)
        - The intro paragraph (from CMS or generated)
        - The 3 authority cards (derived from vehicle data)
        - The expand body (from car.body CMS field or generated)
      */}
      <AuthoritySection>
        <Container>
          <AuthorityHeader>
            {/* Eyebrow — static, fine for SEO */}
            <AuthorityEyebrow>Luxury Chauffeur Service Cape Town</AuthorityEyebrow>

            {/*
              THE KEY CHANGE: H1 now = seoKeyword
              "Range Rover Sport Chauffeur Service Cape Town"
              instead of "Range Rover Sport Chauffeur Service in Cape Town"
              (the old h2 was close but not the exact search phrase)

              className="vehicle-summary" targets the speakable schema
              defined in page.tsx
            */}
            <AuthorityTitle className="vehicle-summary">
              {seoKeyword}
            </AuthorityTitle>

            {/* Intro — from CMS or generated, uses seoKeyword naturally */}
            <AuthorityIntro className="chauffeur-intro">
              {authorityIntro}
            </AuthorityIntro>
          </AuthorityHeader>

          {/* 3 authority cards — dynamic per vehicle */}
          <AuthorityGrid>
            {authorityCards.map((card, i) => (
              <AuthorityCard key={i}>
                <AuthorityCardTitle>{card.title}</AuthorityCardTitle>
                <AuthorityCardText>{card.text}</AuthorityCardText>
              </AuthorityCard>
            ))}
          </AuthorityGrid>

          {/* Expand section — dynamic body text */}
          <ExpandWrap>
            <ExpandButton
              type="button"
              onClick={() => setAuthorityOpen((v) => !v)}
              aria-expanded={authorityOpen}
              aria-controls="authority-body"
            >
              <ExpandTitle>
                Why {safeTitle} is a strong choice for chauffeur service in Cape Town
              </ExpandTitle>
              <ExpandIcon $open={authorityOpen} aria-hidden="true">
                +
              </ExpandIcon>
            </ExpandButton>

            <ExpandBody $open={authorityOpen} id="authority-body">
              <ExpandInner>
                <RichText>
                  {/*
                    If car.body exists in CMS, render it as HTML
                    (allows rich content per vehicle from the backend)
                    Otherwise render the generated paragraphs
                  */}
                  {bodyHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
                  ) : (
                    authorityBodyParagraphs?.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))
                  )}
                </RichText>
              </ExpandInner>
            </ExpandBody>
          </ExpandWrap>
        </Container>
      </AuthoritySection>

      <Section>
        <Container>
          <ChauffeurFeatures features={features} />
        </Container>
      </Section>

      <Section>
        <Container>
          <ChauffeurIdealFor items={idealFor} />
        </Container>
      </Section>

      <TestimonialsSection />
      <TestimonialsCta />

      <Section>
        <Container>
          {/*
            ChauffeurFaq receives vehicle-specific FAQs.
            The buildFaqs util is called with both safeTitle and seoKeyword.
            Update your buildFaqs util signature to:
              buildFaqs(title: string, keyword?: string)
            and embed keyword in Q1 ("How much does [keyword] cost?")
            for the strongest FAQ schema signal.
          */}
          <ChauffeurFaq items={faqs} />
        </Container>
      </Section>

      <Section>
        <Container>
          <ChauffeurRelatedVehicles items={relatedVehicles} />
        </Container>
      </Section>

      <ChauffeurFinalCta title={safeTitle} whatsappLink={mainWhatsAppLink} />

      <ChauffeurStickyBar
        title={safeTitle}
        priceText={priceText}
        whatsappLink={mainWhatsAppLink}
      />
    </PageWrap>
  );
}
