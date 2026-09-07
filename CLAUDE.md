# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server (Next.js, port 3000).
- `npm run build` — static export (`next build`, `output: "export"`) followed by `node scripts/gen-redirects.mjs`, which writes redirect stub HTML files into `out/` from `content/redirects.json`. Output lands in `out/`.
- `npm run start` — serve the production build (`next start`; not used for the actual deploy, which serves the static `out/` export).
- There is no lint or test script and no ESLint config — nothing to run beyond `npm run build` (which also type-checks via `next build`) to verify changes.
- CI (`.github/workflows/deploy.yml`) runs `npm ci && npm run build` on every push to `main` and deploys `out/` to GitHub Pages, which serves the custom domain `www.prism-global.com` (via `public/CNAME`). No `BASE_PATH` is set for that deploy, so it builds at root. A `/prism` subpath preview build (setting `BASE_PATH=/prism`) is referenced in code comments but not present as a workflow in this repo.

## Architecture

This is a static-export Next.js (App Router) site with no backend/API routes and no database — all content is either hardcoded in components or Markdown files rendered at build time.

### Content model (`src/lib/content.ts`)

Markdown collections live under `content/<collection>/` (currently `blog`, `podcast`, `transcripts`). Each collection is a flat directory of `.md` files with YAML front matter (parsed with `gray-matter`, body rendered with `marked`):
- `title`, `date`, `published` (defaults true), `image`, `youtube`, `buzzsprout`, `redirect_from` (one or more legacy URLs that should redirect to this entry).
- The slug is the filename with a leading `YYYY-MM-DD-` prefix stripped (a holdover from the Jekyll `_posts` convention the blog was migrated from) and `.md` removed. `getEntry(collection, slug)` matches against this computed slug, not the raw filename.
- `getCollection(collection)` returns only `published` entries, newest first.
- A collection page is the standard pair: `src/app/<collection>/page.tsx` (index, via `getCollection`) + `src/app/<collection>/[slug]/page.tsx` (uses `generateStaticParams`/`getSlugs` + `getEntry`, calls `notFound()` if missing/unpublished). Both `blog` and `podcast` follow this exact pattern; `podcast-transcripts` reads the `transcripts` collection the same way.
- `getPageHtml(relPath)` renders a one-off standalone Markdown file (e.g. `content/history.md`) for a page that isn't part of a collection.

### Redirects (legacy Squarespace/Jekyll URLs)

The site migrated from Squarespace, and `content/redirects.json` is a flat `{ "/old-path": "/new-path-or-url" }` map maintained by hand (originally generated once via `scripts/build-redirect-manifest.py`, which is not runnable here — it references a local machine path and an `.xlsx` redirect map that isn't in this repo; treat it as historical reference only). At build time `scripts/gen-redirects.mjs` turns every entry into a static meta-refresh + canonical-tag HTML stub under `out/`, so old URLs 301-equivalent to their new home without a server. Destinations are usually in-app paths or homepage anchors (e.g. `/#opportunities`), occasionally an external URL.

Notably, several former standalone job-listing pages (`/field-building-ops-coordinator`, `/researcher`, `/trustee-vacancies`) were retired during migration and now redirect to `/#opportunities` on the homepage — there is currently no working careers/jobs page or collection, only the static "Opportunities" cards on the homepage (see below). This is called out explicitly in a comment above the `OPPORTUNITIES` array in `src/components/HomeContent.tsx`.

### Homepage (`src/app/page.tsx` → `src/components/HomeContent.tsx`)

The homepage is one long component with anchor-id sections (`#mission`, `#podcast`, `#our-work`, `#partnerships`, `#people`, `#opportunities`, ...) that `NavMenu` scrolls to in-page. Section content (partner cards, team bios, opportunity cards, etc.) is defined as typed literal arrays near the top of `HomeContent.tsx` and mapped over in JSX further down — adding an entry to one of these arrays is the usual way to add a homepage card, not writing new JSX.

### Static export constraints

`next.config.ts` sets `output: "export"` and `images: { unoptimized: true }` (no Next Image Optimization server) and reads `BASE_PATH`/`NEXT_PUBLIC_BASE_PATH` for optional subpath deploys. Because this is a static export, there are no API routes, no server actions, and no dynamic (non-static-generated) routes — every route must be resolvable at build time (`generateStaticParams` for all `[slug]` routes).

`src/lib/site.ts` derives `SITE_URL` from `NEXT_PUBLIC_BASE_PATH`: empty → `https://www.prism-global.com` (production), set → the GitHub Pages project URL (preview). This feeds metadata, `sitemap.ts`, and `robots.ts`, so canonical URLs stay consistent between preview and production builds.
