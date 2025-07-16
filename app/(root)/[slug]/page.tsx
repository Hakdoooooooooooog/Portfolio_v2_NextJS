import { notFound } from "next/navigation";
import Projects from "@/portfolio/pages/Projects";
import SkillsAndCertificatesSection from "@/portfolio/pages/Skills_Certificates";
import Experiences from "@/portfolio/pages/Experiences";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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
        return null; // This line is never reached, but TypeScript requires a return value
    }
  };

  return <div className="relative w-full m-auto">{renderSection(slug)}</div>;
}
