import { aboutData, socialLinks } from "@/portfolio/utils/constants";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full border-t border-border py-8">
      <div className="container-page flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-muted">
        <p>
          © {currentYear} {aboutData.name}
        </p>

        <div className="flex flex-wrap items-center gap-5">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
