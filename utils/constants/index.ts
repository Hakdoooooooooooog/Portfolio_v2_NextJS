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
  "Frontend",
  "Backend",
  "Cloud",
  "DevOps",
  "AI",
];

export const sectionNumbers: Record<string, string> = {
  about: "01",
  projects: "02",
  skills: "03",
  experiences: "04",
};

export const RESUME_URL =
  "https://drive.google.com/file/d/1AkTlqKIMGDQVnbBBLfmYqtrznzSysXEQ/view";

// Canonical origin of the live site. `darenzhicap.dev` is a parked domain that
// redirects here (see netlify.toml), so all canonical / OG / robots URLs use
// this host instead.
export const SITE_URL = "https://darenzhicap.netlify.app";

export const skillCategories: TSkillCategory[] = [
  {
    label: "Frontend",
    skills: [
      { src: "/images/skills/ts.webp", name: "TypeScript" },
      { src: "/images/skills/react.webp", name: "React" },
      { src: "/images/skills/next-js.webp", name: "Next.js" },
      { src: "/images/skills/tailwind-css.webp", name: "Tailwind CSS" },
      { src: "/images/skills/zustand.webp", name: "Zustand" },
      { src: "/images/skills/react-query.webp", name: "React Query" },
      { src: "/images/skills/zod.webp", name: "Zod" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { src: "/images/skills/java.webp", name: "Java" },
      { src: "/images/skills/nodejs-express-js.webp", name: "Node.js" },
      { src: "/images/skills/nest-js.webp", name: "NestJS" },
      { src: "/images/skills/prisma.webp", name: "Prisma" },
      { src: "/images/skills/postgresql.webp", name: "PostgreSQL" },
      { src: "/images/skills/mysql.webp", name: "MySQL" },
      { src: "/images/skills/redis.webp", name: "Redis" },
    ],
  },
  {
    label: "Platform",
    skills: [
      { src: "/images/skills/aws.webp", name: "AWS" },
      { src: "/images/skills/aws-s3.webp", name: "AWS S3" },
      { src: "/images/skills/docker.webp", name: "Docker" },
      { src: "/images/skills/terraform.webp", name: "Terraform" },
      { src: "/images/skills/git.webp", name: "Git" },
    ],
  },
];

export const CertificatesData: TCertificate[] = [
  {
    id: 1,
    src: "/images/certificates/DICT_Basic-Level-of-Cloud-Computing.webp",
    alt: "DICT Basic Level of Cloud Computing Certificate",
    metadata: {
      title: "DICT Basic Level of Cloud Computing",
      description:
        "Certificate for completing the basic level of cloud computing.",
      date: "2024-12-26",
      issuer: "Department of Information and Communications Technology (DICT)",
      tags: ["Cloud", "Cloud Computing", "Basic Concepts", "DICT"],
      image: "/images/certificates/DICT_Basic-Level-of-Cloud-Computing.webp", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 2,
    src: "/images/certificates/DICT_Intermediate-Level-of-Cloud-Computing.webp",
    alt: "DICT Intermediate Level of Cloud Computing Certificate",
    metadata: {
      title: "DICT Intermediate Level of Cloud Computing",
      description:
        "Certificate for completing the intermediate level of cloud computing.",
      date: "2024-12-31",
      issuer: "Department of Information and Communications Technology (DICT)",
      tags: ["Cloud", "Cloud Computing", "Intermediate Concepts", "DICT"],
      image:
        "/images/certificates/DICT_Intermediate-Level-of-Cloud-Computing.webp", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 3,
    src: "/images/certificates/DICT_Web-Development-Principles-and-Introduction-to-HTML.webp",
    alt: "DICT Web Development Principles and Introduction to HTML Certificate",
    metadata: {
      title: "DICT Web Development Principles and Introduction to HTML",
      description:
        "Certificate for completing the web development principles and introduction to HTML course.",
      date: "2024-07-03",
      issuer: "Department of Information and Communications Technology (DICT)",
      tags: ["Web", "Web Development", "HTML", "DICT"],
      image:
        "/images/certificates/DICT_Web-Development-Principles-and-Introduction-to-HTML.webp", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 4,
    src: "/images/certificates/Flexisource-Mastering-React-from-Essentials-to-Advanced-Optimization.webp",
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
        "/images/certificates/Flexisource-Mastering-React-from-Essentials-to-Advanced-Optimization.webp", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 5,
    src: "/images/certificates/Direcho_Trabaho-Web-Development-With-React.webp",
    alt: "Direcho Trabaho Web Development With React Certificate",
    metadata: {
      title: "Direcho Trabaho Web Development With React",
      description:
        "Certificate for completing the web development course with React.",
      date: "2025-06-28",
      issuer: "Direcho Trabaho",
      tags: ["Web", "React", "Web Development", "Direcho Trabaho"],
      image:
        "/images/certificates/Direcho_Trabaho-Web-Development-With-React.webp", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 6,
    src: "/images/certificates/One-Month-HTML-and-CSS-Fundamentals-(DA8E536A).webp",
    alt: "One Month HTML and CSS Fundamentals Certificate",
    metadata: {
      title: "One Month HTML and CSS Fundamentals",
      description:
        "Certificate for completing the HTML and CSS fundamentals course.",
      date: "2023-07-21",
      issuer: "One Month",
      tags: ["Web", "HTML", "CSS", "Fundamentals", "One Month"],
      image:
        "/images/certificates/One-Month-HTML-and-CSS-Fundamentals-(DA8E536A).webp", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 7,
    src: "/images/certificates/One-Month-Javascript-(2A4547EA).webp",
    alt: "One Month JavaScript Certificate",
    metadata: {
      title: "One Month JavaScript",
      description:
        "Certificate for completing the JavaScript fundamentals course.",
      date: "2023-02-27",
      issuer: "One Month",
      tags: ["JavaScript", "Fundamentals", "One Month"],
      image: "/images/certificates/One-Month-Javascript-(2A4547EA).webp", // Example image, replace with actual
    },
    link: {
      href: "#", // Replace with actual link
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 8,
    src: "/images/certificates/Hicap_Tesda_NCIII_Java_Programming_page-0001.webp",
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
        "/images/certificates/Hicap_Tesda_NCIII_Java_Programming_page-0001.webp",
    },
    link: {
      href: "#",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  },
  {
    id: 9,
    src: "/images/certificates/aws-cloud-quest-cloud-practitioner-training-badge.webp",
    alt: "AWS Cloud Quest Cloud Practitioner Training Badge",
    metadata: {
      title: "AWS Cloud Practitioner (Cloud Quest)",
      description: "AWS Cloud Quest Cloud Practitioner training badge.",
      date: "2025-12-07",
      issuer: "Amazon Web Services",
      tags: ["AWS", "Cloud", "Cloud Quest", "Cloud Practitioner"],
      image:
        "/images/certificates/aws-cloud-quest-cloud-practitioner-training-badge.webp",
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
      "A commercial B2B e-commerce platform for the Southeast Asian peptide industry. Engineered modular backend services in NestJS (TypeScript) leveraging OOP patterns, dependency injection, and Prisma ORM with PostgreSQL, paired with Redis caching for high-speed reads and a responsive Next.js frontend. Infrastructure is containerized with Docker and provisioned on AWS via Terraform.",
    metadata: {
      imageSrc: "/images/projects/redbiomed-thumbnail.webp",
      imageAlt:
        "RED BioMed manufacturer and institutional partnerships landing page",
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
      "A web-based learning platform for IT students at Cavite State University. Node.js + Express + Prisma API on PostgreSQL with Amazon S3 for assets. The frontend uses Zustand for state and Zod for form validation; the backend uses Zod for request validation.",
    link: "https://github.com/Hakdoooooooooooog/lcms-topcit-app",
    metadata: {
      imageSrc: "/images/projects/topcit-thumbnail.webp",
      imageAlt: "TOPCIT Learners Content Management System",
      serverLink: "https://github.com/Hakdoooooooooooog/topcit-lcms-app-server",
    },
  },
  {
    title: "E-CPLGT",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    description:
      "An e-library for the City Public Library of General Trias, Cavite. Lets the community browse and manage library resources online. Built with Next.js and TypeScript, with light animations via Framer Motion.",
    link: "https://github.com/Hakdoooooooooooog/e-library",
    metadata: {
      imageSrc: "/images/projects/ecplgt-thumbnail.webp",
      imageAlt: "E-CPLGT E-Library",
      demoLink: "https://e-cplgt.netlify.app/",
    },
  },
  {
    title: "Event Management System API",
    tags: ["API", "Node.js", "Express", "Prisma", "PostgreSQL"],
    description:
      "A REST API for managing events: create, update, and read endpoints backed by Node.js, Express, Prisma, and PostgreSQL.",
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
      endDate: "Jun 2026",
    },
    additionalInfo: {
      bullets: [
        "Contributed to full-stack development of Redbiomed (B2B e-commerce platform), building modular backend services in NestJS (TypeScript) using OOP patterns and dependency injection alongside responsive frontend interfaces in React/Next.js.",
        "Engineered a self-hosted GitLab environment and automated CI/CD pipelines to streamline deployments, run automated test suites, and enhance code quality.",
        "Orchestrated containerized application deployments via Docker and provisioned reproducible AWS cloud infrastructure using Terraform.",
        "Customized and self-hosted ERPNext to support the company's internal pipelines, including inventory management.",
        "Communicated with stakeholders to clarify project requirements and translated them into working systems.",
      ],
      skills: [
        "NestJS",
        "TypeScript",
        "React",
        "Next.js",
        "PostgreSQL",
        "Docker",
        "AWS",
        "Terraform",
        "GitLab CI/CD",
        "ERPNext",
      ],
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
      subtitle: "ICT E-Library, City Public Library of General Trias",
      location: "Brgy. Bagumbayan, General Trias, Cavite",
      startDate: "Mar 2025",
      endDate: "Jun 2025",
    },
    additionalInfo: {
      description:
        "Provided Level 1 infrastructure support and deployed the CPLGT e-Library platform to improve public access to digital municipal services.",
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
        "Reviewed product pages and pulled out the main description copy along with details, features, specs, and materials. The extracted data was used as ground truth for downstream webpage evaluation tasks.",
      skills: ["Data Annotation", "Web Evaluation", "Product Analysis"],
    },
  },
];
