# My Portfolio

I'm **Darenz Jasper A. Hicap**, a full-stack developer. This is my personal
portfolio — a single-page Next.js site where I show what I've built, what I can do,
and where I've worked. I link it from my resume and LinkedIn so anyone can get the
full picture in one place.

**Live:** https://darenzhicap.netlify.app

## Why I built it

It's my home base. Instead of a static PDF that goes stale, it's a living site I keep
up to date as my work changes — and it doubles as a demo of how I build: a production
Next.js app with a real design system, accessible components, and an automated deploy.

## What you'll find

### About Me — `/`
A quick intro to who I am and how I work, the disciplines I work across
(**Frontend, Backend, Cloud, DevOps**), my photo, and how to reach me — email,
GitHub, LinkedIn, and Facebook — plus a link to my resume.

### Projects — `/projects`
A selection of my work, led by one featured build and followed by the rest:

- **Redbiomed** (featured) — a B2B e-commerce platform for the Southeast Asian
  peptide industry.
- **TOPCIT LCMS** — a learning-management platform I built for Cavite State
  University.
- **E-CPLGT** — an e-library for the City Public Library of General Trias.
- **Event Management System API** — a REST API for managing events.

For each one I list the stack, a short note on my role, and links to the live site
and/or source where they exist.

### Skills & Certificates — `/skills-and-certificates`
- **My stack**, grouped into Frontend, Backend, and Platform, each skill shown as a
  chip with its icon.
- **My credentials** — my certificates (TESDA Java NC III, AWS Cloud Practitioner,
  DICT cloud & web development, Flexisource React, Direcho Trabaho, One Month),
  newest-first, with issuer, date, and a verify link where I have one.

### Experiences — `/experiences`
My work history as a timeline — from my junior full-stack and IT support roles at GP
Synergia and my municipal IT internship, back through earlier roles — with dates,
location, highlights, and the skills I used.

## How I keep it updated

Everything on the site comes from one data file:
[`utils/constants/index.ts`](utils/constants/index.ts), typed by
[`utils/types.ts`](utils/types.ts). My projects, skills, certificates, experience,
nav links, resume URL, and site URL all live there — I edit that file and never
hard-code content into components.

## Under the hood

I built it with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and
Zustand, and I deploy it to Netlify. For the full architecture, design system, and
conventions, see the [specification](docs/SPECIFICATION.md).

## More

- [`docs/SPECIFICATION.md`](docs/SPECIFICATION.md) — the specification of record:
  purpose, pages, content model, design system, architecture, and deployment.
- [`docs/README.md`](docs/README.md) — what's in the `docs` folder.
