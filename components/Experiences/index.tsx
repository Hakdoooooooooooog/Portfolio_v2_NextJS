"use client";

import { useState } from "react";
import ExperienceCard from "./components/experience-card";
import type { TExperienceData } from "@/portfolio/utils/types";

const PrimaryExperiences: TExperienceData[] = [
  {
    workInfo: {
      title: "Junior Full Stack Developer",
      subtitle: "GP Synergia",
      location: "Philippines",
      startDate: "Dec 2025",
    },
    additionalInfo: {
      bullets: [
        "Engineered a self-hosted GitLab environment and automated CI/CD pipelines to streamline deployments and enhance security.",
        "Orchestrated containerized application deployments via Docker and provisioned AWS cloud infrastructure using Terraform.",
      ],
      skills: ["GitLab CI/CD", "Docker", "Terraform", "AWS"],
    },
  },
  {
    workInfo: {
      title: "IT Help Desk and End User Support",
      subtitle: "GP Synergia",
      location: "Philippines",
      startDate: "Nov 2025",
      endDate: "Dec 2025",
    },
    additionalInfo: {
      bullets: [
        "Delivered technical support, managed Microsoft Entra users, and enhanced the support ticket automation pipeline for faster resolution.",
      ],
      skills: ["Microsoft Entra", "Technical Support", "Automation"],
    },
  },
  {
    workInfo: {
      title: "IT Support Internship",
      subtitle: "ICT E-Library - City Public Library of General Trias",
      location: "Brgy. Bagumbayan, General Trias, Cavite",
      startDate: "March 2025",
      endDate: "June 2025",
      imageData: {
        src: "/images/experiences/internship-gentri.webp",
        alt: "General Trias Official Seal",
      },
    },
    additionalInfo: {
      description:
        "Provided comprehensive IT support and technical assistance to library users while managing ICT E-Library resources and maintaining computer systems. Developed and implemented a centralized digital platform that streamlined access to library resources, significantly improving user accessibility and overall experience for community members.",
      skills: [
        "Technical Support",
        "Web Development",
        "Digital Resource Management",
        "UI/UX Design",
      ],
      project: {
        projectOutputLink: "https://e-cplgt.netlify.app/",
      },
    },
  },
];

const EarlierExperiences: TExperienceData[] = [
  {
    workInfo: {
      title: "Crawling Structured Description",
      subtitle: "Telus International AI",
      location: "Tampere, Finland",
      startDate: "August 2023",
      endDate: "December 2023",
      imageData: {
        src: "/images/experiences/telus-official-logo.png",
        alt: "Telus International AI Logo",
      },
    },
    additionalInfo: {
      description:
        "Evaluating structured description of a product page and identify its main description. To extract product information (e.g., description, product details, features, specification/dimensions, material/ingredients, etc...) accurately which will be used in the future assessments of the webpage.",
      skills: ["Data Annotation", "Web Evaluation", "Product Analysis"],
    },
  },
];

const Experiences = () => {
  const [earlierOpen, setEarlierOpen] = useState(false);

  return (
    <section className="max-w-7xl m-auto py-24 px-4 flex flex-col gap-12">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-y-8 gap-x-4 items-start justify-items-center">
        {PrimaryExperiences.map((experience, index) => (
          <ExperienceCard key={index} experienceData={experience} />
        ))}
      </div>

      <details
        className="rounded-lg border border-gray-300/60 dark:border-gray-700/60 bg-gray-200/40 dark:bg-gray-900/30"
        onToggle={(e) => setEarlierOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary className="cursor-pointer list-none px-5 py-4 flex items-center justify-between gap-3 select-none">
          <span className="inline-flex items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-gray-400/40 bg-gray-500/10 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              Earlier work
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {earlierOpen ? "Hide" : "Show"} prior roles
            </span>
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
              earlierOpen ? "rotate-90" : ""
            }`}
            aria-hidden
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </summary>

        <div className="px-5 pb-5 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-y-8 gap-x-4 items-start justify-items-center">
          {EarlierExperiences.map((experience, index) => (
            <ExperienceCard key={index} experienceData={experience} />
          ))}
        </div>
      </details>
    </section>
  );
};

export default Experiences;
