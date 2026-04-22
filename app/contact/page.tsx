import type { Metadata } from "next";
import ContactContent from "../../components/sections/ContactContent";
import { brand } from "../../lib/brand";

const SITE_URL = brand.siteUrl;

export const metadata: Metadata = {
  title: "Contact | Cape Town Concierge",
  description:
    "Get in touch with Cape Town Concierge to book a luxury chauffeur service or private tour in Cape Town.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <ContactContent />;
}
