"use client";

import { useState } from "react";
import ImageModal from "@/portfolio/components/modal-image";
import { TProjectData } from "@/portfolio/utils/types";
import ProjectCTA from "./project-cta";
import useIsSmallDevice from "@/portfolio/utils/hooks/useIsSmallDevice";

const ProjectCard = ({
  title,
  tags = [],
  description,
  link,
  metadata,
}: TProjectData) => {
  const isSmallDevice = useIsSmallDevice();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-12 shadow-xl p-4 bg-gray-400/75 dark:bg-gray-800/75 rounded-lg">
      <div className="flex-[1_0_30%]">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
          {title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-12">
          {tags &&
            Array.isArray(tags) &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-200 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="text-gray-600 dark:text-gray-400">
          <div
            className={`leading-relaxed transition-all duration-300 ${
              isDescriptionExpanded ? "" : "line-clamp-2"
            }`}
          >
            <span>{description}</span>
          </div>
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200 font-medium underline mt-1"
          >
            {isDescriptionExpanded ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
      {metadata && metadata.imageSrc && (
        <div className="flex-[1_0_35%] lg:flex-[1_0_auto] relative m-auto p-2">
          <ImageModal
            src={metadata.imageSrc}
            alt={metadata.imageAlt || "Project image"}
            className="w-full object-cover rounded-lg"
          />
          {isSmallDevice && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-black/80 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg flex items-center gap-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 7L10 10L7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Tap to enlarge
              </div>
            </div>
          )}
        </div>
      )}

      <ProjectCTA link={link} metadata={metadata} />
    </div>
  );
};

export default ProjectCard;
