import HomeSection from "@/portfolio/components/Home";
import Projects from "@/portfolio/components/Projects";
import Experiences from "@/portfolio/components/Experiences";
import {
  AboutAndStackColumn,
  CredentialsBand,
} from "@/portfolio/components/Skills-certificates";
import ContactSection from "@/portfolio/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col divide-y divide-border">
      <HomeSection />
      <Projects />
      <div className="container-page py-16 md:py-24 grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        <Experiences className="xl:col-span-6 min-w-0" />
        <AboutAndStackColumn className="xl:col-span-6 min-w-0 xl:border-l xl:border-border xl:pl-12" />
      </div>
      <CredentialsBand />
      <ContactSection />
    </div>
  );
}
