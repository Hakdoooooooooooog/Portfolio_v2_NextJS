import React from "react";

const Footer = () => {
  return (
    <footer className="w-full fixed z-999 bottom-0 text-center p-4 bg-gray-100 dark:bg-gray-800">
      <p className="text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} Hicap&apos;s Portfolio. All rights
        reserved.
      </p>
    </footer>
  );
};

export default Footer;
