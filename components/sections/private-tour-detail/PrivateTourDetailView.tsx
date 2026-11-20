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
import { selectReviews, tourReviewTags } from "../../../lib/googleReviews";
import PrivateTourFaq from "./PrivateTourFaq";
import PrivateTourRelatedTours from "./PrivateTourRelatedTours";
import PrivateTourCta from "./PrivateTourCta";
import Breadcrumbs from "../../common/Breadcrumbs";
import RelatedLinks from "../../common/RelatedLinks";
import { getTourSeo, fixTourText } from "../../../lib/tourSeo";


import {
  Experience,
  TourVehicle,
  RelatedTour,
} from "./types";

import { useT } from "../../../lib/i18n/LocaleContext";
const PageWrap = styled.main`
  background: ${({ theme }) => theme.colors.background};
`;

const Section = styled.section`
  padding: 64px 0;
`;

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
  const tt = useT();
  const safeTourTitle = experience?.title || "private tour";

  const content = getTourContent(slug || experience?.slug, tt);

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
          <PrivateTourReviews reviews={selectReviews(tourReviewTags(slug || experience?.slug), 3)} />
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
        title={tt("PrivateTourDetailView.plan-your-cape-town-trip")}
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
