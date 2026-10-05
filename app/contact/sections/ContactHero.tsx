import Image from "next/image";
import Link from "next/link";
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  return (
    <section className={styles.hero} aria-label="Contact Us">
      <div className={styles.inner}>
        <div className={styles.mainGrid}>
          {/* Left Column: Heading, Follow us bar, and Direct contact info */}
          <div className={styles.leftCol}>
            <div className={styles.topBlock}>
              <h1 className={styles.title}>CONTACT US</h1>

              <div className={styles.socialBar}>
                <span className={styles.followLabel}>Follow us :</span>
                <div className={styles.socialLinks}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    Instagram
                  </a>
                  <span className={styles.socialSlash} aria-hidden="true">
                    /
                  </span>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    Linkedin
                  </a>
                  <span className={styles.socialSlash} aria-hidden="true">
                    /
                  </span>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    Facebook
                  </a>
                  <span className={styles.socialSlash} aria-hidden="true">
                    /
                  </span>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    X
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.bottomBlock}>
              <h2 className={styles.connectHeading}>Let&apos;s connect!</h2>

              <div className={styles.contactInfoList}>
                <p className={styles.contactInfoText}>
                  Address - 123 Riverbend, California 94025, USA
                </p>
                <p className={styles.contactInfoText}>
                  <a href="tel:+18881234567" className={styles.contactInfoLink}>
                    (888) 123-4567
                  </a>
                </p>
                <p className={styles.contactInfoText}>
                  <a
                    href="mailto:info@example.com"
                    className={styles.contactInfoLink}
                  >
                    info@example.com
                  </a>
                </p>
              </div>

              <a href="#contact-form" className={styles.pillButton}>
                CONTACT US
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Visual & Collaborative Narrative */}
          <div className={styles.rightCol}>
            <div className={styles.imageCard}>
              <Image
                src="/images/contact-editorial.jpg"
                alt="Abstract organic tactile texture"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 420px"
                className={styles.image}
              />
            </div>

            <p className={styles.narrativeText}>
              Please feel free to contact us, and we will be in touch shortly.
              Together, we can determine if there is a mutual fit and explore
              potential opportunities for collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
