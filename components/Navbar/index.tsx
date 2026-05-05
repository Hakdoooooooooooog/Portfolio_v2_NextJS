import { navLinks, RESUME_URL } from "@/portfolio/utils/constants";
import { NavigationMenu } from "@base-ui-components/react";
import { Button } from "../button";
import ThemeSwitch from "../switch";
import Drawers from "./components/nav-drawer";
import NavItems from "./components/nav-item";

const Navbar = () => {
  return (
    <header>
      <NavigationMenu.Root className="fixed z-999 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <NavigationMenu.List className="flex items-center justify-end md:justify-center p-4">
          <NavigationMenu.List className="hidden w-full sm:flex items-center justify-center gap-4">
            <NavItems items={navLinks} />
            <NavigationMenu.Item>
              <Button variant="outline" size="md">
                <NavigationMenu.Link
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
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
            <Drawers items={navLinks} />
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
};

export default Navbar;
