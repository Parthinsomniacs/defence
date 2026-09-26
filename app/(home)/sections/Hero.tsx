import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-label="Hero Section">
      {/* Background Cinematic Editorial Portrait */}
      <div className={styles.bgWrapper} aria-hidden="true">
        <Image
          src="/images/hero-editorial.jpg"
          alt="Editorial high-fashion portrait with neon lighting"
          fill
          priority
          quality={92}
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      {/* Subtle Vertical Grid Guidelines */}
      <div className={styles.gridLines} aria-hidden="true">
        <div className={styles.gridColumn} />
        <div className={styles.gridColumn} />
        <div className={styles.gridColumn} />
        <div className={styles.gridColumn} />
      </div>

      {/* Main Content Layout */}
      <div className={styles.inner}>
        <div className={styles.content}>
          {/* Bottom Left Info & CTA */}
          <div className={styles.leftBlock}>
            <span className={styles.squareIndicator} aria-hidden="true" />
            <p className={styles.headline}>
              ENGINEERING<br />
              STRATEGIC CAPABILITY<br />
              FOR THE NEXT ERA
            </p>
            <div className={styles.buttonGroup}>
              <Link href="/capabilities" className={styles.primaryButton}>
                Explore Capabilities
              </Link>
              <Link href="/contact" className={styles.secondaryButton}>
                Contact Anuvyom
              </Link>
            </div>
          </div>

          {/* Bottom Right: Tagline + Giant ANUVYOM Typography */}
          <div className={styles.rightBlock}>
            <div className={styles.tagline}>
              <span>Aerospace</span>
              <span className={styles.slash} aria-hidden="true">
                /
              </span>
              <span>Defence</span>
              <span className={styles.slash} aria-hidden="true">
                /
              </span>
              <span>Advanced Systems</span>
              <span className={styles.slash} aria-hidden="true">
                /
              </span>
              <span>Petrochemical</span>
            </div>
            <h1 className={styles.heroTitle}>ANUVYOM</h1>
          </div>
        </div>
      </div>
    </section>
  );
}

