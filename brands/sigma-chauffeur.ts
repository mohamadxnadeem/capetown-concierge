import type { BrandConfig } from "../lib/brandConfig";

export const sigmaVipBrand: BrandConfig = {
  name: "Sigma VIP",
  shortName: "Sigma",
  siteUrl: "https://www.sigmavip.co.za",
  tagline:
    "Luxury chauffeur services, private tours, and premium travel experiences in Cape Town",
  contactEmail: "info@sigmavip.co.za",
  phone: "+27 71 108 1227",
  whatsappNumber: "27711081227",
  logoPath: "/images/logo.svg",
  heroImagePath: "/images/hero-car.jpg",
  address: {
    locality: "Cape Town",
    region: "Western Cape",
    country: "ZA",
    postalCode: "7700",
  },
  geo: {
    lat: -33.9593,
    lng: 18.4742,
  },
  colors: {
    // TODO: replace with Sigma VIP's actual brand colours
    primary: "#0b5b33",
    primaryDark: "#063e23",
    heading: "#123d2b",
    background: "#f6f8f7",
    backgroundSoft: "#fbfcfb",
    text: "#1f2a24",
    textMuted: "#6c7a74",
    textMuted2: "#7a8882",
    border: "#e3e8e5",
    white: "#ffffff",
    error: "#a12626",
  },
};
