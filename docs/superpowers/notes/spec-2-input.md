# Spec 2 Input — Component Audit

> Generated as part of Foundation (spec 1) acceptance. Lists every component-level deviation from the new token / spacing rhythm. Spec 2 is responsible for migrating each entry.

## Raw hex literals (`bg-[#...]`, `text-[#...]`, `border-[#...]`)

(none)

## Bare hex literals in component files

- components/switch.tsx:63 — stroke="#1e2939"
- components/switch.tsx:76 — stroke="#d1d5dc"

## Off-palette Tailwind defaults (gray / white / black, incl. dark:/light: variants)

(none)

## Off-rhythm spacing utilities

(none)

## Migrated to the new tokens (out of scope for spec 2 onward)

- `components/Home/index.tsx` — migrated in spec 2a (Home redesign).
- `components/Home/components/contact-block.tsx` — created in spec 2a; uses tokens from inception.
- `components/Projects/index.tsx` — rewritten in spec 2b (Projects redesign).
- `components/Projects/components/featured-project-card.tsx` — created in spec 2b; uses tokens from inception.
- `components/Projects/components/compact-project-row.tsx` — created in spec 2b; uses tokens from inception.
- `components/Projects/components/project-card.tsx` — deleted in spec 2b.
- `components/Projects/components/project-cta.tsx` — deleted in spec 2b.
- `components/Skills-certificates/index.tsx` — rewritten in spec 2c (Skills & Certificates redesign).
- `components/Skills-certificates/components/skill-category.tsx` — created in spec 2c; uses tokens from inception.
- `components/Skills-certificates/components/compact-certificate-row.tsx` — created in spec 2c; uses tokens from inception.
- `components/Skills-certificates/components/use-reveal.ts` — created in spec 2c; CSS-only reveal hook.
- `components/Skills-certificates/components/image-collage.tsx` — deleted in spec 2c.
- `components/Skills-certificates/components/certificates.tsx` — deleted in spec 2c.
- `components/Skills-certificates/components/tags.tsx` — deleted in spec 2c.
- `utils/hooks/useIsSmallDevice.ts` — deleted in spec 2c (no remaining consumers).
- `components/modal-image.tsx` — deleted in spec 2c (no remaining consumers).
- `components/Experiences/index.tsx` — rewritten in spec 2d (Experiences redesign).
- `components/Experiences/components/timeline-entry.tsx` — created in spec 2d; uses tokens from inception.
- `components/Experiences/components/experience-card.tsx` — deleted in spec 2d.
- `components/use-reveal.ts` — created in spec 2d (lifted from Skills-certificates/components/use-reveal.ts to shared root).
- `components/Skills-certificates/components/use-reveal.ts` — moved in spec 2d to `components/use-reveal.ts`.
- `components/Navbar/index.tsx` — rewritten in spec 2e (chrome migration).
- `components/Navbar/components/nav-item.tsx` — rewritten in spec 2e.
- `components/Navbar/components/nav-drawer.tsx` — rewritten in spec 2e.
- `components/footer.tsx` — rewritten in spec 2e.
- `components/button.tsx` — rewritten in spec 2e (reduced to primary + outline variants).
- `components/switch.tsx` — rewritten in spec 2e (icons use currentColor; cachedTheme state removed).
- `components/separator.tsx` — deleted in spec 2e (no consumers).
- `public/images/experiences/internship-gentri.webp` — deleted in spec 2e (orphaned after 2d).
- `public/images/experiences/telus-official-logo.png` — deleted in spec 2e (orphaned after 2d).
- `RESUME_URL` constant added to `utils/constants/index.ts`; consumers updated in Navbar + Drawer.
- `imageData` field removed from `TExperienceData.workInfo` in `utils/types.ts` (no consumers after 2d).

## Notes

- This list was captured at the moment the foundation landed. New violations introduced afterward are bugs.
- Spec 2 should treat each entry as one concrete migration: replace with `bg-background` / `bg-surface` / `bg-accent` / `border-border` / etc., or one of the four spacing rhythm stops (`-2`, `-4`, `-8`, `-16`).
- Note: components `Experiences/components/experience-card.tsx`, `Experiences/index.tsx`, `Skills-certificates/index.tsx`, and `utils/constants/index.ts` were also modified during foundation execution by side-effect commits — when spec 2 begins, treat their CURRENT state (not their pre-foundation state) as the input.
