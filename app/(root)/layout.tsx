export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-dvh flex-col bg-grid-pattern pt-20">
      {children}
    </main>
  );
}
