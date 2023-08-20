import Link from "next/link";
import React from "react";
import Icon from "@/components/icon";
import { siteConfig } from "@/config";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MainNavItem } from "@/types";
import { title } from "process";

interface MainNavProps {
  items: MainNavItem[];
}

function MainNav({ items }: MainNavProps) {
  return (
    <header className="hidden lg:flex items-center justify-center">
      <Link className="flex items-center justify-center gap-1 mr-8" href="/">
        <Icon
          name="Logo"
          className="text-[24px] text-primary h-[24px] aspect-square"
        />
        <p className="text-[16px] font-semibold text-primary">
          {siteConfig?.name}
        </p>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items?.[0]?.items && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>{items[0].title}</NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul className="grid p-6 gap-3 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_,_1fr]">
                  <li className="row-span-3 w-full">
                    <a className="flex gap-3 h-full w-full rounded p-6 flex-col items-start justify-center bg-gradient-to-t from-primary to-primary/75 cursor-pointer">
                      <Icon name="Logo" className="text-[28px] text-white" />

                      <div className="text-white text-[16px] font-semibold">
                        {siteConfig?.name}
                      </div>

                      <p className="text-white">{siteConfig?.description}</p>
                    </a>
                  </li>

                  {items?.[0].items?.map(({ title, url, description }) => (
                    <NavigationMenuLink key={title} asChild className="p-3">
                      <Link href={url ?? "#"}>
                        <li key={title} className="flex flex-col gap-2 w-full">
                          <div className="text-sm leading-none font-semibold">
                            {title}
                          </div>

                          <p className="text-sm text-foreground/75 ">
                            {description}
                          </p>
                        </li>
                      </Link>
                    </NavigationMenuLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}

          {items
            .filter(({ title }) => title !== items?.[0]?.title)
            .map(({ items, title }) => (
              <NavigationMenuItem key={title}>
                <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid p-6 gap-3 w-[400px] md:w-[500px] lg:w-[600px] lg:grid-cols-2">
                    {items?.map(({ title, url, description }) => (
                      <NavigationMenuLink key={title} asChild className="p-3">
                        <Link href={url ?? "#"}>
                          <li key={title} className="flex flex-col gap-2">
                            <div className="text-sm leading-none font-semibold">
                              {title}
                            </div>

                            <p className="text-sm text-foreground/75 ">
                              {description}
                            </p>
                          </li>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

export default MainNav;
