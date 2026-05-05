# Performance & Motion — Spec 3 (final phase)

**Date:** 2026-05-05
**Scope:** Final phase of the original 3-spec portfolio overhaul. Drops the now-unused GSAP dependency, batch-converts site images to WebP (deleting heavy PNG/JPG originals), and wires two CSS-only motion moments (headline underline reveal + active timeline dot radiating-ring pulse). All four items respect `prefers-reduced-motion: reduce`. No new shipping dependencies.

## Context

After specs 1 (foundation), 2a (Home), 2b (Projects), 2c (Skills & Certificates), 2d (Experiences), and 2e (shared chrome), every component consumes only foundation tokens, the audit doc's findings sections are closed, and the codebase is server-leaning. Motion has been deferred to this spec; performance has accumulated two clear wins (the GSAP package is no longer imported anywhere; raw PNG/JPG image weight totals ~9 MB).

Spec 3 closes both. It is intentionally lean: 4 items, no new shipping libraries, no page transitions, no animation framework.

## Goals

- Remove the `gsap` package from `package.json` (zero imports remain after spec 2c).
- Drop `"GSAP"` from the Portfolio project's `tags` in `ProjectsData` so the displayed stack reflects what actually ships.
- Batch-convert images in `public/images/certificates/`, `public/images/projects/`, `public/images/skills/`, plus `public/images/profile.jpg` and `public/images/site-thumbnail.png` from PNG/JPG to WebP at quality 80; delete originals; update all consuming paths.
- Animate the headline underline on `<span class="name-underline">` (Home) — a left-to-right draw on mount with a brief delay.
- Animate the active timeline dot on `/experiences` — a radiating ring radar-ping pulse, 2s loop.
- Both motion moments respect `prefers-reduced-motion: reduce`.

## Non-goals

- No page transitions between routes (Next.js `viewTransition` API or otherwise).
- No new motion library (no framer-motion, motion-one, etc.).
- No JS-driven animation; all motion is CSS.
- No font subsetting work — Fraunces with `subsets: ["latin"]` is already minimal; further reductions yield single-digit KB.
- No dead code audit beyond what specs 2a–2e already produced.
- No conversion of `public/images/pwa-icons/*` — PWA manifest spec consumers and `<link rel="apple-touch-icon">` reliably expect PNG.
- No additional image format (e.g., AVIF). WebP only — broad compat, single-format payload, simpler `next/image` resolution.
- No changes to component shapes, layouts, or other behaviors. Spec 3 is purely additive (motion) + subtractive (perf cleanup).

## P1 — Remove GSAP

### Steps

1. `bun remove gsap` — drops the dep from `package.json` and `bun.lock`.
2. Update Portfolio entry's `tags` in `utils/constants/index.ts`:

   ```ts
   // before
   tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],

   // after
   tags: ["Next.js", "TypeScript", "Tailwind CSS"],
   ```

3. Verify `rg "gsap|GSAP" components/ app/ utils/` returns zero matches.

### Why

The package weighs ~32 KB min+gzip (and an unminified node_modules footprint). Zero imports in current code; nothing left consuming it after specs 2c (Skills' floating-icon GSAP) and 2d (Experiences' previous client motion) were rewritten. The Portfolio project's `tags` listing GSAP is now misleading — the portfolio doesn't actually use it anymore.

## P2 — Image optimization (PNG/JPG → WebP)

### Conversion script

Create `scripts/convert-images-to-webp.mjs` (one-time use, deleted after run):

```js
#!/usr/bin/env bun
import { readdir, unlink } from "node:fs/promises";
import { join, parse, relative } from "node:path";
import sharp from "sharp";

const TARGETS = [
  "public/images/certificates",
  "public/images/projects",
  "public/images/skills",
];
const SINGLE_FILES = [
  "public/images/profile.jpg",
  "public/images/site-thumbnail.png",
];
const QUALITY = 80;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

async function convert(file) {
  const { name, dir, ext } = parse(file);
  if (![".png", ".jpg", ".jpeg"].includes(ext.toLowerCase())) return;
  const out = join(dir, `${name}.webp`);
  await sharp(file).webp({ quality: QUALITY }).toFile(out);
  await unlink(file);
  console.log(`✓ ${relative(".", file)} → ${relative(".", out)}`);
}

for (const target of TARGETS) for await (const f of walk(target)) await convert(f);
for (const f of SINGLE_FILES) await convert(f);
```

### Run sequence

1. `bun add -d sharp` (temporary dev dep).
2. `bun scripts/convert-images-to-webp.mjs` (converts and deletes originals).
3. `bun remove sharp` (drops the dev dep).
4. `git rm scripts/convert-images-to-webp.mjs` (script does not ship).

`sharp` is NOT a runtime dependency. It exists only during the run.

### Path updates after conversion

**`utils/constants/index.ts`:**

| Constant | Field | Update |
|---|---|---|
| `CertificatesData` | every entry's `src` and `metadata.image` | `*.png` / `*.jpg` → `*.webp` |
| `ProjectsData` (Redbiomed) | `metadata.imageSrc` | `redbiomed-thumbnail.png` → `redbiomed-thumbnail.webp` |
| `ProjectsData` (TOPCIT LCMS) | `metadata.imageSrc` | `topcit-thumbnail.png` → `topcit-thumbnail.webp` |
| `ProjectsData` (E-CPLGT) | `metadata.imageSrc` | `ecplgt-thumbnail.png` → `ecplgt-thumbnail.webp` |
| `ProjectsData` (Portfolio) | `metadata.imageSrc` | `portfolio-v2-thumbnail.png` → `portfolio-v2-thumbnail.webp` |
| `skillCategories` | every skill's `src` | `*.png` → `*.webp` |

**`components/Home/index.tsx`:**

```tsx
// before
src="/images/profile.jpg"

// after
src="/images/profile.webp"
```

**`app/layout.tsx`:**

```ts
// openGraph.images and twitter.images
url: "https://darenzhicap.netlify.app/images/site-thumbnail.webp",
type: "image/webp",
```

(`type` field on OG only — Twitter card doesn't need a `type`.)

### Excluded from conversion

- `public/images/pwa-icons/*` (manifest icons, apple-touch-icon — must stay PNG).
- Any other PNG/JPG accidentally introduced after this spec — future additions should ship as WebP from the start.

### Expected savings

Pre-spec-3 baseline: 9.0 MB across optimized targets (5.5 MB certificates + 3.5 MB projects + 1.1 MB skills + 260 KB profile + 216 KB site-thumbnail = ~10.5 MB total).

WebP at quality 80 typically reduces 70–85% on photographic certs and 50–70% on UI-style project screenshots. Realistic target: **≤3 MB across the converted folders** (a roughly 70% reduction).

This is verified post-conversion via `du -sh public/images/`.

## M1 — Headline underline reveal

### Today

`globals.css` contains (added by spec 2a):

```css
.name-underline {
  border-bottom: 2px solid var(--accent);
  padding-bottom: 0.1em;
}
```

The class is applied to `<span class="name-underline">Darenz Jasper A. Hicap</span>` inside the Home headline.

### After spec 3

Replace the `.name-underline` rule and add a keyframes block:

```css
@layer components {
  .name-underline {
    position: relative;
    padding-bottom: 0.1em;
  }
  .name-underline::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left center;
    animation: name-underline-draw 0.6s ease-out 0.2s forwards;
  }
  @media (prefers-reduced-motion: reduce) {
    .name-underline::after {
      transform: scaleX(1);
      animation: none;
    }
  }
}

@keyframes name-underline-draw {
  to {
    transform: scaleX(1);
  }
}
```

The element no longer has a `border-bottom`. The `::after` pseudo-element holds the line and animates its `scaleX` from 0 to 1 over 600 ms with `ease-out`, after a 200 ms delay, with `forwards` fill mode so the final state sticks.

`@keyframes` lives at the top level of the stylesheet (CSS spec: keyframes can't be inside `@layer`). Place after the `@layer components` closing `}` and before the `body` rule.

### Why a `::after` pseudo (not animating the element itself)

Animating the element's `border-bottom` would couple the line's transform to the headline's text layout. Using `::after` keeps the line as an independent, decorative layer that animates without affecting the text geometry. `padding-bottom: 0.1em` on the element keeps the line at the same visual position as the static `border-bottom` would have rendered.

### No JSX changes

`<span className="name-underline">` already exists (placed by spec 2a). The CSS rewrite handles everything.

## M2 — Active timeline dot pulse (radiating ring)

### Today

`components/Experiences/components/timeline-entry.tsx` renders:

```tsx
<li
  ref={ref}
  className={`reveal relative ${dotClass} before:absolute before:-left-[33px] before:top-1 before:size-2.5 before:rounded-full ${className ?? ""}`}
  ...
>
```

with `dotClass = isActive ? "before:bg-accent" : "before:bg-border"`.

The `::before` pseudo is the static dot. Today, the active dot is just a different color — no motion.

### After spec 3

Add a `.dot-pulse` class in `globals.css`:

```css
@layer components {
  .dot-pulse::after {
    content: "";
    position: absolute;
    left: -33px;
    top: 4px;
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 9999px;
    pointer-events: none;
    background: var(--accent);
    opacity: 0.4;
    animation: dot-pulse-ring 2s ease-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    .dot-pulse::after {
      animation: none;
      display: none;
    }
  }
}

@keyframes dot-pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}
```

### Update `timeline-entry.tsx` to apply the class only on the active entry

```tsx
const dotClasses = isActive
  ? "before:bg-accent dot-pulse"
  : "before:bg-border";

return (
  <li
    ref={ref}
    className={`reveal relative ${dotClasses} before:absolute before:-left-[33px] before:top-1 before:size-2.5 before:rounded-full ${className ?? ""}`}
    style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
  >
```

(Renamed `dotClass` → `dotClasses` to reflect that it now combines two classes for the active state.)

### How it renders

- The existing `::before` is the static accent dot at `(-33px, top-1)`, `size-2.5`.
- The new `::after` starts at the same position and size, fully overlapping the dot, with `opacity: 0.4`.
- `scale(1) → scale(2.6)` over 2 s with `opacity: 0.4 → 0` produces a radar-ping ring radiating outward and fading.
- `ease-out` decelerates the expansion as it fades, so the late-cycle "trail" feels gentle.
- `pointer-events: none` ensures the ring doesn't catch hover or click events on the timeline.
- Only the active entry gets the class, so only one dot pulses at a time.

### Encapsulated arbitrary values

`left: -33px`, `top: 4px`, `width/height: 0.625rem` are inline CSS properties (not Tailwind utilities) inside the component class. They mirror the `before:-left-[33px] before:top-1 before:size-2.5` of the dot they sit behind. Encapsulated; allowed.

### Reduced motion

`@media (prefers-reduced-motion: reduce)` overrides the rule with `animation: none; display: none;` — the ring disappears entirely. The static accent dot remains so the active state is still visible (color), just without the motion.

## File-level changes

| File | Change |
|---|---|
| `package.json` | Modify — `bun remove gsap` |
| `bun.lock` | Side effect of the remove |
| `utils/constants/index.ts` | Modify — Portfolio tags drop `"GSAP"`; all `*.png` / `*.jpg` paths in `CertificatesData`, `ProjectsData`, `skillCategories` switch to `*.webp` |
| `app/layout.tsx` | Modify — OG metadata `images` URL + `type` updated to `.webp`; Twitter `images` updated to `.webp` |
| `components/Home/index.tsx` | Modify — profile image `src` updated to `/images/profile.webp` |
| `app/globals.css` | Modify — rewrite `.name-underline`, add `.dot-pulse`, add 2 `@keyframes` blocks |
| `components/Experiences/components/timeline-entry.tsx` | Modify — apply `dot-pulse` class on active entry |
| `public/images/certificates/*.{png,jpg}` | Delete originals; replace with `*.webp` |
| `public/images/projects/*.png` | Delete originals; replace with `*.webp` |
| `public/images/skills/*.png` | Delete originals; replace with `*.webp` |
| `public/images/profile.jpg` | Delete; replace with `profile.webp` |
| `public/images/site-thumbnail.png` | Delete; replace with `site-thumbnail.webp` |
| `scripts/convert-images-to-webp.mjs` | Create, run, delete |
| `package.json` (dev deps, transient) | Add `sharp` for the script run, remove after |

No other files touched. `pwa-icons/*.png` stays PNG.

## Implementation order

1. **Image conversion (P2 first half):** add `sharp` dev dep → write/run script → remove `sharp` → delete script.
2. **Path updates (P2 second half):** update all data + JSX consumers.
3. **Verify build + visual smoke test:** every page renders images.
4. **GSAP removal (P1):** `bun remove gsap` + drop `"GSAP"` tag.
5. **M1: rewrite `.name-underline`** + add keyframes in `globals.css`.
6. **M2: add `.dot-pulse` rule** + apply in `timeline-entry.tsx`.
7. **Final acceptance walk.**

## Design system contract

### Color tokens (motion-specific)

| Use | Property |
|---|---|
| Headline underline color | `background: var(--accent)` (in `.name-underline::after`) |
| Pulse ring color | `background: var(--accent)` (in `.dot-pulse::after`) |

### Allowed deviations (declared)

- Two new `@keyframes` rules at the top level of `globals.css`: `name-underline-draw` and `dot-pulse-ring`. CSS spec requires keyframes outside `@layer`.
- `.name-underline::after` and `.dot-pulse::after` use raw CSS positioning, transforms, and opacity. Encapsulated inside the component class.
- `left: -33px; top: 4px; width: 0.625rem; height: 0.625rem` mirror the dot's `before:-left-[33px] before:top-1 before:size-2.5` math from spec 2d. Match by intent.

### Forbidden

- New animation library imports. Anything in `package.json`'s `dependencies` after spec 3 must already be there.
- `gsap` references anywhere in the codebase.
- JS-driven animation (`requestAnimationFrame`, `Element.animate`, etc.).
- PNG / JPG paths in component code or constants, except those under `public/images/pwa-icons/`.
- `sharp` in `dependencies` or persistent `devDependencies`. It exists only during the script run.
- `scripts/convert-images-to-webp.mjs` in the final tree. The script is throwaway.

## Acceptance criteria

1. `bun run build` and `bun dev` complete with no new warnings. Static prerender for all 8 routes (the four named pages plus `/_not-found`, the manifest, the index, and the `[slug]` SSG group) succeeds.
2. **P1 verified:**
   - `package.json` has no `gsap` entry in `dependencies` or `devDependencies`.
   - `bun.lock` does not contain `gsap`.
   - `rg "gsap|GSAP" components/ app/ utils/` returns zero matches.
   - The Portfolio project's `tags` in `ProjectsData` does not contain `"GSAP"`.
3. **P2 verified:**
   - `find public/images -name "*.png" -not -path "*/pwa-icons/*"` returns zero.
   - `find public/images -name "*.jpg"` returns zero.
   - `find public/images -name "*.jpeg"` returns zero.
   - `rg "\\.png|\\.jpg|\\.jpeg" components/ utils/ app/` returns matches only for `pwa-icons` paths (a small set in `app/layout.tsx`'s `<link rel="...">` block).
   - `du -sh public/images/` reports a total ≤ ~3.5 MB (vs ~10.5 MB pre-spec).
   - Every cert thumbnail renders on `/skills-and-certificates` (visual check, light + dark).
   - Every project thumbnail renders on `/projects` (visual check, including the featured Redbiomed image and all compact rows).
   - Profile image renders on `/`.
   - The site OG image at `/images/site-thumbnail.webp` resolves with status 200 in production.
   - `scripts/convert-images-to-webp.mjs` does not exist after the spec.
   - `sharp` is not in `package.json` after the spec.
4. **M1 verified:**
   - On hard-refresh of `/`, the underline under "Darenz Jasper A. Hicap" is invisible at the very first frame, then draws left-to-right after a brief pause (~200 ms), reaching full width over ~600 ms.
   - With `prefers-reduced-motion: reduce` enabled in DevTools, the underline is fully drawn from the very first frame; no animation runs.
   - The headline reads correctly throughout the animation; no layout shift.
   - The line's color matches `var(--accent)` (lavender in dark / slate in light).
5. **M2 verified:**
   - On `/experiences`, the topmost entry's accent dot has a faintly visible ring expanding outward and fading, looping every 2 s.
   - Past entries' dots (border-colored) have no ring.
   - With `prefers-reduced-motion: reduce` enabled, the ring is `display: none`; only the static dot is visible.
   - The ring does not capture pointer events (hovering it does not affect anything).
6. Theme toggle works in both modes for all four redesigned pages, after every spec 3 change.
7. The cross-page smoke test from spec 2e still passes (every page still renders correctly with the new images and motion).

## Lean guardrails

- 1 dependency removal (`gsap`).
- 1 transient dev dep (`sharp` during P2 only).
- 1 throwaway script (`convert-images-to-webp.mjs`, deleted after run).
- ~25 image files converted (precise count depends on what's in `public/images/` at run time).
- 2 new CSS rules (`.dot-pulse`, `name-underline-draw` keyframe and friends).
- 1 CSS rule rewritten (`.name-underline`).
- 1 component edit (`timeline-entry.tsx` className change).
- 1 metadata edit (`app/layout.tsx`).
- Data path updates batched into a single commit each for constants + Home + layout.
- 0 new shipping dependencies.
- 0 new permanent files in `scripts/`.
- 0 page transitions, no `viewTransition` API usage, no animation libraries.

## Closes the original 3-spec decomposition

After spec 3 lands:

- **Spec 1 (foundation):** ✓ token system, type scale, rhythm.
- **Spec 2 (layout & composition, sub-specs 2a–2e):** ✓ all four sections + shared chrome rebuilt on tokens.
- **Spec 3 (perf + motion):** ✓ GSAP removed, images optimized, headline underline + active timeline dot motion wired.

Future portfolio work — additional sections, content updates, an accessibility audit, real automated tests, page transitions, deeper micro-interactions — is its own future cycle and out of scope for this overhaul.

## Open questions

None at this stage. Implementation plan will be produced by the writing-plans skill in the next step.
