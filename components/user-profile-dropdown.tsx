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
import { usePathname } from "next/navigation";
import { IMAGE_BACKEND_URL } from "@/config/env";

function UserDropdownMenu() {
  const { user, isLoading, isRefetching } = useUser();

  const pathname = usePathname();

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

  if (isLoading || (!user && isRefetching))
    return (
      <span className="animate-infinite aspect-square w-9 flex-shrink-0 animate-pulse rounded-full bg-foreground/25" />
    );

  if (user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <UserAvatar
            src={
              user ? IMAGE_BACKEND_URL + "/" + user.avatarImagePath ?? "" : ""
            }
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={12}
          align={"end"}
          className="p-3 shadow-2xl shadow-foreground/50"
        >
          <div className="px-2 py-1.5 text-[14px] font-medium text-foreground">
            <p className="">
              {user ? `${user.firstName} ${user.lastName}` : "Unknown"}
            </p>
            <p className="text-foreground/75">{user ? user.email : "???"}</p>
          </div>

          <span className="my-1 h-[1px] w-full bg-border" />

          {links.map(({ icon, title, disabled, className, url }, idx) => (
            <Link
              href={disabled ? "#" : url}
              key={idx}
              className={cn(
                "select-none",
                disabled ? "cursor-not-allowed" : "",
              )}
            >
              <DropdownMenuItem disabled={disabled} className={cn(className)}>
                <Icon name={icon} className="text-[16px]" />
                {title}
              </DropdownMenuItem>
            </Link>
          ))}

          <span className="my-1 h-[1px] w-full bg-border" />

          <DropdownMenuItem
            className="select-none hover:bg-error/10 hover:text-error"
            onClick={() => {}}
          >
            <Icon name="Logout" className="text-[16px]" />
            {"Logout"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <Link href={`/signin?redirect=${pathname}`}>
      <Button className="border-none">Login</Button>
    </Link>
  );
}

export default UserDropdownMenu;
