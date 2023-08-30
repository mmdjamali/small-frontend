"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Button from "./ui/button";
import Icon from "./icon";
import { cn } from "@/lib/utils";

type FeedProps = {
  active?: string;
};

const Feed = ({ active = "" }: FeedProps) => {
  return (
    <Tabs defaultValue={active}>
      <TabsList>
        <div className="flex items-center justify-center">
          <Button className="p-1" variant="text" color="foreground">
            <Icon name="Add" className="text-[18px]" />
          </Button>
        </div>

        {["For you", "fallowing"].map((v) => (
          <Link
            href={
              v === "For you"
                ? "/"
                : "/tag/" + encodeURIComponent(v.toLowerCase())
            }
            key={v}
            className="cursor-pointer"
          >
            <TabsTrigger
              className="pointer-events-none"
              value={v === "For you" ? "" : v}
            >
              {v[0].toUpperCase() + v.substring(1)}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>

      <TabsContent className="flex flex-col gap-6 py-6" value="">
        {Array.from({
          length: 10,
        }).map((_, idx, list) => (
          <div
            key={idx}
            className={cn(
              "flex w-full gap-4 pb-6",
              idx < list.length - 1 ? "" : "",
            )}
          >
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

            {idx % 2 === 0 && (
              <div className="flex w-28 flex-shrink-0 items-center justify-center">
                <div className="flex aspect-square w-full flex-shrink-0 animate-pulse rounded bg-foreground/10"></div>
              </div>
            )}
          </div>
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default Feed;
