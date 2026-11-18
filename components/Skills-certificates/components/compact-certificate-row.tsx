"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/portfolio/components/use-reveal";
import CertificateThumbnail from "./certificate-thumbnail";
import { ArrowUpRightIcon } from "@/portfolio/components/icons";

type CompactCertificateRowProps = {
  title: string;
  issuer: string;
  date: string;
  alt: string;
  imageSrc?: string;
  verifyHref?: string;
  delayMs?: number;
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function CompactCertificateRow({
  title,
  issuer,
  date,
  alt,
  imageSrc,
  verifyHref,
  delayMs = 0,
}: CompactCertificateRowProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className="reveal flex gap-3 sm:gap-4 py-4 min-w-0"
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
      {imageSrc ? (
        <div className="relative w-20 h-16 sm:w-28 sm:h-20 shrink-0 rounded-[4px] overflow-hidden border border-border bg-surface">
          <CertificateThumbnail src={imageSrc} alt={alt} />
        </div>
      ) : null}

      <div className="flex-1 min-w-0 max-w-3xl">
        <h3 className="text-heading-row text-foreground">{title}</h3>
        <p className="text-xs font-mono text-muted mt-1.5">
          {issuer} · {formatDate(date)}
        </p>
        {verifyHref ? (
          <a
            href={verifyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-xs font-mono text-foreground transition-colors hover:text-accent hover:underline underline-offset-4"
          >
            <span>Verify credential</span>
            <ArrowUpRightIcon className="size-3.5" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
