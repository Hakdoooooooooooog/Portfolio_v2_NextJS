"use client";

import Image from "next/image";
import { navLinks, RESUME_URL } from "@/portfolio/utils/constants";
import { NavigationMenu } from "@base-ui-components/react";
import ThemeSwitch from "@/portfolio/components/switch";
import Drawers from "./components/nav-drawer";
import NavItems from "./components/nav-item";
import { ArrowUpRightIcon } from "@/portfolio/components/icons";

export default function Navbar() {
  return (
    <header className="fixed top-4 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 z-40 pointer-events-none">
      <div className="flex items-center justify-between gap-3 pointer-events-auto">
        {/* Brand Logo Pill (Top-Left) */}
        <a
          href="#about"
          className="grid place-items-center size-9 sm:size-10 rounded-full border border-border/80 bg-background/85 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/30 overflow-hidden hover:scale-105 hover:border-accent transition-all duration-200 cursor-pointer"
          aria-label="Back to top (About)"
        >
          <Image
            src="/images/pwa-icons/android-chrome-192x192.png"
            alt="Darenz Jasper Hicap logo"
            width={32}
            height={32}
            className="size-6 sm:size-7 object-contain rounded-full"
            priority
          />
        </a>

        <NavigationMenu.Root aria-label="Main Navigation">
          {/* Desktop Floating Pill */}
          <NavigationMenu.List className="hidden sm:flex items-center gap-1.5 rounded-full border border-border/80 bg-background/80 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/30 px-2 py-1.5">
            <NavItems items={navLinks} variant="pill" />

            <div
              className="h-4 w-px bg-border/80 mx-1 shrink-0"
              aria-hidden
            />

            <NavigationMenu.Item>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium border border-border bg-surface/70 hover:bg-surface text-foreground hover:border-accent hover:text-accent transition-all duration-150 cursor-pointer shadow-xs"
              >
                <span>Resume</span>
                <ArrowUpRightIcon className="size-3" />
              </a>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <ThemeSwitch />
            </NavigationMenu.Item>
          </NavigationMenu.List>

          {/* Mobile Floating Pill */}
          <NavigationMenu.List className="flex sm:hidden items-center gap-1.5 rounded-full border border-border/80 bg-background/85 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/30 px-2 py-1.5">
            <NavigationMenu.Item>
              <ThemeSwitch />
            </NavigationMenu.Item>

            <div
              className="h-4 w-px bg-border/80 shrink-0"
              aria-hidden
            />

            <NavigationMenu.Item className="relative">
              <Drawers items={navLinks} />
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>
      </div>
    </header>
  );
}
