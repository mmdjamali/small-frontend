"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Button from "./ui/button";
import { useUser } from "@/hooks/use-user";
import Icon from "./icon";

function UserDropdownMenu() {
  const [data, loading] = useUser();

  const links: {
    type: "button";
    title: string;
    icon: keyof typeof Icons;
    url: string;
    className: string;
    disabled: boolean;
  }[] = [
    {
      type: "button",
      title: "Profile",
      icon: "User",
      url: "/me",
      className: "",
      disabled: false,
    },
    {
      type: "button",
      title: "Write",
      icon: "Pencil",
      url: "/new-story",
      className: "",
      disabled: false,
    },
    {
      type: "button",
      title: "Stories",
      icon: "Article",
      url: "/stories",
      className: "",
      disabled: false,
    },
  ];

  if (loading)
    return (
      <span className="w-9 flex-shrink-0 aspect-square rounded-full bg-foreground/25 animate-pulse animate-infinite" />
    );

  if (data)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <UserAvatar src={data ? "" : ""} />
        </DropdownMenuTrigger>

        <DropdownMenuContent align={"end"}>
          <div className="text-[14px] font-medium text-foreground px-2 py-1.5">
            <p className="">{data ? "Mohammad" : ""}</p>
            <p className="text-foreground/75">
              {data ? "mohammad@small.com" : ""}
            </p>
          </div>

          <span className="bg-border w-full h-[1px] my-1" />

          {links.map(({ icon, title, disabled, className, url }, idx) => (
            <Link
              href={disabled ? "#" : url}
              key={idx}
              className={cn(
                "select-none",
                disabled ? "cursor-not-allowed" : ""
              )}
            >
              <DropdownMenuItem disabled={disabled} className={cn(className)}>
                <Icon name={icon} className="text-[16px]" />
                {title}
              </DropdownMenuItem>
            </Link>
          ))}

          <span className="bg-border w-full h-[1px] my-1" />

          <DropdownMenuItem
            className="hover:text-error hover:bg-error/10 select-none"
            onClick={() => {}}
          >
            <Icon name="Logout" className="text-[16px]" />
            {"Logout"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <Link href={"/signin"}>
      <Button className="p-2" variant="text" color="foreground">
        <Icon name="Login" className="text-[21px]" />
      </Button>
    </Link>
  );
}

export default UserDropdownMenu;
