"use client";

import Image from "next/image";
import { useState } from "react";
import ImageLightbox from "@/portfolio/components/image-lightbox";

type ProjectThumbnailProps = {
  src: string;
  alt: string;
};

export default function ProjectThumbnail({ src, alt }: ProjectThumbnailProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Enlarge ${alt}`}
        className="relative size-full bg-surface cursor-zoom-in transition-colors hover:bg-accent/10 block"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="96px"
          className="object-cover"
        />
        <span
          aria-hidden
          className="md:hidden absolute bottom-1 right-1 grid place-items-center size-5 rounded bg-background/70 text-foreground backdrop-blur-xs border border-border/70"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3"
          >
            <path d="M15 3h6v6" />
            <path d="M9 21H3v-6" />
            <path d="M21 3l-7 7" />
            <path d="M3 21l7-7" />
          </svg>
        </span>
      </button>

      <ImageLightbox
        isOpen={isOpen}
        images={[{ src, alt }]}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
