import { cn } from "@/lib/utils";

interface Props {
  variant?: "with-image" | "normal";
}

const ArticleInListLoader = ({ variant = "normal" }: Props) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 border-b border-foreground/10 pb-4",
      )}
    >
      <div className="relative flex aspect-[3/2] w-full flex-shrink-0 items-center justify-center overflow-hidden rounded">
        <div className="relative flex h-full w-full">
          <div className="grid h-full w-full animate-pulse place-items-center bg-foreground/10"></div>
        </div>
      </div>

      <div className="flex max-h-[105px] w-full flex-col gap-2 overflow-hidden">
        <div className="flex w-full items-center gap-2">
          <span className="aspect-square h-6 animate-pulse rounded-full bg-foreground/10" />
          <span className="flex h-2 w-24 animate-pulse bg-foreground/10" />
        </div>

        <div className="flex h-[128px] flex-col gap-1 overflow-hidden">
          <div className="flex w-full shrink-0 flex-col gap-1 overflow-hidden">
            <span className="flex h-4 w-[80%] animate-pulse bg-foreground/10" />
          </div>

          <div className="mt-2 flex w-full flex-col gap-1 overflow-hidden">
            <span className="flex h-4 w-[50%] animate-pulse bg-foreground/10" />
          </div>
        </div>

        <div className="flex w-full items-center">
          <span className="ml-auto aspect-square h-[37px] animate-pulse rounded bg-foreground/10" />
        </div>
      </div>
    </div>
  );
  return (
    <div className={cn("flex w-full gap-4 pb-6")}>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center gap-2">
          <span className="aspect-square h-6 animate-pulse rounded-full bg-foreground/10" />
          <span className="flex h-2 w-24 animate-pulse bg-foreground/10" />
        </div>

        <div className="flex w-full flex-col gap-1">
          <span className="flex h-4 w-[80%] animate-pulse bg-foreground/10" />
        </div>

        <div className="flex w-full flex-col gap-1">
          <span className="flex h-4 w-[50%] animate-pulse bg-foreground/10" />
        </div>
      </div>

      {variant === "with-image" && (
        <div className="flex w-28 flex-shrink-0 items-center justify-center">
          <div className="flex aspect-square w-full flex-shrink-0 animate-pulse rounded bg-foreground/10"></div>
        </div>
      )}
    </div>
  );
};

export default ArticleInListLoader;
