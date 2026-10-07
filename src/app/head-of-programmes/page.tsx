import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { getPageHtml } from "@/lib/content";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
  title: "Head of Programmes — PRISM",
  description:
    "PRISM is hiring a Head of Programmes to lead and grow our digital minds field-building portfolio, run in partnership with Cambridge Digital Minds. Cambridge, UK preferred; remote considered.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const APPLY_HREF =
  "https://jobs.ashbyhq.com/PRISM/0ee4f565-d8b0-430b-b76e-d74e938feffc";

export default function HeadOfProgrammes() {
  const html = getPageHtml("head-of-programmes.md");

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
          <h1 className={styles.title}>Head of Programmes</h1>
          <p className={styles.lede}>
            Lead and grow the programmes that bring new people into digital
            minds, develop the most promising talent, and convene experts to do
            serious collaborative work.
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
