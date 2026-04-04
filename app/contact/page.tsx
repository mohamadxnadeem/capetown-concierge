import type { Metadata } from "next";
import ContactContent from "../../components/sections/ContactContent";

export const metadata: Metadata = {
  title: "Contact | Cape Town Concierge",
  description:
    "Get in touch with Cape Town Concierge to book a luxury chauffeur service or private tour in Cape Town.",
  robots: { index: false, follow: false },
};

export default function ContactPage() {
  return <ContactContent />;
}
