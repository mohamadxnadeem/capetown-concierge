# i18n audit (agent/i18n-v2, base 7091e11)

Live, non-hidden public pages. Villas and hotels are hidden (noindex, no links, not in the sitemap).
Booking, booking-confirmation, driver and api stay English only.
Copy lives in: component file (C), lib or data file (L), backend API field (API).
Shared on every page: Header, Sidebar, Footer, FloatingWhatsApp, CurrencySelector, GoogleRatingBadge
(all in `components/common/`). Their copy is already in `messages/*/common.json`.

| Page (English URL) | Main components | Where the copy lives |
|---|---|---|
| `/` | HeroBanner, FeaturedVehicles, FeaturedExperiences, TestimonialsSection, HomeSections, HomeEnquiry (EnquiryForm) | C: `components/sections/*`, `home/HomeSections.tsx`; L: `lib/homepageData.ts`, `lib/googleReviews.json`; API: tours and vehicles |
| `/chauffeur-hire` | ChauffeurServicesPage (+ chauffeur-services/*), RelatedLinks | C: `chauffeur-services/ChauffeurServicesPage.tsx` (long inline copy and arrays); L: `lib/vehicleTrustBadges.ts`; API: vehicles |
| `/chauffeur-hire/<slug>` (7) | ChauffeurDetailView and 20 parts in `chauffeur-services/`, ChauffeurDateEnquiry | C: `chauffeur-services/*` (headings, FAQ builder in `utils.ts`, trust badges); API: vehicle title, descriptions, features, ideal_for, body; messages: `vehicles.json` |
| `/tours` | TourHubSections, HeroBanner, FeaturedExperiences, WhyChooseUs, Testimonials, Breadcrumbs, RelatedLinks | C: `tours-hub/TourHubSections.tsx`, `WhyChooseUs.tsx`; L: `lib/tourHub.ts`, `lib/tourSeo.ts`; API: tours |
| `/tours/<slug>` (4) | PrivateTourDetailView and parts in `private-tour-detail/` | C: `private-tour-detail/*`; L: `lib/tourPageContent.ts`, `lib/tourSeo.ts`; API: tour title, descriptions, stops, body, meta; messages: `tours.json` |
| `/airport-transfers-cape-town` | HeroBanner, WhyChooseUs, FeaturedVehicles, FaqSection, Testimonials | C: the page file itself (arrays of copy) plus shared sections |
| `/best-wine-farms-in-cape-town` | WineFarmsPage (+ wine-farms/*) | L: `wine-farms/data.ts`; C: `wine-farms/*.tsx` |
| `/best-activities-to-do-in-cape-town` | BestActivitiesPage (+ cape-town-activities/*) | L: `cape-town-activities/data.ts`; page file; C: `cape-town-activities/*.tsx` |
| `/7-day-cape-town-itinerary` | ItineraryPage (+ cape-town-itinerary/*) | L: `cape-town-itinerary/data.ts`; C: `cape-town-itinerary/*.tsx` |
| `/multi-day-chauffeur-cape-town` | FaqSection, HomeSections | L: `lib/multiDay.ts` |
| `/reviews` | HomeSections (reviews) | L: `lib/googleReviews.json` (customer reviews, stay as written) |
| `/contact` | ContactContent (EnquiryForm) | C: `ContactContent.tsx` |
| `/cancellation-policy` | CancellationPolicyContent | C: `CancellationPolicyContent.tsx` |
| `/privacy` | PrivacyContent | C: `PrivacyContent.tsx` |

Forms (all use the same `language` field and subject prefix): `EnquiryForm` (home, contact, home collapsible),
`ChauffeurDateEnquiry` (vehicle pages). No other forms exist on the public pages.

## Status of extraction
Done (in `messages/en/common.json`): header, language switcher, sidebar, footer, floating WhatsApp,
404 page, both forms (labels, placeholders, errors, confirmation, WhatsApp date message), page titles and descriptions
(`meta.json`, reference copy of the live metadata).
Not yet extracted: the long body copy of the pages above (it still renders from the component and lib files in English
on every locale). That is the next phase, page by page, checked with the same English diff.
