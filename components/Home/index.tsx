import Image from "next/image";
import { aboutData, sectionNumbers } from "@/portfolio/utils/constants";
import ContactBlock from "./components/contact-block";
import { ArrowDownIcon, ArrowRightIcon } from "@/portfolio/components/icons";

export default function HomeSection() {
  return (
    <section id="about" className="container-page">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-eyebrow text-muted">
          {sectionNumbers.about} / About
        </p>

        {/* Availability & Timezone badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface text-small font-mono text-muted w-fit">
          <span
            className="size-2 rounded-full bg-accent animate-pulse shrink-0"
            aria-hidden
          />
          <span>{aboutData.availability}</span>
          <span className="text-muted/50" aria-hidden>
            ·
          </span>
          <span>
            {aboutData.location} ({aboutData.timezone})
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 order-last md:order-first">
          {/* Reconstructed Headline */}
          <div className="flex flex-col">
            <p className="text-sm sm:text-base font-mono text-accent font-semibold tracking-wide">
              {aboutData.name}
            </p>

            <h1 className="text-display-xl hero-headline mt-2 text-foreground">
              Junior Full-Stack <span className="name-underline">Developer</span>
            </h1>
          </div>

          {aboutData.bio.map((paragraph, idx) => (
            <p key={idx} className="text-body-lg text-muted mt-6">
              {paragraph}
            </p>
          ))}

          {/* Quick CTA row */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-md px-5 py-2.5 text-small font-medium transition-colors hover:bg-accent/90 shadow-sm cursor-pointer"
            >
              <span>View selected work</span>
              <ArrowDownIcon className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-border text-foreground rounded-md px-5 py-2.5 text-small font-medium transition-colors hover:border-accent hover:text-accent cursor-pointer"
            >
              <span>Get in touch</span>
              <ArrowRightIcon className="size-4" />
            </a>
          </div>

          <p className="text-small font-mono text-muted mt-8 flex flex-wrap gap-x-2 gap-y-1">
            {aboutData.stack.map((s, i) => (
              <span key={s}>
                {s}
                {i < aboutData.stack.length - 1 ? (
                  <span className="ml-2 text-muted/60" aria-hidden>
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </p>
        </div>

        <div className="md:col-span-1 order-first md:order-last flex flex-col items-center w-full">
          <div className="relative w-[230px] sm:w-[250px] aspect-square">
            <div
              aria-hidden
              className="absolute inset-0 translate-x-1 sm:translate-x-2 translate-y-1 sm:translate-y-2 border border-border rounded-md"
            />
            <Image
              priority
              unoptimized
              src={aboutData.profileImage.src}
              alt={aboutData.profileImage.alt}
              fill
              sizes="(max-width: 640px) 230px, 250px"
              className="rounded-md object-cover object-center shadow-sm dark:shadow-none"
            />
          </div>

          {/* Social Profiles underneath profile picture */}
          <ContactBlock className="mt-5 w-[230px] sm:w-[250px]" />
        </div>
      </div>
    </section>
  );
}
