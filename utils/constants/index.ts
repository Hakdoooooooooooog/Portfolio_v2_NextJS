import {
  TCertificate,
  TExperienceData,
  TNavigationLink,
  TProjectData,
  TSkillCategory,
} from "../types";

export const navLinks: TNavigationLink[] = [
  { label: "About Me", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Skills & certificates", href: "/skills-and-certificates" },
  { label: "Experiences", href: "/experiences" },
];

export const stack: readonly string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Spring Boot",
  "AWS",
  "Terraform",
  "Docker",
];

export const sectionNumbers: Record<string, string> = {
  about: "01",
  projects: "02",
  skills: "03",
  experiences: "04",
};

export const RESUME_URL =
  "https://drive.google.com/file/d/1AkTlqKIMGDQVnbBBLfmYqtrznzSysXEQ/view";

export const skillCategories: TSkillCategory[] = [
  {
    label: "Frontend",
    skills: [
      { src: "/images/skills/ts.png", name: "TypeScript" },
      { src: "/images/skills/react.png", name: "React" },
      { src: "/images/skills/next-js.png", name: "Next.js" },
      { src: "/images/skills/tailwind-css.png", name: "Tailwind CSS" },
      { src: "/images/skills/zustand.png", name: "Zustand" },
      { src: "/images/skills/react-query.png", name: "React Query" },
      { src: "/images/skills/zod.png", name: "Zod" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { src: "/images/skills/java.png", name: "Java" },
      { src: "/images/skills/nodejs-express-js.png", name: "Node.js" },
      { src: "/images/skills/nest-js.png", name: "NestJS" },
      { src: "/images/skills/prisma.png", name: "Prisma" },
      { src: "/images/skills/postgresql.png", name: "PostgreSQL" },
      { src: "/images/skills/mysql.png", name: "MySQL" },
      { src: "/images/skills/redis.png", name: "Redis" },
    ],
  },
  {
    label: "Platform",
    skills: [
      { src: "/images/skills/aws.png", name: "AWS" },
      { src: "/images/skills/aws-s3.png", name: "AWS S3" },
      { src: "/images/skills/docker.png", name: "Docker" },
      { src: "/images/skills/terraform.png", name: "Terraform" },
      { src: "/images/skills/git.png", name: "Git" },
    ],
  },
];

export const CertificatesData: TCertificate[] = [
  {
    id: 1,
    src: "/images/certificates/DICT_Basic-Level-of-Cloud-Computing.png",
    alt: "DICT Basic Level of Cloud Computing Certificate",
    metadata: {
      title: "DICT Basic Level of Cloud Computing",
      description:
        "Certificate for completing the basic level of cloud computing.",
      date: "2024-12-26",
      issuer: "Department of Information and Communications Technology (DICT)",
      tags: ["Cloud", "Cloud Computing", "Basic Concepts", "DICT"],
      image: "/images/certificates/DICT_Basic-Level-of-Cloud-Computing.png", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 2,
    src: "/images/certificates/DICT_Intermediate-Level-of-Cloud-Computing.png",
    alt: "DICT Intermediate Level of Cloud Computing Certificate",
    metadata: {
      title: "DICT Intermediate Level of Cloud Computing",
      description:
        "Certificate for completing the intermediate level of cloud computing.",
      date: "2024-12-31",
      issuer: "Department of Information and Communications Technology (DICT)",
      tags: ["Cloud", "Cloud Computing", "Intermediate Concepts", "DICT"],
      image:
        "/images/certificates/DICT_Intermediate-Level-of-Cloud-Computing.png", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 3,
    src: "/images/certificates/DICT_Web-Development-Principles-and-Introduction-to-HTML.png",
    alt: "DICT Web Development Principles and Introduction to HTML Certificate",
    metadata: {
      title: "DICT Web Development Principles and Introduction to HTML",
      description:
        "Certificate for completing the web development principles and introduction to HTML course.",
      date: "2024-07-03",
      issuer: "Department of Information and Communications Technology (DICT)",
      tags: ["Web", "Web Development", "HTML", "DICT"],
      image:
        "/images/certificates/DICT_Web-Development-Principles-and-Introduction-to-HTML.png", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 4,
    src: "/images/certificates/Flexisource-Mastering-React-from-Essentials-to-Advanced-Optimization.png",
    alt: "Flexisource Mastering React from Essentials to Advanced Optimization Certificate",
    metadata: {
      title:
        "Flexisource Mastering React from Essentials to Advanced Optimization",
      description:
        "Certificate for mastering React from essentials to advanced optimization.",
      date: "2024-11-16",
      issuer: "Flexisource",
      tags: ["React", "Advanced Optimization", "Flexisource"],
      image:
        "/images/certificates/Flexisource-Mastering-React-from-Essentials-to-Advanced-Optimization.png", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 5,
    src: "/images/certificates/Direcho_Trabaho-Web-Development-With-React.jpg",
    alt: "Direcho Trabaho Web Development With React Certificate",
    metadata: {
      title: "Direcho Trabaho Web Development With React",
      description:
        "Certificate for completing the web development course with React.",
      date: "2025-06-28",
      issuer: "Direcho Trabaho",
      tags: ["Web", "React", "Web Development", "Direcho Trabaho"],
      image:
        "/images/certificates/Direcho_Trabaho-Web-Development-With-React.jpg", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 6,
    src: "/images/certificates/One-Month-HTML-and-CSS-Fundamentals-(DA8E536A).png",
    alt: "One Month HTML and CSS Fundamentals Certificate",
    metadata: {
      title: "One Month HTML and CSS Fundamentals",
      description:
        "Certificate for completing the HTML and CSS fundamentals course.",
      date: "2023-07-21",
      issuer: "One Month",
      tags: ["Web", "HTML", "CSS", "Fundamentals", "One Month"],
      image:
        "/images/certificates/One-Month-HTML-and-CSS-Fundamentals-(DA8E536A).png", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 7,
    src: "/images/certificates/One-Month-Javascript-(2A4547EA).png",
    alt: "One Month JavaScript Certificate",
    metadata: {
      title: "One Month JavaScript",
      description:
        "Certificate for completing the JavaScript fundamentals course.",
      date: "2023-02-27",
      issuer: "One Month",
      tags: ["JavaScript", "Fundamentals", "One Month"],
      image: "/images/certificates/One-Month-Javascript-(2A4547EA).png", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 8,
    src: "/images/certificates/Hicap_Tesda_NCIII_Java_Programming_page-0001.jpg",
    alt: "TESDA Programming (Java) NC III Certificate",
    metadata: {
      title: "Programming (Java) NC III",
      description:
        "TESDA National Certificate III in Java Programming, completed under the Training for Work Scholarship Program (TWSP).",
      date: "2025-11-29",
      issuer:
        "Technical Education and Skills Development Authority (TESDA)",
      tags: ["Java", "Programming", "TESDA", "NCIII"],
      image:
        "/images/certificates/Hicap_Tesda_NCIII_Java_Programming_page-0001.jpg",
    },
    link: {
      href: "#",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 9,
    src: "/images/certificates/aws-cloud-quest-cloud-practitioner-training-badge.png",
    alt: "AWS Cloud Quest Cloud Practitioner Training Badge",
    metadata: {
      title: "AWS Cloud Practitioner (Cloud Quest)",
      description: "AWS Cloud Quest Cloud Practitioner training badge.",
      date: "2025-12-07",
      issuer: "Amazon Web Services",
      tags: ["AWS", "Cloud", "Cloud Quest", "Cloud Practitioner"],
      image:
        "/images/certificates/aws-cloud-quest-cloud-practitioner-training-badge.png",
    },
    link: {
      href: "https://www.credly.com/badges/713669d7-6115-4916-88c0-4fe38f28a964",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
];

export const ProjectsData: TProjectData[] = [
  {
    title: "Redbiomed",
    featured: true,
    tags: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "AWS",
      "Terraform",
      "Docker",
    ],
    description:
      "A B2B e-commerce management system for the Southeast Asian peptide industry. Built core platform features across the frontend (Next.js) and backend (NestJS + Prisma + PostgreSQL) with Redis-backed caching for hot reads, all on a scalable AWS infrastructure provisioned via Terraform and shipped through containerized deployments.",
    metadata: {
      imageSrc: "/images/projects/redbiomed-thumbnail.png",
      imageAlt:
        "RED BioMed — Manufacturer & Institutional Partnerships landing page",
      demoLink: "https://redbiomed.com",
    },
  },
  {
    title: "TOPCIT LCMS",
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Material UI",
      "Zustand",
      "Zod",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Amazon S3",
    ],
    description:
      "A comprehensive web-based Learning Content Management System for IT students at Cavite State University, with a Node.js + Express + Prisma API backed by PostgreSQL and Amazon S3. The frontend uses Zustand for state and Zod for type-safe form validation; the backend uses Zod for request validation and Prisma for typed DB access.",
    link: "https://github.com/Hakdoooooooooooog/lcms-topcit-app",
    metadata: {
      imageSrc: "/images/projects/topcit-thumbnail.png",
      imageAlt: "TOPCIT Learners Content Management System",
      serverLink: "https://github.com/Hakdoooooooooooog/topcit-lcms-app-server",
    },
  },
  {
    title: "E-CPLGT",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description:
      "An E-Library platform for the City Public Library of General Trias, Cavite. This application allows users to browse and manage library resources, including books and other media. Built with Next.js and TypeScript, it features a modern design with animations powered by Framer Motion.",
    link: "https://github.com/Hakdoooooooooooog/e-library",
    metadata: {
      imageSrc: "/images/projects/ecplgt-thumbnail.png",
      imageAlt: "E-CPLGT E-Library",
      demoLink: "https://e-cplgt.netlify.app/",
    },
  },
  {
    title: "Event Management System API",
    tags: ["API", "Node.js", "Express", "Prisma", "PostgreSQL"],
    description:
      "A RESTful API for managing events, built with Node.js and Express. It provides endpoints for creating, updating, and retrieving event data, utilizing Prisma for database interactions with PostgreSQL. The API is designed to be scalable and secure, supporting various event management functionalities.",
    link: "https://github.com/Hakdoooooooooooog/Event-management-system-server",
  },
];

export const experiencesData: TExperienceData[] = [
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
      subtitle: "ICT E-Library — City Public Library of General Trias",
      location: "Brgy. Bagumbayan, General Trias, Cavite",
      startDate: "Mar 2025",
      endDate: "Jun 2025",
    },
    additionalInfo: {
      description:
        "Provided IT support and technical assistance to library users while managing ICT E-Library resources and maintaining computer systems. Developed and shipped a centralized digital platform that streamlined access to library resources and improved accessibility for community members.",
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
  {
    workInfo: {
      title: "Crawling Structured Description",
      subtitle: "Telus International AI",
      location: "Tampere, Finland",
      startDate: "Aug 2023",
      endDate: "Dec 2023",
    },
    additionalInfo: {
      description:
        "Evaluated structured descriptions of product pages and identified the main description copy. Extracted product info (description, details, features, specifications, materials/ingredients, etc.) used as ground-truth for downstream webpage assessments.",
      skills: ["Data Annotation", "Web Evaluation", "Product Analysis"],
    },
  },
];
