"use client";

import Icon from "@/components/icon";
import ProfileActions from "@/components/profile/profile-actions";
import ProfileTabs from "@/components/profile/profile-tabs";
import UserStories from "@/components/profile/user-stories";
import Button from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Page = () => {
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
    <>
      <div className="mx-auto mt-14 flex w-full max-w-[1300px] items-center justify-between px-4 sm:px-8">
        <ProfileTabs />
        <Button
          className="hidden gap-2 sm:flex"
          variant="outlined"
          color="foreground"
        >
          Filter <Icon name="ArrowDown" className="text-[18px]" />
        </Button>
      </div>

      <span className="mt-4 flex h-[1px] w-full bg-border" />

      <div className="mx-auto my-4 flex w-full max-w-[1300px] items-center justify-between px-4 sm:hidden sm:px-8">
        <Button className="gap-2" variant="outlined" color="foreground">
          Filter <Icon name="ArrowDown" className="text-[18px]" />
        </Button>
      </div>
      <div className="mx-auto w-full max-w-[1300px] px-4 pb-8 sm:px-8 sm:py-8">
        <UserStories id={user.id.toString()} />
      </div>
    </>
  );
};

export default Page;
