import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// Root of the migrated Markdown archive. Each subfolder is a collection
// (podcast, blog, news, meetup, …). The filename (sans .md) is the URL slug,
// matching the old Squarespace paths so links are preserved 1:1.
const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Entry {
  slug: string;
  title: string;
  date: string | null;
  published: boolean;
  redirectFrom: string[];
  excerpt: string;
  html: string;
  /** Optional episode/post artwork, front-matter `image:` — a /public path. */
  image: string | null;
  /** Optional episode video, front-matter `youtube:` — a full watch URL or youtu.be short link. */
  youtube: string | null;
  /** Optional Buzzsprout embed path (`<id>-<slug>`), front-matter `buzzsprout:`. */
  buzzsprout: string | null;
}

function readCollectionDir(collection: string): string[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
}

function parseFile(collection: string, file: string): Entry {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, collection, file), "utf8");
  const { data, content } = matter(raw);
  const body = content.trim();
  // First non-empty paragraph, stripped of markdown, as a listing/meta excerpt.
  const firstPara = body.split(/\n\s*\n/).find((p) => p.trim() && !p.startsWith("#")) ?? "";
  return {
    // Strip a leading YYYY-MM-DD- (Jekyll _posts convention) so blog slugs match
    // the old `/blog/:title` URLs; podcast filenames have no prefix, so unaffected.
    slug: file.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, ""),
    title: typeof data.title === "string" ? data.title : file.replace(/\.md$/, ""),
    date: toISODate(data.date),
    published: data.published !== false,
    redirectFrom: normalizeRedirects(data.redirect_from),
    image: typeof data.image === "string" && data.image.startsWith("/") ? data.image : null,
    youtube:
      typeof data.youtube === "string" &&
      (data.youtube.startsWith("https://www.youtube.com/") || data.youtube.startsWith("https://youtu.be/"))
        ? data.youtube
        : null,
    buzzsprout:
      typeof data.buzzsprout === "string" && /^\d+-/.test(data.buzzsprout) ? data.buzzsprout : null,
    excerpt: firstPara.replace(/[#*_`>[\]]/g, "").replace(/\(https?:\/\/[^)]+\)/g, "").trim(),
    html: marked.parse(body, { async: false }) as string,
  };
}

// YAML parses `date: 2025-09-09` into a JS Date; hand-written strings stay strings.
function toISODate(v: unknown): string | null {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === "string") return v.slice(0, 10);
  return null;
}

function normalizeRedirects(v: unknown): string[] {
  if (!v) return [];
  return (Array.isArray(v) ? v : [v]).map(String);
}

/** All published entries in a collection, newest first. */
export function getCollection(collection: string): Entry[] {
  return readCollectionDir(collection)
    .map((f) => parseFile(collection, f))
    .filter((e) => e.published)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

/** Slugs for generateStaticParams (published only). */
export function getSlugs(collection: string): { slug: string }[] {
  return getCollection(collection).map((e) => ({ slug: e.slug }));
}

/** One entry by slug, or null. Matches on the computed slug (date prefix
 *  stripped), since filenames may carry a YYYY-MM-DD- prefix the slug doesn't. */
export function getEntry(collection: string, slug: string): Entry | null {
  const file = readCollectionDir(collection).find(
    (f) => f.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "") === slug,
  );
  return file ? parseFile(collection, file) : null;
}

/** Every redirect_from → canonical-path pair across a collection. */
export function getRedirects(collection: string, urlPrefix: string): { from: string; to: string }[] {
  return getCollection(collection).flatMap((e) =>
    e.redirectFrom.map((from) => ({ from, to: `${urlPrefix}/${e.slug}` })),
  );
}

/** Render a standalone Markdown page (e.g. content/history.md) to HTML. */
export function getPageHtml(relPath: string): string {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, relPath), "utf8");
  const { content } = matter(raw);
  return marked.parse(content.trim(), { async: false }) as string;
}

/** Format an ISO date as "September 2025" for display. */
export function displayDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}
