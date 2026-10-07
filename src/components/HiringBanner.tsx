import styles from "./HiringBanner.module.css";

// Several open roles, so the banner jumps to the homepage Opportunities cards
// (each card links to its own Ashby listing) rather than a single application.
const HREF = "#opportunities";

export function HiringBanner() {
  return (
    <a className={styles.link} href={HREF}>
      <span className={styles.tag}>We&rsquo;re hiring</span>
      <span>Head of Operations / Head of Programmes · Apply now →</span>
    </a>
  );
}
