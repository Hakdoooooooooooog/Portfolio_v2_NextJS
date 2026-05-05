# Home Redesign — Spec 2a (Layout & Composition, part 1 of 5)

**Date:** 2026-05-05
**Scope:** First sub-spec of the layout & composition phase. Redesigns the Home (`/`) section only. Other sections (Projects, Skills, Experiences) and shared chrome (Navbar, Footer, Button, Switch, Modal) ship in their own specs (2b–2e).

## Context

The current Home section (`components/Home/index.tsx`) is a 220-line client component built on a two-column hero (text left, profile photo right with an offset gray-bordered "frame") plus a fixed right-edge contact drawer that floats over every section. It uses GSAP for two animations: a per-character typewriter on the name, and a slide-in/out for the contact drawer. Off-palette Tailwind grays/whites/blues are used throughout (15+ entries in `docs/superpowers/notes/spec-2-input.md`).

Foundation (spec 1) established a three-layer token system, a Fraunces display serif, a 7-step type scale, and a 4-step spacing rhythm. This sub-spec is the first place those tokens get put to work in real composition.

## Goals

- Replace the symmetric two-column hero with an asymmetric editorial layout: 2/3 headline column, 1/3 identity column, eyebrow numbering (`01 / About`).
- Use the foundation's display serif at hero scale; pair it with a static accent underline on the user's name (spec 3 animates this).
- Replace the fixed right-edge contact drawer with an inline contact block in the identity column: a primary `Email me` CTA plus three secondary social icon buttons.
- Reframe the bio: one prose sentence plus a separate mono row of stack tags.
- Replace the decorative offset border on the photo with a 1-pixel grid-square that echoes the page's grid background.
- Remove GSAP usage from this component entirely; all motion in spec 2a is CSS-only. Spec 3 will reintroduce purposeful motion.

## Non-goals

- No changes to Projects, Skills-certificates, Experiences, Navbar, Footer, Button, Switch, Modal, or any of their subcomponents. Each is its own future spec.
- No animation work beyond declaring placeholder hook classes for spec 3. The name underline is static in this spec.
- No new fonts, no new design tokens, no new spacing stops. Foundation's outputs are the toolset.
- No icon library. The four SVGs needed (GitHub, LinkedIn, Facebook, arrow-right) are extracted from the existing inline SVGs in `components/Home/index.tsx`.
- No tooltip system, no popover, no headless-UI primitive beyond what already exists in the project.
- The Email link is the primary CTA; we do not also add an email icon to the social row (no duplicate channels).

## Architecture: layout

Single page section, container-bounded, two columns at `md:` and above, stacked at smaller widths.

```
┌─────────────────────────────────────────────────────────────┐
│ <main class="bg-grid-pattern">                              │
│   <section class="container-page py-16">                    │
│                                                              │
│     <p class="text-eyebrow text-muted">01 / About</p>       │
│                                                              │
│     <div class="grid md:grid-cols-3 gap-8 mt-8">            │
│       ┌───── HEADLINE COLUMN (md:col-span-2) ─────┐         │
│       │ <h1 class="text-display-xl hero-headline">│         │
│       │   Hello! My name is                       │         │
│       │   <span class="name-underline">           │         │
│       │     Darenz Jasper A. Hicap                │         │
│       │   </span>                                  │         │
│       │ </h1>                                      │         │
│       │                                            │         │
│       │ <p class="text-body-lg text-muted mt-8">   │         │
│       │   Junior Full-Stack Developer at GP …      │         │
│       │ </p>                                       │         │
│       │                                            │         │
│       │ <p class="text-small font-mono text-muted  │         │
│       │           mt-4 flex flex-wrap gap-2">      │         │
│       │   {STACK.map((s) => <span>{s}</span>)}    │         │
│       │   (separated by · in JSX)                  │         │
│       │ </p>                                       │         │
│       └────────────────────────────────────────────┘         │
│                                                              │
│       ┌───── IDENTITY COLUMN (md:col-span-1) ─────┐         │
│       │ <div class="relative w-[250px]            │         │
│       │             aspect-square">                │         │
│       │   <div class="absolute inset-0            │         │
│       │              translate-x-2 translate-y-2  │         │
│       │              border border-border          │         │
│       │              rounded-md" />                │         │
│       │   <Image ... class="relative rounded-md   │         │
│       │                     w-full shadow-sm"/>    │         │
│       │ </div>                                     │         │
│       │                                            │         │
│       │ <ContactBlock class="mt-8" />              │         │
│       └────────────────────────────────────────────┘         │
│     </div>                                                  │
│   </section>                                                │
│ </main>                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Mobile (<md) ordering

The eyebrow renders as its own row above the grid, regardless of viewport. Inside the grid, the identity column carries `order-first md:order-last` so it stacks **first** on mobile (photo + contact above the headline) and falls to the right column on `md:` and above. The headline column has natural document order.

A 360px-wide viewport must not produce horizontal scroll. The photo wrapper's `w-[250px]` is fine because its parent column is `min-w-0` inside the grid.

### Container

Replace today's `max-w-6xl m-auto` and `px-4` / `px-8` with the foundation's `.container-page` utility. The layout shell at `app/(root)/layout.tsx` drops `px-8` (since `.container-page` owns horizontal padding). It keeps `bg-grid-pattern`. The `gap-12` between section children becomes `gap-16` (the foundation's `block` rhythm step).

### Vertical rhythm

`section.container-page` uses `py-16` (block step). Internal spacing inside the section follows the rhythm: `mt-8` (section step) between eyebrow and grid, `mt-8` between headline and bio paragraph, `mt-4` (base step) between bio and stack tag row, `mt-8` between photo and ContactBlock.

## Visual elements

### Eyebrow

`<p class="text-eyebrow text-muted">01 / About</p>`

The number `01` comes from a new constant in `utils/constants/index.ts`:

```ts
export const SECTION_NUMBERS: Record<string, string> = {
  about: "01",
  projects: "02",
  skills: "03",
  experiences: "04",
};
```

This will be consumed by specs 2b–2d for their respective eyebrows.

### Headline

`<h1 class="text-display-xl hero-headline">` containing the literal "Hello! My name is " followed by the name span.

```tsx
<h1 className="text-display-xl hero-headline">
  Hello! My name is{" "}
  <span className="name-underline">Darenz Jasper A. Hicap</span>
</h1>
```

- `text-display-xl` is the foundation's largest type slot (Fraunces 400, clamp 2.75rem → 4.5rem, line-height 1.05, letter-spacing -0.02em).
- Color via inheritance from `body` (`text-foreground`).
- `hero-headline` is a placeholder hook for spec 3's fade-in/rise; it has no style attached in this spec.
- `name-underline` is defined as a small CSS rule appended to `globals.css`:

  ```css
  @layer components {
    .name-underline {
      border-bottom: 2px solid var(--accent);
      padding-bottom: 0.1em;
    }
  }
  ```

  Spec 3 will animate the border-bottom reveal; this spec just renders it static.

### Photo + grid-square frame

```tsx
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
```

- The decorative div uses `border-border` (slate-tinted, palette-aware) instead of today's `border-gray-500`.
- `shadow-sm` only in light mode (foundation §3: shadows do not read on navy in dark).
- `w-[250px]` is the only arbitrary value in the redesign — explicitly allowed in the lean guardrails.
- The decorative div carries `aria-hidden` to keep it out of the accessibility tree.

### Bio sentence

One paragraph, no `text-justify`:

```tsx
<p className="text-body-lg text-muted mt-8">
  Junior Full-Stack Developer at GP Synergia and Cum Laude BSIT graduate of
  Cavite State University. I engineer, automate, and deploy production-ready
  web applications — combining TypeScript, React, and Next.js on the frontend
  with Node.js and Spring Boot services, AWS infrastructure provisioned via
  Terraform, and containerized deployments through Docker and GitLab CI/CD.
</p>
```

The exact wording is preserved from the current copy. Only structural change: removed `text-justify` (foundation rule — justified paragraphs in serif/sans pairings produce ragged interword spacing).

### Stack tag row

```tsx
<p className="text-small font-mono text-muted mt-4 flex flex-wrap gap-x-2 gap-y-1">
  {STACK.map((s, i) => (
    <span key={s}>
      {s}
      {i < STACK.length - 1 ? <span className="ml-2 text-muted/50" aria-hidden>·</span> : null}
    </span>
  ))}
</p>
```

`STACK` is a new constant in `utils/constants/index.ts`:

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
```

The `·` separator is decorative (`aria-hidden`) so screen readers read the tags as a list of words separated by whitespace.

## ContactBlock

A new subcomponent at `components/Home/components/contact-block.tsx`. Exports a default `<ContactBlock className="..." />` and contains four local icon components and a typed `SOCIAL_LINKS` constant. Not exported beyond Home — this is private to the Home composition.

### Component shape

```tsx
import type { ComponentType, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

const GithubIcon = (props: IconProps) => (/* same path as today's Home, with currentColor */);
const LinkedinIcon = (props: IconProps) => (...);
const FacebookIcon = (props: IconProps) => (...);
const ArrowRightIcon = (props: IconProps) => (...);

type SocialLink = {
  label: string;
  href: string;
  icon: ComponentType<IconProps>;
};

const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Hakdoooooooooooog", icon: GithubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/darenz-jasper-hicap", icon: LinkedinIcon },
  { label: "Facebook", href: "https://www.facebook.com/drnz.hcp", icon: FacebookIcon },
];

export default function ContactBlock({ className }: { className?: string }) {
  return (
    <div className={className}>
      <a
        href="mailto:hicap.darenzjasper@gmail.com"
        className="group flex items-center justify-between gap-2
                   bg-accent text-accent-foreground rounded-md px-4 py-2
                   text-small font-medium
                   transition-colors hover:bg-accent/90"
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
            className="grid place-items-center size-9
                       rounded-md border border-border text-muted
                       transition-colors hover:text-foreground hover:border-accent"
          >
            <Icon className="size-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
```

### Icon source

The `<path>` data for `GithubIcon`, `FacebookIcon`, `LinkedinIcon`, and `ArrowRightIcon` comes verbatim from today's `components/Home/index.tsx` (lines 136–149 for the arrow, 160–166 for GitHub, 177–183 for Facebook, 209–215 for LinkedIn). The Email icon path (lines 192–198) is dropped — Email becomes the primary CTA, not an icon.

Each icon component:
- Uses `fill="currentColor"` (or `stroke="currentColor"` for the arrow) so color is driven by the parent's `text-*` class.
- Accepts `className` and forwards all other SVG props.
- Uses the same `viewBox="0 0 24 24"` as today's inlines.

### Why a subcomponent

Three reasons:
1. ~90 lines of icon JSX would dominate the Home composition.
2. The `SOCIAL_LINKS` array is iterated, so the icons need to be referenced as components, not inlined.
3. It cleanly localises the Home-only content (a global `ContactBlock` would imply reuse, which there isn't).

It is **not** decomposed further (separate icon files, separate constants file). The footprint is small enough that one file is the right size.

## File-level changes

| File | Change |
|---|---|
| `components/Home/index.tsx` | Rewrite. ~220 → ~80 lines. Removes GSAP, refs, drawer state, typewriter logic, fixed-position drawer JSX. Adds eyebrow, two-column grid, `<ContactBlock />` import. |
| `components/Home/components/contact-block.tsx` | New. ~90 lines. Default-exports `<ContactBlock />`; contains four local icon components and `SOCIAL_LINKS`. |
| `utils/constants/index.ts` | Add `STACK: readonly string[]` and `SECTION_NUMBERS: Record<string, string>`. No removals. |
| `utils/types.ts` | No new types in this file. (`SocialLink` type lives inside `contact-block.tsx` since no other file consumes it.) |
| `app/(root)/layout.tsx` | Replace `px-8` with `.container-page` ownership, change `gap-12` to `gap-16`. Net: `<main className="relative flex min-h-[calc(100dvh-56px)] flex-col gap-16 items-center justify-center bg-grid-pattern">{children}</main>`. |
| `app/globals.css` | Append one new component class: `.name-underline { border-bottom: 2px solid var(--accent); padding-bottom: 0.1em; }` inside the existing `@layer components` block. No other CSS changes. |
| `docs/superpowers/notes/spec-2-input.md` | Update — strike out (or remove) every `components/Home/**` entry as part of the spec's final commit. The remaining entries belong to specs 2b–2e. |

No other files are modified.

## Acceptance criteria

1. `bun run build` and `bun dev` complete with no new warnings.
2. The Home page renders the new asymmetric hero. Visual checklist (manual, in dev server):
   - Eyebrow `01 / About` in mono small caps at the top of the section.
   - Headline in Fraunces at display-xl size, with the name carrying a static accent-colored underline.
   - Bio sentence in `text-body-lg`, no horizontal justification.
   - Stack tag row in `text-small font-mono`, separated by `·`.
   - Identity column shows the photo with the offset palette-tinted grid-square behind it, then the email CTA, then three social icon buttons.
   - On a 360px-wide viewport, the layout stacks with the identity column on top, the eyebrow above both columns, and no horizontal scroll.
3. The fixed right-edge contact drawer is gone — no `position: fixed` element on the right edge of any page.
4. GSAP is no longer imported in `components/Home/index.tsx` or `components/Home/components/contact-block.tsx`. (Other section components may still import it; that is out of scope.)
5. Theme toggle continues to work; both light and dark modes render the new Home cleanly.
6. Grep `components/Home/**` for off-palette utilities: `rg -n "(^|\s|:)(bg|text|border)-(white|black|gray-\d+|blue-\d+)" components/Home/` → zero matches.
7. Grep `components/Home/**` for off-rhythm spacing: `rg -n "\b(gap|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(3|5|6|7|9|10|11|12|14)\b" components/Home/` → zero matches.
8. Grep `components/Home/**` for hex literals or arbitrary color values: zero matches.
9. The single arbitrary value `w-[250px]` on the photo wrapper is allowed; no other `[...]` arbitrary classes anywhere in `components/Home/**`.
10. `docs/superpowers/notes/spec-2-input.md` is updated to remove all `components/Home/**` entries.

## Lean guardrails

- Five files modified or created (Home/index.tsx, contact-block.tsx, constants, layout.tsx, globals.css), plus the audit doc update. Adding a sixth file is a scope creep signal.
- No new icon library, no new animation library, no new headless-UI primitive beyond what's already in `package.json`.
- No new design tokens, no new utility classes besides the single `.name-underline` CSS rule.
- One arbitrary value (`w-[250px]`). Any second one indicates a missed token.
- ContactBlock is the only subcomponent extracted. Headline, eyebrow, photo, bio, stack row stay inline in `Home/index.tsx`.

## Open questions

None at this point. Implementation plan will be produced by the writing-plans skill in the next step.
