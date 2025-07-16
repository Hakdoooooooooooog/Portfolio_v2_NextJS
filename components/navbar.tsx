"use client";

import { NavigationMenu } from "@base-ui-components/react";
import { Button } from "./button";
import ThemeSwitch from "./switch";
import { useState, useEffect, useRef } from "react";
import { navLinks } from "../utils/constants";
import { TNavigationLink } from "../utils/types";

const Navbar = () => {
  return (
    <header>
      <NavigationMenu.Root
        className={
          "fixed z-999 w-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md shadow-lg"
        }
      >
        <NavigationMenu.List className="flex items-center justify-between p-4">
          <NavigationMenu.Item>
            <NavigationMenu.Link href="/" className="text-lg font-bold">
              My Portfolio
            </NavigationMenu.Link>
          </NavigationMenu.Item>

          <NavigationMenu.List className="hidden sm:flex items-center space-x-4">
            <NavItems items={navLinks} />
            <NavigationMenu.Item>
              <Button
                variant="ghost"
                size="md"
                className="text-md font-bold no-underline cursor-pointer"
              >
                <NavigationMenu.Link
                  href="https://drive.google.com/drive/folders/1z5k0cXU6HfPy3AV9yGlnmxecilbXYYRm"
                  target="_blank"
                  className="size-full block"
                >
                  My Resume
                </NavigationMenu.Link>
              </Button>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <NavigationMenu.Item className="hidden sm:block">
            <ThemeSwitch />
          </NavigationMenu.Item>

          <NavigationMenu.Item className="relative sm:hidden">
            <Drawers />
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
};

const NavItems = ({ items }: { items: TNavigationLink[] }) => {
  return items.map((item) => (
    <NavigationMenu.Item key={item.label} className="group">
      <NavigationMenu.Link
        href={item.href}
        className="text-md font-semibold text-gray-700 dark:text-gray-300 no-underline transition-all duration-200 hover:text-blue-500 hover:dark:text-blue-400 relative"
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  ));
};
const Drawers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Focus the first focusable element in the drawer
      setTimeout(() => {
        const firstFocusable = drawerRef.current?.querySelector(
          'a, button, [tabindex="0"]'
        ) as HTMLElement;
        firstFocusable?.focus();
      }, 0);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <NavigationMenu.Trigger
        onClick={toggleDrawer}
        className="text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      >
        <span className="sr-only">Open menu</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </NavigationMenu.Trigger>

      {isOpen && (
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`absolute py-8 min-w-[200px] -top-4 -right-4 bg-white dark:bg-gray-800 transition-opacity duration-300 ease-in-out shadow-lg border border-gray-200 dark:border-gray-700 z-[1000] rounded-lg ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="size-full p-4">
            <button
              type="button"
              onClick={toggleDrawer}
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-md p-1"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <nav
              className="flex flex-col gap-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <NavItems items={navLinks} />
              <NavigationMenu.Item>
                <Button
                  variant="ghost"
                  size="md"
                  className="text-md font-bold no-underline cursor-pointer"
                >
                  <NavigationMenu.Link
                    href="https://drive.google.com/drive/folders/1z5k0cXU6HfPy3AV9yGlnmxecilbXYYRm"
                    target="_blank"
                    className="size-full block"
                  >
                    My Resume
                  </NavigationMenu.Link>
                </Button>
              </NavigationMenu.Item>
              <div className="mt-2">
                <ThemeSwitch />
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
