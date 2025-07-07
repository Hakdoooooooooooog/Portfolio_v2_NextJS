"use client";

import { Switch } from "@base-ui-components/react";
import React, { useEffect, useState } from "react";
import { useThemeStore } from "../utils/store/theme-store";
import { useShallow } from "zustand/shallow";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useThemeStore(
    useShallow((state) => ({
      theme: state.theme,
      setTheme: state.setTheme,
    }))
  );
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center">
        <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">
          Loading...
        </span>
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
      <span className="text-sm text-gray-700 dark:text-gray-300 mr-2">
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </span>
      <Switch.Root
        onCheckedChange={toggleTheme}
        checked={theme === "dark"}
        className={
          "w-10 h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative transition-colors duration-300 cursor-pointer"
        }
      >
        <Switch.Thumb
          className={`absolute top-1 left-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform duration-300
          ${theme === "dark" ? "translate-x-4" : "translate-x-0"}`}
        />
      </Switch.Root>
    </div>
  );
};

export default ThemeSwitch;
