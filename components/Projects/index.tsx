import {
  ProjectsData,
  sectionNumbers,
} from "@/portfolio/utils/constants";
import type { TProjectData } from "@/portfolio/utils/types";
import FeaturedProjectCard from "./components/featured-project-card";
import CompactProjectRow from "./components/compact-project-row";

function pickFeatured(
  projects: readonly TProjectData[]
): { featured: TProjectData; rest: readonly TProjectData[] } {
  const flagged = projects.find(
    (p) => p.featured === true && p.metadata?.imageSrc
  );
  if (flagged) {
    return { featured: flagged, rest: projects.filter((p) => p !== flagged) };
  }
  if (process.env.NODE_ENV !== "production") {
    console.warn(
      "[Projects] no project has `featured: true` with an imageSrc; falling back to the first entry."
    );
  }
  const [first, ...rest] = projects;
  return { featured: first, rest };
}

export default function Projects() {
  const { featured, rest } = pickFeatured(ProjectsData);

  return (
    <section className="container-page">
      <p className="text-eyebrow text-muted">
        {sectionNumbers.projects} / Projects
      </p>

      <h2 className="text-display-lg text-foreground mt-4">Selected work</h2>

      <div className="border-t border-border mt-8" aria-hidden />

      <div className="mt-8">
        <FeaturedProjectCard
          title={featured.title}
          tags={featured.tags ?? []}
          description={featured.description}
          imageSrc={featured.metadata?.imageSrc ?? ""}
          imageAlt={featured.metadata?.imageAlt ?? featured.title}
          liveUrl={featured.metadata?.demoLink}
          sourceUrl={featured.link}
          serverSourceUrl={featured.metadata?.serverLink}
        />
      </div>

      <div className="mt-16">
        <p className="text-eyebrow text-muted">More work</p>

        <ul className="mt-8 list-none p-0">
          {rest.map((project, i) => (
            <li key={project.title}>
              <CompactProjectRow
                index={i + 1}
                title={project.title}
                tags={project.tags ?? []}
                description={project.description}
                imageSrc={project.metadata?.imageSrc}
                imageAlt={project.metadata?.imageAlt}
                liveUrl={project.metadata?.demoLink}
                sourceUrl={project.link}
                serverSourceUrl={project.metadata?.serverLink}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
