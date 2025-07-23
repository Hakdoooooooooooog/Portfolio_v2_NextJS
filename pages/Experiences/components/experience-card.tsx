"use client";

import React, { useState } from "react";
import Image from "next/image";

export type TExperienceData = {
  workInfo: {
    title: string;
    subtitle: string;
    location: string;
    startDate?: string;
    endDate?: string;
    imageData?: {
      src: string;
      alt: string;
    };
  };
  additionalInfo: {
    description?: string;
    skills?: string[];
    workTags?: string[];
    project?: {
      projectOutputLink?: string;
    };
  };
};

const ExperienceCard = ({
  experienceData,
}: {
  experienceData: TExperienceData;
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <>
      <div className="flex flex-col  justify-center gap-4 p-6 max-w-lg h-fit border rounded-md border-amber-500 bg-gray-800/75 shadow-lg">
        {/* Experience Hero */}
        <ExperienceHero
          title={experienceData.workInfo.title}
          subtitle={experienceData.workInfo.subtitle}
          location={experienceData.workInfo.location}
          imageData={experienceData.workInfo.imageData}
        />
        {/* Tags */}
        <div className="w-full">
          <ExperienceTags tags={experienceData.additionalInfo.workTags || []} />
        </div>

        {/* Description */}
        <div className="w-full text-sm text-gray-300">
          <ExperienceDescription
            description={experienceData.additionalInfo.description || ""}
            isExpanded={isDescriptionExpanded}
          />
          <button
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium underline mt-1"
          >
            {isDescriptionExpanded ? "Show less" : "Show more"}
          </button>
        </div>

        {/* Skills Acquired */}
        <div className="w-full">
          <ExperienceSkills
            skills={experienceData.additionalInfo.skills || []}
          />
        </div>

        <div className="w-full flex flex-col gap-3 mt-auto">
          {/* Duration */}
          <span className="text-sm text-gray-300">
            {experienceData.workInfo.startDate && (
              <span>
                {experienceData.workInfo.startDate} -{" "}
                {experienceData.workInfo.endDate || "Present"}
              </span>
            )}
          </span>

          {experienceData.additionalInfo.project && (
            <div className="border border-amber-400/30 bg-amber-500/10 rounded-lg p-3">
              <p className="text-xs text-amber-400 font-semibold mb-1 uppercase tracking-wide">
                📋 Internship Output
              </p>
              <a
                href={experienceData.additionalInfo.project.projectOutputLink}
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 hover:underline transition-all duration-200 font-semibold group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:scale-110 transition-transform duration-200"
                >
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <polyline
                    points="15,3 21,3 21,9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  <line
                    x1="10"
                    y1="14"
                    x2="21"
                    y2="3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  View My Project Output
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const ExperienceHero = ({
  title,
  subtitle,
  location,
  imageData,
}: {
  title: string;
  subtitle: string;
  location: string;
  imageData?: {
    src: string;
    alt: string;
  };
}) => {
  return (
    <>
      {/* Work Image */}
      <div className="flex items-start gap-y-2 gap-x-4 flex-wrap">
        {/* Optional */}
        {imageData && (
          <Image
            src={imageData.src}
            alt={imageData.alt}
            width={75}
            height={75}
            className="rounded-md object-cover flex-shrink-0"
          />
        )}

        <div className="flex flex-col w-full flex-1">
          <h2 className="text-lg font-semibold">{title}</h2>
          <h3 className="text-sm text-gray-500">{subtitle}</h3>
        </div>

        {/* Location */}
        <div className="flex-[1_1_100%] flex items-center gap-2 text-sm text-gray-600">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="currentColor"
            />
          </svg>
          <p>{location}</p>
        </div>
      </div>
    </>
  );
};

const ExperienceDescription = ({
  description,
  isExpanded,
}: {
  description: string;
  isExpanded: boolean;
}) => {
  return (
    <div
      className={`leading-relaxed transition-all duration-300 ${
        isExpanded ? "" : "line-clamp-2"
      }`}
    >
      <span className="text-gray-300">{description}</span>
    </div>
  );
};

const ExperienceTags = ({ tags }: { tags: string[] }) => {
  return (
    <ul className="flex justify-between flex-wrap text-sm text-gray-500 underline underline-offset-6">
      {tags.map((tag, index) => (
        <li key={index} className="text-sm">
          {tag}
        </li>
      ))}
    </ul>
  );
};

const ExperienceSkills = ({ skills }: { skills: string[] }) => {
  return (
    <ul className="flex justify-start flex-wrap gap-y-2 gap-x-4 text-sm text-black">
      {skills.map((skill, index) => (
        <li
          key={index}
          className="p-2 bg-gray-200/75 text-sm rounded-lg shadow-sm hover:bg-gray-300 transition-colors duration-200"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
};

export default ExperienceCard;
