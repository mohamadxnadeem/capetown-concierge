"use client";

import { activities, travelerTypes } from "./data";
import ActivitiesHero from "./ActivitiesHero";
import ActivitiesTimeline from "./ActivitiesTimeline";
import ActivitiesTravellerTypes from "./ActivitiesTravellerTypes";
import { PageWrap } from "./shared";

import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";
import FeaturedExperiences from "../FeaturedExperiences";

import { useT } from "../../../lib/i18n/LocaleContext";
type FeaturedExperienceItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
};

type Props = {
  featuredExperiences?: FeaturedExperienceItem[];
};

export default function BestActivitiesPage({ featuredExperiences = [] }: Props) {
  const tt = useT();
  return (
    <PageWrap>
      <ActivitiesHero />

      <ActivitiesTimeline activities={activities(tt)} />

      <FeaturedExperiences
        title={tt("BestActivitiesPage.best-private-tours-experiences-in")}
        description="Discover some of the most popular private experiences in Cape Town, from scenic coastal routes and Cape Peninsula highlights to wine tours, luxury activities, and curated chauffeur-driven days."
        items={featuredExperiences}
      />

      <ActivitiesTravellerTypes items={travelerTypes(tt)} />

      <TestimonialsSection />
      <TestimonialsCta />
    </PageWrap>
  );
}