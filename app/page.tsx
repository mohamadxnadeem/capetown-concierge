import HeroBanner from "../components/sections/HeroBanner";
import ServicesOverview from "../components/sections/ServicesOverview";
import FeaturedVehicles from "../components/sections/FeaturedVehicles";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import FeaturedExperiences from "../components/sections/FeaturedExperiences";
import TestimonialsSection from "../components/sections/testimonials/TestimonialsSection";
import TestimonialsCta from "../components/sections/testimonials/TestimonialsCta";

const homepageServices = [
  {
    title: "Chauffeur Services",
    description:
      "Private luxury chauffeur travel across Cape Town for leisure, business, and special occasions.",
    href: "/chauffeur-services",
  },
  {
    title: "Airport Transfers",
    description:
      "Reliable premium airport pickups and drop-offs with comfort, punctuality, and a polished experience.",
    href: "/airport-transfers",
  },
  {
    title: "Private Tours",
    description:
      "Tailored Cape Town day tours and scenic experiences designed around your pace and preferences.",
    href: "/private-tours",
  },
  {
    title: "Luxury Accommodation",
    description:
      "Premium villas, boutique stays, and carefully selected accommodation for elevated travel experiences.",
    href: "/accommodation",
  },
  {
    title: "Corporate Travel",
    description:
      "Executive transport solutions for professionals, business visitors, and VIP guests in Cape Town.",
    href: "/corporate-travel",
  },
  {
    title: "Curated Experiences",
    description:
      "From wine routes to coastal escapes, enjoy bespoke travel planning with a luxury concierge touch.",
    href: "/private-tours",
  },
];

const trustItems = [
  {
    title: "Professional Chauffeur Service",
    description:
      "Enjoy a polished, private, and dependable experience with professional service from start to finish.",
  },
  {
    title: "Luxury Travel Presentation",
    description:
      "Every journey is designed to feel refined, comfortable, and premium, with attention to the details that matter.",
  },
  {
    title: "Tailored Cape Town Experiences",
    description:
      "From airport transfers to private tours, each booking is shaped around your schedule, style, and preferences.",
  },
  {
    title: "Local Knowledge You Can Trust",
    description:
      "Travel with confidence through Cape Town with trusted local insight, smooth coordination, and thoughtful planning.",
  },
];

const testimonialItems = [
  {
    name: "James R.",
    subtitle: "London, UK",
    quote:
      "An exceptional experience from start to finish. The vehicle was immaculate, communication was seamless, and the service felt truly premium throughout our stay in Cape Town.",
  },
  {
    name: "Sophie & Daniel",
    subtitle: "Dubai, UAE",
    quote:
      "We booked airport transfers and a private full-day tour, and everything was handled beautifully. Professional, punctual, and very polished. Highly recommended.",
  },
  {
    name: "Nadia K.",
    subtitle: "Johannesburg, South Africa",
    quote:
      "Cape Town Concierge made our trip effortless. The attention to detail, comfort, and local insight gave us a much more elevated experience than standard transport services.",
  },
];

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
  experience: Experience;
};

type FeaturedExperienceItem = {
  title: string;
  description: string;
  href: string;
  image: string;
};

type FeaturedVehicleItem = {
  title: string;
  description: string;
  href: string;
  image: string;
  seats?: number;
  price?: string;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function formatPrice(price?: string | number) {
  if (price === undefined || price === null || price === "") return "";
  return `R${price}`;
}

async function getFeaturedExperiences(): Promise<FeaturedExperienceItem[]> {
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

    return data
      .map((item) => {
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
        };
      })
      .filter(
        (item): item is FeaturedExperienceItem => item !== null
      );
  } catch (error) {
    console.error("Error loading featured experiences:", error);
    return [];
  }
}

async function getFeaturedVehicles(): Promise<FeaturedVehicleItem[]> {
  try {
    const response = await fetch(
      "https://web-production-1ab9.up.railway.app/api/cars-for-hire/all/",
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cars for hire");
    }

    const data = await response.json();

    const sourceArray = Array.isArray(data)
      ? data
      : Array.isArray(data?.results)
      ? data.results
      : [];

    return sourceArray
      .map((item: any) => {
        const car = item?.car || item;

        if (!car?.title) return null;

        const imageArray = car.cover_photos || car.images || [];

        const featuredPhoto =
          imageArray.find((photo: any) => photo?.is_featured)?.cover_photos ||
          imageArray[0]?.cover_photos ||
          "";

        const plainTextBody = stripHtml(car.body || "");
        const description =
          car.short_description ||
          car.highlight ||
          truncateText(plainTextBody, 140) ||
          "Luxury chauffeur vehicle available for private travel in Cape Town.";

        const href =
          typeof car.slug === "string" && car.slug.trim()
            ? `/chauffeur-services/${car.slug.trim()}`
            : "/chauffeur-services";

        return {
          title: car.title,
          description,
          href,
          image: featuredPhoto,
          seats: car.number_of_seats,
          price: formatPrice(car.price),
        };
      })
      .filter(
        (item): item is FeaturedVehicleItem => item !== null
      );
  } catch (error) {
    console.error("Error loading vehicles:", error);
    return [];
  }
}

export default async function HomePage() {
  const [featuredVehicleItems, featuredExperienceItems] = await Promise.all([
    getFeaturedVehicles(),
    getFeaturedExperiences(),
  ]);

  return (
    <>
      <HeroBanner
        eyebrow="Cape Town Concierge"
        title="Luxury Chauffeur Services in Cape Town"
        description="Premium airport transfers, private chauffeur services, and curated travel experiences designed for clients who value comfort, elegance, and reliability."
        primaryCtaLabel="Book Your Ride"
        primaryCtaHref="/contact"
        secondaryCtaLabel="Explore Services"
        secondaryCtaHref="/chauffeur-services"
        image="/images/hero-car.jpg"
      />

      {/* <ServicesOverview services={homepageServices} /> */}

      <TestimonialsSection />

      <TestimonialsCta />

      <FeaturedVehicles items={featuredVehicleItems} />

      <WhyChooseUs items={trustItems} />

      <FeaturedExperiences items={featuredExperienceItems} />
    </>
  );
}