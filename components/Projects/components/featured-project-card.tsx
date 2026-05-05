import Image from "next/image";

export type FeaturedProjectCardProps = {
  title: string;
  tags: readonly string[];
  description: string;
  imageSrc: string;
  imageAlt: string;
  liveUrl?: string;
  sourceUrl?: string;
  serverSourceUrl?: string;
};

export default function FeaturedProjectCard({
  title,
  tags,
  description,
  imageSrc,
  imageAlt,
  liveUrl,
  sourceUrl,
  serverSourceUrl,
}: FeaturedProjectCardProps) {
  const hasBothSources = Boolean(sourceUrl && serverSourceUrl);
  const sourceLabel = hasBothSources ? "View web source" : "View source";

  return (
    <article>
      <div className="relative w-full max-w-2xl mx-auto aspect-[16/10]">
        <div
          aria-hidden
          className="absolute inset-0 translate-x-2 translate-y-2 border border-border rounded-xl"
        />
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 672px"
          className="rounded-xl object-cover shadow-sm dark:shadow-none"
        />
      </div>

      <h3 className="text-heading text-foreground mt-8">{title}</h3>

      <p className="text-small font-mono text-muted mt-2 flex flex-wrap gap-x-2 gap-y-1">
        {tags.map((tag, i) => (
          <span key={tag}>
            {tag}
            {i < tags.length - 1 ? (
              <span className="ml-2 text-muted/60" aria-hidden>
                ·
              </span>
            ) : null}
          </span>
        ))}
      </p>

      <p className="text-body text-muted mt-4">{description}</p>

      <div className="flex flex-wrap gap-2 mt-8">
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:bg-accent/90"
          >
            <span>Visit live</span>
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        ) : null}
        {sourceUrl ? (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border text-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <span>{sourceLabel}</span>
            <span aria-hidden>↗</span>
          </a>
        ) : null}
        {serverSourceUrl ? (
          <a
            href={serverSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border text-foreground rounded-md px-4 py-2 text-small font-medium transition-colors hover:border-accent hover:text-accent"
          >
            <span>View API source</span>
            <span aria-hidden>↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
