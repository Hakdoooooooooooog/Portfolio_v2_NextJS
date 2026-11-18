"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useThemeStore } from "../utils/store/theme-store";
import { useShallow } from "zustand/shallow";
import { MoonIcon, SunIcon } from "@/portfolio/components/icons";

const subscribeHydration = (cb: () => void) =>
  useThemeStore.persist.onFinishHydration(cb);
const getHydrated = () => useThemeStore.persist.hasHydrated();
const getHydratedServer = () => false;

export default function ThemeSwitch() {
  const { theme, toggleTheme, setTheme } = useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      toggleTheme: state.toggleTheme,
      setTheme: state.setTheme,
    })),
  );

  const hydrated = useSyncExternalStore(
    subscribeHydration,
    getHydrated,
    getHydratedServer,
  );

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, hydrated]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem("theme-storage");
      if (!stored) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [setTheme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid place-items-center size-8 rounded-[4px] border border-border bg-surface/90 backdrop-blur-md text-foreground transition-colors hover:border-accent hover:text-accent cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {hydrated ? (
        isDark ? (
          <SunIcon className="size-4" />
        ) : (
          <MoonIcon className="size-4" />
        )
      ) : (
        <span className="size-3.5 rounded-[2px] bg-muted/25 animate-pulse" />
      )}
    </button>
  );
}
