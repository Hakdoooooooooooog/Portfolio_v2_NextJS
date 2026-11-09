export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center select-none"
    >
      <p className="text-eyebrow text-muted uppercase font-mono tracking-widest">
        Loading
      </p>
      <div className="w-36 h-0.5 bg-border rounded-full overflow-hidden">
        <div className="size-full bg-accent animate-pulse origin-left" />
      </div>
    </div>
  );
}
