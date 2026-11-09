"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { aboutData } from "@/portfolio/utils/constants";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const isSkip =
      shouldReduceMotion ||
      document.documentElement.getAttribute("data-splash") === "skip";

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("portfolio-splash-seen") === "1";
      if (!isSkip && !alreadySeen) {
        sessionStorage.setItem("portfolio-splash-seen", "1");
      }
    } catch {
      // In case sessionStorage is restricted (e.g. strict iframe)
    }

    if (isSkip || alreadySeen) {
      const skipTimer = setTimeout(() => {
        setIsVisible(false);
      }, 0);
      return () => clearTimeout(skipTimer);
    }

    // Account for load & hydration time so mobile doesn't linger unnecessarily
    const elapsed = typeof performance !== "undefined" ? performance.now() : 0;
    const remainingTime = Math.max(220, Math.min(850, 950 - elapsed));

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, remainingTime);

    return () => {
      clearTimeout(hideTimer);
    };
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="splash-screen"
          key="splash-screen"
          aria-hidden="true"
          initial={false}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background bg-grid-pattern px-6 select-none"
        >
          <div className="flex flex-col items-center text-center max-w-md w-full pointer-events-none">
            <p className="splash-item-1 text-eyebrow text-muted tracking-widest uppercase font-mono">
              00 / Portfolio
            </p>

            <p className="splash-item-2 text-display-lg text-foreground mt-2 font-display">
              {aboutData.name}
            </p>

            <p className="splash-item-3 text-small font-mono text-muted mt-2">
              Full-Stack Developer
            </p>

            {/* Accent loading line */}
            <div className="w-48 h-0.5 bg-border rounded-full mt-6 overflow-hidden">
              <div className="splash-bar-fill size-full bg-accent origin-left" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
