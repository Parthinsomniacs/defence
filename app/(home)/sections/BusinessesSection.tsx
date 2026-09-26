"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BusinessesSection.module.css";

interface BusinessItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  logoSrc: string;
  logoAlt: string;
  href: string;
}

const businesses: BusinessItem[] = [
  {
    id: "aerospace-systems",
    title: "Aerospace Systems // Autonomous UAS",
    description:
      "Next-generation sovereign airframes, tactical unmanned aerial systems, and aerodynamic platforms engineered for mission dominance.",
    imageSrc: "/images/business-aerospace.jpg",
    imageAlt: "Stealth aerospace defence aircraft in high-tech hangar",
    logoSrc: "/images/aerospace.png",
    logoAlt: "Aerospace Systems Logo",
    href: "/capabilities",
  },
  {
    id: "defence-systems",
    title: "Defence Systems // Tactical Readiness",
    description:
      "Precision surveillance hardware, weapon-station integration, and sovereign tactical equipment built for uncompromising operational theaters.",
    imageSrc: "/images/business-systems.jpg",
    imageAlt: "Specialist engineer operating tactical command workstation in red lighting",
    logoSrc: "/images/defence.png",
    logoAlt: "Defence Systems Logo",
    href: "/capabilities",
  },
  {
    id: "advanced-systems",
    title: "Advanced Systems // Cyber & Electronics",
    description:
      "Autonomous command architecture, resilient communications, electronic warfare countermeasures, and secure tactical telemetry.",
    imageSrc: "/images/business-tactical.jpg",
    imageAlt: "Tactical telemetry and orbital defence mission interface tablet",
    logoSrc: "/images/advanced-systems.png",
    logoAlt: "Advanced Systems Logo",
    href: "/capabilities",
  },
  {
    id: "petrochemical-energy",
    title: "Petrochemical & Energy // Industrial Tech",
    description:
      "Heavy industrial process engineering, high-temperature integrity systems, and zero-fail infrastructure built for national energy continuity.",
    imageSrc: "/images/business-energy.jpg",
    imageAlt: "Modern petrochemical facility and advanced energy infrastructure at dusk",
    logoSrc: "/images/petrochem.png",
    logoAlt: "Petrochemical & Energy Logo",
    href: "/capabilities",
  },
];

export default function BusinessesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Pinned Scrub Animation (Fluexa Reference Interaction)
      mm.add("(min-width: 1025px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1200",
            pin: pinWrapRef.current,
            pinSpacing: true,
            scrub: 1.1,
            anticipatePin: 1,
          },
        });

        // 1. Header slides up slightly & fades gently
        if (headerRef.current) {
          tl.to(
            headerRef.current,
            {
              y: -50,
              opacity: 0.35,
              ease: "none",
            },
            0
          );
        }

        // 2. Meta row fades subtly
        if (metaRef.current) {
          tl.to(
            metaRef.current,
            {
              y: -30,
              opacity: 0.45,
              ease: "none",
            },
            0
          );
        }

        // 3. 4 Cards slide UP smoothly from lower starting position into full view
        if (cardsGridRef.current) {
          tl.fromTo(
            cardsGridRef.current,
            {
              y: 190,
            },
            {
              y: 0,
              ease: "none",
            },
            0
          );
        }

        // 4. Subtle inner image un-zoom (1.09 -> 1.0)
        const validImages = imageRefs.current.filter(Boolean);
        if (validImages.length > 0) {
          tl.fromTo(
            validImages,
            {
              scale: 1.09,
            },
            {
              scale: 1,
              ease: "none",
              stagger: 0.03,
            },
            0
          );
        }
      });

      // Mobile & Tablet (Responsive natural entrance with smooth stagger)
      mm.add("(max-width: 1024px)", () => {
        if (headerRef.current) {
          gsap.fromTo(
            headerRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: headerRef.current,
                start: "top 85%",
              },
            }
          );
        }

        const validCards = cardRefs.current.filter(Boolean);
        if (validCards.length > 0) {
          gsap.fromTo(
            validCards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.12,
              ease: "power2.out",
              scrollTrigger: {
                trigger: validCards[0],
                start: "top 82%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Our Businesses"
    >
      <div ref={pinWrapRef} className={styles.pinWrapper}>
        <div className={styles.inner}>
          {/* Header Block */}
          <div ref={headerRef} className={styles.header}>
            <span className={styles.eyebrow}>[ OUR BUSINESSES ]</span>
            <h2 className={styles.title}>
              <span className={styles.titleLine}>WE OPERATE WHERE</span>
              <span className={styles.titleLine}>IMPACT MATTERS</span>
            </h2>
          </div>

          {/* Divider & Context Row */}
          <div ref={metaRef} className={styles.metaRow}>
            <p className={styles.metaLeft}>
              Anuvyom operates in sectors where the stakes are too high for
              anything less than full commitment.
            </p>
            <span className={styles.metaRight}>Critical Domains</span>
          </div>

          {/* Cards Grid (4 Cards) */}
          <div ref={cardsGridRef} className={styles.grid}>
            {businesses.map((item, index) => (
              <article
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={styles.card}
              >
                <Link href={item.href} aria-label={item.title}>
                  {/* Media with Hover Zoom & Floating Center Logo Card */}
                  <div className={styles.mediaWrap}>
                    <Image
                      ref={(el) => {
                        imageRefs.current[index] = el;
                      }}
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 680px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className={styles.cardImage}
                      priority={index === 0}
                    />

                    {/* Floating Center Card with Zoom-in Logo Animation */}
                    <div className={styles.centerCard} aria-hidden="true">
                      <div className={styles.logoImageWrap}>
                        <Image
                          src={item.logoSrc}
                          alt={item.logoAlt}
                          fill
                          sizes="128px"
                          className={styles.logoImage}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Info Below Media */}
                  <div className={styles.cardBody}>
                    <div className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{item.title}</h3>
                      <svg
                        width="22"
                        height="11"
                        viewBox="0 0 24 12"
                        fill="none"
                        className={styles.waveIcon}
                        aria-hidden="true"
                      >
                        <path
                          d="M1 10.5L9.5 3.5C10.1 3 11 3.4 11.1 4.2L11.4 8.4C11.5 9.3 12.6 9.6 13.1 8.9L18.6 1.4C19.1 0.7 20.2 0.9 20.4 1.8L23 8"
                          stroke="#E74240"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className={styles.cardDescription}>{item.description}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
