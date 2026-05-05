# Foundation Design — Portfolio UI Overhaul (Spec 1 of 3)

**Date:** 2026-05-05
**Scope:** Spec 1 of 3 in the portfolio UI overhaul. Foundation only — design tokens, typography, spacing/surfaces, and the grid background. Layout rework is spec 2; performance audit and motion language are spec 3.

## Context

The portfolio (`Portfolio_v2_NextJS`) is a single-page Next.js 16 / React 19 / Tailwind v4 app. Current theming uses a hand-rolled Zustand `data-theme` pattern with a blocking `<ThemeScript>` to prevent FOUC. The CSS today defines only two semantic tokens (`--background`, `--foreground`), uses an ad-hoc grid background (with a known light-mode bug), and relies on Tailwind defaults plus arbitrary values throughout components.

This spec replaces the foundation with a three-layer token system aligned to a navy → indigo → slate-blue → lavender palette, adds a display serif for headings, and refines the grid background. It deliberately does **not** touch component code — that is spec 2's job.

## Goals

- Establish a small, semantic, palette-aware token system that components in spec 2 can consume without arbitrary values.
- Pair a display serif (Fraunces) with the existing Noto Sans / Noto Sans Mono to give the site an artistic register at heading scale, with minimal byte cost.
- Refine the grid background into a subtler, palette-tinted, vignetted version; fix the existing light-mode invisibility bug.
- Keep the existing theme-toggle UX (Zustand + `data-theme` + `<ThemeScript>` FOUC guard) — no behavior changes.

## Non-goals

- No component refactors (`components/**`) beyond verifying nothing breaks. Components that look mismatched against new tokens are acceptable and tracked as input to spec 2.
- No layout, hero, card, or navigation redesign.
- No animation, GSAP, or motion changes.
- No performance audit (bundle, image strategy, font subsetting beyond what `next/font` does automatically).
- No changes to `utils/constants/**` content data.
- No new theme modes (system-only, high-contrast, etc.).

## Architecture: three-layer token system

```
Layer 1 — raw palette (frozen, never used directly in components)
   ↓
Layer 2 — semantic tokens (mode-aware, swap on data-theme)
   ↓
Layer 3 — Tailwind utilities via @theme inline (bg-surface, text-foreground, ...)
```

### Layer 1 — raw palette

Defined once in `:root`, never re-defined:

| Variable | Hex | Role in palette |
|---|---|---|
| `--c-navy` | `#0A0F2C` | Deep navy (palette swatch top) |
| `--c-indigo` | `#1A1E4D` | Indigo (palette swatch 2) |
| `--c-slate` | `#4F5689` | Slate-blue (palette swatch 3) |
| `--c-lavender` | `#9494BC` | Lavender (palette swatch bottom) |
| `--c-ink` | `#EDEDF6` | Near-white text on dark surfaces |
| `--c-paper` | `#F7F7FB` | Near-white page background (light) |

**Rule:** components must never reference `--c-*` directly, never use `bg-[#...]`. Only Layer 2 tokens are part of the public API.

### Layer 2 — semantic tokens (8 tokens)

Defined per-mode under `[data-theme=light]` and `[data-theme=dark]`:

| Token | Dark mode | Light mode |
|---|---|---|
| `--background` | `var(--c-navy)` | `var(--c-paper)` |
| `--foreground` | `var(--c-ink)` | `var(--c-navy)` |
| `--surface` | `var(--c-indigo)` | `color-mix(in srgb, var(--c-lavender) 20%, var(--c-paper))` |
| `--surface-foreground` | `var(--c-lavender)` | `var(--c-indigo)` |
| `--muted` | `color-mix(in srgb, var(--c-slate) 60%, transparent)` | `color-mix(in srgb, var(--c-slate) 70%, transparent)` |
| `--accent` | `var(--c-lavender)` | `var(--c-slate)` |
| `--accent-foreground` | `var(--c-navy)` | `#FFFFFF` |
| `--border` | `color-mix(in srgb, var(--c-slate) 25%, transparent)` | `color-mix(in srgb, var(--c-slate) 20%, transparent)` |

`color-mix` is supported by all evergreen browsers Next 16 targets; no fallback needed.

### Layer 3 — Tailwind v4 `@theme inline`

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-surface: var(--surface);
  --color-surface-foreground: var(--surface-foreground);
  --color-muted: var(--muted);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-border: var(--border);

  --font-display: var(--font-fraunces);
  --font-sans: var(--font-noto-sans);
  --font-mono: var(--font-noto-sans-mono);
}
```

This generates utilities like `bg-surface`, `text-foreground`, `border-border`, `font-display`. Opacity modifiers (`bg-accent/20`) work natively.

## Typography

Three families, three roles:

| Role | Family | CSS var | Used for |
|---|---|---|---|
| Display | Fraunces (variable, opsz) | `--font-display` | `<h1>`, `<h2>`, hero headline |
| Body | Noto Sans (existing) | `--font-sans` | Paragraphs, UI, buttons, nav |
| Mono | Noto Sans Mono (existing) | `--font-mono` | Code, eyebrow labels, metadata |

### Type scale

Implemented as a small set of semantic classes in `globals.css` (not Tailwind utilities — the scale is small enough that a CSS layer is clearer than 7 custom utilities):

```css
@layer components {
  .text-display-xl { font: 400 clamp(2.75rem, 6vw, 4.5rem)/1.05 var(--font-display); letter-spacing: -0.02em; }
  .text-display-lg { font: 400 clamp(2rem, 4vw, 3rem)/1.1 var(--font-display); letter-spacing: -0.02em; }
  .text-heading    { font: 600 1.5rem/1.25 var(--font-display); letter-spacing: -0.01em; }
  .text-body-lg    { font: 400 1.125rem/1.6 var(--font-sans); }
  .text-body       { font: 400 1rem/1.65 var(--font-sans); }
  .text-small      { font: 500 0.875rem/1.5 var(--font-sans); }
  .text-eyebrow    { font: 400 0.75rem/1 var(--font-mono); text-transform: uppercase; letter-spacing: 0.08em; }
}
```

### Font loading

In `app/layout.tsx`, alongside the existing two `next/font/google` calls:

```ts
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  weight: ["400", "600"],
  display: "swap",
});
```

Then add `${fraunces.variable}` to the `<body>` className list.

## Surfaces, elevation, spacing

### Elevation — 2 levels only

| Level | Dark | Light | Use |
|---|---|---|---|
| 0 page | `bg-background` | `bg-background` | `<main>` shell |
| 1 surface | `bg-surface` | `bg-surface` | Cards, modals, navbar pill |
| 2 raised | `bg-surface border border-border` | `bg-surface border border-border shadow-sm` | Hover/active card state |

Borders are always `border-border`, hairline only.

### Spacing rhythm — 4 stops

Components in spec 2 must pick one of these for any gap or padding step. No arbitrary values, no `gap-3` / `gap-5` / `gap-12`.

| Name | Tailwind class | Pixels | Use |
|---|---|---|---|
| tight | `gap-2` / `p-2` | 8 | Inside compact components |
| base | `gap-4` / `p-4` | 16 | Between related elements |
| section | `gap-8` / `p-8` | 32 | Sub-sections inside a page section |
| block | `gap-16` / `py-16` | 64 | Between major page sections |

### Container

Single container utility for all main-content widths:

```css
.container-page { max-width: 72rem; margin-inline: auto; padding-inline: 1.5rem; }
@media (min-width: 768px) { .container-page { padding-inline: 2.5rem; } }
```

Replaces ad-hoc widths across components in spec 2.

### Border radius — 3 stops

- `rounded-md` (6px): buttons, inputs, badges
- `rounded-xl` (12px): cards, modal images, navbar pill
- `rounded-full`: avatars, dot indicators

## Grid background

Refined version of the current `.bg-grid-pattern`:

```css
@layer components {
  .bg-grid-pattern {
    background-color: var(--background);
    background-size: 64px 64px;
    background-image:
      linear-gradient(var(--grid-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, #000 40%, transparent 90%);
    -webkit-mask-image: radial-gradient(ellipse at center, #000 40%, transparent 90%);
  }
}

:root[data-theme=dark]  { --grid-line: rgba(237, 237, 246, 0.035); }
:root[data-theme=light] { --grid-line: rgba(79,  86,  137, 0.06);  }
```

Changes from today:
- 50px → 64px cell size.
- Dark line opacity 0.05 → 0.035.
- Light mode now uses **slate-tinted** lines (currently white-on-near-white → invisible — this is a bug fix).
- Radial vignette mask fades the grid at the viewport edges so it stops feeling like wallpaper.

## Theme switch behavior

No changes to the theme system itself:

- `<ThemeScript>` continues to set `data-theme` before paint to prevent FOUC. It only references the `theme-storage` localStorage key — does not depend on any token names — so no edits needed.
- Zustand `theme-store.ts` continues to drive runtime toggling.
- Existing `transition-colors duration-300` on `<html>` automatically animates all token-based utilities when `data-theme` flips.
- `<html suppressHydrationWarning>` continues to be required.

## File-level changes

| File | Change |
|---|---|
| `app/globals.css` | Rewrite: three-layer token system, type scale, container, refined `.bg-grid-pattern`, light/dark `--grid-line`. Removes the stale `@media (prefers-color-scheme: dark)` block at `:root` (lines 8–13) — `data-theme` is the single source of truth. Removes the `body { font-family: Arial, ...; }` rule (line 64) that currently overrides the `next/font` Noto Sans variables. |
| `app/layout.tsx` | Import `Fraunces` from `next/font/google`, expose `--font-fraunces`, add to `<body>` className |
| `components/theme-script.tsx` | Verify only — script reads `theme-storage` localStorage and sets `data-theme`; has no token-name dependencies. Zero edits expected. |
| `tailwind.config.ts` | Delete. Currently declares `content` paths and a `fontFamily` extension (`font-noto-sans`, `font-noto-sans-mono`). Tailwind v4 auto-detects content, and `@theme inline` replaces the fontFamily block. The two declared utilities are unused across the codebase (verified via grep), so deletion is safe. |

No other files are modified in this spec.

## Acceptance criteria

1. `bun run build` and `bun dev` complete with no new warnings.
2. Theme toggle works; no FOUC; no hydration warnings in the console.
3. All four palette colors are visible somewhere on the rendered pages (components may look mismatched against the new tokens — expected, addressed in spec 2).
4. Grepping `components/**` for off-palette and off-rhythm usage produces a list captured in the spec-2 input notes — **not fixed in this spec**. The grep must cover, at minimum:
   - Raw hex: `bg-\[#`, `text-\[#`, `border-\[#`, and bare hex literals.
   - Off-palette Tailwind defaults: `bg-(white|black|gray-)`, `text-(white|black|gray-)`, `border-(white|black|gray-)`, including `dark:` / `light:` variants of each (currently used in `Home/index.tsx`, `project-card.tsx`, and others).
   - Off-rhythm spacing: `gap-3`, `gap-5`, `gap-6`, `gap-12`, plus equivalent `p-`, `px-`, `py-`, `m-`, `mx-`, `my-` values.
5. No new dependencies added beyond what `next/font/google` pulls for `Fraunces`.
6. Light-mode grid lines are visible (regression-fix verification — current `bg-grid-pattern` light-mode lines are white-on-near-white and effectively invisible).
7. Body text renders in Noto Sans, not Arial (regression-fix verification — the current `body { font-family: Arial, ...; }` rule in `globals.css` is being removed; `<body>` should inherit the `--font-noto-sans` variable through the new tokens).

## Lean guardrails

Any of these crossing the line during implementation indicates scope creep — push back to spec 2 or 3:

- 8 tokens, not 14.
- 3 font roles (display/sans/mono), not 5.
- 4 spacing stops, not 7.
- 2 elevation levels, not 3.
- One container width, not three.
- No new utility classes beyond what `@theme` generates plus the seven `text-*` semantic classes and `.container-page`.

## Open questions

None at this stage. Implementation plan (spec 2 entry point) will be produced by the writing-plans skill in the next step.
