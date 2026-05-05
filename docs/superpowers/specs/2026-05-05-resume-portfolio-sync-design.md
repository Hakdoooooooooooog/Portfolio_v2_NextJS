# Resume → Portfolio Sync + Targeted UI Modernization

**Date:** 2026-05-05
**Status:** Approved (pending user review of this spec)
**Source resume:** `Hicap Darenz - Resume.pdf` (Rosario, Cavite — 2026)

## Purpose

The portfolio's content has drifted from the user's current professional identity. The resume now positions Darenz Jasper Hicap as a Junior Full-Stack Developer at GP Synergia with a cloud/DevOps foundation, while the live site still describes him as a recent IT graduate using the PERN stack. Two new roles, two new certifications, one new project, and a new domain are missing. This spec syncs the portfolio to the resume and applies a contained UI polish to every component that has to be touched anyway, so the result reads as a single coherent refresh rather than new content bolted onto old shells.

## Scope

In scope:
- Bio rewrite on the home page.
- Domain swap: `darenzhicap.netlify.app` → `darenzhicap.dev` in `app/layout.tsx` metadata and any other hard-coded references.
- Two additive type changes: `TExperienceData.additionalInfo.bullets` and `TCertificate.embed`. `TCertificate.src` becomes optional.
- Experiences list: add two GP Synergia roles, rename the existing General Trias entry to match the resume, de-emphasize the Telus entry behind a styled `<details>` block.
- Skills scatter: add four new icons (Next.js, Docker, Terraform, AWS) and re-lay-out coordinates to absorb them.
- Projects: add Redbiomed (B2B E-Commerce) as a no-repo, demo-only card.
- Certificates: add TESDA Java NCIII (image) and AWS Cloud Practitioner (Credly embed).
- Targeted UI modernization on the components above (see "UI polish" section).

Out of scope (explicit):
- Home hero typewriter animation rewrite.
- Navbar redesign.
- Theme palette overhaul.
- New top-level sections.
- Any refactor not required by the changes above.

## Decisions and rationale

- **Telus stays, de-emphasized.** Real work history shouldn't disappear when a resume trims for space. A collapsed `<details>` keeps it discoverable without competing with current GP Synergia work.
- **Bullets are additive, not a replacement.** The resume's GP Synergia entries read as bullet lists; forcing them into prose loses signal. But the existing General Trias paragraph is already polished, so we don't rewrite it. The card renders whichever field is present.
- **Skills scatter, cherry-picked.** Bun, Spring Boot, GitLab CI/CD, Express.js, and "AI Technologies" are skipped as floating icons — Express is covered by the existing Node icon, GitLab naturally appears in GP Synergia bullets, and "AI Technologies" has no canonical logo. They surface in bio/experience copy instead.
- **Credly via embed, not screenshot.** The user chose `TCertificate.embed` over downloading the badge PNG, for flexibility with future Credly badges. The Credly script is loaded once at the page level via `next/script` so multiple badges share one script tag.
- **Domain switch now.** User confirmed `darenzhicap.dev` is live.

## Type changes (`utils/types.ts`)

```ts
export type TExperienceData = {
  workInfo: {
    title: string;
    subtitle: string;
    location: string;
    startDate?: string;
    endDate?: string;
    imageData?: { src: string; alt: string };
  };
  additionalInfo: {
    description?: string;     // existing — Telus, General Trias
    bullets?: string[];       // NEW — GP Synergia entries
    skills?: string[];
    project?: { projectOutputLink?: string };
  };
};

export type TCertificate = {
  id: number;
  src?: string;               // CHANGED: now optional
  alt: string;
  embed?: {                   // NEW
    provider: "credly";
    badgeId: string;
    width?: number;           // default 150
    height?: number;          // default 270
  };
  metadata?: {
    title: string;
    description: string;
    date: string;
    issuer: string;
    tags: string[];
    image?: string;           // CHANGED: now optional (mirrors src)
  };
  link: { href: string; target: string; rel: string };
};
```

Card rendering rule: if `embed` is present, render the Credly widget; otherwise render the existing `<Image src={src} />` path.

## Content changes

### Home bio (`components/Home/index.tsx`)

Replace the existing paragraph with:

> "I am a Junior Full-Stack Developer at GP Synergia and a Cum Laude BSIT graduate of Cavite State University. I engineer, automate, and deploy production-ready web applications — combining TypeScript, React, and Next.js on the frontend with Node.js and Spring Boot services, AWS infrastructure provisioned via Terraform, and containerized deployments through Docker and GitLab CI/CD."

No structural changes to the Home component.

### Metadata / domain (`app/layout.tsx`, anywhere else hard-coded)

- `metadata.metadataBase`: swap to `https://darenzhicap.dev`.
- All OpenGraph `url` / canonical fields hardcoded to the netlify URL: same swap.
- Grep the repo for `darenzhicap.netlify.app` and replace every occurrence.

### Experiences (`utils/constants` + component)

Final order, top to bottom:

1. **Junior Full Stack Developer** | GP Synergia — Dec 2025 – Present *(NEW, bullets)*
   - Engineered a self-hosted GitLab environment and automated CI/CD pipelines to streamline deployments and enhance security.
   - Orchestrated containerized application deployments via Docker and provisioned AWS cloud infrastructure using Terraform.
   - Skills: GitLab CI/CD, Docker, Terraform, AWS
2. **IT Help Desk and End User Support** | GP Synergia — Nov 2025 – Dec 2025 *(NEW, bullets)*
   - Delivered technical support, managed Microsoft Entra users, and enhanced the support ticket automation pipeline for faster resolution.
   - Skills: Microsoft Entra, Technical Support, Automation
3. **IT Support Internship** | City Government of General Trias — March 2025 – June 2025 *(EXISTING; rename `title` from "IT Support" to "IT Support Internship" to match the resume; description, skills, and project link unchanged)*
4. **Crawling Structured Description** | Telus International AI — Aug 2023 – Dec 2023 *(EXISTING, de-emphasized inside `<details>` block labeled "Earlier work")*

The Experiences page renders the first three entries in the existing grid, then a styled `<details>` containing the same `ExperienceCard` for Telus underneath.

### Skills (`utils/constants` + scatter component)

Add four new icons — Java already exists on disk:

| Constant `name` | `src` |
|---|---|
| Next.js | `/images/skills/nextjs.png` |
| Docker | `/images/skills/docker.png` |
| Terraform | `/images/skills/terraform.png` |
| AWS | `/images/skills/aws.png` (separate from existing `aws-s3.png`) |
| Java | `/images/skills/java.png` (already on disk) |

Coordinates for all 12 existing icons + 5 additions are re-laid-out; final positions are an implementation detail tuned during dev. Constraint: no two icons overlap, the layout reads centered around the page midpoint, and the existing visual rhythm is preserved.

User-provided assets needed before implementation:
- `public/images/skills/nextjs.png`
- `public/images/skills/docker.png`
- `public/images/skills/terraform.png`
- `public/images/skills/aws.png`

(Recommended: transparent PNG, square, ≥128×128px.)

### Projects (`utils/constants/index.ts`)

New entry, no repo link, demo-only, no thumbnail:

```ts
{
  title: "Redbiomed",
  tags: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "AWS", "Terraform", "Docker"],
  description:
    "A B2B e-commerce management system for the Southeast Asian peptide industry. Built core platform features across the frontend (Next.js) and backend (NestJS + Prisma + PostgreSQL) with a focus on scalable architecture, AWS infrastructure provisioned via Terraform, and containerized deployments.",
  metadata: { demoLink: "https://redbiomed.com" },
}
```

Insertion order: top of `ProjectsData` (most recent and most prominent). The Projects component already handles entries without `link` and without `metadata.imageSrc`, so no component change is required for this case — but it should be verified during implementation.

### Certificates (`utils/constants/index.ts`)

New entries:

```ts
{
  id: 8,
  src: "/images/certificates/Hicap_Tesda_NCIII_Java_Programming_page-0001.jpg",
  alt: "TESDA Java Development NCIII Certificate",
  metadata: {
    title: "TESDA Java Development NCIII",
    description: "National Certificate III in Java Development.",
    date: "<TBD — pull from cert image>",
    issuer: "Technical Education and Skills Development Authority (TESDA)",
    tags: ["Java", "Development", "TESDA", "NCIII"],
    image: "/images/certificates/Hicap_Tesda_NCIII_Java_Programming_page-0001.jpg",
  },
  link: { href: "#", target: "_blank", rel: "noopener noreferrer" },
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
    date: "<TBD — pull from Credly badge metadata>",
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

Implementation note: the issuance dates on both certs are placeholders in this spec and must be filled in during implementation by reading the TESDA cert image and/or the Credly badge page.

The Credly script (`https://cdn.credly.com/assets/utilities/embed.js`) is loaded once at the certificates page level via `next/script` with `strategy="lazyOnload"`. Each Credly badge renders as the documented `<div>` markup with `data-iframe-width`, `data-iframe-height`, `data-share-badge-id`, and `data-share-badge-host` attributes.

## UI polish (targeted modernization)

Bounded to the components touched above. Anything not in this list is out of scope.

1. **Experience card.** Move the date to a chip-style element in the card header alongside the title (instead of a separate footer line). Replace the flat `shadow-lg` hover with a subtle elevation lift + accent border on hover/focus. Improve light-mode contrast on the skills pills (currently `bg-blue-300/text-blue-900` — verify against WCAG AA).
2. **Bullets rendering.** Custom marker (small accent square or chevron, theme-aware) rather than default disc. Tight line-height. Bullets and prose visually distinct so the GP Synergia entries scan fast.
3. **Telus `<details>`.** Styled `<summary>` with a chip labeled "Earlier work" and a chevron icon that rotates 90° on open. No native browser triangle.
4. **Skills scatter.** Re-lay-out coordinates to absorb 5 net additions (4 new + Java promotion). Add a subtle radial vignette or orbit hint behind the icons so the layout reads as intentional rather than randomly scattered. No animation rewrite.
5. **Certificate card.** Unified frame so image-based and Credly-embed certs feel like the same component (same border, padding, hover treatment). The Credly iframe sits inside the same wrapper as the image variant.

## Component-level changes summary

| File | Change |
|---|---|
| `utils/types.ts` | Add `bullets`, add `embed`, make `src`/`metadata.image` optional on `TCertificate` |
| `utils/constants/index.ts` | New skill entries + re-laid-out positions; new project (Redbiomed); two new certificates; update General Trias title |
| `components/Home/index.tsx` | Replace bio paragraph |
| `app/layout.tsx` | Domain swap |
| `components/Experiences/index.tsx` | Add two GP Synergia entries; reorder; wrap Telus in styled `<details>` |
| `components/Experiences/components/experience-card.tsx` | Render `bullets` when present; date-as-chip; refined hover; pill contrast |
| `components/Skills-certificates/*` | Cert card: render `embed` variant; unified frame; load Credly script once |
| `public/images/skills/` | Add `nextjs.png`, `docker.png`, `terraform.png`, `aws.png` (user-provided) |
| `public/images/certificates/` | TESDA cert already on disk |

## Build sequence

1. Type changes (`utils/types.ts`).
2. Constants update (`utils/constants/index.ts`) — adds new data; broken at this point until rendering catches up.
3. Home bio + domain metadata.
4. Experience card rendering (`bullets`, date chip, hover, pill contrast).
5. Experiences page reorder + Telus `<details>`.
6. Skills scatter re-layout (after the 4 new PNGs land in `public/`).
7. Certificate card embed support + Credly script + unified frame.
8. Manual visual QA in dev (`bun dev`) — light + dark, mobile + desktop, hover states, `<details>` open/close, all four certificate cards render, all skill icons load.
9. `bun run lint` and `bun run build` clean.

## Open items at implementation time

- TESDA certificate issuance date (read from the cert image).
- AWS Cloud Quest issuance date (read from Credly badge page).
- Final coordinates for the skills scatter (tune during dev).
- User must drop the four skills PNGs into `public/images/skills/` before step 6.
- Redbiomed stack confirmed by inspecting the local Renovome repo (renamed to Redbiomed): Next.js + NestJS + Prisma + PostgreSQL on AWS via Terraform/Docker. Tags reflect this.
