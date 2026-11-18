export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-[calc(100vh-80px)] flex-col bg-grid-pattern overflow-x-clip pt-16 sm:pt-20">
      {children}
    </main>
  );
}
