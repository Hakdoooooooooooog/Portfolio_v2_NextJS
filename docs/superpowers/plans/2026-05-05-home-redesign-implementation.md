# Home Redesign Implementation Plan (Spec 2a)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current symmetric Home hero (with GSAP typewriter and fixed contact drawer) with an asymmetric editorial layout: 2/3 headline column, 1/3 identity column, eyebrow numbering, inline `<ContactBlock />` (Email-me CTA + 3 social icons), photo with grid-square frame, no GSAP.

**Architecture:** Six small, sequential changes — extract icon/contact JSX into a private subcomponent, add two new constants, append one CSS rule, rewrite the Home component, tweak the root layout's padding/gap, and update the audit doc. Foundation tokens are the only design vocabulary.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, `next/font/google`, Bun. No new dependencies.

**Testing reality:** No test runner. Verification per task is `bun run build`, manual browser checks (light + dark, desktop + 360px mobile), and grep gates against the audit categories. Each task has explicit check commands.

**Reference spec:** `docs/superpowers/specs/2026-05-05-home-redesign-design.md`.

---

## File map

| File | Disposition |
|---|---|
| `utils/constants/index.ts` | Modify — add `STACK` and `SECTION_NUMBERS` constants (Task 1) |
| `app/globals.css` | Modify — append `.name-underline` rule inside existing `@layer components` (Task 2) |
| `components/Home/components/contact-block.tsx` | Create — new file, ~95 lines (Task 3) |
| `components/Home/index.tsx` | Rewrite — ~220 lines → ~80 lines (Task 4) |
| `app/(root)/layout.tsx` | Modify — drop `px-8`, change `gap-12` → `gap-16` (Task 5) |
| `docs/superpowers/notes/spec-2-input.md` | Modify — remove `components/Home/**` entries (Task 6) |

---

## Task 1: Add `STACK` and `SECTION_NUMBERS` constants

**Files:**
- Modify: `utils/constants/index.ts`

- [ ] **Step 1: Open `utils/constants/index.ts` and locate the existing `navLinks` export (around lines 8–13)**

The `navLinks` block ends on line 13. The new constants are added immediately after it, before the existing `skillsData` block.

- [ ] **Step 2: Insert two new exports**

After `navLinks` ends (line 13) and before the `// 4-row × 5-column grid…` comment, insert:

```ts

export const STACK: readonly string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Spring Boot",
  "AWS",
  "Terraform",
  "Docker",
];

export const SECTION_NUMBERS: Record<string, string> = {
  about: "01",
  projects: "02",
  skills: "03",
  experiences: "04",
};
```

- [ ] **Step 3: Verify the build succeeds**

Run: `bun run build`
Expected: build completes; no TS errors. The new constants are pure data; nothing imports them yet.

- [ ] **Step 4: Commit**

```bash
git add utils/constants/index.ts
git commit -m "feat(home): add STACK and SECTION_NUMBERS constants"
```

---

## Task 2: Add `.name-underline` CSS rule

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Locate the existing `@layer components` block and the type-scale section inside it**

After spec 1, `@layer components` contains: typography classes (`.text-display-xl`…`.text-eyebrow`), `.container-page`, `.bg-grid-pattern`. The new rule goes inside the same layer, after `.text-eyebrow` and before `.container-page`.

- [ ] **Step 2: Insert the `.name-underline` rule after `.text-eyebrow`**

Immediately after the `.text-eyebrow { ... }` declaration (which ends with `letter-spacing: 0.08em; }`) and before the `/* Single canonical content container. */` comment, insert:

```css

  .name-underline {
    border-bottom: 2px solid var(--accent);
    padding-bottom: 0.1em;
  }
```

- [ ] **Step 3: Verify the build succeeds**

Run: `bun run build`
Expected: build completes. No CSS warnings.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat(home): add .name-underline component class"
```

---

## Task 3: Create `<ContactBlock />` subcomponent

**Files:**
- Create: `components/Home/components/contact-block.tsx`

- [ ] **Step 1: Confirm the directory `components/Home/components/` does not yet exist**

Run: `ls components/Home/`
Expected: only `index.tsx` exists. Bun/Next will create the `components/` directory implicitly when the file is written, but no other Home subcomponents exist yet.

- [ ] **Step 2: Create the file with the full content**

Create `components/Home/components/contact-block.tsx` with this exact content:

```tsx
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const GithubIcon = (props: IconProps) => (
  <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden {...props}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = (props: IconProps) => (
  <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const FacebookIcon = (props: IconProps) => (
  <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const ArrowRightIcon = (props: IconProps) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    aria-hidden
    {...props}
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
};

const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Hakdoooooooooooog",
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/darenz-jasper-hicap",
    icon: LinkedinIcon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/drnz.hcp",
    icon: FacebookIcon,
  },
];

export default function ContactBlock({ className }: { className?: string }) {
  return (
    <div className={className}>
      <a
        href="mailto:hicap.darenzjasper@gmail.com"
        className="group flex items-center justify-between gap-2 bg-accent text-accent-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:bg-accent/90"
      >
        <span>Email me</span>
        <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
      </a>

      <div className="flex gap-2 mt-4">
        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid place-items-center size-9 rounded-md border border-border text-muted transition-colors hover:text-foreground hover:border-accent"
          >
            <Icon className="size-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
```

> Note: the `ArrowRightIcon` here uses a different `<path d="…">` than today's Home file. Today's arrow is a *back* arrow (`M15 19l-7-7 7-7`); this is an explicit *right* arrow because the spec uses it as a forward "Email me →" affordance. Source: standard Heroicons-style right-arrow path, not copied from the existing inline.

- [ ] **Step 3: Verify the build succeeds**

Run: `bun run build`
Expected: build completes. The component is unused at this point; TypeScript checks the file in isolation.

- [ ] **Step 4: Commit**

```bash
git add components/Home/components/contact-block.tsx
git commit -m "feat(home): add ContactBlock subcomponent"
```

---

## Task 4: Rewrite `Home/index.tsx`

**Files:**
- Modify: `components/Home/index.tsx`

- [ ] **Step 1: Read `components/Home/index.tsx` and confirm it is the GSAP+drawer version**

Confirm the file currently has `import { gsap } from "gsap"`, `useRef` / `useState` / `useEffect`, `toggleDrawer`, `animateText`, and the fixed-position drawer JSX.

- [ ] **Step 2: Replace the entire file with the new asymmetric hero**

Overwrite `components/Home/index.tsx` with this exact content:

```tsx
import Image from "next/image";
import { SECTION_NUMBERS, STACK } from "@/portfolio/utils/constants";
import ContactBlock from "./components/contact-block";

export default function HomeSection() {
  return (
    <section className="container-page py-16">
      <p className="text-eyebrow text-muted">
        {SECTION_NUMBERS.about} / About
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 order-last md:order-first">
          <h1 className="text-display-xl hero-headline">
            Hello! My name is{" "}
            <span className="name-underline">Darenz Jasper A. Hicap</span>
          </h1>

          <p className="text-body-lg text-muted mt-8">
            Junior Full-Stack Developer at GP Synergia and Cum Laude BSIT
            graduate of Cavite State University. I engineer, automate, and
            deploy production-ready web applications — combining TypeScript,
            React, and Next.js on the frontend with Node.js and Spring Boot
            services, AWS infrastructure provisioned via Terraform, and
            containerized deployments through Docker and GitLab CI/CD.
          </p>

          <p className="text-small font-mono text-muted mt-4 flex flex-wrap gap-x-2 gap-y-1">
            {STACK.map((s, i) => (
              <span key={s}>
                {s}
                {i < STACK.length - 1 ? (
                  <span className="ml-2 text-muted/60" aria-hidden>
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </p>
        </div>

        <div className="md:col-span-1 order-first md:order-last">
          <div className="relative w-[250px] aspect-square">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-2 translate-y-2 border border-border rounded-md"
            />
            <Image
              priority
              loading="eager"
              src="/images/profile.jpg"
              alt="A picture of Darenz Jasper A. Hicap, dressed in a white barong, smiling at the camera with arms crossed."
              width={250}
              height={250}
              sizes="(max-width: 250px) 100vw, 250px"
              className="relative rounded-md w-full object-cover shadow-sm dark:shadow-none"
            />
          </div>

          <ContactBlock className="mt-8" />
        </div>
      </div>
    </section>
  );
}
```

> Notes on the rewrite:
> - The component is now a server component (no `"use client"`). Foundation removed all need for refs, state, and GSAP from this file.
> - `import { SECTION_NUMBERS, STACK } from "@/portfolio/utils/constants"` uses the project's existing alias (`@/portfolio/*` per `tsconfig.json`).
> - The `order-last md:order-first` / `order-first md:order-last` pattern stacks the identity column on top in mobile, restores it to the right column on `md:` and above. The eyebrow renders above the grid in both viewports.
> - `text-muted/60` on the `·` separator is a Tailwind opacity modifier on a token color — explicitly allowed in foundation §1.

- [ ] **Step 3: Verify the build succeeds**

Run: `bun run build`
Expected: build completes; no TS errors. The build output should be smaller — the GSAP chunk is no longer pulled in by Home.

- [ ] **Step 4: Verify dev render in both modes**

Run: `bun dev`. Open `http://localhost:3000`. Confirm:
- Eyebrow `01 / About` in mono small caps at top.
- Headline in Fraunces serif at large size; the name has a static lavender (dark) / slate (light) underline.
- Bio paragraph reads in Noto Sans, no horizontal justification (no awkward gaps).
- Stack tags `TypeScript · React · Next.js · …` in mono small text.
- Identity column on the right shows the photo with a 1px palette-tinted square offset behind it, then the `Email me →` button (lavender in dark / slate in light), then three icon buttons.
- Hovering the `Email me` button: the arrow nudges right ~4px.
- Hovering a social icon: text and border tint to accent.
- Toggle theme: all colors swap; underline color swaps.

Resize viewport to 360px wide:
- Eyebrow stays at top.
- Photo + ContactBlock stack first, then headline, bio, stack row.
- No horizontal scroll.

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add components/Home/index.tsx
git commit -m "feat(home): rewrite hero as asymmetric editorial layout"
```

---

## Task 5: Update `(root)/layout.tsx`

**Files:**
- Modify: `app/(root)/layout.tsx`

- [ ] **Step 1: Read the file**

Confirm it currently looks like:

```tsx
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-[calc(100dvh-56px)] flex-col gap-12 items-center justify-center bg-grid-pattern px-8">
      {children}
    </main>
  );
}
```

- [ ] **Step 2: Replace the `<main>` className**

Change the `<main>` element's className from:

```
relative flex min-h-[calc(100dvh-56px)] flex-col gap-12 items-center justify-center bg-grid-pattern px-8
```

to:

```
relative flex min-h-[calc(100dvh-56px)] flex-col gap-16 items-stretch bg-grid-pattern
```

> Two changes: `gap-12` → `gap-16` (foundation block-rhythm step), drop `px-8` (sections own their own horizontal padding via `.container-page`). Also `items-center justify-center` → `items-stretch` because the new sections are full-width with internal centering, not centered children of the main.

The full file becomes:

```tsx
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-[calc(100dvh-56px)] flex-col gap-16 items-stretch bg-grid-pattern">
      {children}
    </main>
  );
}
```

- [ ] **Step 3: Verify the build succeeds**

Run: `bun run build`
Expected: build completes.

- [ ] **Step 4: Verify dev render**

Run: `bun dev`. Open `http://localhost:3000`.
Expected:
- The Home page no longer has the previous `px-8` outer padding; the section's own `.container-page` (max-width 72rem, responsive padding) is the only horizontal constraint.
- The grid background still extends full width.
- The Home content is centered and bounded correctly.

Navigate to `/projects`, `/skills-and-certificates`, `/experiences`. They will look slightly off (they don't have `.container-page` yet — that's spec 2b/2c/2d's job). Confirm they still render without crashing.

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add "app/(root)/layout.tsx"
git commit -m "feat(home): drop main px-8 and bump gap to block rhythm"
```

> Note: the directory name `(root)` contains parentheses, which most shells handle fine but some configurations interpret. Quoting the path keeps it portable.

---

## Task 6: Update the audit doc

**Files:**
- Modify: `docs/superpowers/notes/spec-2-input.md`

- [ ] **Step 1: Open `docs/superpowers/notes/spec-2-input.md`**

Locate the four sections: "Raw hex literals", "Bare hex literals", "Off-palette Tailwind defaults", "Off-rhythm spacing utilities".

- [ ] **Step 2: Remove every line that references `components/Home/`**

In each of the four sections, delete every bullet starting with `- components/Home/`. Do NOT delete bullets for other components (Navbar, Projects, Experiences, Skills-certificates, Switch, Footer, Button, Modal, Separator, Image-collage, Certificates, Tags, Project-card, Experience-card, Nav-item, Nav-drawer).

If a section becomes empty as a result, replace its content with `(none)`.

- [ ] **Step 3: Add a "Migrated" subsection at the bottom (just before "Notes")**

Insert a new section heading and bullet list immediately above the "## Notes" line:

```markdown
## Migrated to the new tokens (out of scope for spec 2 onward)

- `components/Home/index.tsx` — migrated in spec 2a (Home redesign).
- `components/Home/components/contact-block.tsx` — created in spec 2a; uses tokens from inception.
```

- [ ] **Step 4: Verify by re-running the Home grep**

Run from the repo root:

```
rg -n "(^|\\s|:)(bg|text|border)-(white|black|gray-\\d+|blue-\\d+)" components/Home/
rg -n "\\b(gap|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(3|5|6|7|9|10|11|12|14)\\b" components/Home/
rg -n "#[0-9A-Fa-f]{6}\\b" components/Home/
rg -n "bg-\\[#|text-\\[#|border-\\[#" components/Home/
```

Expected: every command returns zero results.

- [ ] **Step 5: Commit**

```bash
git add docs/superpowers/notes/spec-2-input.md
git commit -m "docs: mark Home as migrated in spec-2 audit"
```

---

## Task 7: Final acceptance walk-through

**Files:** none (verification only).

- [ ] **Step 1: Build clean**

Run: `bun run build`
Expected: build completes. No new warnings.

- [ ] **Step 2: GSAP not loaded on `/`**

Run: `bun dev`. Open `http://localhost:3000` with DevTools → Network → JS filter, then hard-refresh.
Expected: no chunk containing `gsap` is downloaded for the `/` page. (Other routes may still pull GSAP — that is out of scope; they will be cleaned in later specs.)

- [ ] **Step 3: Visual checklist (light + dark, desktop + mobile)**

In the dev server, walk through every visual item from §Acceptance criteria of the spec:
- Eyebrow `01 / About` ✓
- Fraunces headline at display-xl ✓
- Static accent underline on the name ✓
- Bio in `text-body-lg`, no `text-justify` ✓
- Stack row in mono small ✓
- Photo with offset palette-tinted grid-square frame ✓
- `Email me →` CTA in palette accent ✓
- Three social icon buttons (no email icon) ✓
- Theme toggle works ✓
- 360px viewport: identity stacks first, no horizontal scroll ✓

- [ ] **Step 4: No fixed-position drawer**

In DevTools, search the page for `position: fixed`. Expected: no element with `position: fixed` on the right edge of the viewport. (The Navbar may use `sticky` or `fixed` — that is acceptable; only the old Home contact drawer should be gone.)

- [ ] **Step 5: Run the audit greps one last time**

Same four greps from Task 6 Step 4. All return zero results.

- [ ] **Step 6: Final summary commit**

If steps 1–5 pass cleanly, no commit is needed (Tasks 1–6 already produced the work). If anything in Step 3's visual checklist required a small fix, commit it as:

```bash
git add <fixed file>
git commit -m "fix(home): <what you fixed>"
```

If no fixes were needed, this task ends with a `git log --oneline -7` run to confirm the six implementation commits and one spec commit are all present.

---

## Self-review notes

- **Spec coverage:** Every section of the spec maps to a task. Eyebrow + numbering → Task 1 + 4. Headline + name underline → Task 2 + 4. Bio + stack → Task 1 + 4. Photo + grid-square → Task 4. ContactBlock → Task 3. Layout container/rhythm → Task 5. Audit update → Task 6. Acceptance criteria → Task 4 (live render checks) + Task 7 (final walk).
- **No placeholders:** Every code block is complete and copy-pasteable. The icon `<path d="…">` strings are the actual data, not "the path goes here." The new arrow-right path is documented as not-from-the-existing-source.
- **Type consistency:** `STACK` is `readonly string[]` in Task 1 and indexed via `.length` and `.map` in Task 4 — consistent. `SECTION_NUMBERS` is `Record<string, string>` in Task 1 and accessed as `SECTION_NUMBERS.about` in Task 4 — consistent (string-keyed property access). `SocialLink` is local to the contact-block file, not re-exported, so no cross-file mismatch surface.
- **Mobile ordering correctness:** Task 4 uses `order-last md:order-first` on the headline column and `order-first md:order-last` on the identity column. Combined with Tailwind's CSS Grid, this produces: mobile = identity-then-headline, desktop = headline-then-identity. The eyebrow sits outside the grid so it's always at the top.
