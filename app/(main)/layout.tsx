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
      <div className="sticky top-0 z-[50] w-full border-b border-border bg-background">
        <header className="mx-auto flex h-[57px] w-full max-w-[1300px] items-center justify-between gap-3 px-4 md:px-8">
          <MobileNav items={siteConfig.items} />
          <MainNav items={siteConfig.items} />

          <div className="flex items-center justify-center gap-3">
            <ThemeChanger />
            <UserDropdownMenu />
          </div>
        </header>
      </div>

      <div className="relative block h-full w-full">
        <main className="mx-auto grid min-h-[calc(100vh_-_58px)] max-w-[1300px] grid-cols-1 px-4 md:grid-cols-[1fr_352px] md:gap-8 md:px-8 lg:gap-12">
          <div className="flex h-full w-full flex-col pt-2">{children}</div>

          <div className="hidden h-full w-full border-l border-border pl-8 md:flex"></div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
