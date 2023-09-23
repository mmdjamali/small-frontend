"use client";

import Icon from "./icon";
import Button from "./ui/button";

import ArticleComments from "./article-comments";
import { useUser } from "@/hooks/use-user";

const ArticleActionBar = ({ id }: { id: string | number }) => {
  const [user, user_loading] = useUser();

  if (user_loading)
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
          <Button className="p-2 text-[21px]" variant="text" color="foreground">
            <Icon name="ThumbUpLine" />
          </Button>
        ) : null}

        {user?.id ? <ArticleComments id={id} /> : null}
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
