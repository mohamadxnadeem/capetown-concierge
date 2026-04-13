export interface BrandConfig {
  name: string;
  shortName: string;
  siteUrl: string;
  tagline: string;
  contactEmail: string;
  phone: string;          // formatted for display: "+27 63 674 6131"
  whatsappNumber: string; // raw digits only: "27636746131"
  logoPath: string;       // "/images/logo.svg"
  heroImagePath: string;  // "/images/hero-car.jpg"
  address: {
    locality: string;     // "Cape Town"
    region: string;       // "Western Cape"
    country: string;      // "ZA"
    postalCode: string;   // "8001"
  };
  geo: {
    lat: number;
    lng: number;
  };
  colors: {
    primary: string;
    primaryDark: string;
    heading: string;
    background: string;
    backgroundSoft: string;
    text: string;
    textMuted: string;
    textMuted2: string;
    border: string;
    white: string;
    error: string;
  };
}
