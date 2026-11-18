import { ProjectsData } from "@/portfolio/utils/constants";
import type { TProjectData } from "@/portfolio/utils/types";
import FeaturedProjectCard from "./components/featured-project-card";
import CompactProjectRow from "./components/compact-project-row";

function partitionProjects(projects: readonly TProjectData[]): {
  featured: readonly TProjectData[];
  rest: readonly TProjectData[];
} {
  const featured = projects.filter((p) => p.featured === true);
  const rest = projects.filter((p) => !p.featured);

  if (featured.length === 0) {
    const [first, ...remaining] = projects;
    return { featured: [first], rest: remaining };
  }

  return { featured, rest };
}

export default function Projects() {
  const { featured, rest } = partitionProjects(ProjectsData);

  return (
    <section id="projects" className="container-page py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-eyebrow text-muted">Selected Work</p>

        <h2 className="text-display-lg text-foreground mt-3">
          Production systems &amp; case studies
        </h2>

        <p className="text-body text-muted mt-3">
          Full-stack platforms, infrastructure builds, and tools engineered from
          schema design through deployment.
        </p>
      </div>

      <div className="border-t border-border mt-8" aria-hidden />

      <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        {featured.map((project, idx) => (
          <FeaturedProjectCard
            key={project.title}
            index={idx + 1}
            title={project.title}
            tags={project.tags ?? []}
            context={project.context}
            description={project.description}
            role={project.role}
            status={project.status}
            statusNote={project.statusNote}
            isPrivateRepo={project.isPrivateRepo}
            walkthroughAvailable={project.walkthroughAvailable}
            highlights={project.highlights}
            architectureNotes={project.architectureNotes}
            images={project.images}
            fallbackImageSrc={project.metadata?.imageSrc ?? ""}
            fallbackImageAlt={project.metadata?.imageAlt ?? project.title}
            liveUrl={project.metadata?.demoLink}
            sourceUrl={project.link}
            serverSourceUrl={project.metadata?.serverLink}
          />
        ))}
      </div>

      {rest.length > 0 ? (
        <div className="mt-14 pt-10 border-t border-border">
          <p className="text-eyebrow text-muted">Other work &amp; prototypes</p>

          <ul className="mt-6 list-none p-0 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-2">
            {rest.map((project, i) => (
              <li
                key={project.title}
                className="border-b border-border lg:last:border-b"
              >
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
      ) : null}
    </section>
  );
}
