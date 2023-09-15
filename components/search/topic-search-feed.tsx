"use client";

import { BACKEND_URL } from "@/config/env";
import { GetAllTopicsApiResponse } from "@/types/api";
import { useInfiniteQuery } from "react-query";
import Button from "../ui/button";
import ArticleInListLoader from "../loaders/article-in-list-loader";
import TopicListView from "../topic-list-view";
import TopicInListLoader from "../loaders/topic-in-list-loader";

const TopicSearchFeed = ({ q }: { q: string }) => {
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
    <main className="relative mx-auto grid w-full max-w-[1300px] grid-cols-1 gap-8 overflow-hidden px-4 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
      {(!isError || !isLoading) &&
        data?.pages.map((d, index, d_list) => {
          return d?.items?.map((post, idx, list) => (
            <TopicListView key={post.id} topic={post} />
          ));
        })}

      {(isLoading || isFetchingNextPage) &&
        Array.from({
          length: 12,
        }).map((_, idx, list) => <TopicInListLoader key={idx} />)}

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

export default TopicSearchFeed;
