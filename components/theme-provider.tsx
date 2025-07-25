"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "../utils/store/theme-store";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useThemeStore();
  const [isMounted, setIsMounted] = useState(false);

  // Only run on client side after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Apply theme only after component is mounted (hydrated)
  useEffect(() => {
    if (isMounted) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme, isMounted]);

  // Render children immediately, but theme will be applied after hydration
  return <>{children}</>;
}
