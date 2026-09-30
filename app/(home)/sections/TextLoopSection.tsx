import TextLoop from "../../components/ui/TextLoop";
import styles from "./TextLoopSection.module.css";

export default function TextLoopSection() {
  return (
    <section className={styles.section} aria-label="Anuvyom highlights">
      <TextLoop
        className={styles.loop}
        text="Spotlight: Anuvyom Making Headlines"
        shape="line"
        viewHeight={64}
        speed={50}
        direction="forward"
        separator="✦"
        curviness={0}
        fontSize={22}
        fontWeight={600}
        letterSpacing={2}
        uppercase
        color="var(--color-surface-deep)"
        ribbon
        ribbonColor="var(--color-accent)"
        ribbonWidth={54}
        pauseOnHover
      />
    </section>
  );
}
