import {
  CertificatesData,
  aboutData,
  skillCategories,
} from "@/portfolio/utils/constants";
import SkillCategory from "./components/skill-category";
import CompactCertificateRow from "./components/compact-certificate-row";

const MAX_REVEAL_DELAY_MS = 350;
const CERT_DELAY_MS = 45;

export function AboutAndStackColumn({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section id="skills" className={className}>
      <div>
        <p className="text-eyebrow text-muted">About &amp; Stack</p>

        <h2 className="text-display-lg text-foreground mt-3">
          How I build &amp; what I&apos;m exploring
        </h2>

        <p className="text-body text-muted mt-3">
          Bridging hardware and infrastructure fundamentals with maintainable
          TypeScript and Python systems.
        </p>
      </div>

      <div className="border-t border-border mt-6" aria-hidden />

      <div className="mt-6 flex flex-col gap-4">
        {aboutData.narrative.map((paragraph, idx) => (
          <p key={idx} className="text-body text-muted leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-6 rounded-[6px] border border-border bg-surface p-5">
        <p className="text-eyebrow text-muted">Currently</p>

        <dl className="mt-3 divide-y divide-border">
          {aboutData.currently.map((item) => (
            <div key={item.label} className="py-2.5 first:pt-0 last:pb-0">
              <dt className="text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                {item.label}
              </dt>
              <dd className="text-small text-foreground mt-0.5">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-eyebrow text-muted">Technical Stack</p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <SkillCategory
              key={category.label}
              label={category.label}
              skills={category.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CredentialsBand() {
  const sortedCerts = [...CertificatesData].sort(
    (a, b) =>
      new Date(b.metadata?.date ?? 0).getTime() -
      new Date(a.metadata?.date ?? 0).getTime(),
  );

  return (
    <section className="container-page py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 border-b border-border">
        <div>
          <p className="text-eyebrow text-muted">Verification</p>
          <h2 className="text-heading text-foreground mt-2">
            Skills &amp; credentials
          </h2>
        </div>
        <p className="text-xs font-mono text-muted">
          {sortedCerts.length} verified records · sorted newest first
        </p>
      </div>

      <ul className="mt-4 list-none p-0 grid grid-cols-1 md:grid-cols-2 gap-x-10">
        {sortedCerts.map((cert, i) => {
          const verifyHref =
            cert.link.href && cert.link.href !== "#"
              ? cert.link.href
              : undefined;

          const delayMs = Math.min(i * CERT_DELAY_MS, MAX_REVEAL_DELAY_MS);

          const lastRowStart =
            sortedCerts.length % 2 === 0
              ? sortedCerts.length - 2
              : sortedCerts.length - 1;
          const mobileBorder =
            i < sortedCerts.length - 1 ? "border-b border-border" : "";
          const desktopBorder =
            i < lastRowStart
              ? "md:border-b md:border-border"
              : "md:border-b-0";

          return (
            <li key={cert.id} className={`${mobileBorder} ${desktopBorder}`}>
              <CompactCertificateRow
                title={cert.metadata?.title ?? cert.alt}
                issuer={cert.metadata?.issuer ?? ""}
                date={cert.metadata?.date ?? ""}
                alt={cert.alt}
                imageSrc={cert.src}
                verifyHref={verifyHref}
                delayMs={delayMs}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default AboutAndStackColumn;
