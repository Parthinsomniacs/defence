"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { pageLinks, focusLinks } from "@/app/config/navigation";
import AnimatedButton from "@/app/components/ui/AnimatedButton";
import styles from "./Header.module.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Build the open/close timeline once (paused, played/reversed on toggle).
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const overlayDuration = reduceMotion ? 0.01 : 0.9;
    const drawerDuration = reduceMotion ? 0.01 : 1.1;

    const ctx = gsap.context(() => {
      // Initial hidden state.
      gsap.set(overlayRef.current, { autoAlpha: 0 });
      gsap.set(drawerRef.current, { yPercent: -100 });

      const tl = gsap
        .timeline({ paused: true })
        .set(overlayRef.current, { autoAlpha: 1 })
        .fromTo(
          overlayRef.current,
          { backgroundColor: "rgba(0, 0, 0, 0)" },
          {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            duration: overlayDuration,
            ease: "power2.out",
          },
          0
        )
        .fromTo(
          drawerRef.current,
          { yPercent: -100 },
          { yPercent: 0, duration: drawerDuration, ease: "power3.inOut" },
          0
        );

      timelineRef.current = tl;
    });

    return () => ctx.revert();
  }, []);

  // Play forward when opening, reverse when closing.
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isOpen]);

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

      {/* Full-width navigation panel (slides down from the top) */}
      <div
        ref={overlayRef}
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      >
        <div
          ref={drawerRef}
          className={styles.drawer}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
        >
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
    </header>
  );
}

