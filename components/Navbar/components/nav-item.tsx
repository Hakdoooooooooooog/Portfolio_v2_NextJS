"use client";

import {
  useEffect,
  useState,
  useMemo,
  useRef,
  type ComponentType,
} from "react";
import { TNavigationLink } from "@/portfolio/utils/types";
import { NavigationMenu } from "@base-ui-components/react";
import { motion } from "motion/react";
import type { LucideProps } from "lucide-react";
import {
  BriefcaseIcon,
  FolderIcon,
  HomeIcon,
  LayersIcon,
  MailIcon,
} from "@/portfolio/components/icons";

const NAV_ICON_MAP: Record<string, ComponentType<LucideProps>> = {
  "#about": HomeIcon,
  "#projects": FolderIcon,
  "#experiences": BriefcaseIcon,
  "#skills": LayersIcon,
  "#contact": MailIcon,
};

type NavItemsProps = {
  items: TNavigationLink[];
  variant?: "inline" | "icon-rail" | "mobile-rail";
  onItemClick?: () => void;
};

export default function NavItems({
  items,
  variant = "inline",
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
    [items],
  );

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      if (isClickingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

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

      if (scrollY < 120) {
        const first = sectionIds[0];
        if (first) {
          setActiveSection(`#${first}`);
          return;
        }
      }

      const threshold = Math.max(140, Math.min(260, windowHeight * 0.35));
      let current = sectionIds[0];
      let bestTop = -Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= threshold && rect.top >= bestTop) {
          if (Math.abs(rect.top - bestTop) < 16) {
            const midpoint = rect.top + rect.height * 0.45;
            if (midpoint < threshold) {
              current = id;
              bestTop = rect.top;
            }
          } else {
            current = id;
            bestTop = rect.top;
          }
        }
      }

      if (current) {
        setActiveSection(`#${current}`);
      }
    };

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

    scrollEndTimerRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 1200);

    onItemClick?.();
  };

  return items.map((item) => {
    const isActive = mounted && activeSection === item.href;
    const Icon = NAV_ICON_MAP[item.href] ?? HomeIcon;

    if (variant === "icon-rail") {
      return (
        <NavigationMenu.Item key={item.label} className="relative">
          <NavigationMenu.Link
            href={item.href}
            aria-label={item.label}
            onClick={() => handleLinkClick(item.href)}
            className={`group relative grid place-items-center size-8 rounded-[4px] transition-colors duration-150 select-none ${
              isActive
                ? "bg-surface-subtle text-accent"
                : "text-muted hover:text-foreground hover:bg-surface-subtle/60"
            }`}
          >
            <Icon className="size-4" />
            <span
              aria-hidden
              className="pointer-events-none absolute right-full mr-2.5 px-2.5 py-1 rounded-[4px] border border-border bg-surface text-foreground text-xs font-mono whitespace-nowrap shadow-md opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 transition-all duration-150"
            >
              {item.label}
            </span>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      );
    }

    if (variant === "mobile-rail") {
      return (
        <NavigationMenu.Item key={item.label}>
          <NavigationMenu.Link
            href={item.href}
            onClick={() => handleLinkClick(item.href)}
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-[4px] text-xs font-mono transition-colors duration-150 select-none ${
              isActive
                ? "bg-surface-subtle text-foreground font-semibold border-l-2 border-accent"
                : "text-muted hover:text-foreground hover:bg-surface-subtle/60"
            }`}
          >
            <Icon
              className={`size-3.5 shrink-0 ${
                isActive ? "text-accent" : "text-muted"
              }`}
            />
            <span className="truncate">{item.label}</span>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      );
    }

    return (
      <NavigationMenu.Item key={item.label} className="relative">
        <NavigationMenu.Link
          href={item.href}
          onClick={() => handleLinkClick(item.href)}
          className={`relative py-1 text-xs font-mono font-medium transition-colors duration-150 block select-none ${
            isActive
              ? "text-foreground font-semibold"
              : "text-muted hover:text-foreground"
          }`}
        >
          {item.label}
          {mounted && isActive ? (
            <motion.span
              layoutId="nav-underline-active"
              aria-hidden
              className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-accent"
              transition={{ type: "spring", damping: 28, stiffness: 360 }}
            />
          ) : null}
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );
  });
}
