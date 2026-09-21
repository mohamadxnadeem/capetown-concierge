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
import SafariCanYouDoIt from "./SafariCanYouDoIt";

// Any of these slugs render the safari-specific hero pricing, the
// "Can You Do a Safari" section, the safari inclusions list, and the
// safari review placeholder. Both live and legacy slugs listed so the
// safari-specific renders survive a CMS slug rename.
const SAFARI_SLUGS = new Set([
  "sunset-safari-experience",
  "big-5-safari-from-cape-town",
]);

const SAFARI_INCLUDED = [
  "Private luxury vehicle for your group",
  "Professional PDP-licensed chauffeur",
  "Hotel pickup and drop-off",
  "Fuel and all toll fees",
  "Chilled bottled water in the vehicle",
];

const SAFARI_NOT_INCLUDED = [
  "Aquila safari fee (R1,185 per guest), paid to the reserve. Covers your sunset game drive, welcome snacks and dinner at the lodge",
  "Drinks beyond those specified",
  "Gratuities for your chauffeur and ranger",
];

const SAFARI_INCLUSIONS_HELPER =
  "The Aquila fee is paid to the reserve; the chauffeur fee is paid to us. We handle both bookings for you so it's one arrangement, not two.";

const SAFARI_INCLUSIONS_NOTE =
  "Tip: bring a warm layer. Karoo evenings get cold, even in summer.";

// Safari runs on a fixed reserve-set schedule, so "Flexible Itinerary"
// is replaced with the malaria-free trust cue in the vehicle row.
const SAFARI_VALUE_STRIP_ITEMS = [
  "✔ Private Chauffeur Service",
  "✔ Fuel Included",
  "✔ Toll Fees Included",
  "✔ Hotel Pickup",
  "✔ Malaria-Free Reserve",
];


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
      "The private Cape Peninsula tour was the highlight of our Cape Town trip. Penguins, two oceans, and Chapman's Peak all in one day without being on a crowded bus. Our driver was knowledgeable, warm, and completely flexible. Cannot recommend this highly enough.",
    name: "Sarah",
    subtitle: "Cape Peninsula Private Tour",
  },
  {
    quote:
      "We did the Stellenbosch Winelands private tour and it was exceptional. Three estates, a long lunch, and not a single moment of being rushed. The driver knew which farms were worth visiting and gave brilliant recommendations the whole way.",
    name: "Asad",
    subtitle: "Stellenbosch Winelands Tour",
  },
  {
    quote:
      "Travelled with my husband for our anniversary and booked a private city tour. The driver took us to all the iconic spots but also knew hidden viewpoints the tourist buses skip. We ended the day watching sunset from Signal Hill. Absolutely magical.",
    name: "Noor",
    subtitle: "City & Table Mountain Tour",
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
  const resolvedSlug = (slug || experience?.slug || "").toLowerCase();
  const isSafari = SAFARI_SLUGS.has(resolvedSlug);

  const content = getTourContent(resolvedSlug);

  const whatsappLink = `https://wa.me/27636746131?text=${encodeURIComponent(`Hi, I'd like to book the ${safeTourTitle}. Please assist.`)}`;
  const midCtaWhatsappLink = `https://wa.me/27636746131?text=${encodeURIComponent(`Hi, I'd like to book the ${safeTourTitle}. Please assist.`)}`;
  const bundleWhatsAppLink = `https://wa.me/27636746131?text=${encodeURIComponent(`Hi, I'd like to enquire about private tours in Cape Town including the ${safeTourTitle}. Please assist.`)}`;

  const stops = [...(experience.stops || [])].sort((a, b) => a.order - b.order);

  // Safari-specific first-slot review is intentionally omitted until we
  // have a real guest quote. Do not re-add a placeholder here; render
  // the shared review list instead.
  const pageReviews: ReviewItem[] = reviewItems;

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
            pricingContext={
              isSafari
                ? {
                    mode: "transport-only",
                    vehicleSuffix: "per vehicle (transport)",
                    extraFeePerGuestZar: 1185,
                    extraFeeLabel: "Aquila safari fee",
                    hidePerPersonNote: true,
                    hideVehiclePriceBadge: true,
                    hideExtraFeeBadge: true,
                    heroPriceLine:
                      "From R4,850 per vehicle + Aquila safari fee R1,185 per guest",
                  }
                : undefined
            }
          />
        </Container>
      </Section>

      {isSafari ? <SafariCanYouDoIt /> : null}



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
          <PrivateTourReviews reviews={pageReviews} />
        </Container>
      </Section>

      <Section>
        <Container>
          <PrivateTourVehicles
            items={vehicles}
            tourTitle={safeTourTitle}
            valueStripItems={isSafari ? SAFARI_VALUE_STRIP_ITEMS : undefined}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          {isSafari ? (
            <PrivateTourInclusions
              included={SAFARI_INCLUDED}
              notIncluded={SAFARI_NOT_INCLUDED}
              helperText={SAFARI_INCLUSIONS_HELPER}
              note={SAFARI_INCLUSIONS_NOTE}
            />
          ) : (
            <PrivateTourInclusions />
          )}
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
