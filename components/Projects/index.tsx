import { ProjectsData, sectionNumbers } from "@/portfolio/utils/constants";
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
    <section id="projects" className="container-page">
      <p className="text-eyebrow text-muted">
        {sectionNumbers.projects} / Projects
      </p>

      <h2 className="text-display-lg text-foreground mt-4">Selected work</h2>

      <div className="border-t border-border mt-8" aria-hidden />

      {/* Featured Projects Showcase */}
      <div className="mt-8 flex flex-col gap-12">
        {featured.map((project) => (
          <FeaturedProjectCard
            key={project.title}
            title={project.title}
            tags={project.tags ?? []}
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

      {/* Compact Archive for Other Projects */}
      {rest.length > 0 ? (
        <div className="mt-16">
          <p className="text-eyebrow text-muted">Other work & prototypes</p>

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
      ) : null}
    </section>
  );
}
