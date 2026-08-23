// ─────────────────────────────────────────────────────────────────────
// Pricing config — flat rand amounts and percentages that shape
// package pricing across the site. Kept in config.json (repo root)
// so a non-code deploy can tune them.
//
// out_of_town_daily_uplift:
//   Flat ZAR added to the vehicle's standard daily rate when the trip
//   leaves Cape Town for the Garden Route. Covers driver
//   accommodation, meals, and additional fuel — costs that don't scale
//   with vehicle class, which is why the uplift is a fixed rand amount
//   rather than a percentage.
//
// garden_route_duration_discount_percent:
//   Discount applied to the out-of-town daily rate when a client
//   books a 7-day Garden Route package rather than 7 individual days.
// ─────────────────────────────────────────────────────────────────────

import raw from "../config.json";

export interface PricingConfig {
  out_of_town_daily_uplift: number;
  garden_route_duration_discount_percent: number;
}

export const pricingConfig: PricingConfig = raw;
