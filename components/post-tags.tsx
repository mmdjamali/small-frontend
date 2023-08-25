import { useEffect, useState } from "react";
import Button from "./ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "./ui/popover";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Icon from "./icon";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { BACKEND_URL } from "@/config/env";
import { TopicType } from "@/types/topic";

const PostTags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [value, resgister, , setValue] = useDebouncedValue("", 100);

  const [parent] = useAutoAnimate();

  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<null | string[]>(null);

  useEffect(() => {
    if (!value) return setOpen(false);

    const func = async () => {
      const res: {
        data: {
          topics: TopicType[];
        };
      } = await fetch(
        BACKEND_URL +
          `/api/topics/search?searchKeywords=${encodeURIComponent(value)}`
      ).then((res) => res.json());

      const topics =
        res?.data?.topics
          ?.map(({ name }) => name)
          .filter((topic) => !tags.includes(topic))
          .slice(0, 2) ?? null;

      setSuggestions(topics);

      if (topics && topics?.length) setOpen(true);
    };
    func();
  }, [value, tags]);

  return (
    <PopoverContent
      align="end"
      className="p-4 w-full max-w-xs gap-6 select-none"
    >
      <p className="text-sm text-foreground/75">
        Add or change topics (up to 3) so readers know what your story is about:
      </p>

      <div
        className="flex flex-wrap items-start gap-2 w-full relative"
        ref={parent}
      >
        {tags.map((tag, idx) => (
          <div
            key={tag}
            className="flex gap-2 text-sm p-2 rounded border border-foreground/10 bg-transparent cursor-pointer"
          >
            {tag}
            <button
              onClick={() => {
                setTags((prev) => prev.filter((_, i) => i !== idx));
              }}
            >
              <Icon name="Close" className="text-[14px]" />
            </button>
          </div>
        ))}
        {tags.length < 3 ? (
          <div className="relative">
            <input
              placeholder="Add a topic..."
              {...resgister()}
              onKeyDown={(e) => {
                if (open) setOpen(false);

                if (e.key !== "Enter") return;

                e.preventDefault();
                setTags((prev) => [...prev, value]);
                setValue("");
              }}
              className="flex-shrink py-2 text-sm w-fit min-w-[50%] text-foreground bg-transparent outline-none"
            />

            {open && suggestions?.length && (
              <div className="flex flex-col z-[55] bg-background rounded text-sm absolute overflow-hidden border border-border top-full min-w-[120px]">
                {suggestions?.map((topic, idx) => {
                  return (
                    <button
                      className="px-2 py-1.5 bg-background hover:bg-foreground/10 text-start"
                      onClick={() => {
                        setTags((prev) => [...prev, topic]);
                        setValue("");
                      }}
                      key={idx}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <Button color="foreground" className="border-none">
          Save
        </Button>

        <PopoverClose asChild>
          <Button color="foreground" variant="text" className="border-none">
            Cancel
          </Button>
        </PopoverClose>
      </div>
    </PopoverContent>
  );
};

export default PostTags;
