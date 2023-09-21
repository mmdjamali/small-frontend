"use client";

import Icon from "@/components/icon";
import ProfileActions from "@/components/profile/profile-actions";
import { useUser } from "@/hooks/use-user";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  const [user, loading] = useUser();
  const router = useRouter();
  const pathname = usePathname();

  if (loading)
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
      <div className="relative mx-auto flex h-full w-full max-w-[800px] flex-col items-start px-4 pt-6 sm:px-8 md:pt-16">
        <div className="relative grid aspect-square h-24 place-items-center overflow-hidden rounded-full bg-foreground/10">
          {user?.avatarImagePath ? (
            <Image unoptimized fill alt="" src={user?.avatarImagePath ?? ""} />
          ) : (
            <Icon name="User" className="text-[50px] text-foreground/25" />
          )}
        </div>

        <Link href={"/@" + user.userName} className="mt-6 ">
          <h1 className="text-2xl font-bold sm:text-4xl">
            {user.firstName + " " + user.lastName}
          </h1>
        </Link>
        <p className="mt- text-foreground/75">0 Followers</p>

        <ProfileActions id={user?.id?.toString() ?? ""} />
      </div>

      {children}
    </main>
  );
};

export default Layout;
