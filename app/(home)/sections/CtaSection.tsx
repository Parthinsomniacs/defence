"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CtaSection.module.css";

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (mockupRef.current) {
        gsap.fromTo(
          mockupRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.1,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }

      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Call to Action"
    >
      <div className={styles.inner}>
        <div ref={cardRef} className={styles.ctaCard}>
          {/* Subtle Star Particle Field */}
          <div className={styles.particles} aria-hidden="true" />

          {/* Left Column: 3D Perspective Interface Mockup Stage */}
          <div ref={mockupRef} className={styles.mockupStage}>
            <div className={styles.perspectiveGroup}>
              {/* Back Layer 2 */}
              <div className={styles.layerBack2} aria-hidden="true" />

              {/* Back Layer 1 */}
              <div className={styles.layerBack1} aria-hidden="true" />

              {/* Foreground Tactical Window */}
              <div className={styles.mockupWindow}>
                {/* Top Window Bar */}
                <div className={styles.windowBar}>
                  <div className={styles.windowDots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>
                  <span className={styles.windowTitle}>
                    ANUVYOM OS // THEATER v4.2
                  </span>
                  <span className={styles.windowStatus}>
                    <span className={styles.statusIndicator} />
                    ONLINE
                  </span>
                </div>

                {/* Window Body */}
                <div className={styles.windowBody}>
                  {/* Glowing Radar / Orbit Hero Widget with Section Image */}
                  <div className={styles.globeTelemetryHero}>
                    <Image
                      src="/images/cta-mission-theater.jpg"
                      alt="Autonomous UAV & Multi-Domain Defence Telemetry"
                      fill
                      className={styles.heroImg}
                      sizes="(max-width: 768px) 100vw, 520px"
                      priority
                    />
                    <div className={styles.heroOverlay} aria-hidden="true" />
                    <div className={styles.heroContent}>
                      <span className={styles.globeTag}>
                        [ AUTONOMOUS MISSION THEATER ]
                      </span>
                      <h4 className={styles.globeHeadline}>
                        Turn Sovereign Ambition Into Capability
                      </h4>
                      <p className={styles.globeSubtext}>
                        Multi-domain telemetry &amp; autonomous UAV coordination
                      </p>
                    </div>
                  </div>

                  {/* Operational Telemetry Metrics */}
                  <div className={styles.metricsGrid}>
                    <div className={styles.metricBox}>
                      <span className={styles.metricLabel}>Readiness</span>
                      <span className={styles.metricValue}>100%</span>
                    </div>
                    <div className={styles.metricBox}>
                      <span className={styles.metricLabel}>Domains</span>
                      <span className={styles.metricValue}>4 Active</span>
                    </div>
                    <div className={styles.metricBox}>
                      <span className={styles.metricLabel}>Latency</span>
                      <span className={styles.metricValue}>0.8ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Actions */}
          <div ref={textColRef} className={styles.contentCol}>
            {/* Live Indicator Pill */}
            <div className={styles.livePill}>
              <span className={styles.greenDot} />
              <span>Introducing Next-Gen Sovereign Systems</span>
            </div>

            {/* Display Headline */}
            <h2 className={styles.ctaTitle}>
              Turn your strategic vision into mission-ready capability
            </h2>

            {/* Description */}
            <p className={styles.ctaDescription}>
              Partner with Anuvyom to engineer and deploy next-generation
              autonomous aerospace airframes, multi-domain defence systems, and
              resilient industrial technologies.
            </p>

            {/* Button Actions */}
            <div className={styles.buttonGroup}>
              <Link href="/contact" className={styles.primaryBtn}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={styles.btnArrow}
                  aria-hidden="true"
                >
                  <path
                    d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Initiate Collaboration</span>
              </Link>
              <Link href="/capabilities" className={styles.secondaryBtn}>
                Explore Capabilities
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
