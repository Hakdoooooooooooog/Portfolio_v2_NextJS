"use client";

import Image from "next/image";
import { useState } from "react";
import ImageLightbox from "@/portfolio/components/image-lightbox";

type CertificateThumbnailProps = {
  src: string;
  alt: string;
};

export default function CertificateThumbnail({
  src,
  alt,
}: CertificateThumbnailProps) {
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
          sizes="128px"
          className="object-contain p-2"
        />
      </button>

      <ImageLightbox
        isOpen={isOpen}
        images={[{ src, alt }]}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
