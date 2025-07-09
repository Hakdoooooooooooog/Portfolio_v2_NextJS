import { TransitionProvider } from "@/portfolio/utils/context/TransitionContext";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between bg-grid-pattern">
      <TransitionProvider>{children}</TransitionProvider>
    </main>
  );
}
