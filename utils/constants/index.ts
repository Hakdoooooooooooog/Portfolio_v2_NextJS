import {
  TAboutData,
  TCertificate,
  TExperienceData,
  TNavigationLink,
  TProjectData,
  TSkillCategory,
  TSocialLink,
} from "../types";

export const navLinks: TNavigationLink[] = [
  { label: "Home", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experiences" },
  { label: "About", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const stack: readonly string[] = [
  "TypeScript",
  "Next.js",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS & Terraform",
];

export const sectionNumbers: Record<string, string> = {
  about: "00",
  projects: "01",
  experiences: "02",
  skills: "03",
  contact: "04",
};

export const RESUME_URL =
  "https://drive.google.com/file/d/1AkTlqKIMGDQVnbBBLfmYqtrznzSysXEQ/view";

export const CONTACT_EMAIL = "hicap.darenzjasper@gmail.com";

export const SITE_URL = "https://darenzhicap.netlify.app";

export const aboutData: TAboutData = {
  greeting: "Darenz Jasper A. Hicap",
  name: "Darenz Jasper A. Hicap",
  headline:
    "Building reliable full-stack systems, cloud infrastructure, and practical AI tooling.",
  subheadline:
    "Cum Laude BS IT graduate from Cavite State University. Former Full Stack Developer and IT Help Desk Specialist who has shipped production B2B platforms, AWS/Terraform setups, ERPNext modules, and event-driven internal tools.",
  availability:
    "Available for Full-Stack & AI Engineering roles — Cavite / Remote",
  location: "Cavite, Philippines",
  timezone: "UTC+8",
  email: CONTACT_EMAIL,
  narrative: [
    "I started out diagnosing hardware, networks, and corporate access tickets before moving into full-stack development. That background shapes how I build software: I care about how a NestJS queue behaves under load, how Terraform provisions the host it runs on, and whether the interface stays fast for the person using it all day.",
    "Most of my work lives in TypeScript across Next.js, NestJS, Prisma, PostgreSQL, and Redis—integrating third party application. I prefer explicit data schemas, automated CI/CD checks, and systems that are straightforward for the next engineer to debug.",
  ],
  currently: [
    {
      label: "Building",
      detail: "2D platformer movement and physics mechanics in Godot 4.6",
    },
    {
      label: "Learning",
      detail: "Japanese Hiragana reading and grammar via Genki I",
    },
    {
      label: "Tinkering",
      detail: "Custom PC builds, airflow tuning, and peripheral repairs",
    },
  ],
  stack,
  profileImage: {
    src: "/images/profile.webp",
    alt: "Darenz Jasper A. Hicap in a navy blue suit, white collared shirt, and blue tie.",
  },
};

export const socialLinks: readonly TSocialLink[] = [
  {
    label: "GitHub",
    handle: "@Hakdoooooooooooog",
    href: "https://github.com/Hakdoooooooooooog",
    type: "github",
  },
  {
    label: "LinkedIn",
    handle: "darenz-jasper-hicap",
    href: "https://www.linkedin.com/in/darenz-jasper-hicap",
    type: "linkedin",
  },
];

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
    label: "Backend & Data",
    skills: [
      { src: "/images/skills/nest-js.webp", name: "NestJS" },
      { src: "/images/skills/nodejs-express-js.webp", name: "Node.js / Express" },
      { src: "/images/skills/java.webp", name: "Java" },
      { src: "/images/skills/prisma.webp", name: "Prisma" },
      { src: "/images/skills/postgresql.webp", name: "PostgreSQL" },
      { src: "/images/skills/mysql.webp", name: "MySQL" },
      { src: "/images/skills/redis.webp", name: "Redis" },
    ],
  },
  {
    label: "Cloud & Platform",
    skills: [
      { src: "/images/skills/aws.webp", name: "AWS" },
      { src: "/images/skills/aws-s3.webp", name: "AWS S3" },
      { src: "/images/skills/terraform.webp", name: "Terraform" },
      { src: "/images/skills/docker.webp", name: "Docker" },
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
      image: "/images/certificates/DICT_Basic-Level-of-Cloud-Computing.webp",
    },
    link: {
      href: "#",
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
        "/images/certificates/DICT_Intermediate-Level-of-Cloud-Computing.webp",
    },
    link: {
      href: "#",
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
        "/images/certificates/DICT_Web-Development-Principles-and-Introduction-to-HTML.webp",
    },
    link: {
      href: "#",
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
        "/images/certificates/Flexisource-Mastering-React-from-Essentials-to-Advanced-Optimization.webp",
    },
    link: {
      href: "#",
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
        "/images/certificates/Direcho_Trabaho-Web-Development-With-React.webp",
    },
    link: {
      href: "#",
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
        "/images/certificates/One-Month-HTML-and-CSS-Fundamentals-(DA8E536A).webp",
    },
    link: {
      href: "#",
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
      image: "/images/certificates/One-Month-Javascript-(2A4547EA).webp",
    },
    link: {
      href: "#",
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
    title: "TicketSupport",
    featured: true,
    status: "In Progress",
    isPrivateRepo: true,
    walkthroughAvailable: true,
    statusNote: "Personal Monorepo · Private Repo",
    role: "Full-Stack Architect",
    tags: [
      "Turborepo",
      "Next.js 16",
      "NestJS 12",
      "TypeScript",
      "PostgreSQL 16",
      "Prisma 7",
      "Redis 7",
      "Socket.IO",
      "MinIO (S3)",
      "Docker",
    ],
    context:
      "Built after handling corporate help-desk triage firsthand, replacing shared inboxes with a single tracked workflow.",
    description:
      "Splits customer submissions (/portal) and engineering triage (/admin) inside one Turborepo monorepo with live queue sync and Philippine business-hour SLA tracking.",
    highlights: [
      "Real-time Socket.IO viewer and typing presence stops two support engineers from writing duplicate replies.",
      "SLA engine evaluates targets against Asia/Manila working hours (Mon-Fri 08:00-12:00, 13:00-17:00), pausing automatically on holidays and NEEDS_INFO states.",
      "Client-side compressed and encrypted diagnostic uploads stored in S3-compatible MinIO, paired with knowledge-base deflection as users type.",
      "Runtime Cloudflare Turnstile gates, dual SendGrid v3 / SMTP failover, Handlebars email layout previewer, and PostgreSQL trigger-locked audit logs.",
    ],
    architectureNotes: [
      {
        title: "Submission & Deflection (/portal)",
        detail:
          "Searches published knowledge-base articles as a customer drafts a ticket so routine fixes happen before submission. Diagnostic screenshots are compressed and encrypted in the browser prior to upload.",
      },
      {
        title: "Round-Robin Dispatch & SLA Engine",
        detail:
          "Routes new tickets to the least-loaded specialist in the target department and triggers warning alerts at 75% of elapsed SLA business hours.",
      },
      {
        title: "Collision Avoidance (/admin)",
        detail:
          "Broadcasts active agent presence over Socket.IO across connected browsers and keeps internal staff notes separate from public customer replies.",
      },
      {
        title: "Transactional Mail & Audit Trail",
        detail:
          "Sends status notifications via SendGrid v3 or outbound SMTP, collects 1-5 star CSAT ratings on closure, and locks security-critical logs at the database layer via PostgreSQL triggers.",
      },
    ],
    images: [
      {
        src: "/images/projects/ticketsupport-01-dashboard.webp",
        alt: "TicketSupport IT Service Desk Queue dashboard showing live SLA metrics, CSAT score, team workload, and triage queue",
        caption:
          "IT Service Desk Queue: Live SLA metrics, workload balancing, and one-click ticket claiming",
      },
      {
        src: "/images/projects/ticketsupport-03-customer-portal.webp",
        alt: "TicketSupport Customer Support Portal with slide-over ticket progress drawer and knowledge base deflection",
        caption:
          "Customer Portal (/portal): Live article deflection, encrypted attachments, and slide-over ticket tracker",
      },
      {
        src: "/images/projects/ticketsupport-02-email-preview.webp",
        alt: "TicketSupport Email Templates and Layout Customizer with Handlebars tokens and live desktop/mobile inbox preview",
        caption:
          "Email Layout Customizer: Handlebars variable tokens and live desktop/mobile preview",
      },
      {
        src: "/images/projects/ticketsupport-04-integrations.webp",
        alt: "TicketSupport Operational System Settings for Cloudflare Turnstile bot protection and outbound SMTP or SendGrid delivery",
        caption:
          "Operational Settings: Runtime Cloudflare Turnstile gate and dual SMTP / SendGrid v3 failover",
      },
      {
        src: "/images/projects/ticketsupport-05-login.webp",
        alt: "TicketSupport sign-in portal protected by Cloudflare Turnstile anti-bot verification",
        caption:
          "Authentication Portal: Sign-in and registration gated by Cloudflare Turnstile",
      },
    ],
    metadata: {
      imageSrc: "/images/projects/ticketsupport-01-dashboard.webp",
      imageAlt:
        "TicketSupport IT Service Desk Queue dashboard showing live SLA metrics, CSAT score, team workload, and triage queue",
    },
  },
  {
    title: "Redbiomed",
    featured: true,
    status: "Offline",
    isPrivateRepo: true,
    walkthroughAvailable: false,
    statusNote: "GP Synergia Build · Frontpage Preview",
    role: "Full-Stack Developer",
    tags: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "AWS",
      "Terraform",
      "Docker",
    ],
    context:
      "Commercial B2B storefront and ordering API built at GP Synergia for institutional peptide buyers across Southeast Asia.",
    description:
      "Modular NestJS API and Next.js storefront deployed on AWS infrastructure managed with Terraform and Docker.",
    highlights: [
      "Added Redis catalog caching on top of Prisma and PostgreSQL to keep catalog reads under 120ms.",
      "Containerized services with multi-stage Docker builds and automated GitLab CE CI/CD pipelines.",
      "Provisioned reproducible EC2, S3, and VPC infrastructure via Terraform to eliminate staging/production drift.",
    ],
    metadata: {
      imageSrc: "/images/projects/redbiomed-thumbnail.webp",
      imageAlt:
        "RED BioMed manufacturer and institutional partnerships landing page",
    },
  },
  {
    title: "E-CPLGT",
    featured: true,
    status: "Production",
    isPrivateRepo: false,
    walkthroughAvailable: false,
    statusNote: "City Public Library of General Trias",
    role: "Frontend & Deployment",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    context:
      "Municipal digital library built during my City of General Trias internship so residents and students can browse catalog resources online.",
    description:
      "Public search and catalog interface deployed to production for the City Public Library of General Trias, Cavite.",
    highlights: [
      "Fast client-side catalog search and filtering built with Next.js and TypeScript.",
      "Deployed and configured alongside on-site network and hardware support across municipal departments.",
    ],
    link: "https://github.com/Hakdoooooooooooog/e-library",
    metadata: {
      imageSrc: "/images/projects/ecplgt-thumbnail.webp",
      imageAlt: "E-CPLGT E-Library",
      demoLink: "https://e-cplgt.netlify.app/",
    },
  },
  {
    title: "TOPCIT LCMS",
    featured: true,
    status: "Completed",
    isPrivateRepo: false,
    walkthroughAvailable: false,
    statusNote: "Cavite State University ICT Dept",
    role: "Full-Stack Developer",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Zustand",
      "Zod",
      "AWS S3",
    ],
    context:
      "Standardized competency evaluation and learning platform created for Cavite State University's ICT department.",
    description:
      "Manages hierarchical syllabi, timed TOPCIT practice assessments, automated scoring, and role-based access control.",
    highlights: [
      "Built separate React + TypeScript web client and Express + Prisma REST API repositories.",
      "Implemented JWT role-based access control, AWS S3 asset storage, and Zod/Zustand form state validation.",
    ],
    link: "https://github.com/Hakdoooooooooooog/lcms-topcit-app",
    metadata: {
      imageSrc: "/images/projects/topcit-thumbnail.webp",
      imageAlt: "TOPCIT Learners Content Management System",
      serverLink: "https://github.com/Hakdoooooooooooog/topcit-lcms-app-server",
    },
  },
  {
    title: "Event Management System API",
    tags: ["API", "Node.js", "Express", "Prisma", "PostgreSQL"],
    description:
      "REST service for event scheduling and attendee registration, backed by relational Prisma schemas and PostgreSQL transactions.",
    link: "https://github.com/Hakdoooooooooooog/Event-management-system-server",
  },
  {
    title: "IoT RFID Warehouse Tracking System (Proposed)",
    tags: [
      "Python",
      "Raspberry Pi 5",
      "Linux CLI",
      "M5Stack UHF RFID",
      "PostgreSQL",
    ],
    description:
      "Terminal-based warehouse ingress/egress tracker prototype for Redbiomed on Raspberry Pi 5 using M5Stack UHF RFID readers and Python audit logging.",
  },
];

export const experiencesData: TExperienceData[] = [
  {
    workInfo: {
      title: "Junior Full Stack Developer",
      subtitle: "GP Synergia Technologies Corp. / Kubernlabs Inc.",
      location: "Cavite, Philippines",
      startDate: "Dec 2025",
      endDate: "Jun 2026",
    },
    additionalInfo: {
      bullets: [
        "Built the Redbiomed B2B platform with modular NestJS APIs and a Next.js storefront, adding Redis caching to keep catalog queries under 120ms.",
        "Provisioned EC2, S3, and VPC infrastructure with Terraform and modeled PostgreSQL schemas via Prisma ORM.",
        "Set up self-hosted GitLab CE and multi-stage Docker CI/CD pipelines, cutting deployment cycles from hours to under 10 minutes.",
        "Customized and maintained a self-hosted ERPNext instance covering operations, payroll, and inventory workflows.",
        "Designed a Raspberry Pi 5 Python prototype integrating M5Stack UHF RFID readers for warehouse vial tracking.",
        "Integrated Claude Code and Model Context Protocol (MCP) tooling into internal code review and test-generation workflows.",
      ],
      skills: [
        "NestJS",
        "Next.js",
        "TypeScript",
        "Python",
        "PostgreSQL",
        "Redis",
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
      title: "IT Help Desk & End User Support",
      subtitle: "GP Synergia Technologies Corp. / Kubernlabs Inc.",
      location: "Cavite, Philippines",
      startDate: "Nov 2025",
      endDate: "Dec 2025",
    },
    additionalInfo: {
      bullets: [
        "Managed Microsoft Entra ID (Azure AD) access policies and RBAC permissions for 50+ corporate users.",
        "Rebuilt internal ticket routing rules, cutting average incident turnaround by 30%.",
        "Handled Level 1/2 hardware diagnostics, network troubleshooting, and workstation rollouts with a 98% first-week resolution rate.",
      ],
      skills: [
        "Microsoft Entra ID",
        "Ticketing Pipelines",
        "RBAC",
        "Hardware Diagnostics",
        "Network Troubleshooting",
      ],
    },
  },
  {
    workInfo: {
      title: "IT Support Intern",
      subtitle: "City Government of General Trias (ICT E-Library)",
      location: "General Trias, Cavite",
      startDate: "Mar 2025",
      endDate: "Jun 2025",
    },
    additionalInfo: {
      bullets: [
        "Deployed and configured the production CPLGT e-Library web platform (Next.js) for municipal patrons.",
        "Audited 100+ digital inventory hardware records and resolved Level 1 network and hardware issues across municipal offices.",
      ],
      skills: [
        "Next.js",
        "Network Administration",
        "Hardware Diagnostics",
        "Asset Auditing",
      ],
      project: {
        projectOutputLink: "https://e-cplgt.netlify.app/",
      },
    },
  },
];
