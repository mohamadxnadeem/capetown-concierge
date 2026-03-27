"use client";

import { useEffect, useState } from "react";

import { activities, travelerTypes } from "./data";
import ActivitiesFinalCta from "./ActivitiesFinalCta";
import ActivitiesHero from "./ActivitiesHero";
import ActivitiesTimeline from "./ActivitiesTimeline";
import ActivitiesTravellerTypes from "./ActivitiesTravellerTypes";
import { PageWrap } from "./shared";

import TestimonialsSection from "../testimonials/TestimonialsSection";
import TestimonialsCta from "../testimonials/TestimonialsCta";
import FeaturedExperiences from "../FeaturedExperiences";

type ExperiencePhoto = {
  id: number;
  cover_photos: string;
  is_featured: boolean;
  order: number;
};

type Experience = {
  id: number;
  title: string;
  slug?: string;
  short_description?: string;
  highlight?: string;
  body?: string;
  cover_photos?: ExperiencePhoto[];
};

type ExperienceApiItem = {
  experience?: Experience;
} & Partial<Experience>;

type FeaturedExperienceItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  alt: string;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export default function BestActivitiesPage() {
  const [featuredExperienceItems, setFeaturedExperienceItems] = useState<
    FeaturedExperienceItem[]
  >([]);

  useEffect(() => {
    async function getFeaturedExperiences() {
      try {
        const response = await fetch(
          "https://web-production-1ab9.up.railway.app/api/experiences/all/",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch experiences");
        }

        const data: ExperienceApiItem[] = await response.json();

        const items = data
          .map((item: ExperienceApiItem) => {
            const experience = item?.experience || item;

            if (!experience?.title) return null;

            const featuredPhoto =
              experience.cover_photos?.find((photo) => photo.is_featured)
                ?.cover_photos ||
              experience.cover_photos?.[0]?.cover_photos ||
              "";

            const plainTextBody = stripHtml(experience.body || "");
            const description =
              experience.short_description ||
              experience.highlight ||
              truncateText(plainTextBody, 140) ||
              "Discover a premium private tour in Cape Town.";

            return {
              title: experience.title,
              description,
              href: experience.slug
                ? `/private-tours/${experience.slug}`
                : "/private-tours",
              image: featuredPhoto,
              alt: `Private ${experience.title} in Cape Town with Professional Driver`,
            };
          })
          .filter((item): item is FeaturedExperienceItem => item !== null);

        setFeaturedExperienceItems(items);
      } catch (error) {
        console.error("Error loading featured experiences:", error);
        setFeaturedExperienceItems([]);
      }
    }

    getFeaturedExperiences();
  }, []);

  return (
    <PageWrap>
      <ActivitiesHero />

      <ActivitiesTimeline activities={activities} />

      <FeaturedExperiences
        title="Best Private Tours & Experiences in Cape Town"
        description="Discover some of the most popular private experiences in Cape Town, from scenic coastal routes and Cape Peninsula highlights to wine tours, luxury activities, and curated chauffeur-driven days."
        items={featuredExperienceItems}
      />

      <ActivitiesTravellerTypes items={travelerTypes} />

      <TestimonialsSection />
      <TestimonialsCta />

      <ActivitiesFinalCta />
    </PageWrap>
  );
}