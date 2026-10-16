import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-grid-pattern flex min-h-[calc(100vh-86px)] flex-col items-center justify-center gap-4 p-8 text-center">
      <p className="text-eyebrow text-muted">404</p>
      <h1 className="text-display-lg text-foreground">Page not found</h1>
      <p className="text-body text-muted">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-small font-medium text-accent-foreground transition-colors hover:bg-accent/90"
      >
        Back to About
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
