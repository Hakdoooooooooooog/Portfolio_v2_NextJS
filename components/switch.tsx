"use client";

import { Switch } from "@base-ui-components/react";
import React, { useEffect, useState } from "react";
import { useThemeStore } from "../utils/store/theme-store";
import { useShallow } from "zustand/shallow";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const [cachedTheme, setCachedTheme] = useState<string>("light");
  const { theme, setTheme } = useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
    }))
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCachedTheme(newTheme);
  };

  useEffect(() => {
    setMounted(true);
    setCachedTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, mounted]);

  // Use cached theme for consistent rendering
  const currentTheme = mounted ? theme : cachedTheme;

  if (!mounted) {
    return (
      <div className="flex items-center">
        <div className="mr-2 w-5 h-5 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
        <Switch.Root
          checked={false}
          className={
            "w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative transition-colors duration-300"
          }
        >
          <Switch.Thumb
            className={`absolute top-1 left-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform duration-300 translate-x-0`}
          />
        </Switch.Root>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <div className="mr-2">
        {currentTheme === "light" ? (
          <svg
            className="w-5 h-5 text-gray-800 dark:text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-300 dark:text-gray-800"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </div>
      <Switch.Root
        onCheckedChange={toggleTheme}
        checked={currentTheme === "dark"}
        className={
          "w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative transition-colors duration-300 cursor-pointer"
        }
      >
        <Switch.Thumb
          className={`absolute top-1 left-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform duration-300
          ${currentTheme === "dark" ? "translate-x-4" : "translate-x-0"}`}
        />
      </Switch.Root>
    </div>
  );
};

export default ThemeSwitch;
