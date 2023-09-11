import { BACKEND_URL } from "@/config/env";
import { GetAllArticlesApiResponse } from "@/types/api";
import React from "react";
import { useInfiniteQuery } from "react-query";
import { TabsContent } from "../ui/tabs";
import Button from "../ui/button";
import ArticleListView from "../article-list-view";
import ArticleInListLoader from "../loaders/article-in-list-loader";

const SearchedArticles = ({ q, value }: { q: string; value: string }) => {
  const {
    data,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", "articles", q],
    queryFn: async ({ pageParam = 0 }) => {
      const res: GetAllArticlesApiResponse = await fetch(
        `${BACKEND_URL}/api/articles/search?SearchKeywords=${q}&PageIndex=${pageParam}`,
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
      className="flex w-full flex-col items-start justify-start gap-4 overflow-x-hidden py-6"
      value={value}
    >
      {(!isError || !isLoading) &&
        data?.pages.map((d, index) => {
          return d?.items?.map((post, idx, list) => (
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
  );
};

export default SearchedArticles;
