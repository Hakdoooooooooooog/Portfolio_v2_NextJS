# Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current ad-hoc CSS theme with a three-layer design-token foundation (raw palette → semantic tokens → Tailwind v4 `@theme inline`), add Fraunces as a display font, refine the grid background, and clean up two latent bugs (Arial body font, invisible light-mode grid lines).

**Architecture:** All changes land in `app/globals.css` (rewritten in stages), `app/layout.tsx` (one font import), and the deletion of `tailwind.config.ts`. No component code changes — components keep their current classes and may visually mismatch the new tokens until spec 2 reworks them. The existing `<ThemeScript>` + Zustand `data-theme` flow is preserved unchanged.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), `next/font/google`, Bun.

**Testing reality:** This project has no test runner configured (per `CLAUDE.md`). Verification is done via `bun run build`, `bun dev` with manual browser checks, and grep gates. Each task ends with a concrete check command and the expected outcome — treat those as the "tests."

**Reference spec:** `docs/superpowers/specs/2026-05-05-foundation-design.md`.

---

## File map

| File | Disposition |
|---|---|
| `app/layout.tsx` | Modify — add Fraunces font import, expose its variable on `<body>` (Task 1) |
| `app/globals.css` | Rewrite in three stages (Tasks 2, 3, 4) plus a cleanup pass (Task 5) |
| `tailwind.config.ts` | Delete (Task 5) |
| `components/theme-script.tsx` | Verify only — no edits expected (Task 6) |
| `docs/superpowers/notes/spec-2-input.md` | Create — captures the grep audit for spec 2 (Task 6) |

---

## Task 1: Add Fraunces display font

**Files:**
- Modify: `app/layout.tsx` (add import, font instance, body className)

- [ ] **Step 1: Read `app/layout.tsx` to confirm current font block layout**

Run: open the file. Confirm lines 1–16 currently look like:

```ts
import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import ThemeScript from "../components/theme-script";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});
```

If different, update the patches in Steps 2 and 3 to match.

- [ ] **Step 2: Add the Fraunces import to the existing `next/font/google` import line**

Edit `app/layout.tsx`. Change line 2 from:

```ts
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
```

to:

```ts
import { Fraunces, Noto_Sans, Noto_Sans_Mono } from "next/font/google";
```

- [ ] **Step 3: Add the Fraunces font instance immediately after `notoSansMono`**

Insert directly after the closing `});` of the `notoSansMono` declaration:

```ts
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  weight: ["400", "600"],
  display: "swap",
});
```

- [ ] **Step 4: Add `${fraunces.variable}` to the `<body>` className**

Find the `<body>` tag (around line 97). Change:

```tsx
<body
  className={`${notoSans.variable} ${notoSansMono.variable} antialiased`}
>
```

to:

```tsx
<body
  className={`${notoSans.variable} ${notoSansMono.variable} ${fraunces.variable} antialiased`}
>
```

- [ ] **Step 5: Verify the build still succeeds**

Run: `bun run build`
Expected: build completes; output should mention fetching the Fraunces font during prerender. No TypeScript or build errors.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(foundation): load Fraunces display font via next/font"
```

---

## Task 2: Replace `:root` tokens with three-layer system

**Files:**
- Modify: `app/globals.css` (replace lines 1–27, the `@import`, `:root`, `prefers-color-scheme` block, custom variants, and `@theme inline`)

> Why staged: this is the largest CSS change. Doing it in one task (rather than three) keeps the file in a coherent state — Layer 2 references Layer 1 vars, and Layer 3 references Layer 2 vars; splitting them produces broken intermediate commits.

- [ ] **Step 1: Read `app/globals.css` to confirm the current top section**

Confirm lines 1–27 currently contain `@import "tailwindcss";`, a `:root` block with `--background` / `--foreground`, an `@media (prefers-color-scheme: dark)` block, two `@custom-variant` declarations, and an `@theme inline` block with two color tokens. If the file has diverged, update the patch below to match.

- [ ] **Step 2: Replace lines 1–27 with the three-layer token system**

Replace the entire section from `@import "tailwindcss";` through the closing `}` of `@theme inline` (currently lines 1–27) with:

```css
@import "tailwindcss";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
@custom-variant light (&:where([data-theme=light], [data-theme=light] *));

/* Layer 1 — raw palette. Frozen. Never used directly in components. */
:root {
  --c-navy: #0A0F2C;
  --c-indigo: #1A1E4D;
  --c-slate: #4F5689;
  --c-lavender: #9494BC;
  --c-ink: #EDEDF6;
  --c-paper: #F7F7FB;
}

/* Layer 2 — semantic tokens, mode-aware. Driven by data-theme on <html>. */
:root[data-theme="light"] {
  --background: var(--c-paper);
  --foreground: var(--c-navy);
  --surface: color-mix(in srgb, var(--c-lavender) 20%, var(--c-paper));
  --surface-foreground: var(--c-indigo);
  --muted: color-mix(in srgb, var(--c-slate) 70%, transparent);
  --accent: var(--c-slate);
  --accent-foreground: #ffffff;
  --border: color-mix(in srgb, var(--c-slate) 20%, transparent);
}

:root[data-theme="dark"] {
  --background: var(--c-navy);
  --foreground: var(--c-ink);
  --surface: var(--c-indigo);
  --surface-foreground: var(--c-lavender);
  --muted: color-mix(in srgb, var(--c-slate) 60%, transparent);
  --accent: var(--c-lavender);
  --accent-foreground: var(--c-navy);
  --border: color-mix(in srgb, var(--c-slate) 25%, transparent);
}

/* Layer 3 — expose semantic tokens as Tailwind utilities. */
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

Leave the rest of the file (the `.bg-grid-pattern` block at lines 29–58 and the `body` rule at lines 61–65) untouched for now. Tasks 3 and 4 handle those.

- [ ] **Step 3: Verify the build succeeds and the new utilities are generated**

Run: `bun run build`
Expected: build completes with no warnings about unknown tokens. Tailwind should now generate `bg-background`, `bg-surface`, `text-foreground`, `border-border`, `font-display`, `font-sans`, `font-mono`, and `bg-accent` (among others) on demand.

- [ ] **Step 4: Smoke-test the dev server and theme toggle**

Run: `bun dev` (in a background shell or separate terminal). Open `http://localhost:3000`.
Expected: the page loads. Body still renders in Arial (Task 5 fixes this). Toggle the theme via the navbar switch — `data-theme` on `<html>` should flip between `light` and `dark`. The page may look broken/mismatched against the new tokens — this is expected and will not be fixed in this spec.

Stop the dev server before continuing.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat(foundation): introduce three-layer design token system"
```

---

## Task 3: Add type scale and container utilities

**Files:**
- Modify: `app/globals.css` (extend the existing `@layer components` block or add a new one)

- [ ] **Step 1: Locate the existing `@layer components` block in `app/globals.css`**

After Task 2, the file should still have a `@layer components { .bg-grid-pattern { ... } }` block (originally lines 29–59). The type scale and container utilities go *inside* that same block, before `.bg-grid-pattern`.

- [ ] **Step 2: Insert seven type-scale classes plus the container utility at the top of `@layer components`**

Find the line `@layer components {` and insert the following block immediately after that opening brace, before `.bg-grid-pattern`:

```css
  /* Semantic typography scale. Matches the foundation spec; do not add new sizes here. */
  .text-display-xl {
    font: 400 clamp(2.75rem, 6vw, 4.5rem) / 1.05 var(--font-display);
    letter-spacing: -0.02em;
  }
  .text-display-lg {
    font: 400 clamp(2rem, 4vw, 3rem) / 1.1 var(--font-display);
    letter-spacing: -0.02em;
  }
  .text-heading {
    font: 600 1.5rem / 1.25 var(--font-display);
    letter-spacing: -0.01em;
  }
  .text-body-lg {
    font: 400 1.125rem / 1.6 var(--font-sans);
  }
  .text-body {
    font: 400 1rem / 1.65 var(--font-sans);
  }
  .text-small {
    font: 500 0.875rem / 1.5 var(--font-sans);
  }
  .text-eyebrow {
    font: 400 0.75rem / 1 var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* Single canonical content container. Replaces ad-hoc widths in spec 2. */
  .container-page {
    max-width: 72rem;
    margin-inline: auto;
    padding-inline: 1.5rem;
  }
  @media (min-width: 768px) {
    .container-page {
      padding-inline: 2.5rem;
    }
  }
```

> Note: `@media` inside `@layer components` is valid in Tailwind v4 / native CSS layers and does not need to be hoisted out.

- [ ] **Step 3: Verify the build succeeds**

Run: `bun run build`
Expected: build completes; no warnings about unknown classes.

- [ ] **Step 4: Manually verify the classes resolve in the dev server**

Run: `bun dev`. Open `http://localhost:3000`. In DevTools, inspect any element and add `class="text-display-xl"` via the elements panel.
Expected: text re-renders in a serif (Fraunces) at clamped large size. If it stays sans-serif, double-check that Fraunces was loaded successfully in Task 1 (look for `--font-fraunces` on `<body>` and a Fraunces font file in the network tab).

Stop the dev server before continuing.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat(foundation): add semantic type scale and container utility"
```

---

## Task 4: Refine the grid background

**Files:**
- Modify: `app/globals.css` (replace the existing `.bg-grid-pattern` block)

- [ ] **Step 1: Locate the existing `.bg-grid-pattern` block**

After Tasks 2 and 3, `app/globals.css` still contains a `.bg-grid-pattern { ... }` declaration with `@variant light` and `@variant dark` nested rules. That entire declaration is being replaced.

- [ ] **Step 2: Replace the existing `.bg-grid-pattern` declaration**

Inside `@layer components`, replace the full `.bg-grid-pattern { ... }` block (the one with the `@variant light` / `@variant dark` nested blocks) with:

```css
  .bg-grid-pattern {
    background-color: var(--background);
    background-size: 64px 64px;
    background-image:
      linear-gradient(var(--grid-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
    -webkit-mask-image: radial-gradient(ellipse at center, #000 40%, transparent 90%);
    mask-image: radial-gradient(ellipse at center, #000 40%, transparent 90%);
  }
```

Then, **outside** `@layer components` (after the closing `}`), add the per-mode `--grid-line` definitions. Place them immediately after the closing `}` of `@layer components`:

```css
:root[data-theme="light"] {
  --grid-line: rgba(79, 86, 137, 0.06);
}

:root[data-theme="dark"] {
  --grid-line: rgba(237, 237, 246, 0.035);
}
```

> Why outside `@layer components`: these are token assignments on `:root`, parallel to the Layer 2 token block from Task 2. They are not utility-component declarations.

- [ ] **Step 3: Verify the build succeeds**

Run: `bun run build`
Expected: build completes; no warnings.

- [ ] **Step 4: Manually verify the grid renders in both modes**

Run: `bun dev`. Open `http://localhost:3000`.

Expected (dark mode):
- A faint grid of 64px cells visible against the dark navy background.
- The grid fades to transparent toward the viewport edges (vignette).

Expected (light mode):
- A faint slate-tinted grid visible against the near-white background. **This is a regression fix — previously the lines were white-on-white and invisible.** If you cannot see grid lines in light mode, the fix didn't apply; check that the light-mode `--grid-line` rule landed.

Stop the dev server before continuing.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat(foundation): refine grid background with vignette and palette-tinted lines"
```

---

## Task 5: Remove stale rules and delete `tailwind.config.ts`

**Files:**
- Modify: `app/globals.css` (remove `body { font-family: Arial, ...; }`)
- Delete: `tailwind.config.ts`

- [ ] **Step 1: Remove the Arial body font-family override from `app/globals.css`**

At the bottom of `app/globals.css`, find:

```css
body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
```

Replace it with:

```css
body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), system-ui, sans-serif;
}
```

> This fixes the latent bug where body text rendered in Arial despite Noto Sans being loaded via `next/font`. The fallback `system-ui, sans-serif` covers the brief moment before the font swaps in.

- [ ] **Step 2: Delete `tailwind.config.ts`**

Run: `git rm tailwind.config.ts`
Expected: file removed from disk and staged for commit.

- [ ] **Step 3: Verify the build still succeeds**

Run: `bun run build`
Expected: build completes. Tailwind v4 auto-detects content from imports; no `content` array is needed. The previously declared `font-noto-sans` / `font-noto-sans-mono` utilities are gone, but a grep verified no component used them.

- [ ] **Step 4: Smoke-test the dev server**

Run: `bun dev`. Open `http://localhost:3000`. Inspect the `<body>` in DevTools and check the computed `font-family`.
Expected: computed font-family resolves to `"Noto Sans", system-ui, sans-serif` (or the equivalent the variable expands to). **NOT** Arial.

Stop the dev server before continuing.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "fix(foundation): drop Arial body override and obsolete tailwind.config.ts"
```

---

## Task 6: Verify acceptance criteria and capture spec-2 input

**Files:**
- Read: `components/theme-script.tsx` (verification only, no edits)
- Create: `docs/superpowers/notes/spec-2-input.md`

- [ ] **Step 1: Verify `<ThemeScript>` requires no edits**

Open `components/theme-script.tsx`. Confirm it still references only the `theme-storage` localStorage key and the `data-theme` attribute, with no token names or color values. If unchanged from the pre-implementation state, no edit needed.

- [ ] **Step 2: Manually walk acceptance criteria 1, 2, 6, 7 against the dev server**

Run: `bun dev`. Open `http://localhost:3000` with DevTools open.

Walk through each criterion:

1. *Build/dev clean:* `bun run build` from the previous task already passed. Confirm `bun dev` console shows no new warnings beyond pre-existing Next.js/Turbopack output.
2. *Theme toggle, no FOUC, no hydration warnings:* hard-refresh in both light and dark modes. Watch for a flash of the wrong theme — there should be none. Watch the DevTools console for hydration mismatch warnings — there should be none.
6. *Light-mode grid visible:* in light mode, faint slate-tinted grid lines should be visible. Confirmed in Task 4.
7. *Body in Noto Sans:* inspect `<body>` computed `font-family`; should resolve to a Noto Sans variant, not Arial. Confirmed in Task 5.

Stop the dev server.

- [ ] **Step 3: Verify acceptance criterion 3 — palette colors are reachable on the rendered pages**

Open the dev server again and navigate through `/`, `/projects`, `/skills-and-certificates`, `/experiences`. Inspect any rendered element — at least one of `--c-navy`, `--c-indigo`, `--c-slate`, `--c-lavender` should resolve to a real color in the computed styles cascade (most easily seen on `:root`).

> The spec explicitly allows the rendered pages to look mismatched. We are not fixing component classes here — only confirming the foundation tokens are reachable.

- [ ] **Step 4: Generate the spec-2 input grep audit**

Run the following grep commands from the repo root and capture the output. These cover acceptance criterion 4 — they identify everything spec 2 needs to migrate to the new tokens. Use the Grep tool (or `rg` if running locally), one search per line:

```
# Raw hex literals in components
rg -n "bg-\[#|text-\[#|border-\[#" components/

# Hex literals outside Tailwind arbitrary syntax
rg -n "#[0-9A-Fa-f]{3,8}\b" components/

# Off-palette Tailwind defaults (gray/white/black) including dark:/light: variants
rg -n "(^|\s|:)(bg|text|border)-(white|black|gray-\d+)" components/

# Off-rhythm spacing
rg -n "\b(gap|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(3|5|6|7|9|10|11|12|14)\b" components/
```

- [ ] **Step 5: Write the audit results to `docs/superpowers/notes/spec-2-input.md`**

Create the file with this structure (fill in the actual results from Step 4):

```markdown
# Spec 2 Input — Component Audit

> Generated as part of Foundation (spec 1) acceptance. Lists every component-level deviation from the new token / spacing rhythm. Spec 2 is responsible for migrating each entry.

## Raw hex literals (`bg-[#...]`, `text-[#...]`, `border-[#...]`)

<paste rg results here, or "(none)" if empty>

## Bare hex literals in component files

<paste rg results here>

## Off-palette Tailwind defaults (gray / white / black, incl. dark:/light: variants)

<paste rg results here>

## Off-rhythm spacing utilities

<paste rg results here>

## Notes

- This list is captured at the moment foundation lands. New violations introduced afterwards are bugs.
- Spec 2 should treat each entry as one concrete migration: replace with `bg-background` / `bg-surface` / `bg-accent` / `border-border` / etc., or with one of the four spacing rhythm stops (`-2`, `-4`, `-8`, `-16`).
```

- [ ] **Step 6: Commit the audit and any verification leftovers**

```bash
git add docs/superpowers/notes/spec-2-input.md
git commit -m "docs: capture spec-2 component-migration audit (foundation acceptance)"
```

- [ ] **Step 7: Final summary check**

Run: `git log --oneline -7`
Expected: seven commits since the spec was committed — one per task (Tasks 1–5 produce one commit each, Task 6 produces one commit), totaling six implementation commits plus the spec commits already in history.

The foundation is complete. Spec 2 (layout & composition) and spec 3 (performance + motion) follow in their own brainstorm → plan → implement cycles.

---

## Self-review notes

- Spec coverage: every section in the spec maps to a task. Layer 1/2/3 → Task 2. Type scale → Task 3. Container → Task 3. Grid refinement → Task 4. Stale rule cleanup → Task 5. `tailwind.config.ts` deletion → Task 5. `<ThemeScript>` verification → Task 6. Acceptance criteria 1–7 → Task 6 (criterion 4 produces a tracked artifact rather than fixes).
- No placeholders: every code step contains the exact CSS/TS that should land. No "TBD" or "similar to above."
- Type consistency: token names (`--background`, `--surface`, `--accent`, `--border`, `--muted`, `--foreground`, `--surface-foreground`, `--accent-foreground`) match the spec exactly. CSS class names (`text-display-xl`, `container-page`, `bg-grid-pattern`) match the spec exactly. The font CSS variable name `--font-fraunces` matches the `next/font` `variable` option in Task 1.
- Testing reality is acknowledged upfront — no fake `pytest`-style steps. Each task has a real check command (`bun run build` / `bun dev` with explicit DevTools inspection) and a stated expected outcome.
