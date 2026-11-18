"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NavigationMenu } from "@base-ui-components/react";
import { navLinks, RESUME_URL } from "@/portfolio/utils/constants";
import ThemeSwitch from "@/portfolio/components/switch";
import NavItems from "./components/nav-item";
import {
  ArrowUpRightIcon,
  CloseIcon,
  FileIcon,
  MenuIcon,
} from "@/portfolio/components/icons";

const NAVBAR_HEIGHT_PX = 64;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const updateViewportAndScroll = () => {
      const desktop = window.innerWidth >= 768;
      const scrolled = window.scrollY > NAVBAR_HEIGHT_PX;
      setIsDesktop(desktop);
      setIsScrolled(scrolled);
      if (desktop) {
        setMobileMenuOpen(false);
      }
    };

    updateViewportAndScroll();
    window.addEventListener("scroll", updateViewportAndScroll, { passive: true });
    window.addEventListener("resize", updateViewportAndScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateViewportAndScroll);
      window.removeEventListener("resize", updateViewportAndScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const showTopNavbar = !isScrolled && (isDesktop || !mobileMenuOpen);
  const showIconRail = isScrolled && (isDesktop || !mobileMenuOpen);
  const showMobileDrawer = !isDesktop && mobileMenuOpen;

  const enterTransition = shouldReduceMotion
    ? { duration: 0.08 }
    : { type: "spring" as const, damping: 28, stiffness: 320 };

  const exitTransition = { duration: 0.14, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <>
      {/* Full-links Top Navbar: hides when scrolled past navbar height on desktop */}
      <AnimatePresence initial={false}>
        {showTopNavbar && (
          <motion.header
            key="top-navbar"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -16 }}
            animate={{ opacity: 1, y: 0, transition: enterTransition }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -16, transition: exitTransition }}
            className="fixed top-0 inset-x-0 z-40 border-b border-border bg-background/90 backdrop-blur-md"
          >
            <div className="w-full px-5 sm:px-8 md:px-[3.75rem] h-16 flex items-center justify-between gap-4">
              <a
                href="#about"
                className="inline-flex items-center gap-2.5 text-small font-mono font-medium text-foreground hover:text-accent transition-colors"
                aria-label="Back to top"
              >
                <span className="grid place-items-center size-7 rounded-[4px] border border-border bg-surface overflow-hidden shrink-0">
                  <Image
                    src="/images/pwa-icons/android-chrome-192x192.png"
                    alt=""
                    width={24}
                    height={24}
                    className="size-5 object-contain"
                    priority
                  />
                </span>
                <span className="tracking-tight">darenz.hicap</span>
              </a>

              <NavigationMenu.Root aria-label="Top Navigation">
                <NavigationMenu.List className="hidden md:flex items-center gap-6">
                  <NavItems items={navLinks} variant="inline" />

                  <div className="h-4 w-px bg-border shrink-0" aria-hidden />

                  <NavigationMenu.Item>
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-mono font-medium border border-border bg-surface text-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer"
                    >
                      <span>Resume</span>
                      <ArrowUpRightIcon className="size-3" />
                    </a>
                  </NavigationMenu.Item>

                  <NavigationMenu.Item>
                    <ThemeSwitch />
                  </NavigationMenu.Item>
                </NavigationMenu.List>

                <NavigationMenu.List className="flex md:hidden items-center gap-2">
                  <NavigationMenu.Item>
                    <ThemeSwitch />
                  </NavigationMenu.Item>
                  <NavigationMenu.Item>
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(true)}
                      aria-expanded={mobileMenuOpen}
                      aria-controls="mobile-nav-rail"
                      aria-label="Open navigation menu"
                      className="grid place-items-center size-8 rounded-[4px] border border-border bg-surface text-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer"
                    >
                      <MenuIcon className="size-4" />
                    </button>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
              </NavigationMenu.Root>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Narrow Icon-Only Rail (40px wide) inside the right outer gutter on all viewports */}
      <AnimatePresence>
        {showIconRail && (
          <motion.aside
            id="floating-nav-rail"
            key="icon-rail"
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 12,
              scale: shouldReduceMotion ? 1 : 0.96,
            }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: enterTransition }}
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 12,
              scale: shouldReduceMotion ? 1 : 0.96,
              transition: exitTransition,
            }}
            aria-label="Floating navigation rail"
            className="flex fixed bottom-6 md:bottom-8 right-2 z-50 w-10 flex-col items-center gap-1 rounded-[6px] border border-border bg-surface/95 backdrop-blur-md shadow-xl p-1"
          >
            <NavigationMenu.Root aria-label="Rail Navigation">
              <NavigationMenu.List className="flex flex-col items-center gap-1">
                <NavItems items={navLinks} variant="icon-rail" />

                <li className="w-5 h-px bg-border my-0.5" aria-hidden />

                <NavigationMenu.Item className="relative">
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Resume"
                    className="group relative grid place-items-center size-8 rounded-[4px] text-muted hover:text-foreground hover:bg-surface-subtle/60 transition-colors"
                  >
                    <FileIcon className="size-4" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-full mr-2.5 px-2.5 py-1 rounded-[4px] border border-border bg-surface text-foreground text-xs font-mono whitespace-nowrap shadow-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-150 inline-flex items-center gap-1"
                    >
                      <span>Resume</span>
                      <ArrowUpRightIcon className="size-3" />
                    </span>
                  </a>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <ThemeSwitch />
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile backdrop & labeled drawer */}
      <AnimatePresence>
        {showMobileDrawer && (
          <motion.div
            key="mobile-rail-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMobileDrawer && (
          <motion.aside
            id="mobile-nav-rail"
            key="mobile-nav-rail"
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -10,
              scale: shouldReduceMotion ? 1 : 0.97,
            }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: enterTransition }}
            exit={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : -10,
              scale: shouldReduceMotion ? 1 : 0.97,
              transition: exitTransition,
            }}
            aria-label="Mobile navigation rail"
            className="md:hidden fixed top-4 right-5 z-50 w-44 rounded-[6px] border border-border bg-surface/95 backdrop-blur-md shadow-xl p-2"
          >
            <div className="flex items-center justify-between gap-2 px-2 pb-2 mb-1 border-b border-border">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-2 text-xs font-mono font-medium text-foreground hover:text-accent transition-colors truncate"
              >
                <span className="grid place-items-center size-5 rounded-[3px] border border-border bg-background overflow-hidden shrink-0">
                  <Image
                    src="/images/pwa-icons/android-chrome-192x192.png"
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 object-contain"
                  />
                </span>
                <span className="truncate">darenz</span>
              </a>

              <div className="flex items-center gap-1 shrink-0">
                <ThemeSwitch />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="grid place-items-center size-8 rounded-[4px] border border-border bg-background text-muted hover:text-foreground hover:border-accent transition-colors cursor-pointer"
                >
                  <CloseIcon className="size-3.5" />
                </button>
              </div>
            </div>

            <NavigationMenu.Root aria-label="Mobile Rail Navigation">
              <NavigationMenu.List className="flex flex-col gap-0.5">
                <NavItems
                  items={navLinks}
                  variant="mobile-rail"
                  onItemClick={() => setMobileMenuOpen(false)}
                />

                <li className="my-1 border-t border-border" aria-hidden />

                <NavigationMenu.Item>
                  <a
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-[4px] text-xs font-mono text-muted hover:text-foreground hover:bg-surface-subtle/60 transition-colors"
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <FileIcon className="size-3.5 shrink-0" />
                      <span>Resume</span>
                    </span>
                    <ArrowUpRightIcon className="size-3 shrink-0" />
                  </a>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
