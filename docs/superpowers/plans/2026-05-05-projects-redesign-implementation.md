# Projects Redesign Implementation Plan (Spec 2b)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Projects page (vertical list of split-layout cards with a client-side show-more, blue tag pills, and image modal) with an asymmetric "case study" composition — one featured card (Redbiomed) + four compact rows — built entirely on foundation tokens, with no client-side state, no GSAP, no image modal.

**Architecture:** Six sequential changes. (1) Extend `TProjectData` with `featured` and `metadata.serverLink`. (2) Update the project data: merge TOPCIT entries, mark Redbiomed featured, link the new screenshot. (3) Append `.text-heading-row` to globals.css. (4) Create `<FeaturedProjectCard />`. (5) Create `<CompactProjectRow />`. (6) Rewrite `Projects/index.tsx` as a server component that maps the data over the two card variants, then delete the old `project-card.tsx` and `project-cta.tsx`. Then update the audit doc and verify acceptance.

**Tech Stack:** Next.js 16 (App Router, server components by default), React 19, Tailwind CSS v4, `next/font/google`, Bun. No new dependencies.

**Testing reality:** No test runner configured. Verification per task is `bun run build`, manual browser checks (light + dark, desktop + 360px mobile), and grep gates against the foundation's audit categories. Each task has explicit check commands.

**Reference spec:** `docs/superpowers/specs/2026-05-05-projects-redesign-design.md`.

---

## File map

| File | Disposition |
|---|---|
| `utils/types.ts` | Modify — add `featured?: boolean` to `TProjectData`; add `serverLink?: string` to `metadata` (Task 1) |
| `utils/constants/index.ts` | Modify — mark Redbiomed featured + add image; merge TOPCIT entries (Task 2) |
| `app/globals.css` | Modify — append `.text-heading-row` rule inside `@layer components` (Task 3) |
| `components/Projects/components/featured-project-card.tsx` | Create — new server component (Task 4) |
| `components/Projects/components/compact-project-row.tsx` | Create — new server component (Task 5) |
| `components/Projects/index.tsx` | Rewrite — server component, maps data over both card variants (Task 6) |
| `components/Projects/components/project-card.tsx` | Delete (Task 6) |
| `components/Projects/components/project-cta.tsx` | Delete (Task 6) |
| `docs/superpowers/notes/spec-2-input.md` | Modify — strike Projects entries, add to "Migrated" subsection (Task 7) |

The Redbiomed thumbnail (`public/images/projects/redbiomed-thumbnail.png`) was added during the spec brainstorm and committed alongside the spec doc. It already exists in the working tree.

---

## Task 1: Extend `TProjectData` type

**Files:**
- Modify: `utils/types.ts`

- [ ] **Step 1: Open `utils/types.ts` and locate `TProjectData` (around lines 38–48)**

It currently looks like:

```ts
export type TProjectData = {
  title: string;
  tags?: string[];
  description: string;
  link?: string;
  metadata?: Partial<{
    imageSrc: string;
    imageAlt: string;
    demoLink: string;
  }>;
};
```

- [ ] **Step 2: Add `featured` and `metadata.serverLink` fields**

Replace the entire `TProjectData` block with:

```ts
export type TProjectData = {
  title: string;
  tags?: string[];
  description: string;
  link?: string;
  featured?: boolean;
  metadata?: Partial<{
    imageSrc: string;
    imageAlt: string;
    demoLink: string;
    serverLink: string;
  }>;
};
```

Both new fields are optional. No other type in this file changes.

- [ ] **Step 3: Verify the build succeeds**

Run: `bun run build`
Expected: build completes; no TS errors. Existing data still satisfies the type (the new fields are optional).

- [ ] **Step 4: Commit**

```bash
git add utils/types.ts
git commit -m "feat(projects): extend TProjectData with featured flag and serverLink"
```

---

## Task 2: Update Projects data — merge TOPCIT, feature Redbiomed

**Files:**
- Modify: `utils/constants/index.ts`

- [ ] **Step 1: Open `utils/constants/index.ts` and locate the `ProjectsData` array**

It currently has 6 entries in this order: Redbiomed, TOPCIT LCMS, TOPCIT LCMS API, E-CPLGT, Event Management System API, Portfolio.

- [ ] **Step 2: Replace the Redbiomed entry**

Find the Redbiomed entry (the first project in the array) and replace it with this exact block:

```ts
  {
    title: "Redbiomed",
    featured: true,
    tags: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "AWS",
      "Terraform",
      "Docker",
    ],
    description:
      "A B2B e-commerce management system for the Southeast Asian peptide industry. Built core platform features across the frontend (Next.js) and backend (NestJS + Prisma + PostgreSQL) with a focus on scalable architecture, AWS infrastructure provisioned via Terraform, and containerized deployments.",
    metadata: {
      imageSrc: "/images/projects/redbiomed-thumbnail.png",
      imageAlt:
        "RED BioMed — Manufacturer & Institutional Partnerships landing page",
      demoLink: "https://redbiomed.com",
    },
  },
```

Two changes from the previous version: `featured: true` is added, and `metadata` gains `imageSrc` + `imageAlt` (the Redbiomed thumbnail is already in the repo at `public/images/projects/redbiomed-thumbnail.png`).

- [ ] **Step 3: Replace the two TOPCIT entries with one merged entry**

Find the `TOPCIT LCMS` entry and the `TOPCIT LCMS API` entry (consecutive in the array) and replace **both** with this single merged entry:

```ts
  {
    title: "TOPCIT LCMS",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Material UI",
      "Zustand",
      "Zod",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Amazon S3",
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

- [ ] **Step 4: Verify the final ordered list has 5 entries**

Open the file and confirm the project array now contains, in this order:
1. Redbiomed (with `featured: true` + image metadata)
2. TOPCIT LCMS (merged frontend + API)
3. E-CPLGT (unchanged)
4. Event Management System API (unchanged)
5. Portfolio (unchanged)

The E-CPLGT, Event Management System API, and Portfolio entries are not modified.

- [ ] **Step 5: Verify the build succeeds**

Run: `bun run build`
Expected: build completes; no TS errors. The data conforms to the extended `TProjectData` type.

- [ ] **Step 6: Commit**

```bash
git add utils/constants/index.ts
git commit -m "feat(projects): merge TOPCIT entries, mark Redbiomed featured"
```

---

## Task 3: Append `.text-heading-row` to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Locate the existing `.name-underline` rule inside `@layer components`**

After spec 2a, `@layer components` contains: typography classes (`.text-display-xl`…`.text-eyebrow`), `.name-underline`, `.container-page`, `.bg-grid-pattern`. The new rule goes immediately after `.name-underline` and before `.container-page`.

- [ ] **Step 2: Insert the `.text-heading-row` rule after `.name-underline`**

Immediately after the `.name-underline { ... }` declaration (which ends with `padding-bottom: 0.1em; }`) and before the `/* Single canonical content container. */` comment, insert:

```css

  .text-heading-row {
    font-family: var(--font-display);
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 1.3;
    letter-spacing: -0.005em;
  }
```

(Leading blank line preserves visual separation from the surrounding declarations.)

- [ ] **Step 3: Verify the build succeeds**

Run: `bun run build`
Expected: build completes. No CSS warnings.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat(projects): add .text-heading-row component class"
```

---

## Task 4: Create `<FeaturedProjectCard />`

**Files:**
- Create: `components/Projects/components/featured-project-card.tsx`

- [ ] **Step 1: Confirm the directory `components/Projects/components/` exists**

Run: `ls components/Projects/components/`
Expected: shows `project-card.tsx` and `project-cta.tsx` (both will be deleted in Task 6). The new file lands in the same directory.

- [ ] **Step 2: Create the new file with this exact content**

Create `components/Projects/components/featured-project-card.tsx`:

```tsx
import Image from "next/image";

export type FeaturedProjectCardProps = {
  title: string;
  tags: readonly string[];
  description: string;
  imageSrc: string;
  imageAlt: string;
  liveUrl?: string;
  sourceUrl?: string;
  serverSourceUrl?: string;
};

export default function FeaturedProjectCard({
  title,
  tags,
  description,
  imageSrc,
  imageAlt,
  liveUrl,
  sourceUrl,
  serverSourceUrl,
}: FeaturedProjectCardProps) {
  const hasBothSources = Boolean(sourceUrl && serverSourceUrl);
  const sourceLabel = hasBothSources ? "View web source" : "View source";

  return (
    <article>
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

      <p className="text-small font-mono text-muted mt-2 flex flex-wrap gap-x-2 gap-y-1">
        {tags.map((tag, i) => (
          <span key={tag}>
            {tag}
            {i < tags.length - 1 ? (
              <span className="ml-2 text-muted/60" aria-hidden>
                ·
              </span>
            ) : null}
          </span>
        ))}
      </p>

      <p className="text-body text-muted mt-4">{description}</p>

      <div className="flex flex-wrap gap-2 mt-8">
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:bg-accent/90"
          >
            <span>Visit live</span>
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
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
  );
}
```

> Notes:
> - Server component. No `"use client"`. No hooks.
> - The image uses `fill` + `sizes` so it scales with the parent aspect-ratio container.
> - The CTA-row label logic mirrors the spec: when both `sourceUrl` and `serverSourceUrl` are present, the first becomes "View web source" and the second is "View API source"; otherwise the first stays "View source".

- [ ] **Step 3: Verify the build succeeds**

Run: `bun run build`
Expected: build completes; no TS errors. The component is unused at this point — TypeScript checks it in isolation.

- [ ] **Step 4: Commit**

```bash
git add components/Projects/components/featured-project-card.tsx
git commit -m "feat(projects): add FeaturedProjectCard component"
```

---

## Task 5: Create `<CompactProjectRow />`

**Files:**
- Create: `components/Projects/components/compact-project-row.tsx`

- [ ] **Step 1: Create the new file with this exact content**

Create `components/Projects/components/compact-project-row.tsx`:

```tsx
import Image from "next/image";

const MAX_VISIBLE_TAGS = 4;

export type CompactProjectRowProps = {
  index: number;
  title: string;
  tags: readonly string[];
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  liveUrl?: string;
  sourceUrl?: string;
  serverSourceUrl?: string;
};

export default function CompactProjectRow({
  index,
  title,
  tags,
  description,
  imageSrc,
  imageAlt,
  liveUrl,
  sourceUrl,
  serverSourceUrl,
}: CompactProjectRowProps) {
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const overflow = tags.length - visibleTags.length;
  const tagText =
    overflow > 0
      ? `${visibleTags.join(" · ")} · +${overflow}`
      : visibleTags.join(" · ");

  const paddedIndex = String(index).padStart(2, "0");
  const kind = tags.includes("API") ? "API" : "WEB";
  const hasBothSources = Boolean(sourceUrl && serverSourceUrl);
  const sourceLabel = hasBothSources ? "View web source" : "View source";

  return (
    <article className="flex gap-4 py-4 border-b border-border last:border-b-0">
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

      <div className="flex-1 min-w-0">
        <h3 className="text-heading-row text-foreground">{title}</h3>

        <p className="text-small font-mono text-muted mt-2 truncate">
          {tagText}
        </p>

        <p className="text-small text-muted mt-2 line-clamp-1">{description}</p>

        <p className="text-small font-mono text-muted mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent"
            >
              Visit live <span aria-hidden>↗</span>
            </a>
          ) : null}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent"
            >
              {sourceLabel} <span aria-hidden>↗</span>
            </a>
          ) : null}
          {serverSourceUrl ? (
            <a
              href={serverSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent"
            >
              View API source <span aria-hidden>↗</span>
            </a>
          ) : null}
        </p>
      </div>
    </article>
  );
}
```

> Notes:
> - Server component. No `"use client"`.
> - `index` is the 1-based position of the row inside the COMPACT list (the featured card is excluded). The orchestrator (Task 6) computes this.
> - `kind` defaults to `"API"` when the project's tags contain `"API"`, else `"WEB"`. Only used for the index square — when `imageSrc` is present, neither value is rendered.
> - `last:border-b-0` removes the bottom border on the final row so it doesn't sit awkwardly above the footer.

- [ ] **Step 2: Verify the build succeeds**

Run: `bun run build`
Expected: build completes; no TS errors.

- [ ] **Step 3: Commit**

```bash
git add components/Projects/components/compact-project-row.tsx
git commit -m "feat(projects): add CompactProjectRow component"
```

---

## Task 6: Rewrite `Projects/index.tsx` and delete obsolete files

**Files:**
- Rewrite: `components/Projects/index.tsx`
- Delete: `components/Projects/components/project-card.tsx`
- Delete: `components/Projects/components/project-cta.tsx`

- [ ] **Step 1: Read `components/Projects/index.tsx`**

Confirm it's the current version that imports `ProjectsData` and renders `<ProjectCard />` per project.

- [ ] **Step 2: Overwrite `components/Projects/index.tsx`**

Replace the entire file with this exact content:

```tsx
import {
  ProjectsData,
  sectionNumbers,
} from "@/portfolio/utils/constants";
import type { TProjectData } from "@/portfolio/utils/types";
import FeaturedProjectCard from "./components/featured-project-card";
import CompactProjectRow from "./components/compact-project-row";

function pickFeatured(
  projects: readonly TProjectData[]
): { featured: TProjectData; rest: readonly TProjectData[] } {
  const flagged = projects.find(
    (p) => p.featured === true && p.metadata?.imageSrc
  );
  if (flagged) {
    return { featured: flagged, rest: projects.filter((p) => p !== flagged) };
  }
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[Projects] no project has `featured: true` with an imageSrc; falling back to the first entry."
    );
  }
  const [first, ...rest] = projects;
  return { featured: first, rest };
}

export default function Projects() {
  const { featured, rest } = pickFeatured(ProjectsData);

  return (
    <section className="container-page">
      <p className="text-eyebrow text-muted">
        {sectionNumbers.projects} / Projects
      </p>

      <h2 className="text-display-lg text-foreground mt-4">Selected work</h2>

      <div className="border-t border-border mt-8" aria-hidden />

      <div className="mt-8">
        <FeaturedProjectCard
          title={featured.title}
          tags={featured.tags ?? []}
          description={featured.description}
          imageSrc={featured.metadata?.imageSrc ?? ""}
          imageAlt={featured.metadata?.imageAlt ?? featured.title}
          liveUrl={featured.metadata?.demoLink}
          sourceUrl={featured.link}
          serverSourceUrl={featured.metadata?.serverLink}
        />
      </div>

      <div className="mt-16">
        <p className="text-eyebrow text-muted">More work</p>

        <ul className="mt-8 list-none p-0">
          {rest.map((project, i) => (
            <li key={project.title}>
              <CompactProjectRow
                index={i + 1}
                title={project.title}
                tags={project.tags ?? []}
                description={project.description}
                imageSrc={project.metadata?.imageSrc}
                imageAlt={project.metadata?.imageAlt}
                liveUrl={project.metadata?.demoLink}
                sourceUrl={project.link}
                serverSourceUrl={project.metadata?.serverLink}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

> Notes:
> - Server component (no `"use client"`).
> - `pickFeatured` keeps the orchestration logic local and pure.
> - `index` is 1-based across the COMPACT list — `i + 1` because the featured card is removed before iteration.

- [ ] **Step 3: Delete the obsolete card and CTA files**

Run:

```bash
git rm components/Projects/components/project-card.tsx
git rm components/Projects/components/project-cta.tsx
```

Both files are removed from disk and staged for the commit.

- [ ] **Step 4: Verify the build succeeds**

Run: `bun run build`
Expected: build completes; no TS errors. The build output for `/projects` should be smaller — no more client component, no GSAP chunk, no `useState`.

- [ ] **Step 5: Smoke-test the dev server**

Run: `bun dev`. Open `http://localhost:3000/projects` with DevTools open.

Expected (dark mode):
- `02 / Projects` eyebrow at top, mono small caps.
- `Selected work` Fraunces heading below.
- Hairline `border-border` separator.
- Redbiomed featured card: 16:9 screenshot in palette-tinted offset frame, title "Redbiomed" in Fraunces, mono tags row, full description, single accent `Visit live →` button.
- `More work` mono eyebrow below the featured card.
- 4 compact rows, in this order:
  1. TOPCIT LCMS — image thumbnail, title, mono tag row truncated to "React · TypeScript · Tailwind CSS · Material UI · +7" (or similar), 1-line description clamp, three CTAs: `Visit live ↗` (no — TOPCIT has no demoLink, so just two: `View web source ↗` · `View API source ↗`).
  2. E-CPLGT — image thumbnail, two CTAs: `Visit live ↗ · View source ↗`.
  3. Event Management System API — `01 / API` index square (since it's index 3 in compact list — wait, that's `03`), one CTA: `View source ↗`.
  4. Portfolio — image thumbnail, one CTA: `View source ↗`.

Toggle theme: both modes render cleanly.

Resize to 360px wide: rows stay legible. The 96×96 thumbnail does not crowd out the content column to unreadable width.

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add components/Projects/index.tsx components/Projects/components/project-card.tsx components/Projects/components/project-cta.tsx
git commit -m "feat(projects): rewrite as asymmetric featured + compact list"
```

> Note: `git add` on the deleted files records the deletion in the staging area; `git rm` from Step 3 already staged them, so this `git add` is a no-op for those paths. Including them in the command is harmless.

---

## Task 7: Update audit doc

**Files:**
- Modify: `docs/superpowers/notes/spec-2-input.md`

- [ ] **Step 1: Open `docs/superpowers/notes/spec-2-input.md`**

The doc has four findings sections plus a "Migrated" subsection added in spec 2a, then "Notes".

- [ ] **Step 2: Remove every line that references `components/Projects/`**

In each of the four findings sections, delete every bullet starting with `- components/Projects/`. Do NOT delete bullets for other components.

- [ ] **Step 3: Add Projects entries to the "Migrated" subsection**

Find the existing "Migrated to the new tokens (out of scope for spec 2 onward)" subsection. Append three new bullets at the end of its list:

```markdown
- `components/Projects/index.tsx` — rewritten in spec 2b (Projects redesign).
- `components/Projects/components/featured-project-card.tsx` — created in spec 2b; uses tokens from inception.
- `components/Projects/components/compact-project-row.tsx` — created in spec 2b; uses tokens from inception.
- `components/Projects/components/project-card.tsx` — deleted in spec 2b.
- `components/Projects/components/project-cta.tsx` — deleted in spec 2b.
```

- [ ] **Step 4: Verify by re-running the Projects greps**

Run from the repo root:

```
rg -n "(^|\\s|:)(bg|text|border)-(white|black|gray-\\d+|blue-\\d+)" components/Projects/
rg -n "\\b(gap|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(3|5|6|7|9|10|11|12|14)\\b" components/Projects/
rg -n "#[0-9A-Fa-f]{6}\\b" components/Projects/
rg -n "bg-\\[#|text-\\[#|border-\\[#" components/Projects/
```

Expected: every command returns zero results. Also confirm:

```
rg -n "useState|useEffect|\"use client\"|gsap|ImageModal" components/Projects/
```

Expected: zero results.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/notes/spec-2-input.md
git commit -m "docs: mark Projects as migrated in spec-2 audit"
```

---

## Task 8: Final acceptance walk-through

**Files:** none (verification only).

- [ ] **Step 1: Build clean**

Run: `bun run build`
Expected: build completes. No new warnings.

- [ ] **Step 2: Visual checklist on the dev server**

Run: `bun dev`. Visit `http://localhost:3000/projects`.

Walk every item from §Acceptance criteria of the spec:
- Eyebrow + heading + separator at top ✓
- Redbiomed featured card with offset-frame screenshot, Fraunces title, mono tags, full description, single accent button ✓
- "More work" eyebrow ✓
- 4 compact rows in order ✓
- Hairline borders between rows; last row has no bottom border ✓
- Theme toggle works ✓
- 360px viewport: rows still legible ✓

- [ ] **Step 3: Confirm no client-only behaviors leaked in**

In DevTools → Network → JS, hard-refresh `/projects`. Expected: no chunk containing `gsap` or `react-dom/client` for this route. (The shared layout chunks may still include things; only the route-specific bundle is what we check.)

- [ ] **Step 4: Final summary**

Run: `git log --oneline -10`
Expected: seven implementation commits visible (Tasks 1, 2, 3, 4, 5, 6, 7) plus the spec commit (`2c71196`).

The Projects redesign is complete. Spec 2c (Skills + Certificates) is the next sub-spec.

---

## Self-review notes

- **Spec coverage:** every section of `docs/superpowers/specs/2026-05-05-projects-redesign-design.md` maps to a task. Type changes → Task 1. Data changes (TOPCIT merge, Redbiomed featured) → Task 2. New `.text-heading-row` class → Task 3. Featured card → Task 4. Compact row → Task 5. Section orchestrator + deletions → Task 6. Audit update → Task 7. Acceptance walk → Task 8.
- **Placeholder scan:** no "TBD"s, no "similar to above", no "handle errors". Every code block is the full code. Every command has its expected outcome.
- **Type consistency:**
  - `featured?: boolean` and `metadata.serverLink?: string` are introduced in Task 1 and consumed in Task 2 (data) and Task 6 (orchestrator).
  - `FeaturedProjectCardProps` is defined in Task 4 and consumed by name in Task 6.
  - `CompactProjectRowProps` is defined in Task 5 and consumed by name in Task 6.
  - `pickFeatured` (Task 6) returns `{ featured: TProjectData; rest: readonly TProjectData[] }` — the `rest` is `readonly` to signal we're not going to mutate it.
  - The `index` prop on `<CompactProjectRow />` is 1-based (computed in Task 6 as `i + 1`); inside the component (Task 5) it's used to derive `paddedIndex` via `String(index).padStart(2, "0")`. Consistent.
  - `kind` is internal to `<CompactProjectRow />` and derived from `tags.includes("API")`. Not exposed as a prop — Task 5's component handles it internally.
- **Server component discipline:** Tasks 4, 5, 6 all explicitly state "no `"use client"`" and use no hooks. The acceptance criterion in Task 7 (`useState|useEffect|"use client"|gsap|ImageModal` grep returning zero) catches any drift.
