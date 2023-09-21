"use client";

import { useGetUserArticles } from "@/hooks/use-get-user-articles";
import ArticleList from "../articles/articles-list";
import { useGetDrafts } from "@/hooks/use-get-drafts";

const Drafts = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetDrafts();

  return (
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
  );
};

export default Drafts;
