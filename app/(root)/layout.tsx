export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-[calc(100dvh-56px)] flex-col bg-grid-pattern">
      {children}
    </main>
  );
}
