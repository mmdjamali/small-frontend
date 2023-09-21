import Icon from "@/components/icon";
import ProfileActions from "@/components/profile-actions";
import EmptySearchFetch from "@/components/search/empty-search-feed";
import Button from "@/components/ui/button";
import { BACKEND_URL } from "@/config/env";
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
      <div className="relative mx-auto flex h-full w-full max-w-[800px] flex-col items-start px-4 pt-6 md:px-8 md:pt-16">
        <div className="relative grid aspect-square h-24 place-items-center overflow-hidden rounded-full bg-foreground/10">
          {user?.avatarImagePath ? (
            <Image unoptimized fill alt="" src={user?.avatarImagePath ?? ""} />
          ) : (
            <Icon name="User" className="text-[50px] text-foreground/25" />
          )}
        </div>

        <h1 className="mt-6 text-2xl font-bold sm:text-4xl">
          {user?.firstName + " " + user?.lastName}
        </h1>
        <p className="mt- text-foreground/75">0 Followers</p>

        <ProfileActions id={user?.id.toString() ?? ""} />
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-[1300px] items-center justify-between px-8">
        <Button className="gap-2" variant="outlined" color="foreground">
          Filter <Icon name="ArrowDown" className="text-[18px]" />
        </Button>
      </div>
      <span className="mt-4 flex h-[1px] w-full bg-border" />
      <EmptySearchFetch />
    </main>
  );
};

export default Page;
