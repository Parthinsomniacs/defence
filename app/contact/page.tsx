import type { Metadata } from "next";
import Section from "@/app/components/ui/Section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a briefing.",
};

export default function ContactPage() {
  return (
    <Section id="contact" eyebrow="Contact" title="Request a briefing">
      <p>Placeholder for the contact page. Add a contact form or details here.</p>
    </Section>
  );
}
