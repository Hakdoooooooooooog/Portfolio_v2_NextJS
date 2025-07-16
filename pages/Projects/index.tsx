import { TProjectData } from "@/portfolio/utils/types";
import { ProjectCard } from "./component/ProjectCard";
import React from "react";

const ProjectsData: TProjectData[] = [
  {
    title: "TOPCIT LCMS",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Material UI",
      "Zustand",
      "Zod",
    ],
    link: "https://github.com/Hakdoooooooooooog/lcms-topcit-app",
    description:
      "A comprehensive web-based Learning Content Management System designed specifically for IT students at Cavite State University. This application serves as a centralized platform for managing educational resources, tracking progress, and preparing students for practical competency assessments. Built with modern React architecture, it features robust state management through Zustand, type-safe form validation using Zod, and a responsive design system combining Tailwind CSS with Material UI components for an optimal user experience.",
    metadata: {
      imageSrc: "/images/projects/topcit-thumbnail.png",
      imageAlt: "TOPCIT Learners Content Management System",
    },
  },
  {
    title: "TOPCIT LCMS API",
    tags: ["Node.js", "Express", "Amazon S3", "Prisma", "Zod", "PostgreSQL"],
    description:
      "The backend API for the TOPCIT LCMS, built with Node.js and Express. It provides a RESTful interface for managing educational content, user data, and progress tracking. The API integrates with Amazon S3 for file storage, uses Prisma for database interactions with PostgreSQL, and employs Zod for type-safe request validation.",
    link: "https://github.com/Hakdoooooooooooog/topcit-lcms-app-server",
  },
  {
    title: "Portfolio",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    description:
      "A personal portfolio website showcasing my skills, projects, and experiences. Built with Next.js and TypeScript, it features a modern design with smooth animations powered by GSAP. The site is fully responsive and optimized for performance.",
    link: "https://github.com/Hakdoooooooooooog/Portfolio_v2_NextJS",
    metadata: {
      imageSrc: "/images/projects/portfolio-v2-thumbnail.png",
      imageAlt: "Portfolio Website",
    },
  },
];

const Projects = () => {
  return (
    <section className="w-full py-24">
      <div className="max-w-6xl w-full mx-auto">
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
                <hr className="border-t border-gray-300 dark:border-gray-600 my-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
