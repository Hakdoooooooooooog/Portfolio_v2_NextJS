import { notFound } from "next/navigation";
import Projects from "@/portfolio/components/projects";
import SkillsAndCertificatesSection from "@/portfolio/components/skills-certificates";
import Experiences from "@/portfolio/components/Experiences";

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
        return null;
    }
  };

  return <div className="relative w-full m-auto">{renderSection(slug)}</div>;
}
