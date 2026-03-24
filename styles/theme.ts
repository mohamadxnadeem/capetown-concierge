import { brand } from "@/lib/brand";

export const theme = {
  brand,
  colors: brand.colors,
  radius: {
    sm: "10px",
    md: "16px",
    lg: "24px",
    xl: "32px",
  },
  shadows: {
    soft: "0 10px 30px rgba(18, 61, 43, 0.06)",
    card: "0 18px 40px rgba(18, 61, 43, 0.08)",
  },
  spacing: {
    xs: "8px",
    sm: "12px",
    md: "16px",
    lg: "24px",
    xl: "40px",
    xxl: "64px",
  },
  container: {
    maxWidth: "1280px",
  },
  breakpoints: {
    sm: "768px",
    md: "1024px",
    lg: "1280px",
    xl: "1440px",
  },
};