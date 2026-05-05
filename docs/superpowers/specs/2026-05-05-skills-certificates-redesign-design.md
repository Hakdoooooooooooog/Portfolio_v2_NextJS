# Skills & Certificates Redesign — Spec 2c (Layout & Composition, part 3 of 5)

**Date:** 2026-05-05
**Scope:** Third sub-spec of the layout & composition phase. Redesigns the `/skills-and-certificates` page only. Other sections (Experiences) and shared chrome ship in their own specs (2d–2e).

## Context

Today's `components/Skills-certificates/index.tsx` is a `"use client"` GSAP-driven page with two `min-h-screen` sections:

- **Skills:** 17 tech icons absolutely positioned in a 4×5 cluster (`x ∈ {-200, -100, 0, 100, 200}`, `y ∈ {-150, -50, 50, 150}`), with a continuous "bobbing" GSAP animation per icon, scaled down on small devices via `useIsSmallDevice`. Icons sit in `bg-gray-300/75 dark:bg-gray-800/75 border border-amber-600` cards.
- **Certificates:** 8+ certs in a 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`). Each card has either a static image (with a `<ImageModal />` lightbox) or a Credly embed; cards fade in via GSAP `ScrollTrigger`. Tags rendered as blue pills via a separate `tags.tsx` component.

The off-palette grays/blues/ambers, off-rhythm spacing, and the floating-cluster + scroll-trigger machinery all need to go. Foundation (spec 1) supplies the tokens; specs 2a (Home) and 2b (Projects) established the section pattern (eyebrow + Fraunces page title + inner subsection eyebrows + compact list rows). This spec extends that pattern to Skills + Certificates and introduces a small CSS-only reveal-on-scroll motion treatment that spec 3 can refine.

## Goals

- Replace the floating-icon cluster with three categorized rows of palette-tinted skill chips (`[icon] Name`).
- Replace the certificate card grid with a compact-row list mirroring Projects' compact rows (thumbnail + title + issuer + date + optional Verify link).
- Drop GSAP, drop client-state, drop the image modal, drop `useIsSmallDevice`, drop the placeholder "Tap to enlarge" affordance, drop tags from cert rows.
- Move all visual choices onto foundation tokens; eliminate every off-palette utility and off-rhythm spacing in `components/Skills-certificates/**`.
- Introduce a CSS-only fade-and-rise reveal on scroll, scoped to this page's row components, that respects `prefers-reduced-motion: reduce`.
- Reshape `skillsData` from a flat positioned array into a categorized structure.

## Non-goals

- No changes to `Home`, `Projects`, `Experiences`, Navbar, Footer, Button, Switch, Separator.
- No removal of the `gsap` package itself (still imported elsewhere; spec 3 owns full removal).
- No changes to `app/(root)/layout.tsx` or any global plumbing beyond the `.reveal` class addition in globals.css.
- No new design tokens, no new type-scale slots, no new dependencies.
- No carousel, search, filter, or sort UX. Static page.
- No editing of the Portfolio project's `tags` array — that cleanup belongs after spec 3 actually removes GSAP from the codebase. (TODO carried in this spec for visibility.)

## Page structure

```
<section class="container-page">

  <p class="text-eyebrow text-muted">03 / Skills & Certificates</p>
  <h2 class="text-display-lg text-foreground mt-4">Toolkit & credentials</h2>

  <div class="border-t border-border mt-8" aria-hidden></div>

  <div class="mt-8">
    <p class="text-eyebrow text-muted">My stack</p>

    <SkillCategory label="Frontend" skills={...} class="mt-8" />
    <SkillCategory label="Backend"  skills={...} class="mt-8" />
    <SkillCategory label="Platform" skills={...} class="mt-8" />
  </div>

  <div class="mt-16">
    <p class="text-eyebrow text-muted">Credentials</p>

    <ul class="mt-8 list-none p-0">
      {sortedCertificates.map(cert => <li><CompactCertificateRow ... /></li>)}
    </ul>
  </div>

</section>
```

**Vertical rhythm:**
- Eyebrow → `mt-4` → page title.
- Page title → `mt-8` → separator.
- Separator → `mt-8` → "My stack" eyebrow.
- "My stack" → `mt-8` → first category.
- Category → `mt-8` → next category.
- Last category → `mt-16` → "Credentials" eyebrow.
- "Credentials" → `mt-8` → first cert row.
- Cert rows internally separated by `border-b border-border py-4`; last row `last:border-b-0`.

The page is one `<section>` with `.container-page`. No `min-h-screen`, no nested sections, no hand-tuned heights.

## Skill data reshape

### Type changes (`utils/types.ts`)

```ts
// Drop the position field — the layout no longer uses absolute positioning.
export type TSkillData = {
  src: string;
  name: string;
};

// New: category grouping.
export type TSkillCategory = {
  label: string;
  skills: TSkillData[];
};
```

### Data changes (`utils/constants/index.ts`)

`skillsData` (flat with positions) → `skillCategories: TSkillCategory[]` (3 categories). All 17 existing icons preserved; positions removed; categorization derived from the existing comment-row groupings:

```ts
export const skillCategories: TSkillCategory[] = [
  {
    label: "Frontend",
    skills: [
      { src: "/images/skills/ts.png", name: "TypeScript" },
      { src: "/images/skills/react.png", name: "React" },
      { src: "/images/skills/next-js.png", name: "Next.js" },
      { src: "/images/skills/tailwind-css.png", name: "Tailwind CSS" },
      { src: "/images/skills/zustand.png", name: "Zustand" },
      { src: "/images/skills/react-query.png", name: "React Query" },
      { src: "/images/skills/zod.png", name: "Zod" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { src: "/images/skills/java.png", name: "Java" },
      { src: "/images/skills/nodejs-express-js.png", name: "Node.js" },
      { src: "/images/skills/prisma.png", name: "Prisma" },
      { src: "/images/skills/postgresql.png", name: "PostgreSQL" },
      { src: "/images/skills/mysql.png", name: "MySQL" },
    ],
  },
  {
    label: "Platform",
    skills: [
      { src: "/images/skills/aws.png", name: "AWS" },
      { src: "/images/skills/aws-s3.png", name: "AWS S3" },
      { src: "/images/skills/docker.png", name: "Docker" },
      { src: "/images/skills/terraform.png", name: "Terraform" },
      { src: "/images/skills/git.png", name: "Git" },
    ],
  },
];
```

The old `skillsData` symbol is removed. Only `Skills-certificates/index.tsx` imports it; no other call sites.

## SkillCategory

`components/Skills-certificates/components/skill-category.tsx`. Thin `"use client"` wrapper that renders one category's row + applies the reveal class.

### Props

```ts
type SkillCategoryProps = {
  label: string;
  skills: readonly TSkillData[];
  delayMs?: number;          // for the reveal stagger; passed by parent
  className?: string;        // for layout positioning (e.g., "mt-8") from parent
};
```

### Composition

```tsx
"use client";

import Image from "next/image";
import type { TSkillData } from "@/portfolio/utils/types";
import { useReveal } from "./use-reveal";

type SkillCategoryProps = {
  label: string;
  skills: readonly TSkillData[];
  delayMs?: number;
  className?: string;
};

function SkillChip({ src, name }: TSkillData) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-2 py-1 text-small font-mono text-foreground">
      <Image
        src={src}
        alt=""
        width={16}
        height={16}
        className="size-4 object-contain"
      />
      <span>{name}</span>
    </span>
  );
}

export default function SkillCategory({
  label,
  skills,
  delayMs = 0,
  className,
}: SkillCategoryProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={{ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties}
    >
      <p className="text-eyebrow text-muted">{label}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill) => (
          <SkillChip key={skill.name} src={skill.src} name={skill.name} />
        ))}
      </div>
    </section>
  );
}
```

`SkillChip` is a private file-local helper. Icon `alt=""` because the visible `<span>{name}</span>` is the accessible label; the icon is decorative.

## CompactCertificateRow

`components/Skills-certificates/components/compact-certificate-row.tsx`. Thin `"use client"` wrapper that renders one cert + applies the reveal class.

### Props

```ts
type CompactCertificateRowProps = {
  title: string;
  issuer: string;
  date: string;            // ISO date string
  alt: string;             // for thumbnail/embed accessible name
  imageSrc?: string;
  embed?: { provider: "credly"; badgeId: string };
  verifyHref?: string;
  delayMs?: number;
};
```

### Composition

```tsx
"use client";

import Image from "next/image";
import { useReveal } from "./use-reveal";

type CompactCertificateRowProps = {
  title: string;
  issuer: string;
  date: string;
  alt: string;
  imageSrc?: string;
  embed?: { provider: "credly"; badgeId: string };
  verifyHref?: string;
  delayMs?: number;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function CredlyBadge({ badgeId, alt }: { badgeId: string; alt: string }) {
  return (
    <div className="grid place-items-center size-full p-2" aria-label={alt}>
      <div
        data-iframe-width="80"
        data-iframe-height="80"
        data-share-badge-id={badgeId}
        data-share-badge-host="https://www.credly.com"
      />
    </div>
  );
}

export default function CompactCertificateRow({
  title,
  issuer,
  date,
  alt,
  imageSrc,
  embed,
  verifyHref,
  delayMs = 0,
}: CompactCertificateRowProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className="reveal flex gap-4 py-4 border-b border-border last:border-b-0"
      style={{ "--reveal-delay": `${delayMs}ms` } as React.CSSProperties}
    >
      <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden border border-border bg-surface">
        {embed ? (
          <CredlyBadge badgeId={embed.badgeId} alt={alt} />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-heading-row text-foreground">{title}</h3>
        <p className="text-small font-mono text-muted mt-2">
          {issuer} · {formatDate(date)}
        </p>
        {verifyHref ? (
          <a
            href={verifyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-small font-mono text-muted transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent"
          >
            Verify <span aria-hidden>↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
```

`CredlyBadge` is a private file-local helper. The Credly auto-mount script (loaded at the page level) reads `data-share-badge-id` and renders an iframe sized to `data-iframe-width`/`data-iframe-height`.

`formatDate` is a private file-local helper. Server-safe `Intl.DateTimeFormat` via `toLocaleDateString`.

## useReveal hook

`components/Skills-certificates/components/use-reveal.ts`. Single-purpose hook. ~25 lines.

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

`rootMargin: "0px 0px -10% 0px"` triggers slightly *before* the element fully enters the viewport, so the reveal feels natural rather than late. `threshold: 0.1` waits until 10% of the element is visible before triggering. The observer self-disconnects per element after first reveal — no continuous observation cost.

## Section orchestrator

`components/Skills-certificates/index.tsx`. Server component.

```tsx
import {
  CertificatesData,
  skillCategories,
  sectionNumbers,
} from "@/portfolio/utils/constants";
import SkillCategory from "./components/skill-category";
import CompactCertificateRow from "./components/compact-certificate-row";

const MAX_REVEAL_DELAY_MS = 400;
const CATEGORY_DELAY_MS = 80;
const CERT_DELAY_MS = 50;

export default function SkillsAndCertificatesSection() {
  const sortedCerts = [...CertificatesData].sort(
    (a, b) =>
      new Date(b.metadata?.date ?? 0).getTime() -
      new Date(a.metadata?.date ?? 0).getTime()
  );

  return (
    <section className="container-page">
      <p className="text-eyebrow text-muted">
        {sectionNumbers.skills} / Skills & Certificates
      </p>

      <h2 className="text-display-lg text-foreground mt-4">
        Toolkit & credentials
      </h2>

      <div className="border-t border-border mt-8" aria-hidden />

      <div className="mt-8">
        <p className="text-eyebrow text-muted">My stack</p>

        {skillCategories.map((category, i) => (
          <SkillCategory
            key={category.label}
            label={category.label}
            skills={category.skills}
            delayMs={i * CATEGORY_DELAY_MS}
            className="mt-8"
          />
        ))}
      </div>

      <div className="mt-16">
        <p className="text-eyebrow text-muted">Credentials</p>

        <ul className="mt-8 list-none p-0">
          {sortedCerts.map((cert, i) => {
            const verifyHref =
              cert.link.href && cert.link.href !== "#"
                ? cert.link.href
                : undefined;

            const delayMs = Math.min(i * CERT_DELAY_MS, MAX_REVEAL_DELAY_MS);

            return (
              <li key={cert.id}>
                <CompactCertificateRow
                  title={cert.metadata?.title ?? cert.alt}
                  issuer={cert.metadata?.issuer ?? ""}
                  date={cert.metadata?.date ?? ""}
                  alt={cert.alt}
                  imageSrc={cert.src}
                  embed={cert.embed}
                  verifyHref={verifyHref}
                  delayMs={delayMs}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

`sectionNumbers.skills` resolves to `"03"` (from spec 2a's `sectionNumbers` constant).

## Reveal CSS

Append to `app/globals.css`, inside the existing `@layer components` block, after `.text-heading-row`:

```css

  .reveal {
    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity 0.5s ease-out,
      transform 0.5s ease-out;
    transition-delay: var(--reveal-delay, 0ms);
  }
  .reveal[data-revealed="true"] {
    opacity: 1;
    transform: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal,
    .reveal[data-revealed="true"] {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
```

One new component class, plus the `--reveal-delay` CSS variable used inline. Spec 3 is free to extend or replace.

## File-level changes

| File | Change |
|---|---|
| `components/Skills-certificates/index.tsx` | Rewrite. Server component. |
| `components/Skills-certificates/components/skill-category.tsx` | New. ~50 lines. `"use client"`. |
| `components/Skills-certificates/components/compact-certificate-row.tsx` | New. ~95 lines. `"use client"`. |
| `components/Skills-certificates/components/use-reveal.ts` | New. ~25 lines. `"use client"`. |
| `components/Skills-certificates/components/image-collage.tsx` | **Delete.** |
| `components/Skills-certificates/components/certificates.tsx` | **Delete.** |
| `components/Skills-certificates/components/tags.tsx` | **Delete.** |
| `utils/types.ts` | Modify. Drop `position` from `TSkillData`. Add `TSkillCategory`. |
| `utils/constants/index.ts` | Modify. Replace `skillsData` with `skillCategories`. |
| `utils/hooks/useIsSmallDevice.ts` | **Delete if unused.** Verify no consumers remain after this spec. |
| `components/modal-image.tsx` | **Delete if unused.** Verify no consumers remain after this spec. |
| `app/globals.css` | Modify. Append `.reveal` rule and `prefers-reduced-motion` override inside `@layer components`. |
| `docs/superpowers/notes/spec-2-input.md` | Modify. Strike Skills-certificates entries; add to "Migrated" subsection. |

## Design system contract

### Color tokens

| Use | Class |
|---|---|
| Page background | inherits `bg-background` |
| Default text | `text-foreground` |
| Eyebrow, issuer/date, verify-link rest | `text-muted` |
| Skill chip surface | `bg-surface` + `border border-border` |
| Cert thumbnail border + fill | `border border-border` + `bg-surface` |
| Hover accents | `hover:text-foreground`, `hover:underline`, `decoration-accent` |

### Typography

| Element | Class |
|---|---|
| Page eyebrow, subsection eyebrows, category labels | `text-eyebrow text-muted` |
| Page title | `text-display-lg text-foreground` |
| Cert row title | `text-heading-row text-foreground` |
| Skill chip label | `text-small font-mono text-foreground` |
| Issuer · date, verify link | `text-small font-mono text-muted` |

### Spacing rhythm (4-stop)

| Step | Use |
|---|---|
| `gap-2`, `mt-2`, `p-2` | Icon ↔ chip label, eyebrow ↔ tag/date row, Credly badge inset, between cert metadata lines |
| `gap-4`, `mt-4`, `py-4` | Inside compact rows, between chips |
| `gap-8`, `mt-8` | Between page title and content, between subsection eyebrow and first item, between categories |
| `mt-16` | "My stack" subsection → "Credentials" subsection |

### Border radius

- `rounded-md` — chips, cert thumbnails.
- `rounded-xl` — not used.
- `rounded-full` — not used.

### Allowed deviations

- One new CSS class `.reveal` + `--reveal-delay` CSS variable. One-time addition; not a new utility scale.
- `size-4` (Tailwind built-in for 1rem×1rem) — used on the chip icon. Allowed.
- `w-24 h-24` thumbnail — Tailwind defaults.
- `gap-y-1` in any wrap row (precedent from spec 2a/2b — none expected here, but allowed if a future tweak needs it).
- Credly `data-iframe-*` attributes are API parameters, not classes.

### Forbidden

- `bg-gray-*`, `text-gray-*`, `border-gray-*`, `border-amber-*`, `bg-blue-*`, `text-blue-*`, `bg-white`, `bg-black`, including `dark:` / `light:` variants.
- Off-rhythm gaps: `gap-3`, `gap-5`, `gap-6`, `gap-7`, `gap-9`–`14`. Same for `p-`, `m-`, etc.
- Raw hex literals or `bg-[#...]`.
- `font:` shorthand with `var()`.
- Tailwind default font-size utilities (`text-xs`, `text-xl`, `text-base`).
- `useState`, `useEffect` outside `<SkillCategory>`, `<CompactCertificateRow>`, and `useReveal`. The orchestrator is server.
- `gsap` imports anywhere under `components/Skills-certificates/`.
- `<ImageModal />` imports anywhere under `components/Skills-certificates/`.
- `min-h-screen` anywhere in this section.

## Acceptance criteria

1. `bun run build` and `bun dev` complete with no new warnings.
2. `/skills-and-certificates` renders:
   - `03 / Skills & Certificates` eyebrow, `Toolkit & credentials` Fraunces heading, separator.
   - `My stack` subsection with three categorized rows (Frontend / Backend / Platform), each chip is `[icon] Name` in a palette-tinted pill.
   - `Credentials` subsection with sorted compact rows (newest first), each row showing thumbnail, title, `Issuer · Date`, optional `Verify ↗`.
3. On scroll, skill categories and cert rows fade-and-rise into view in stagger order. With `prefers-reduced-motion: reduce` set, all elements appear at full opacity immediately and never animate.
4. Theme toggle works in both modes.
5. 360px-wide viewport: chips wrap cleanly; cert rows stay legible (96×96 thumbnail does not crowd the content column to unreadable width).
6. No GSAP imports under `components/Skills-certificates/`.
7. No `<ImageModal />` import anywhere on `/skills-and-certificates`.
8. `useIsSmallDevice` hook either deleted (preferred) or marked for spec 2e removal if any consumer remains. Confirm via grep.
9. `components/modal-image.tsx` either deleted (preferred) or marked for spec 2e removal if any consumer remains. Confirm via grep.
10. Grep `components/Skills-certificates/**` for off-palette utilities returns zero matches: `rg -n "(^|\s|:)(bg|text|border)-(white|black|gray-\d+|blue-\d+|amber-\d+)" components/Skills-certificates/`.
11. Grep `components/Skills-certificates/**` for off-rhythm spacing returns zero matches.
12. Grep `components/Skills-certificates/**` for hex literals or arbitrary color values returns zero matches.
13. Audit doc updated: every `Skills-certificates/**` entry struck from the four findings sections; the new files (`skill-category.tsx`, `compact-certificate-row.tsx`, `use-reveal.ts`) and the rewritten `index.tsx` appear in the "Migrated" subsection.

## Lean guardrails

- 4 files in `components/Skills-certificates/components/` (skill-category, compact-certificate-row, use-reveal, plus the orchestrator). Net file count unchanged from before this spec.
- One new CSS class (`.reveal`) + one CSS variable (`--reveal-delay`).
- Two type changes (drop `TSkillData.position`, add `TSkillCategory`).
- One data structure rename (`skillsData` → `skillCategories`).
- Three confirmed file deletions (`image-collage.tsx`, `certificates.tsx`, `tags.tsx`) + two conditional deletions (`useIsSmallDevice.ts`, `modal-image.tsx`) gated on no remaining consumers.
- No new dependencies.

## Carried forward / cleanup notes (out of scope for this spec)

- Once spec 3 actually removes the `gsap` package from the bundle, update the Portfolio project's `tags` array in `utils/constants/index.ts` to drop `"GSAP"`. Tracked here so it isn't lost.
- If spec 2e (shared chrome) finds the Navbar drawer is the last GSAP consumer, it can decide whether to migrate that to CSS or keep GSAP for spec 3 to address.

## Open questions

None at this stage. Implementation plan will be produced by the writing-plans skill in the next step.
