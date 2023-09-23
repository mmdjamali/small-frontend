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
import Comment from "./comment";
import { useState } from "react";
import { CommentType } from "@/types/comment";
import { useUser } from "@/hooks/use-user";

const ArticleComments = ({ id }: { id: string | number }) => {
  const [user, loading] = useUser();

  const [added, setAdded] = useState<CommentType[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);

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

  const handleRemove = (id: string | number) => {
    setRemoved((prev) => [...prev, id.toString()]);
  };

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
          className="z-50 flex h-screen  w-full flex-col overflow-y-scroll border-x border-border bg-background px-4 sm:w-[min(100%_,_450px)]"
        >
          <div className="flex items-center justify-between py-4">
            <h3 className="text-[18px] font-medium">Comments</h3>

            <DrawerClose asChild>
              <Button className="p-2" color="foreground" variant="text">
                <Icon name="Close" className="text-[21px]" />
              </Button>
            </DrawerClose>
          </div>

          <CommentInput
            id={id}
            onInsert={(comment) => setAdded((prev) => [...prev, comment])}
          />

          <div className="mt-8 flex flex-col items-start">
            <div className="relative flex w-full flex-col">
              {added.map((comment) => {
                if (!comment) return <></>;

                if (removed.includes(comment.id.toString())) return <></>;

                return (
                  <Comment
                    key={comment.id}
                    onRemove={handleRemove}
                    comment={{
                      ...comment,
                      author: {
                        firstName: user?.firstName ?? "",
                        id: user?.id ?? 0,
                        lastName: user?.lastName ?? "",
                      },
                    }}
                  />
                );
              })}

              {data?.pages?.map((item) => {
                if (!item) return <></>;
                return item?.items.map((comment) => {
                  if (added.some(({ id }) => comment.id === id)) return <></>;

                  if (removed.includes(comment.id.toString())) return <></>;

                  return (
                    <Comment
                      onRemove={handleRemove}
                      key={comment.id}
                      comment={comment}
                    />
                  );
                });
              })}

              {isLoading ? (
                <Icon
                  name="Spinner"
                  className="mx-auto my-8 animate-spin text-[21px] text-foreground"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default ArticleComments;
