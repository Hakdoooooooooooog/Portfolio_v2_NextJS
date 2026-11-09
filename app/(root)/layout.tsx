export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-[calc(100vh-86px)] flex-col bg-grid-pattern overflow-x-clip py-8 lg:py-20">
      {children}
    </main>
  );
}
