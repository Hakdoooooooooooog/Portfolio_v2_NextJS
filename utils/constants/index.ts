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
      "A B2B e-commerce platform for the Southeast Asian peptide industry. I built core features across the Next.js frontend and a NestJS + Prisma + PostgreSQL backend, with Redis caching for hot reads. Infrastructure runs on AWS, provisioned with Terraform and shipped as Docker containers.",
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
      "A web-based learning platform for IT students at Cavite State University. Node.js + Express + Prisma API on PostgreSQL with Amazon S3 for assets. The frontend uses Zustand for state and Zod for form validation; the backend uses Zod for request validation.",
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
      "An e-library for the City Public Library of General Trias, Cavite. Lets the community browse and manage library resources online. Built with Next.js and TypeScript, with light animations via Framer Motion.",
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
      "A REST API for managing events — create, update, and read endpoints backed by Node.js, Express, Prisma, and PostgreSQL.",
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
        "Set up a self-hosted GitLab and wired up CI/CD so the team could ship faster and with fewer manual steps.",
        "Containerized our apps with Docker and managed AWS infrastructure as code with Terraform.",
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
        "Handled day-to-day technical support, managed users in Microsoft Entra, and improved the ticket automation flow so issues got resolved faster.",
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
        "Supported library staff and visitors with day-to-day IT issues and kept the public computers running. Built and shipped a digital library platform that made resources easier to find for the community.",
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
