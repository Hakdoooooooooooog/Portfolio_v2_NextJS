# Performance & Motion Implementation Plan (Spec 3 — final)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Drop the unused `gsap` package; convert PNG/JPG site images to WebP at quality 80 and update consuming paths; rewrite the headline `.name-underline` with a left-to-right draw-on-mount animation; add a `.dot-pulse` class plus a radiating-ring animation for the active timeline dot. All motion respects `prefers-reduced-motion: reduce`.

**Architecture:** Eight sequential changes. (1) Add `sharp` as a transient dev dep + write/run conversion script + remove `sharp` + delete the script. (2) Update all image paths in constants/JSX/metadata. (3) Verify WebP swap. (4) Remove `gsap` package + drop `"GSAP"` from Portfolio tags. (5) Rewrite `.name-underline` in `globals.css` (M1). (6) Add `.dot-pulse` rule + apply in `timeline-entry.tsx` (M2). (7) Final acceptance walk.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Bun, `sharp` (transient — used during P2 only). No new shipping dependencies.

**Testing reality:** No test runner. Verification per task is `bun run build`, `bun dev` with manual browser checks (light + dark + 360px mobile + `prefers-reduced-motion: reduce`), and grep gates.

**Reference spec:** `docs/superpowers/specs/2026-05-05-perf-and-motion-design.md`.

---

## File map

| File | Disposition |
|---|---|
| `scripts/convert-images-to-webp.mjs` | Create, run, delete (Task 1) |
| `package.json` (`devDependencies.sharp`) | Add transient (Task 1), remove (Task 1) |
| `package.json` (`dependencies.gsap`) | Remove (Task 4) |
| `bun.lock` | Side effect of Tasks 1 + 4 |
| `public/images/certificates/*.{png,jpg}` | Delete originals; replace with `*.webp` (Task 1) |
| `public/images/projects/*.png` | Delete originals; replace with `*.webp` (Task 1) |
| `public/images/skills/*.png` | Delete originals; replace with `*.webp` (Task 1) |
| `public/images/profile.jpg` | Delete; replace with `profile.webp` (Task 1) |
| `public/images/site-thumbnail.png` | Delete; replace with `site-thumbnail.webp` (Task 1) |
| `utils/constants/index.ts` | Modify — every `*.png`/`*.jpg` path → `*.webp`; Portfolio tags drop `"GSAP"` (Task 2 + Task 4) |
| `app/layout.tsx` | Modify — OG `images.url` + `type` + Twitter `images` → `.webp` (Task 2) |
| `components/Home/index.tsx` | Modify — profile `src` → `/images/profile.webp` (Task 2) |
| `app/globals.css` | Modify — rewrite `.name-underline`; add `.dot-pulse`; add 2 `@keyframes` blocks (Tasks 5 + 6) |
| `components/Experiences/components/timeline-entry.tsx` | Modify — add `dot-pulse` to active entry's class string (Task 6) |

`pwa-icons/*` stays PNG.

---

## Task 1: Image conversion (PNG/JPG → WebP)

**Files:**
- Create + delete: `scripts/convert-images-to-webp.mjs`
- Modify: `package.json` (transient `sharp` add/remove)
- Delete: PNG/JPG originals listed above
- Create: WebP replacements

- [ ] **Step 1: Add `sharp` as a transient dev dependency**

Run: `bun add -d sharp`
Expected: `sharp` added to `package.json` `devDependencies`. `bun.lock` updated.

- [ ] **Step 2: Create `scripts/convert-images-to-webp.mjs` with this exact content**

Create the file:

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

- [ ] **Step 3: Run the conversion**

Run: `bun scripts/convert-images-to-webp.mjs`
Expected: console output listing every conversion, e.g.:

```
✓ public\images\certificates\DICT_Basic-Level-of-Cloud-Computing.png → public\images\certificates\DICT_Basic-Level-of-Cloud-Computing.webp
✓ public\images\certificates\DICT_Intermediate-Level-of-Cloud-Computing.png → ...
... (~25 lines)
```

After the script completes, `find public/images -name "*.png" -not -path "*/pwa-icons/*"` should return zero, and `find public/images -name "*.jpg"` should return zero.

If any line errors out (e.g., a corrupt source file), STOP and report. Otherwise continue.

- [ ] **Step 4: Verify image weight reduced**

Run: `du -sh public/images/`
Expected: ≤ ~3.5 MB (down from ~10.5 MB pre-spec).

If the result is still over 5 MB, the conversion didn't fully succeed. Investigate before proceeding.

- [ ] **Step 5: Remove `sharp` dev dependency**

Run: `bun remove sharp`
Expected: `sharp` removed from `package.json` `devDependencies`. `bun.lock` updated. `node_modules/sharp` deleted.

- [ ] **Step 6: Delete the conversion script**

Run: `git rm scripts/convert-images-to-webp.mjs`

If the `scripts/` directory becomes empty after this, leave it empty (or delete it manually with `rmdir scripts` if the OS allows). The empty directory is fine; git ignores it.

- [ ] **Step 7: Verify build still works (paths still pointing at the old PNGs)**

Run: `bun run build`
Expected: build SUCCEEDS but with **runtime warnings or 404s on missing PNG/JPG files when prerendering** — Next.js will try to fetch the old paths from `utils/constants/index.ts` and `Home/index.tsx`. Static prerender may fail or warn.

This is the deliberate broken state: the images on disk are now `.webp` but the consuming code still references `.png` / `.jpg`. Task 2 fixes this.

If the build hard-fails (vs warning + producing output), that's also acceptable for the intermediate state — Task 2 will resolve it. Either way, do not try to fix consumers in this task.

- [ ] **Step 8: Commit**

```bash
git add public/images/ scripts/convert-images-to-webp.mjs package.json bun.lock
git commit -m "chore(perf): convert site images to WebP via sharp script"
```

> Notes:
> - `git add public/images/` stages every new `.webp` and the deletions of the originals.
> - The script (now deleted via `git rm`) is included in this commit so reviewers can see the conversion mechanism in one place; it appears as added-then-deleted in the same commit, which git handles cleanly.
> - `package.json` and `bun.lock` carry the transient `sharp` add+remove (net diff: zero new deps, but a metadata churn).

---

## Task 2: Update image paths in code

**Files:**
- Modify: `utils/constants/index.ts`
- Modify: `app/layout.tsx`
- Modify: `components/Home/index.tsx`

- [ ] **Step 1: Update `utils/constants/index.ts`**

Open the file. Two find-replace passes (do them carefully — many occurrences):

**Pass A — `.png` → `.webp`** in image path strings only (NOT in any comment text). Specifically:

In `skillCategories`, every entry's `src`:

```ts
{ src: "/images/skills/aws.png", ... }
```

becomes:

```ts
{ src: "/images/skills/aws.webp", ... }
```

Apply to all 19 skills (aws, aws-s3, docker, terraform, git, java, nodejs-express-js, nest-js, prisma, postgresql, mysql, redis, ts, react, next-js, tailwind-css, zustand, react-query, zod).

In `CertificatesData`, every entry's `src` and `metadata.image`:

```ts
src: "/images/certificates/DICT_Basic-Level-of-Cloud-Computing.png",
...
image: "/images/certificates/DICT_Basic-Level-of-Cloud-Computing.png", // Example image, replace with actual
```

becomes:

```ts
src: "/images/certificates/DICT_Basic-Level-of-Cloud-Computing.webp",
...
image: "/images/certificates/DICT_Basic-Level-of-Cloud-Computing.webp", // Example image, replace with actual
```

Apply to all certificate entries (8+ entries — make sure every `src` and every `metadata.image` updates).

In `ProjectsData`, every entry's `metadata.imageSrc`:

```ts
metadata: { imageSrc: "/images/projects/redbiomed-thumbnail.png", ... }
```

becomes:

```ts
metadata: { imageSrc: "/images/projects/redbiomed-thumbnail.webp", ... }
```

Apply to: Redbiomed, TOPCIT LCMS, E-CPLGT, Portfolio.

**Pass B — `.jpg` → `.webp`** for the two `.jpg` cert entries:

```ts
src: "/images/certificates/Direcho_Trabaho-Web-Development-With-React.jpg",
...
image: "/images/certificates/Direcho_Trabaho-Web-Development-With-React.jpg",
```

becomes `.webp`. Same for `Hicap_Tesda_NCIII_Java_Programming_page-0001.jpg` (both `src` and `metadata.image`).

- [ ] **Step 2: Update `components/Home/index.tsx`**

Open the file. Find:

```tsx
src="/images/profile.jpg"
```

Replace with:

```tsx
src="/images/profile.webp"
```

(There's a single `<Image>` component using this path; the surrounding `priority`, `loading`, `alt`, `width`, `height`, `sizes`, `className` props don't change.)

- [ ] **Step 3: Update `app/layout.tsx`**

Open the file. Locate the `metadata` object's `openGraph.images` array and `twitter.images` array.

In `openGraph.images`:

```ts
{
  url: "https://darenzhicap.netlify.app/images/site-thumbnail.png",
  width: 1200,
  height: 720,
  alt: "Hicap's Portfolio - Full Stack Developer Showcase",
  type: "image/png",
},
```

Becomes:

```ts
{
  url: "https://darenzhicap.netlify.app/images/site-thumbnail.webp",
  width: 1200,
  height: 720,
  alt: "Hicap's Portfolio - Full Stack Developer Showcase",
  type: "image/webp",
},
```

In `twitter.images`:

```ts
images: ["https://darenzhicap.netlify.app/images/site-thumbnail.png"],
```

Becomes:

```ts
images: ["https://darenzhicap.netlify.app/images/site-thumbnail.webp"],
```

No other metadata changes.

- [ ] **Step 4: Verify the build**

Run: `bun run build`
Expected: build completes cleanly. All static prerender routes succeed. No 404s on images.

If any image fails to resolve, the path didn't get fully updated — search for residual `.png` or `.jpg` in the consuming files and fix.

Run a sanity grep to confirm no stale PNG/JPG paths remain:

```
rg -n "\\.(png|jpg|jpeg)" components/ utils/ app/
```

Expected: matches only in `app/layout.tsx`'s `<link rel="icon">` / `<link rel="apple-touch-icon">` block (those legitimately point to `pwa-icons/*.png`).

- [ ] **Step 5: Smoke-test the dev server**

Run: `bun dev`. Open `http://localhost:3000`.
- `/` (Home): profile photo renders.
- `/projects`: featured Redbiomed image + 4 compact thumbnails render.
- `/skills-and-certificates`: all skill chips show their icons; cert thumbnails render in their landscape boxes.
- `/experiences`: page loads (no images on this route, but should not error).

Theme toggle works. 360px mobile renders correctly.

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add utils/constants/index.ts app/layout.tsx components/Home/index.tsx
git commit -m "chore(perf): update image paths to WebP in constants, Home, and OG metadata"
```

---

## Task 3: Skipped — folded into Task 2's verification.

The original plan had a separate verification task; in practice Task 2's Steps 4 + 5 cover it. We jump directly to Task 4 (P1: GSAP removal) next. This task number is intentionally skipped to keep the human-friendly numbering aligned with the spec's "P1, P2, M1, M2" framing — Task 2 is "all of P2", Task 4 is "P1", Tasks 5+6 are M1+M2.

---

## Task 4: Remove GSAP package + drop "GSAP" from Portfolio tags

**Files:**
- Modify: `package.json` (remove `gsap`)
- Modify: `bun.lock` (side effect)
- Modify: `utils/constants/index.ts` (Portfolio tags)

- [ ] **Step 1: Remove the `gsap` package**

Run: `bun remove gsap`
Expected: `gsap` removed from `package.json` `dependencies`. `bun.lock` updated. `node_modules/gsap` deleted.

- [ ] **Step 2: Drop `"GSAP"` from the Portfolio project's tags**

Open `utils/constants/index.ts`. Find the Portfolio entry in `ProjectsData`:

```ts
{
  title: "Portfolio",
  tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
  ...
}
```

Update the `tags` array to drop `"GSAP"`:

```ts
{
  title: "Portfolio",
  tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  ...
}
```

No other changes to the Portfolio entry.

- [ ] **Step 3: Verify no `gsap` references remain**

Run from repo root:

```
rg -n "gsap|GSAP" components/ app/ utils/
```

Expected: zero matches.

```
rg -n "gsap" package.json bun.lock
```

Expected: zero matches.

- [ ] **Step 4: Build clean**

Run: `bun run build`
Expected: build succeeds. The `/projects` route's compact row for Portfolio now shows three tags instead of four (no `GSAP` chip).

- [ ] **Step 5: Commit**

```bash
git add package.json bun.lock utils/constants/index.ts
git commit -m "chore(perf): remove gsap dependency and drop GSAP from Portfolio tags"
```

---

## Task 5: M1 — Headline underline reveal

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Locate the existing `.name-underline` rule**

Open `app/globals.css`. Find the rule (added by spec 2a, kept through spec 2c):

```css
  .name-underline {
    border-bottom: 2px solid var(--accent);
    padding-bottom: 0.1em;
  }
```

It sits inside `@layer components`, after `.text-eyebrow` and before `.text-heading-row`.

- [ ] **Step 2: Replace the rule with the animated version**

Replace the four-line `.name-underline { ... }` block with:

```css
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
```

Note that the element no longer has a `border-bottom`. The line is now drawn by the `::after` pseudo-element, animated from `scaleX(0)` to `scaleX(1)` over 600 ms with a 200 ms delay, with `forwards` fill mode so the final state sticks.

- [ ] **Step 3: Add the `@keyframes` rule outside `@layer components`**

`@keyframes` declarations cannot live inside `@layer` per CSS spec. Locate the closing `}` of `@layer components` in `app/globals.css`. Immediately after it, BEFORE the `:root[data-theme="light"]` `--grid-line` block, insert:

```css

@keyframes name-underline-draw {
  to {
    transform: scaleX(1);
  }
}
```

(The leading blank line preserves visual separation.)

- [ ] **Step 4: Verify the build**

Run: `bun run build`
Expected: build completes cleanly. No CSS warnings.

- [ ] **Step 5: Smoke-test in the dev server**

Run: `bun dev`. Open `http://localhost:3000` with DevTools open.

Hard-refresh (Ctrl+Shift+R / Cmd+Shift+R). Watch the headline:
- The text "Hello! My name is Darenz Jasper A. Hicap" appears with no underline.
- After ~200 ms, a thin accent-colored line begins drawing left-to-right under the name.
- After ~800 ms total (0.2 + 0.6), the line reaches full width and stays.

Open DevTools → Rendering panel → "Emulate CSS media feature prefers-reduced-motion" → set to "reduce". Hard-refresh again:
- The underline is fully drawn from the very first frame; no animation runs.

Toggle theme: line color updates (`var(--accent)` resolves to lavender in dark / slate in light).

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css
git commit -m "feat(motion): animate headline underline draw on mount with reduced-motion fallback"
```

---

## Task 6: M2 — Active timeline dot pulse (radiating ring)

**Files:**
- Modify: `app/globals.css` (add `.dot-pulse` rule + `@keyframes dot-pulse-ring`)
- Modify: `components/Experiences/components/timeline-entry.tsx` (apply class)

- [ ] **Step 1: Add the `.dot-pulse` rule inside `@layer components`**

Open `app/globals.css`. After the `.name-underline` rule (and its `prefers-reduced-motion` media query) and before `.text-heading-row`, insert:

```css

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
```

(The leading blank line preserves visual separation from `.name-underline`'s `prefers-reduced-motion` block.)

- [ ] **Step 2: Add the `@keyframes dot-pulse-ring` rule outside `@layer components`**

After the `@keyframes name-underline-draw { ... }` block (added in Task 5 Step 3), insert:

```css

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

- [ ] **Step 3: Update `timeline-entry.tsx` to apply `dot-pulse` on the active entry**

Open `components/Experiences/components/timeline-entry.tsx`. Find the existing `dotClass` derivation:

```tsx
  const dotClass = isActive ? "before:bg-accent" : "before:bg-border";
```

Replace it with:

```tsx
  const dotClasses = isActive
    ? "before:bg-accent dot-pulse"
    : "before:bg-border";
```

Then find the `<li>` element using `${dotClass}`:

```tsx
    <li
      ref={ref}
      className={`reveal relative ${dotClass} before:absolute before:-left-[33px] before:top-1 before:size-2.5 before:rounded-full ${className ?? ""}`}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
```

Update to `${dotClasses}`:

```tsx
    <li
      ref={ref}
      className={`reveal relative ${dotClasses} before:absolute before:-left-[33px] before:top-1 before:size-2.5 before:rounded-full ${className ?? ""}`}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
```

No other changes to the file. The renamed variable is the only edit beyond the conditional.

- [ ] **Step 4: Verify the build**

Run: `bun run build`
Expected: build completes cleanly. No TS errors.

- [ ] **Step 5: Smoke-test in the dev server**

Run: `bun dev`. Open `http://localhost:3000/experiences`.

Watch the topmost timeline entry (Junior Full Stack Developer at GP Synergia). The static accent dot is at the left edge. Around it, a faint ring should expand outward from the same starting size to about 2.6× the dot's radius, fading to transparent over 2 seconds, looping infinitely.

The four lower entries (past roles, with `before:bg-border` dots) should have NO ring — only the active dot has the pulse.

Hovering over the timeline area should not cause the ring to interfere (it has `pointer-events: none`).

Open DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion" → "reduce". The ring on the active dot should disappear (`display: none`); the static accent dot remains visible.

Toggle theme: ring color updates with the palette.

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css components/Experiences/components/timeline-entry.tsx
git commit -m "feat(motion): add radiating ring pulse on active timeline dot"
```

---

## Task 7: Final acceptance walk-through

**Files:** none (verification only).

- [ ] **Step 1: Build clean**

Run: `bun run build`
Expected: build completes with no warnings. All 8 routes prerender.

- [ ] **Step 2: Cross-page visual checklist**

Run: `bun dev`. Open `http://localhost:3000`.

Walk every page:

- `/` (Home):
  - Profile photo renders (loaded as `.webp`).
  - Headline underline draws on mount with the 200 ms delay, ends in palette accent color.
  - With `prefers-reduced-motion: reduce`, underline is fully drawn from frame 1.
- `/projects`:
  - Featured Redbiomed card image renders (loaded as `.webp`).
  - 4 compact rows render their thumbnails (loaded as `.webp`).
  - Portfolio compact row's tag list shows three tags (no `GSAP`).
- `/skills-and-certificates`:
  - All skill chip icons render across Frontend / Backend / Platform categories.
  - All certificate thumbnails render in their landscape thumbnails (loaded as `.webp`).
  - Click any cert thumbnail — the lightbox opens and the full-size image is also `.webp`.
- `/experiences`:
  - Topmost entry's accent dot has a visible expanding ring radiating outward, looping every 2 s.
  - Past entries (border-colored dots) have no ring.
  - Reveal-on-scroll still triggers correctly.

Theme toggle on every page works in both modes.

360px viewport: layout still renders correctly.

`prefers-reduced-motion: reduce` enabled in DevTools: every animation (headline underline, dot pulse, reveal-on-scroll) ends in its final/visible state without animation.

- [ ] **Step 3: Confirm performance gates**

Run from repo root:

```
rg -n "gsap|GSAP" components/ app/ utils/ package.json bun.lock
```

Expected: zero matches.

```
find public/images -name "*.png" -not -path "*/pwa-icons/*"
```

Expected: zero matches (only `pwa-icons/` should still contain PNG).

```
find public/images -name "*.jpg"
```

Expected: zero matches.

```
du -sh public/images/
```

Expected: ≤ ~3.5 MB total.

```
rg -n "\\.(png|jpg|jpeg)" components/ utils/ app/
```

Expected: matches only inside `app/layout.tsx` for `pwa-icons` paths.

- [ ] **Step 4: Confirm `sharp` and `gsap` are gone from `package.json`**

Run:

```
rg -n "sharp|gsap" package.json
```

Expected: zero matches.

Run:

```
rg -n "sharp" bun.lock
```

Expected: zero matches.

- [ ] **Step 5: Confirm script is gone**

Run: `ls scripts/ 2>&1`
Expected: directory empty or nonexistent. The `convert-images-to-webp.mjs` file does not exist.

- [ ] **Step 6: Final summary**

Run: `git log --oneline -10`
Expected: five implementation commits visible (Tasks 1, 2, 4, 5, 6 produce 5 commits — Task 3 is skipped, Task 7 is verification-only) plus the spec commit (`2dc4d9d`) above them.

The original 3-spec decomposition is complete:
- **Spec 1 (foundation):** ✓
- **Spec 2 (5 sub-specs):** ✓
- **Spec 3 (perf + motion):** ✓

---

## Self-review notes

- **Spec coverage:**
  - **P1 (GSAP removal + Portfolio tag drop)** → Task 4.
  - **P2 (image conversion + path updates)** → Tasks 1 + 2.
  - **M1 (headline underline reveal)** → Task 5.
  - **M2 (active timeline dot pulse)** → Task 6.
  - **Acceptance + cross-page smoke** → Task 7.
  - **`scripts/` cleanup + `sharp` transient remove** → Task 1 Steps 5–6.
- **Placeholder scan:** no "TBD"s, no "similar to above". Every code block contains the full code. Every command has its expected outcome.
- **Type consistency:**
  - `dotClass` → `dotClasses` rename in `timeline-entry.tsx` (Task 6) is the only API change in the JSX layer; the rest is data-path strings and CSS.
  - `name-underline-draw` keyframe (Task 5) is referenced only by `.name-underline::after`'s `animation` property in the same task.
  - `dot-pulse-ring` keyframe (Task 6) is referenced only by `.dot-pulse::after`'s `animation` property in the same task.
- **Task numbering:** Task 3 is intentionally skipped to keep the spec's "P1/P2/M1/M2" framing visible at the task-list level. Tasks 1–2 are P2; Task 4 is P1; Task 5 is M1; Task 6 is M2; Task 7 is verification.
- **Broken intermediate states:** Task 1 Step 7 produces a deliberate broken state (images on disk are `.webp`, code paths still reference `.png`/`.jpg`). Task 2 fixes it. The plan calls this out explicitly so reviewers don't think the build was forgotten.
- **Risk: `sharp` install on the user's platform.** `sharp` ships prebuilt binaries for major platforms; on Windows + Bun + `node:20+`, install should work without compilation. If `bun add -d sharp` fails on the user's machine, fallback options: install globally via `npm i -g sharp` and adapt the script's import, or use an external CLI tool (`cwebp`) — but that's a rabbit hole. The plan assumes the install works; if it doesn't, escalate before continuing.
