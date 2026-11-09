# Darenz Jasper Hicap — Portfolio

I am **Darenz Jasper A. Hicap**, a full-stack developer. This is my personal portfolio, built as a single-page Next.js web application designed for fast, scannable technical review.

**Live Site:** https://darenzhicap.netlify.app

---

## Layout Structure

The site uses a continuous single-page funnel:

1. **01 / About (`#about`)**: Hero introduction, current availability and timezone badge (`Open to Full-Stack & Backend roles · Cavite, PH / UTC+8`), core disciplines, and quick CTAs to jump directly to selected work or reach out.
2. **02 / Projects (`#projects`)**: Featured case studies with interactive multi-image galleries, click-to-enlarge lightboxes, architectural breakdowns, and repository status badges, followed by a compact archive of additional builds and APIs.
3. **03 / Experiences (`#experiences`)**: Chronological work history timeline highlighting technical achievements, production infrastructure, and tools used at each role.
4. **04 / Skills & Credentials (`#skills`)**: Categorized technical skills (Frontend, Backend, Platform) and verifiable national and cloud certifications sorted newest-first.
5. **05 / Contact (`#contact`)**: Direct email, copy-to-clipboard button, social links, and an interactive contact form protected by Cloudflare Turnstile bot verification and dispatched via Nodemailer over SMTP.

---

## Featured Work

### 1. TicketSupport (Flagship Personal Project)
- **Status:** In Progress (Personal Project · Private Repository)
- **Stack:** Turborepo, Next.js 16, NestJS 12, TypeScript, Tailwind CSS v4, Socket.IO, TanStack Query, Prisma 7, PostgreSQL 16, Redis 7, MinIO (S3), Cloudflare Turnstile, Docker.
- **Overview:** An IT service desk and incident triage monorepo built after handling corporate help-desk routing firsthand. Splits customer requests (`/portal`) and engineering triage (`/admin`) into distinct workspaces.
- **Key Features:** Real-time Socket.IO agent presence to stop duplicate replies, Philippine business-hours SLA engine (`Asia/Manila`) with automatic holiday and needs-info pauses, client-side encrypted diagnostic attachments in MinIO, runtime Cloudflare Turnstile bot gates, and live Handlebars email template previews with desktop and mobile views.
- **Walkthrough:** Includes a dedicated **Request walkthrough / demo** action that scrolls to `#contact` and pre-fills the inquiry form.

### 2. Redbiomed (Commercial Build at GP Synergia)
- **Status:** Offline (Company Repository Private · Frontpage Preview Only)
- **Stack:** Next.js, NestJS, TypeScript, PostgreSQL, Prisma, Redis, AWS, Terraform, Docker.
- **Overview:** B2B e-commerce platform for peptide distribution in Southeast Asia. Built modular NestJS backend services with Redis caching for sub-120ms catalog reads, containerized services with Docker, and provisioned AWS infrastructure with Terraform.

---

## Technical Architecture

- **Framework:** Next.js 16 (App Router, Turbopack)
- **UI & Runtime:** React 19, TypeScript 5
- **Styling:** Tailwind CSS v4 (CSS-first `@theme` using strict semantic tokens in `app/globals.css`)
- **Animation:** Motion (Framer Motion v12+) strictly on composite GPU properties with `prefers-reduced-motion` compliance
- **Form Handling:** React Hook Form paired with `@hookform/resolvers/zod` and Zod v4 schemas
- **Bot Defense:** Cloudflare Turnstile (`@marsidev/react-turnstile` with server-side API verification)
- **Email Delivery:** Next.js Server Action (`app/actions/contact.ts`) using Nodemailer over SMTP
- **PWA:** Web App Manifest with shortcuts and maskable icons, theme-aware Viewport, and a lightweight Service Worker (`public/sw.js`)
- **State Management:** Zustand 5 with local persistence for light and dark theme switching

---

## Environment Variables

Copy the example file to configure local development:

```bash
cp .env.example .env.local
```

### Required Variables

| Variable | Description | Default / Test Value |
|:---|:---|:---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public site key | `1x00000000000000000000AA` (test key, always passes) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret key | `1x0000000000000000000000000000000AA` (test key, always passes) |
| `SMTP_HOST` | SMTP server host | e.g. `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `465` (SSL) or `587` (TLS) |
| `SMTP_SECURE` | Use SSL | `true` for 465, `false` for 587 |
| `SMTP_USER` | SMTP username / sender account | e.g. `your-email@gmail.com` |
| `SMTP_PASS` | SMTP password or app password | Generated app password |
| `SMTP_FROM` | Sender display name and address | `"Portfolio Contact <your-email@gmail.com>"` |
| `CONTACT_RECEIVER_EMAIL` | Target inbox for contact submissions | `hicap.darenzjasper@gmail.com` |

---

## Deployment & CI/CD Setup

The site deploys to Netlify via GitHub Actions (`.github/workflows/deploy.yml`):

- **Pull Requests:** Generates an automated Netlify deploy preview URL.
- **Push to `master`:** Runs linting, TypeScript type-checking, and publishes the production deployment.

### Setting Up Production Secrets

1. **Netlify Dashboard (Serverless Function Runtime)**:
   - Navigate to **Site configuration** → **Environment variables**.
   - Add your live `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, and `SMTP_*` values.
2. **GitHub Repository Settings (Build-Time Client Inlining)**:
   - In your GitHub repository, open **Settings** → **Secrets and variables** → **Actions**.
   - Add `NEXT_PUBLIC_TURNSTILE_SITE_KEY` as a repository secret (falls back to Cloudflare's testing key if omitted).
   - Ensure `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` are configured.

---

## Local Development

Run all commands via Git Bash login shell:

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Run linting
bun run lint

# Run type-checking
bun run typecheck

# Build for production
bun run build
```

---

## License

This project is licensed under the [MIT License with Personal Assets & Identity Reservation](LICENSE).
Code and components are open source; biographical content, credentials, personal likeness, and project screenshots are reserved.
