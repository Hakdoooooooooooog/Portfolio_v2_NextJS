"use client";

import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { TProjectImage } from "@/portfolio/utils/types";
import {
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/portfolio/components/icons";

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export type ImageLightboxProps = {
  isOpen: boolean;
  images: readonly TProjectImage[];
  initialIndex?: number;
  onClose: () => void;
};

export default function ImageLightbox({
  isOpen,
  images,
  initialIndex = 0,
  onClose,
}: ImageLightboxProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [cachedImages, setCachedImages] = useState(images);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (images.length > 0 && images !== cachedImages) {
    setCachedImages(images);
  }

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }

  const activeImages = images.length > 0 ? images : cachedImages;
  const currentImage = activeImages[currentIndex] ?? activeImages[0];
  const hasMultiple = activeImages.length > 1;

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : activeImages.length - 1));
  }, [activeImages.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < activeImages.length - 1 ? prev + 1 : 0));
  }, [activeImages.length]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && hasMultiple) {
        handlePrev();
      } else if (e.key === "ArrowRight" && hasMultiple) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, hasMultiple, handlePrev, handleNext, onClose]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {Boolean(isOpen && currentImage) && (
        <motion.div
          key="lightbox-dialog"
          role="dialog"
          aria-modal="true"
          aria-label={currentImage.caption ?? currentImage.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden"
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-background/92 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            key="lightbox-toolbar"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4 pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-[4px] text-xs font-mono font-medium border border-border bg-surface text-foreground">
                {hasMultiple
                  ? `${currentIndex + 1} / ${activeImages.length}`
                  : "Preview"}
              </span>
              <span className="hidden sm:inline-block text-xs font-mono text-muted truncate max-w-md">
                {currentImage.alt}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview (Escape)"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-border bg-surface text-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer"
            >
              <span className="text-xs font-mono font-medium">Close</span>
              <kbd className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded-[4px] bg-background border border-border text-muted group-hover:text-foreground">
                Esc
              </kbd>
              <CloseIcon className="size-3.5" />
            </button>
          </motion.div>

          <motion.div
            key="lightbox-stage"
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex-1 min-h-0 w-full flex items-center justify-center px-4 sm:px-8 py-2 sm:py-4 overflow-hidden pointer-events-none"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentImage.src}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center pointer-events-auto max-h-full max-w-full"
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.alt}
                  width={1600}
                  height={1000}
                  priority
                  sizes="(max-width: 1024px) 90vw, 1400px"
                  className="max-h-[calc(100dvh-260px)] max-w-[88vw] w-auto h-auto object-contain rounded-[6px] border border-border shadow-2xl bg-surface"
                />
              </motion.div>
            </AnimatePresence>

            {hasMultiple ? (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous image"
                  className="pointer-events-auto absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 size-10 sm:size-11 rounded-[4px] border border-border bg-surface/90 text-foreground backdrop-blur-md flex items-center justify-center shadow-lg transition-colors hover:border-accent hover:text-accent cursor-pointer"
                >
                  <ChevronLeftIcon className="size-5" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next image"
                  className="pointer-events-auto absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 size-10 sm:size-11 rounded-[4px] border border-border bg-surface/90 text-foreground backdrop-blur-md flex items-center justify-center shadow-lg transition-colors hover:border-accent hover:text-accent cursor-pointer"
                >
                  <ChevronRightIcon className="size-5" />
                </button>
              </>
            ) : null}
          </motion.div>

          <motion.div
            key="lightbox-bottom"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-3 px-4 pb-4 sm:pb-6 pt-4 pointer-events-auto max-w-4xl mx-auto w-full shrink-0"
          >
            {currentImage.caption ? (
              <div className="px-4 py-2 rounded-[4px] bg-surface border border-border max-w-2xl text-center">
                <p className="text-xs sm:text-sm font-mono text-foreground leading-relaxed">
                  {currentImage.caption}
                </p>
              </div>
            ) : null}

            {hasMultiple ? (
              <div className="flex gap-2 max-w-full overflow-x-auto py-1 px-2 no-scrollbar">
                {activeImages.map((img, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Jump to image ${idx + 1}`}
                      className={`relative size-12 sm:size-14 shrink-0 rounded-[4px] overflow-hidden border transition-all cursor-pointer ${
                        isActive
                          ? "border-accent ring-1 ring-accent"
                          : "border-border opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
