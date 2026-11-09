import type React from "react";

export type TCertificate = {
  id: number;
  src?: string;
  alt: string;
  metadata?: {
    title: string;
    description: string;
    date: string;
    issuer: string;
    tags: string[];
    image?: string;
  };
  link: {
    href: string;
    target: string;
    rel: string;
  };
};

export type TSkillData = {
  src: string;
  name: string;
};

export type TSkillCategory = {
  label: string;
  skills: TSkillData[];
};

export type TNavigationLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export type TProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type TProjectArchitectureItem = {
  title: string;
  detail: string;
};

export type TProjectData = {
  title: string;
  tags?: string[];
  description: string;
  link?: string;
  featured?: boolean;
  status?: "Production" | "In Progress" | "Offline" | "Prototype" | "Completed";
  isPrivateRepo?: boolean;
  walkthroughAvailable?: boolean;
  statusNote?: string;
  role?: string;
  highlights?: readonly string[];
  architectureNotes?: readonly TProjectArchitectureItem[];
  images?: readonly TProjectImage[];
  metadata?: Partial<{
    imageSrc: string;
    imageAlt: string;
    demoLink: string;
    serverLink: string;
  }>;
};

export type TExperienceData = {
  workInfo: {
    title: string;
    subtitle: string;
    location: string;
    startDate?: string;
    endDate?: string;
  };
  additionalInfo: {
    description?: string;
    bullets?: string[];
    skills?: string[];
    project?: {
      projectOutputLink?: string;
    };
  };
};

export type TSocialLink = {
  label: string;
  href: string;
  type: "github" | "linkedin" | "facebook" | "email";
};

export type TAboutData = {
  greeting: string;
  name: string;
  availability: string;
  location: string;
  timezone: string;
  email: string;
  bio: string[];
  stack: readonly string[];
  profileImage: {
    src: string;
    alt: string;
  };
};
