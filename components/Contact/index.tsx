import {
  sectionNumbers,
  CONTACT_EMAIL,
  socialLinks,
} from "@/portfolio/utils/constants";
import { ArrowUpRightIcon } from "@/portfolio/components/icons";
import ContactForm from "./components/contact-form";

export default function ContactSection() {
  return (
    <section id="contact" className="container-page">
      <p className="text-eyebrow text-muted">
        {sectionNumbers.contact} / Contact
      </p>

      <h2 className="text-display-lg text-foreground mt-4">Let&apos;s connect</h2>

      <div className="border-t border-border mt-8" aria-hidden />

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        {/* Left column: Direct reachability & context */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <p className="text-body text-muted leading-relaxed">
            Interested in discussing an engineering role, technical consultation, or
            a walkthrough of TicketSupport? Fill out the form or reach out directly
            through email or LinkedIn.
          </p>

          <div className="rounded-xl border border-border bg-surface p-6 flex flex-col gap-4">
            <div>
              <p className="text-eyebrow text-muted">Direct Email</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-body font-mono font-medium text-foreground hover:text-accent transition-colors break-all mt-1 block"
              >
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-eyebrow text-muted">Location & Response</p>
              <p className="text-small text-muted mt-1">
                Cavite, Philippines (UTC+8)
              </p>
              <p className="text-small text-muted mt-0.5">
                Typical response time: within 24 hours
              </p>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-eyebrow text-muted">Social Profiles</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-small font-mono text-muted hover:text-foreground hover:border-accent transition-colors"
                  >
                    <span>{s.label}</span>
                    <ArrowUpRightIcon className="size-3 text-muted group-hover:text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Interactive form */}
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
