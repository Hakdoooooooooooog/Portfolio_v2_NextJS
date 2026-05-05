# Spec 2 Input — Component Audit

> Generated as part of Foundation (spec 1) acceptance. Lists every component-level deviation from the new token / spacing rhythm. Spec 2 is responsible for migrating each entry.

## Raw hex literals (`bg-[#...]`, `text-[#...]`, `border-[#...]`)

(none)

## Bare hex literals in component files

- components/switch.tsx:63 — stroke="#1e2939"
- components/switch.tsx:76 — stroke="#d1d5dc"

## Off-palette Tailwind defaults (gray / white / black, incl. dark:/light: variants)

- components/switch.tsx:41 — bg-gray-300 dark:bg-gray-600
- components/switch.tsx:45 — bg-gray-300 dark:bg-gray-700 border-gray-400 dark:border-gray-500
- components/switch.tsx:49 — bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
- components/switch.tsx:61 — text-gray-800 dark:text-gray-300
- components/switch.tsx:74 — text-gray-300 dark:text-gray-800
- components/switch.tsx:87 — bg-gray-300 dark:bg-gray-700 border-gray-400 dark:border-gray-500
- components/switch.tsx:91 — bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
- components/separator.tsx:5 — border-gray-300 dark:border-gray-700
- components/footer.tsx:7 — bg-gray-100 dark:bg-gray-800
- components/footer.tsx:8 — text-gray-600 dark:text-gray-300
- components/button.tsx:18 — bg-blue-500 text-white dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700
- components/button.tsx:20 — bg-gray-500 text-white dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700
- components/Navbar\index.tsx:13 — bg-gray-300/20 dark:bg-gray-800/20
- components/Navbar\components\nav-item.tsx:20 — text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-blue-400
- components/Navbar\components\nav-drawer.tsx:45 — text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-blue-400
- components/Navbar\components\nav-drawer.tsx:69 — bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700
- components/Navbar\components\nav-drawer.tsx:82 — text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-blue-400

## Off-rhythm spacing utilities

- components/Navbar\components\nav-drawer.tsx:122 — pt-6

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

## Notes

- This list was captured at the moment the foundation landed. New violations introduced afterward are bugs.
- Spec 2 should treat each entry as one concrete migration: replace with `bg-background` / `bg-surface` / `bg-accent` / `border-border` / etc., or one of the four spacing rhythm stops (`-2`, `-4`, `-8`, `-16`).
- Note: components `Experiences/components/experience-card.tsx`, `Experiences/index.tsx`, `Skills-certificates/index.tsx`, and `utils/constants/index.ts` were also modified during foundation execution by side-effect commits — when spec 2 begins, treat their CURRENT state (not their pre-foundation state) as the input.
