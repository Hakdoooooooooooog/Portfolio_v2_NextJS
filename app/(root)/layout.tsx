export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen flex-col gap-12 items-center justify-center bg-grid-pattern px-8">
      {children}
    </main>
  );
}
