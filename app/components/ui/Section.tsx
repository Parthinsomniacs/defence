import type { ReactNode } from "react";
import styles from "./Section.module.css";

type SectionProps = {
  id?: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
};

/**
 * Shared section wrapper: consistent vertical rhythm, max-width and
 * optional heading. Reused by every page's sections.
 */
export default function Section({ id, title, eyebrow, children }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      className={styles.section}
      aria-labelledby={title ? headingId : undefined}
    >
      <div className={styles.inner}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        {title ? (
          <h2 id={headingId} className={styles.title}>
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}
