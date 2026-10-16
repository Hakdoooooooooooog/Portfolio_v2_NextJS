export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        role="status"
        aria-label="Loading"
        className="size-16 animate-spin rounded-full border-2 border-border border-t-accent motion-reduce:animate-none"
      />
    </div>
  );
}
