"use client";

import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Container from "../../common/Container";
import ChauffeurHero from "./ChauffeurHero";
import ChauffeurGallery from "./ChauffeurGallery";
import ChauffeurQuickDetails from "./ChauffeurQuickDetails";
import ChauffeurFeatures from "./ChauffeurFeatures";
import ChauffeurIdealFor from "./ChauffeurIdealFor";
import ChauffeurFaq from "./ChauffeurFaq";
import ChauffeurRelatedVehicles from "./ChauffeurRelatedVehicles";
import ChauffeurFinalCta from "./ChauffeurFinalCta";
import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";
import { buildWhatsAppLink } from "../../../lib/whatsapp";
import type { RelatedVehicle } from "./types";
import type { VehicleData, VehicleFaq } from "../../../lib/vehicleTemplate";

// ─────────────────────────────────────────────────────────────────────
// Vehicle detail view.
//
// Every SEO-critical field on this page is rendered from the
// VehicleData `vehicle` prop — the single source of truth built once
// in the route from the DB record. This component does NOT compute
// price, seats, title, H1, or meta anywhere; if it needs a value it
// reads it from `vehicle`.
// ─────────────────────────────────────────────────────────────────────

type Props = {
  vehicle: VehicleData;
  faqs: VehicleFaq[];
  relatedVehicles: RelatedVehicle[];
};

// ─── Styles ─────────────────────────────────────────────────────────

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

// H1 lives here (ChauffeurHero renders its own visual title as <p>).
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

const ParentLinkRow = styled.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 8px 0 0;
  line-height: 1.7;

  a {
    color: inherit;
    text-decoration: underline;
  }
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

// ─── Helpers ────────────────────────────────────────────────────────

function buildAuthorityCards(vehicle: VehicleData) {
  const { name, vehicleType, seats, idealFor } = vehicle;
  const type = vehicleType || "luxury vehicle";

  const card1 = {
    title: `${name} — built for private hire`,
    text: seats
      ? `Comfortably seating up to ${seats} passengers, this ${type} delivers the space, presence, and refinement expected by clients who hire a chauffeur privately in Cape Town.`
      : `This ${type} is selected for its combination of presence, comfort, and performance — ideal for clients who want a polished private chauffeur experience across Cape Town.`,
  };

  const primaryUse =
    idealFor.length > 0
      ? idealFor.slice(0, 2).join(" and ")
      : "airport transfers and private touring";

  const card2 = {
    title: "Chauffeur hire on your itinerary",
    text: `Whether you need ${primaryUse}, full-day hire with driver, or a curated Cape Town experience, your chauffeur works around your schedule — not a group timetable.`,
  };

  const card3 = {
    title: "Included with every ${name} hire",
    text: `Every ${name} chauffeur hire booking includes a professionally presented PDP-licensed driver, complimentary bottled water, flight tracking on airport pickups, and a meet-and-greet service as standard.`,
  };

  return [card1, card2, card3];
}

// ─── Component ──────────────────────────────────────────────────────

export default function ChauffeurDetailView({
  vehicle,
  faqs,
  relatedVehicles,
}: Props) {
  const [authorityOpen, setAuthorityOpen] = useState(false);

  const heroImageUrls = vehicle.images.map((im) => im.url).slice(0, 6);
  const heroImageAlts = vehicle.images.map((im) => im.alt).slice(0, 6);

  const galleryImages = vehicle.images.map((im, i) => ({
    id: i,
    cover_photos: im.url,
    is_featured: im.isFeatured,
    order: im.order,
  }));

  const mainWhatsAppLink = buildWhatsAppLink(
    `Hi, I'd like to enquire about ${vehicle.name} chauffeur hire in Cape Town. Please assist.`
  );

  const features =
    vehicle.features.length > 0
      ? vehicle.features
      : [
          "Private chauffeur hire",
          "PDP-licensed driver",
          "Reliable airport transfers",
          "Flexible private touring",
          "Executive-level comfort",
          "Stress-free local travel",
        ];

  const idealFor =
    vehicle.idealFor.length > 0
      ? vehicle.idealFor
      : [
          "Airport transfers",
          "Private tours",
          "Executive travel",
          "Full-day hire in Cape Town",
        ];

  const authorityCards = buildAuthorityCards(vehicle);
  const authorityIntro =
    vehicle.shortDescription ||
    vehicle.chauffeurServiceText ||
    `${vehicle.name} chauffeur hire in Cape Town — private airport transfers, full-day hire with driver, and bespoke chauffeur service across Cape Town and the Western Cape. Designed for clients who value comfort, discretion, and reliability.`;

  return (
    <PageWrap>
      <ChauffeurHero
        title={vehicle.name}
        description={authorityIntro}
        vehicleType={vehicle.vehicleType ?? undefined}
        seats={vehicle.seats ?? undefined}
        luggage={vehicle.luggage ?? undefined}
        priceUsd={vehicle.dailyRateZar ?? undefined}
        image={vehicle.primaryImage}
        images={heroImageUrls}
        imageAlt={heroImageAlts[0]}
        imageAlts={heroImageAlts}
        whatsappLink={mainWhatsAppLink}
      />

      {galleryImages.length > 0 && (
        <Section>
          <Container>
            <TwoColGrid>
              <ChauffeurGallery images={galleryImages} />
              <div>
                <ChauffeurQuickDetails
                  title={vehicle.name}
                  vehicleType={vehicle.vehicleType ?? undefined}
                  seats={vehicle.seats ?? undefined}
                  luggage={vehicle.luggage ?? undefined}
                  priceUsd={vehicle.dailyRateZar ?? undefined}
                />
              </div>
            </TwoColGrid>
          </Container>
        </Section>
      )}

      <AuthoritySection>
        <Container>
          <AuthorityHeader>
            <AuthorityEyebrow>Chauffeur Hire in Cape Town</AuthorityEyebrow>
            <AuthorityTitle className="vehicle-summary">
              {vehicle.h1}
            </AuthorityTitle>
            <AuthorityIntro className="chauffeur-intro">
              {authorityIntro}
            </AuthorityIntro>
            <ParentLinkRow>
              Part of{" "}
              <Link href="/chauffeur-hire">chauffeur hire in Cape Town</Link>{" "}
              — private drivers and luxury vehicles for airport transfers,
              executive travel, and full-day hire. Also available for{" "}
              <Link href="/airport-transfers-cape-town">airport transfers</Link>{" "}
              and <Link href="/tours">private day tours</Link>.
            </ParentLinkRow>
          </AuthorityHeader>

          <AuthorityGrid>
            {authorityCards.map((card, i) => (
              <AuthorityCard key={i}>
                <AuthorityCardTitle>
                  {card.title.replace("${name}", vehicle.name)}
                </AuthorityCardTitle>
                <AuthorityCardText>{card.text}</AuthorityCardText>
              </AuthorityCard>
            ))}
          </AuthorityGrid>

          <ExpandWrap>
            <ExpandButton
              type="button"
              onClick={() => setAuthorityOpen((v) => !v)}
              aria-expanded={authorityOpen}
              aria-controls="authority-body"
            >
              <ExpandTitle>
                Why {vehicle.name} is a strong choice for chauffeur hire in Cape Town
              </ExpandTitle>
              <ExpandIcon $open={authorityOpen} aria-hidden="true">
                +
              </ExpandIcon>
            </ExpandButton>

            <ExpandBody $open={authorityOpen} id="authority-body">
              <ExpandInner>
                <RichText>
                  {vehicle.bodyHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: vehicle.bodyHtml }} />
                  ) : (
                    vehicle.longDescriptionParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
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
          <ChauffeurFaq items={faqs} />
        </Container>
      </Section>

      <Section>
        <Container>
          <ChauffeurRelatedVehicles items={relatedVehicles} />
        </Container>
      </Section>

      <ChauffeurFinalCta title={vehicle.name} whatsappLink={mainWhatsAppLink} />
    </PageWrap>
  );
}
