"use client";

import Image from "next/image";
import { useRef } from "react";

type ProjectThumbnailProps = {
  src: string;
  alt: string;
};

export default function ProjectThumbnail({ src, alt }: ProjectThumbnailProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label={`Enlarge ${alt}`}
        className="relative size-full bg-surface cursor-zoom-in transition-colors hover:bg-accent/10"
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
          className="md:hidden absolute bottom-1 right-1 grid place-items-center size-5 rounded bg-background/70 text-foreground backdrop-blur-sm border border-border/70"
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

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="bg-transparent text-foreground p-0 backdrop:bg-background/80 backdrop:backdrop-blur-sm m-auto"
      >
        <div className="relative bg-surface rounded-xl overflow-hidden border border-border">
          <button
            type="button"
            onClick={close}
            aria-label="Close preview"
            className="absolute top-2 right-2 z-10 grid place-items-center size-8 rounded-md border border-border bg-background/80 text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <span aria-hidden>×</span>
          </button>
          <Image
            src={src}
            alt={alt}
            width={1600}
            height={1200}
            className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      </dialog>
    </>
  );
}
