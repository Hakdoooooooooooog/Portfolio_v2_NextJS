# Portfolio — Specification

| | |
|---|---|
| **Project** | Personal portfolio of Darenz Jasper A. Hicap |
| **Type** | Static marketing / showcase website |
| **Canonical URL** | https://darenzhicap.netlify.app |
| **Status** | Live |
| **Document status** | Specification of record — describes the system as built |

---

## 1. Purpose & scope

### 1.1 Purpose

Provide a single, always-current web presence for Darenz Jasper A. Hicap — a full-stack
developer — that answers three questions in one place: **what has he built, what can he
do, and where has he worked**. The site is the link carried on the resume and LinkedIn,
replacing a static document that goes stale.

### 1.2 Audience

Recruiters, hiring managers, prospective clients, and collaborators.

### 1.3 Goals

- Present projects, skills, credentials, and work experience in one scannable site.
- Be trivially maintainable — all content is data-driven, no content in markup.
- Demonstrate engineering quality: a real design system, accessibility, performance
  budgets, SEO, and an automated deployment pipeline.
- Render correctly in light and dark themes with no flash of the wrong theme.

### 1.4 Non-goals

- No CMS, database, authentication, or server-side business logic.
- No user accounts, forms, or stored user data.
- No blog, comments, or search.
- No page-to-page transition system or animation framework.

---

## 2. System scope — routes

| Route | Type | Purpose |
|---|---|---|
| `/` | Static | About Me landing |
| `/projects` | SSG (`generateStaticParams`) | Selected work |
| `/skills-and-certificates` | SSG (`generateStaticParams`) | Stack + credentials |
| `/experiences` | SSG (`generateStaticParams`) | Work history timeline |
| `/_not-found` | Static | 404 fallback for any unmatched path |
| `/manifest.webmanifest` | Static | PWA manifest |
| `/robots.txt` | Static | Crawler directives |
| `/sitemap.xml` | Static | Sitemap |
| `/opengraph-image` | Static (dynamic renderer) | Social share image (1200×630 PNG) |

Unknown `{slug}` values under `app/(root)/[slug]` call `notFound()`.

---

## 3. Functional specification

### 3.1 About Me — `/`

- Section eyebrow `01 / About`.
- Display headline greeting that names the developer, with an animated accent underline
  beneath the name.
- Introductory paragraph describing the developer's practice.
- A stack chip row: **Frontend · Backend · Cloud · DevOps**.
- Profile photograph presented in a fixed square frame with a decorative offset border.
- Contact block: a primary **Email me** action (`mailto:`) and icon links to **GitHub**,
  **LinkedIn**, and **Facebook** (all open in a new tab with `rel="noopener noreferrer"`).

### 3.2 Projects — `/projects`

- Section eyebrow `02 / Projects`.
- Heading **Selected work**.
- **One featured project**, rendered as a large card: preview image (16:10, `priority` /
  LCP), title, stack tags, description, and actions — **Visit live**, **View source**,
  and (when present) **View API source**.
- **The remaining projects** rendered as a compact list, each with a thumbnail (click to
  enlarge in a modal `<dialog>`), an auto-padded ordinal, a `WEB`/`API` kind badge when
  no image is present, title, up to four tags with a `+N more` / `show less` toggle,
  description, and the same action links.
- The featured entry is the project flagged `featured: true` with an image; if none is
  flagged, the first project is used (a development-time warning is logged).

### 3.3 Skills & Certificates — `/skills-and-certificates`

- Section eyebrow `03 / Skills & Certificates`.
- Heading **Toolkit & credentials**.
- **My stack** — skills grouped into categories (**Frontend**, **Backend**,
  **Platform**); each skill renders as a chip with an icon and a label. Each category
  reveals on scroll with a staggered delay.
- **Credentials** — certificates sorted by date, **newest first**. Each row shows a
  thumbnail (click to enlarge in a modal), title, issuer, formatted date, and a
  **Verify** link when a real verification URL exists.

### 3.4 Experiences — `/experiences`

- Section eyebrow `04 / Experiences`.
- Heading **Where I've worked**.
- A vertical timeline. Each entry shows a date range (`Start — End | Present`), title,
  `Company · Location`, either a bulleted highlights list or a description, skill tags,
  and an optional project output link.
- The **current** role (the one without an end date) is marked active: its dot is accent
  coloured and pulses. When no role is current, no entry is marked active.

### 3.5 Shared chrome

- **Navbar** (fixed, blurred background): centred navigation links, a **My Resume**
  outline button (external link), and the theme switch. Below the `sm` breakpoint the
  links collapse into a hamburger-triggered drawer containing the nav links, the resume
  button, and the theme switch. The active link is highlighted with an animated
  underline.
- **Footer**: full-width, top border, centred copyright with the current year.
- **Theme switch**: toggles light/dark, showing a sun or moon icon; persists the choice.

### 3.6 System states

- **Loading** (`app/loading.tsx`): centred spinner built from design tokens; animation
  suppressed under `prefers-reduced-motion`.
- **Not found** (`app/not-found.tsx`): `404` eyebrow, message, and a **Back to About**
  link, on the shared grid background.

---

## 4. Content model

All content is defined in `utils/constants/index.ts` and typed in `utils/types.ts`.
Components receive content as props; no content is authored in markup.

| Type | Represents | Key fields |
|---|---|---|
| `TNavigationLink` | A nav entry | `label`, `href` |
| `TSkillData` | A single skill | `src` (icon), `name` |
| `TSkillCategory` | A skill group | `label`, `skills[]` |
| `TCertificate` | A credential | `id`, `src`, `alt`, `metadata{title,description,date,issuer,tags,image}`, `link{href,target,rel}` |
| `TProjectData` | A project | `title`, `tags[]`, `description`, `link`, `featured`, `metadata{imageSrc,imageAlt,demoLink,serverLink}` |
| `TExperienceData` | A role | `workInfo{title,subtitle,location,startDate,endDate}`, `additionalInfo{description,bullets[],skills[],project{projectOutputLink}}` |

Exported content constants: `navLinks`, `stack`, `sectionNumbers`, `RESUME_URL`,
`SITE_URL`, `skillCategories`, `CertificatesData`, `ProjectsData`, `experiencesData`.

`SITE_URL` is the canonical origin and is the single source for `metadataBase`, OpenGraph
URL, `robots.ts`, and `sitemap.ts`.

---

## 5. Design system specification

Defined entirely in `app/globals.css` — there is no `tailwind.config.ts`.

### 5.1 Colour tokens (three layers)

1. **Raw palette** (`:root`, frozen — never referenced by components): `--c-navy`
   `#0A0F2C`, `--c-indigo` `#1A1E4D`, `--c-slate` `#4F5689`, `--c-lavender` `#9494BC`,
   `--c-ink` `#EDEDF6`, `--c-paper` `#F7F7FB`.
2. **Semantic tokens** (per `data-theme`): `--background`, `--foreground`, `--surface`,
   `--surface-foreground`, `--muted`, `--accent`, `--accent-foreground`, `--border`.
3. **Tailwind utilities** (`@theme inline`): `bg-background`, `text-foreground`,
   `bg-surface`, `text-surface-foreground`, `text-muted`, `bg-accent`,
   `text-accent-foreground`, `border-border`, plus `font-display/sans/mono`.

**Rule:** components use only layer-3 utilities. No raw hex, no `gray-*`/`white`/`black`.

### 5.2 Typography

| Class | Family | Use |
|---|---|---|
| `.text-display-xl` | Fraunces | Hero headline (clamp 2.75→4.5rem) |
| `.text-display-lg` | Fraunces | Section headings (clamp 2→3rem) |
| `.text-heading` | Fraunces | Card headings |
| `.text-heading-row` | Fraunces | Compact row headings |
| `.text-body-lg` / `.text-body` | Noto Sans | Prose |
| `.text-small` | Noto Sans | UI, metadata |
| `.text-eyebrow` | Noto Sans Mono | Uppercase labels / section numbers |

Fonts load via `next/font/google` with `display: "optional"` (no layout shift).

### 5.3 Spacing rhythm

Four stops only — no arbitrary values:

| Name | Class | px |
|---|---|---|
| tight | `-2` | 8 |
| base | `-4` | 16 |
| section | `-8` | 32 |
| block | `-16` | 64 |

### 5.4 Radius & elevation

- Radius: `rounded-md` (6) buttons/inputs/badges · `rounded-xl` (12) cards/modals/navbar
  pill · `rounded-full` avatars/dots.
- Elevation: page = `bg-background` · surface = `bg-surface` · raised = `bg-surface` +
  `border-border` (+ `shadow-sm` in light).

### 5.5 Container & grid background

- `.container-page` — single content container: `max-width: 72rem`, centred, inline
  padding `1.5rem` (`2.5rem` at ≥768px).
- `.bg-grid-pattern` — 64px grid lines (`--grid-line` per theme), radially masked into a
  vignette at the edges.

### 5.6 Motion

- `.name-underline` — headline underline draws left-to-right (600ms ease-out, 200ms
  delay).
- `.dot-pulse` — active timeline dot radiates a fading ring (2s loop).
- `.reveal` — scroll-reveal via `IntersectionObserver` (500ms), with a
  `--reveal-delay` for staggering.
- **All motion is disabled under `prefers-reduced-motion: reduce`.**

---

## 6. Technical architecture

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript 5.
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`, no config file).
- **State:** Zustand 5 with `persist`, for theme only.
- **UI primitives:** `@base-ui-components/react` (navigation menu, switch).
- **Rendering:** predominantly React Server Components; interactivity is isolated to
  small client leaves (nav items, drawer, switch, thumbnails, reveal wrappers).
- **Routing:** route group `app/(root)/` provides the grid `<main>` shell; a dynamic
  `[slug]` segment selects the section and is statically generated via
  `generateStaticParams`.
- **Path alias:** `@/portfolio/*` → repository root (not `@/*`).

### 6.1 Theming

`<html data-theme="light" | "dark">`, driven by a Zustand `persist` store (key
`theme-storage`) plus a blocking inline `<script>` (`components/theme-script.tsx`) that
sets the attribute **before paint** to prevent FOUC. `components/switch.tsx` waits for
persist hydration (`useSyncExternalStore`) before writing the attribute.
`<html suppressHydrationWarning>` is required. Tailwind custom variants
(`@custom-variant dark/light`) map `dark:` / `light:` utilities to the attribute.

---

## 7. Non-functional requirements

### 7.1 Performance

- Images ship as **WebP**; fixed-layout slots use an `aspect-[…]` wrapper with
  `<Image fill>` to avoid reflow.
- Image optimizer `minimumCacheTTL` = 1 year (`next.config.ts`).
- Featured/LCP image is `priority`; all others lazy-load.
- Fonts use `display: "optional"`.

### 7.2 Accessibility

- Semantic landmarks (`header`, `main`, `footer`, `nav`), labelled nav regions.
- Icon-only controls carry `aria-label`; decorative visuals are `aria-hidden`.
- Visible focus rings (`focus:ring-2 focus:ring-accent`).
- The closed mobile drawer is `inert` (removed from tab order and the a11y tree).
- Image previews use the native `<dialog>` with `showModal()`.
- Motion respects `prefers-reduced-motion`.

### 7.3 SEO

- Metadata: title, description, keywords, author, creator.
- `metadataBase` + `alternates.canonical` on the canonical origin.
- OpenGraph + Twitter card metadata; a dynamically rendered OG image.
- `robots.txt` (explicitly allows social scrapers) and `sitemap.xml`.

### 7.4 Browser support

Evergreen browsers targeted by Next.js 16. Relies on `color-mix()` and CSS custom
properties (supported in all current evergreen browsers).

---

## 8. Deployment

- **Host:** Netlify, via `@netlify/plugin-nextjs` (`netlify.toml`: `bun run build`,
  publish `.next`).
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`). Push to `master` →
  production deploy; pull request → preview deploy at `deploy-preview-<PR#>`.
- **Secrets:** `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID` (repository secrets).
- **Lockfile:** CI installs with `bun install --frozen-lockfile`; `bun.lock` must be
  committed in sync with `package.json`.
- **Legacy domain:** `netlify.toml` carries forced `301` rules from `darenzhicap.dev`
  and `www.darenzhicap.dev` to the canonical host. The domain is currently parked at its
  registrar; the rules activate once its DNS points at Netlify.

---

## 9. Maintenance & conventions

- **Content changes** go through `utils/constants/index.ts` only.
- **Adding a section:** add the slug to `generateStaticParams` and the `switch` in
  `app/(root)/[slug]/page.tsx`; add a `TNavigationLink`; create
  `components/<Section>/index.tsx`.
- **Styling** uses semantic tokens and the four spacing stops (see §5).
- **Verification** (no test runner): `bun run lint` + `bun run build` + a manual browser
  pass (light/dark, reduced motion).
- **Dependency overrides** in `package.json` pin `minimatch`, `brace-expansion`,
  `flatted`, `picomatch`, and `postcss` to patched versions pending upstream bumps.

---

## Appendix A — File map

```
app/
  (root)/
    layout.tsx                 grid <main> shell
    page.tsx                   About Me
    [slug]/page.tsx            section switch + generateStaticParams
  layout.tsx                   fonts, metadata, ThemeScript
  globals.css                  design tokens + components layer
  loading.tsx  not-found.tsx   system states
  manifest.ts  robots.ts  sitemap.ts  opengraph-image.tsx
components/
  Home/  Projects/  Skills-certificates/  Experiences/  Navbar/
  button.tsx  switch.tsx  theme-script.tsx  footer.tsx  use-reveal.ts
utils/
  constants/index.ts           all content + SITE_URL
  types.ts                     content types
  store/theme-store.ts         Zustand theme store
public/images/                 WebP assets (+ pwa-icons PNG)
netlify.toml                   build, plugin, redirects
.github/workflows/deploy.yml   CI/CD
```
