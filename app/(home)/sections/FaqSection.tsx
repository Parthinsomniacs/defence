"use client";

import { useState } from "react";
import AnimatedTitle from "@/app/components/ui/AnimatedTitle";
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
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className={styles.section} aria-label="Frequently Asked Questions">
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.titleWrap}>
            <span className={styles.eyebrow}>FAQ</span>
            <AnimatedTitle className={styles.title}>
              <span className={styles.titleLine}>FREQUENTLY ASKED</span>
              <span className={styles.titleLine}>QUESTIONS</span>
            </AnimatedTitle>
          </div>

          <ul className={styles.list}>
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              const answerId = `faq-answer-${faq.id}`;
              return (
                <li key={faq.id} className={styles.item}>
                  <button
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                  >
                    <span className={styles.number}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.question}>{faq.question}</span>
                    <span
                      className={`${styles.toggle} ${
                        isOpen ? styles.toggleOpen : ""
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M3 5L7 9L11 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={answerId}
                    className={`${styles.answerWrap} ${
                      isOpen ? styles.answerOpen : ""
                    }`}
                  >
                    <p className={styles.answer}>{faq.answer}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
