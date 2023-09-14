import React, { PropsWithChildren } from "react";
import Link from "next/link";

import MainNav from "@/components/layout/main-nav";
import Button from "@/components/ui/button";

import { MainNavItem } from "@/types";
import MobileNav from "@/components/layout/mobile-nav";
import { siteConfig } from "@/config";
import ThemeChanger from "@/components/theme-changer";
import UserDropdownMenu from "@/components/user-profile-dropdown";

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative flex min-h-screen w-full flex-col text-foreground">
      <div className=" z-[50] w-full bg-background">
        <header className="mx-auto flex h-[77px] w-full max-w-[1300px] items-center justify-between gap-3 px-4 md:px-8">
          <MainNav items={siteConfig.items} />

          <div className="flex items-center justify-center gap-3">
            <ThemeChanger />
            <UserDropdownMenu />
          </div>
        </header>
      </div>

      <div className="relative block h-full w-full">{children}</div>
    </div>
  );
}

export default MainLayout;
