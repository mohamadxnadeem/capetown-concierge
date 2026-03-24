"use client";

import styled from "styled-components";
import Container from "../../common/Container";
import { Car, RelatedVehicle } from "./types";
import {
  buildFaqs,
  buildWhatsAppLink,
  formatPrice,
  genericReviews,
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
import ChauffeurReviews from "./ChauffeurReviews";
import ChauffeurFaq from "./ChauffeurFaq";
import ChauffeurRelatedVehicles from "./ChauffeurRelatedVehicles";
import ChauffeurFinalCta from "./ChauffeurFinalCta";
import ChauffeurStickyBar from "./ChauffeurStickyBar";

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

export default function ChauffeurDetailView({ car, relatedVehicles }: Props) {
  const safeTitle = car.title || "Chauffeur Vehicle";

  const description =
    car.short_description ||
    car.highlight ||
    car.chauffeur_service_text ||
    "Travel Cape Town in comfort with a premium chauffeur-driven vehicle designed for polished, private, and reliable service.";

  const heroImage = getPrimaryImage(car);

  const priceText = formatPrice(
    car.price,
    car.price_from,
    car.price_to
  );

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

      <Section>
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
      </Section>

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

      <Section>
        <Container>
          <ChauffeurDiscountTable baseRate={baseRate} />
        </Container>
      </Section>

      <ChauffeurFinalCta title={safeTitle} whatsappLink={mainWhatsAppLink} />

      <Section>
        <Container>
          <ChauffeurReviews reviews={genericReviews} />
        </Container>
      </Section>

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

      <ChauffeurStickyBar
        title={safeTitle}
        priceText={priceText}
        whatsappLink={mainWhatsAppLink}
      />
    </PageWrap>
  );
}