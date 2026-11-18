"use client";

import { useState } from "react";
import ProjectThumbnail from "./project-thumbnail";
import { ArrowUpRightIcon } from "@/portfolio/components/icons";

const MAX_VISIBLE_TAGS = 4;

export type CompactProjectRowProps = {
  index: number;
  title: string;
  tags: readonly string[];
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  liveUrl?: string;
  sourceUrl?: string;
  serverSourceUrl?: string;
};

export default function CompactProjectRow({
  index,
  title,
  tags,
  description,
  imageSrc,
  imageAlt,
  liveUrl,
  sourceUrl,
  serverSourceUrl,
}: CompactProjectRowProps) {
  const [expanded, setExpanded] = useState(false);
  const visibleTags = expanded ? tags : tags.slice(0, MAX_VISIBLE_TAGS);
  const overflow = tags.length - MAX_VISIBLE_TAGS;

  const paddedIndex = String(index).padStart(2, "0");
  const hasBothSources = Boolean(sourceUrl && serverSourceUrl);
  const sourceLabel = hasBothSources ? "Web Source" : "Source";

  return (
    <article className="flex flex-col sm:flex-row gap-4 py-5">
      {imageSrc ? (
        <div className="relative w-20 h-20 shrink-0 rounded-[4px] overflow-hidden border border-border bg-surface">
          <ProjectThumbnail src={imageSrc} alt={imageAlt ?? title} />
        </div>
      ) : null}

      <div className="flex-1 min-w-0 max-w-3xl">
        <div className="flex items-baseline gap-2.5">
          {!imageSrc ? (
            <span className="text-xs font-mono text-muted shrink-0">
              {paddedIndex}
            </span>
          ) : null}
          <h3 className="text-heading-row text-foreground">{title}</h3>
        </div>

        <p className="text-small text-muted mt-1.5">{description}</p>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-muted">
          <span className="flex flex-wrap gap-x-2 gap-y-1">
            {visibleTags.map((tag, i) => (
              <span key={tag}>
                {tag}
                {i < visibleTags.length - 1 || overflow > 0 ? (
                  <span className="ml-2 text-muted/50" aria-hidden>
                    ·
                  </span>
                ) : null}
              </span>
            ))}
            {overflow > 0 ? (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="text-foreground transition-colors hover:text-accent underline-offset-4 hover:underline cursor-pointer"
              >
                {expanded ? "show less" : `+${overflow} more`}
              </button>
            ) : null}
          </span>

          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-accent hover:underline underline-offset-4"
            >
              <span>Live Demo</span>
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          ) : null}

          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-accent hover:underline underline-offset-4"
            >
              <span>{sourceLabel}</span>
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          ) : null}

          {serverSourceUrl ? (
            <a
              href={serverSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-accent hover:underline underline-offset-4"
            >
              <span>API Source</span>
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
