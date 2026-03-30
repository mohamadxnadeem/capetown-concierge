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

type Props = {
  car: Car;
  relatedVehicles: RelatedVehicle[];
};

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

const AuthorityTitle = styled.h2`
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

const AuthorityCardTitle = styled.h3`
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

export default function ChauffeurDetailView({ car, relatedVehicles }: Props) {
  const [authorityOpen, setAuthorityOpen] = useState(false);

  const safeTitle = car.title || "Chauffeur Vehicle";

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
      : [
          "Airport transfers",
          "Private tours",
          "Executive travel",
          "Day hire in Cape Town",
        ];

  const faqs = buildFaqs(safeTitle);

  const bodyHtml = car.body && stripHtml(car.body) ? car.body : undefined;

  const baseRate = getBaseDailyRate(car.price, car.price_from);

  const galleryImages = [...(car.cover_photos || car.images || [])];

  const authorityIntro = `${safeTitle} is designed for travellers who want a polished, private, and dependable chauffeur experience in Cape Town, whether for airport transfers, executive travel, or full-day private hire.`;

  return (
    <PageWrap>
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

      {/* <Section>
        <Container>
          <ChauffeurWhatToExpect
            html={bodyHtml}
            fallbackText={
              car.chauffeur_service_text ||
              car.short_description ||
              "Enjoy a refined private transport experience in Cape Town with a professional chauffeur, clean presentation, and a vehicle suited to premium travel."
            }
          />
        </Container>
      </Section> */}

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

      <AuthoritySection>
        <Container>
          <AuthorityHeader>
            <AuthorityEyebrow>Luxury Chauffeur Service Cape Town</AuthorityEyebrow>
            <AuthorityTitle>{safeTitle} Chauffeur Service in Cape Town</AuthorityTitle>
            <AuthorityIntro>{authorityIntro}</AuthorityIntro>
          </AuthorityHeader>

          <AuthorityGrid>
            <AuthorityCard>
              <AuthorityCardTitle>Professional Presentation</AuthorityCardTitle>
              <AuthorityCardText>
                This vehicle suits clients who value comfort, privacy, and a
                refined travel experience for both leisure and executive
                bookings in Cape Town.
              </AuthorityCardText>
            </AuthorityCard>

            <AuthorityCard>
              <AuthorityCardTitle>Flexible Private Hire</AuthorityCardTitle>
              <AuthorityCardText>
                Ideal for airport transfers, private city travel, full-day hire,
                and tailored touring with timing and routes built around your
                itinerary.
              </AuthorityCardText>
            </AuthorityCard>

            <AuthorityCard>
              <AuthorityCardTitle>Premium Local Travel</AuthorityCardTitle>
              <AuthorityCardText>
                Perfect for travellers wanting seamless transport across Cape
                Town, from hotels and restaurants to wine farms, coastal routes,
                and day tours.
              </AuthorityCardText>
            </AuthorityCard>
          </AuthorityGrid>

          <ExpandWrap>
            <ExpandButton
              type="button"
              onClick={() => setAuthorityOpen((v) => !v)}
            >
              <ExpandTitle>
                Why {safeTitle} is a strong choice for chauffeur service in Cape Town
              </ExpandTitle>
              <ExpandIcon $open={authorityOpen}>+</ExpandIcon>
            </ExpandButton>

            <ExpandBody $open={authorityOpen}>
              <ExpandInner>
                <RichText>
                  <p>
                    Booking a {safeTitle} chauffeur service in Cape Town is about
                    more than transport. It is about enjoying a smooth,
                    reliable, and premium travel experience with the right
                    vehicle for your style of trip. Whether you are arriving for
                    business, planning a private holiday, or looking for a more
                    refined way to move through the city, this vehicle gives you
                    a higher standard of comfort and presentation.
                  </p>

                  <p>
                    Many clients choose this vehicle for airport transfers,
                    executive travel, full-day private hire, and custom touring
                    across Cape Town. It also works especially well when
                    combining multiple stops in one day, such as Table Mountain,
                    city highlights, the Atlantic Seaboard, Cape Peninsula
                    routes, or Cape Winelands experiences. With a professional
                    chauffeur, the journey feels more seamless and more
                    enjoyable from start to finish.
                  </p>

                  <p>
                    If you want a dependable luxury vehicle in Cape Town with
                    private chauffeur service, flexible booking, and a polished
                    guest experience, {safeTitle} is a strong option for both
                    local travel and curated full-day itineraries.
                  </p>
                </RichText>
              </ExpandInner>
            </ExpandBody>
          </ExpandWrap>
        </Container>
      </AuthoritySection>

      <Section>
        <Container>
          <ChauffeurDiscountTable baseRate={baseRate} />
        </Container>
      </Section>

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

      <ChauffeurFinalCta title={safeTitle} whatsappLink={mainWhatsAppLink} />

      <ChauffeurStickyBar
        title={safeTitle}
        priceText={priceText}
        whatsappLink={mainWhatsAppLink}
      />
    </PageWrap>
  );
}