const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full border-t border-border py-8 text-center">
      <p className="text-small text-muted">
        © {currentYear} Hicap&apos;s Portfolio. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
