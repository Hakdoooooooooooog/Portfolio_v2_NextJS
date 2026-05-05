# Experiences Redesign — Spec 2d (Layout & Composition, part 4 of 5)

**Date:** 2026-05-05
**Scope:** Fourth sub-spec of the layout & composition phase. Redesigns the `/experiences` page only. Shared chrome (Navbar, Footer, Button, Switch, Modal) ships in spec 2e.

## Context

Today's `components/Experiences/index.tsx` is a `"use client"` component that defines two arrays inline (`PrimaryExperiences` + `EarlierExperiences`) and renders them as off-palette gray cards with blue date chips, blue skill pills, an amber "Internship Output" callout, and a per-card "Show more / Show less" expand toggle. The earlier-roles array is hidden behind a `<details>` collapsible.

The data has a strong temporal axis (every entry has start + optional end date) that the current cards underuse. Foundation (spec 1) supplies the design tokens, type scale, and rhythm. Specs 2a–2c established the page pattern (eyebrow + page title + tokenized content rows) and a CSS-only `.reveal` motion class (spec 2c). This spec extends those conventions to Experiences with a vertical timeline as the section's distinctive layout motif.

## Goals

- Replace card-list-with-expand-toggles with a vertical timeline: a `border-l border-border` rail, palette dots per entry, dates as eyebrows, content beside.
- Show all four roles inline; drop the "Earlier work" `<details>` toggle.
- Drop logos from entries (asymmetric data; not load-bearing for the layout).
- Move `experiencesData` from inline arrays into `utils/constants/index.ts` (data centralization, mirrors `ProjectsData` / `CertificatesData` / `skillCategories`).
- Lift the `useReveal` hook from `components/Skills-certificates/components/` to `components/` (now shared by 2 sections; deserves to live at the shared root).
- Reuse the `.reveal` class from spec 2c — no new motion CSS.
- Move all visual choices onto foundation tokens; eliminate every off-palette utility and off-rhythm spacing in `components/Experiences/**`.

## Non-goals

- No changes to `Home`, `Projects`, `Skills-certificates` orchestrators or other subcomponents (only the import paths in `skill-category.tsx` and `compact-certificate-row.tsx` change as a side-effect of the hook move).
- No changes to Navbar, Footer, Button, Switch, Modal, Separator. Spec 2e owns those.
- No changes to `TExperienceData` (the existing shape covers the redesign).
- No new design tokens, no new type-scale slots, no new dependencies.
- No removal of the orphaned image assets `internship-gentri.webp` and `telus-official-logo.png` — the redesign drops the rendering, but the binary files are out-of-scope for this spec. Spec 2e or a later cleanup may delete them.

## Page structure

```
<section class="container-page">

  <p class="text-eyebrow text-muted">04 / Experiences</p>
  <h2 class="text-display-lg text-foreground mt-4">Where I've worked</h2>

  <div class="border-t border-border mt-8" aria-hidden></div>

  <ol class="relative border-l border-border ml-2 pl-8 mt-8 list-none p-0">
    <TimelineEntry experience={...} isActive ... />
    <TimelineEntry experience={...} className="mt-8" ... />
    <TimelineEntry experience={...} className="mt-8" ... />
    <TimelineEntry experience={...} className="mt-8" ... />
  </ol>

</section>
```

**Vertical rhythm:**
- Eyebrow → `mt-4` → page title.
- Page title → `mt-8` → separator.
- Separator → `mt-8` → timeline `<ol>`.
- Between entries → `mt-8`.

**Timeline rail:**
- `<ol>` with `border-l border-border` produces the vertical line.
- `ml-2 pl-8` positions the rail 8px in from the section's left edge; entry content sits 32px to the right of the rail.
- Semantic `<ol>` (ordered list) for chronological history; screen readers announce as a list with item count.

**Per entry: timeline dot positioning:**
- Each `<TimelineEntry>` is a `<li>` with `relative` and a `before:` pseudo-element styled as the dot.
- Dot: `before:absolute before:-left-[33px] before:top-1 before:size-2.5 before:rounded-full`.
- Active (topmost; entry has no `endDate`): `before:bg-accent` (palette accent).
- Past (every other entry): `before:bg-border` (slate-tinted, palette-aware).

**Sorting & active flag:**
- `experiencesData` is authored newest-first; no runtime sort needed.
- Section file computes `isActive = experience.workInfo.endDate === undefined` per entry. Only entries with no `endDate` render the active accent dot.
- If multiple entries lack `endDate` (concurrent ongoing roles), each gets the accent dot. That's data-correct — concurrent roles are real.

## TimelineEntry

`components/Experiences/components/timeline-entry.tsx`. Thin client component (uses the shared `useReveal`) that renders one entry as a timeline `<li>` with the dot via `before:`.

### Props

```ts
type TimelineEntryProps = {
  experience: TExperienceData;
  isActive: boolean;
  delayMs?: number;
  className?: string;
};
```

### Composition

```tsx
"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/portfolio/components/use-reveal";
import type { TExperienceData } from "@/portfolio/utils/types";

type TimelineEntryProps = {
  experience: TExperienceData;
  isActive: boolean;
  delayMs?: number;
  className?: string;
};

export default function TimelineEntry({
  experience,
  isActive,
  delayMs = 0,
  className,
}: TimelineEntryProps) {
  const ref = useReveal<HTMLLIElement>();
  const { workInfo, additionalInfo } = experience;
  const { title, subtitle, location, startDate, endDate } = workInfo;
  const { description, bullets, skills, project } = additionalInfo;

  const dateLabel = startDate
    ? `${startDate} — ${endDate ?? "Present"}`
    : null;

  const dotClass = isActive ? "before:bg-accent" : "before:bg-border";

  return (
    <li
      ref={ref}
      className={`reveal relative ${dotClass} before:absolute before:-left-[33px] before:top-1 before:size-2.5 before:rounded-full ${className ?? ""}`}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
      {dateLabel ? (
        <p className="text-eyebrow text-muted">{dateLabel}</p>
      ) : null}

      <h3 className="text-heading-row text-foreground mt-2">{title}</h3>

      <p className="text-small font-mono text-muted mt-1">
        {subtitle} · {location}
      </p>

      {bullets && bullets.length > 0 ? (
        <ul className="list-disc list-outside marker:text-muted text-body text-muted mt-4 pl-5 flex flex-col gap-2">
          {bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      ) : description ? (
        <p className="text-body text-muted mt-4">{description}</p>
      ) : null}

      {skills && skills.length > 0 ? (
        <p className="text-small font-mono text-muted mt-4 flex flex-wrap gap-x-2 gap-y-1">
          {skills.map((skill, i) => (
            <span key={skill}>
              {skill}
              {i < skills.length - 1 ? (
                <span className="ml-2 text-muted/60" aria-hidden>
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </p>
      ) : null}

      {project?.projectOutputLink ? (
        <a
          href={project.projectOutputLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-small font-mono text-muted transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent"
        >
          View output <span aria-hidden>↗</span>
        </a>
      ) : null}
    </li>
  );
}
```

### Notes

- `useReveal` import comes from the new shared location `@/portfolio/components/use-reveal` after the hook lift (see below).
- The dot is rendered via `before:` pseudo-element — no extra DOM, no separate component.
- `before:-left-[33px]` is one arbitrary value. Math: rail is at `left:0`, content offset is `pl-8` (32px), dot is `size-2.5` (10px). To center-align the dot on the rail, dot's left = `−(32 + (10/2 − 0.5))` ≈ `−33px`. Declared deviation in §Design system contract.
- Heading hierarchy: page `<h2>` is `Where I've worked`; entry `<h3>` is the role title. Correct.
- Bullets vs description: branches on data shape. Today's data already has this branch; the redesign preserves it. No "show more" expand state — full text always.
- Skills row: same mono dot-separated convention as Home stack, Projects tags, Certs metadata.
- `View output ↗` matches Projects/Certs CTAs — mono link, palette-accent underline on hover, outbound `↗` glyph.

## useReveal hook lift

`Skills-certificates/components/use-reveal.ts` is moved to `components/use-reveal.ts`. Same content; import path changes for its three consumers.

**Files affected by the move:**

- `components/use-reveal.ts` — created (file content identical to the old location).
- `components/Skills-certificates/components/use-reveal.ts` — deleted.
- `components/Skills-certificates/components/skill-category.tsx` — change import: `import { useReveal } from "./use-reveal";` → `import { useReveal } from "@/portfolio/components/use-reveal";`
- `components/Skills-certificates/components/compact-certificate-row.tsx` — same import change.
- `components/Experiences/components/timeline-entry.tsx` — new file imports `from "@/portfolio/components/use-reveal"`.

This is a side-effect of the new spec needing the hook in another section. Done as part of this spec, not deferred.

## Data and type changes

### `utils/types.ts`

No changes. `TExperienceData` already covers the redesign — `workInfo` (with optional `imageData`, which we ignore) + `additionalInfo` (with optional `bullets` / `description` / `skills` / `project`).

The `imageData` field stays in the type for now; spec 2e or a later cleanup can decide whether to remove it. No code reads `imageData` after this spec.

### `utils/constants/index.ts`

Add `experiencesData: TExperienceData[]` and import `TExperienceData` from `../types`. The data is the merged & lightly-edited content from today's `PrimaryExperiences` + `EarlierExperiences`:

```ts
export const experiencesData: TExperienceData[] = [
  {
    workInfo: {
      title: "Junior Full Stack Developer",
      subtitle: "GP Synergia",
      location: "Philippines",
      startDate: "Dec 2025",
    },
    additionalInfo: {
      bullets: [
        "Engineered a self-hosted GitLab environment and automated CI/CD pipelines to streamline deployments and enhance security.",
        "Orchestrated containerized application deployments via Docker and provisioned AWS cloud infrastructure using Terraform.",
      ],
      skills: ["GitLab CI/CD", "Docker", "Terraform", "AWS"],
    },
  },
  {
    workInfo: {
      title: "IT Help Desk and End User Support",
      subtitle: "GP Synergia",
      location: "Philippines",
      startDate: "Nov 2025",
      endDate: "Dec 2025",
    },
    additionalInfo: {
      bullets: [
        "Delivered technical support, managed Microsoft Entra users, and enhanced the support ticket automation pipeline for faster resolution.",
      ],
      skills: ["Microsoft Entra", "Technical Support", "Automation"],
    },
  },
  {
    workInfo: {
      title: "IT Support Internship",
      subtitle: "ICT E-Library — City Public Library of General Trias",
      location: "Brgy. Bagumbayan, General Trias, Cavite",
      startDate: "Mar 2025",
      endDate: "Jun 2025",
    },
    additionalInfo: {
      description:
        "Provided IT support and technical assistance to library users while managing ICT E-Library resources and maintaining computer systems. Developed and shipped a centralized digital platform that streamlined access to library resources and improved accessibility for community members.",
      skills: [
        "Technical Support",
        "Web Development",
        "Digital Resource Management",
        "UI/UX Design",
      ],
      project: {
        projectOutputLink: "https://e-cplgt.netlify.app/",
      },
    },
  },
  {
    workInfo: {
      title: "Crawling Structured Description",
      subtitle: "Telus International AI",
      location: "Tampere, Finland",
      startDate: "Aug 2023",
      endDate: "Dec 2023",
    },
    additionalInfo: {
      description:
        "Evaluated structured descriptions of product pages and identified the main description copy. Extracted product info (description, details, features, specifications, materials/ingredients, etc.) used as ground-truth for downstream webpage assessments.",
      skills: ["Data Annotation", "Web Evaluation", "Product Analysis"],
    },
  },
];
```

Edits vs. today's data:
- `imageData` dropped from every entry.
- Date strings normalized to short month form (`Aug 2023` not `August 2023`, `Mar 2025` not `March 2025`) for cleaner `Mar 2025 — Jun 2025` rendering.
- Description text mildly polished for active voice.

## Section orchestrator

`components/Experiences/index.tsx`. Server component.

```tsx
import { experiencesData, sectionNumbers } from "@/portfolio/utils/constants";
import TimelineEntry from "./components/timeline-entry";

const ENTRY_DELAY_MS = 80;

export default function Experiences() {
  return (
    <section className="container-page">
      <p className="text-eyebrow text-muted">
        {sectionNumbers.experiences} / Experiences
      </p>

      <h2 className="text-display-lg text-foreground mt-4">
        Where I&apos;ve worked
      </h2>

      <div className="border-t border-border mt-8" aria-hidden />

      <ol className="relative border-l border-border ml-2 pl-8 mt-8 list-none p-0">
        {experiencesData.map((experience, i) => {
          const isActive = !experience.workInfo.endDate;
          const delayMs = i * ENTRY_DELAY_MS;
          return (
            <TimelineEntry
              key={`${experience.workInfo.title}-${experience.workInfo.startDate ?? ""}`}
              experience={experience}
              isActive={isActive}
              delayMs={delayMs}
              className={i === 0 ? undefined : "mt-8"}
            />
          );
        })}
      </ol>
    </section>
  );
}
```

Notes:
- Server component (no `"use client"`).
- `i === 0` skips the `mt-8` for the first entry (no spacing above the first dot).
- `key` combines title + startDate to remain stable when entries are added/edited.
- `&apos;` for the apostrophe in `Where I've worked` keeps JSX strict.

## File-level changes

| File | Change |
|---|---|
| `components/Experiences/index.tsx` | Rewrite. Server component. |
| `components/Experiences/components/timeline-entry.tsx` | New. ~95 lines. `"use client"`. |
| `components/Experiences/components/experience-card.tsx` | Delete. |
| `utils/constants/index.ts` | Modify. Add `experiencesData`; import `TExperienceData`. |
| `components/use-reveal.ts` | Create (move from `Skills-certificates/components/use-reveal.ts`). Identical content. |
| `components/Skills-certificates/components/use-reveal.ts` | Delete (moved to `components/use-reveal.ts`). |
| `components/Skills-certificates/components/skill-category.tsx` | Modify. Update import path: `./use-reveal` → `@/portfolio/components/use-reveal`. |
| `components/Skills-certificates/components/compact-certificate-row.tsx` | Modify. Update import path: `./use-reveal` → `@/portfolio/components/use-reveal`. |
| `docs/superpowers/notes/spec-2-input.md` | Modify. Strike `Experiences/**` entries; add to "Migrated" subsection. |

No other files modified.

## Design system contract

### Color tokens

| Use | Class |
|---|---|
| Page background | inherits `bg-background` |
| Default text (titles, dot accent) | `text-foreground` |
| Eyebrow, subtitle/location, body, skills, output link | `text-muted` |
| Active timeline dot | `before:bg-accent` |
| Past timeline dot | `before:bg-border` |
| Timeline rail | `border-l border-border` |
| Hover accents | `hover:text-foreground`, `decoration-accent`, `hover:underline` |

### Typography

| Element | Class |
|---|---|
| Page eyebrow (`04 / Experiences`) | `text-eyebrow text-muted` |
| Page title (`Where I've worked`) | `text-display-lg text-foreground` |
| Date eyebrow per entry | `text-eyebrow text-muted` |
| Entry title | `text-heading-row text-foreground` |
| Company · Location | `text-small font-mono text-muted` |
| Body (bullets / description) | `text-body text-muted` |
| Skills row | `text-small font-mono text-muted` |
| Output link | `text-small font-mono text-muted` |

### Spacing rhythm (4-stop)

| Step | Use |
|---|---|
| `mt-1`, `gap-x-2`, `gap-y-1` | Inline between subtitle and title (mt-1), inline tag separators |
| `mt-2`, `gap-2` | Title spacing, output-link icon gap |
| `mt-4`, `gap-4` | Body spacing, skills row, output link |
| `mt-8` | Page header → separator → list, between entries |
| `pl-8`, `ml-2` | Timeline rail offset (32px content indent + 8px outer margin) |

### Border radius

- `rounded-full` — timeline dot (`before:rounded-full`).
- `rounded-md`, `rounded-xl` — not used in this spec.

### Allowed deviations (declared)

- One arbitrary value: `before:-left-[33px]` for the timeline dot horizontal position. Math documented in §TimelineEntry.
- `mt-1`, `gap-y-1` precedent from earlier specs — allowed inline.
- `before:` and `after:` pseudo-element utilities are Tailwind built-ins. No new CSS.
- Reuses `.reveal` from spec 2c. No new CSS class added.

### Forbidden

- `bg-gray-*`, `text-gray-*`, `border-gray-*`, `border-amber-*`, `bg-amber-*`, `text-amber-*`, `bg-blue-*`, `text-blue-*`, `bg-white`, `bg-black`, including `dark:` / `light:` variants.
- Off-rhythm gaps: `gap-3`, `gap-5`, `gap-6`, `gap-7`, `gap-9`–`14`. Same for `p-`, `m-`, etc.
- Raw hex literals or `bg-[#...]`.
- `font:` shorthand with `var()`.
- Tailwind default font-size utilities (`text-xs`, `text-sm`, `text-lg`, `text-xl`, `text-base`).
- `useState`, `useEffect` in `Experiences/index.tsx`. The orchestrator is server. Inside `timeline-entry.tsx` only `useReveal` is allowed (no other hooks).
- `gsap` imports.
- `<details>` collapsible.
- `min-h-screen`.

## Acceptance criteria

1. `bun run build` and `bun dev` complete with no new warnings.
2. `/experiences` renders:
   - `04 / Experiences` eyebrow, `Where I've worked` Fraunces heading, separator.
   - Vertical timeline rail (`border-l border-border`).
   - 4 entries, newest-first:
     1. GP Synergia Junior FSD — active dot (accent color), date `Dec 2025 — Present`.
     2. GP Synergia IT Help Desk — past dot (border color).
     3. ICT E-Library Internship — past dot, with `View output ↗` link to `e-cplgt.netlify.app`.
     4. Telus AI — past dot.
   - Each entry: date eyebrow, Fraunces title, mono `Company · Location`, bullets-or-description body, mono skills row, optional output link.
3. On scroll, entries fade-and-rise into view in stagger order (80ms per entry). With `prefers-reduced-motion: reduce`, all elements appear at full opacity immediately.
4. Theme toggle works in both modes.
5. 360px-wide viewport: timeline rail still readable; entries don't overflow; bullets wrap correctly.
6. No `<details>` collapsible — all 4 entries visible by default.
7. No `gsap` imports under `components/Experiences/`.
8. `useReveal` hook moved to `components/use-reveal.ts`. The old path `components/Skills-certificates/components/use-reveal.ts` does not exist. Both `skill-category.tsx` and `compact-certificate-row.tsx` import from the new path. The Skills page (`/skills-and-certificates`) still works correctly (smoke-test required).
9. Grep `components/Experiences/**` for off-palette utilities returns zero matches:
   `rg -n "(^|\s|:)(bg|text|border)-(white|black|gray-\d+|blue-\d+|amber-\d+)" components/Experiences/`
10. Grep `components/Experiences/**` for off-rhythm spacing returns zero.
11. Grep `components/Experiences/**` for hex literals returns zero.
12. Grep `components/Experiences/**` for `useState`/`useEffect`/`"use client"` returns matches **only** in `timeline-entry.tsx`.
13. Audit doc updated: every `Experiences/**` entry struck; new `timeline-entry.tsx` and rewritten `index.tsx` appear in "Migrated"; the `useReveal` hook move noted.

## Lean guardrails

- 1 new component file (`timeline-entry.tsx`).
- 1 file move (`use-reveal.ts`).
- 1 file rewrite (`Experiences/index.tsx`).
- 1 file deletion (`experience-card.tsx`).
- 2 import-path edits (Skills-certificates' two row components).
- 1 data addition (`experiencesData`).
- 0 new CSS classes (`.reveal` reused).
- 1 arbitrary value (`before:-left-[33px]`).
- No new dependencies.

## Carried forward / cleanup notes (out of scope)

- Orphaned image assets `public/images/experiences/internship-gentri.webp` and `public/images/experiences/telus-official-logo.png` are no longer referenced after this spec. Leaving them in place; spec 2e or a later cleanup may delete them.
- `imageData` field on `TExperienceData.workInfo` is no longer read after this spec. Leaving the type field for now; can be removed in spec 2e.
- The `useReveal` hook now lives at `components/use-reveal.ts`. If spec 3 introduces a richer motion system, this hook may evolve or be replaced — the lift to `components/` is a precondition for that.

## Open questions

None at this stage. Implementation plan will be produced by the writing-plans skill in the next step.
