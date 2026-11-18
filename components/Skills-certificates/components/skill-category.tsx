import Image from "next/image";
import type { TSkillData } from "@/portfolio/utils/types";

type SkillCategoryProps = {
  label: string;
  skills: readonly TSkillData[];
  className?: string;
};

function SkillTag({ src, name }: TSkillData) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[4px] border border-border bg-surface-subtle/60 px-2.5 py-1 text-xs font-mono text-foreground">
      <Image
        src={src}
        alt=""
        width={14}
        height={14}
        className="size-3.5 object-contain"
      />
      <span>{name}</span>
    </span>
  );
}

export default function SkillCategory({
  label,
  skills,
  className,
}: SkillCategoryProps) {
  return (
    <div className={className}>
      <p className="text-xs font-mono font-semibold text-foreground pb-2 border-b border-border">
        {label}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill) => (
          <SkillTag key={skill.name} src={skill.src} name={skill.name} />
        ))}
      </div>
    </div>
  );
}
