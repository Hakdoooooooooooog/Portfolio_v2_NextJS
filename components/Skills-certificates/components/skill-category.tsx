"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { TSkillData } from "@/portfolio/utils/types";
import { useReveal } from "./use-reveal";

type SkillCategoryProps = {
  label: string;
  skills: readonly TSkillData[];
  delayMs?: number;
  className?: string;
};

function SkillChip({ src, name }: TSkillData) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-2 py-1 text-small font-mono text-foreground">
      <Image
        src={src}
        alt=""
        width={16}
        height={16}
        className="size-4 object-contain"
      />
      <span>{name}</span>
    </span>
  );
}

export default function SkillCategory({
  label,
  skills,
  delayMs = 0,
  className,
}: SkillCategoryProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={{ "--reveal-delay": `${delayMs}ms` } as CSSProperties}
    >
      <p className="text-eyebrow text-muted">{label}</p>
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill) => (
          <SkillChip key={skill.name} src={skill.src} name={skill.name} />
        ))}
      </div>
    </section>
  );
}
