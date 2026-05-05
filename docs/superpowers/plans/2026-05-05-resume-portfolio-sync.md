# Resume → Portfolio Sync Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sync the portfolio's content and metadata to the user's current resume (new title, two new GP Synergia roles, new Redbiomed project, new TESDA + AWS certs, new domain) and apply a contained UI polish pass on every component being touched.

**Architecture:** Additive type changes (`bullets` on experiences, `embed` on certificates) keep existing data working unchanged. Content updates flow through `utils/constants/index.ts`. Component-level rendering changes are bounded to the four files we already need to touch (Home, Experience card, Skills+Certificates page, Layout). Telus is wrapped in a styled `<details>` rather than removed. The Credly badge script is loaded once at the page level via `next/script`.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, GSAP, Bun, no test runner — verification = `bun run lint` + `bun run build` + manual visual QA via `bun dev`.

**Spec:** `docs/superpowers/specs/2026-05-05-resume-portfolio-sync-design.md`

---

## Pre-flight: user-provided assets

Before starting Task 6 (skills) and Task 8 (AWS cert), drop these files into `public/`:

- `public/images/skills/nextjs.png` — Next.js logo, transparent PNG, ≥128×128.
- `public/images/skills/docker.png` — Docker whale, transparent PNG, ≥128×128.
- `public/images/skills/terraform.png` — HashiCorp Terraform logo, transparent PNG, ≥128×128.
- `public/images/skills/aws.png` — Generic AWS smile logo (separate from existing `aws-s3.png`), transparent PNG, ≥128×128.

`public/images/certificates/Hicap_Tesda_NCIII_Java_Programming_page-0001.jpg` is already on disk — verify with `ls public/images/certificates/` before starting Task 7.

Also confirm the **issuance dates** for the two new certs before Task 7 / Task 8 (read off the TESDA cert image and the Credly badge page at `https://www.credly.com/badges/713669d7-6115-4916-88c0-4fe38f28a964`). These are open items called out in the spec.

---

## Task 1: Type changes (`utils/types.ts`)

**Files:**
- Modify: `utils/types.ts`

- [ ] **Step 1: Update types**

Replace the entire contents of `utils/types.ts` with:

```ts
export type TCertificate = {
  id: number;
  src?: string;
  alt: string;
  embed?: {
    provider: "credly";
    badgeId: string;
    width?: number;
    height?: number;
  };
  metadata?: {
    title: string;
    description: string;
    date: string;
    issuer: string;
    tags: string[];
    image?: string;
  };
  link: {
    href: string;
    target: string;
    rel: string;
  };
};

export type TSkillData = {
  src: string;
  name: string;
  position: { x: number; y: number };
};

export type TNavigationLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

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

export type TExperienceData = {
  workInfo: {
    title: string;
    subtitle: string;
    location: string;
    startDate?: string;
    endDate?: string;
    imageData?: {
      src: string;
      alt: string;
    };
  };
  additionalInfo: {
    description?: string;
    bullets?: string[];
    skills?: string[];
    project?: {
      projectOutputLink?: string;
    };
  };
};
```

Note: `TExperienceData` did not previously live in `utils/types.ts` (the type was inline in `experience-card.tsx`). We are hoisting it here so all data shapes have one home. Task 2 also moves the export from the card file.

- [ ] **Step 2: Verify the type-check passes**

Run: `bunx tsc --noEmit`
Expected: PASS (no errors). The card file still re-defines `TExperienceData` at this point, which TypeScript allows because they're structurally equal — Task 2 fixes the duplication.

- [ ] **Step 3: Commit**

```bash
git add utils/types.ts
git commit -m "feat(types): make TCertificate.src optional and add embed; hoist TExperienceData with optional bullets"
```

---

## Task 2: Move `TExperienceData` import in the card

**Files:**
- Modify: `components/Experiences/components/experience-card.tsx`

- [ ] **Step 1: Replace the local type with an import**

In `components/Experiences/components/experience-card.tsx`, remove the local `export type TExperienceData = { ... }` block (lines 98–117) and replace it with an import at the top of the file. Add this import near the other imports:

```ts
import type { TExperienceData } from "@/portfolio/utils/types";
```

Then remove the local type block entirely.

- [ ] **Step 2: Update the experiences index to import from the new location**

In `components/Experiences/index.tsx`, the current import is:

```ts
import ExperienceCard, { TExperienceData } from "./components/experience-card";
```

Change it to:

```ts
import ExperienceCard from "./components/experience-card";
import type { TExperienceData } from "@/portfolio/utils/types";
```

- [ ] **Step 3: Type-check and lint**

Run: `bunx tsc --noEmit`
Expected: PASS.

Run: `bun run lint`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add components/Experiences/components/experience-card.tsx components/Experiences/index.tsx
git commit -m "refactor(experiences): import TExperienceData from utils/types"
```

---

## Task 3: Domain swap (`app/layout.tsx`)

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace all four hard-coded domain references**

In `app/layout.tsx`, perform these replacements:

Line 34:
```ts
metadataBase: new URL("https://darenzhicap.netlify.app"),
```
becomes:
```ts
metadataBase: new URL("https://darenzhicap.dev"),
```

Line 39:
```ts
url: "https://darenzhicap.netlify.app",
```
becomes:
```ts
url: "https://darenzhicap.dev",
```

Line 43:
```ts
url: "https://darenzhicap.netlify.app/images/site-thumbnail.png",
```
becomes:
```ts
url: "https://darenzhicap.dev/images/site-thumbnail.png",
```

Line 58:
```ts
images: ["https://darenzhicap.netlify.app/images/site-thumbnail.png"],
```
becomes:
```ts
images: ["https://darenzhicap.dev/images/site-thumbnail.png"],
```

- [ ] **Step 2: Verify no other references remain**

Run a Grep tool search across the repo for `darenzhicap\.netlify\.app`. Expected matches: only `CLAUDE.md` and `docs/superpowers/specs/...` (documentation references — leave those alone, they record history).

If any source file (under `app/`, `components/`, `utils/`, `public/`) still references the old domain, replace it with `darenzhicap.dev`.

- [ ] **Step 3: Update CLAUDE.md to reflect the new deployment URL**

In `CLAUDE.md` line 20, change:
```
Deployed at `https://darenzhicap.netlify.app` (the URL is hard-coded in `app/layout.tsx`...
```
to:
```
Deployed at `https://darenzhicap.dev` (the URL is hard-coded in `app/layout.tsx`...
```

- [ ] **Step 4: Type-check, lint, and commit**

Run: `bunx tsc --noEmit && bun run lint`
Expected: PASS.

```bash
git add app/layout.tsx CLAUDE.md
git commit -m "feat(metadata): swap deployment domain to darenzhicap.dev"
```

---

## Task 4: Home bio rewrite

**Files:**
- Modify: `components/Home/index.tsx:103-110`

- [ ] **Step 1: Replace the bio paragraph**

In `components/Home/index.tsx`, find the `<p>` block at lines 103–110 (the paragraph beginning "I'm a passionate IT graduate from Cavite State University..."). Replace its entire inner text with:

```tsx
<p className="text-md leading-8 mb-4 text-justify dark:text-gray-300 text-gray-700">
  I am a Junior Full-Stack Developer at GP Synergia and a Cum Laude
  BSIT graduate of Cavite State University. I engineer, automate, and
  deploy production-ready web applications — combining TypeScript,
  React, and Next.js on the frontend with Node.js and Spring Boot
  services, AWS infrastructure provisioned via Terraform, and
  containerized deployments through Docker and GitLab CI/CD.
</p>
```

(Wrapping/whitespace inside the JSX text doesn't affect rendering — Tailwind/typography handle the line breaks. Keep the existing className.)

- [ ] **Step 2: Type-check, lint, and commit**

Run: `bunx tsc --noEmit && bun run lint`
Expected: PASS.

```bash
git add components/Home/index.tsx
git commit -m "feat(home): rewrite bio to reflect Junior Full-Stack Developer role and Cum Laude BSIT"
```

---

## Task 5: Update Projects + Certificates constants (data only, no rendering changes yet)

**Files:**
- Modify: `utils/constants/index.ts`

- [ ] **Step 1: Insert Redbiomed at the top of `ProjectsData`**

In `utils/constants/index.ts`, the current `ProjectsData` array starts at line 212 with the TOPCIT LCMS entry. Insert the Redbiomed entry as the **first** element of `ProjectsData` (so it renders at the top of the projects page):

```ts
{
  title: "Redbiomed",
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
    demoLink: "https://redbiomed.com",
  },
},
```

Notes:
- No `link` (private repo).
- No `metadata.imageSrc` (no thumbnail). The existing `ProjectCard` already handles missing `metadata.imageSrc` (`components/Projects/components/project-card.tsx:53` uses a conditional render).

- [ ] **Step 2: Add the two new certificates to `CertificatesData`**

Append these two entries to the end of the `CertificatesData` array (the array currently ends at id 7; new entries take ids 8 and 9). Replace `<TESDA-DATE>` and `<AWS-DATE>` with the **actual issuance dates** the user provides (ISO `YYYY-MM-DD` format — read them off the cert image and the Credly badge page).

```ts
{
  id: 8,
  src: "/images/certificates/Hicap_Tesda_NCIII_Java_Programming_page-0001.jpg",
  alt: "TESDA Java Development NCIII Certificate",
  metadata: {
    title: "TESDA Java Development NCIII",
    description:
      "National Certificate III in Java Development issued by TESDA.",
    date: "<TESDA-DATE>",
    issuer:
      "Technical Education and Skills Development Authority (TESDA)",
    tags: ["Java", "Development", "TESDA", "NCIII"],
    image:
      "/images/certificates/Hicap_Tesda_NCIII_Java_Programming_page-0001.jpg",
  },
  link: {
    href: "#",
    target: "_blank",
    rel: "noopener noreferrer",
  },
},
{
  id: 9,
  alt: "AWS Cloud Practitioner Cloud Quest Badge",
  embed: {
    provider: "credly",
    badgeId: "713669d7-6115-4916-88c0-4fe38f28a964",
    width: 150,
    height: 270,
  },
  metadata: {
    title: "AWS Cloud Practitioner (Cloud Quest)",
    description: "AWS Cloud Quest Cloud Practitioner badge.",
    date: "<AWS-DATE>",
    issuer: "Amazon Web Services",
    tags: ["AWS", "Cloud", "Cloud Quest", "Cloud Practitioner"],
  },
  link: {
    href: "https://www.credly.com/badges/713669d7-6115-4916-88c0-4fe38f28a964",
    target: "_blank",
    rel: "noopener noreferrer",
  },
},
```

**Stop if dates aren't known yet** — the page sorts certs by `metadata.date`, so a placeholder string like `"<TESDA-DATE>"` will produce `Invalid Date` and break the sort. Resolve dates before continuing past this task.

- [ ] **Step 3: Type-check (the existing certificate card will still break on entry id 9 — that's fixed in Task 8)**

Run: `bunx tsc --noEmit`
Expected: PASS — the type allows `src` to be optional now (Task 1).

Note: the page will visually break for the AWS cert at runtime until Task 8 lands, because `Certificates` (`components/Skills-certificates/components/certificates.tsx:12`) still passes `src` to `<ImageModal>` unconditionally. That's expected. Don't run `bun dev` to verify until after Task 8.

- [ ] **Step 4: Commit**

```bash
git add utils/constants/index.ts
git commit -m "feat(content): add Redbiomed project, TESDA cert, and AWS Cloud Quest cert"
```

---

## Task 6: Skills constants — add Java + 4 new icons + re-lay-out positions

**Files:**
- Modify: `utils/constants/index.ts:15-68` (the `skillsData` array)

**Pre-condition:** The four new PNGs (`nextjs.png`, `docker.png`, `terraform.png`, `aws.png`) MUST already be in `public/images/skills/`. Run `ls public/images/skills/` and confirm — if any are missing, stop and request them from the user.

- [ ] **Step 1: Replace the `skillsData` array**

Replace the entire `skillsData` array (lines 15–68) with the following 17-icon layout. Coordinates are tuned to keep the existing visual rhythm: outer ring at radius ~150–200px, inner ring at ~60–120px, no two icons within 80px of each other on either axis simultaneously.

```ts
export const skillsData: TSkillData[] = [
  // --- Frontend core (right side) ---
  { src: "/images/skills/react.png",        name: "React",       position: { x:  60, y: -30 } },
  { src: "/images/skills/nextjs.png",       name: "Next.js",     position: { x: 170, y: -30 } },
  { src: "/images/skills/ts.png",           name: "TypeScript",  position: { x: 110, y:  60 } },
  { src: "/images/skills/tailwind-css.png", name: "Tailwind",    position: { x: 200, y:  60 } },
  { src: "/images/skills/zustand.png",      name: "Zustand",     position: { x:  20, y: 140 } },
  { src: "/images/skills/react-query.png",  name: "React Query", position: { x: 130, y: 150 } },
  { src: "/images/skills/zod.png",          name: "Zod",         position: { x: 220, y: 150 } },

  // --- Backend / data (left side) ---
  { src: "/images/skills/nodejs-express-js.png", name: "Node.js",    position: { x: -130, y: -150 } },
  { src: "/images/skills/java.png",              name: "Java",       position: { x:  -30, y: -150 } },
  { src: "/images/skills/prisma.png",            name: "Prisma",     position: { x: -210, y:  -50 } },
  { src: "/images/skills/postgresql.png",        name: "PostgreSQL", position: { x: -110, y:  -50 } },
  { src: "/images/skills/mysql.png",             name: "MySQL",      position: { x:  -30, y:  50 } },
  { src: "/images/skills/git.png",               name: "Git",        position: { x: -120, y:  50 } },

  // --- Infra / cloud (top + outer) ---
  { src: "/images/skills/aws.png",     name: "AWS",       position: { x:   60, y: -150 } },
  { src: "/images/skills/aws-s3.png",  name: "AWS S3",    position: { x:  200, y: -150 } },
  { src: "/images/skills/docker.png",  name: "Docker",    position: { x: -200, y:  140 } },
  { src: "/images/skills/terraform.png", name: "Terraform", position: { x: -100, y: 150 } },
];
```

- [ ] **Step 2: Add a subtle radial vignette behind the scatter (UI polish per spec Section 4)**

In `components/Skills-certificates/index.tsx:76-88` find the existing scatter container:

```tsx
<div
  ref={containerRef}
  className="w-full md:w-[500px] md:flex-shrink-0 relative h-96 md:h-96"
>
```

Replace it with a wrapped version that adds a radial vignette layer behind the icons:

```tsx
<div
  ref={containerRef}
  className="w-full md:w-[500px] md:flex-shrink-0 relative h-96 md:h-96"
>
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 rounded-full opacity-60 dark:opacity-40 [background:radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_70%)]"
  />
  {skillsData.map((skill, index) => (
    <ImageCollage
      key={skill.name}
      {...skill}
      index={index}
      show={showImages}
    />
  ))}
</div>
```

Notes:
- The vignette uses Tailwind v4 arbitrary-value syntax `[background:radial-gradient(...)]` — confirmed valid in this project (Tailwind v4 enables arbitrary CSS in brackets natively).
- `aria-hidden` because it's purely decorative.
- `pointer-events-none` so it doesn't block icon hovers.

- [ ] **Step 3: Visual QA**

Run `bun dev` and open `http://localhost:3000/skills-and-certificates`.
Expected:
- All 17 icons visible, none overlapping, all loading (no broken-image icons).
- Subtle blue radial glow behind the scatter, more visible in light mode than dark.
- Mobile viewport (DevTools 375px width): icons rescale correctly via the existing `scaleFactor` in `image-collage.tsx`, no clipping past the 500px container.

If any icons overlap on desktop or mobile, adjust their `position.x` / `position.y` by ±20px in `skillsData` until clear.

- [ ] **Step 4: Type-check, lint, commit**

Run: `bunx tsc --noEmit && bun run lint`
Expected: PASS.

```bash
git add utils/constants/index.ts components/Skills-certificates/index.tsx
git commit -m "feat(skills): add Java, Next.js, Docker, Terraform, AWS; add radial vignette behind scatter"
```

---

## Task 7: Experience card — bullet rendering, date chip, hover polish, pill contrast

**Files:**
- Modify: `components/Experiences/components/experience-card.tsx`

This task implements UI polish items 1, 2, and the Experience-card aspects of items 3 from the spec. Telus `<details>` styling lands in Task 9.

- [ ] **Step 1: Replace the entire card file**

Overwrite `components/Experiences/components/experience-card.tsx` with:

```tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { TExperienceData } from "@/portfolio/utils/types";

const ExperienceHero = ({
  title,
  subtitle,
  location,
  startDate,
  endDate,
  imageData,
}: {
  title: string;
  subtitle: string;
  location: string;
  startDate?: string;
  endDate?: string;
  imageData?: {
    src: string;
    alt: string;
  };
}) => {
  return (
    <div className="flex items-start gap-y-2 gap-x-4 flex-wrap">
      {imageData && (
        <Image
          src={imageData.src}
          alt={imageData.alt}
          width={75}
          height={75}
          className="rounded-md object-cover flex-shrink-0"
        />
      )}

      <div className="flex flex-col w-full flex-1 gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <h3 className="text-sm text-gray-600 dark:text-gray-500">
              {subtitle}
            </h3>
          </div>

          {startDate && (
            <span className="inline-flex items-center rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 whitespace-nowrap">
              {startDate} – {endDate || "Present"}
            </span>
          )}
        </div>
      </div>

      <div className="flex-[1_1_100%] flex items-center gap-2 text-sm text-gray-500 dark:text-gray-600">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill="currentColor"
          />
        </svg>
        <p>{location}</p>
      </div>
    </div>
  );
};

const ExperienceDescription = ({
  description,
  isExpanded,
}: {
  description: string;
  isExpanded: boolean;
}) => {
  return (
    <div
      className={`leading-relaxed transition-all duration-300 ${
        isExpanded ? "" : "line-clamp-2"
      }`}
    >
      <span className="text-gray-700 dark:text-gray-300">{description}</span>
    </div>
  );
};

const ExperienceBullets = ({ bullets }: { bullets: string[] }) => {
  return (
    <ul className="flex flex-col gap-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
      {bullets.map((bullet, i) => (
        <li key={i} className="flex gap-3">
          <span
            aria-hidden
            className="mt-2 h-1.5 w-1.5 flex-shrink-0 rotate-45 bg-blue-500 dark:bg-blue-400"
          />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
};

const ExperienceSkills = ({ skills }: { skills: string[] }) => {
  return (
    <ul className="flex justify-start flex-wrap gap-y-2 gap-x-2 text-sm">
      {skills.map((skill, index) => (
        <li
          key={index}
          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 text-xs font-medium rounded-full border border-blue-200/60 dark:border-blue-700/40"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
};

const ExperienceCard = ({
  experienceData,
}: {
  experienceData: TExperienceData;
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { description, bullets, skills, project } = experienceData.additionalInfo;

  return (
    <div className="group flex flex-col justify-center gap-4 p-6 max-w-lg h-fit rounded-md border border-gray-200 dark:border-gray-700 bg-gray-300/75 dark:bg-gray-800/75 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 hover:border-blue-400/60 dark:hover:border-blue-500/60">
      <ExperienceHero
        title={experienceData.workInfo.title}
        subtitle={experienceData.workInfo.subtitle}
        location={experienceData.workInfo.location}
        startDate={experienceData.workInfo.startDate}
        endDate={experienceData.workInfo.endDate}
        imageData={experienceData.workInfo.imageData}
      />

      {bullets && bullets.length > 0 ? (
        <ExperienceBullets bullets={bullets} />
      ) : description ? (
        <div className="w-full text-sm text-gray-700 dark:text-gray-300">
          <ExperienceDescription
            description={description}
            isExpanded={isDescriptionExpanded}
          />
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 font-medium underline mt-1"
          >
            {isDescriptionExpanded ? "Show less" : "Show more"}
          </button>
        </div>
      ) : null}

      {skills && skills.length > 0 && (
        <div className="w-full">
          <ExperienceSkills skills={skills} />
        </div>
      )}

      {project && (
        <div className="border border-amber-400/30 bg-amber-500/10 rounded-lg p-3 mt-auto">
          <p className="text-xs text-amber-500 dark:text-amber-400 font-semibold mb-1 uppercase tracking-wide">
            📋 Internship Output
          </p>
          <a
            href={project.projectOutputLink}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-all duration-200 font-semibold group/link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover/link:scale-110 transition-transform duration-200"
            >
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <polyline
                points="15,3 21,3 21,9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <line
                x1="10"
                y1="14"
                x2="21"
                y2="3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="group-hover/link:translate-x-1 transition-transform duration-200">
              View My Project Output
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
```

Changes vs. the original:
- `TExperienceData` now imported from `utils/types` (Task 1+2 already moved it).
- Date moved from card footer into a chip-style element in the hero header, alongside title.
- Card hover: subtle lift (`-translate-y-0.5`), shadow upgrade (`shadow-md` → `shadow-xl`), accent border (`hover:border-blue-400/60`).
- New `<ExperienceBullets>` subcomponent renders rotated-square markers (a 6×6px square rotated 45°) in blue.
- Skills pills: lighter background in light mode (`bg-blue-100` instead of `bg-blue-300`) and a subtle border for definition; tighter padding (`px-3 py-1`); pill shape (`rounded-full`).
- Card body renders bullets first if present, falls back to description+show-more, otherwise nothing — exactly the rule from the spec.

- [ ] **Step 2: Visual QA** (will look broken until Task 8 because the new GP Synergia entries don't exist yet, but verify existing General Trias and Telus cards still render correctly)

Run `bun dev` and open `http://localhost:3000/experiences`.
Expected:
- General Trias card and Telus card both render with the new date chip in the header.
- Hover lifts the card slightly, border turns blue.
- Skills pills look refined (light blue, pill-shaped, with border).
- "Show more" still works for both existing entries.
- Internship output link still works on the General Trias card.

- [ ] **Step 3: Type-check, lint, commit**

Run: `bunx tsc --noEmit && bun run lint`
Expected: PASS.

```bash
git add components/Experiences/components/experience-card.tsx
git commit -m "feat(experiences): bullet rendering, date chip, hover polish, refined pills"
```

---

## Task 8: Certificate card — embed support + unified frame + Credly script

**Files:**
- Modify: `components/Skills-certificates/components/certificates.tsx`
- Modify: `components/Skills-certificates/index.tsx`

- [ ] **Step 1: Add a `CredlyEmbed` subcomponent and route on `embed`**

Overwrite `components/Skills-certificates/components/certificates.tsx` with:

```tsx
import ImageModal from "@/portfolio/components/modal-image";
import { TCertificate } from "@/portfolio/utils/types";
import Tags from "./tags";
import useIsSmallDevice from "@/portfolio/utils/hooks/useIsSmallDevice";

const CredlyEmbed = ({
  badgeId,
  width = 150,
  height = 270,
  alt,
}: {
  badgeId: string;
  width?: number;
  height?: number;
  alt: string;
}) => {
  return (
    <div
      className="flex items-center justify-center w-full h-60 bg-white/5"
      aria-label={alt}
    >
      <div
        data-iframe-width={String(width)}
        data-iframe-height={String(height)}
        data-share-badge-id={badgeId}
        data-share-badge-host="https://www.credly.com"
      />
    </div>
  );
};

const Certificates = ({
  src,
  alt,
  embed,
  metadata,
}: Omit<TCertificate, "id">) => {
  const isSmallDevice = useIsSmallDevice();

  return (
    <div className="certificates bg-gray-300/80 dark:bg-gray-800/80 rounded-lg shadow-lg overflow-clip transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      <div className="relative">
        {embed ? (
          <CredlyEmbed
            badgeId={embed.badgeId}
            width={embed.width}
            height={embed.height}
            alt={alt}
          />
        ) : src ? (
          <>
            <ImageModal
              src={src}
              alt={alt}
              width={300}
              height={200}
              className="w-full h-60 object-cover"
            />
            {isSmallDevice && (
              <div className="absolute top-2 right-2 z-10">
                <div className="bg-black/80 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg flex items-center gap-1">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 7L10 10L7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Tap to enlarge
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
      {metadata && (
        <div className="p-4">
          <div className="mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Issued:{" "}
              {new Date(metadata.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tags item={{ metadata }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
```

Changes vs. original:
- New `CredlyEmbed` subcomponent renders the documented Credly badge `<div>` markup (`data-share-badge-id` etc.). The Credly client script (loaded once at the page level in Step 2) auto-discovers these divs and replaces them with iframes.
- `Certificates` now branches: `embed` → CredlyEmbed; `src` → existing ImageModal; neither → nothing.
- Added unified frame styling: hover lift + shadow upgrade matches the experience card.
- The wrapper div `h-60 bg-white/5` ensures the badge slot is the same vertical size as the image cards even before the iframe resolves, preventing layout shift.

- [ ] **Step 2: Load the Credly script once at the page level**

Modify `components/Skills-certificates/index.tsx`. At the top of the file, add this import:

```ts
import Script from "next/script";
```

Then, inside the returned JSX, immediately after the opening fragment (`<>`), add:

```tsx
<Script
  src="https://cdn.credly.com/assets/utilities/embed.js"
  strategy="lazyOnload"
/>
```

So the JSX top reads:

```tsx
return (
  <>
    <Script
      src="https://cdn.credly.com/assets/utilities/embed.js"
      strategy="lazyOnload"
    />
    <section className="w-full max-w-5xl m-auto min-h-screen flex flex-wrap gap-8 items-center justify-center py-20 md:py-0">
      ...
```

Notes:
- Component is already `"use client"`, so `next/script` works.
- `strategy="lazyOnload"` defers the script until after page interactivity — Credly is non-critical.
- The script auto-detects all `[data-share-badge-id]` divs on the page and replaces them with iframes. Since it loads once, multiple Credly badges share it.

- [ ] **Step 3: Visual QA**

Run `bun dev` and open `http://localhost:3000/skills-and-certificates`.
Expected:
- All 9 certificates render (7 image-based + TESDA image + AWS Credly embed).
- Sort order is by date descending — confirm AWS and TESDA land in the right slots based on their issuance dates.
- AWS Credly card shows the iframe badge (may take ~1s after page load to resolve since `lazyOnload`).
- All cert cards have the new hover lift + shadow.
- Tags below each card render unchanged.
- Dark mode + mobile still look correct.

If the Credly badge never appears: check the browser DevTools Console / Network tab for `embed.js` loading. If blocked by an extension/adblocker, that's expected client-side behavior, not a portfolio bug. Do verify with extensions disabled.

- [ ] **Step 4: Type-check, lint, commit**

Run: `bunx tsc --noEmit && bun run lint`
Expected: PASS.

```bash
git add components/Skills-certificates/components/certificates.tsx components/Skills-certificates/index.tsx
git commit -m "feat(certificates): support Credly embed badges and unify card frame"
```

---

## Task 9: Experiences page — add GP Synergia entries, reorder, de-emphasize Telus

**Files:**
- Modify: `components/Experiences/index.tsx`

- [ ] **Step 1: Replace the entire file**

Overwrite `components/Experiences/index.tsx` with:

```tsx
"use client";

import { useState } from "react";
import ExperienceCard from "./components/experience-card";
import type { TExperienceData } from "@/portfolio/utils/types";

const PrimaryExperiences: TExperienceData[] = [
  {
    workInfo: {
      title: "Junior Full Stack Developer",
      subtitle: "GP Synergia",
      location: "Philippines",
      startDate: "Dec 2025",
      // endDate omitted → renders as "Present"
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
      subtitle: "ICT E-Library - City Public Library of General Trias",
      location: "Brgy. Bagumbayan, General Trias, Cavite",
      startDate: "March 2025",
      endDate: "June 2025",
      imageData: {
        src: "/images/experiences/internship-gentri.webp",
        alt: "General Trias Official Seal",
      },
    },
    additionalInfo: {
      description:
        "Provided comprehensive IT support and technical assistance to library users while managing ICT E-Library resources and maintaining computer systems. Developed and implemented a centralized digital platform that streamlined access to library resources, significantly improving user accessibility and overall experience for community members.",
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
];

const EarlierExperiences: TExperienceData[] = [
  {
    workInfo: {
      title: "Crawling Structured Description",
      subtitle: "Telus International AI",
      location: "Tampere, Finland",
      startDate: "August 2023",
      endDate: "December 2023",
      imageData: {
        src: "/images/experiences/telus-official-logo.png",
        alt: "Telus International AI Logo",
      },
    },
    additionalInfo: {
      description:
        "Evaluating structured description of a product page and identify its main description. To extract product information (e.g., description, product details, features, specification/dimensions, material/ingredients, etc...) accurately which will be used in the future assessments of the webpage.",
      skills: ["Data Annotation", "Web Evaluation", "Product Analysis"],
    },
  },
];

const Experiences = () => {
  const [earlierOpen, setEarlierOpen] = useState(false);

  return (
    <section className="max-w-7xl m-auto py-24 px-4 flex flex-col gap-12">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-y-8 gap-x-4 items-start justify-items-center">
        {PrimaryExperiences.map((experience, index) => (
          <ExperienceCard key={index} experienceData={experience} />
        ))}
      </div>

      <details
        className="group rounded-lg border border-gray-300/60 dark:border-gray-700/60 bg-gray-200/40 dark:bg-gray-900/30 backdrop-blur-sm"
        onToggle={(e) => setEarlierOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary
          className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3 select-none"
          aria-label="Toggle earlier work history"
        >
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-gray-400/40 bg-gray-500/10 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              Earlier work
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {earlierOpen ? "Hide" : "Show"} prior roles
            </span>
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
              earlierOpen ? "rotate-90" : ""
            }`}
            aria-hidden
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </summary>

        <div className="px-5 pb-5 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-y-8 gap-x-4 items-start justify-items-center">
          {EarlierExperiences.map((experience, index) => (
            <ExperienceCard key={index} experienceData={experience} />
          ))}
        </div>
      </details>
    </section>
  );
};

export default Experiences;
```

Notes:
- The component becomes `"use client"` because `<details onToggle>` needs client-side state for the chevron rotation. (The `<details>` element itself works without JS — the toggle just falls back to CSS open/closed without the rotation animation. Acceptable degradation.)
- Primary entries: GP Synergia (Junior FSD) → GP Synergia (Help Desk) → General Trias.
- Telus moves into a styled `<details>` block underneath, labeled "Earlier work" with a chevron that rotates 90° on open.
- The "IT Support" → "IT Support Internship" rename per the spec is reflected in the General Trias entry above.

- [ ] **Step 2: Visual QA**

Run `bun dev` and open `http://localhost:3000/experiences`.
Expected:
- Three primary cards render in the grid: GP Synergia Junior FSD (with bullets + GitLab/Docker/Terraform/AWS pills + "Dec 2025 – Present" chip), GP Synergia Help Desk (with bullet + Microsoft Entra/Support/Automation pills + "Nov 2025 – Dec 2025" chip), General Trias Internship (unchanged content + new chip + still has internship output link).
- Below the grid: a collapsed `<details>` panel with the "Earlier work" chip and a chevron pointing right.
- Clicking the summary expands to reveal the Telus card; chevron rotates 90° down.
- Mobile (375px): grid collapses to single column, the `<details>` summary stays readable, no overflow.
- Dark mode: vignette panel still readable.

- [ ] **Step 3: Type-check, lint, commit**

Run: `bunx tsc --noEmit && bun run lint`
Expected: PASS.

```bash
git add components/Experiences/index.tsx
git commit -m "feat(experiences): add GP Synergia entries, reorder, de-emphasize Telus in <details>"
```

---

## Task 10: Final verification

**Files:** none

- [ ] **Step 1: Full lint pass**

Run: `bun run lint`
Expected: PASS, zero errors, zero warnings.

- [ ] **Step 2: Full type-check**

Run: `bunx tsc --noEmit`
Expected: PASS, zero errors.

- [ ] **Step 3: Production build**

Run: `bun run build`
Expected: Build succeeds. The four routes (`/`, `/projects`, `/skills-and-certificates`, `/experiences`) all generate as static pages (per `generateStaticParams`).

- [ ] **Step 4: Final visual QA pass**

Run `bun dev` and visit each route in both light and dark mode, on desktop (1280px) and mobile (375px):

- `/` (Home):
  - New bio paragraph reads correctly.
  - Typewriter animation still runs.
  - Social drawer still works.
- `/projects`:
  - Redbiomed renders at the top with all 7 tags.
  - Demo link "https://redbiomed.com" works.
  - No image (description-only card).
  - Existing projects still render unchanged.
- `/skills-and-certificates`:
  - 17 skill icons render in the scatter, no overlap.
  - Radial vignette visible.
  - 9 certificate cards render — 8 image-based, 1 Credly embed.
  - AWS Credly badge resolves to an iframe.
  - Cards have hover lift + shadow.
- `/experiences`:
  - 3 primary cards (GP Synergia × 2 + General Trias).
  - Date chips in card headers.
  - Bullets render with rotated-square markers on GP Synergia entries.
  - General Trias still has paragraph + "Show more" + internship output link.
  - "Earlier work" `<details>` collapses/expands; Telus inside.
- 404: `/non-existent` still calls `notFound()`.

- [ ] **Step 5: View page source on Home, verify metadata**

In the deployed dev server, view source on `http://localhost:3000/` and confirm OpenGraph tags reference `https://darenzhicap.dev/...` (not netlify).

- [ ] **Step 6: Final commit if anything was tweaked**

If visual QA surfaced any tweaks (skill positions, copy, spacing), commit them now:

```bash
git add -p
# stage hunks
git commit -m "fix(visual): adjust [specific thing] from QA pass"
```

If nothing was tweaked, no commit needed.

---

## Spec coverage check

Mapping spec requirements → tasks:

| Spec requirement | Task |
|---|---|
| `TExperienceData.bullets` field | Task 1 |
| `TCertificate.embed` field; `src` optional | Task 1 |
| Hoist `TExperienceData` to `utils/types.ts` | Task 1+2 |
| Bio rewrite | Task 4 |
| Domain swap to `darenzhicap.dev` | Task 3 |
| Add Redbiomed project | Task 5 |
| Add TESDA cert | Task 5 |
| Add AWS Cloud Quest cert (Credly) | Task 5 + 8 |
| Rename General Trias title | Task 9 |
| Add 2 GP Synergia experience entries | Task 9 |
| Telus de-emphasized in `<details>` | Task 9 |
| Add Java + Next.js + Docker + Terraform + AWS skill icons | Task 6 |
| Skills scatter re-layout | Task 6 |
| Skills scatter radial vignette | Task 6 |
| Experience card: bullets rendering | Task 7 |
| Experience card: date chip | Task 7 |
| Experience card: refined hover | Task 7 |
| Experience card: pill contrast | Task 7 |
| Telus `<details>`: styled summary + rotating chevron | Task 9 |
| Certificate card: unified frame | Task 8 |
| Certificate card: Credly embed render | Task 8 |
| Credly script loaded once via `next/script` | Task 8 |
| Final QA: lint + build + visual | Task 10 |
