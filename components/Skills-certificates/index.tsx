import {
  CertificatesData,
  skillCategories,
  sectionNumbers,
} from "@/portfolio/utils/constants";
import SkillCategory from "./components/skill-category";
import CompactCertificateRow from "./components/compact-certificate-row";

const MAX_REVEAL_DELAY_MS = 400;
const CATEGORY_DELAY_MS = 80;
const CERT_DELAY_MS = 50;

export default function SkillsAndCertificatesSection() {
  const sortedCerts = [...CertificatesData].sort(
    (a, b) =>
      new Date(b.metadata?.date ?? 0).getTime() -
      new Date(a.metadata?.date ?? 0).getTime()
  );

  return (
    <section className="container-page">
      <p className="text-eyebrow text-muted">
        {sectionNumbers.skills} / Skills & Certificates
      </p>

      <h2 className="text-display-lg text-foreground mt-4">
        Toolkit & credentials
      </h2>

      <div className="border-t border-border mt-8" aria-hidden />

      <div className="mt-8">
        <p className="text-eyebrow text-muted">My stack</p>

        {skillCategories.map((category, i) => (
          <SkillCategory
            key={category.label}
            label={category.label}
            skills={category.skills}
            delayMs={i * CATEGORY_DELAY_MS}
            className="mt-8"
          />
        ))}
      </div>

      <div className="mt-16">
        <p className="text-eyebrow text-muted">Credentials</p>

        <ul className="mt-8 list-none p-0">
          {sortedCerts.map((cert, i) => {
            const verifyHref =
              cert.link.href && cert.link.href !== "#"
                ? cert.link.href
                : undefined;

            const delayMs = Math.min(i * CERT_DELAY_MS, MAX_REVEAL_DELAY_MS);

            return (
              <li key={cert.id}>
                <CompactCertificateRow
                  title={cert.metadata?.title ?? cert.alt}
                  issuer={cert.metadata?.issuer ?? ""}
                  date={cert.metadata?.date ?? ""}
                  alt={cert.alt}
                  imageSrc={cert.src}
                  embed={cert.embed}
                  verifyHref={verifyHref}
                  delayMs={delayMs}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
