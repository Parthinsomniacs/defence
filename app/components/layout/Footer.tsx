import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/capabilities" },
  { label: "Affiliations", href: "#affiliations" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "/contact" },
];

const focusLinks = [
  { label: "Aerospace", href: "/capabilities" },
  { label: "Defence", href: "/platforms" },
  { label: "Advanced Systems", href: "/capabilities" },
  { label: "Petrochemical", href: "/capabilities" },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "X", href: "https://x.com" },
];

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.inner}>
        {/* Top Section: Brand + NAVIGATION, FOCUS, SOCIAL columns */}
        <div className={styles.top}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.brandLogo} aria-label="Anuvyom Home">
              <Image
                src="/images/logo-white-zoom.webp"
                alt="Logo"
                width={44}
                height={44}
                className={styles.logoImage}
              />
              <span className={styles.brandName}>ANUVYOM</span>
            </Link>

            <p className={styles.brandDescription}>
              Transforming ideas into memorable experiences through strategic design,
              creative storytelling, and innovative digital solutions that deliver
              measurable results.
            </p>

            <div className={styles.brandCta}>
              <Link href="/contact" className={styles.quoteButton}>
                GET A QUOTE
              </Link>
            </div>

            <div className={styles.locationBlock}>
              <div className={styles.locationIconWrapper} aria-hidden="true">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              </div>
              <p className={styles.addressText}>
                Address - 123 Riverbend, California 94025, USA
              </p>
            </div>
          </div>

          {/* Navigation Column */}
          <div className={styles.column}>
            <h2 className={styles.columnHeading}>NAVIGATION</h2>
            <ul className={styles.linkList}>
              {navigationLinks.map((item) => (
                <li key={item.label} className={styles.linkItem}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus Column */}
          <div className={styles.column}>
            <h2 className={styles.columnHeading}>FOCUS</h2>
            <ul className={styles.linkList}>
              {focusLinks.map((item) => (
                <li key={item.label} className={styles.linkItem}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div className={styles.column}>
            <h2 className={styles.columnHeading}>SOCIAL</h2>
            <ul className={styles.linkList}>
              {socialLinks.map((item) => (
                <li key={item.label} className={styles.linkItem}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dotted Divider */}
        <hr className={styles.divider} aria-hidden="true" />

        {/* Bottom Section: Giant ANUVYOM typography + Meta Credits */}
        <div className={styles.bottom}>
          <div className={styles.studioDisplay}>
            <span className={styles.studioText}>ANUVYOM</span>
          </div>

          <div className={styles.metaBlock}>
            <div className={styles.legalLinks}>
              <Link href="#style-guide" className={styles.metaLink}>
                Style guide
              </Link>
              <span className={styles.metaDivider} aria-hidden="true">
                /
              </span>
              <Link href="#licenses" className={styles.metaLink}>
                Licenses
              </Link>
            </div>

            <p className={styles.creditsLine}>
              Designed by :{" "}
              <a
                href="https://webflow.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.agencyLink}
              >
                Flow Design Agency,
              </a>
            </p>

            <p className={styles.creditsLine}>
              Powered by :{" "}
              <a
                href="https://webflow.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.platformLink}
              >
                Webflow
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

