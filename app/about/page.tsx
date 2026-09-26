import type { Metadata } from "next";
import AboutIntro from "./sections/AboutIntro";
import Values from "./sections/Values";

export const metadata: Metadata = {
  title: "About",
  description: "Learn who we are and how we work.",
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <Values />
    </>
  );
}
