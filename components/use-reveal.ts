"use client";

import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => {
      node.dataset.revealed = "true";
    };

    const checkPosition = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 1.08) {
        reveal();
        return true;
      }
      return false;
    };

    if (checkPosition()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || checkPosition()) {
            reveal();
            observer.disconnect();
            cleanup();
            break;
          }
        }
      },
      { rootMargin: "120px 0px 120px 0px", threshold: 0 },
    );

    const onViewportChange = () => {
      if (checkPosition()) {
        observer.disconnect();
        cleanup();
      }
    };

    const cleanup = () => {
      window.removeEventListener("scroll", onViewportChange);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("hashchange", onViewportChange);
    };

    observer.observe(node);
    window.addEventListener("scroll", onViewportChange, { passive: true });
    window.addEventListener("resize", onViewportChange, { passive: true });
    window.addEventListener("hashchange", onViewportChange);

    return () => {
      observer.disconnect();
      cleanup();
    };
  }, []);

  return ref;
}
