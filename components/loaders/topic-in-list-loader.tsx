import { cn } from "@/lib/utils";

const TopicInListLoader = () => {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2 rounded border border-foreground/10 p-4",
      )}
    >
      <div className="flex w-full items-center justify-between gap-3 overflow-hidden">
        <div className="flex aspect-square h-10 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-foreground/10" />

        <div className="mr-auto grid w-full overflow-hidden">
          <span className="h-4 w-32 max-w-[50%] animate-pulse rounded-sm bg-foreground/10" />
          {/* <span /> */}
        </div>

        <span className="flex h-[37px] w-20 flex-shrink-0 animate-pulse rounded bg-foreground/10" />
      </div>
    </div>
  );
};

export default TopicInListLoader;
