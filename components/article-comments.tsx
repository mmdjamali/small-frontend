"use client";

import Link from "next/link";
import Icon from "./icon";
import CommentInput from "./inputs/comment-input";
import Button from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "./ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import { useInfiniteQuery, useQuery } from "react-query";
import { BACKEND_URL } from "@/config/env";
import { GetAllCommentsApiResponse } from "@/types/api";

const ArticleComments = ({ id }: { id: string | number }) => {
  const {
    data,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["comments", id],
    queryFn: async ({ pageParam = 0 }) => {
      const res: GetAllCommentsApiResponse = await fetch(
        `${BACKEND_URL}/api/articles/${id}/comments?pageIndex=${pageParam}`,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res.json());

      if (!res.success) return null;
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return;

      if (typeof lastPage.pageIndex !== "number") return;

      if (!lastPage.hasNextPage) return;

      return lastPage.pageIndex + 1;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="p-2 text-[21px]" variant="text" color="foreground">
          <Icon name="Chat" />
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent
          side="right"
          className="z-50 flex h-screen w-[min(100%_,_380px)] flex-col border-x border-border bg-background px-5"
        >
          <div className="flex flex-row-reverse items-center justify-between py-2">
            <DrawerClose asChild>
              <Button className="p-2" color="foreground" variant="text">
                <Icon name="Close" className="text-[21px]" />
              </Button>
            </DrawerClose>
          </div>

          <CommentInput id={id} />

          <div className="mt-8 flex flex-col items-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="text" color="foreground">
                  Select <Icon name="ArrowDown" className="text-[18px]" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuPortal>
                <DropdownMenuContent align="start">
                  <Button
                    variant="text"
                    color="foreground"
                    className="justify-start px-2 py-1.5"
                  >
                    Hello
                  </Button>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>

            <span className="my-2 block h-[1px] w-full bg-border" />

            <div className="relative flex w-full flex-col">
              {isLoading ? (
                <Icon
                  name="Spinner"
                  className="mx-auto my-8 animate-spin text-[21px] text-foreground"
                />
              ) : (
                <></>
              )}
              {data?.pages?.map((item) => {
                if (!item) return <></>;
                return item?.items.map(({ author, content, createdAt, id }) => {
                  return (
                    <div
                      key={id}
                      className="flex w-full flex-col gap-2 overflow-hidden border-b border-foreground/10 py-4"
                    >
                      <div className="flex items-center gap-2">
                        <UserAvatar size="md" src="" />

                        <div className="flex flex-col">
                          <Link className="hover:underline" href={""}>
                            {author.firstName + " " + author.lastName}
                          </Link>
                          <p className="text-foreground/75">1 day ago</p>
                        </div>

                        <Button
                          className="ml-auto p-2 text-[21px]"
                          color="foreground"
                          variant="text"
                        >
                          <Icon name="MoreHorizontal" />
                        </Button>
                      </div>

                      <p className="break-words">{content}</p>

                      <div className="flex items-center justify-between">
                        <Button
                          className="p-2 text-[21px]"
                          color="foreground"
                          variant="text"
                        >
                          <Icon name="ThumbUpLine" />
                        </Button>
                        <Button className="" color="foreground" variant="text">
                          Reply
                        </Button>
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default ArticleComments;
