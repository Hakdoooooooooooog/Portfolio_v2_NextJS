"use client";

import { useState } from "react";
import ImageModal from "@/portfolio/components/modal-image";
import { TProjectData } from "@/portfolio/utils/types";
import ProjectCTA from "./project-cta";

const ProjectCard = ({
  title,
  tags = [],
  description,
  link,
  metadata,
}: TProjectData) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-12 shadow-xl p-4 bg-blue-50/75 dark:bg-gray-900/75 rounded-lg">
      <div className="flex-[1_0_30%]">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-12">
          {tags &&
            Array.isArray(tags) &&
            tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
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
        <div className="flex-[1_0_40%] relative m-auto p-2">
          <ImageModal
            src={metadata.imageSrc}
            alt={metadata.imageAlt || "Project image"}
            width={300}
            height={200}
            className="w-full h-60 object-cover rounded-lg"
          />
        </div>
      )}

      <ProjectCTA link={link} metadata={metadata} />
    </div>
  );
};

export default ProjectCard;
