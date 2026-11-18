import {
  CONTACT_EMAIL,
  RESUME_URL,
  aboutData,
  socialLinks,
} from "@/portfolio/utils/constants";
import { ArrowUpRightIcon } from "@/portfolio/components/icons";
import CopyEmailButton from "./components/copy-email-button";
import ContactForm from "./components/contact-form";

export default function ContactSection() {
  return (
    <section id="contact" className="container-page py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-eyebrow text-muted">Contact</p>

        <h2 className="text-display-lg text-foreground mt-3">
          Let&apos;s build something solid
        </h2>

        <p className="text-body-lg text-muted mt-3">
          Open to full-stack, backend, and AI engineering roles, or a technical
          walkthrough of TicketSupport. Send a message below or reach out
          directly by email.
        </p>
      </div>

      <div className="border-t border-border mt-8" aria-hidden />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        <div className="lg:col-span-5 min-w-0 rounded-[6px] border border-border bg-surface p-4 sm:p-6 md:p-8 flex flex-col gap-6">
          <div>
            <p className="text-eyebrow text-muted">Direct Email</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-base sm:text-lg font-mono font-semibold text-foreground hover:text-accent transition-colors break-all mt-2 inline-block"
            >
              {CONTACT_EMAIL}
            </a>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <CopyEmailButton email={CONTACT_EMAIL} />
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3.5 py-2 text-xs font-mono font-medium text-foreground hover:border-accent hover:text-accent transition-colors"
              >
                <span>Open mail client</span>
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <p className="text-eyebrow text-muted">Links</p>
            <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2 text-small font-mono">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors underline-offset-4 hover:underline"
                >
                  <span>{s.label}</span>
                  <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-foreground hover:text-accent transition-colors underline-offset-4 hover:underline"
              >
                <span>Resume / CV</span>
                <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-5 grid grid-cols-2 gap-4 text-small">
            <div>
              <p className="text-eyebrow text-muted">Location</p>
              <p className="font-mono text-foreground mt-1.5">
                {aboutData.location} ({aboutData.timezone})
              </p>
            </div>
            <div>
              <p className="text-eyebrow text-muted">Response</p>
              <p className="font-mono text-foreground mt-1.5">
                Within 24 hours
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 min-w-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
