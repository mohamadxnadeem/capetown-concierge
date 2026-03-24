import type { Metadata } from "next";
import { brand } from "../lib/brand";
import StyledComponentsRegistry from "../lib/styled-components-registry";
import Providers from "./providers";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export const metadata: Metadata = {
  title: brand.name,
  description: brand.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}