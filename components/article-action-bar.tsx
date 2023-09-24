"use client";

import Icon from "./icon";
import Button from "./ui/button";

import ArticleComments from "./article-comments";
import { useUser } from "@/hooks/use-user";
import { useLike } from "@/hooks/use-like";

const ArticleActionBar = ({ id }: { id: string | number }) => {
  const { user, isLoading, isRefetching } = useUser();
  const { like, liked, unlike } = useLike(id.toString());

  if (isLoading || liked.isLoading || (!user && isRefetching))
    return (
      <div className=" flex w-full items-center justify-between border-y border-border py-2">
        <div className="flex items-center gap-2">
          <span className="flex aspect-square h-[37px] animate-pulse rounded bg-foreground/10" />

          <span className="flex aspect-square h-[37px] animate-pulse rounded bg-foreground/10" />
        </div>

        <div className="flex items-center gap-2">
          <span className="flex aspect-square h-[37px] animate-pulse rounded bg-foreground/10" />
        </div>
      </div>
    );

  return (
    <div className=" flex w-full items-center justify-between border-y border-border py-2">
      <div className="flex items-center gap-2">
        {user?.id ? (
          !!liked?.data?.isLike ? (
            <Button
              onClick={() => {
                unlike.mutate();
              }}
              disabled={unlike.isLoading}
              className="p-2 text-[21px]"
              variant="text"
              color="foreground"
            >
              {unlike.isLoading ? (
                <Icon name="Spinner" className="animate-spin" />
              ) : (
                <Icon name="ThumbUpFill" className="text-primary" />
              )}
            </Button>
          ) : (
            <Button
              onClick={() => {
                return like.mutate();
              }}
              disabled={like.isLoading}
              className="p-2 text-[21px]"
              variant="text"
              color="foreground"
            >
              {like.isLoading ? (
                <Icon name="Spinner" className="animate-spin" />
              ) : (
                <Icon name="ThumbUpLine" />
              )}
            </Button>
          )
        ) : (
          <Button
            disabled={true}
            className="p-2 text-[21px]"
            variant="text"
            color="foreground"
          >
            <Icon name="ThumbUpLine" />
          </Button>
        )}

        <ArticleComments id={id} />
      </div>

      <div className="flex items-center gap-2">
        <Button className="p-2 text-[21px]" variant="text" color="foreground">
          <Icon name="MoreVertical" />
        </Button>
      </div>
    </div>
  );
};

export default ArticleActionBar;
