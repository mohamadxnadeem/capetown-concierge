import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      secondary?: string;
      accent?: string;
      white: string;
      black?: string;
      heading: string;
      text?: string;
      textMuted: string;
      background: string;
      backgroundSoft: string;
      border: string;
      danger?: string;
      success?: string;
      warning?: string;
    };
    breakpoints: {
      xs?: string;
      sm: string;
      md: string;
      lg: string;
      xl?: string;
    };
    radius: {
      sm?: string;
      md: string;
      lg: string;
      xl?: string;
      pill?: string;
    };
    shadows: {
      soft: string;
      card: string;
      hover?: string;
      lg?: string;
    };
    container: {
      maxWidth: string;
      narrow?: string;
      wide?: string;
    };
  }
}