"use client";

import { TNavigationLink } from "@/portfolio/utils/types";
import { NavigationMenu } from "@base-ui-components/react";
import { usePathname } from "next/navigation";

const NavItems = ({ items }: { items: TNavigationLink[] }) => {
  const pathname = usePathname();

  return items.map((item) => {
    const isActive = pathname === item.href;

    return (
      <NavigationMenu.Item key={item.label} className="group">
        <NavigationMenu.Link
          href={item.href}
          className={`text-small font-medium no-underline transition-colors duration-200 relative ${
            isActive ? "text-foreground" : "text-muted hover:text-foreground"
          }`}
        >
          {item.label}
          <span
            aria-hidden
            className={`absolute -bottom-1 left-0 w-full h-0.5 bg-accent transition-transform duration-200 origin-left ${
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );
  });
};

export default NavItems;
