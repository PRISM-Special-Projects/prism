import styles from "./HiringBanner.module.css";

const ASHBY_HREF =
  "https://jobs.ashbyhq.com/PRISM/cd0ab91f-aff6-46d9-bb37-eb91833840ca";

export function HiringBanner() {
  return (
    <a
      className={styles.link}
      href={ASHBY_HREF}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.tag}>We&rsquo;re hiring</span>
      <span>Head of Operations · Apply by Sept 30th →</span>
    </a>
  );
}
