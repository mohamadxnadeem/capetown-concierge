"use client";

import { activities, travelerTypes } from "./data";
import ActivitiesHero from "./ActivitiesHero";
import ActivitiesTimeline from "./ActivitiesTimeline";
import ActivitiesTravellerTypes from "./ActivitiesTravellerTypes";
import { PageWrap } from "./shared";

import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";
import FeaturedExperiences from "../FeaturedExperiences";

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
  return (
    <PageWrap>
      <ActivitiesHero />

      <ActivitiesTimeline activities={activities} />

      <FeaturedExperiences
        title="Best Private Tours & Experiences in Cape Town"
        description="Discover some of the most popular private experiences in Cape Town, from scenic coastal routes and Cape Peninsula highlights to wine tours, luxury activities, and curated chauffeur-driven days."
        items={featuredExperiences}
      />

      <ActivitiesTravellerTypes items={travelerTypes} />

      <TestimonialsSection />
      <TestimonialsCta />
    </PageWrap>
  );
}