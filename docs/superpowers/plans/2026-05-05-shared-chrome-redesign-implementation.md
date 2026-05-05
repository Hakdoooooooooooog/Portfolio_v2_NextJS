# Shared Chrome Redesign Implementation Plan (Spec 2e — final layout sub-spec)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the shared chrome (Navbar + NavItem + Drawer, Footer, Button, Switch) onto foundation tokens; reduce `Button` to two variants (`primary` + `outline`); replace inline hex SVG strokes with `currentColor`; reconcile the duplicated Resume URL into a `RESUME_URL` constant; delete the unused `Separator`; close out carry-forward debts (drop `imageData` from `TExperienceData`, delete orphaned image assets).

**Architecture:** Eight sequential changes. (1) Add `RESUME_URL` constant + drop `imageData` field from types. (2) Rewrite Footer (smallest file). (3) Rewrite Button (two variants). (4) Rewrite Switch. (5) Rewrite NavItem. (6) Rewrite Navbar (consumes RESUME_URL + Button outline). (7) Rewrite Drawer (consumes RESUME_URL + Button outline). (8) Cleanup pass — delete Separator, delete orphaned image assets, update audit doc, final acceptance verification.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, `@base-ui-components/react`, Bun. No new dependencies.

**Testing reality:** No test runner. Verification per task is `bun run build`, manual browser checks (light + dark, desktop + 360px mobile), and grep gates against the foundation's audit categories. Cross-page smoke test on `/`, `/projects`, `/skills-and-certificates`, `/experiences` after chrome migration lands.

**Reference spec:** `docs/superpowers/specs/2026-05-05-shared-chrome-redesign-design.md`.

---

## File map

| File | Disposition |
|---|---|
| `utils/constants/index.ts` | Modify — add `RESUME_URL` (Task 1) |
| `utils/types.ts` | Modify — drop `imageData` from `TExperienceData.workInfo` (Task 1) |
| `components/footer.tsx` | Rewrite (Task 2) |
| `components/button.tsx` | Rewrite — 2 variants (Task 3) |
| `components/switch.tsx` | Rewrite — extract icons, token migration (Task 4) |
| `components/Navbar/components/nav-item.tsx` | Rewrite — token migration (Task 5) |
| `components/Navbar/index.tsx` | Rewrite — token migration + RESUME_URL + Button outline (Task 6) |
| `components/Navbar/components/nav-drawer.tsx` | Rewrite — token migration + RESUME_URL + Button outline (Task 7) |
| `components/separator.tsx` | Delete (Task 8) |
| `public/images/experiences/internship-gentri.webp` | Delete (Task 8) |
| `public/images/experiences/telus-official-logo.png` | Delete (Task 8) |
| `docs/superpowers/notes/spec-2-input.md` | Modify — strike chrome entries; mark migrated; close audit (Task 8) |

---

## Task 1: Add `RESUME_URL` constant + drop `imageData` field

**Files:**
- Modify: `utils/constants/index.ts`
- Modify: `utils/types.ts`

- [ ] **Step 1: Add `RESUME_URL` to `utils/constants/index.ts`**

Open `utils/constants/index.ts`. After the `sectionNumbers` declaration (and before `skillCategories`), insert:

```ts

export const RESUME_URL =
  "https://drive.google.com/file/d/1AkTlqKIMGDQVnbBBLfmYqtrznzSysXEQ/view";
```

This is a single top-level const export. No other changes to the file.

- [ ] **Step 2: Drop `imageData` from `TExperienceData.workInfo` in `utils/types.ts`**

Open `utils/types.ts`. Find `TExperienceData` and locate the `workInfo` block. It currently looks like:

```ts
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
```

Replace the entire `workInfo` block with:

```ts
workInfo: {
  title: string;
  subtitle: string;
  location: string;
  startDate?: string;
  endDate?: string;
};
```

(Just delete the `imageData?: { ... };` lines.)

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: build completes. No TS errors. The `RESUME_URL` constant is unused at this point (Tasks 6 + 7 consume it). The `imageData` field removal doesn't break anything because no consumer reads it after spec 2d.

- [ ] **Step 4: Commit**

```bash
git add utils/constants/index.ts utils/types.ts
git commit -m "feat(chrome): add RESUME_URL constant and drop unused imageData field"
```

---

## Task 2: Rewrite Footer

**Files:**
- Modify: `components/footer.tsx`

- [ ] **Step 1: Read the current file**

Run: `cat components/footer.tsx`
Confirm it has `bg-gray-100 dark:bg-gray-800 p-4` on the `<footer>`, `text-gray-600 dark:text-gray-300` on the `<p>`, and a `currentYear + " "` string concatenation.

- [ ] **Step 2: Replace the entire file with this exact content**

```tsx
const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full border-t border-border py-8 text-center">
      <p className="text-small text-muted">
        © {currentYear} Hicap&apos;s Portfolio. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
```

Changes:
- `bg-gray-100 dark:bg-gray-800 p-4` → `border-t border-border py-8`.
- `text-gray-600 dark:text-gray-300` → `text-small text-muted`.
- Removed the unused `import React from "react"` (modern JSX runtime).
- `currentYear + " "` → JSX `{currentYear}` (no string concatenation).
- Trailing period after "All rights reserved" — minor copy polish.

- [ ] **Step 3: Verify build + dev render**

Run: `bun run build`
Expected: build completes. No warnings.

Run: `bun dev`. Open any page (e.g. `http://localhost:3000`). Scroll to the bottom. Expected:
- Footer is no longer a tinted bar.
- A hairline `border-border` line sits above the copyright text.
- Copyright reads in muted small text, centered.
- Theme toggle: both modes render cleanly (no gray remnants).

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add components/footer.tsx
git commit -m "feat(chrome): retreat Footer to hairline border-top, no fill"
```

---

## Task 3: Rewrite Button

**Files:**
- Modify: `components/button.tsx`

- [ ] **Step 1: Read the current file**

Run: `cat components/button.tsx`
Confirm it has 3 variants (`primary` / `secondary` / `ghost`), all using blue colors.

- [ ] **Step 2: Replace the entire file with this exact content**

```tsx
type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...buttonProps
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent [&>svg]:size-4";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-accent text-accent-foreground hover:bg-accent/90",
    outline:
      "border border-border text-foreground hover:border-accent hover:text-accent",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-small",
    md: "px-4 py-2 text-small",
    lg: "px-4 py-2 text-body",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};
```

Changes:
- 3 variants → 2 (`secondary` and `ghost` deleted).
- All blue colors → palette tokens (`bg-accent`, `text-accent-foreground`, `border-border`, etc.).
- `text-sm` / `text-base` / `text-lg` → `text-small` / `text-body` (foundation type-scale classes).
- `[&>svg]:mx-1` → `[&>svg]:size-4` for consistent inline icon sizing.
- Added `gap-2` for icon-and-label spacing.
- Default `transition-colors duration-200` → `transition-colors`.
- Named types `ButtonVariant` / `ButtonSize` for clarity.
- Note: `size="sm"` uses `px-3 py-1` (off-rhythm), encapsulated inside the primitive — declared as allowed deviation in spec.

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: build completes. The Navbar and Drawer still reference `variant="ghost"` (consumed in Tasks 6 + 7) — TypeScript will flag this as an error: `Type '"ghost"' is not assignable to type 'ButtonVariant'`.

**Expected: BUILD FAILS at this step.** This is a deliberate broken intermediate state — Tasks 6 and 7 update the consumers to use `variant="outline"`. Move on.

If the build fails on anything else (a typo in this Button rewrite), fix it before committing.

- [ ] **Step 4: Commit**

```bash
git add components/button.tsx
git commit -m "feat(chrome): reduce Button to primary + outline on tokens"
```

---

## Task 4: Rewrite Switch

**Files:**
- Modify: `components/switch.tsx`

- [ ] **Step 1: Read the current file**

Run: `cat components/switch.tsx`
Confirm it has the `cachedTheme` state, the `if (!mounted)` early-return JSX, the inline SVG `stroke="#1e2939"` and `stroke="#d1d5dc"` hex strokes, and gray track/thumb colors.

- [ ] **Step 2: Replace the entire file with this exact content**

```tsx
"use client";

import { Switch } from "@base-ui-components/react";
import { useEffect, useState } from "react";
import { useThemeStore } from "../utils/store/theme-store";
import { useShallow } from "zustand/shallow";

const SunIcon = () => (
  <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
);

const MoonIcon = () => (
  <svg className="size-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
    }))
  );

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  const isDark = theme === "dark";

  return (
    <div className="flex items-center gap-2 text-foreground">
      <span aria-hidden>{isDark ? <MoonIcon /> : <SunIcon />}</span>
      <Switch.Root
        onCheckedChange={toggleTheme}
        checked={isDark}
        aria-label="Toggle theme"
        className="w-12 h-6 rounded-full relative cursor-pointer transition-colors data-[checked]:bg-accent bg-surface border border-border"
      >
        <Switch.Thumb
          className={`absolute top-1/2 -translate-y-1/2 size-4 rounded-full transition-transform shadow-sm dark:shadow-none bg-foreground ${
            isDark ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </Switch.Root>
    </div>
  );
};

export default ThemeSwitch;
```

Changes:
- Inline SVGs extracted into named `SunIcon` / `MoonIcon` components.
- All hex strokes (`stroke="#1e2939"`, `stroke="#d1d5dc"`) gone — icons use `fill="currentColor"`.
- Track: `bg-surface border border-border` off; `data-[checked]:bg-accent` on.
- Thumb: `bg-foreground` only.
- Removed `cachedTheme` state and the `if (!mounted)` early-return JSX (the `<ThemeScript>` already sets `data-theme` before paint; both render branches were rendering the same DOM anyway).
- Added `aria-label="Toggle theme"` on `Switch.Root`.
- Removed `text-gray-*` classes from icon containers; parent's `text-foreground` cascades via `currentColor`.

- [ ] **Step 3: Verify build**

Run: `bun run build`
Expected: still failing on the `variant="ghost"` references in Navbar + Drawer (from Task 3). The Switch rewrite itself should not introduce new errors.

If you see a NEW error specific to `components/switch.tsx`, fix before committing.

- [ ] **Step 4: Commit**

```bash
git add components/switch.tsx
git commit -m "feat(chrome): retreat ThemeSwitch to tokens, extract icons, drop cachedTheme"
```

---

## Task 5: Rewrite NavItem

**Files:**
- Modify: `components/Navbar/components/nav-item.tsx`

- [ ] **Step 1: Replace the entire file with this exact content**

```tsx
"use client";

import { TNavigationLink } from "@/portfolio/utils/types";
import { NavigationMenu } from "@base-ui-components/react";
import { usePathname } from "next/navigation";

const NavItems = ({ items }: { items: TNavigationLink[] }) => {
  const pathname = usePathname();

  return items.map((item) => {
    const isActive = pathname === item.href;

    return (
      <NavigationMenu.Item key={item.label} className="group">
        <NavigationMenu.Link
          href={item.href}
          className={`text-small font-medium no-underline transition-colors duration-200 relative ${
            isActive ? "text-foreground" : "text-muted hover:text-foreground"
          }`}
        >
          {item.label}
          <span
            aria-hidden
            className={`absolute -bottom-1 left-0 w-full h-0.5 bg-accent transition-transform duration-200 origin-left ${
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );
  });
};

export default NavItems;
```

Changes:
- Active blue → `text-foreground`.
- Inactive gray + hover blue → `text-muted hover:text-foreground`.
- Underline `bg-blue-*` → `bg-accent`.
- `text-md font-semibold` → `text-small font-medium` (foundation type-scale).
- Added `origin-left` so the underline animates from the left edge (today's center-scaling looks off).
- Added `aria-hidden` on the decorative underline span.

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: still failing on Tasks 6 + 7's `ghost` consumers.

- [ ] **Step 3: Commit**

```bash
git add components/Navbar/components/nav-item.tsx
git commit -m "feat(chrome): retreat NavItem to tokens, accent underline"
```

---

## Task 6: Rewrite Navbar (consumes RESUME_URL + Button outline)

**Files:**
- Modify: `components/Navbar/index.tsx`

- [ ] **Step 1: Replace the entire file with this exact content**

```tsx
import { navLinks, RESUME_URL } from "@/portfolio/utils/constants";
import { NavigationMenu } from "@base-ui-components/react";
import { Button } from "../button";
import ThemeSwitch from "../switch";
import Drawers from "./components/nav-drawer";
import NavItems from "./components/nav-item";

const Navbar = () => {
  return (
    <header>
      <NavigationMenu.Root className="fixed z-999 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <NavigationMenu.List className="flex items-center justify-end md:justify-center p-4">
          <NavigationMenu.List className="hidden w-full sm:flex items-center justify-center gap-4">
            <NavItems items={navLinks} />
            <NavigationMenu.Item>
              <Button variant="outline" size="md">
                <NavigationMenu.Link
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-full block"
                >
                  My Resume
                </NavigationMenu.Link>
              </Button>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <NavigationMenu.Item className="hidden sm:block">
            <ThemeSwitch />
          </NavigationMenu.Item>

          <NavigationMenu.Item className="relative sm:hidden">
            <Drawers items={navLinks} />
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
};

export default Navbar;
```

Changes:
- `bg-gray-300/20 dark:bg-gray-800/20 shadow-lg` → `bg-background/80 backdrop-blur-md border-b border-border`.
- `space-x-4` → `gap-4`.
- Resume button: `variant="ghost"` → `variant="outline"`. The className overrides (`text-md font-bold no-underline cursor-pointer`) are gone — the new Button primitive handles styling.
- Hardcoded URL → `RESUME_URL` import.
- Added `rel="noopener noreferrer"` for the external link.

- [ ] **Step 2: Verify build**

Run: `bun run build`
Expected: still failing on `Drawers` (Task 7's `ghost` reference). The Navbar itself should now compile cleanly.

- [ ] **Step 3: Commit**

```bash
git add components/Navbar/index.tsx
git commit -m "feat(chrome): retreat Navbar to glassy palette surface, use RESUME_URL and Button outline"
```

---

## Task 7: Rewrite Drawer (consumes RESUME_URL + Button outline)

**Files:**
- Modify: `components/Navbar/components/nav-drawer.tsx`

- [ ] **Step 1: Replace the entire file with this exact content**

```tsx
"use client";

import { TNavigationLink } from "@/portfolio/utils/types";
import { NavigationMenu } from "@base-ui-components/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../../button";
import ThemeSwitch from "../../switch";
import NavItems from "./nav-item";
import { RESUME_URL } from "@/portfolio/utils/constants";

const Drawers = ({ items }: { items: TNavigationLink[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        const firstFocusable = drawerRef.current?.querySelector(
          'a, button, [tabindex="0"]'
        ) as HTMLElement;
        firstFocusable?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <NavigationMenu.Trigger
        onClick={toggleDrawer}
        className="text-muted hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent rounded-md"
      >
        <span className="sr-only">Open menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </NavigationMenu.Trigger>

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`absolute py-8 min-w-[200px] -top-4 -right-4 bg-surface border border-border rounded-xl shadow-lg dark:shadow-none z-999 transform-gpu transition-all duration-300 ease-in-out origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        style={{ transformOrigin: "top right" }}
      >
        <div className="size-full p-4">
          <button
            type="button"
            onClick={toggleDrawer}
            className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent rounded-md p-1"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <nav
            className="flex flex-col gap-4"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <NavItems items={items} />
            <NavigationMenu.Item>
              <Button variant="outline" size="md">
                <NavigationMenu.Link
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-full block"
                >
                  My Resume
                </NavigationMenu.Link>
              </Button>
            </NavigationMenu.Item>
            <div className="self-center w-fit pt-8">
              <ThemeSwitch />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Drawers;
```

Changes:
- All `text-gray-*` / `bg-white dark:bg-gray-800` / `border-gray-*` → palette tokens.
- Focus ring `focus:ring-blue-*` → `focus:ring-accent`.
- Drawer surface: `bg-surface border border-border rounded-xl shadow-lg dark:shadow-none`.
- `pt-6` (off-rhythm) → `pt-8`.
- Resume button: `variant="ghost"` → `variant="outline"`; `RESUME_URL` constant; the hardcoded folder URL is gone (was a different URL than desktop — drift fixed).
- `aria-hidden` added on both decorative SVGs.

- [ ] **Step 2: Verify build now succeeds**

Run: `bun run build`
Expected: build COMPLETES. All `variant="ghost"` references are gone; both Navbar consumers use `variant="outline"`. The `Button` rewrite (Task 3) is now consistent with both call sites.

If build fails for any reason, fix before committing.

- [ ] **Step 3: Smoke-test the dev server**

Run: `bun dev`. Open `http://localhost:3000`.

Desktop checklist:
- Navbar: glassy translucent palette surface, hairline `border-b border-border` (no shadow).
- NavItems: muted text rest state, foreground on hover/active. Palette-accent underline animates from left on hover, stays for active route.
- Resume button: outline variant — palette border, foreground text, accent on hover.
- ThemeSwitch: track is `bg-surface border border-border` when off (light), `bg-accent` when on (dark). Thumb is `bg-foreground`. Sun/moon icons render in foreground color.

Resize to mobile (< 640px):
- Navbar collapses to drawer trigger.
- Click hamburger → drawer slides in from top-right with palette-tinted surface, `border border-border`, `rounded-xl`.
- Inside drawer: NavItems, Resume button (outline), ThemeSwitch.
- ESC, click outside, close button all dismiss.
- Focus ring on trigger and links is palette-accent (lavender in dark / slate in light).

Cross-page smoke test (resize back to desktop):
- `/` (Home): hero renders cleanly; eyebrow clears the navbar.
- `/projects`: featured card renders; compact rows render; CTAs styled consistently.
- `/skills-and-certificates`: chips, cert thumbnails, lightbox all work.
- `/experiences`: timeline rail + dots render; reveal still works on scroll.

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add components/Navbar/components/nav-drawer.tsx
git commit -m "feat(chrome): retreat Drawer to tokens, use RESUME_URL and Button outline"
```

---

## Task 8: Cleanup pass — delete Separator + orphaned assets, update audit doc

**Files:**
- Delete: `components/separator.tsx`
- Delete: `public/images/experiences/internship-gentri.webp`
- Delete: `public/images/experiences/telus-official-logo.png`
- Modify: `docs/superpowers/notes/spec-2-input.md`

- [ ] **Step 1: Verify Separator has zero consumers**

Run from repo root:

```
rg -n "from \"@/portfolio/components/separator\"|from \"\\.\\.?/separator\"|from \"./separator\"" components/ app/
```

Expected: zero matches. If any match, STOP and report — the file has consumers and shouldn't be deleted in this spec.

- [ ] **Step 2: Verify orphaned image assets are not referenced**

Run from repo root:

```
rg -n "internship-gentri|telus-official-logo" components/ utils/ app/
```

Expected: zero matches in code (`docs/` mentions are fine).

- [ ] **Step 3: Delete the three files**

Run:

```bash
git rm components/separator.tsx
git rm public/images/experiences/internship-gentri.webp
git rm public/images/experiences/telus-official-logo.png
```

- [ ] **Step 4: Update the audit doc**

Open `docs/superpowers/notes/spec-2-input.md`. The doc has four findings sections plus a "Migrated to the new tokens" subsection.

In each of the four findings sections, delete every bullet that references:
- `- components/Navbar/`
- `- components/footer`
- `- components/button`
- `- components/switch`
- `- components/separator`
- `- components/modal-image` (if any remain — should already be gone after spec 2c)

If a section becomes empty, replace its body with `(none)`.

Append these bullets to the END of the "Migrated to the new tokens (out of scope for spec 2 onward)" subsection's bullet list:

```markdown
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
```

- [ ] **Step 5: Verify final greps**

Run from repo root:

```
rg -n "(^|\\s|:)(bg|text|border)-(white|black|gray-\\d+|blue-\\d+|amber-\\d+)" components/Navbar/ components/footer.tsx components/button.tsx components/switch.tsx
rg -n "\\b(gap|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(3|5|6|7|9|10|11|12|14)\\b" components/Navbar/ components/footer.tsx components/switch.tsx
rg -n "#[0-9A-Fa-f]{6}\\b" components/Navbar/ components/footer.tsx components/button.tsx components/switch.tsx
rg -n "drive\\.google\\.com" components/
rg -n "variant=\"secondary\"|variant=\"ghost\"" components/
```

Expected: every command returns zero matches except possibly the **Button primitive's encapsulated** off-rhythm `px-3 py-1` for `size="sm"`. The greps above target the Navbar/Footer/Switch — the Button file is excluded from the off-rhythm grep because its size variants are declared deviations.

If `components/button.tsx` itself shows up in the off-rhythm grep, that's the encapsulated `px-3 py-1`. Acceptable.

- [ ] **Step 6: Commit**

```bash
git add docs/superpowers/notes/spec-2-input.md components/separator.tsx public/images/experiences/internship-gentri.webp public/images/experiences/telus-official-logo.png
git commit -m "chore(chrome): delete Separator and orphaned assets, close out spec-2 audit"
```

`git rm` from Step 3 already staged the deletions; the `git add` covers the audit doc edit.

---

## Task 9: Final acceptance walk-through

**Files:** none (verification only).

- [ ] **Step 1: Build clean**

Run: `bun run build`
Expected: build completes. No new warnings.

- [ ] **Step 2: Cross-page visual checklist on the dev server**

Run: `bun dev`. Walk through every page:

- `/` (Home): eyebrow `01 / About`, Fraunces hero, photo with grid frame, contact block. Navbar overlays cleanly with palette translucency.
- `/projects`: eyebrow `02 / Projects`, Redbiomed featured card, compact rows. Resume button in navbar uses outline variant.
- `/skills-and-certificates`: eyebrow `03 / Skills & Certificates`, chip categories, cert rows.
- `/experiences`: eyebrow `04 / Experiences`, timeline.

In each page:
- Theme toggle works (light + dark).
- 360px viewport: layout doesn't break.
- Footer at bottom: hairline border-top, muted small text, no fill.
- Mobile: drawer trigger works, drawer opens with palette-tinted surface.

- [ ] **Step 3: Final summary**

Run: `git log --oneline -10`
Expected: eight implementation commits visible (Tasks 1–8 produce 8 commits; Task 9 has no commit unless a fix is needed) plus the spec commit (`942ba1d`) above them.

Run: `git log --oneline c8ed564..HEAD | wc -l`
Expected: a substantial number reflecting the full layout phase (specs 2a–2e) work landed.

The layout phase is complete. Spec 3 (perf + motion) is the final phase of the original 3-spec decomposition.

---

## Self-review notes

- **Spec coverage:**
  - `RESUME_URL` constant + `imageData` removal → Task 1.
  - Footer rewrite → Task 2.
  - Button rewrite → Task 3.
  - Switch rewrite → Task 4.
  - NavItem rewrite → Task 5.
  - Navbar rewrite → Task 6.
  - Drawer rewrite → Task 7.
  - Separator deletion + orphaned asset deletion + audit update → Task 8.
  - Cross-page smoke test → Task 9.
- **Placeholder scan:** no "TBD", no "similar to above", no vague "handle errors". Every code block contains the full final code. Every command lists its expected outcome (including the deliberate broken-intermediate states in Tasks 3–6, which are explicitly called out).
- **Type consistency:**
  - `RESUME_URL: string` (Task 1) is consumed by Tasks 6 + 7 via `import { RESUME_URL }`.
  - `ButtonVariant = "primary" | "outline"` (Task 3) is consumed by Tasks 6 + 7 as `variant="outline"`.
  - The `imageData` field removal (Task 1) is consistent with spec 2d's deletion of the consumer code; no other code reads this field.
  - `useReveal` hook (lifted in spec 2d) is unaffected by this spec.
- **Broken intermediate states:** Tasks 3, 4, 5, 6 each leave the build in a partial state where Tasks 6 + 7's existing `variant="ghost"` references conflict with the new `Button` primitive. Task 7 fully resolves this. The plan documents these states explicitly so reviewers don't think the build was forgotten. As an alternative to broken intermediates, Tasks 3–7 could be combined into one giant commit, but separate task-per-file commits keep review easier.
- **Closes the layout phase:** after Task 8 lands, the audit doc's four findings sections should be empty (or near-empty modulo edge cases). The "Migrated" subsection lists every file in `components/` that's been touched across specs 2a–2e.
