"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Scrollable from "../scrollable-tabs";

const ProfileTabs = () => {
  const pathname = usePathname();

  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <Scrollable>
        {profileTabs.map(({ name, url }) => {
          return (
            <Link
              href={url}
              className={cn(
                "rounded px-4 py-2 font-medium text-foreground/75",
                url === pathname
                  ? "bg-primary/10 text-primary"
                  : "hover:text-foreground",
              )}
              key={name}
            >
              {name}
            </Link>
          );
        })}
      </Scrollable>
    </div>
  );
};

export default ProfileTabs;

const profileTabs: { name: string; url: string }[] = [
  {
    name: "Stories",
    url: "/me",
  },
  {
    name: "Drafts",
    url: "/me/drafts",
  },
  {
    name: "Likes",
    url: "/me/likes",
  },
  {
    name: "History",
    url: "/me/history",
  },
];
