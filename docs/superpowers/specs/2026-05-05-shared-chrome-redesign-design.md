# Shared Chrome Redesign — Spec 2e (Layout & Composition, part 5 of 5 — final)

**Date:** 2026-05-05
**Scope:** Final sub-spec of the layout & composition phase. Migrates the shared chrome — Navbar (+ NavItem + Drawer), Footer, Button, Switch, Separator — onto foundation tokens, and closes out the carry-forward debts accumulated across earlier specs (RESUME_URL constant, orphaned image assets, dead `imageData` type field). After this spec lands, every component in the codebase consumes only foundation tokens and rhythm; the audit doc's four findings sections should be empty.

## Context

After specs 2a–2d, the four section components (Home, Projects, Skills-certificates, Experiences) all consume foundation tokens, type scale, and 4-stop rhythm. The shared chrome did not. Today's chrome uses off-palette grays/blues throughout, an over-engineered Button with three variants of which one is used, hex-color SVG strokes in the Switch, an unused `Separator` component, and a Resume URL hardcoded in two places that have drifted (desktop links to a file, mobile drawer links to a folder).

This spec is a token migration with light cleanup. No fundamental redesigns. The mobile drawer's custom focus-trap + ESC handler stays as-is — replacing it with native `<dialog>` is tempting but out of scope for a migration spec.

## Goals

- Migrate every `components/Navbar/**`, `components/footer.tsx`, `components/button.tsx`, `components/switch.tsx` off off-palette utilities and onto foundation tokens.
- Reduce the `Button` component to two variants — `primary` (solid accent) and `outline` (border, transparent fill) — matching the inline CTA patterns established across specs 2a–2d.
- Replace inline hex SVG strokes in the Switch with `currentColor` so theme inheritance works.
- Add a single `RESUME_URL` constant in `utils/constants/index.ts`; reconcile the desktop-vs-mobile drift onto one canonical URL (the file URL).
- Remove `imageData` from `TExperienceData.workInfo` (no consumer after spec 2d).
- Delete the `Separator` component file (zero consumers after a grep audit) and the orphaned image assets (`internship-gentri.webp`, `telus-official-logo.png`) left behind by spec 2d.
- Close the audit: every `components/**` entry that previously appeared in `docs/superpowers/notes/spec-2-input.md`'s findings sections should be migrated or deleted by the end of this spec.

## Non-goals

- No replacement of the mobile drawer with a native `<dialog>`. The custom focus-trap + ESC handler stays.
- No fundamental redesigns of any chrome component (Q1 lean: token-only sweep).
- No changes to the `gsap` package itself. Spec 3 owns the full GSAP removal decision.
- No new design tokens, no new type-scale slots, no new component classes in `globals.css`.
- No motion changes (e.g., navbar scroll-shrink, drawer slide-in physics). Spec 3 owns motion language.
- No changes to other section components (Home, Projects, Skills-certificates, Experiences) beyond the cross-page smoke test in §Acceptance.

## Files this spec touches

| File | Disposition |
|---|---|
| `utils/constants/index.ts` | Modify — add `RESUME_URL` |
| `utils/types.ts` | Modify — remove `imageData` from `TExperienceData.workInfo` |
| `components/Navbar/index.tsx` | Rewrite — token migration + Button outline + RESUME_URL |
| `components/Navbar/components/nav-item.tsx` | Rewrite — token migration |
| `components/Navbar/components/nav-drawer.tsx` | Rewrite — token migration + Button outline + RESUME_URL |
| `components/footer.tsx` | Rewrite — hairline border-top, no fill |
| `components/button.tsx` | Rewrite — 2 variants on tokens |
| `components/switch.tsx` | Rewrite — token migration + extract SunIcon/MoonIcon |
| `components/separator.tsx` | Delete |
| `public/images/experiences/internship-gentri.webp` | Delete |
| `public/images/experiences/telus-official-logo.png` | Delete |
| `docs/superpowers/notes/spec-2-input.md` | Modify — strike chrome entries; add to "Migrated"; close out the audit |

No other files modified.

## RESUME_URL constant

`utils/constants/index.ts` gains a single line:

```ts
export const RESUME_URL =
  "https://drive.google.com/file/d/1AkTlqKIMGDQVnbBBLfmYqtrznzSysXEQ/view";
```

Both `Navbar/index.tsx` and `Navbar/components/nav-drawer.tsx` import it. The mobile drawer was previously linking to a folder URL (`drive.google.com/drive/folders/1z5k0cXU6HfPy3AV9yGlnmxecilbXYYRm`) — that drift is reconciled to the file URL.

## Type changes

`utils/types.ts` — remove `imageData` from `TExperienceData.workInfo`:

```ts
// before
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

// after
workInfo: {
  title: string;
  subtitle: string;
  location: string;
  startDate?: string;
  endDate?: string;
};
```

After spec 2d removed logo rendering, no code reads `imageData`. Trimming the type aligns the shape with how it's used.

## Navbar (`components/Navbar/index.tsx`)

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

Changes vs today:
- `bg-gray-300/20 dark:bg-gray-800/20 shadow-lg` → `bg-background/80 backdrop-blur-md border-b border-border`. Glassy translucent palette surface, hairline edge instead of drop shadow.
- `space-x-4` → `gap-4` (foundation rhythm).
- Resume button uses `variant="outline"` (no className overrides for color/font).
- `RESUME_URL` constant replaces hardcoded URL.
- `rel="noopener noreferrer"` added on the external link (security).

## NavItem (`components/Navbar/components/nav-item.tsx`)

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
- `text-blue-500 dark:text-blue-400` (active) → `text-foreground`.
- `text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-blue-400` (rest) → `text-muted hover:text-foreground`.
- Underline `bg-blue-500 dark:bg-blue-400` → `bg-accent`.
- `text-md font-semibold` → `text-small font-medium` (foundation type scale; `text-md` isn't a foundation class).
- Added `origin-left` so the underline animates from the left edge instead of the default center.
- Added `aria-hidden` on the decorative underline span.

## Drawer (`components/Navbar/components/nav-drawer.tsx`)

Token migration only. The custom focus trap and ESC handler are preserved. The Resume URL becomes `RESUME_URL`. The CSS-only fade/scale/translate transitions stay.

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
- All gray/blue colors → `text-muted` / `text-foreground` / `bg-surface` / `border-border`.
- Focus ring: `focus:ring-blue-500 dark:focus:ring-blue-400` → `focus:ring-accent`.
- Drawer surface: `bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg` → `bg-surface border border-border rounded-xl shadow-lg dark:shadow-none`.
- `pt-6` (off-rhythm) → `pt-8`.
- Resume button: `variant="ghost"` → `variant="outline"`; `RESUME_URL` constant; `rel="noopener noreferrer"` (already present).
- Removed `text-gray-*` font classes (now inheriting via parent).
- `min-w-[200px]` is one arbitrary value; allowed declared deviation in the design contract (one fixed mobile drawer width).

## Footer (`components/footer.tsx`)

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
- String concatenation `currentYear + " "` → JSX template (cleaner).
- Removed unused `import React from "react"`.
- Trailing period after "All rights reserved" — small copy polish.

## Button (`components/button.tsx`)

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
- 3 variants → 2 (`secondary` / `ghost` deleted; `outline` replaces `ghost`).
- All blue colors → palette tokens.
- `text-sm` / `text-base` / `text-lg` (Tailwind defaults) → `text-small` / `text-body` (foundation classes).
- `[&>svg]:mx-1` → `[&>svg]:size-4` for consistent inline icon sizing.
- Added `gap-2` so icon-and-label spacing matches the inline CTAs across pages.
- Default `transition-colors duration-200` → `transition-colors` (Tailwind default duration).
- Named types (`ButtonVariant`, `ButtonSize`) for clarity.

The `size="sm"` `px-3 py-1` is off-rhythm but **encapsulated inside the primitive**. Allowed deviation, declared below.

## Switch / ThemeSwitch (`components/switch.tsx`)

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
- Inline SVGs extracted into named components for readability and to use `currentColor` (no more inline `stroke="#1e2939"` / `stroke="#d1d5dc"`).
- Track: `bg-gray-300 dark:bg-gray-700 border-[1px] border-gray-400 dark:border-gray-500` → `bg-surface border border-border` off; `data-[checked]:bg-accent` on. Single `<Switch.Root>` element handles both modes via the data-attribute selector.
- Thumb: `bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600` → `bg-foreground` (one solid color that pops against either track surface).
- Removed the `cachedTheme` state and the `if (!mounted)` early-return pre-render. The `<ThemeScript>` already sets `data-theme` before paint; the switch JSX renders the same DOM in both states (just toggled via `checked`/`isDark`). The `mounted` flag remains only to gate the second `useEffect` (which writes to `document.documentElement`).
- Icon containers no longer carry `text-gray-*`; the parent's `text-foreground` cascades via `currentColor`.
- Added `aria-label="Toggle theme"` on `Switch.Root` for screen readers.

The thumb's `translate-x-1` (4px) and `translate-x-7` (28px) are slider-position math (not layout rhythm). Encapsulated inside the primitive. Allowed deviation.

## Separator deletion

`components/separator.tsx` is deleted. Verified zero consumers via:

```
rg -n "from \"@/portfolio/components/separator\"|from \"\\.\\.?/separator\"|from \"./separator\"" components/ app/
```

returning zero. Spec 2e's implementation reruns this grep before the delete.

## Orphaned image asset deletion

After spec 2d removed the experience-card logo rendering, two assets became orphaned:

- `public/images/experiences/internship-gentri.webp`
- `public/images/experiences/telus-official-logo.png`

Both deleted. Verified zero remaining references via:

```
rg -n "internship-gentri|telus-official-logo" components/ utils/ app/
```

returning zero (excluding `docs/`, which carries historical mentions).

## Design system contract

### Color tokens (chrome-specific applications)

| Component / use | Class |
|---|---|
| Navbar surface | `bg-background/80 backdrop-blur-md` |
| Navbar bottom edge | `border-b border-border` |
| NavItem inactive | `text-muted` |
| NavItem active / hover | `text-foreground` |
| NavItem underline | `bg-accent` |
| Drawer surface | `bg-surface` |
| Drawer border | `border border-border` |
| Drawer focus ring | `focus:ring-accent` |
| Footer top edge | `border-t border-border` |
| Footer text | `text-small text-muted` |
| Button primary | `bg-accent text-accent-foreground` (hover `bg-accent/90`) |
| Button outline | `border border-border text-foreground` (hover `border-accent text-accent`) |
| Switch track off | `bg-surface border border-border` |
| Switch track on | `data-[checked]:bg-accent` |
| Switch thumb | `bg-foreground` |
| Switch icons | inherit `text-foreground` from parent (via `currentColor`) |

### Typography

| Element | Class |
|---|---|
| NavItem label | `text-small font-medium` |
| Footer text | `text-small text-muted` |
| Button (sm/md) | `text-small` |
| Button (lg) | `text-body` |

### Spacing rhythm (4-stop)

| Step | Use |
|---|---|
| `p-1`, `pt-8` | Drawer close button padding, drawer ThemeSwitch top spacing |
| `gap-2`, `mt-2` | Switch icon + slider gap, button icon + label gap |
| `gap-4`, `p-4`, `py-4` | Navbar internal spacing, drawer nav `gap-4`, drawer inner padding |
| `py-8` | Footer vertical padding, drawer outer `py-8` |

### Allowed deviations (declared)

- `Button` size variants use `px-3 py-1` (sm) and `px-4 py-2` (md/lg). Encapsulated inside the primitive; consumers don't see the values. Allowed.
- `ThemeSwitch` thumb uses `translate-x-1` and `translate-x-7` for slider position. Slider math, not layout rhythm. Allowed.
- The fixed-position Navbar uses `z-999`. Kept from the existing code as a single fixed-position constant (no other component uses it).
- The Drawer uses `min-w-[200px]` and offsets `-top-4 -right-4`. Mobile drawer geometry; allowed as one localized arbitrary set inside the chrome.
- The Drawer's transition timing `duration-300 ease-in-out` exceeds the foundation's default `duration-200`. Kept from the existing implementation; spec 3 may unify motion timings.

### Forbidden

- `bg-gray-*`, `text-gray-*`, `border-gray-*`, `bg-blue-*`, `text-blue-*`, `bg-amber-*`, `bg-white`, `bg-black`, including `dark:` / `light:` variants.
- Off-rhythm gaps: `gap-3`, `gap-5`, `gap-6`, `gap-7`, `gap-9`–`14`. Same for `p-`, `m-`, etc., **except** inside the Button primitive.
- Raw hex literals or `bg-[#...]` outside the encapsulated declared exceptions.
- Inline SVG `stroke="#..."` / `fill="#..."` with hex values — must use `currentColor`.
- `font:` shorthand with `var()`.
- Tailwind default font-size utilities (`text-md`, `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`) — must use foundation classes.
- `secondary` or `ghost` Button variants (deleted).
- `<Separator>` imports anywhere (file deleted).
- Hardcoded Drive URLs in components (must import `RESUME_URL`).

## Acceptance criteria

1. `bun run build` and `bun dev` complete with no new warnings.
2. **Navbar:** glassy translucent fill (`bg-background/80 backdrop-blur-md`), hairline `border-b border-border`. NavItems show palette-correct text colors and a palette-accent underline that animates on hover and stays for the active route.
3. **Mobile drawer:** opens on small viewports, palette-tinted surface, palette-accent focus ring on trigger and links. ESC + outside-click + close button all work. Resume button uses `outline` variant. Custom focus-trap still functions (first focusable element in drawer receives focus on open).
4. **Footer:** hairline border-top, no fill, muted small-mono text. Centered. No bg-gray.
5. **Button:** Resume button (in both desktop nav and mobile drawer) renders with `outline` variant — palette border, foreground text, accent on hover. No blue colors anywhere on the page. The Button's `secondary` and `ghost` variants are gone (`grep -n "variant=\"secondary\"\\|variant=\"ghost\"" components/` returns zero).
6. **Switch:** track is `bg-surface` off / `bg-accent` on, thumb is `bg-foreground`, sun/moon icons use `currentColor` (no hex strokes). Slider position animates between left and right. Toggle still flips `data-theme` correctly. No hex literals anywhere in `components/switch.tsx`.
7. **Separator:** file no longer exists. `rg -n "from \"@/portfolio/components/separator\"" .` returns zero.
8. **Resume URL:** `RESUME_URL` constant exists in `utils/constants/index.ts`. Both Navbar and Drawer import it; `rg -n "drive\\.google\\.com" components/` returns zero (only `utils/constants/index.ts` should match).
9. **`imageData` field:** removed from `TExperienceData.workInfo` in `utils/types.ts`. Build passes (no consumer relied on it).
10. **Orphaned assets:** `public/images/experiences/internship-gentri.webp` and `public/images/experiences/telus-official-logo.png` deleted. `rg -n "internship-gentri|telus-official-logo" components/ utils/ app/` returns zero.
11. **Audit doc:** every remaining `components/Navbar/**`, `components/footer.tsx`, `components/button.tsx`, `components/switch.tsx`, `components/separator.tsx`, `components/modal-image.tsx` entry struck from the four findings sections; at least one of the four sections may now read `(none)`. New chrome files appear in the "Migrated" subsection.
12. **Cross-page smoke test:** every previously-redesigned page (`/`, `/projects`, `/skills-and-certificates`, `/experiences`) still renders correctly after the chrome migration. The navbar's new color/blur should harmonize, not clash, with each section. Visual checklist:
    - `/` (Home): hero still reads cleanly; eyebrow still clears the navbar (it does — `<main>` has `pt-20`).
    - `/projects`: featured card image-frame still renders; compact rows unchanged.
    - `/skills-and-certificates`: chips render; cert thumbnails render; lightbox still works.
    - `/experiences`: timeline rail + dots render; reveal still triggers on scroll.
13. Theme toggle works in both modes; FOUC still avoided (the `<ThemeScript>` is unchanged in this spec).

## Lean guardrails

- 5 chrome files rewritten (Navbar, NavItem, Drawer, Footer, Button, Switch — counting the larger files separately).
- 1 file deletion (Separator).
- 2 image asset deletions.
- 1 type field removal.
- 1 constant addition (`RESUME_URL`).
- 0 new dependencies.
- 0 new CSS classes (`@layer components` unchanged).
- All deviations encapsulated inside primitives or declared explicitly.

## Closes the layout phase

After spec 2e lands:

- All four section components (Home, Projects, Skills-certificates, Experiences) consume only foundation tokens.
- All shared chrome (Navbar, Footer, Button, Switch) consumes only foundation tokens.
- The audit doc's four findings sections are empty.
- The `Migrated` subsection lists every file in `components/` that's been touched.
- Spec 3 (perf + motion) is the final phase of the original 3-spec decomposition and inherits a fully tokenized, server-leaning, lean codebase to layer motion + bundle-size work onto.

## Open questions

None at this stage. Implementation plan will be produced by the writing-plans skill in the next step.
