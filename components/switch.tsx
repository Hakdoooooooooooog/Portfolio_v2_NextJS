"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useThemeStore } from "../utils/store/theme-store";
import { useShallow } from "zustand/shallow";

const subscribeHydration = (cb: () => void) =>
  useThemeStore.persist.onFinishHydration(cb);
const getHydrated = () => useThemeStore.persist.hasHydrated();
const getHydratedServer = () => false;

const SunIcon = () => (
  <svg
    className="size-4.5 transition-transform duration-300 rotate-0 dark:rotate-90"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden
  >
    <path
      fillRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clipRule="evenodd"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    className="size-4.5 transition-transform duration-300"
    fill="currentColor"
    viewBox="0 0 20 20"
    aria-hidden
  >
    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
  </svg>
);

export default function ThemeSwitch() {
  const { theme, toggleTheme, setTheme } = useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      toggleTheme: state.toggleTheme,
      setTheme: state.setTheme,
    }))
  );

  const hydrated = useSyncExternalStore(
    subscribeHydration,
    getHydrated,
    getHydratedServer
  );

  // Sync data-theme attribute on <html>
  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, hydrated]);

  // Listen to OS system preference changes if no manual preference is stored
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
      className="grid place-items-center size-9 rounded-full border border-border bg-surface/70 hover:bg-surface text-foreground transition-all duration-200 hover:border-accent hover:text-accent hover:scale-105 active:scale-95 cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {hydrated ? (
        isDark ? <SunIcon /> : <MoonIcon />
      ) : (
        <span className="size-4.5 rounded-full bg-muted/20 animate-pulse" />
      )}
    </button>
  );
}
