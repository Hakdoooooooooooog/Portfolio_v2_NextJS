# Skills & Certificates Redesign Implementation Plan (Spec 2c)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/skills-and-certificates` (today: a GSAP-driven floating-icon collage + 3-column cert grid with image modal) with a server-rendered page that has three categorized rows of skill chips and a sorted compact list of certificate rows. Add a small CSS-only fade-and-rise reveal-on-scroll for those rows. Delete the now-unused `useIsSmallDevice` hook and `modal-image.tsx` (verified to have no other consumers).

**Architecture:** Eight sequential changes. (1) Reshape `TSkillData` and add `TSkillCategory` to types. (2) Replace `skillsData` with `skillCategories` in constants. (3) Append `.reveal` rule to globals.css. (4) Create `useReveal` hook. (5) Create `<SkillCategory>`. (6) Create `<CompactCertificateRow>`. (7) Rewrite `Skills-certificates/index.tsx` and delete the three obsolete subcomponents (`image-collage.tsx`, `certificates.tsx`, `tags.tsx`) plus `useIsSmallDevice` hook and `modal-image.tsx`. (8) Update audit doc and verify acceptance.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, `next/font/google`, Bun. No new dependencies. Native `IntersectionObserver` for the reveal hook (replacing GSAP `ScrollTrigger`).

**Testing reality:** No test runner configured. Verification per task is `bun run build`, manual browser checks (light + dark, desktop + 360px mobile, with and without `prefers-reduced-motion`), and grep gates against the foundation's audit categories.

**Reference spec:** `docs/superpowers/specs/2026-05-05-skills-certificates-redesign-design.md`.

---

## File map

| File | Disposition |
|---|---|
| `utils/types.ts` | Modify — drop `position` from `TSkillData`; add `TSkillCategory` (Task 1) |
| `utils/constants/index.ts` | Modify — replace `skillsData` with `skillCategories` (Task 2) |
| `app/globals.css` | Modify — append `.reveal` rule + `prefers-reduced-motion` override (Task 3) |
| `components/Skills-certificates/components/use-reveal.ts` | Create (Task 4) |
| `components/Skills-certificates/components/skill-category.tsx` | Create (Task 5) |
| `components/Skills-certificates/components/compact-certificate-row.tsx` | Create (Task 6) |
| `components/Skills-certificates/index.tsx` | Rewrite — server component orchestrator (Task 7) |
| `components/Skills-certificates/components/image-collage.tsx` | Delete (Task 7) |
| `components/Skills-certificates/components/certificates.tsx` | Delete (Task 7) |
| `components/Skills-certificates/components/tags.tsx` | Delete (Task 7) |
| `utils/hooks/useIsSmallDevice.ts` | Delete (Task 7) |
| `components/modal-image.tsx` | Delete (Task 7) |
| `docs/superpowers/notes/spec-2-input.md` | Modify — strike Skills-certificates entries; add to "Migrated" subsection (Task 8) |

Note on the `utils/hooks/` directory: after `useIsSmallDevice.ts` is removed, the directory may be empty. Bun/Next don't care about empty directories; if `git rm` leaves the directory empty, that's fine.

---

## Task 1: Reshape `TSkillData`, add `TSkillCategory`

**Files:**
- Modify: `utils/types.ts`

- [ ] **Step 1: Open `utils/types.ts` and locate `TSkillData` (around lines 26–30)**

It currently looks like:

```ts
export type TSkillData = {
  src: string;
  name: string;
  position: { x: number; y: number };
};
```

- [ ] **Step 2: Replace it with the new shape and add `TSkillCategory`**

Replace the entire `TSkillData` block with:

```ts
export type TSkillData = {
  src: string;
  name: string;
};

export type TSkillCategory = {
  label: string;
  skills: TSkillData[];
};
```

The `position` field is removed (no longer used after the redesign drops absolute positioning). `TSkillCategory` is new.

- [ ] **Step 3: Verify the build is currently broken (expected)**

Run: `bun run build`
Expected: BUILD FAILS. The existing `skillsData` in `utils/constants/index.ts` still has `position` fields, which the new `TSkillData` no longer permits. This is the expected intermediate state — Task 2 fixes the data shape to match the new type.

- [ ] **Step 4: Commit**

```bash
git add utils/types.ts
git commit -m "feat(skills): reshape TSkillData, add TSkillCategory"
```

> Note: this is a deliberate broken intermediate commit. The build is fixed in the very next task. If you want to avoid the broken commit on the timeline, an alternative is to combine Task 1 + Task 2 into a single commit — but keeping them separate makes review easier and the broken-state window is one commit. The plan's stance: keep them separate.

---

## Task 2: Replace `skillsData` with `skillCategories`

**Files:**
- Modify: `utils/constants/index.ts`

- [ ] **Step 1: Open `utils/constants/index.ts` and locate the `skillsData` array (around lines 33–60)**

It currently has 17 entries with `{ src, name, position: { x, y } }` shape, plus comment headers like `// Row 1 (y=-150): Infra / cloud`.

- [ ] **Step 2: Replace the entire `skillsData` declaration with `skillCategories`**

Find the leading comment `// 4-row × 5-column grid: x ∈ {-200, -100, 0, 100, 200}, y ∈ {-150, -50, 50, 150}.` and the `skillsData` array that follows it. Replace **both the comment block and the array** with:

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

- [ ] **Step 3: Update the import at the top of the file**

Find the import line at the top of `utils/constants/index.ts`:

```ts
import {
  TCertificate,
  TNavigationLink,
  TProjectData,
  TSkillData,
} from "../types";
```

Replace `TSkillData` with `TSkillCategory`:

```ts
import {
  TCertificate,
  TNavigationLink,
  TProjectData,
  TSkillCategory,
} from "../types";
```

`TSkillData` is now an internal type used only inside `TSkillCategory.skills`; the constants file doesn't reference it directly.

- [ ] **Step 4: Verify build now succeeds**

Run: `bun run build`
Expected: build COMPLETES. The old `skillsData` symbol is gone; the consumer (`Skills-certificates/index.tsx`) still imports `skillsData` and will error — but that file is deleted/rewritten in Task 7. Bun will warn about the broken import but the build prerendering may pass. **If the build fails on a missing `skillsData` import, that's expected** — Task 7 fixes it. Move on.

> Reality check: the build may legitimately fail here because `Skills-certificates/index.tsx` imports `skillsData` which no longer exists. If it does, this is the second deliberate broken-intermediate commit. Both Task 1 and Task 2 land code changes that aren't fully consistent until Task 7. The trade-off (broken intermediates vs giant single-task commit) was decided in favor of small, focused commits.

If the build fails with `Module has no exported member 'skillsData'` from `components/Skills-certificates/index.tsx`, that's the expected state. Continue to Step 5.

If the build fails on anything else (a typo in the new constant, a missing icon path), fix it before committing.

- [ ] **Step 5: Commit**

```bash
git add utils/constants/index.ts
git commit -m "feat(skills): replace skillsData with categorized skillCategories"
```

---

## Task 3: Append `.reveal` CSS rule

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Locate the `.text-heading-row` rule inside `@layer components`**

After spec 2b, `@layer components` contains: typography classes, `.name-underline`, `.text-heading-row`, `.container-page`, `.bg-grid-pattern`. The new rule goes immediately after `.text-heading-row` and before `.container-page`.

- [ ] **Step 2: Insert the `.reveal` rule and `prefers-reduced-motion` override**

Immediately after the `.text-heading-row { ... }` declaration (which ends with `letter-spacing: -0.005em; }`) and before the `/* Single canonical content container. */` comment, insert:

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

- [ ] **Step 3: Verify the build succeeds**

Run: `bun run build`
Expected: build still in the broken state from Task 2 (the missing `skillsData` import). The CSS additions don't introduce new errors. If the build now passes, that means Task 2 didn't actually break anything (Bun may be more permissive than expected with missing imports during prerender — fine either way).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat(skills): add .reveal class for CSS-only scroll reveal"
```

---

## Task 4: Create `useReveal` hook

**Files:**
- Create: `components/Skills-certificates/components/use-reveal.ts`

- [ ] **Step 1: Create the new file with this exact content**

Create `components/Skills-certificates/components/use-reveal.ts`:

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

> Notes:
> - `"use client"` because `IntersectionObserver` and `useEffect` are client-only.
> - The observer self-disconnects per element on first reveal (`observer.unobserve(entry.target)`), so once a row has revealed, no further observation cost for that element.
> - The hook returns a `ref` typed by the caller; consumers spread it onto their root element.

- [ ] **Step 2: Verify the build still progresses (or stays in expected broken state)**

Run: `bun run build`
Expected: same state as after Task 3 — broken `skillsData` import in `Skills-certificates/index.tsx` is the only issue (Task 7 fixes). The new `use-reveal.ts` is unused at this point and TypeScript checks it in isolation.

- [ ] **Step 3: Commit**

```bash
git add components/Skills-certificates/components/use-reveal.ts
git commit -m "feat(skills): add useReveal IntersectionObserver hook"
```

---

## Task 5: Create `<SkillCategory />`

**Files:**
- Create: `components/Skills-certificates/components/skill-category.tsx`

- [ ] **Step 1: Create the new file with this exact content**

Create `components/Skills-certificates/components/skill-category.tsx`:

```tsx
"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
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
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
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

> Notes:
> - `"use client"` because `useReveal` calls `useEffect`/`IntersectionObserver`.
> - `SkillChip` is a private file-local helper — not exported.
> - Icon `alt=""`: the visible `<span>{name}</span>` is the accessible label; the icon is decorative.
> - The `as CSSProperties` cast keeps TypeScript happy with the custom `--reveal-delay` CSS variable in the inline `style` object.

- [ ] **Step 2: Verify the build progresses**

Run: `bun run build`
Expected: same intermediate state — TypeScript checks the new file in isolation and it passes; the `Skills-certificates/index.tsx` consumer is the only thing still broken.

- [ ] **Step 3: Commit**

```bash
git add components/Skills-certificates/components/skill-category.tsx
git commit -m "feat(skills): add SkillCategory component"
```

---

## Task 6: Create `<CompactCertificateRow />`

**Files:**
- Create: `components/Skills-certificates/components/compact-certificate-row.tsx`

- [ ] **Step 1: Create the new file with this exact content**

Create `components/Skills-certificates/components/compact-certificate-row.tsx`:

```tsx
"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
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
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
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

> Notes:
> - `formatDate` and `CredlyBadge` are file-local helpers, not exported.
> - The Credly auto-mount script (whatever loads it today — likely from `app/(root)/[slug]/page.tsx` or a `<Script>` in `app/layout.tsx`) reads `data-share-badge-id` and renders an iframe sized by `data-iframe-width` / `data-iframe-height`. We're shrinking the badge to fit the 96×96 thumbnail with 8px (`p-2`) inset.
> - `<article>` instead of `<div>` for semantic correctness on a list of credential entries.

- [ ] **Step 2: Verify the build progresses**

Run: `bun run build`
Expected: same intermediate state. The new file passes its own TypeScript checks.

- [ ] **Step 3: Commit**

```bash
git add components/Skills-certificates/components/compact-certificate-row.tsx
git commit -m "feat(skills): add CompactCertificateRow component"
```

---

## Task 7: Rewrite section orchestrator and delete obsolete files

**Files:**
- Rewrite: `components/Skills-certificates/index.tsx`
- Delete: `components/Skills-certificates/components/image-collage.tsx`
- Delete: `components/Skills-certificates/components/certificates.tsx`
- Delete: `components/Skills-certificates/components/tags.tsx`
- Delete: `utils/hooks/useIsSmallDevice.ts`
- Delete: `components/modal-image.tsx`

- [ ] **Step 1: Read `components/Skills-certificates/index.tsx`**

Confirm it's the current GSAP-driven version that imports `skillsData`, `CertificatesData`, `ImageCollage`, `Certificates`, `gsap`, and `ScrollTrigger`.

- [ ] **Step 2: Overwrite `components/Skills-certificates/index.tsx`**

Replace the entire file with this exact content:

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

> Notes:
> - Server component (no `"use client"`).
> - `[...CertificatesData].sort(...)` avoids mutating the imported constant.
> - Reveal delays: categories stagger by 80ms (3 categories → max 160ms). Certs stagger by 50ms but capped at 400ms total (so a long cert list doesn't have late items appearing seconds later).
> - `sectionNumbers.skills` resolves to `"03"` (defined in `utils/constants/index.ts` from spec 2a).

- [ ] **Step 3: Delete the three obsolete subcomponents**

Run:

```bash
git rm components/Skills-certificates/components/image-collage.tsx
git rm components/Skills-certificates/components/certificates.tsx
git rm components/Skills-certificates/components/tags.tsx
```

- [ ] **Step 4: Delete `useIsSmallDevice` hook**

Run:

```bash
git rm utils/hooks/useIsSmallDevice.ts
```

If `utils/hooks/` becomes empty after this, that's expected and fine.

- [ ] **Step 5: Delete `modal-image.tsx`**

Run:

```bash
git rm components/modal-image.tsx
```

After this, `<ImageModal />` no longer exists in the codebase. The only consumer was `Skills-certificates/components/certificates.tsx`, deleted in Step 3.

- [ ] **Step 6: Verify the build now succeeds**

Run: `bun run build`
Expected: build completes. All broken imports from earlier intermediate states are now resolved. `/skills-and-certificates` is rendered statically by Next.

- [ ] **Step 7: Smoke-test the dev server**

Run: `bun dev`. Open `http://localhost:3000/skills-and-certificates`.

Expected (dark mode):
- `03 / Skills & Certificates` eyebrow at top.
- `Toolkit & credentials` Fraunces heading below.
- Hairline `border-border` separator.
- `My stack` mono eyebrow.
- Three category rows (Frontend with 7 chips, Backend with 5, Platform with 5). Each chip is `[icon] Name` in a palette-tinted pill.
- `Credentials` mono eyebrow below.
- N compact rows of certificates, sorted newest-first. Each row: 96×96 thumbnail (image or Credly badge), title, `Issuer · Date`, optional `Verify ↗`.
- On scroll, skill categories and cert rows fade-and-rise into view in stagger order.

Toggle theme: both modes render cleanly.

In DevTools, simulate `prefers-reduced-motion: reduce` (Rendering panel → "Emulate CSS media feature prefers-reduced-motion" → "reduce"). Reload. Expected: all elements appear at full opacity immediately, no animation.

Resize to 360px. Chips wrap; cert rows still legible.

Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add components/Skills-certificates/index.tsx components/Skills-certificates/components/image-collage.tsx components/Skills-certificates/components/certificates.tsx components/Skills-certificates/components/tags.tsx utils/hooks/useIsSmallDevice.ts components/modal-image.tsx
git commit -m "feat(skills): rewrite as categorized chips + compact cert list, drop GSAP/modal"
```

> Note: `git rm` already staged the deletions in Steps 3–5. The `git add` for the rewritten `index.tsx` covers the modification. Including the deleted paths in `git add` is a no-op for them but harmless; the commit captures all changes (1 modified + 5 deleted) in a single atomic commit.

---

## Task 8: Update audit doc

**Files:**
- Modify: `docs/superpowers/notes/spec-2-input.md`

- [ ] **Step 1: Open `docs/superpowers/notes/spec-2-input.md`**

The doc has four findings sections plus a "Migrated to the new tokens" subsection (added in spec 2a, extended in 2b).

- [ ] **Step 2: Remove every line that references `components/Skills-certificates/` or `components/modal-image.tsx`**

In each of the four findings sections, delete every bullet starting with:
- `- components/Skills-certificates/`
- `- components/modal-image`

Do NOT delete bullets for other components (Navbar, Experiences, Switch, Footer, Button, Separator).

- [ ] **Step 3: Add Skills & Certificates entries to the "Migrated" subsection**

Find the "## Migrated to the new tokens (out of scope for spec 2 onward)" subsection. Append these bullets to the END of its existing bullet list:

```markdown
- `components/Skills-certificates/index.tsx` — rewritten in spec 2c (Skills & Certificates redesign).
- `components/Skills-certificates/components/skill-category.tsx` — created in spec 2c; uses tokens from inception.
- `components/Skills-certificates/components/compact-certificate-row.tsx` — created in spec 2c; uses tokens from inception.
- `components/Skills-certificates/components/use-reveal.ts` — created in spec 2c; CSS-only reveal hook.
- `components/Skills-certificates/components/image-collage.tsx` — deleted in spec 2c.
- `components/Skills-certificates/components/certificates.tsx` — deleted in spec 2c.
- `components/Skills-certificates/components/tags.tsx` — deleted in spec 2c.
- `utils/hooks/useIsSmallDevice.ts` — deleted in spec 2c (no remaining consumers).
- `components/modal-image.tsx` — deleted in spec 2c (no remaining consumers).
```

- [ ] **Step 4: Verify by re-running the Skills-certificates greps**

Run from the repo root:

```
rg -n "(^|\\s|:)(bg|text|border)-(white|black|gray-\\d+|blue-\\d+|amber-\\d+)" components/Skills-certificates/
rg -n "\\b(gap|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(3|5|6|7|9|10|11|12|14)\\b" components/Skills-certificates/
rg -n "#[0-9A-Fa-f]{6}\\b" components/Skills-certificates/
rg -n "bg-\\[#|text-\\[#|border-\\[#" components/Skills-certificates/
rg -n "gsap|ImageModal|min-h-screen" components/Skills-certificates/
```

Expected: every command returns zero results.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/notes/spec-2-input.md
git commit -m "docs: mark Skills & Certificates as migrated in spec-2 audit"
```

---

## Task 9: Final acceptance walk-through

**Files:** none (verification only).

- [ ] **Step 1: Build clean**

Run: `bun run build`
Expected: build completes. No new warnings.

- [ ] **Step 2: Visual checklist on the dev server**

Run: `bun dev`. Visit `http://localhost:3000/skills-and-certificates`.

Walk every item from §Acceptance criteria of the spec:
- Eyebrow + heading + separator at top ✓
- `My stack` subsection with 3 categorized chip rows ✓
- `Credentials` subsection with sorted compact rows ✓
- Reveal-on-scroll fade-and-rise ✓
- `prefers-reduced-motion: reduce` disables animation ✓
- Theme toggle works ✓
- 360px viewport: chips wrap, rows legible ✓

- [ ] **Step 3: Confirm no client-only behaviors leaked into the orchestrator**

Inspect `components/Skills-certificates/index.tsx`. It must NOT contain `"use client"`. The only client components on the page are `<SkillCategory>`, `<CompactCertificateRow>`, and the `useReveal` hook they share.

- [ ] **Step 4: Confirm GSAP is gone from this page's bundle**

In DevTools → Network → JS, hard-refresh `/skills-and-certificates`. Expected: no chunk containing `gsap` or `ScrollTrigger` for this route. (Other routes may still import GSAP — out of scope; spec 3 owns full GSAP removal.)

- [ ] **Step 5: Confirm `useIsSmallDevice` and `modal-image` are gone**

Run from repo root:

```
rg -n "useIsSmallDevice" .
rg -n "modal-image" .
rg -n "ImageModal" .
```

Each should return zero results (or only matches inside `docs/`, which is acceptable — those are historical references in audit/spec docs).

- [ ] **Step 6: Final summary**

Run: `git log --oneline -10`
Expected: nine commits visible (Tasks 1–8 produce 8 commits; Task 9 has no commit unless a fix was needed) plus the spec commit (`48a57c0`) above them.

Spec 2c is complete. Spec 2d (Experiences) is the next sub-spec.

---

## Self-review notes

- **Spec coverage:** every section of `docs/superpowers/specs/2026-05-05-skills-certificates-redesign-design.md` maps to a task. Type changes → Task 1. Data changes → Task 2. `.reveal` CSS → Task 3. `useReveal` → Task 4. `<SkillCategory>` → Task 5. `<CompactCertificateRow>` → Task 6. Orchestrator + deletions → Task 7. Audit + verification → Tasks 8 + 9.
- **Placeholder scan:** no "TBD"s, no "similar to above", no vague "handle errors". Every code block is the full code. Every command has its expected outcome (including the deliberate broken intermediate states in Tasks 1, 2, 3, 4, 5, 6 — explicitly called out).
- **Type consistency:**
  - `TSkillData` (post-Task-1) is used in Task 5's `<SkillCategory>` props (`skills: readonly TSkillData[]`).
  - `TSkillCategory` (Task 1) is used in Task 2's data declaration and Task 7's import in `index.tsx`.
  - `useReveal<T extends HTMLElement>()` (Task 4) is consumed by Task 5 (`useReveal<HTMLElement>()`) and Task 6 (`useReveal<HTMLElement>()`).
  - `--reveal-delay` CSS variable (Task 3) is set inline by Task 5 and Task 6 via `style={{ "--reveal-delay": "...ms" } as CSSProperties}`.
  - `CompactCertificateRowProps` (Task 6) is consumed by name in Task 7's `index.tsx` (via the props passed to `<CompactCertificateRow>`).
  - `MAX_REVEAL_DELAY_MS`, `CATEGORY_DELAY_MS`, `CERT_DELAY_MS` are defined in Task 7 and used only inside `index.tsx` — no cross-file consistency surface.
- **Broken intermediate states acknowledged:** Tasks 1 and 2 produce a build that fails on the missing `skillsData` import in `Skills-certificates/index.tsx`; Task 7 fixes it. The plan calls this out explicitly so reviewers don't spend time investigating "is the build supposed to be broken?" at intermediate task SHAs.
