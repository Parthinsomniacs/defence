import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Defence &amp; Aerospace Systems</p>

        <h1 id="hero-title" className={styles.title}>
          Engineered for the mission ahead
        </h1>

        <p className={styles.description}>
          Placeholder for your headline message. Describe what the company
          builds and the outcome it delivers for defence partners.
        </p>

        <div className={styles.actions}>
          <Link href="/contact" className={styles.primary}>
            Request a briefing
          </Link>
          <Link href="/capabilities" className={styles.secondary}>
            Explore capabilities
          </Link>
        </div>
      </div>
    </section>
  );
}
