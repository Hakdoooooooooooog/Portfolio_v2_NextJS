import { notFound } from "next/navigation";
import Experiences from "@/portfolio/components/Experiences";
import Projects from "@/portfolio/components/Projects";
import SkillsAndCertificatesSection from "@/portfolio/components/Skills-certificates";

export async function generateStaticParams() {
  return [
    { slug: "projects" },
    { slug: "skills-and-certificates" },
    { slug: "experiences" },
  ];
}

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
