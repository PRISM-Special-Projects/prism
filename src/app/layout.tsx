import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import { SITE_URL, BASE_PATH } from "@/lib/site";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

// Analytics (GA4 + Google Ads, carried over from the Squarespace site) is loaded
// by CookieConsent ONLY after the visitor accepts — nothing tracking-related
// fires without consent (UK PECR / GDPR).

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Headline / display face. Keep the CSS variable name stable (--font-head) so
// swapping the typeface only touches this file, never globals.css.
const headFont = Open_Sans({
  variable: "--font-head",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE_TITLE =
  "PRISM — Partnership for Research Into Sentient Machines";
// Kept close to the hero copy on purpose: when the meta tag and the page's most
// prominent text agree, Google is likelier to use this instead of synthesising a
// snippet from body content further down the page.
const SITE_DESCRIPTION =
  "PRISM is a non-profit helping to build the field of digital minds, supporting research and education on AI consciousness, moral status, and AI minds.";
// Social share card (Open Graph / Twitter). Absolute URL — crawlers don't resolve relative paths.
// ?v=2: tagline removed 2026-07-24 — the version bump makes share-platform
// scrapers treat it as a new image instead of serving their cached card.
const OG_IMAGE = `${SITE_URL}/og.png?v=2`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  icons: {
    // ?v=2 busts browsers' sticky favicon cache after the icon was changed.
    icon: `${BASE_PATH}/favicon.png?v=2`,
  },
  openGraph: {
    type: "website",
    siteName: "PRISM",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${SITE_URL}/`,
    locale: "en_GB",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${headFont.variable} antialiased`}
    >
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
