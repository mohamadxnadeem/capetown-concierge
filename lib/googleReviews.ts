import data from "./googleReviews.json";

export type GoogleReview = {
  id: string;
  reviewer_name: string;
  rating: number;
  date: string | null;
  date_label: string | null;
  translated_from: string | null;
  text: string;
  services: string[];
  vehicles: string[];
  drivers: string[];
  featured_on: string[];
  hidden: boolean;
  hidden_reason: string | null;
  source: string;
};

const allReviews = data.reviews as GoogleReview[];

const DO_NOT_FEATURE_PREFIX = "Not hidden, but do not feature";
const MIN_TOP_UP_LENGTH = 80;

export const GOOGLE_REVIEWS_URL = "https://share.google/P13pnsYwTEQGoPaSh";

function isDoNotFeature(r: GoogleReview) {
  return Boolean(r.hidden_reason && r.hidden_reason.startsWith(DO_NOT_FEATURE_PREFIX));
}

/** Reviews that may be shown at all (counted in totals). */
const visibleReviews = allReviews.filter((r) => !r.hidden);

/** Reviews that may be featured in a testimonial selection. */
const eligibleReviews = visibleReviews.filter((r) => !isDoNotFeature(r));

/** Newest first, undated last. Stable for ties. */
function byNewest(a: GoogleReview, b: GoogleReview) {
  if (a.date && b.date) return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  if (a.date) return -1;
  if (b.date) return 1;
  return 0;
}

/** Computed from the data file: never hardcode. */
export const googleReviewCount = visibleReviews.length;
export const googleReviewRating =
  visibleReviews.reduce((sum, r) => sum + r.rating, 0) / (visibleReviews.length || 1);
export const googleRatingLabel = googleReviewRating.toFixed(1);
/** For example "5.0 from 62 Google reviews". */
export const googleSummaryText = `${googleRatingLabel} from ${googleReviewCount} Google reviews`;

/**
 * Pick reviews for a page. `tags` are in priority order (for example a vehicle
 * tag first, then "chauffeur"). Tagged reviews come first, newest first, then
 * the list is topped up with other eligible reviews up to `count`.
 */
export function selectReviews(tags: string[], count: number): GoogleReview[] {
  const picked: GoogleReview[] = [];
  const seen = new Set<string>();
  const add = (r: GoogleReview) => {
    if (picked.length >= count || seen.has(r.id)) return;
    seen.add(r.id);
    picked.push(r);
  };

  for (const tag of tags) {
    eligibleReviews
      .filter((r) => r.featured_on.includes(tag))
      .sort(byNewest)
      .forEach(add);
  }

  [...eligibleReviews]
    .filter((r) => r.text.length >= MIN_TOP_UP_LENGTH)
    .sort(byNewest)
    .forEach(add);

  return picked;
}

/** Tag for a vehicle page, from the vehicle slug or title. */
export function vehicleReviewTags(slugOrTitle: string | undefined | null): string[] {
  const s = (slugOrTitle || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const tags: string[] = [];
  if (s.includes("range-rover")) tags.push("range-rover-sport");
  if (s.includes("bmw-x5") || s.includes("x5")) tags.push("bmw-x5");
  return [...tags, "chauffeur"];
}

/** Tags for a tour detail page, matched on the tour slug. */
export function tourReviewTags(slug: string | undefined | null): string[] {
  const s = (slug || "").toLowerCase();
  if (s.includes("peninsula")) return ["peninsula-tour"];
  if (s.includes("wine")) return ["winelands-tour"];
  if (s.includes("safari") || s.includes("big-5") || s.includes("big5")) return ["safari-tour"];
  return [];
}

/** Eligible reviews carrying a tag, newest first. No top-up with other reviews. */
export function reviewsWithTag(tag: string): GoogleReview[] {
  return eligibleReviews.filter((r) => r.featured_on.includes(tag)).sort(byNewest);
}

/** Every review that may be shown (no hidden, no "do not feature"), newest first, undated last. */
export function allEligibleReviews(): GoogleReview[] {
  return [...eligibleReviews].sort(byNewest);
}

/** For example "5.0 from 62 Google reviews", in the page language. */
export function googleSummary(tt: (key: string, vars?: Record<string, string | number>) => string): string {
  return tt("reviews.summary", { rating: googleRatingLabel, count: googleReviewCount });
}
