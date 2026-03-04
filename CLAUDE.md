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

There are no test or lint commands configured.

## Architecture

**Framework**: Astro 4 with React 18 for interactive islands. Tailwind CSS 3 for styling. TypeScript throughout.

**Content Collections** (`src/content/config.ts`): Three collections sharing two schemas:
- `post`, `code`, `game` — all use the `blog` schema (title, description, pubDate, updatedDate, heroImage, draft, tags). Content lives in `src/content/post/` as Markdown files.
- `uses` — equipment/gear reviews with title, description, heroImage, draft
- `recipes` — coffee brewing recipe data as JSON files with blocks (step, time, water) and notices

**Routing**: File-based via `src/pages/`. Dynamic routes use `[...slug].astro` with `getStaticPaths()` pulling from content collections. Key routes: `/post/[slug]`, `/uses/[slug]`, `/coffee-timer`, `/bubbles`, `/search`, `/rss.xml`.

**Layouts**: `BlogPost.astro` renders posts with a sticky sidebar TOC (auto-generated from headings, highlighted via IntersectionObserver). `Uses.astro` for equipment pages.

**React Islands**: Used only where client-side interactivity is required, hydrated with `client:only="react"`:
- `HeaderHamburger.tsx` — mobile nav menu (Headless UI)
- `ThemeToggleButtom.tsx` — dark/light toggle with localStorage
- `src/components/coffee-timer/` — full timer app with dnd-kit sortable recipe blocks
- `src/components/bubbles/` — floating message bubbles interface

**Markdown Pipeline**: remark-math + rehype-katex for LaTeX math rendering. GFM format with breaks enabled. Pagefind for full-text search indexed at build time.

**Styling**: Tailwind with class-based dark mode. Global CSS in `src/styles/global.css` (Bear Blog heritage). Custom font: Atkinson (woff in `public/fonts/`).

## Deployment

Push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`) using `withastro/action@v2` → `actions/deploy-pages@v4`. The build step in CI handles pagefind indexing automatically via the official Astro action.

## Key Conventions

- Site constants (title, description) live in `src/consts.ts`
- Blog post frontmatter requires `title` and `pubDate`; other fields optional
- The component filename `ThemeToggleButtom.tsx` is intentionally misspelled (not a typo to fix)
- Content is bilingual (English and Chinese)
- Google Analytics runs via Partytown for off-main-thread execution
