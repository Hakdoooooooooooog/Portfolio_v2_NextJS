import { navLinks } from "@/portfolio/utils/constants";
import { NavigationMenu } from "@base-ui-components/react";
import { Button } from "../button";
// import ThemeSwitch from "../switch";
import Drawers from "./components/nav-drawer";
import NavItems from "./components/nav-item";

const Navbar = () => {
  return (
    <header>
      <NavigationMenu.Root
        className={
          "fixed z-999 w-full bg-white/20 dark:bg-gray-800/20 backdrop-blur-md shadow-lg"
        }
      >
        <NavigationMenu.List className="flex items-center justify-end md:justify-center p-4">
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

          {/* <NavigationMenu.Item className="hidden sm:block">
            <ThemeSwitch />
          </NavigationMenu.Item> */}

          <NavigationMenu.Item className="relative sm:hidden">
            <Drawers items={navLinks} />
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
};

export default Navbar;
