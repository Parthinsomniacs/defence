"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FaqSection.module.css";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "sectors",
    question: "What sectors does Anuvyom operate in?",
    answer:
      "Anuvyom operates across aerospace, defence, advanced systems, and petrochemical sectors.",
  },
  {
    id: "partners",
    question: "Who does Anuvyom work with?",
    answer:
      "We collaborate with national defence forces, premier aerospace laboratories, research institutions, and strategic industrial partners.",
  },
  {
    id: "custom",
    question: "Can organisations request customised solutions?",
    answer:
      "Yes. Every engagement is tailored to the partner's mission, guided by research, strategy, and measurable outcomes.",
  },
  {
    id: "delivery",
    question: "How does Anuvyom approach delivery timelines?",
    answer:
      "Programs are structured around durable milestones, with capability built to last years and matter for decades.",
  },
  {
    id: "scale",
    question: "Can Anuvyom scale with sovereign programs?",
    answer:
      "Yes. Our industrial capability and partner network scale to support national-level defence and aerospace initiatives.",
  },
];

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];

      rows.forEach((row) => {
        const number = row.querySelector<HTMLElement>(`.${styles.number}`);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            end: "top 50%",
            scrub: true,
          },
        });

        // Row lifts and brightens from dim to full as it reaches the focus band
        tl.fromTo(
          row,
          { opacity: 0.15, y: 32 },
          { opacity: 1, y: 0, ease: "none" },
          0
        );

        // Ghost number brightens in sync
        if (number) {
          tl.fromTo(
            number,
            { opacity: 0.35 },
            { opacity: 1, ease: "none" },
            0
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
      aria-label="Frequently Asked Questions"
    >
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>FAQ</span>
          <h2 className={styles.title}>
            <span className={styles.titleLine}>FREQUENTLY ASKED</span>
            <span className={styles.titleLine}>QUESTIONS</span>
          </h2>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
              className={styles.row}
            >
              <h3 className={styles.question}>
                {index + 1}. {faq.question}
              </h3>
              <p className={styles.answer}>{faq.answer}</p>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
