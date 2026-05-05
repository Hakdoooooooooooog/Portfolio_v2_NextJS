# Projects Redesign — Spec 2b (Layout & Composition, part 2 of 5)

**Date:** 2026-05-05
**Scope:** Second sub-spec of the layout & composition phase. Redesigns the Projects (`/projects`) section only. Other sections (Skills, Experiences) and shared chrome ship in their own specs (2c–2e).

## Context

The current Projects section (`components/Projects/index.tsx`) renders a vertical list of full-width "split" cards (text on left, screenshot on right when present), wrapped in a `<ProjectCard />` client component. Each card has off-palette grays/blues, a per-card "Show more / Show less" expand/collapse, blue tag pills, and an optional `<ImageModal />` lightbox. Six projects are listed today, including two that are the same product split across two repos (`TOPCIT LCMS` and `TOPCIT LCMS API`). Three projects have screenshots; three are API/source-only.

Foundation (spec 1) supplies the design tokens, type scale, and spacing rhythm. Home redesign (spec 2a) established the section pattern: eyebrow numbering (`01 / About`), Fraunces section title, palette-tinted offset frame behind imagery, mono `·`-separated tag rows. This spec extends those conventions to the Projects page.

## Goals

- Replace the symmetric list of split cards with an asymmetric "case study" composition: one **featured project** (Redbiomed) with a hero treatment, plus **compact rows** for the rest.
- Treat with-image and without-image projects symmetrically without faking the missing screenshot — image-less projects show a palette-tinted **index square** (e.g. `04 / API`) in the thumbnail slot.
- Move all visual choices onto foundation tokens and the type scale; eliminate every off-palette utility and off-rhythm spacing in `components/Projects/**`.
- Drop GSAP, drop client-side state for description show-more, drop the image modal.
- Merge `TOPCIT LCMS` + `TOPCIT LCMS API` into a single project entry that points to both repositories.
- Echo Home's offset grid-square photo frame, scaled up to a 16:9 image frame on the featured card — visual continuity across sections.

## Non-goals

- No changes to other section components (`Home`, `Skills-certificates`, `Experiences`), Navbar, Footer, Button, Switch, Modal, Separator, or any subcomponents outside `components/Projects/**`.
- No changes to `components/modal-image.tsx`. It's still consumed by `Skills-certificates/components/certificates.tsx`; spec 2c decides its fate.
- No animation work. Foundation hooks (the `name-underline` reveal) are spec 3 territory.
- No new design tokens, no new type-scale slots, no new dependencies.
- No carousel, lightbox, filtering, search, or sort UX. Six projects, static order.
- No richer project metadata model (no per-project highlight tags, no "case study" detail pages).

## Page structure

```
<section class="container-page">

  <p class="text-eyebrow text-muted">02 / Projects</p>

  <h2 class="text-display-lg text-foreground mt-4">Selected work</h2>

  <div class="border-t border-border mt-8" aria-hidden></div>

  <FeaturedProjectCard ... class="mt-8" />

  <div class="mt-16">
    <p class="text-eyebrow text-muted">More work</p>

    <ul class="mt-8">
      <CompactProjectRow ... />  (5 rows total — wait, 4 after TOPCIT merge)
    </ul>
  </div>

</section>
```

**Vertical rhythm:** eyebrow → `mt-4` → page heading → `mt-8` → separator → `mt-8` → featured card → `mt-16` (block step) → "More work" eyebrow → `mt-8` → compact row list → rows separated internally by `border-b border-border py-4` (last row drops the border via `last:border-b-0`).

**Featured selection** is data-driven: `TProjectData` gains an optional `featured?: boolean`. The first project flagged `featured: true` is rendered in the hero slot; if no project has the flag, the first item in `ProjectsData` becomes the featured card by fallback. We set `featured: true` on Redbiomed.

## Featured card

`components/Projects/components/featured-project-card.tsx`. Server component.

### Composition

```jsx
<article>
  {/* Image frame — same offset-grid-square trick as Home, scaled to 16:9 */}
  <div className="relative aspect-[16/9] w-full">
    <div
      aria-hidden
      className="absolute inset-0 translate-x-2 translate-y-2 border border-border rounded-xl"
    />
    <Image
      src={imageSrc}
      alt={imageAlt}
      fill
      sizes="(max-width: 768px) 100vw, 1024px"
      className="relative rounded-xl object-cover shadow-sm dark:shadow-none"
    />
  </div>

  <h3 className="text-heading text-foreground mt-8">{title}</h3>

  {/* Tags row — same convention as Home stack row */}
  <p className="text-small font-mono text-muted mt-2 flex flex-wrap gap-x-2 gap-y-1">
    {tags.map((tag, i) => (
      <span key={tag}>
        {tag}
        {i < tags.length - 1 ? (
          <span className="ml-2 text-muted/60" aria-hidden>·</span>
        ) : null}
      </span>
    ))}
  </p>

  <p className="text-body text-muted mt-4">{description}</p>

  {/* CTAs — pill buttons */}
  <div className="flex flex-wrap gap-2 mt-8">
    {liveUrl ? (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:bg-accent/90"
      >
        <span>Visit live</span>
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </a>
    ) : null}
    {sourceUrl ? (
      <a
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-border text-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:border-accent hover:text-accent"
      >
        <span>{sourceLabel}</span>
        <span aria-hidden>↗</span>
      </a>
    ) : null}
    {serverSourceUrl ? (
      <a
        href={serverSourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-border text-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:border-accent hover:text-accent"
      >
        <span>View API source</span>
        <span aria-hidden>↗</span>
      </a>
    ) : null}
  </div>
</article>
```

### CTA labelling rules

- Primary `Visit live →` — solid `bg-accent`, only when `liveUrl` is present. Arrow nudges right on `group-hover`.
- Secondary `View source ↗` — outline. The label adapts:
  - If only `sourceUrl` (no `serverSourceUrl`): `View source ↗`.
  - If both `sourceUrl` and `serverSourceUrl`: `View web source ↗` and `View API source ↗` (two outline buttons in the row).
  - If only `serverSourceUrl` (rare, server-only project flagged as featured): `View source ↗`.
- Redbiomed has only `liveUrl` (proprietary; no public repo) — only the primary button renders. No fake disabled "View source" placeholder.

### Props shape

```ts
type FeaturedProjectCardProps = {
  title: string;
  tags: readonly string[];
  description: string;
  imageSrc: string;
  imageAlt: string;
  liveUrl?: string;
  sourceUrl?: string;
  serverSourceUrl?: string;
};
```

The section file (`Projects/index.tsx`) maps `TProjectData` → these props. If a project flagged `featured: true` lacks `imageSrc`, it falls back to the next available featured candidate; if none, the first project in the list is used and a console warning fires in dev (foundation has no logger; a one-line `if (process.env.NODE_ENV !== "production") console.warn(...)` is acceptable for this development-time check).

## Compact row

`components/Projects/components/compact-project-row.tsx`. Server component.

### Composition

```jsx
<article className="flex gap-4 py-4 border-b border-border last:border-b-0">
  {/* Thumbnail — 96px square */}
  <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden border border-border">
    {imageSrc ? (
      <Image
        src={imageSrc}
        alt={imageAlt ?? ""}
        fill
        sizes="96px"
        className="object-cover"
      />
    ) : (
      <div className="grid place-items-center size-full bg-surface text-surface-foreground">
        <div className="text-center">
          <p className="text-eyebrow">{paddedIndex}</p>
          <p className="text-small font-mono mt-1">{kind}</p>
        </div>
      </div>
    )}
  </div>

  {/* Content */}
  <div className="flex-1 min-w-0">
    <h3 className="text-heading-row text-foreground">{title}</h3>

    <p className="text-small font-mono text-muted mt-2 truncate">
      {visibleTags.join(" · ")}{overflowSuffix}
    </p>

    <p className="text-small text-muted mt-2 line-clamp-1">{description}</p>

    <p className="text-small font-mono text-muted mt-4 flex flex-wrap gap-x-4 gap-y-1">
      {liveUrl ? (
        <a href={liveUrl} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent">
          Visit live <span aria-hidden>↗</span>
        </a>
      ) : null}
      {sourceUrl ? (
        <a href={sourceUrl} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent">
          {sourceLabel} <span aria-hidden>↗</span>
        </a>
      ) : null}
      {serverSourceUrl ? (
        <a href={serverSourceUrl} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent">
          View API source <span aria-hidden>↗</span>
        </a>
      ) : null}
    </p>
  </div>
</article>
```

### Index square (when `imageSrc` is missing)

The index square renders inside the same 96×96 container the screenshot would occupy. It shows two text lines:

- Top line: 2-digit row index in `text-eyebrow` (e.g., `04`). The index is the project's 1-based position in the *compact list* (the featured card is excluded from this numbering).
- Bottom line: `kind` in `text-small font-mono`. Derived deterministically:
  - `kind = "API"` if every screenshot-less project's tags contain `"API"` → otherwise `"WEB"`. Concretely: `tags.includes("API") ? "API" : "WEB"`.

For the current data (post-TOPCIT merge), only `Event Management System API` has no screenshot, and its tags include `"API"`, so it shows `04 / API`. If a future image-less project doesn't tag `"API"`, it shows `NN / WEB` — that's the heuristic. Not perfect; explicit `kind` per-project can be added later if it becomes a problem.

### Tag truncation

Compact rows show at most **4 tags** plus a `+N` overflow suffix. Implementation:

```ts
const MAX_VISIBLE_TAGS = 4;
const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
const overflow = tags.length - visibleTags.length;
const overflowSuffix = overflow > 0 ? ` · +${overflow}` : "";
```

The 4-tag cap keeps the tag row from wrapping on a 96px-thumbnail-plus-content layout at typical desktop widths.

### CTA labelling rules (compact)

Same logic as featured card, but rendered as mono text-link arrows (`↗`) instead of buttons. All arrow-out (`↗`) — no `→` because every link is outbound.

### Props shape

```ts
type CompactProjectRowProps = {
  index: number;             // 1-based position in the COMPACT list (featured excluded)
  title: string;
  tags: readonly string[];
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  liveUrl?: string;
  sourceUrl?: string;
  serverSourceUrl?: string;
};
```

## Data and type changes

### `utils/types.ts`

Add to the `TProjectData.metadata` shape:

```ts
metadata?: {
  imageSrc?: string;
  imageAlt?: string;
  demoLink?: string;
  serverLink?: string;       // NEW — second source repo (e.g., separate API repo)
};
```

Add to `TProjectData` itself:

```ts
featured?: boolean;          // NEW — first true entry becomes the hero card
```

### `utils/constants/index.ts`

1. **Mark Redbiomed as featured** and add its image:

```ts
{
  title: "Redbiomed",
  featured: true,
  tags: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "AWS", "Terraform", "Docker"],
  description: /* unchanged */,
  metadata: {
    imageSrc: "/images/projects/redbiomed-thumbnail.png",
    imageAlt: "RED BioMed — Manufacturer & Institutional Partnerships landing page",
    demoLink: "https://redbiomed.com",
  },
},
```

2. **Merge TOPCIT LCMS + TOPCIT LCMS API**:

```ts
{
  title: "TOPCIT LCMS",
  tags: [
    "React", "TypeScript", "Tailwind CSS", "Material UI", "Zustand", "Zod",
    "Node.js", "Express", "PostgreSQL", "Prisma", "Amazon S3",
  ],
  description:
    "A comprehensive web-based Learning Content Management System for IT students at Cavite State University, with a Node.js + Express + Prisma API backed by PostgreSQL and Amazon S3. The frontend uses Zustand for state and Zod for type-safe form validation; the backend uses Zod for request validation and Prisma for typed DB access.",
  link: "https://github.com/Hakdoooooooooooog/lcms-topcit-app",
  metadata: {
    imageSrc: "/images/projects/topcit-thumbnail.png",
    imageAlt: "TOPCIT Learners Content Management System",
    serverLink: "https://github.com/Hakdoooooooooooog/topcit-lcms-app-server",
  },
},
```

3. **Final ordered project list** (5 entries):

   1. Redbiomed (featured)
   2. TOPCIT LCMS (frontend + API merged)
   3. E-CPLGT
   4. Event Management System API
   5. Portfolio

## File-level changes

| File | Change |
|---|---|
| `components/Projects/index.tsx` | Rewrite. Server component renders eyebrow + heading + separator + featured card + "More work" + compact rows. Maps `ProjectsData` to props for the two new card components. |
| `components/Projects/components/featured-project-card.tsx` | New. ~80 lines. |
| `components/Projects/components/compact-project-row.tsx` | New. ~90 lines. |
| `components/Projects/components/project-card.tsx` | **Delete.** |
| `components/Projects/components/project-cta.tsx` | **Delete.** |
| `utils/types.ts` | Modify. Add `featured?: boolean` to `TProjectData`; add `serverLink?: string` to its `metadata` field. |
| `utils/constants/index.ts` | Modify. Mark Redbiomed `featured: true` + add its image metadata; merge TOPCIT entries; renumber. |
| `app/globals.css` | Modify. Append `.text-heading-row` rule inside the existing `@layer components` block, after `.name-underline`. |
| `public/images/projects/redbiomed-thumbnail.png` | New asset. (Already saved during brainstorming as a 1440×900 PNG screenshot of `https://redbiomed.com`.) |
| `docs/superpowers/notes/spec-2-input.md` | Modify. Strike all `components/Projects/**` entries; add Projects to the "Migrated" subsection. |

No other files modified. `components/modal-image.tsx` and `components/Projects/components/project-cta.tsx`'s deletion does not require touching `Skills-certificates`.

## Design system contract

Every visual decision resolves to one of these. No exceptions.

### Color tokens (semantic only)

| Use | Class |
|---|---|
| Page background | inherits `bg-background` from `<main>` |
| Default text | `text-foreground` |
| Secondary text (tags, descriptions, CTAs at rest) | `text-muted` |
| Primary CTA fill | `bg-accent` + `text-accent-foreground` |
| Index square (image-less thumbnails) | `bg-surface` + `text-surface-foreground` |
| Borders (frames, row separators, outline buttons) | `border-border` |
| Hover accents | `border-accent`, `decoration-accent`, `text-accent` |

### Typography (foundation classes only)

| Element | Class |
|---|---|
| `02 / Projects` eyebrow, `More work` label, index-square top line | `text-eyebrow text-muted` |
| `Selected work` page heading | `text-display-lg text-foreground` |
| Featured card title | `text-heading text-foreground` |
| Compact row title | `text-heading-row text-foreground` *(one new component class — see below)* |
| Tag rows, mono CTA links, index-square bottom line | `text-small font-mono text-muted` |
| Featured card description | `text-body text-muted` |
| Compact row description | `text-small text-muted line-clamp-1` |
| Button labels | `text-small font-medium` |

### Spacing rhythm (foundation 4-stop: 2 / 4 / 8 / 16)

| Step | Use |
|---|---|
| `gap-2`, `mt-2` | Tag separator gap, eyebrow → tags-row, `↗` glyph gap inside CTA |
| `gap-4`, `mt-4`, `py-4` | Description spacing, compact-row internal padding, between compact rows, CTA row gap |
| `gap-8`, `mt-8` | Eyebrow → page heading, separator → featured card, image → title, page heading → separator |
| `mt-16` | Featured card → "More work" section |

### Border radius (foundation 3-stop)

- `rounded-md` — buttons, thumbnails, index squares.
- `rounded-xl` — featured card image frame.
- `rounded-full` — not used.

### Allowed deviations (declared)

- One new CSS class `.text-heading-row` in `globals.css`. Not a new type-scale slot — a one-off component class for compact-row titles, mirroring spec 2a's `.name-underline`. Spec:

  ```css
  .text-heading-row {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.3;
    letter-spacing: -0.005em;
  }
  ```

- Zero arbitrary values. Thumbnail uses `w-24 h-24` (Tailwind defaults). Image frame uses `aspect-[16/9]` (Tailwind built-in via `aspect-ratio`).
- `gap-y-1` (4px wrap gap) is allowed inside inline-wrapping tag rows. Precedent from spec 2a's Home stack row; `gap-y-2` reads too airy for wrapped mono-text. Layout-level spacing still uses the 4-stop rhythm.
- `+N` overflow suffix is plain text content, not a class.
- Arrow glyphs are plain Unicode (`→`, `↗`). No new icon library.

### Forbidden (caught by the same grep gates from spec 2a)

- `bg-gray-*`, `text-gray-*`, `border-gray-*`, `bg-white`, `bg-black`, `bg-blue-*`, `text-blue-*`, including `dark:` and `light:` variants.
- Off-rhythm gaps: `gap-3`, `gap-5`, `gap-6`, `gap-7`, `gap-9`–`-14`. Same for `p-`, `m-`, `pt-`, etc.
- Raw hex literals or `bg-[#...]` arbitrary colors.
- `font:` shorthand with `var()` — silently fails per the spec 2a hero post-mortem.
- Tailwind default font-size utilities (`text-xs`, `text-xl`, `text-base`) — those are not foundation classes. Use `text-small`, `text-body`, etc.
- `useState`, `useEffect`, `"use client"` in any new file. The redesign is purely server-rendered.

## Acceptance criteria

1. `bun run build` and `bun dev` complete with no new warnings.
2. `/projects` renders:
   - `02 / Projects` eyebrow + `Selected work` Fraunces heading at top.
   - Hairline separator below the heading.
   - Redbiomed featured card: 16:9 screenshot in palette-tinted offset frame, title, mono tags row, full description, primary `Visit live →` button (no source button).
   - `More work` mono eyebrow below the featured card.
   - 4 compact rows: TOPCIT LCMS (image + 3 CTAs: Visit live, View web source, View API source), E-CPLGT (image + 2 CTAs), Event Management System API (`04 / API` index square + 1 CTA: View source), Portfolio (image + 1 CTA: View source).
   - Hairline `border-b border-border` between rows; last row has no bottom border.
3. On a 360px-wide viewport, every compact row remains legible. The 96×96 thumbnail does not collapse the content column to unreadable width. (If it does, the implementation may add `flex-col sm:flex-row` to compact rows — but the default flex-row behavior is the target.)
4. No `"use client"` in `components/Projects/index.tsx`, `featured-project-card.tsx`, or `compact-project-row.tsx`.
5. No `gsap` import in any of the new files.
6. No `<ImageModal />` import in any file under `components/Projects/**`.
7. Theme toggle works; both modes render Projects cleanly.
8. Grep `components/Projects/**` for off-palette utilities: `rg -n "(^|\s|:)(bg|text|border)-(white|black|gray-\d+|blue-\d+)" components/Projects/` → zero matches.
9. Grep `components/Projects/**` for off-rhythm spacing: `rg -n "\b(gap|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(3|5|6|7|9|10|11|12|14)\b" components/Projects/` → zero matches.
10. Grep `components/Projects/**` for hex literals or arbitrary color values: zero matches.
11. Zero arbitrary classes (`[NNNpx]`, `[NNNrem]`) in `components/Projects/**`.
12. `docs/superpowers/notes/spec-2-input.md` no longer lists any `components/Projects/**` entries; both new component files are listed in the "Migrated" subsection.

## Lean guardrails

- Three component files in `components/Projects/components/` (down from two; net result: two new + delete two = same count, plus a section file rewrite).
- One new CSS class.
- Two type changes.
- No new dependencies.
- No new arbitrary values.
- No new icon library — arrow glyphs are plain Unicode.
- Description max-shown length on compact rows is enforced by `line-clamp-1`, not custom truncation logic.
- Tag overflow suffix uses simple `slice` + `length` math, no library.

## Open questions

None at this stage. Implementation plan will be produced by the writing-plans skill in the next step.
