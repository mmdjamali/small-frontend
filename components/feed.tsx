"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Button from "./ui/button";
import Icon from "./icon";
import ArticleInListLoader from "./loaders/article-in-list-loader";
import { useInfiniteQuery } from "react-query";
import { BACKEND_URL } from "@/config/env";
import { GetAllArticlesDataType } from "@/types/api";
import { cn } from "@/lib/utils";
import { OutputBlockData } from "@editorjs/editorjs";
import Image from "next/image";
import ArticleListView from "./article-list-view";
import Scrollable from "./scrollable-tabs";

type FeedProps = {
  active?: string;
};

const Feed = ({ active = "" }: FeedProps) => {
  const {
    data,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["articles"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${BACKEND_URL}/api/articles?pageIndex=${pageParam}`,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return (await res.json()).data as GetAllArticlesDataType;
    },
    getNextPageParam: (lastPage) => {
      if (typeof lastPage.pageIndex !== "number") return;

      if (!lastPage.hasNextPage) return;

      return lastPage.pageIndex + 1;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <Tabs defaultValue={active} className="relative w-full gap-4">
      <div className="sticky top-[58px] z-[49] bg-background pb-2">
        <TabsList className="relative grid">
          <Scrollable className="gap-2 overflow-x-hidden scroll-smooth">
            {["For you", "fallowing", "react", "fiber"].map((v) => (
              <Link
                href={
                  v === "For you"
                    ? "/"
                    : "/tag/" + encodeURIComponent(v.toLowerCase())
                }
                key={v}
                className="cursor-pointer whitespace-nowrap"
              >
                <TabsTrigger
                  ref={(node) => {
                    if (!node) return;

                    if (active === v)
                      node.scrollIntoView({
                        inline: "center",
                      });
                  }}
                  className="pointer-events-none"
                  value={v === "For you" ? "" : v}
                >
                  {v[0].toUpperCase() + v.substring(1)}
                </TabsTrigger>
              </Link>
            ))}
          </Scrollable>
        </TabsList>
      </div>

      <TabsContent
        className="grid w-full grid-cols-[repeat(auto-fill,minmax(250px_,_1fr))] flex-col items-start justify-start gap-6 overflow-x-hidden rounded-lg border border-foreground/10 p-4 sm:p-6"
        value=""
      >
        {(!isError || !isLoading) &&
          data?.pages.map((d, index, d_list) => {
            return d.items?.map((post, idx, list) => (
              <ArticleListView key={post.id} post={post} />
            ));
          })}

        {(isLoading || isFetchingNextPage) &&
          Array.from({
            length: 10,
          }).map((_, idx, list) => (
            <ArticleInListLoader
              key={idx}
              variant={idx % 2 === 0 ? "with-image" : "normal"}
            />
          ))}

        {hasNextPage && (
          <Button
            onClick={() => {
              fetchNextPage();
            }}
            variant="text"
            color="foreground"
            className="w-fit"
          >
            Show more
          </Button>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default Feed;
