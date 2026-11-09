"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { TNavigationLink } from "@/portfolio/utils/types";
import { NavigationMenu } from "@base-ui-components/react";
import { motion } from "motion/react";

type NavItemsProps = {
  items: TNavigationLink[];
  variant?: "pill" | "vertical";
  onItemClick?: () => void;
};

export default function NavItems({
  items,
  variant = "pill",
  onItemClick,
}: NavItemsProps) {
  const [activeSection, setActiveSection] = useState<string>("#about");
  const [mounted, setMounted] = useState(false);

  const isClickingRef = useRef(false);
  const scrollEndTimerRef = useRef<NodeJS.Timeout | null>(null);

  const sectionIds = useMemo(
    () =>
      items
        .map((item) => (item.href.startsWith("#") ? item.href.slice(1) : null))
        .filter(Boolean) as string[],
    [items]
  );

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      // Do not recalculate while a programmatic smooth scroll from a click is in progress
      if (isClickingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Last section check (#contact):
      // If the last section has entered the viewport or we are near the bottom of the page
      const lastId = sectionIds[sectionIds.length - 1];
      const lastEl = lastId ? document.getElementById(lastId) : null;
      if (lastEl) {
        const lastRect = lastEl.getBoundingClientRect();
        if (
          lastRect.top <= windowHeight * 0.7 ||
          scrollY + windowHeight >= docHeight - 120
        ) {
          setActiveSection(`#${lastId}`);
          return;
        }
      }

      // 2. Top of page check (#about)
      if (scrollY < 120) {
        const first = sectionIds[0];
        if (first) {
          setActiveSection(`#${first}`);
          return;
        }
      }

      // 3. Monotonic section scan: Find the last section whose top crossed the reading threshold
      const threshold = Math.max(140, Math.min(260, windowHeight * 0.35));
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold) {
          current = id;
        }
      }

      if (current) {
        setActiveSection(`#${current}`);
      }
    };

    // Align initial active section asynchronously after client mount
    const initialSyncTimer = setTimeout(() => {
      setMounted(true);
      const hash = window.location.hash;
      const cleanId = hash ? hash.replace("#", "") : "";
      if (cleanId && sectionIds.includes(cleanId)) {
        setActiveSection(hash);
      } else {
        updateActiveSection();
      }
    }, 0);

    const onScroll = () => {
      // If clicking, extend the lock until smooth scrolling ceases
      if (isClickingRef.current) {
        if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);
        scrollEndTimerRef.current = setTimeout(() => {
          isClickingRef.current = false;
          updateActiveSection();
        }, 150);
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    updateActiveSection();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const onHashChange = () => {
      if (
        window.location.hash &&
        sectionIds.includes(window.location.hash.slice(1))
      ) {
        setActiveSection(window.location.hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      clearTimeout(initialSyncTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", onHashChange);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, [sectionIds]);

  const handleLinkClick = (href: string) => {
    setActiveSection(href);
    isClickingRef.current = true;
    if (scrollEndTimerRef.current) clearTimeout(scrollEndTimerRef.current);

    // Failsafe unlock after smooth scroll duration (1.2s max)
    scrollEndTimerRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 1200);

    onItemClick?.();
  };

  return items.map((item) => {
    const isActive = activeSection === item.href;

    if (variant === "vertical") {
      return (
        <NavigationMenu.Item key={item.label} className="relative">
          <NavigationMenu.Link
            href={item.href}
            onClick={() => handleLinkClick(item.href)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-mono font-medium transition-colors duration-150 ${
              isActive
                ? "bg-surface text-foreground font-semibold border-l-2 border-accent shadow-xs"
                : "text-muted hover:text-foreground hover:bg-surface/50"
            }`}
          >
            <span>{item.label}</span>
            {mounted && isActive ? (
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
            ) : null}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      );
    }

    return (
      <NavigationMenu.Item key={item.label} className="relative">
        <NavigationMenu.Link
          href={item.href}
          onClick={() => handleLinkClick(item.href)}
          className={`relative px-3 py-1 rounded-full text-xs font-mono font-medium transition-colors duration-150 block select-none ${
            isActive
              ? "text-foreground font-semibold"
              : "text-muted hover:text-foreground"
          }`}
        >
          {mounted && isActive ? (
            <motion.span
              layoutId="nav-pill-active"
              aria-hidden
              className="absolute inset-0 rounded-full bg-surface border border-border shadow-xs -z-10"
              transition={{ type: "spring", damping: 28, stiffness: 360 }}
            />
          ) : null}
          {item.label}
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );
  });
}
