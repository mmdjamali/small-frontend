"use client";

import Icon from "@/components/icon";
import ProfileActions from "@/components/profile/profile-actions";
import Scrollable from "@/components/scrollable-tabs";
import { IMAGE_BACKEND_URL } from "@/config/env";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  const { user, isLoading, isRefetching } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  if (isLoading || (!user && isRefetching))
    return (
      <div className="flex w-full items-center justify-center py-40">
        <Icon
          name="Spinner"
          className="animate-spin text-[21px] text-primary"
        />
      </div>
    );

  if (!user) return router.push(`/signin?redirect=${pathname}`);

  return (
    <main className="grid w-full ">
      <div className="relative mx-auto flex h-full w-full max-w-[900px] flex-col items-start px-4 pt-6 sm:px-8 md:pt-16">
        <div className="flex items-start gap-6">
          <div className="relative grid aspect-square h-12 flex-shrink-0 place-items-center overflow-hidden rounded-full bg-foreground/10 md:h-14">
            {user?.avatarImagePath ? (
              <Image
                unoptimized
                fill
                alt=""
                src={IMAGE_BACKEND_URL + "/" + user?.avatarImagePath ?? ""}
              />
            ) : (
              <Icon
                name="User"
                className="text-[30px] text-foreground/25 md:text-[36px]"
              />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-base font-medium md:text-xl">
              <Link href={"/@" + user.userName} className="">
                <h2 className="">{user.firstName + " " + user.lastName}</h2>
              </Link>
              <span className="text-foreground/25">/</span>
              <h1>
                {routes.filter(({ url }) => url === pathname)?.[0].name ?? ""}
              </h1>
            </div>
            <p className="text-foreground/75">
              Update your username and manage your account
            </p>
          </div>
        </div>

        <div className="mt-8 grid w-full gap-4 md:grid-cols-[200px_1fr]">
          <div className="hidden h-fit w-full flex-col gap-3 md:flex">
            {routes.map(({ name, url }) => {
              return (
                <Link
                  className={cn(
                    "w-fit text-sm transition-all",
                    pathname === url
                      ? "font-semibold text-foreground"
                      : "text-foreground/60 hover:text-foreground/75",
                  )}
                  key={url}
                  href={url}
                >
                  {name}
                </Link>
              );
            })}
          </div>

          <div className="relative flex items-center justify-center overflow-hidden md:hidden">
            <Scrollable>
              {routes.map(({ name, url }) => {
                return (
                  <Link
                    href={url}
                    className={cn(
                      "whitespace-nowrap rounded px-4 py-2 font-medium text-foreground/75",
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

          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;

const routes = [
  {
    name: "General",
    url: "/account",
  },
  {
    name: "Edit Profile",
    url: "/account/profile",
  },
  {
    name: "Password",
    url: "/account/password",
  },
] as const;
