"use client";

import Link from "next/link";
import Icon from "@/components/icon";
import Button from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

import PostTags from "./post-tags";

const PostDetails = ({ disabled }: { disabled?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<"" | "tags">("");

  const components = {
    tags: <PostTags />,
    "": null,
  };

  useEffect(() => {
    if (open) return;

    setSelected("");
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="p-2" variant="text" color="foreground">
          <Icon className="text-[21px]" name="MoreVertical" />
        </Button>
      </PopoverTrigger>
      {components[selected] ? (
        components[selected]
      ) : (
        <PopoverContent align="end" className="gap-1">
          <Button
            disabled={disabled}
            onClick={() => {
              navigator.share({
                title: "Checkout my draft",
                text: "I have written a new post, can you share your thougths about it?",
                url: "https://sm.mmdjamli.ir",
              });
            }}
            color="foreground"
            variant="text"
            className="items-start justify-start px-2 py-1.5"
          >
            Share draft link
          </Button>

          <Button
            disabled={disabled}
            onClick={() => {
              setSelected("tags");
            }}
            color="foreground"
            variant="text"
            className="items-start justify-start px-2 py-1.5"
          >
            Change topics
          </Button>

          <Button
            disabled={disabled}
            color="foreground"
            variant="contained"
            className="items-start justify-start border-none px-2 py-1.5 sm:hidden"
          >
            Publish
          </Button>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default PostDetails;
