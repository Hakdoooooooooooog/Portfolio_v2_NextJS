import HomeSection from "@/portfolio/components/Home";
import Projects from "@/portfolio/components/Projects";
import Experiences from "@/portfolio/components/Experiences";
import SkillsAndCertificatesSection from "@/portfolio/components/Skills-certificates";
import ContactSection from "@/portfolio/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 md:gap-28">
      <HomeSection />
      <Projects />
      <Experiences />
      <SkillsAndCertificatesSection />
      <ContactSection />
    </div>
  );
}
