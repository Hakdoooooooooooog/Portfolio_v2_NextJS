# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager: `bun` (see `bun.lock`), but npm scripts work too.

- `bun dev` / `npm run dev` — start Next.js dev server (http://localhost:3000)
- `bun run build` / `npm run build` — production build
- `bun start` / `npm start` — serve the production build
- `bun run lint` / `npm run lint` — `next lint` (ESLint 10 flat config in `eslint.config.mjs`, extends `next/core-web-vitals` and `next/typescript`)

Build runs through **Turbopack** by default in Next 16 (no opt-in flag needed).

There is no test runner configured.

## Architecture

Single-page personal portfolio built on **Next.js 16 (App Router, Turbopack) + React 19 + Tailwind CSS v4**. Deployed at `https://darenzhicap.dev` (the URL is hard-coded in `app/layout.tsx` `metadata.metadataBase` and OpenGraph fields — update both if the domain changes).

### Routing model: one route group, dynamic section slug

All user-facing pages live under the `(root)` route group (`app/(root)/`), which provides the shared `<main>` shell with the grid background.

- `app/(root)/page.tsx` → renders `<HomeSection />` (the "About Me" landing).
- `app/(root)/[slug]/page.tsx` → switch over `slug` and renders one of three section components (`projects`, `skills-and-certificates`, `experiences`); any other slug calls `notFound()`. The valid slugs are also enumerated in `generateStaticParams` so they are statically generated at build time.

To add a new top-level section: add the slug to `generateStaticParams` + the `switch` in `[slug]/page.tsx`, add a `<TNavigationLink>` to `navLinks` in `utils/constants/index.ts`, and create the section component under `components/<Section>/index.tsx`.

`app/layout.tsx` is the root layout — it loads Noto Sans / Noto Sans Mono via `next/font`, mounts `<Navbar />` and `<Footer />` around `{children}`, and injects `<ThemeScript />` in `<head>`.

### Theming (no flash, no `next-themes`)

Theming is hand-rolled on top of a Zustand store with the `persist` middleware (`utils/store/theme-store.ts`, key `theme-storage`).

- `<html>` carries `data-theme="light" | "dark"`. Tailwind v4 custom variants in `app/globals.css` (`@custom-variant dark (&:where([data-theme=dark], …))`) drive all themed styles — use `dark:` / `light:` classes as usual.
- `components/theme-script.tsx` is a blocking inline `<script>` injected into `<head>` that reads `localStorage['theme-storage']` (or `prefers-color-scheme`) and sets `data-theme` **before paint** to avoid FOUC. The Zustand store hydrates afterwards.
- `<html suppressHydrationWarning>` is required because the script mutates the DOM before React hydrates.

### Path alias

`tsconfig.json` defines a single alias: `@/portfolio/*` → repo root (NOT `@/*`). All internal imports use this prefix, e.g. `import Projects from "@/portfolio/components/Projects"`.

### Component layout convention

Each major section under `components/` is a folder with `index.tsx` as the entry and a nested `components/` folder for its private subcomponents (`Navbar/`, `Projects/`, `Experiences/`, `Skills-certificates/`). Top-level shared primitives (`button.tsx`, `switch.tsx`, `separator.tsx`, `modal-image.tsx`, `footer.tsx`) sit directly in `components/`.

### Data & types

Static content (nav links, skills with x/y positions for the skills layout, certificates, projects) lives in `utils/constants/index.ts` and is typed via `utils/types.ts` (`TNavigationLink`, `TSkillData`, `TCertificate`, `TProjectData`). Edit constants there rather than hard-coding into components.

### UI libs

- `@base-ui-components/react` — headless UI primitives (used in Navbar, modal, switch).
- `gsap` — animations.
- Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config` content array; uses CSS-first `@theme` config inside `app/globals.css`). `tailwind.config.ts` exists but is mostly empty under v4.

## Dependency overrides

`package.json` declares `overrides` and `resolutions` pinning `minimatch`, `brace-expansion`, `flatted`, `picomatch`, and `postcss` to patched versions. These force-resolve transitive vulnerabilities in eslint/tailwind/next dep trees that the parent packages haven't yet bumped. Revisit after upstream releases — they can be removed once the parents pin patched versions natively.
