"use client";

import { socialLinks } from "@/portfolio/utils/constants";
import { ArrowUpRightIcon } from "@/portfolio/components/icons";

export default function ContactBlock({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-4">
        {socialLinks.map(({ label, href, handle }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label}${handle ? ` (${handle})` : ""}`}
            className="group inline-flex items-center gap-1 text-small font-mono text-muted hover:text-foreground transition-colors underline-offset-4 hover:underline decoration-accent"
          >
            <span>{label}</span>
            <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ))}
      </div>
    </div>
  );
}
