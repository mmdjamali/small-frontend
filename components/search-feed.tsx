"use client";

import { useInfiniteQuery } from "react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import Button from "./ui/button";
import { GetAllTopicsApiResponse } from "@/types/api";
import { BACKEND_URL } from "@/config/env";
import Link from "next/link";
import { cn } from "@/lib/utils";

const SearchFeed = ({ q, active }: { q: string; active: "" | "topics" }) => {
  const {
    data,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", "topics", q],
    queryFn: async ({ pageParam = 0 }) => {
      const res: GetAllTopicsApiResponse = await fetch(
        `${BACKEND_URL}/api/topics/search?searchKeywords=${q}&PageSize=10&pageIndex=${pageParam}`,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res?.json());

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
    <Tabs defaultValue={active} className="relative w-full">
      <TabsList className="sticky top-[58px] z-[49] bg-background">
        {["Stories", "Topics"].map((v) => (
          <Link
            href={
              v === "Stories"
                ? "/search?q=" + q
                : "/search/" + v.toLowerCase() + "?q=" + q
            }
            key={v}
            className="cursor-pointer"
          >
            <TabsTrigger
              className="pointer-events-none"
              value={v === "Stories" ? "" : v.toLowerCase()}
            >
              {v[0].toUpperCase() + v.substring(1)}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>

      <TabsContent
        className="flex w-full flex-wrap items-start justify-start gap-4 overflow-x-hidden py-6"
        value="topics"
      >
        {(!isError || !isLoading) &&
          data?.pages.map((d, index) => {
            return d?.items?.map(({ name, id }, idx, list) => (
              <span className="rounded bg-foreground/10 px-4 py-2" key={id}>
                {name}
              </span>
            ));
          })}

        {(isLoading || isFetchingNextPage) && (
          <div className="flex w-full flex-wrap gap-4">
            {[70, 160, 100, 130, 80].map((_, idx, list) => (
              <span
                key={idx}
                style={{
                  width: _ + "px",
                }}
                className={cn(
                  "flex h-[37px] animate-pulse rounded bg-foreground/10",
                )}
              ></span>
            ))}
          </div>
        )}
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

export default SearchFeed;
