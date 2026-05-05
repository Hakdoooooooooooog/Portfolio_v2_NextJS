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
- components/modal-image.tsx:65 — bg-black/40
- components/modal-image.tsx:89 — bg-black/60
- components/modal-image.tsx:99 — border-gray-300 dark:border-gray-600
- components/footer.tsx:7 — bg-gray-100 dark:bg-gray-800
- components/footer.tsx:8 — text-gray-600 dark:text-gray-300
- components/button.tsx:18 — bg-blue-500 text-white dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700
- components/button.tsx:20 — bg-gray-500 text-white dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700
- components/Skills-certificates\index.tsx:70 — text-gray-700 dark:text-gray-300
- components/Skills-certificates\index.tsx:92 — text-gray-700 dark:text-gray-300
- components/Experiences\index.tsx:99 — border-gray-300/60 dark:border-gray-700/60 bg-gray-200/40 dark:bg-gray-900/30
- components/Experiences\index.tsx:104 — border-gray-400/40 bg-gray-500/10 text-gray-600 dark:text-gray-300
- components/Experiences\index.tsx:107 — text-gray-500 dark:text-gray-400
- components/Experiences\index.tsx:117 — text-gray-500 dark:text-gray-400
- components/Experiences\components\experience-card.tsx:40 — text-gray-900 dark:text-white
- components/Experiences\components\experience-card.tsx:43 — text-gray-600 dark:text-gray-500
- components/Experiences\components\experience-card.tsx:56 — text-gray-500 dark:text-gray-600
- components/Experiences\components\experience-card.tsx:88 — text-gray-700 dark:text-gray-300
- components/Experiences\components\experience-card.tsx:95 — text-gray-700 dark:text-gray-300
- components/Experiences\components\experience-card.tsx:109 — bg-blue-300 dark:bg-blue-700/50 text-blue-900 dark:text-gray-300 dark:hover:bg-gray-700
- components/Experiences\components\experience-card.tsx:127 — border-gray-200 dark:border-gray-700 bg-gray-300/75 dark:bg-gray-800/75
- components/Experiences\components\experience-card.tsx:140 — text-gray-700 dark:text-gray-300
- components/Navbar\index.tsx:13 — bg-gray-300/20 dark:bg-gray-800/20
- components/Projects\components\project-card.tsx:20 — bg-gray-400/75 dark:bg-gray-800/75
- components/Projects\components\project-card.tsx:22 — text-gray-800 dark:text-gray-200
- components/Projects\components\project-card.tsx:37 — text-gray-600 dark:text-gray-400
- components/Projects\components\project-card.tsx:62 — bg-black/80
- components/Skills-certificates\components\image-collage.tsx:32 — bg-gray-300/75 dark:bg-gray-800/75
- components/Skills-certificates\components\certificates.tsx:41 — bg-gray-300/80 dark:bg-gray-800/80
- components/Skills-certificates\components\certificates.tsx:61 — bg-black/80
- components/Skills-certificates\components\certificates.tsx:94 — text-gray-600 dark:text-gray-400
- components/Navbar\components\nav-item.tsx:20 — text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-blue-400
- components/Navbar\components\nav-drawer.tsx:45 — text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-blue-400
- components/Navbar\components\nav-drawer.tsx:69 — bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700
- components/Navbar\components\nav-drawer.tsx:82 — text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-blue-400

## Off-rhythm spacing utilities

- components/Experiences\index.tsx:91 — py-24 px-4 gap-12
- components/Experiences\index.tsx:92 — gap-6
- components/Experiences\index.tsx:102 — px-5 py-4 gap-3
- components/Experiences\index.tsx:104 — px-3 py-1
- components/Experiences\index.tsx:132 — px-5 pb-5 gap-6
- components/Skills-certificates\index.tsx:92 — pb-12
- components/Skills-certificates\index.tsx:97 — gap-6
- components/Projects\components\project-card.tsx:20 — gap-12 p-4
- components/Projects\components\project-card.tsx:25 — gap-2 mb-12
- components/Experiences\components\experience-card.tsx:49 — px-3 py-1
- components/Experiences\components\experience-card.tsx:95 — gap-2
- components/Experiences\components\experience-card.tsx:127 — gap-4 p-6
- components/Experiences\components\experience-card.tsx:161 — p-3 mt-auto
- components/Navbar\components\nav-drawer.tsx:122 — pt-6

## Migrated to the new tokens (out of scope for spec 2 onward)

- `components/Home/index.tsx` — migrated in spec 2a (Home redesign).
- `components/Home/components/contact-block.tsx` — created in spec 2a; uses tokens from inception.

## Notes

- This list was captured at the moment the foundation landed. New violations introduced afterward are bugs.
- Spec 2 should treat each entry as one concrete migration: replace with `bg-background` / `bg-surface` / `bg-accent` / `border-border` / etc., or one of the four spacing rhythm stops (`-2`, `-4`, `-8`, `-16`).
- Note: components `Experiences/components/experience-card.tsx`, `Experiences/index.tsx`, `Skills-certificates/index.tsx`, and `utils/constants/index.ts` were also modified during foundation execution by side-effect commits — when spec 2 begins, treat their CURRENT state (not their pre-foundation state) as the input.
