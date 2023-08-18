import React, { PropsWithChildren } from "react";
import Link from "next/link";

import MainNav from "@/components/layout/main-nav";
import Button from "@/components/ui/button";

import { MainNavItem } from "@/types";
import MobileNav from "@/components/layout/mobile-nav";

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col relative w-full min-h-screen text-foreground">
      <div className="w-full relative border-b border-border">
        <header className="flex items-center justify-between w-full gap-3 h-[57px] mx-auto px-4 md:px-8 max-w-[1300px]">
          <MobileNav items={items} />
          <MainNav items={items} />

          <div>
            <Link href="/signin">
              <Button className="" color="primary">
                Login
              </Button>
            </Link>
          </div>
        </header>
      </div>

      {children}
    </div>
  );
}

export default MainLayout;

const items: MainNavItem[] = [
  {
    title: "About us",
    items: [
      {
        title: "test2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dignissimos repellat",
        url: "https://mmdjamali.ir",
      },
      {
        title: "test1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dignissimos repellat",
        url: "https://mmdjamali.ir",
      },
      {
        title: "test3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dignissimos repellat",
        url: "https://mmdjamali.ir",
      },
    ],
  },
  {
    title: "Test",
    items: [
      {
        title: "test1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dignissimos repellat",
        url: "https://mmdjamali.ir",
      },
      {
        title: "test2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dignissimos repellat",
        url: "https://mmdjamali.ir",
      },
      {
        title: "test3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dignissimos repellat",
        url: "https://mmdjamali.ir",
      },
      {
        title: "test4",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dignissimos repellat",
        url: "https://mmdjamali.ir",
      },
      {
        title: "test5",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dignissimos repellat",
        url: "https://mmdjamali.ir",
      },
      {
        title: "test6",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa dignissimos repellat",
        url: "https://mmdjamali.ir",
      },
    ],
  },
];
