import { cn, isJSON } from "@/lib/utils";
import Link from "next/link";
import Icon from "./icon";
import { OutputBlockData } from "@editorjs/editorjs";
import Image from "next/image";
import { ArticleType } from "@/types/article";
import Button from "./ui/button";
import { TopicType } from "@/types/topic";

type Props = {
  topic: TopicType;
};

const TopicListView = ({ topic: { name, id, active } }: Props) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 rounded border border-foreground/10 p-4",
      )}
    >
      <div className="flex w-full items-center justify-between gap-3 overflow-hidden">
        <div className="flex aspect-square h-10 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-foreground/10">
          <Icon name="Topic" className="text-[28px] text-foreground" />
          <Icon
            name="Hashtag"
            className="absolute text-[14px] text-background"
          />
        </div>

        <div className="mr-auto grid w-full overflow-hidden">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
            {name}
          </p>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-foreground/75">
            +2K articles
          </p>
        </div>

        <Button className="flex-shrink-0 border-none">Follow</Button>
      </div>
    </div>
  );
};

export default TopicListView;
