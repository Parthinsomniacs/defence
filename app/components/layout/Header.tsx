"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { pageLinks, focusLinks } from "@/app/config/navigation";
import AnimatedButton from "@/app/components/ui/AnimatedButton";
import styles from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Brand / Logo */}
        <Link href="/" className={styles.brand} aria-label="Home">
          <Image
            src="/images/logo-white-zoom.webp"
            alt="Logo"
            width={44}
            height={44}
            priority
            className={styles.logoImage}
          />
          <span className={styles.brandName}>ANUVYOM</span>
        </Link>

        {/* Right Actions: 2 Separate Buttons (LETS TALK + Hamburger Menu) */}
        <div className={styles.actions}>
          <AnimatedButton href="/contact" size="sm">
            LETS TALK
          </AnimatedButton>
          <button
            type="button"
            className={`${styles.menuButton} ${isOpen ? styles.menuButtonActive : ""}`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            <span className={`${styles.menuBar} ${styles.menuBarTop}`} />
            <span className={`${styles.menuBar} ${styles.menuBarMid}`} />
            <span className={`${styles.menuBar} ${styles.menuBarBot}`} />
          </button>
        </div>
      </div>

      {/* Slide-out Navigation Drawer / Overlay */}
      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div
            className={styles.drawer}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation"
          >
            <div className={styles.drawerHeader}>
              <span className={styles.drawerBrand}>NAVIGATION</span>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
              >
                &times;
              </button>
            </div>

            <div className={styles.drawerContent}>
              <div className={styles.drawerCol}>
                <p className={styles.drawerHeading}>PAGES</p>
                <ul className={styles.drawerList}>
                  {pageLinks.map((item) => (
                    <li key={item.label} className={styles.drawerItem}>
                      <Link
                        href={item.href}
                        className={styles.drawerLink}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.drawerCol}>
                <p className={styles.drawerHeading}>FOCUS</p>
                <ul className={styles.drawerList}>
                  {focusLinks.map((item) => (
                    <li key={item.label} className={styles.drawerItem}>
                      <Link
                        href={item.href}
                        className={styles.drawerLink}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.drawerFooter}>
              <Link
                href="/contact"
                className={styles.drawerCta}
                onClick={() => setIsOpen(false)}
              >
                GET A QUOTE &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

