import type { BrandConfig } from "../lib/brandConfig";

export const capeTownConciergeBrand: BrandConfig = {
  name: "Cape Town Concierge",
  shortName: "CTC",
  siteUrl: "https://www.capetown-concierge.co.za",
  tagline:
    "Luxury chauffeur services, private tours, and premium travel experiences in Cape Town",
  contactEmail: "zaid@capetown-concierge.co.za",
  phone: "+27 63 674 6131",
  whatsappNumber: "27636746131",
  logoPath: "/images/icon.png",
  heroImagePath: "/images/hero-car.jpg",
  address: {
    locality: "Cape Town",
    region: "Western Cape",
    country: "ZA",
    postalCode: "8001",
  },
  geo: {
    lat: -33.9249,
    lng: 18.4241,
  },
  colors: {
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