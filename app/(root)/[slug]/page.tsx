import { notFound } from "next/navigation";
import Projects from "@/portfolio/components/Projects";
import SkillsAndCertificatesSection from "@/portfolio/components/Skills-certificates";
import Experiences from "@/portfolio/components/Experiences";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Create a Promise that resolves after 2 seconds to simulate loading
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, 1000);
  });

  const renderSection = (slug: string) => {
    switch (slug) {
      case "projects":
        return <Projects />;
      case "skills-and-certificates":
        return <SkillsAndCertificatesSection />;
      case "experiences":
        return <Experiences />;
      default:
        notFound();
        return null;
    }
  };

  return <div className="relative w-full m-auto">{renderSection(slug)}</div>;
}
