"use client";

import { NavigationMenu } from "@base-ui-components/react";
import { Button } from "./button";
import ThemeSwitch from "./switch";
import { useState } from "react";

const items = [
  { label: "Skills & certificates", href: "/skills-and-certificates" },
  { label: "Projects", href: "/projects" },
];

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
            <NavItems items={items} />
            <NavigationMenu.Item>
              <Button
                variant="ghost"
                size="md"
                className="text-md font-bold no-underline"
              >
                <NavigationMenu.Link href="/contact" className={"size-full "}>
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

const NavItems = ({ items }: { items: { label: string; href: string }[] }) => {
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

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

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
          className={`absolute py-8 min-w-[200px] -top-4 -right-4 bg-white dark:bg-gray-800 transition-opacity duration-300 ease-in-out ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="size-full p-4">
            <NavigationMenu.Trigger
              onClick={toggleDrawer}
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-
          300 hover:text-blue-500 hover:dark:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              <span className="sr-only">Close menu</span>
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
            </NavigationMenu.Trigger>

            <div className="flex flex-col gap-4">
              <NavItems items={items} />
              <NavigationMenu.Item>
                <Button
                  variant="ghost"
                  size="md"
                  className="text-md font-bold no-underline"
                >
                  <NavigationMenu.Link
                    href="/contact"
                    className={"size-full block"}
                  >
                    My Resume
                  </NavigationMenu.Link>
                </Button>
              </NavigationMenu.Item>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
