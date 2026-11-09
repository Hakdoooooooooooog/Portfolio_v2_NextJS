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
  title: string;
  tags: readonly string[];
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
  title,
  tags,
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

  // Normalize gallery images
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
        new CustomEvent("prefill-contact", {
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

  const statusBadgeColor =
    status === "In Progress"
      ? "border-accent text-accent bg-accent/10"
      : status === "Offline"
        ? "border-border text-muted bg-surface"
        : "border-border text-foreground bg-surface";

  return (
    <article className="rounded-xl border border-border bg-surface p-6 md:p-8 transition-shadow">
      {/* Header Eyebrow */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border text-small font-mono text-muted">
        <div className="flex items-center gap-2">
          {status ? (
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${statusBadgeColor}`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  status === "In Progress"
                    ? "bg-accent animate-pulse"
                    : status === "Offline"
                      ? "bg-muted"
                      : "bg-accent"
                }`}
              />
              {status}
            </span>
          ) : null}
          {role ? <span>· {role}</span> : null}
        </div>

        {statusNote ? (
          <span className="text-xs text-muted/80">{statusNote}</span>
        ) : null}
      </div>

      {/* Main Grid: Content (Left) + Visual Preview (Right) */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details & Technical Narrative */}
        <div className="lg:col-span-7 flex flex-col min-w-0 max-w-full">
          <h3 className="text-heading text-foreground">{title}</h3>

          {/* Tags */}
          <p className="text-small font-mono text-muted mt-2 flex flex-wrap gap-x-2 gap-y-1">
            {tags.map((tag, i) => (
              <span key={tag}>
                {tag}
                {i < tags.length - 1 ? (
                  <span className="ml-2 text-muted/60" aria-hidden>
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </p>

          {/* Description */}
          <p className="text-body text-muted mt-5">{description}</p>

          {/* Architectural Highlights */}
          {highlights && highlights.length > 0 ? (
            <ul className="mt-4 list-disc list-outside text-body text-muted pl-5 flex flex-col gap-2">
              {highlights.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : null}

          {/* Expandable Architecture & Request Lifecycle Accordion */}
          {architectureNotes && architectureNotes.length > 0 ? (
            <div className="mt-6 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setArchitectureOpen((v) => !v)}
                aria-expanded={architectureOpen}
                className="flex items-center justify-between w-full py-2 text-small font-mono text-foreground hover:text-accent transition-colors cursor-pointer text-left"
              >
                <span>Architecture & Request Lifecycle (4 Stages)</span>
                <ChevronDownIcon
                  className={`size-4 transform transition-transform text-muted ${
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
                    <div className="pt-3 pb-2 flex flex-col gap-4">
                      {architectureNotes.map((step, idx) => (
                        <div
                          key={step.title}
                          className="rounded-lg border border-border/80 bg-background/60 p-4"
                        >
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs font-mono text-accent font-semibold">
                              0{idx + 1}
                            </span>
                            <h4 className="text-small font-semibold text-foreground">
                              {step.title}
                            </h4>
                          </div>
                          <p className="text-small text-muted mt-2 leading-relaxed">
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

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {walkthroughAvailable ? (
              <button
                type="button"
                onClick={handleRequestWalkthrough}
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:bg-accent/90 cursor-pointer shadow-sm"
              >
                <span>Request walkthrough / demo</span>
                <ArrowRightIcon className="size-4" />
              </button>
            ) : null}

            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border text-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <span>Live demo</span>
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            ) : null}

            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border text-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <span>View source</span>
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            ) : null}

            {serverSourceUrl ? (
              <a
                href={serverSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border text-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:border-accent hover:text-accent"
              >
                <span>View API source</span>
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            ) : null}

            {isPrivateRepo && !sourceUrl ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-background text-muted text-small font-mono">
                <span aria-hidden>🔒</span>
                <span>Private repository</span>
              </span>
            ) : null}
          </div>
        </div>

        {/* Right Column: Visual Preview (Contained, Sharp & Clickable) */}
        {galleryImages.length > 0 && currentImage ? (
          <div className="lg:col-span-5 flex flex-col gap-3 lg:sticky lg:top-24 min-w-0 max-w-full">
            <div className="relative w-full aspect-[16/10] max-h-[320px] rounded-xl overflow-hidden border border-border bg-background/70 group shadow-sm flex items-center justify-center">
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
                      priority
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-contain"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Enlarge Hint Badge */}
                <span className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono border border-border/80 bg-background/90 text-muted group-hover:text-foreground backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100 shadow-xs">
                  <span>Enlarge</span>
                  <ExpandIcon className="size-3" />
                </span>
              </button>

              {/* Prev / Next Arrows */}
              {hasMultipleImages ? (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous screenshot"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 grid place-items-center size-8 rounded-full border border-border bg-background/90 text-foreground backdrop-blur-xs transition-colors hover:border-accent hover:text-accent cursor-pointer shadow-md opacity-80 hover:opacity-100"
                  >
                    <ChevronLeftIcon className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next screenshot"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 grid place-items-center size-8 rounded-full border border-border bg-background/90 text-foreground backdrop-blur-xs transition-colors hover:border-accent hover:text-accent cursor-pointer shadow-md opacity-80 hover:opacity-100"
                  >
                    <ChevronRightIcon className="size-4" />
                  </button>
                </>
              ) : null}
            </div>

            {/* Thumbnail Strip */}
            {hasMultipleImages ? (
              <div className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 no-scrollbar w-full max-w-full">
                {galleryImages.map((img, idx) => {
                  const isActive = idx === activeImageIndex;
                  return (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View screenshot ${idx + 1}`}
                      className={`relative h-11 w-16 shrink-0 rounded-md overflow-hidden border transition-all cursor-pointer ${
                        isActive
                          ? "border-accent ring-2 ring-accent/60 scale-102"
                          : "border-border/70 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="64px"
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

            {/* Caption bar */}
            {currentImage.caption ? (
              <p className="text-xs font-mono text-muted leading-relaxed">
                {currentImage.caption}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Lightbox for full-size inspection */}
      <ImageLightbox
        isOpen={lightboxOpen}
        images={galleryImages}
        initialIndex={activeImageIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </article>
  );
}
