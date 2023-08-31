import { cn } from "@/lib/utils";
import Link from "next/link";
import Icon from "./icon";
import { ArticlesDataItemsType } from "@/types/api";
import { OutputBlockData } from "@editorjs/editorjs";
import Image from "next/image";

type Props = {
  post: ArticlesDataItemsType;
};

const isJSON = (s: string): boolean => {
  if (typeof s !== "string") return false;

  try {
    JSON.parse(s);
    return true;
  } catch (err) {
    return false;
  }
};

const ArticleListView = ({ post: { author, content, id, title } }: Props) => {
  const parsed_content = JSON?.parse(
    isJSON(content) ? content : "[]",
  ) as OutputBlockData[];

  const withImage = parsed_content?.[0]?.type === "image";

  return (
    <div
      className={cn(
        "grid w-full gap-4 border-b border-border pb-6",
        withImage ? "grid-cols-[1fr_112px]" : "grid-cols-1",
      )}
    >
      <div className="flex w-full flex-col gap-2 overflow-hidden">
        <Link href={""} className="flex w-fit items-center gap-2">
          <span className="flex aspect-square h-6 items-center justify-center rounded-full border border-border">
            <Icon name="User" className="text-[14px] text-border" />
          </span>

          <p className="text-sm text-foreground/75">
            {author.firstName + " " + author.lastName}
          </p>
        </Link>

        <Link href={`/p/${id}`} className="flex flex-col gap-2">
          <div className="flex w-full flex-col gap-1 overflow-hidden">
            <h4 className="text-lg font-semibold">{title || "Untitled"}</h4>
          </div>

          <div className="flex w-full flex-col gap-1 overflow-hidden">
            <p className="max-h-[50px] overflow-hidden text-ellipsis break-words text-lg leading-6 text-foreground/75">
              {parsed_content?.[0]?.data?.text ?? "nothing"}
            </p>
          </div>
        </Link>
      </div>

      {withImage && (
        <div className="relative flex w-full flex-shrink-0 items-center justify-center">
          <div className="relative flex aspect-square w-full">
            <Image
              className="object-cover"
              fill
              unoptimized
              src={parsed_content?.[0]?.data?.file?.url ?? ""}
              alt={title}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleListView;
