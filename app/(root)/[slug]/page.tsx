import { notFound } from "next/navigation";
import Experiences from "@/portfolio/pages/Experiences";
import Projects from "@/portfolio/pages/Projects";
import SkillsAndCertificatesSection from "@/portfolio/pages/Skills-certificates";

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
