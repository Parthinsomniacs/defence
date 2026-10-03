"use client";

import { useState } from "react";
import styles from "./ContactFormSection.module.css";

const subjectOptions = [
  "Aerospace Platforms & Autonomous Systems",
  "Defence Manufacturing & Protective Armor",
  "Advanced Electronic Systems & Sensors",
  "Petrochemical & Industrial Lubrication",
  "Strategic Institutional Partnerships",
  "General Inquiry",
];

export default function ContactFormSection() {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="contact-form"
      className={styles.section}
      aria-label="Contact Form"
    >
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Left Column: Eyebrow + Call to Action Heading */}
          <div className={styles.leftCol}>
            <span className={styles.eyebrow}>[ CONTACT US ]</span>
            <h2 className={styles.heading}>
              Let&apos;s create something<br />
              remarkable together
            </h2>
          </div>

          {/* Right Column: Minimal Underline Form */}
          <div className={styles.formCol}>
            {isSubmitted ? (
              <div className={styles.successBanner} role="status">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#55f187"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <h3 className={styles.successTitle}>MESSAGE RECEIVED</h3>
                <p className={styles.successText}>
                  Thank you for reaching out. An Anuvyom representative will get
                  in touch with you shortly.
                </p>
                <button
                  type="button"
                  className={styles.resetBtn}
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <input
                    type="text"
                    required
                    placeholder="Your name*"
                    className={styles.input}
                    aria-label="Your name"
                  />
                </div>

                <div className={styles.field}>
                  <input
                    type="email"
                    required
                    placeholder="E-mail address*"
                    className={styles.input}
                    aria-label="E-mail address"
                  />
                </div>

                <div className={styles.field}>
                  <input
                    type="tel"
                    required
                    placeholder="Phone number*"
                    className={styles.input}
                    aria-label="Phone number"
                  />
                </div>

                <div className={styles.field}>
                  <div className={styles.selectWrapper}>
                    <select
                      defaultValue=""
                      required
                      className={styles.select}
                      aria-label="Choose subject"
                    >
                      <option value="" disabled>
                        Choose subject
                      </option>
                      {subjectOptions.map((subj) => (
                        <option key={subj} value={subj}>
                          {subj}
                        </option>
                      ))}
                    </select>
                    <svg
                      className={styles.selectChevron}
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
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>

                <div className={styles.field}>
                  <textarea
                    required
                    placeholder="Type message"
                    className={styles.textarea}
                    aria-label="Type message"
                  />
                </div>

                <label className={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    required
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.checkboxLabel}>
                    I agree to the terms and conditions
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  {isSubmitting ? "SENDING..." : "SUBMIT NOW"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
