import Section from "@/app/components/ui/Section";
import styles from "./Highlights.module.css";

const highlights = [
  {
    title: "Precision engineering",
    description: "Placeholder copy describing a core capability or value.",
  },
  {
    title: "Mission-ready systems",
    description: "Placeholder copy describing a core capability or value.",
  },
  {
    title: "Trusted partnerships",
    description: "Placeholder copy describing a core capability or value.",
  },
];

export default function Highlights() {
  return (
    <Section id="highlights" eyebrow="What we do" title="Built for demanding missions">
      <div className={styles.grid}>
        {highlights.map((item) => (
          <article key={item.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardText}>{item.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
