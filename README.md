# Portfolio v2

Personal portfolio of [Darenz Jasper Hicap](https://darenzhicap.dev) — a single-page Next.js site covering projects, skills & certificates, and work experience.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19**
- **TypeScript 5**
- **Tailwind CSS v4** (CSS-first `@theme` config in `app/globals.css`)
- **Zustand 5** with `persist` middleware for theming state
- **`@base-ui-components/react`** for headless UI primitives (navigation, switch, modal)
- **ESLint 9** with `eslint-config-next` flat config

Package manager: `bun` (a `bun.lock` is checked in), but the npm scripts work with any of `npm` / `pnpm` / `yarn`.

## Commands

```bash
bun dev          # dev server at http://localhost:3000
bun run build    # production build (Turbopack)
bun start        # serve the production build
bun run lint     # eslint . — flat config in eslint.config.mjs
```

There is no test runner configured.

## Architecture

### Routing

All user-facing pages live under one route group, `app/(root)/`, which provides the shared `<main>` shell with the grid background.

- `app/(root)/page.tsx` → renders the **About Me** landing.
- `app/(root)/[slug]/page.tsx` → switches over `slug` and renders one of three section components: `projects`, `skills-and-certificates`, `experiences`. Anything else calls `notFound()`. The valid slugs are also listed in `generateStaticParams` so they are statically generated at build time.

To add a new top-level section:

1. Add the slug to `generateStaticParams` and the `switch` in `app/(root)/[slug]/page.tsx`.
2. Add a `<TNavigationLink>` to `navLinks` in `utils/constants/index.ts`.
3. Create the section component under `components/<Section>/index.tsx`.

### Theming (no flash, no `next-themes`)

Theming is hand-rolled on top of a Zustand store with the `persist` middleware (`utils/store/theme-store.ts`, key `theme-storage`).

- `<html>` carries `data-theme="light" | "dark"`. Tailwind v4 custom variants in `app/globals.css` (`@custom-variant dark (...)`) drive all themed styles — use `dark:` / `light:` classes as usual.
- `components/theme-script.tsx` is a blocking inline `<script>` injected into `<head>` that reads `localStorage['theme-storage']` (or `prefers-color-scheme`) and sets `data-theme` **before paint** to avoid FOUC. The Zustand store hydrates afterwards.
- The theme switch (`components/switch.tsx`) subscribes to `useThemeStore.persist.onFinishHydration` via `useSyncExternalStore`, so it only writes `data-theme` once persist rehydration is genuinely done.
- `<html suppressHydrationWarning>` is required because the inline script mutates the DOM before React hydrates.

### Component layout

Each major section under `components/` is a folder with `index.tsx` as the entry and a nested `components/` folder for its private subcomponents:

```
components/
  Home/                    # About Me
  Projects/
  Skills-certificates/
  Experiences/
  Navbar/
  button.tsx               # shared primitives sit at the root
  switch.tsx
  modal-image.tsx
  theme-script.tsx
  footer.tsx
```

### Path alias

`tsconfig.json` defines a single alias: `@/portfolio/*` → repo root (NOT `@/*`). All internal imports use this prefix:

```ts
import Projects from "@/portfolio/components/Projects";
```

### Data & types

Static content (nav links, skills, certificates, projects, experiences) lives in `utils/constants/index.ts` and is typed via `utils/types.ts`. Edit constants there rather than hard-coding into components.

## Performance notes

- **Images** are served as **WebP** under `public/images/`. The `<Image>` slots that need a fixed layout box (the home profile, the featured project card) use a wrapper with an explicit `aspect-[…]` and `<Image fill>` so a source asset whose natural aspect ratio differs from the layout slot can't trigger a reflow on load.
- `next.config.ts` sets `images.minimumCacheTTL = 31536000` (1 year) so the optimizer's variants serve with a long `Cache-Control: max-age` header. The optimizer keys its cache by source content, so swapping a source image still busts the cache.
- All three `next/font/google` fonts (Fraunces, Noto Sans, Noto Sans Mono) use `display: "optional"` to eliminate layout shift from font swap. On a slow first visit the user sees the system fallback for that page load; repeat visits hit the font cache.
- The featured project image is marked `priority` (LCP candidate). Other below-the-fold images lazy-load via the Next.js default.

## Deployment

Deployed at https://darenzhicap.dev. The URL is hard-coded in `app/layout.tsx` `metadata.metadataBase` and OpenGraph fields — update both if the domain changes.

## Dependency overrides

`package.json` declares `overrides` and `resolutions` pinning `minimatch`, `brace-expansion`, `flatted`, `picomatch`, and `postcss` to patched versions. These force-resolve transitive vulnerabilities in the eslint / tailwind / next dep trees that the parent packages haven't yet bumped. They can be removed once the parents pin patched versions natively.
