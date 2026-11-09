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
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experiences" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
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
  experiences: "03",
  skills: "04",
  contact: "05",
};

export const RESUME_URL =
  "https://drive.google.com/file/d/1AkTlqKIMGDQVnbBBLfmYqtrznzSysXEQ/view";

export const CONTACT_EMAIL = "hicap.darenzjasper@gmail.com";

// Canonical origin of the live site.
export const SITE_URL = "https://darenzhicap.netlify.app";

export const aboutData: TAboutData = {
  greeting: "Hello! My name is",
  name: "Darenz Jasper A. Hicap",
  availability: "Open to Junior Full-Stack & Backend roles",
  location: "Cavite, Philippines",
  timezone: "UTC+8",
  email: CONTACT_EMAIL,
  bio: [
    "I build web applications end to end, from interactive interfaces to backend services, database schemas, and cloud deployments. I focus on clean architecture, predictable data flow, and code that remains straightforward for the next developer to maintain.",
    "My primary stack centers on TypeScript, React, Next.js, and NestJS, backed by PostgreSQL, Redis, and Docker. I also design AI-assisted developer workflows and specialized tooling with Claude Code and Model Context Protocol (MCP).",
  ],
  stack: ["Frontend", "Backend", "Cloud", "DevOps", "AI"],
  profileImage: {
    src: "/images/profile.webp",
    alt: "Darenz Jasper A. Hicap smiling in traditional white barong with arms crossed.",
  },
};

export const socialLinks: readonly TSocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Hakdoooooooooooog",
    type: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/darenz-jasper-hicap",
    type: "linkedin",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/drnz.hcp",
    type: "facebook",
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
    statusNote: "Personal project · Private repository",
    role: "Junior Full-Stack Developer",
    tags: [
      "Turborepo",
      "Next.js 16",
      "NestJS 12",
      "TypeScript",
      "Tailwind CSS v4",
      "Socket.IO",
      "TanStack Query",
      "Prisma 7",
      "PostgreSQL 16",
      "Redis 7",
      "MinIO (S3)",
      "Cloudflare Turnstile",
      "Docker",
    ],
    description:
      "An IT service desk and incident triage monorepo I am building to replace disorganized shared inboxes with a single tracked workflow. It splits customer requests (/portal) and engineering operations (/admin) into dedicated workspaces, syncs live queues and agent presence over Socket.IO so two engineers never duplicate a reply, and tracks SLA timers against Philippine business hours (Asia/Manila) with automatic holiday and needs-info pauses.",
    highlights: [
      "Real-time knowledge-base deflection as customers type, plus client-side compressed and encrypted diagnostic file uploads to S3-compatible MinIO storage.",
      "Fair round-robin department dispatch, one-click ticket claiming, team workload balancing, private staff notes, and 1-5 star CSAT tracking.",
      "Admin console for runtime Cloudflare Turnstile bot gates, dual SendGrid v3 / SMTP email delivery, a Handlebars email template customizer with live desktop and mobile preview, and PostgreSQL trigger-locked audit logs.",
    ],
    architectureNotes: [
      {
        title: "1. Submission & Instant Deflection (/portal)",
        detail:
          "As a customer drafts a ticket, the deflection engine searches published knowledge-base articles in real time so common issues are solved without filing a ticket. Diagnostic screenshots are compressed and encrypted in the browser before upload.",
      },
      {
        title: "2. Round-Robin Dispatch & Philippine SLA Engine",
        detail:
          "New tickets route automatically to the least-loaded specialist in that department. SLA timers evaluate first-response and resolution targets against Philippine working hours (Asia/Manila, UTC+8, Mon-Fri 08:00-12:00 and 13:00-17:00), pausing on weekends, public holidays, and NEEDS_INFO states, with warning alerts at 75% elapsed time.",
      },
      {
        title: "3. Real-Time Collision Avoidance (/admin)",
        detail:
          "Bidirectional Socket.IO channels broadcast active viewer and typing presence across connected browsers so support engineers never write duplicate replies. Staff can collaborate via private internal notes and respond with canned templates.",
      },
      {
        title: "4. Resolution, CSAT & Immutable Audit Logs",
        detail:
          "Resolved tickets trigger transactional email alerts (SendGrid v3 or outbound SMTP) and invite a 1-5 star CSAT rating. Security-critical events are locked at the database layer using PostgreSQL triggers.",
      },
    ],
    images: [
      {
        src: "/images/projects/ticketsupport-01-dashboard.webp",
        alt: "TicketSupport IT Service Desk Queue dashboard showing live SLA metrics, CSAT score, team workload, and triage queue",
        caption: "IT Service Desk Queue: Live SLA metrics, engineer workload balancing, and one-click ticket claiming",
      },
      {
        src: "/images/projects/ticketsupport-03-customer-portal.webp",
        alt: "TicketSupport Customer Support Portal with slide-over ticket progress drawer and knowledge base deflection",
        caption: "Customer Portal (/portal): Real-time article deflection, encrypted attachments, and slide-over ticket tracker",
      },
      {
        src: "/images/projects/ticketsupport-02-email-preview.webp",
        alt: "TicketSupport Email Templates and Layout Customizer with Handlebars tokens and live desktop/mobile inbox preview",
        caption: "Email Layout Customizer: Handlebars variable tokens, brand accent picker, and live inbox preview",
      },
      {
        src: "/images/projects/ticketsupport-04-integrations.webp",
        alt: "TicketSupport Operational System Settings for Cloudflare Turnstile bot protection and outbound SMTP or SendGrid delivery",
        caption: "Operational Settings: Runtime Cloudflare Turnstile challenge gate and dual SMTP / SendGrid v3 failover",
      },
      {
        src: "/images/projects/ticketsupport-05-login.webp",
        alt: "TicketSupport sign-in portal protected by Cloudflare Turnstile anti-bot verification",
        caption: "Authentication Portal: Sign-in and registration protected by Cloudflare Turnstile",
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
    statusNote: "Company build at GP Synergia · Site offline (frontpage preview)",
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
    description:
      "During my time at GP Synergia, I built the storefront and backend services for Redbiomed, a commercial B2B peptide distributor for institutional buyers in Southeast Asia. I structured the backend around modular NestJS services with Prisma and PostgreSQL, added Redis caching to keep catalog reads under 120ms, containerized the stack with Docker, and provisioned AWS infrastructure with Terraform. The commercial storefront is currently offline and the repository remains private to the company, so only the landing page capture is shown here.",
    metadata: {
      imageSrc: "/images/projects/redbiomed-thumbnail.webp",
      imageAlt:
        "RED BioMed manufacturer and institutional partnerships landing page",
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
      "A standardized competency evaluation and learning platform for Cavite State University's ICT department. Built modular Node.js and Express REST APIs with Prisma ORM and PostgreSQL to manage hierarchical syllabi, timed assessments, and automated scoring. Implemented JWT-based RBAC and AWS S3 asset storage, with Zustand and Zod handling client state and form validation.",
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
      "A municipal digital library platform for the City Public Library of General Trias, Cavite. Enables citizens and students to search, browse, and track community library catalog resources online. Built with Next.js, TypeScript, and Tailwind CSS with smooth motion cues via Framer Motion.",
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
      "A RESTful backend service for event scheduling and registration. Features structured endpoints for event CRUD operations, attendee validation, relational schema modeling with Prisma ORM, and transactional consistency in PostgreSQL.",
    link: "https://github.com/Hakdoooooooooooog/Event-management-system-server",
  },
  {
    title: "IoT RFID Warehouse Tracking System (Proposed)",
    tags: [
      "Python",
      "Raspberry Pi 5",
      "Linux CLI",
      "M5Stack UHF RFID",
      "IoT",
      "PostgreSQL",
    ],
    description:
      "A proposed terminal-based IoT warehouse tracking architecture designed for Redbiomed on Linux (Raspberry Pi 5). Engineered to track peptide vial products during warehouse ingress and egress, using M5Stack UHF RFID units and vial strip tags with Python powering hardware integration, real-time data transformation, and automated audit logging.",
  },
];

export const experiencesData: TExperienceData[] = [
  {
    workInfo: {
      title: "Junior Full Stack Developer",
      subtitle: "GP Synergia Technologies Corp.",
      location: "Cavite, Philippines",
      startDate: "Dec 2025",
      endDate: "Jun 2026",
    },
    additionalInfo: {
      bullets: [
        "Architected full-stack features for Redbiomed (B2B peptide platform), building modular NestJS backend services and responsive Next.js storefronts with Redis caching for sub-120ms catalog reads.",
        "Designed a proposed terminal-based IoT warehouse tracking prototype on Linux (Raspberry Pi 5), using Python for M5Stack UHF RFID hardware integration and data transformation.",
        "Configured self-hosted GitLab CE and automated multi-stage Docker CI/CD pipelines, reducing manual deployment cycles from hours to under 10 minutes with automated test verification.",
        "Provisioned reproducible AWS cloud infrastructure (EC2, S3, VPC) using Terraform and modeled relational PostgreSQL schemas with Prisma ORM, eliminating environment drift.",
        "Customized and maintained a self-hosted ERPNext instance for company operations, payroll, and inventory tracking.",
        "Accelerated code reviews and automated test generation by integrating Claude Code and Model Context Protocol (MCP) tooling into engineering workflows.",
      ],
      skills: [
        "NestJS",
        "TypeScript",
        "Python",
        "React",
        "Next.js",
        "PostgreSQL",
        "Redis",
        "Docker",
        "AWS",
        "Terraform",
        "GitLab CI/CD",
        "ERPNext",
        "IoT & RFID",
        "Linux CLI",
      ],
    },
  },
  {
    workInfo: {
      title: "IT Help Desk and End User Support",
      subtitle: "GP Synergia Technologies Corp.",
      location: "Cavite, Philippines",
      startDate: "Nov 2025",
      endDate: "Dec 2025",
    },
    additionalInfo: {
      bullets: [
        "Administered enterprise identity and access management for 50+ corporate users via Microsoft Entra ID (Azure AD), enforcing Role-Based Access Control (RBAC) and credential policies.",
        "Optimized internal help desk ticketing pipelines and automated routing rules, reducing incident resolution turnaround by 30% across corporate end users.",
        "Resolved Level 1/2 technical support requests spanning hardware diagnostics, network configurations, and software deployments with a 98% first-week resolution rate.",
      ],
      skills: [
        "Microsoft Entra ID",
        "Technical Support",
        "Workflow Automation",
        "Hardware Diagnostics",
        "Network Troubleshooting",
      ],
    },
  },
  {
    workInfo: {
      title: "IT Support Internship",
      subtitle: "ICT E-Library, City Public Library of General Trias",
      location: "General Trias, Cavite, Philippines",
      startDate: "Mar 2025",
      endDate: "Jun 2025",
    },
    additionalInfo: {
      description:
        "Deployed and configured the production CPLGT e-Library platform (Next.js), expanding municipal digital catalog access for community patrons. Provided Level 1 hardware diagnostics, local network troubleshooting across municipal departments, and audited 100+ digital inventory hardware records with zero extended downtime.",
      skills: [
        "Technical Support",
        "Next.js",
        "Network Administration",
        "Hardware Diagnostics",
        "Asset Management",
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
      location: "Tampere, Finland (Remote)",
      startDate: "Aug 2023",
      endDate: "Dec 2023",
    },
    additionalInfo: {
      description:
        "Audited and structured high-precision ground-truth metadata (specifications, dimensions, materials, and structured attributes) from complex e-commerce pages to evaluate and benchmark downstream machine learning models.",
      skills: [
        "Data Quality Assurance",
        "Ground Truth Verification",
        "Metadata Structuring",
        "E-Commerce Analysis",
      ],
    },
  },
];
