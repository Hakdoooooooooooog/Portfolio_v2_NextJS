"use client";

import { Switch } from "@base-ui-components/react";
import { useEffect, useSyncExternalStore } from "react";
import { useThemeStore } from "../utils/store/theme-store";
import { useShallow } from "zustand/shallow";

const subscribeHydration = (cb: () => void) =>
  useThemeStore.persist.onFinishHydration(cb);
const getHydrated = () => useThemeStore.persist.hasHydrated();
const getHydratedServer = () => false;

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
  const { theme, setTheme } = useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
    }))
  );
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    getHydrated,
    getHydratedServer
  );

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, hydrated]);

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
