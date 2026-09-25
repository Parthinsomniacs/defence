import Link from "next/link";
import { navigation } from "@/app/config/navigation";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          Defence
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {navigation.map((item) =>
              item.children ? (
                <li key={item.href} className={styles.navItem}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>

                  <div className={styles.dropdown}>
                    <ul className={styles.dropdownList}>
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} className={styles.dropdownLink}>
                            <span className={styles.dropdownLabel}>
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className={styles.dropdownDescription}>
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.href} className={styles.navItem}>
                  <Link href={item.href} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <Link href="/contact" className={styles.cta}>
          Request a briefing
        </Link>
      </div>
    </header>
  );
}
