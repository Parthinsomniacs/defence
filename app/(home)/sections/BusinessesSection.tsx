"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BusinessesSection.module.css";

interface BusinessItem {
  id: string;
  sector: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
  logoSrc: string;
  logoAlt: string;
  href: string;
}

const businesses: BusinessItem[] = [
  {
    id: "aerospace",
    sector: "Sector 1",
    title: "AEROSPACE",
    description: "UAV platforms and aerial surveillance systems.",
    buttonText: "Explore Aerospace",
    imageSrc: "/images/business-aerospace.jpg",
    imageAlt: "Stealth aerospace defence aircraft in high-tech hangar",
    logoSrc: "/images/aerospace.png",
    logoAlt: "Aerospace Logo",
    href: "/capabilities",
  },
  {
    id: "defence",
    sector: "Sector 2",
    title: "DEFENCE",
    description: "Precision weapon platforms and sovereign tactical equipment.",
    buttonText: "Explore Defence",
    imageSrc: "/images/business-systems.jpg",
    imageAlt: "Specialist engineer operating tactical command workstation in red lighting",
    logoSrc: "/images/defence.png",
    logoAlt: "Defence Logo",
    href: "/capabilities",
  },
  {
    id: "advanced-systems",
    sector: "Sector 3",
    title: "ADVANCED SYSTEMS",
    description: "Autonomous command architectures and tactical electronic systems.",
    buttonText: "Explore Systems",
    imageSrc: "/images/business-tactical.jpg",
    imageAlt: "Tactical telemetry and orbital defence mission interface tablet",
    logoSrc: "/images/advanced-systems.png",
    logoAlt: "Advanced Systems Logo",
    href: "/capabilities",
  },
  {
    id: "petrochemical",
    sector: "Sector 4",
    title: "PETROCHEMICAL",
    description: "Process engineering and critical energy infrastructure solutions.",
    buttonText: "Explore Petrochem",
    imageSrc: "/images/business-energy.jpg",
    imageAlt: "Modern petrochemical facility and advanced energy infrastructure at dusk",
    logoSrc: "/images/petrochem.png",
    logoAlt: "Petrochemical Logo",
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

      // Desktop Pinned Scrub Animation (Header remains sharp at top; cards slide up underneath)
      mm.add("(min-width: 1025px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1000",
            pin: pinWrapRef.current,
            pinSpacing: true,
            scrub: 1.1,
            anticipatePin: 1,
          },
        });

        // Cards container slides UP smoothly right underneath the divider line
        if (cardsGridRef.current) {
          tl.fromTo(
            cardsGridRef.current,
            {
              y: "28vh",
            },
            {
              y: 0,
              ease: "power1.out",
              duration: 1,
            },
            0
          );
        }

        // Subtle inner image un-zoom (1.08 -> 1.0)
        const validImages = imageRefs.current.filter(Boolean);
        if (validImages.length > 0) {
          tl.fromTo(
            validImages,
            {
              scale: 1.08,
            },
            {
              scale: 1,
              ease: "power1.out",
              stagger: 0.02,
              duration: 1,
            },
            0
          );
        }
      });

      // Mobile & Tablet (Natural cascading entrance without pinning)
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
          {/* Header Block (Stays clearly visible & sharp at top) */}
          <div ref={headerRef} className={styles.header}>
            <span className={styles.eyebrow}>[ OUR BUSINESSES ]</span>
            <h2 className={styles.title}>
              <span className={styles.titleLine}>WE OPERATE WHERE</span>
              <span className={styles.titleLine}>IMPACT MATTERS</span>
            </h2>
          </div>

          {/* Divider & Context Row (Cleanly visible below title) */}
          <div ref={metaRef} className={styles.metaRow}>
            <p className={styles.metaLeft}>
              Anuvyom operates in sectors where the stakes are too high for
              anything less than full commitment.
            </p>
            <span className={styles.metaRight}>Critical Domains</span>
          </div>

          {/* Cards Grid (4 Cards that slide smoothly up underneath the divider line) */}
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
                    <span className={styles.sectorTag}>{item.sector}</span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDescription}>{item.description}</p>
                    <div className={styles.buttonWrap}>
                      <span className={styles.cardButton}>
                        <span>{item.buttonText}</span>
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 10 10"
                          fill="none"
                          className={styles.buttonArrow}
                          aria-hidden="true"
                        >
                          <path
                            d="M1 5H9M9 5L5.5 1.5M9 5L5.5 8.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
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
