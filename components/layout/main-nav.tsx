import Link from "next/link";
import React from "react";
import Icon from "@/components/icon";
import { siteConfig } from "@/config";
import { MainNavItem } from "@/types";
import Button from "../ui/button";
import SearchInputHeader from "./search-input-header";
import MainLogo from "./main-logo";

interface MainNavProps {
  items: MainNavItem[];
}

function MainNav({ items }: MainNavProps) {
  return (
    <header className="flex w-full items-center">
      <MainLogo />

      <SearchInputHeader />

      <Link className="ml-auto sm:hidden" href={"/search"}>
        <Button color="primary" variant="text" className="flex p-2">
          <Icon name="Search" className="text-[21px]" />
        </Button>
      </Link>
    </header>
  );
}

export default MainNav;
