# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog built with Astro 4, deployed to GitHub Pages at `https://miohitokiri5474.github.io/`. Contains blog posts (programming, hardware, gaming), a "uses" equipment showcase, and interactive features (coffee brewing timer, floating message bubbles).

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Full build: astro check → astro build → pagefind index → copy pagefind to public/
npm run preview    # Preview the built site locally
```

No test or lint commands configured.

## Architecture

**Framework**: Astro 4 with React 18 for interactive islands. Tailwind CSS 3 for styling. TypeScript throughout.

**Content Collections** (`src/content/config.ts`): Schemas defined for `game`, `code`, `uses`, `blog`, `recipes` — but actual posts live in `src/content/post/` which has **no schema entry** in config. Pages call `getCollection("post")` directly (untyped). Only `src/content/uses/` and `src/content/recipes/` have matching config entries.

- `src/content/post/` — all blog posts as Markdown (used by `getCollection("post")`)
- `src/content/uses/` — equipment/gear reviews (`usesCollection` schema)
- `src/content/recipes/` — coffee recipe JSON files with `blocks[]` (id, step, time, water) and `notices[]`

**Routing**: File-based via `src/pages/`. Dynamic routes use `[...slug].astro` with `getStaticPaths()`. Key routes: `/post/`, `/post/[...slug]`, `/uses/`, `/uses/[...slug]`, `/coffee-timer`, `/bubbles`, `/search`, `/rss.xml`.

**Layouts**: `BlogPost.astro` renders posts with sticky sidebar TOC (auto-generated from headings, highlighted via IntersectionObserver). `Uses.astro` for equipment pages. Per-layout CSS: `src/styles/BlogPost.css`, `src/styles/Uses.css`, `src/styles/bubbles.css` alongside `src/styles/global.css`.

**React Islands**: Used only where client-side interactivity is required, hydrated with `client:only="react"`:
- `HeaderHamburger.tsx` — mobile nav menu (Headless UI)
- `ThemeToggleButtom.tsx` — dark/light toggle with localStorage (filename intentionally misspelled)
- `src/components/coffee-timer/` — timer app with dnd-kit sortable recipe blocks
- `src/components/bubbles/` — floating message bubbles interface

**Markdown Pipeline**: remark-math + rehype-katex for LaTeX math rendering. GFM with `breaks: true`. Pagefind for full-text search indexed at build time (outputs to `dist/pagefind/`, then copied to `public/`).

**Styling**: Tailwind with class-based dark mode (`dark:`). Body colors set in `Body.astro` (`bg-orange-50 dark:bg-zinc-900`). Custom font: Atkinson (woff in `public/fonts/`).

## Deployment

Push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`) using `withastro/action@v2` → `actions/deploy-pages@v4`. The official Astro action handles pagefind indexing automatically.

## Key Conventions

- Site constants (title, description) live in `src/consts.ts`
- Blog post frontmatter requires `title` and `pubDate`; other fields optional
- Content is bilingual (English and Chinese)
- Google Analytics (ID: `G-5PX5VJYPVK`) runs via Partytown for off-main-thread execution; added to each page individually via `<GoogleAnalytics>` component
- Default hero images: `/game-default.jpg` for posts tagged `"game"`, `/code-default.jpg` otherwise
