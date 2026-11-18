import { experiencesData } from "@/portfolio/utils/constants";
import TimelineEntry from "./components/timeline-entry";

const ENTRY_DELAY_MS = 70;

export default function Experiences({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section id="experiences" className={className}>
      <div>
        <p className="text-eyebrow text-muted">Experience</p>

        <h2 className="text-display-lg text-foreground mt-3">
          Engineering background
        </h2>

        <p className="text-body text-muted mt-3">
          From IT help desk triage and municipal systems support to shipping
          full-stack platforms and Terraform-managed cloud infrastructure.
        </p>
      </div>

      <div className="border-t border-border mt-6" aria-hidden />

      <ol className="list-none p-0 divide-y divide-border mt-4">
        {experiencesData.map((experience, i) => {
          const delayMs = i * ENTRY_DELAY_MS;
          return (
            <TimelineEntry
              key={`${experience.workInfo.title}-${experience.workInfo.startDate ?? ""}`}
              experience={experience}
              delayMs={delayMs}
            />
          );
        })}
      </ol>
    </section>
  );
}
