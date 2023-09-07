import Link from "next/link";
import React from "react";
import Icon from "@/components/icon";
import { siteConfig } from "@/config";
import { MainNavItem } from "@/types";
import Button from "../ui/button";
import SearchInputHeader from "./search-input-header";

interface MainNavProps {
  items: MainNavItem[];
}

function MainNav({ items }: MainNavProps) {
  return (
    <header className="flex w-full items-center">
      <Link className="mr-8 flex items-center justify-center gap-1" href="/">
        <Icon
          name="Logo"
          className="aspect-square h-[24px] text-[24px] text-primary"
        />
        <p className="text-[16px] font-semibold text-primary">
          {siteConfig?.name}
        </p>
      </Link>

      <SearchInputHeader />

      <Link className="ml-auto sm:hidden" href={"/search"}>
        <Button color="foreground" variant="text" className="flex p-2">
          <Icon name="Search" className="text-[21px]" />
        </Button>
      </Link>
    </header>
  );
}

export default MainNav;
