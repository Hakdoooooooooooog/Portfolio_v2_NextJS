import Image from "next/image";

const MAX_VISIBLE_TAGS = 4;

export type CompactProjectRowProps = {
  index: number;
  title: string;
  tags: readonly string[];
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  liveUrl?: string;
  sourceUrl?: string;
  serverSourceUrl?: string;
};

export default function CompactProjectRow({
  index,
  title,
  tags,
  description,
  imageSrc,
  imageAlt,
  liveUrl,
  sourceUrl,
  serverSourceUrl,
}: CompactProjectRowProps) {
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const overflow = tags.length - visibleTags.length;
  const tagText =
    overflow > 0
      ? `${visibleTags.join(" · ")} · +${overflow}`
      : visibleTags.join(" · ");

  const paddedIndex = String(index).padStart(2, "0");
  const kind = tags.includes("API") ? "API" : "WEB";
  const hasBothSources = Boolean(sourceUrl && serverSourceUrl);
  const sourceLabel = hasBothSources ? "View web source" : "View source";

  return (
    <article className="flex gap-4 py-4 border-b border-border last:border-b-0">
      <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden border border-border">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            fill
            sizes="96px"
            className="object-cover"
          />
        ) : (
          <div className="grid place-items-center size-full bg-surface text-surface-foreground">
            <div className="text-center">
              <p className="text-eyebrow">{paddedIndex}</p>
              <p className="text-small font-mono mt-1">{kind}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-heading-row text-foreground">{title}</h3>

        <p className="text-small font-mono text-muted mt-2 truncate">
          {tagText}
        </p>

        <p className="text-small text-muted mt-2">{description}</p>

        <p className="text-small font-mono text-muted mt-4 flex flex-wrap gap-x-4 gap-y-1">
          {liveUrl ? (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent"
            >
              Visit live <span aria-hidden>↗</span>
            </a>
          ) : null}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent"
            >
              {sourceLabel} <span aria-hidden>↗</span>
            </a>
          ) : null}
          {serverSourceUrl ? (
            <a
              href={serverSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-foreground hover:underline underline-offset-4 decoration-accent"
            >
              View API source <span aria-hidden>↗</span>
            </a>
          ) : null}
        </p>
      </div>
    </article>
  );
}
