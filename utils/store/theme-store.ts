"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light", // Default to light theme for SSR consistency
      setTheme: (theme: string) => {
        set({ theme });
      },
    }),
    {
      name: "theme-storage",
      onRehydrateStorage: () => (state) => {
        // After rehydration, if no theme is stored, detect system preference
        if (state && !localStorage.getItem("theme-storage")) {
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          state.setTheme(prefersDark ? "dark" : "light");
        }
      },
    }
  )
);
