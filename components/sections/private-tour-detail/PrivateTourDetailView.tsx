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
import Breadcrumbs from "../../common/Breadcrumbs";
import RelatedLinks from "../../common/RelatedLinks";
import { getTourSeo, fixTourText } from "../../../lib/tourSeo";


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

  const content = getTourContent(slug || experience?.slug);

  const whatsappLink = `https://wa.me/27636746131?text=${encodeURIComponent(`Hi, I'd like to book the ${safeTourTitle}. Please assist.`)}`;
  const midCtaWhatsappLink = `https://wa.me/27636746131?text=${encodeURIComponent(`Hi, I'd like to book the ${safeTourTitle}. Please assist.`)}`;
  const bundleWhatsAppLink = `https://wa.me/27636746131?text=${encodeURIComponent(`Hi, I'd like to enquire about private tours in Cape Town including the ${safeTourTitle}. Please assist.`)}`;

  const seo = getTourSeo(slug || experience?.slug);
  const heading = seo?.h1 || safeTourTitle;

  const stops = [...(experience.stops || [])]
    .sort((a, b) => a.order - b.order)
    .map((stop) => ({
      ...stop,
      title: fixTourText(stop.title) || stop.title,
      short_description: fixTourText(stop.short_description),
      highlight: fixTourText(stop.highlight),
    }));

  return (
    <PageWrap>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tours", href: "/tours" },
          { label: seo?.cardName || safeTourTitle },
        ]}
      />
      <Section>
        <Container>
          <PrivateTourGallery
            title={seo?.imageAlt || safeTourTitle}
            photos={experience.cover_photos || []}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <PrivateTourIntro
            title={heading}
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
            title={seo?.cardName || safeTourTitle}
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
          <PrivateTourVehicles items={vehicles} tourTitle={safeTourTitle} title={content.vehiclesTitle} />
        </Container>
      </Section>

      <Section>
        <Container>
          <PrivateTourInclusions title={content.inclusionsTitle} />
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
          <PrivateTourFaq items={content.faqItems} lowestVehiclePrice={lowestVehiclePrice} title={content.faqTitle} />
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

      <RelatedLinks
        title="Plan your Cape Town trip"
        text="More ideas and guides to help you plan private days out in Cape Town."
        links={[
          ...(seo ? [{ href: seo.guideHref, label: `Read our guide: ${seo.guideLabel}` }] : []),
          { href: "/tours", label: "Compare all our best private tours in Cape Town" },
          { href: "/chauffeur-hire", label: "Hire a private chauffeur in Cape Town by the day" },
        ]}
      />

      <PrivateTourCta
        whatsappLink={whatsappLink}
        title={content.ctaTitle}
        body={content.ctaBody}
      />
    </PageWrap>
  );
}
