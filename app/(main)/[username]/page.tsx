import Icon from "@/components/icon";
import ProfileActions from "@/components/profile/profile-actions";
import UserProfileTabs from "@/components/profile/user-profile-tabs";
import UserStories from "@/components/profile/user-stories";
import EmptySearchFetch from "@/components/search/empty-search-feed";
import Button from "@/components/ui/button";
import { BACKEND_URL, IMAGE_BACKEND_URL } from "@/config/env";
import { stringifyNumber } from "@/lib/utils";
import { GetProfileApiResponse } from "@/types/api";
import { UserType } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    username?: string;
  };
};
const Page = async ({ params }: PageProps) => {
  let user: UserType | null = null;
  let err: string | null = null;

  const username = decodeURIComponent(params?.username ?? "");

  if (!username || !username.startsWith("@")) return notFound();

  try {
    const res: GetProfileApiResponse = await fetch(
      BACKEND_URL +
        `/api/users/get-by-username?username=${encodeURIComponent(
          username.substring(1),
        )}`,
    ).then((res) => res?.json());

    if (!res.success) {
      err = "something went wrong!";
      return;
    }

    user = res.data.user;
  } catch (err) {
    err = "something went wrong!";
  }

  return (
    <main className="grid w-full ">
      <div className="relative mx-auto flex h-full w-full max-w-[800px] flex-col items-start px-4 pt-6 sm:px-8 md:pt-16">
        <div className="relative grid aspect-square h-24 place-items-center overflow-hidden rounded-full bg-foreground/10">
          {user?.avatarImagePath ? (
            <Image
              unoptimized
              fill
              alt=""
              src={IMAGE_BACKEND_URL + "/" + user?.avatarImagePath ?? ""}
            />
          ) : (
            <Icon name="User" className="text-[50px] text-foreground/25" />
          )}
        </div>

        <h1 className="mt-6 text-2xl font-bold sm:text-4xl">
          {user?.firstName + " " + user?.lastName}
        </h1>
        <p className="mt- text-foreground/75">0 Followers</p>

        <ProfileActions id={stringifyNumber(user?.id)} />
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-[1300px] items-center justify-between px-4 sm:px-8">
        <UserProfileTabs />

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
        <UserStories id={stringifyNumber(user?.id)} />
      </div>
    </main>
  );
};

export default Page;
