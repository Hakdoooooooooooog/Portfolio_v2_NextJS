"use client";

import { Button } from "@/portfolio/components/button";
import ImageModal from "@/portfolio/components/modal-image";
import { TProjectData } from "@/portfolio/utils/types";

export const ProjectCard = ({
  title,
  tags,
  description,
  link,
  metadata,
}: TProjectData) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-12 shadow-xl p-4 bg-blue-50/75 dark:bg-gray-900/75 rounded-lg">
      <div className="flex-[1_0_30%]">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-12">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
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
      <div className="sm:m-auto flex flex-col gap-4">
        <Button
          variant="primary"
          className={`w-full cursor-pointer rounded-full ${
            link ? "" : "pointer-events-none opacity-50"
          }`}
          onClick={() => window.open(link, "_blank")}
          title={link ? "View GitHub Repository" : "No GitHub Link Available"}
          disabled={!link}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub
        </Button>
        <Button
          variant="secondary"
          className={`w-full cursor-pointer rounded-full ${
            metadata?.demoLink ? "" : "pointer-events-none opacity-50"
          }`}
          onClick={() => window.open(metadata?.demoLink, "_blank")}
          title={metadata?.demoLink ? "View Live Demo" : "No Demo Available"}
          disabled={!metadata?.demoLink}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.44 8.5H2.75a.75.75 0 0 1 0-1.5h8.69L8.22 4.03a.75.75 0 0 1 0-1.06z" />
          </svg>
          Demo
        </Button>
      </div>
    </div>
  );
};
