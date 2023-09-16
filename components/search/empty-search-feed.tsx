"use client";

import { BACKEND_URL } from "@/config/env";
import { GetAllArticlesDataType } from "@/types/api";
import { useInfiniteQuery } from "react-query";
import Button from "../ui/button";
import ArticleInListLoader from "../loaders/article-in-list-loader";
import ArticleListView from "../article-list-view";

const EmptySearchFeed = () => {
  const {
    data,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["empty-feed"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${BACKEND_URL}/api/articles?pageIndex=${pageParam}&pageSize=12`,
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
    <main className="relative mx-auto grid w-full max-w-[1300px] grid-cols-1 gap-8 overflow-hidden px-4 py-8 sm:grid-cols-2 sm:px-8 md:grid-cols-3 lg:grid-cols-4">
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
    </main>
  );
};

export default EmptySearchFeed;
