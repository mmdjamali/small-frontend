"use client";

import { useGetUserArticles } from "@/hooks/use-get-user-articles";
import ArticleList from "../articles/articles-list";

const UserStories = ({ id }: { id: string }) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetUserArticles(id);

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

export default UserStories;
