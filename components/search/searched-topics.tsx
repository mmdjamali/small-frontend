import { BACKEND_URL } from "@/config/env";
import { GetAllTopicsApiResponse } from "@/types/api";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { TabsContent } from "../ui/tabs";
import { cn } from "@/lib/utils";
import Button from "../ui/button";

const SearchedTopics = ({ q, value }: { q: string; value: string }) => {
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
    <TabsContent
      className="flex w-full flex-wrap items-start justify-start gap-4 overflow-x-hidden py-6"
      value={value}
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
  );
};

export default SearchedTopics;
