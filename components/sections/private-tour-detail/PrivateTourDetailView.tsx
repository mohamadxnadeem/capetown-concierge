"use client";

import styled from "styled-components";
import Container from "../../common/Container";
import {
  buildWhatsAppLink,
  buildTourWhatsAppMessage,
  buildGeneralWhatsAppMessage,
} from "../../../lib/whatsapp";
import { getTourContent } from "../../../lib/tourPageContent";
import PrivateTourGallery from "./PrivateTourGallery";
import PrivateTourIntro from "./PrivateTourIntro";
import PrivateTourWhatToExpect from "./PrivateTourWhatToExpect";
import PrivateTourItinerary from "./PrivateTourItinerary";
import PrivateTourMidCta from "./PrivateTourMidCta";
import PrivateTourVehicles from "./PrivateTourVehicles";
import PrivateTourInclusions from "./PrivateTourInclusions";
import PrivateTourHighlights from "./PrivateTourHighlights";
import PrivateTourReviews from "./PrivateTourReviews";
import PrivateTourFaq from "./PrivateTourFaq";
import PrivateTourRelatedTours from "./PrivateTourRelatedTours";
import PrivateTourCta from "./PrivateTourCta";


import {
  Experience,
  ReviewItem,
  TourVehicle,
  RelatedTour,
} from "./types";

const PageWrap = styled.main`
  background: ${({ theme }) => theme.colors.background};
`;

const Section = styled.section`
  padding: 64px 0;
`;

const reviewItems: ReviewItem[] = [
  {
    quote:
      "Absolutely incredible from start to finish. The route, comfort, and attention to detail made this one of the highlights of our Cape Town trip.",
    name: "James R.",
    subtitle: "London, UK",
  },
  {
    quote:
      "The perfect way to experience Cape Town privately. Everything felt smooth, premium, and beautifully organised.",
    name: "Sophie & Daniel",
    subtitle: "Dubai, UAE",
  },
  {
    quote:
      "A polished and memorable experience with amazing scenery throughout the day. Far better than a standard group tour.",
    name: "Nadia K.",
    subtitle: "Johannesburg, South Africa",
  },
];

type Props = {
  experience: Experience;
  relatedTours: RelatedTour[];
  vehicles: TourVehicle[];
  lowestVehiclePrice?: number;
  slug?: string;
};

export default function PrivateTourDetailView({
  experience,
  relatedTours,
  vehicles,
  lowestVehiclePrice,
  slug,
}: Props) {
  const safeTourTitle = experience?.title || "private tour";

  const content = getTourContent(slug || experience?.slug);

  const whatsappLink = `https://wa.me/27636746131?text=${encodeURIComponent(`Hi, I'd like to book the ${safeTourTitle}. Please assist.`)}`;
  const midCtaWhatsappLink = `https://wa.me/27636746131?text=${encodeURIComponent(`Hi, I'd like to book the ${safeTourTitle}. Please assist.`)}`;
  const bundleWhatsAppLink = `https://wa.me/27636746131?text=${encodeURIComponent(`Hi, I'd like to enquire about private tours in Cape Town including the ${safeTourTitle}. Please assist.`)}`;

  const stops = [...(experience.stops || [])].sort((a, b) => a.order - b.order);

  return (
    <PageWrap>
      <Section>
        <Container>
          <PrivateTourGallery
            title={safeTourTitle}
            photos={experience.cover_photos || []}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <PrivateTourIntro
            title={safeTourTitle}
            shortDescription={experience.short_description}
            highlight={experience.highlight}
            duration={experience.duration}
            location={experience.location}
            lowestVehiclePrice={lowestVehiclePrice}
            trustBadges={content.trustBadges}
          />
        </Container>
      </Section>



      {/* <Section>
        <Container>
          <PrivateTourWhatToExpect />
        </Container>
      </Section> */}

      <Section>
        <Container>
          <PrivateTourItinerary
            title={safeTourTitle}
            location={experience.location}
            stops={stops}
            sectionTitle={content.itineraryTitle}
            sectionSubheading={content.itinerarySubheading}
          />

          <PrivateTourMidCta
            tourTitle={safeTourTitle}
            whatsappLink={midCtaWhatsappLink}
            title={content.midCtaTitle}
            body={content.midCtaBody}
            buttonLabel={content.midCtaButtonLabel}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <PrivateTourReviews reviews={reviewItems} />
        </Container>
      </Section>

      <Section>
        <Container>
          <PrivateTourVehicles items={vehicles} tourTitle={safeTourTitle} />
        </Container>
      </Section>

      <Section>
        <Container>
          <PrivateTourInclusions />
        </Container>
      </Section>

      <Section>
        <Container>
          <PrivateTourHighlights
            tourTitle={safeTourTitle}
            title={content.highlightsTitle}
            items={content.highlights}
          />
        </Container>
      </Section>



      <Section>
        <Container>
          <PrivateTourFaq items={content.faqItems} lowestVehiclePrice={lowestVehiclePrice} />
        </Container>
      </Section>

      <Section>
        <Container>
          <PrivateTourRelatedTours
            items={relatedTours}
            bundleWhatsappLink={bundleWhatsAppLink}
          />
        </Container>
      </Section>

      <PrivateTourCta
        whatsappLink={whatsappLink}
        title={content.ctaTitle}
        body={content.ctaBody}
      />
    </PageWrap>
  );
}
