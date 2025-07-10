import { notFound } from "next/navigation";
import Projects from "@/portfolio/pages/Projects";
import SkillsAndCertificatesSection from "@/portfolio/pages/Skills-and-certificates";

// Define valid slugs for type safety
const VALID_SLUGS = ["projects", "skills-and-certificates"] as const;
type ValidSlug = (typeof VALID_SLUGS)[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return VALID_SLUGS.includes(slug as ValidSlug);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Validate slug early and return 404 for invalid routes
  if (!isValidSlug(slug)) {
    notFound();
  }

  const renderSection = (slug: ValidSlug) => {
    switch (slug) {
      case "projects":
        return <Projects />;
      case "skills-and-certificates":
        return <SkillsAndCertificatesSection />;
    }
  };

  return <div className="relative w-full m-auto">{renderSection(slug)}</div>;
}
