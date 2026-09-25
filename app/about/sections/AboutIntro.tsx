import Section from "@/app/components/ui/Section";
import styles from "./AboutIntro.module.css";

export default function AboutIntro() {
  return (
    <Section id="about-intro" eyebrow="About" title="Who we are">
      <p className={styles.lead}>
        Placeholder introduction for the About page. Replace this with the
        company story, mission and what sets the work apart.
      </p>
    </Section>
  );
}
