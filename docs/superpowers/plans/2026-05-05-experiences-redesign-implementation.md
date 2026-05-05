# Experiences Redesign Implementation Plan (Spec 2d)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/experiences` (today: card list with off-palette grays/blues/ambers, blue date chips, blue skill pills, "Show more" expand state, and a `<details>` collapsible for earlier roles) with a vertical timeline (palette rail + dots, dates as eyebrows, mono `Company · Location`, mono skills row, optional `View output ↗`) — all entries visible inline. Lift the `useReveal` hook from `Skills-certificates/components/` to `components/use-reveal.ts` so two sections can share it cleanly.

**Architecture:** Six sequential changes. (1) Lift `useReveal` to `components/use-reveal.ts` and update its two existing import sites in Skills-certificates. (2) Add `experiencesData` to `utils/constants/index.ts`. (3) Create `<TimelineEntry />`. (4) Rewrite `Experiences/index.tsx`, delete `experience-card.tsx`. (5) Update audit doc. (6) Final acceptance walk.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, Bun. Reuses `.reveal` CSS class and `useReveal` hook from spec 2c. No new dependencies.

**Testing reality:** No test runner. Verification per task is `bun run build`, manual browser checks (light + dark, desktop + 360px, with and without `prefers-reduced-motion`), and grep gates against the foundation's audit categories.

**Reference spec:** `docs/superpowers/specs/2026-05-05-experiences-redesign-design.md`.

---

## File map

| File | Disposition |
|---|---|
| `components/use-reveal.ts` | Create — moved content of the existing `Skills-certificates/components/use-reveal.ts` (Task 1) |
| `components/Skills-certificates/components/use-reveal.ts` | Delete (Task 1) |
| `components/Skills-certificates/components/skill-category.tsx` | Modify — update import path (Task 1) |
| `components/Skills-certificates/components/compact-certificate-row.tsx` | Modify — update import path (Task 1) |
| `utils/constants/index.ts` | Modify — add `experiencesData` + `TExperienceData` import (Task 2) |
| `components/Experiences/components/timeline-entry.tsx` | Create — `"use client"` (Task 3) |
| `components/Experiences/index.tsx` | Rewrite — server component (Task 4) |
| `components/Experiences/components/experience-card.tsx` | Delete (Task 4) |
| `docs/superpowers/notes/spec-2-input.md` | Modify — strike Experiences entries; add to "Migrated" subsection (Task 5) |

---

## Task 1: Lift `useReveal` hook to `components/use-reveal.ts`

**Files:**
- Create: `components/use-reveal.ts`
- Delete: `components/Skills-certificates/components/use-reveal.ts`
- Modify: `components/Skills-certificates/components/skill-category.tsx`
- Modify: `components/Skills-certificates/components/compact-certificate-row.tsx`

- [ ] **Step 1: Read the existing hook**

Run: `cat components/Skills-certificates/components/use-reveal.ts`
Confirm it contains the `"use client"` directive, the `useReveal<T extends HTMLElement>()` function, the `IntersectionObserver` setup with `rootMargin: "0px 0px -10% 0px"` and `threshold: 0.1`, and the `observer.unobserve(entry.target)` self-disconnect on first reveal.

- [ ] **Step 2: Create `components/use-reveal.ts` with the same content**

Create `components/use-reveal.ts`:

```ts
"use client";

import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return ref;
}
```

- [ ] **Step 3: Delete the old file**

Run: `git rm components/Skills-certificates/components/use-reveal.ts`

- [ ] **Step 4: Update import in `skill-category.tsx`**

Open `components/Skills-certificates/components/skill-category.tsx`. Change the line:

```ts
import { useReveal } from "./use-reveal";
```

to:

```ts
import { useReveal } from "@/portfolio/components/use-reveal";
```

No other changes to this file.

- [ ] **Step 5: Update import in `compact-certificate-row.tsx`**

Open `components/Skills-certificates/components/compact-certificate-row.tsx`. Change the same import line:

```ts
import { useReveal } from "./use-reveal";
```

to:

```ts
import { useReveal } from "@/portfolio/components/use-reveal";
```

No other changes to this file.

- [ ] **Step 6: Verify build succeeds**

Run: `bun run build`
Expected: build completes. The hook is now imported via the new path; old path is gone; both Skills consumers resolve correctly.

- [ ] **Step 7: Smoke-test the dev server**

Run: `bun dev`. Open `http://localhost:3000/skills-and-certificates`.
Expected: page renders identically to before — skill chip categories and cert rows still fade-and-rise on scroll. The hook lift is purely a refactor; behavior should not change.

Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add components/use-reveal.ts components/Skills-certificates/components/use-reveal.ts components/Skills-certificates/components/skill-category.tsx components/Skills-certificates/components/compact-certificate-row.tsx
git commit -m "refactor(skills): lift useReveal hook to shared components/ root"
```

`git rm` from Step 3 already staged the deletion; `git add components/use-reveal.ts` covers the create; the two `git add` paths cover the import edits. The commit captures all four file changes (1 create + 1 delete + 2 modifies).

---

## Task 2: Add `experiencesData` to constants

**Files:**
- Modify: `utils/constants/index.ts`

- [ ] **Step 1: Open `utils/constants/index.ts` and locate the existing import line**

The top of the file currently imports:

```ts
import {
  TCertificate,
  TNavigationLink,
  TProjectData,
  TSkillCategory,
} from "../types";
```

- [ ] **Step 2: Add `TExperienceData` to the import**

Add `TExperienceData` to the existing import block, alphabetical-ish:

```ts
import {
  TCertificate,
  TExperienceData,
  TNavigationLink,
  TProjectData,
  TSkillCategory,
} from "../types";
```

- [ ] **Step 3: Append `experiencesData` at the bottom of the file**

After the existing `ProjectsData` declaration (find the last `];` of `ProjectsData`), insert this exact block as a new top-level export:

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

The data is authored newest-first; no runtime sort needed.

- [ ] **Step 4: Verify build**

Run: `bun run build`
Expected: build completes. `experiencesData` is unused at this point (`Experiences/index.tsx` still imports its old inline arrays — Task 4 fixes this), but the new export does not break anything.

- [ ] **Step 5: Commit**

```bash
git add utils/constants/index.ts
git commit -m "feat(experiences): add centralized experiencesData constant"
```

---

## Task 3: Create `<TimelineEntry />`

**Files:**
- Create: `components/Experiences/components/timeline-entry.tsx`

- [ ] **Step 1: Confirm directory exists**

Run: `ls components/Experiences/components/`
Expected: `experience-card.tsx` exists. The new file lands alongside it.

- [ ] **Step 2: Create the new file with this exact content**

Create `components/Experiences/components/timeline-entry.tsx`:

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

> Notes:
> - `"use client"` because `useReveal` calls `useEffect`/`IntersectionObserver`.
> - The dot is rendered via `before:` pseudo-element — no extra DOM, no separate component.
> - `before:-left-[33px]` is one arbitrary value, declared in spec §Design system contract. Math: rail `left:0`, content offset `pl-8` (32px), dot `size-2.5` (10px). Center-align: `−(32 + (10/2 − 0.5)) ≈ −33px`.
> - Branches on `bullets.length > 0` first, then falls back to `description`. Same data shape the existing data uses.

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: build completes. The file passes TypeScript checks in isolation. It's not yet wired into the section orchestrator.

- [ ] **Step 4: Commit**

```bash
git add components/Experiences/components/timeline-entry.tsx
git commit -m "feat(experiences): add TimelineEntry component"
```

---

## Task 4: Rewrite section orchestrator and delete `experience-card.tsx`

**Files:**
- Rewrite: `components/Experiences/index.tsx`
- Delete: `components/Experiences/components/experience-card.tsx`

- [ ] **Step 1: Read `components/Experiences/index.tsx`**

Confirm it's the current `"use client"` version that defines two inline arrays (`PrimaryExperiences` + `EarlierExperiences`), uses `useState` for the `<details>` toggle, and imports `ExperienceCard`.

- [ ] **Step 2: Overwrite `components/Experiences/index.tsx`**

Replace the entire file with this exact content:

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

> Notes:
> - Server component (no `"use client"`).
> - `i === 0` skips the `mt-8` for the first entry so there's no spacing above the first dot.
> - `key` combines title and startDate to remain stable when entries are added/edited.
> - `&apos;` for the apostrophe in `Where I've worked` keeps JSX strict.
> - `isActive = !experience.workInfo.endDate` — entries without an end date render the accent-colored dot; everything else uses the muted border color.

- [ ] **Step 3: Delete the obsolete `experience-card.tsx`**

Run:

```bash
git rm components/Experiences/components/experience-card.tsx
```

- [ ] **Step 4: Verify build**

Run: `bun run build`
Expected: build completes; no TS errors. The route `/experiences` is now smaller (no `useState`, no `<details>`, no inline data, no GSAP traces).

- [ ] **Step 5: Smoke-test the dev server**

Run: `bun dev`. Open `http://localhost:3000/experiences`.

Expected (dark mode):
- `04 / Experiences` eyebrow at top.
- `Where I've worked` Fraunces heading below.
- Hairline `border-border` separator.
- Vertical timeline with `border-l border-border` rail.
- 4 entries, newest first:
  1. **Junior Full Stack Developer** — accent-colored dot (active), date `Dec 2025 — Present`, bullets, skills row.
  2. **IT Help Desk and End User Support** — past dot (border color), date `Nov 2025 — Dec 2025`, bullets, skills row.
  3. **IT Support Internship** — past dot, date `Mar 2025 — Jun 2025`, description paragraph, skills row, `View output ↗` link to `e-cplgt.netlify.app`.
  4. **Crawling Structured Description** — past dot, date `Aug 2023 — Dec 2023`, description paragraph, skills row.
- On scroll, entries fade-and-rise into view in stagger order (80ms apart).

Toggle theme: both modes render cleanly.

In DevTools, simulate `prefers-reduced-motion: reduce` (Rendering panel → "Emulate CSS media feature prefers-reduced-motion" → "reduce"). Reload. Expected: all entries appear at full opacity immediately, no animation.

Resize to 360px width: timeline rail still readable; entries don't overflow horizontally; bullets wrap correctly.

Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add components/Experiences/index.tsx components/Experiences/components/experience-card.tsx
git commit -m "feat(experiences): rewrite as vertical timeline, drop card and details toggle"
```

`git rm` already staged the deletion; the `git add` covers the rewrite. The commit captures both changes (1 modified + 1 deleted).

---

## Task 5: Update audit doc

**Files:**
- Modify: `docs/superpowers/notes/spec-2-input.md`

- [ ] **Step 1: Open `docs/superpowers/notes/spec-2-input.md`**

The doc has four findings sections plus a "Migrated to the new tokens" subsection (extended in 2a, 2b, 2c), then "Notes".

- [ ] **Step 2: Remove every line that references `components/Experiences/`**

In each of the four findings sections, delete every bullet starting with `- components/Experiences/`. Do NOT delete bullets for other components (Navbar, Switch, Footer, Button, Separator).

- [ ] **Step 3: Add Experiences entries to the "Migrated" subsection**

Find the "## Migrated to the new tokens (out of scope for spec 2 onward)" subsection. Append these bullets to the END of its existing bullet list:

```markdown
- `components/Experiences/index.tsx` — rewritten in spec 2d (Experiences redesign).
- `components/Experiences/components/timeline-entry.tsx` — created in spec 2d; uses tokens from inception.
- `components/Experiences/components/experience-card.tsx` — deleted in spec 2d.
- `components/use-reveal.ts` — created in spec 2d (lifted from Skills-certificates/components/use-reveal.ts to shared root).
- `components/Skills-certificates/components/use-reveal.ts` — moved in spec 2d to `components/use-reveal.ts`.
```

- [ ] **Step 4: Verify by running the Experiences greps**

Run from the repo root:

```
rg -n "(^|\\s|:)(bg|text|border)-(white|black|gray-\\d+|blue-\\d+|amber-\\d+)" components/Experiences/
rg -n "\\b(gap|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(3|5|6|7|9|10|11|12|14)\\b" components/Experiences/
rg -n "#[0-9A-Fa-f]{6}\\b" components/Experiences/
rg -n "bg-\\[#|text-\\[#|border-\\[#" components/Experiences/
rg -n "gsap|<details" components/Experiences/
```

Each should return zero matches.

Also run, to verify the hook lift didn't break Skills-certificates:

```
rg -n "from \"./use-reveal\"" components/Skills-certificates/
```

Expected: zero matches (both files now import from the new shared path).

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/notes/spec-2-input.md
git commit -m "docs: mark Experiences as migrated in spec-2 audit"
```

---

## Task 6: Final acceptance walk-through

**Files:** none (verification only).

- [ ] **Step 1: Build clean**

Run: `bun run build`
Expected: build completes. No new warnings.

- [ ] **Step 2: Visual checklist on the dev server**

Run: `bun dev`. Visit `http://localhost:3000/experiences`.

Walk every item from §Acceptance criteria of the spec:
- Eyebrow + heading + separator at top ✓
- Vertical timeline rail with palette dots (accent for active, border for past) ✓
- 4 entries newest-first with dates, titles, subtitle/location, bullets/description, skills, output link on entry 3 ✓
- Reveal-on-scroll fade-and-rise ✓
- `prefers-reduced-motion: reduce` disables animation ✓
- Theme toggle works ✓
- 360px viewport: timeline still readable ✓

- [ ] **Step 3: Smoke-test that the hook lift didn't break Skills**

Visit `http://localhost:3000/skills-and-certificates`. Confirm:
- Skill chip categories still render and reveal on scroll.
- Cert rows still render and reveal on scroll.
- No console errors.

- [ ] **Step 4: Confirm only `timeline-entry.tsx` is a client component**

Run from repo root:

```
rg -n "\"use client\"" components/Experiences/
```

Expected: exactly one match — `components/Experiences/components/timeline-entry.tsx`. The orchestrator `index.tsx` must NOT contain `"use client"`.

- [ ] **Step 5: Final summary**

Run: `git log --oneline -8`
Expected: six implementation commits visible (Tasks 1–5 produce 5 commits; Task 6 has no commit unless a fix is needed) plus the spec commit (`ac19b90`) above them.

Spec 2d is complete. Spec 2e (shared chrome — Navbar, Footer, Button, Switch) is the final sub-spec of the layout phase, then spec 3 (perf + motion) follows.

---

## Self-review notes

- **Spec coverage:**
  - Hook lift to `components/use-reveal.ts` and the two import-path edits → Task 1.
  - `experiencesData` constant → Task 2.
  - `<TimelineEntry />` → Task 3.
  - Section orchestrator rewrite + `experience-card.tsx` deletion → Task 4.
  - Audit doc update → Task 5.
  - Final acceptance verification → Task 6.
- **Placeholder scan:** no "TBD"s, no "similar to above", no vague "handle errors". Every code block is the full code. Every command has its expected outcome.
- **Type consistency:**
  - `useReveal<T extends HTMLElement>()` (Task 1's lifted hook) is consumed by Task 3 as `useReveal<HTMLLIElement>()`. Compatible.
  - `experiencesData: TExperienceData[]` (Task 2) is consumed by Task 4 (`experiencesData.map(...)`).
  - `TimelineEntry` props shape (Task 3) is matched by Task 4's call site (passes `experience`, `isActive`, `delayMs`, `className`).
  - The `--reveal-delay` CSS variable inline style is set in Task 3 via `as CSSProperties` cast — same convention as spec 2c's components.
  - `before:bg-accent` / `before:bg-border` class strings (Task 3) leverage Tailwind v4's pseudo-element variant + foundation tokens (`bg-accent`, `bg-border` defined in `globals.css` `@theme inline`).
- **No deliberate broken intermediates this time.** Tasks 1, 2, 3 each leave the build green. Task 4 is the only consumer of the new constant + component; until it lands, the new constant and component sit unused but functional. Spec 2c had broken intermediates because it deleted old data symbols before fixing consumers; this spec adds new symbols first and replaces consumers later, avoiding that pattern.
- **Hook lift verification:** Task 1 Step 7 (smoke-test on `/skills-and-certificates`) and Task 6 Step 3 (re-smoke-test) both verify the lift. Two passes catch any path-resolution issue early.
