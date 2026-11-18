"use client";

import Image from "next/image";
import { useState } from "react";
import ImageLightbox from "@/portfolio/components/image-lightbox";
import { ExpandIcon } from "@/portfolio/components/icons";

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
          <ExpandIcon className="size-3" />
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
