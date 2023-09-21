import { GetAllArticlesDataType } from "@/types/api";
import { InfiniteData } from "react-query";
import ArticleListView from "../article-list-view";
import ArticleInListLoader from "../loaders/article-in-list-loader";
import Button from "../ui/button";

type Props = {
  data: InfiniteData<GetAllArticlesDataType | null> | undefined;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isError: boolean;
  isLoading: boolean;
  fetchNextPage: () => void;
};

const ArticleList = ({
  data,
  hasNextPage,
  isError,
  isLoading,
  isFetchingNextPage,
  fetchNextPage,
}: Props) => {
  return (
    <div className="relative grid w-full grid-cols-1 gap-8 overflow-hidden sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {!isError &&
        !isLoading &&
        data?.pages.map((d, index, d_list) => {
          return d?.items?.map((post, idx, list) => (
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
    </div>
  );
};

export default ArticleList;
