"use client";

import { useState, useRef, useEffect } from "react";
import { TNavigationLink } from "@/portfolio/utils/types";
import { NavigationMenu } from "@base-ui-components/react";
import { AnimatePresence, motion } from "motion/react";
import NavItems from "./nav-item";
import { RESUME_URL } from "@/portfolio/utils/constants";
import { CloseIcon, ArrowUpRightIcon } from "@/portfolio/components/icons";

export default function Drawers({ items }: { items: TNavigationLink[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", handleKeyDown);

    const timer = setTimeout(() => {
      const firstFocusable = drawerRef.current?.querySelector(
        'a, button, [tabindex="0"]'
      ) as HTMLElement | null;
      firstFocusable?.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen]);

  return (
    <>
      <NavigationMenu.Trigger
        onClick={toggleDrawer}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-dialog"
        className="grid place-items-center size-9 rounded-full border border-border bg-surface/70 hover:bg-surface text-foreground transition-all duration-200 hover:border-accent hover:text-accent cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </NavigationMenu.Trigger>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav-root"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-0 z-[70] sm:hidden"
          >
            {/* Backdrop */}
            <div
              onClick={closeDrawer}
              className="absolute inset-0 bg-background/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Panel */}
            <motion.div
              key="drawer-panel"
              ref={drawerRef}
              id="mobile-nav-dialog"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-16 right-4 w-64 bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden p-5 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-mono font-semibold tracking-wider uppercase text-muted">
                  Navigation
                </span>
                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="grid place-items-center size-7 rounded-md border border-border/80 text-muted hover:text-foreground hover:border-accent transition-colors cursor-pointer"
                >
                  <CloseIcon className="size-3.5" />
                </button>
              </div>

              <nav
                className="flex flex-col gap-1.5"
                role="navigation"
                aria-label="Mobile navigation links"
              >
                <NavItems
                  items={items}
                  variant="vertical"
                  onItemClick={closeDrawer}
                />
              </nav>

              <div className="pt-3 border-t border-border flex flex-col gap-3">
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-medium border border-border bg-background hover:bg-surface text-foreground hover:border-accent hover:text-accent transition-all duration-150 text-center"
                  onClick={closeDrawer}
                >
                  <span>My Resume</span>
                  <ArrowUpRightIcon className="size-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
