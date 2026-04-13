"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import GlobalStyles from "../styles/GlobalStyles";
import { CurrencyProvider } from "../context/CurrencyContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <CurrencyProvider>{children}</CurrencyProvider>
    </ThemeProvider>
  );
}