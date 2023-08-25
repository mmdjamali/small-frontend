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

const PostDetails = () => {
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
            onClick={() => {
              navigator.share({
                title: "Checkout my draft",
                text: "I have written a new post, can you share your thougths about it?",
                url: "https://sm.mmdjamli.ir",
              });
            }}
            color="foreground"
            variant="text"
            className="px-2 py-1.5 items-start justify-start"
          >
            Share draft link
          </Button>

          <Button
            onClick={() => {
              setSelected("tags");
            }}
            color="foreground"
            variant="text"
            className="px-2 py-1.5 items-start justify-start"
          >
            Change topics
          </Button>

          <Button
            color="foreground"
            variant="contained"
            className="px-2 py-1.5 items-start justify-start border-none"
          >
            Publish
          </Button>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default PostDetails;

const links = [
  {
    type: "button",
    title: "Change topics",
    className: "",
    disabled: false,
  },
  {
    type: "button",
    title: "Settings",
    className: "",
    disabled: false,
  },
];
