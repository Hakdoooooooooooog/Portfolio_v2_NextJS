"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.location.protocol === "https:"
    ) {
      navigator.serviceWorker
        .register("/sw.js", { updateViaCache: "none" })
        .catch((error) => {
          console.warn("[PWA] Service worker registration failed:", error);
        });
    }
  }, []);

  return null;
}
