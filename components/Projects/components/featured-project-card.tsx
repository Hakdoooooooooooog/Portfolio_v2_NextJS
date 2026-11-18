"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type {
  TProjectArchitectureItem,
  TProjectImage,
} from "@/portfolio/utils/types";
import ImageLightbox from "@/portfolio/components/image-lightbox";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExpandIcon,
} from "@/portfolio/components/icons";

export type FeaturedProjectCardProps = {
  index: number;
  title: string;
  tags: readonly string[];
  context?: string;
  description: string;
  role?: string;
  status?: string;
  statusNote?: string;
  isPrivateRepo?: boolean;
  walkthroughAvailable?: boolean;
  highlights?: readonly string[];
  architectureNotes?: readonly TProjectArchitectureItem[];
  images?: readonly TProjectImage[];
  fallbackImageSrc?: string;
  fallbackImageAlt?: string;
  liveUrl?: string;
  sourceUrl?: string;
  serverSourceUrl?: string;
};

export default function FeaturedProjectCard({
  index,
  title,
  tags,
  context,
  description,
  role,
  status,
  statusNote,
  isPrivateRepo,
  walkthroughAvailable,
  highlights,
  architectureNotes,
  images,
  fallbackImageSrc,
  fallbackImageAlt,
  liveUrl,
  sourceUrl,
  serverSourceUrl,
}: FeaturedProjectCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [architectureOpen, setArchitectureOpen] = useState(false);

  const galleryImages: readonly TProjectImage[] =
    images && images.length > 0
      ? images
      : fallbackImageSrc
        ? [
            {
              src: fallbackImageSrc,
              alt: fallbackImageAlt ?? title,
              caption: title,
            },
          ]
        : [];

  const currentImage = galleryImages[activeImageIndex] ?? galleryImages[0];
  const hasMultipleImages = galleryImages.length > 1;
  const paddedIndex = String(index).padStart(2, "0");

  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev > 0 ? prev - 1 : galleryImages.length - 1,
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      prev < galleryImages.length - 1 ? prev + 1 : 0,
    );
  };

  const handleRequestWalkthrough = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio:prefill-contact", {
          detail: {
            subject: `Walkthrough request: ${title}`,
            message: `Hi Darenz, I would like to schedule a brief walkthrough/demo of ${title}.`,
          },
        }),
      );
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = "#contact";
      }
    }
  };

  const statusDotClass =
    status === "Production"
      ? "bg-emerald-500"
      : status === "In Progress"
        ? "bg-accent animate-pulse"
        : "bg-muted/60";

  return (
    <article className="min-w-0 rounded-[6px] border border-border bg-surface p-4 sm:p-6 flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border text-xs font-mono text-muted">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-foreground font-semibold">{paddedIndex}</span>
            {status ? (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] border border-border bg-surface-subtle text-[11px] font-medium uppercase tracking-wider text-foreground">
                <span
                  className={`size-1.5 rounded-full ${statusDotClass}`}
                  aria-hidden
                />
                {status}
              </span>
            ) : null}
            {role ? (
              <span className="inline-flex items-center gap-2">
                <span className="hidden sm:inline" aria-hidden>
                  ·
                </span>
                <span>{role}</span>
              </span>
            ) : null}
          </div>

          {statusNote ? <span className="text-muted">{statusNote}</span> : null}
        </div>

        {galleryImages.length > 0 && currentImage ? (
          <div className="mt-5 flex flex-col gap-2.5">
            <div className="relative w-full aspect-[16/9] max-h-[260px] rounded-[6px] overflow-hidden border border-border bg-background group flex items-center justify-center">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="size-full cursor-zoom-in relative block text-left"
                aria-label={`Enlarge image: ${
                  currentImage.caption ?? currentImage.alt
                }`}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="relative size-full flex items-center justify-center p-2"
                  >
                    <Image
                      src={currentImage.src}
                      alt={currentImage.alt}
                      fill
                      priority={index <= 2}
                      sizes="(max-width: 1280px) 100vw, 640px"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-[4px] text-[10px] font-mono border border-border bg-background/90 text-muted group-hover:text-foreground backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100">
                  <span>Enlarge</span>
                  <ExpandIcon className="size-3" />
                </span>
              </button>

              {hasMultipleImages ? (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous screenshot"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 grid place-items-center size-8 rounded-[4px] border border-border bg-background/90 text-foreground backdrop-blur-xs transition-colors hover:border-accent hover:text-accent cursor-pointer opacity-85 hover:opacity-100"
                  >
                    <ChevronLeftIcon className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next screenshot"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 grid place-items-center size-8 rounded-[4px] border border-border bg-background/90 text-foreground backdrop-blur-xs transition-colors hover:border-accent hover:text-accent cursor-pointer opacity-85 hover:opacity-100"
                  >
                    <ChevronRightIcon className="size-4" />
                  </button>
                </>
              ) : null}
            </div>

            {hasMultipleImages ? (
              <div className="flex items-center gap-2 overflow-x-auto py-0.5 px-0.5 no-scrollbar w-full">
                {galleryImages.map((img, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View screenshot ${idx + 1}`}
                      className={`relative h-10 w-14 shrink-0 rounded-[4px] overflow-hidden border transition-all cursor-pointer ${
                        isActive
                          ? "border-accent ring-1 ring-accent"
                          : "border-border opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </button>
                  );
                })}
                <span className="ml-auto text-[11px] font-mono text-muted shrink-0 pl-1">
                  {activeImageIndex + 1}/{galleryImages.length}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="mt-5">
          <h3 className="text-heading text-foreground">{title}</h3>

          {context ? (
            <div className="mt-3">
              <p className="text-[11px] font-mono uppercase tracking-wider text-muted">
                Context &amp; Problem
              </p>
              <p className="text-small text-foreground mt-1 leading-relaxed">
                {context}
              </p>
            </div>
          ) : null}

          <div className="mt-3">
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted">
              Architecture &amp; Decisions
            </p>
            <p className="text-small text-muted mt-1 leading-relaxed">
              {description}
            </p>

            {highlights && highlights.length > 0 ? (
              <ul className="mt-2.5 list-disc list-outside text-small text-muted pl-4 flex flex-col gap-1.5 leading-relaxed">
                {highlights.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>

          {architectureNotes && architectureNotes.length > 0 ? (
            <div className="mt-4 border-t border-border pt-3">
              <button
                type="button"
                onClick={() => setArchitectureOpen((v) => !v)}
                aria-expanded={architectureOpen}
                className="flex items-center justify-between w-full py-1 text-xs font-mono text-foreground hover:text-accent transition-colors cursor-pointer text-left"
              >
                <span>
                  Architecture Notes ({architectureNotes.length} stages)
                </span>
                <ChevronDownIcon
                  className={`size-4 transition-transform text-muted ${
                    architectureOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {architectureOpen && (
                  <motion.div
                    key="architecture-accordion"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2.5 pb-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {architectureNotes.map((step, idx) => (
                        <div
                          key={step.title}
                          className="rounded-[4px] border border-border bg-background p-3"
                        >
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-mono text-accent font-semibold">
                              0{idx + 1}
                            </span>
                            <h4 className="text-xs font-semibold text-foreground">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-xs text-muted mt-1 leading-relaxed">
                            {step.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-border">
        <p className="text-xs font-mono text-muted flex flex-wrap gap-x-2 gap-y-1">
          {tags.map((tag, i) => (
            <span key={tag}>
              {tag}
              {i < tags.length - 1 ? (
                <span className="ml-2 text-muted/50" aria-hidden>
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              <span>Live Demo</span>
              <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : null}

          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              <span>Source</span>
              <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : null}

          {serverSourceUrl ? (
            <a
              href={serverSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors underline-offset-4 hover:underline"
            >
              <span>API Source</span>
              <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : null}

          {walkthroughAvailable ? (
            <button
              type="button"
              onClick={handleRequestWalkthrough}
              className="group inline-flex items-center gap-1.5 text-accent hover:text-foreground transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              <span>Request Walkthrough</span>
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : null}

          {isPrivateRepo && !sourceUrl ? (
            <span className="text-xs font-mono text-muted">
              Private Repository
            </span>
          ) : null}
        </div>
      </div>

      <ImageLightbox
        isOpen={lightboxOpen}
        images={galleryImages}
        initialIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </article>
  );
}
