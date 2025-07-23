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
          className={`text-md font-semibold no-underline transition-all duration-200 relative ${
            isActive
              ? "text-blue-500 dark:text-blue-400"
              : "text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:dark:text-blue-400"
          }`}
        >
          {item.label}
          <span
            className={`absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 dark:bg-blue-400 transition-transform duration-200 ${
              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    );
  });
};

export default NavItems;
