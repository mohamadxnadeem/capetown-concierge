import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryDark: string;
      white: string;
      heading: string;
      textMuted: string;
      background: string;
      backgroundSoft: string;
      border: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
    };
    radius: {
      md: string;
      lg: string;
    };
    shadows: {
      soft: string;
      card: string;
    };
  }
}