import { experiencesData, sectionNumbers } from "@/portfolio/utils/constants";
import TimelineEntry from "./components/timeline-entry";

const ENTRY_DELAY_MS = 80;

export default function Experiences() {
  return (
    <section className="container-page">
      <p className="text-eyebrow text-muted">
        {sectionNumbers.experiences} / Experiences
      </p>

      <h2 className="text-display-lg text-foreground mt-4">
        Where I&apos;ve worked
      </h2>

      <div className="border-t border-border mt-8" aria-hidden />

      <ol className="relative border-l border-border ml-2 pl-8 mt-8 list-none p-0">
        {experiencesData.map((experience, i) => {
          const isActive = !experience.workInfo.endDate;
          const delayMs = i * ENTRY_DELAY_MS;
          return (
            <TimelineEntry
              key={`${experience.workInfo.title}-${experience.workInfo.startDate ?? ""}`}
              experience={experience}
              isActive={isActive}
              delayMs={delayMs}
              className={i === 0 ? undefined : "mt-8"}
            />
          );
        })}
      </ol>
    </section>
  );
}
