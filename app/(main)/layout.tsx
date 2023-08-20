import React, { PropsWithChildren } from "react";
import Link from "next/link";

import MainNav from "@/components/layout/main-nav";
import Button from "@/components/ui/button";

import { MainNavItem } from "@/types";
import MobileNav from "@/components/layout/mobile-nav";
import { siteConfig } from "@/config";

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col relative w-full min-h-screen text-foreground">
      <div className="w-full relative border-b border-border">
        <header className="flex items-center justify-between w-full gap-3 h-[57px] mx-auto px-4 md:px-8 max-w-[1300px]">
          <MobileNav items={siteConfig.items} />
          <MainNav items={siteConfig.items} />

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
