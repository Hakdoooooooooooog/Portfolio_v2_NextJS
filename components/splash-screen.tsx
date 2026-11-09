"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { aboutData } from "@/portfolio/utils/constants";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // If user prefers reduced motion or already saw splash in this session, skip
    if (shouldReduceMotion) return;

    try {
      const seen = sessionStorage.getItem("portfolio-splash-seen");
      if (!seen) {
        sessionStorage.setItem("portfolio-splash-seen", "1");

        const showTimer = setTimeout(() => {
          setIsVisible(true);
        }, 0);

        const hideTimer = setTimeout(() => {
          setIsVisible(false);
        }, 950);

        return () => {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
        };
      }
    } catch {
      // In case sessionStorage is restricted (e.g. strict iframe)
    }
  }, [shouldReduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-background bg-grid-pattern px-6 select-none pointer-events-none"
        >
          <div className="flex flex-col items-center text-center max-w-md w-full">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: 0.05 }}
              className="text-eyebrow text-muted tracking-widest uppercase font-mono"
            >
              00 / Portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.12 }}
              className="text-display-lg text-foreground mt-2 font-display"
            >
              {aboutData.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.24, delay: 0.2 }}
              className="text-small font-mono text-muted mt-2"
            >
              Full-Stack Developer
            </motion.p>

            {/* Accent loading line */}
            <div className="w-48 h-0.5 bg-border rounded-full mt-6 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1,
                }}
                className="size-full bg-accent origin-left"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
