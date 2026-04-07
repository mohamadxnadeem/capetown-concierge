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
    answer: "The full route typically runs 7–9 hours, depending on your pace and preferred stops. We build in flexibility by design — if you want to spend longer at Boulders Beach or take a detour, just say the word.",
  },
  {
    question: "Is this a private tour or a shared group tour?",
    answer: "100% private. You and your group have the entire vehicle to yourselves for the full day. We never combine bookings or add strangers to your tour.",
  },
  {
    question: "Can we customise the itinerary?",
    answer: "Absolutely. The suggested route is a starting point, not a rule. Want to skip a stop, add one, or adjust timing around a lunch reservation? Tell us when you book and we'll tailor the day accordingly.",
  },
  {
    question: "Is transport included?",
    answer: "Yes — a professional chauffeur-driven vehicle is the foundation of the experience. Hotel pickup, drop-off, all driving, toll fees, and fuel are included in your booking.",
  },
  {
    question: "Is this tour suitable for families and children?",
    answer: "Very much so. The private format makes this especially good for families — no rushing, no crowds, and your chauffeur will adapt the pace to suit your group. Boulders Beach and Cape Point are particular hits with younger travellers.",
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
  lowestVehiclePrice?: number;
};

export default function PrivateTourDetailView({
  experience,
  relatedTours,
  vehicles,
  lowestVehiclePrice,
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
            lowestVehiclePrice={lowestVehiclePrice}
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

          <PrivateTourMidCta
            tourTitle={safeTourTitle}
            whatsappLink={midCtaWhatsappLink}
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