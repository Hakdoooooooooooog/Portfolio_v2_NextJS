import {
  TCertificate,
  TNavigationLink,
  TProjectData,
  TSkillData,
} from "../types";

export const navLinks: TNavigationLink[] = [
  { label: "Skills & certificates", href: "/skills-and-certificates" },
  { label: "Projects", href: "/projects" },
  { label: "Experiences", href: "/experiences" },
];

export const skillsData: TSkillData[] = [
  {
    src: "/images/skills/react.png",
    name: "React",
    position: { x: 30, y: -20 },
  },
  {
    src: "/images/skills/ts.png",
    name: "TypeScript",
    position: { x: 150, y: -20 },
  },
  {
    src: "/images/skills/postgresql.png",
    name: "PostgreSQL",
    position: { x: 170, y: -150 },
  },
  {
    src: "/images/skills/mysql.png",
    name: "MySQL",
    position: { x: -50, y: 60 },
  },
  { src: "/images/skills/git.png", name: "Git", position: { x: 90, y: 80 } },
  {
    src: "/images/skills/prisma.png",
    name: "Prisma",
    position: { x: -50, y: -100 },
  },
  {
    src: "/images/skills/nodejs-express-js.png",
    name: "Node.js",
    position: { x: -150, y: -150 },
  },
  {
    src: "/images/skills/tailwind-css.png",
    name: "Tailwind",
    position: { x: 60, y: -120 },
  },
  {
    src: "/images/skills/zustand.png",
    name: "Zustand",
    position: { x: -20, y: 140 },
  },
  {
    src: "/images/skills/aws-s3.png",
    name: "AWS S3",
    position: { x: -120, y: -20 },
  },
  {
    src: "/images/skills/react-query.png",
    name: "React Query",
    position: { x: -150, y: 120 },
  },
  { src: "/images/skills/zod.png", name: "Zod", position: { x: 190, y: 120 } },
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
];

export const ProjectsData: TProjectData[] = [
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
    tags: [
      "API",
      "Node.js",
      "Express",
      "Amazon S3",
      "Prisma",
      "Zod",
      "PostgreSQL",
    ],
    description:
      "The backend API for the TOPCIT LCMS, built with Node.js and Express. It provides a RESTful interface for managing educational content, user data, and progress tracking. The API integrates with Amazon S3 for file storage, uses Prisma for database interactions with PostgreSQL, and employs Zod for type-safe request validation.",
    link: "https://github.com/Hakdoooooooooooog/topcit-lcms-app-server",
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
  {
    title: "Ordering System",
    tags: ["Java", "Object-Oriented Programming", "CMD"],
    description:
      "A simple cmd-based ordering system built with Java. This application allows users to place orders, manage inventory, and process transactions through a command-line interface.",
    link: "https://github.com/Hakdoooooooooooog/Ordering-System",
  },
  {
    title: "Rock Paper Scissor and Text-based RPG Game",
    tags: ["Java", "Object-Oriented Programming", "CMD"],
    description:
      "A simple cmd-based game that includes both Rock Paper Scissor and a text-based RPG game, built with Java. This application provides an interactive gaming experience through a command-line interface.",
    link: "https://github.com/Hakdoooooooooooog/Game-Project-Java",
  },
];
