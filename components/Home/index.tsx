import Image from "next/image";
import { sectionNumbers, stack } from "@/portfolio/utils/constants";
import ContactBlock from "./components/contact-block";

export default function HomeSection() {
  return (
    <section className="container-page">
      <p className="text-eyebrow text-muted">{sectionNumbers.about} / About</p>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 order-last md:order-first">
          <h1 className="text-display-xl hero-headline">
            Hello! My name is{" "}
            <span className="name-underline">Darenz Jasper A. Hicap</span>
          </h1>

          <p className="text-body-lg text-muted mt-8">
            Junior Full-Stack Developer at GP Synergia and Cum Laude BSIT
            graduate of Cavite State University. I engineer, automate, and
            deploy production-ready web applications — combining TypeScript,
            React, and Next.js on the frontend with Node.js and Spring Boot
            services, AWS infrastructure provisioned via Terraform, and
            containerized deployments through Docker and GitLab CI/CD.
          </p>

          <p className="text-small font-mono text-muted mt-4 flex flex-wrap gap-x-2 gap-y-1">
            {stack.map((s, i) => (
              <span key={s}>
                {s}
                {i < stack.length - 1 ? (
                  <span className="ml-2 text-muted/60" aria-hidden>
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </p>
        </div>

        <div className="md:col-span-1 order-first md:order-last flex flex-col items-center w-full">
          <div className="relative w-[250px] aspect-square">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-2 translate-y-2 border border-border rounded-md"
            />
            <Image
              priority
              loading="eager"
              src="/images/profile.jpg"
              alt="A picture of Darenz Jasper A. Hicap, dressed in a white barong, smiling at the camera with arms crossed."
              width={250}
              height={250}
              sizes="(max-width: 250px) 100vw, 250px"
              className="relative rounded-md w-full object-cover shadow-sm dark:shadow-none"
            />
          </div>

          <ContactBlock className="mt-8 w-[250px]" />
        </div>
      </div>
    </section>
  );
}
