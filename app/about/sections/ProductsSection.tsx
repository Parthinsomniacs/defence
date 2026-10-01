"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
import styles from "./ProductsSection.module.css";

interface Product {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  image: string;
  isCover?: boolean;
}

const productsList: Product[] = [
  {
    id: "aerospace",
    tabLabel: "Aerospace",
    title: "Aerospace",
    description:
      "Autonomous aerial systems, drone platforms, and aerospace-ready engineering developed for precision deployment.",
    ctaText: "Explore Aerospace",
    ctaHref: "/capabilities#aerospace",
    image: "/images/products/tailsitter-zeus-alpha.png",
  },
  {
    id: "defence",
    tabLabel: "Defence",
    title: "Defence",
    description:
      "Protective systems, tactical equipment, and defence manufacturing built for operational readiness across demanding field conditions.",
    ctaText: "View Capabilities",
    ctaHref: "/capabilities#defence",
    image: "/images/products/loiter-munition-multicopter-bolt.png",
  },
  {
    id: "advanced-systems",
    tabLabel: "Advanced Systems",
    title: "Advanced Systems",
    description:
      "Integrated sensing, electronics, communication, and surveillance capabilities designed for complex operating environments.",
    ctaText: "See Systems",
    ctaHref: "/capabilities#systems",
    image: "/images/products/fixed-wing-x777.png",
  },
  {
    id: "petrochemical",
    tabLabel: "Petrochemical",
    title: "Petrochemical",
    description:
      "Performance-oriented lubricant and petrochemical products aligned with industrial reliability and endurance.",
    ctaText: "Explore Solutions",
    ctaHref: "/capabilities#petrochemical",
    image: "/images/business-energy.jpg",
    isCover: true,
  },
  {
    id: "affiliations",
    tabLabel: "Affiliations",
    title: "Affiliations",
    description:
      "Strategic collaborations and aligned institutional relationships that broaden execution depth, capability access, and long-term growth.",
    ctaText: "View Partnerships",
    ctaHref: "/contact",
    image: "/images/business-tactical.jpg",
    isCover: true,
  },
];

export default function ProductsSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeProduct = productsList[activeTab];

  return (
    <section
      id="products"
      className={styles.section}
      aria-label="Our Businesses Section"
    >
      {/* Subtle radial ambient lighting */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Centered Header in Design Theme */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            GROUP OF COMPANIES
          </span>
          <AnimatedTitle className={styles.heading}>
            OUR BUSINESSES
          </AnimatedTitle>
          <p className={styles.subtitle}>
            Engineered for performance and reliability
          </p>
        </div>

        {/* Tab Controls */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabsList} role="tablist">
            {productsList.map((product, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={product.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.tabButton} ${
                    isActive ? styles.tabButtonActive : ""
                  }`}
                  onClick={() => setActiveTab(idx)}
                >
                  {product.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Showcase */}
        <div className={styles.showcaseWrapper}>
          <div className={styles.imageStage}>
            <Image
              key={activeProduct.id}
              src={activeProduct.image}
              alt={activeProduct.tabLabel}
              fill
              priority
              className={
                activeProduct.isCover
                  ? styles.productImgCover
                  : styles.productImg
              }
            />
          </div>

          {/* Details Row: Description & CTA Button */}
          <div className={styles.detailsRow}>
            <div className={styles.textBlock}>
              <p className={styles.productDescription}>
                {activeProduct.description}
              </p>
            </div>

            <div className={styles.actionBlock}>
              <Link href={activeProduct.ctaHref} className={styles.ctaButton}>
                <span>{activeProduct.ctaText}</span>
                <svg
                  className={styles.ctaIcon}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
