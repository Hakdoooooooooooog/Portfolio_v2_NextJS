import React from "react";
import { ProjectsData } from "@/portfolio/utils/constants";
import ProjectCard from "./components/project-card";
import { Separator } from "@base-ui-components/react";

const Projects = () => {
  return (
    <section className="w-full max-w-6xl py-24 mx-auto">
      <div className="flex flex-col gap-4 w-full bg-gray-400/75 dark:bg-gray-800/75 p-6 rounded-r-md rounded-md">
        {ProjectsData.map((project, index) => (
          <React.Fragment key={index}>
            <ProjectCard
              key={index}
              title={project.title}
              tags={project.tags}
              description={project.description}
              link={project.link}
              metadata={project.metadata}
            />
            {index < ProjectsData.length - 1 && (
              <Separator
                orientation="horizontal"
                className="w-full h-[1px] bg-gray-400 dark:bg-gray-600 my-4"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Projects;
