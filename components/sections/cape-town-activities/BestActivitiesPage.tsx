"use client";

import { activities, services, travelerTypes } from "./data";
import ActivitiesFinalCta from "./ActivitiesFinalCta";
import ActivitiesHero from "./ActivitiesHero";
import ActivitiesServices from "./ActivitiesServices";
import ActivitiesTimeline from "./ActivitiesTimeline";
import ActivitiesTravellerTypes from "./ActivitiesTravellerTypes";
import { PageWrap } from "./shared";
import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";


export default function BestActivitiesPage() {
  return (
    <PageWrap>
      <ActivitiesHero />
      <TestimonialsSection />
      <TestimonialsCta />
      <ActivitiesTimeline activities={activities} />
      <ActivitiesTravellerTypes items={travelerTypes} />
      <ActivitiesServices items={services} />
      <ActivitiesFinalCta />
    </PageWrap>
  );
}