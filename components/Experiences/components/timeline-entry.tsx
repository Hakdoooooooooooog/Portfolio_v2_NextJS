"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/portfolio/components/use-reveal";
import type { TExperienceData } from "@/portfolio/utils/types";
import { ArrowUpRightIcon } from "@/portfolio/components/icons";

type TimelineEntryProps = {
  experience: TExperienceData;
  delayMs?: number;
  className?: string;
};

export default function TimelineEntry({
  experience,
  delayMs = 0,
  className,
}: TimelineEntryProps) {
  const ref = useReveal<HTMLLIElement>();
  const { workInfo, additionalInfo } = experience;
  const { title, subtitle, location, startDate, endDate } = workInfo;
  const { description, bullets, skills, project } = additionalInfo;

  const dateLabel = startDate
    ? `${startDate} — ${endDate ?? "Present"}`
    : null;

  return (
    <li
      ref={ref}
      className={`reveal py-7 first:pt-2 last:pb-0 ${className ?? ""}`}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h3 className="text-heading-row text-foreground">{title}</h3>
          <p className="text-small text-foreground/90 mt-0.5">{subtitle}</p>
        </div>

        <div className="text-xs font-mono text-muted">
          {dateLabel ? (
            <span className="text-accent font-medium uppercase tracking-wider">
              {dateLabel}
            </span>
          ) : null}
          <span className="mx-2 text-muted/50" aria-hidden>
            ·
          </span>
          <span>{location}</span>
        </div>
      </div>

      {bullets && bullets.length > 0 ? (
        <ul className="list-disc list-outside marker:text-muted text-small text-muted mt-4 pl-4 flex flex-col gap-1.5 leading-relaxed">
          {bullets.map((bullet) => (
            <li key={bullet.slice(0, 40)}>{bullet}</li>
          ))}
        </ul>
      ) : description ? (
        <p className="text-small text-muted mt-4 leading-relaxed">
          {description}
        </p>
      ) : null}

      {skills && skills.length > 0 ? (
        <p className="text-xs font-mono text-muted mt-4 pt-3 border-t border-border/60 flex flex-wrap gap-x-2 gap-y-1">
          {skills.map((skill, i) => (
            <span key={skill}>
              {skill}
              {i < skills.length - 1 ? (
                <span className="ml-2 text-muted/50" aria-hidden>
                  ·
                </span>
              ) : null}
            </span>
          ))}
        </p>
      ) : null}

      {project?.projectOutputLink ? (
        <a
          href={project.projectOutputLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 mt-3 text-xs font-mono text-foreground transition-colors hover:text-accent hover:underline underline-offset-4"
        >
          <span>View deployed output</span>
          <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ) : null}
    </li>
  );
}
