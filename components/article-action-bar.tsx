"use client";

import Icon from "./icon";
import Button from "./ui/button";

import ArticleComments from "./article-comments";

const ArticleActionBar = ({ id }: { id: string | number }) => {
  return (
    <div className=" flex w-full items-center justify-between border-y border-border py-2">
      <div className="flex items-center gap-2">
        <Button className="p-2 text-[21px]" variant="text" color="foreground">
          <Icon name="ThumbUpLine" />
        </Button>

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
