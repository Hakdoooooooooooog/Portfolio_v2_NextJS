import React from "react";
import { ProjectsData } from "@/portfolio/utils/constants";
import ProjectCard from "./components/project-card";

const Projects = () => {
  return (
    <section className="min-h-screen w-full max-w-6xl py-24 mx-auto">
      <div className="flex flex-col gap-4 w-full rounded-r-md rounded-md">
        {ProjectsData.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            tags={project.tags}
            description={project.description}
            link={project.link}
            metadata={project.metadata}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
