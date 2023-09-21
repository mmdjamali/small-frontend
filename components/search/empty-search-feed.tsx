"use client";

import { BACKEND_URL } from "@/config/env";
import { GetAllArticlesDataType } from "@/types/api";
import { useInfiniteQuery } from "react-query";
import ArticleList from "../articles/articles-list";

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
    <div className="relative mx-auto w-full max-w-[1300px] overflow-hidden px-4 py-8 sm:px-8">
      <ArticleList
        data={data}
        fetchNextPage={() => {
          fetchNextPage();
        }}
        hasNextPage={!!hasNextPage}
        isError={isError}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />
    </div>
  );
};

export default EmptySearchFeed;
