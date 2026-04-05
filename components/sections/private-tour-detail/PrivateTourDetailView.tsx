"use client";

import styled from "styled-components";
import Container from "../../common/Container";
import {
  buildWhatsAppLink,
  buildTourWhatsAppMessage,
  buildGeneralWhatsAppMessage,
} from "../../../lib/whatsapp";
import PrivateTourGallery from "./PrivateTourGallery";
import PrivateTourIntro from "./PrivateTourIntro";
import PrivateTourWhatToExpect from "./PrivateTourWhatToExpect";
import PrivateTourItinerary from "./PrivateTourItinerary";
import PrivateTourMidCta from "./PrivateTourMidCta";
import PrivateTourVehicles from "./PrivateTourVehicles";
import PrivateTourHighlights from "./PrivateTourHighlights";
import PrivateTourReviews from "./PrivateTourReviews";
import PrivateTourFaq from "./PrivateTourFaq";
import PrivateTourRelatedTours from "./PrivateTourRelatedTours";
import PrivateTourCta from "./PrivateTourCta";
import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";



import {
  Experience,
  FAQItem,
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

const faqItems: FAQItem[] = [
  {
    question: "How long does the Cape Peninsula private tour take?",
    answer:
      "Most Cape Peninsula private tours take around a full day, depending on the pace, traffic, and how many photo or sightseeing stops you would like to include.",
  },
  {
    question: "Is this a private tour or a shared group tour?",
    answer:
      "This is a private tour experience designed around your schedule, comfort, and preferences.",
  },
  {
    question: "Can the itinerary be customised?",
    answer:
      "Yes. The tour can be tailored around your interests, timing, and preferred stops where possible.",
  },
  {
    question: "Does the tour include chauffeur transport?",
    answer:
      "Yes. The experience is designed around private chauffeur-driven transport for a smoother and more premium touring experience.",
  },
  {
    question: "Is this tour suitable for couples and families?",
    answer:
      "Yes. This private tour works especially well for couples, families, and travellers looking for a more relaxed and exclusive Cape Town experience.",
  },
];

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
};

export default function PrivateTourDetailView({
  experience,
  relatedTours,
  vehicles,
}: Props) {
  const safeTourTitle = experience?.title || "private tour";

  const whatsappLink = buildWhatsAppLink(
    buildTourWhatsAppMessage(safeTourTitle)
  );

  const midCtaWhatsappLink = buildWhatsAppLink(
    buildGeneralWhatsAppMessage(`checking availability for the ${safeTourTitle}`)
  );

  const bundleWhatsAppLink = buildWhatsAppLink(
    buildGeneralWhatsAppMessage(
      `booking 3 private tours including ${safeTourTitle}`
    )
  );

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
          />

          {/* <PrivateTourMidCta
            tourTitle={safeTourTitle}
            whatsappLink={midCtaWhatsappLink}
          /> */}
        </Container>
      </Section>

       <TestimonialsSection />
      
        <TestimonialsCta />

      <Section>
        <Container>
          <PrivateTourVehicles items={vehicles} tourTitle={safeTourTitle} />
        </Container>
      </Section>

      <Section>
        <Container>
          <PrivateTourHighlights tourTitle={safeTourTitle} />
        </Container>
      </Section>

      

      <Section>
        <Container>
          <PrivateTourFaq items={faqItems} />
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

      <PrivateTourCta whatsappLink={whatsappLink} />
    </PageWrap>
  );
}