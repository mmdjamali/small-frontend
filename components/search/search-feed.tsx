"use client";

import { useInfiniteQuery } from "react-query";
import Button from "../ui/button";
import { GetAllArticlesDataType } from "@/types/api";
import { BACKEND_URL } from "@/config/env";
import ArticleListView from "../article-list-view";
import ArticleInListLoader from "../loaders/article-in-list-loader";

const SearchFeed = ({ q }: { q: string }) => {
  const {
    data,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["article-search", q],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(
        `${BACKEND_URL}/api/articles/search?SearchKeywords=${q}&PageIndex=${pageParam}&pageSize=12`,
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
    <main className="relative mx-auto grid w-full max-w-[1300px] grid-cols-1 gap-8 overflow-hidden px-8 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {(!isError || !isLoading) &&
        data?.pages.map((d, index, d_list) => {
          return d.items?.map((post, idx, list) => (
            <ArticleListView key={post.id} post={post} />
          ));
        })}

      {(isLoading || isFetchingNextPage) &&
        Array.from({
          length: 12,
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

export default SearchFeed;
