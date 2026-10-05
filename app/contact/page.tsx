import type { Metadata } from "next";
import ContactHero from "./sections/ContactHero";
import ContactFormSection from "./sections/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact | Anuvyom Alliance",
  description:
    "Direct strategic engagement, institutional defense procurement, aerospace engineering inquiries, and collaboration with Anuvyom Alliance.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
    </>
  );
}
