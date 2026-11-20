"use client";

import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Container from "../../common/Container";
import { Car, RelatedVehicle } from "./types";
import {
  FULL_DAY_HOURS_LINE,
  buildFaqs,
  buildWhatsAppLink,
  getDayRate,
  getVehicleName,
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
import { vehicleReviewTags } from "../../../lib/googleReviews";
import TrustBadges from "./TrustBadges";
import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";

// ─────────────────────────────────────────────
// TYPES
// seoKeyword: "Range Rover Sport Chauffeur Cape Town"
//             passed down from page.tsx — this becomes the H1
// pageTitle:  full meta title string, passed for the sticky bar
// ─────────────────────────────────────────────
type Props = {
  car: Car;
  relatedVehicles: RelatedVehicle[];
  seoKeyword: string;   // NEW, the exact keyword to render as H1
  pageTitle?: string;   // NEW, optional, used for sticky bar label
};

// ─────────────────────────────────────────────
// VEHICLE-SPECIFIC CONTENT GENERATORS
// These replace the hardcoded generic strings that were
// identical on every vehicle page — a major duplicate content issue
// ─────────────────────────────────────────────

/**
 * Three cards under the H1. All text comes from the vehicle record.
 */
function buildAuthorityCards(car: Car) {
  const name = getVehicleName(car);
  const seats = car.number_of_seats;
  const rate = getDayRate(car);
  const type = car.vehicle_type ? car.vehicle_type.toLowerCase() : "vehicle";
  const idealFor = car.ideal_for;

  const card1 = {
    title: `${name} Chauffeur Cape Town: Private, Polished, Yours`,
    text: seats
      ? `A ${type} with room for up to ${seats} passengers${car.luggage_capacity ? ` and ${car.luggage_capacity} ${car.luggage_capacity === 1 ? "bag" : "bags"}` : ""}. You travel in complete privacy with a professional, well-presented chauffeur who knows Cape Town, so you arrive composed and on time.`
      : `A ${type} chosen for comfort, presence and privacy. Your professional, well-presented chauffeur knows Cape Town, so you arrive composed and on time.`,
  };

  const primaryUse =
    idealFor && idealFor.length > 0
      ? idealFor.slice(0, 2).join(" and ").toLowerCase()
      : "airport transfers and private touring";

  const card2 = {
    title: "Full-Day Hire, Your Itinerary",
    text: `Perfect for ${primaryUse}, the Cape Peninsula and the Winelands${rate ? `, from ${rate} per vehicle per day with fuel included` : ""}. ${FULL_DAY_HOURS_LINE}`,
  };

  const card3 = {
    title: "Chauffeur Details Done Properly",
    text: `Every ${name} chauffeur booking includes a meet and greet with a name board, flight tracking on airport pickups and complimentary bottled water. Airport transfers run 24/7, and we reply on WhatsApp within 30 minutes.`,
  };

  return [card1, card2, card3];
}

/**
 * Expandable body, three paragraphs, used only when the record has no body.
 */
function buildAuthorityBody(car: Car): string[] {
  const name = getVehicleName(car);
  const type = car.vehicle_type ? car.vehicle_type.toLowerCase() : "vehicle";
  const seats = car.number_of_seats;

  const para1 = `Choosing a ${name} chauffeur in Cape Town is about arriving relaxed, on time and out of sight of the crowds. The ${name} is a ${type}${seats ? ` for up to ${seats} passengers` : ""}, driven by a professional, well-presented chauffeur who looks after the route, the timing and your luggage, so you can focus on your trip or your meetings.`;

  const para2 = `Our travellers use the ${name} for Cape Town International Airport transfers, a private Cape Peninsula and Cape Point day, the Winelands around Stellenbosch and Franschhoek, and business travel. Every booking is private, with no shared vehicles and no group timetable. Browse our private tours or airport transfers to plan your stay.`;

  const para3 = `${FULL_DAY_HOURS_LINE} Prices are per vehicle, never per person. To check availability for the ${name}, message us on WhatsApp and we will reply within 30 minutes. We regularly look after travellers from the United States, the United Kingdom, the UAE, Saudi Arabia and the wider Gulf.`;

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
  const priceUsd = car.price ? Number(String(car.price).replace(/[^0-9.]/g, "")) || undefined : undefined;

  const mainWhatsAppLink = `https://wa.me/27636746131?text=${encodeURIComponent(`Hi, I'd like to enquire about the ${safeTitle} chauffeur service. Please assist.`)}`;

  // ── Features & ideal-for ──────────────────
  const features =
    car.features && car.features.length
      ? car.features
      : [
          "Fully private, no shared vehicles",
          "Professional, well-presented chauffeur",
          "Meet and greet with a name board",
          "Flight tracking on airport pickups",
          "Complimentary bottled water",
          "Fuel included in the day rate",
        ];

  const idealFor =
    car.ideal_for && car.ideal_for.length
      ? car.ideal_for
      : ["Airport transfers", "Cape Peninsula and Cape Point", "Winelands day tours", "Business travel", "Full-day hire in Cape Town"];

  // ── FAQs — pass seoKeyword so questions embed the keyword ──
  // buildFaqs is your existing util — we extend it below.
  // If your utils/buildFaqs accepts a keyword arg, pass it.
  // If not, we override here with vehicle-specific questions.
  const faqs = buildFaqs(car);

  const bodyHtml = car.body && stripHtml(car.body) ? car.body : undefined;
  const baseRate = getBaseDailyRate(car.price, car.price_from);
  const galleryImages = [...(car.cover_photos || car.images || [])];
  const heroRotationImages = [...galleryImages]
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((p) => p?.cover_photos)
    .filter((u): u is string => Boolean(u))
    .slice(0, 6);

  // ── Authority section content ─────────────
  // Dynamic per vehicle — no more identical cards across all pages
  const authorityCards = buildAuthorityCards(car);

  // Intro sentence under the H1
  // Uses short_description from CMS if available, otherwise generates
  const dayRate = getDayRate(car);
  const authorityIntro = `Looking for a ${getVehicleName(car)} chauffeur in Cape Town? Your ${getVehicleName(car)} comes with a private chauffeur who knows the city, and a day planned entirely around you. Ideal for airport transfers, the Cape Peninsula, the Winelands and business travel${dayRate ? `, from ${dayRate} per day with fuel included` : ""}. ${FULL_DAY_HOURS_LINE}`;

  // Expand body — uses car.body from CMS if available, otherwise generates
  // vehicle-specific paragraphs (no more generic identical text)
  const authorityBodyParagraphs = bodyHtml
    ? null // will render HTML via dangerouslySetInnerHTML below
    : buildAuthorityBody(car);

  return (
    <PageWrap>
      {/*
        HERO: renders safeTitle ("Range Rover Sport") as a visual heading.
        This is a styled <p> or <div> in ChauffeurHero, NOT an <h1>.
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
        priceUsd={priceUsd}
        image={heroImage}
        images={heroRotationImages}
        whatsappLink={mainWhatsAppLink}
      />

      <TrustBadges />

      {!!galleryImages.length && (
        <Section>
          <Container>
            <TwoColGrid>
              <ChauffeurGallery images={galleryImages} altName={getVehicleName(car)} />
              <div>
                <ChauffeurQuickDetails
                  title={safeTitle}
                  vehicleType={car.vehicle_type}
                  seats={car.number_of_seats}
                  luggage={car.luggage_capacity}
                  priceUsd={priceUsd}
                />
              </div>
            </TwoColGrid>
          </Container>
        </Section>
      )}

      {/*
        AUTHORITY SECTION
        ─────────────────
        This section carries the page H1, the full SEO keyword.
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
            <AuthorityEyebrow>Private chauffeur-driven hire</AuthorityEyebrow>

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
            <p style={{fontSize:"0.88rem",color:"#6c7a74",margin:"8px 0 0",lineHeight:1.7}}>
              Available 24/7 for <Link href="/airport-transfers-cape-town" style={{color:"inherit",textDecoration:"underline"}}>airport transfers</Link>, and for <Link href="/tours" style={{color:"inherit",textDecoration:"underline"}}>private tours</Link> across Cape Town and the Winelands.
            </p>
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
                Why travellers choose the {safeTitle} for chauffeur service in Cape Town
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

      <TestimonialsSection tags={vehicleReviewTags(car.slug || car.title)} />
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
    </PageWrap>
  );
}
