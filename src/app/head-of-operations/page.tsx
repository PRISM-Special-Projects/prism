import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { getPageHtml } from "@/lib/content";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
  title: "Head of Operations — PRISM",
  description:
    "PRISM is hiring a Head of Operations to own HR, finance, systems, and compliance as we scale. Cambridge, UK preferred; remote considered.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const APPLY_HREF =
  "https://jobs.ashbyhq.com/PRISM/cd0ab91f-aff6-46d9-bb37-eb91833840ca";

export default function HeadOfOperations() {
  const html = getPageHtml("head-of-operations.md");

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <div className={styles.headInner}>
          <div className={styles.topBar}>
            <Link href="/" className={styles.logoLink}>
              <img
                src={`${BASE}/logo-prism-white.png`}
                alt="PRISM — Partnership for Research Into Sentient Machines"
                className={styles.logo}
                width={138}
                height={30}
              />
            </Link>
          </div>
          <span className={styles.kickerDark}>We&rsquo;re hiring</span>
          <h1 className={styles.title}>Head of Operations</h1>
          <p className={styles.lede}>
            Own the operational backbone of a growing charity, HR, finance,
            systems, and compliance, so the team running our programmes can
            focus on the work itself.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.prose}>
          <p>
            <a
              className={styles.submit}
              href={APPLY_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply for this role
            </a>
          </p>
        </div>
        <article
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className={styles.prose}>
          <p>
            <a
              className={styles.submit}
              href={APPLY_HREF}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply for this role
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
