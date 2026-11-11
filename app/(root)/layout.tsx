export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-[calc(100vh-86px)] flex-col bg-grid-pattern overflow-x-clip pt-24 sm:pt-28 pb-8 lg:pb-20">
      {children}
    </main>
  );
}
