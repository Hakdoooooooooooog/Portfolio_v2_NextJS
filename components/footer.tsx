import React from "react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full text-center p-4 bg-gray-100 dark:bg-gray-800">
      <p className="text-gray-600 dark:text-gray-300">
        © {currentYear} Hicap&apos;s Portfolio. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
