"use client";

import type { CSSProperties } from "react";
import { useReveal } from "@/portfolio/components/use-reveal";
import type { TExperienceData } from "@/portfolio/utils/types";

type TimelineEntryProps = {
  experience: TExperienceData;
  isActive: boolean;
  delayMs?: number;
  className?: string;
};

export default function TimelineEntry({
  experience,
  isActive,
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

  const dotClasses = isActive
    ? "before:bg-accent dot-pulse"
    : "before:bg-border";

  return (
    <li
      ref={ref}
      className={`reveal relative ${dotClasses} before:absolute before:-left-[33px] before:top-1 before:size-2.5 before:rounded-full ${className ?? ""}`}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
      {dateLabel ? (
        <p className="text-eyebrow text-muted">{dateLabel}</p>
      ) : null}

      <h3 className="text-heading-row text-foreground mt-2">{title}</h3>

      <p className="text-small font-mono text-muted mt-1">
        {subtitle} · {location}
      </p>

      {bullets && bullets.length > 0 ? (
        <ul className="list-disc list-outside marker:text-muted text-body text-muted mt-4 pl-5 flex flex-col gap-2">
          {bullets.map((bullet, i) => (
            <li key={i}>{bullet}</li>
          ))}
        </ul>
      ) : description ? (
        <p className="text-body text-muted mt-4">{description}</p>
      ) : null}

      {skills && skills.length > 0 ? (
        <p className="text-small font-mono text-muted mt-4 flex flex-wrap gap-x-2 gap-y-1">
          {skills.map((skill, i) => (
            <span key={skill}>
              {skill}
              {i < skills.length - 1 ? (
                <span className="ml-2 text-muted/60" aria-hidden>
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
          className="inline-flex items-center gap-2 mt-4 text-small font-mono text-muted transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent"
        >
          View output <span aria-hidden>↗</span>
        </a>
      ) : null}
    </li>
  );
}
