import Image from "next/image";
import { RESUME_URL, aboutData } from "@/portfolio/utils/constants";
import ContactBlock from "./components/contact-block";
import { ArrowDownIcon, ArrowUpRightIcon } from "@/portfolio/components/icons";

export default function HomeSection() {
  return (
    <section id="about" className="container-page pt-8 pb-16 sm:pt-10 md:pt-14 md:pb-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">
        <div className="md:col-span-8 order-last md:order-first min-w-0 max-w-4xl">
          <p className="text-sm font-mono font-medium text-accent">
            {aboutData.name}
          </p>

          <h1 className="text-display-xl mt-3 text-foreground">
            {aboutData.headline}
          </h1>

          <p className="text-body-lg text-muted mt-5 md:mt-6 leading-relaxed max-w-3xl">
            {aboutData.subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-7 md:mt-8">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:bg-accent/90 cursor-pointer"
            >
              <span>View Selected Work</span>
              <ArrowDownIcon className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>

            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-border bg-surface text-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:border-accent hover:text-accent cursor-pointer"
            >
              <span>Resume / CV</span>
              <ArrowUpRightIcon className="size-3.5" />
            </a>
          </div>

          <p className="text-xs font-mono text-muted mt-8 md:mt-10 pt-5 md:pt-6 border-t border-border flex flex-wrap items-center gap-x-2.5 gap-y-1">
            {aboutData.stack.map((item, i) => (
              <span key={item} className="inline-flex items-center">
                <span>{item}</span>
                {i < aboutData.stack.length - 1 ? (
                  <span className="ml-2.5 text-muted/50" aria-hidden>
                    ·
                  </span>
                ) : null}
              </span>
            ))}
          </p>
        </div>

        <div className="md:col-span-4 order-first md:order-last min-w-0 flex flex-col items-center md:items-end">
          <div className="relative w-40 sm:w-48 md:w-full max-w-[260px] aspect-[4/5] rounded-md overflow-hidden border border-border bg-surface">
            <Image
              priority
              unoptimized
              src={aboutData.profileImage.src}
              alt={aboutData.profileImage.alt}
              fill
              sizes="(max-width: 640px) 192px, 260px"
              className="object-cover object-center"
            />
          </div>
          <p className="text-xs font-mono text-muted mt-3 text-center md:text-right">
            {aboutData.location} · {aboutData.timezone}
          </p>
          <ContactBlock className="mt-2.5" />
        </div>
      </div>
    </section>
  );
}
