"use client";

import { TNavigationLink } from "@/portfolio/utils/types";
import { NavigationMenu } from "@base-ui-components/react";
import { useState, useRef, useEffect } from "react";
import { Button } from "../../button";
import ThemeSwitch from "../../switch";
import NavItems from "./nav-item";

const Drawers = ({ items }: { items: TNavigationLink[] }) => {
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

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`absolute py-8 min-w-[200px] -top-4 -right-4 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 z-[1000] rounded-lg transform-gpu transition-all duration-300 ease-in-out origin-top-right ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
        style={{
          transformOrigin: "top right",
        }}
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
            <NavItems items={items} />
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
            <div className="self-center w-fit bg-gray-200/50 dark:bg-gray-400/50 p-2 rounded-lg">
              <ThemeSwitch />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Drawers;
