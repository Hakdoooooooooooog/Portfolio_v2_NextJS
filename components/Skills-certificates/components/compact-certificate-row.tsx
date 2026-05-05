"use client";

import type { CSSProperties } from "react";
import { useReveal } from "./use-reveal";
import CertificateThumbnail from "./certificate-thumbnail";

type CompactCertificateRowProps = {
  title: string;
  issuer: string;
  date: string;
  alt: string;
  imageSrc?: string;
  embed?: { provider: "credly"; badgeId: string };
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

function CredlyBadge({ badgeId, alt }: { badgeId: string; alt: string }) {
  return (
    <div className="grid place-items-center size-full p-2" aria-label={alt}>
      <div
        data-iframe-width="80"
        data-iframe-height="80"
        data-share-badge-id={badgeId}
        data-share-badge-host="https://www.credly.com"
      />
    </div>
  );
}

export default function CompactCertificateRow({
  title,
  issuer,
  date,
  alt,
  imageSrc,
  embed,
  verifyHref,
  delayMs = 0,
}: CompactCertificateRowProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className="reveal flex gap-4 py-4 border-b border-border last:border-b-0"
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
      <div className="relative w-32 h-24 shrink-0 rounded-md overflow-hidden border border-border bg-surface">
        {embed ? (
          <CredlyBadge badgeId={embed.badgeId} alt={alt} />
        ) : imageSrc ? (
          <CertificateThumbnail src={imageSrc} alt={alt} />
        ) : null}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-heading-row text-foreground">{title}</h3>
        <p className="text-small font-mono text-muted mt-2">
          {issuer} · {formatDate(date)}
        </p>
        {verifyHref ? (
          <a
            href={verifyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-small font-mono text-muted transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent"
          >
            Verify <span aria-hidden>↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
