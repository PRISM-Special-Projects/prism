"use client";

import { useCallback } from "react";
import styles from "./NavMenu.module.css";

// Primary nav — a row of homepage section anchors, in the order the sections
// appear down the page. All in-page ("#…"), smooth-scrolled. Rendered inline in
// the hero's semi-transparent top bar (no hamburger/overlay).
const LINKS = [
  { label: "About", href: "#mission" },
  { label: "Podcast", href: "#podcast" },
  { label: "Our work", href: "#our-work" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "Who we are", href: "#people" },
  { label: "We're hiring", href: "#opportunities", button: true },
];

export function NavMenu() {
  const handleNav = useCallback(
    (href: string) => (e: React.MouseEvent) => {
      const target = document.querySelector(href);
      if (!target) return; // no such section here — let the browser follow it
      e.preventDefault();
      const reduce = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
      history.replaceState(null, "", href);
    },
    [],
  );

  return (
    <nav className={styles.links} aria-label="Primary">
      {LINKS.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className={
            "button" in l ? `${styles.link} ${styles.button}` : styles.link
          }
          onClick={handleNav(l.href)}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
