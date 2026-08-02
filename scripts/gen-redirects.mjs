// Emits a static redirect stub for every entry in content/redirects.json — the
// Next/GitHub-Pages equivalent of jekyll-redirect-from. Each stub is a
// canonical-tagged meta-refresh page (SEO-correct, works without JS).
// Runs after `next build` (see package.json). BASE_PATH is prefixed to the
// destination for project-subpath deploys (e.g. /prism on the github.io preview).
// A destination may also be an absolute off-site URL (e.g. a resource that now
// lives on another site) — those take no BASE_PATH and canonicalise to themselves.
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_PATH ?? "";
const ROOT = process.cwd();
// Emit into the build output (regenerated every build), NOT public/, so
// hand-maintained assets stay separate from generated stubs.
const OUT = path.join(ROOT, process.env.OUT_DIR ?? "out");
const MANIFEST = path.join(ROOT, "content", "redirects.json");

function stub(dest) {
  const external = /^https?:\/\//.test(dest);
  const target = external ? dest : `${BASE}${dest}`;
  const canonical = external ? dest : `https://www.prism-global.com${dest}`;
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${canonical}">
<meta http-equiv="refresh" content="0; url=${target}">
<meta name="robots" content="noindex">
</head><body>
<p>This page has moved to <a href="${target}">${dest}</a>.</p>
<script>location.replace(${JSON.stringify(target)})</script>
</body></html>
`;
}

const redirects = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
let count = 0;
for (const [from, dest] of Object.entries(redirects)) {
  // Flat .html file (not folder/index.html): GitHub Pages serves it at the exact
  // extensionless old path with no trailing-slash 301 hop, matching old URLs.
  const rel = from.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!rel) continue;
  const outFile = path.join(OUT, `${rel}.html`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, stub(dest));
  count++;
}
console.log(`Generated ${count} redirect stub(s) into ${path.relative(ROOT, OUT)}/ from content/redirects.json`);
