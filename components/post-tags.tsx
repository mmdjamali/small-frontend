import { useContext, useEffect, useState } from "react";
import Button from "./ui/button";
import { PopoverClose, PopoverContent } from "./ui/popover";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Icon from "./icon";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { BACKEND_URL } from "@/config/env";
import { TopicType } from "@/types/topic";
import { EditStoryContext } from "./edit-story";
import { useCustomFetch } from "@/hooks/use-custom-fetch";
import { UpdateTopicsApiResponse } from "@/types/api";

const PostTags = () => {
  const { topics, setTopics, id } = useContext(EditStoryContext);
  const custom_fetch = useCustomFetch();

  const [tags, setTags] = useState<string[]>(topics ?? []);
  const [value, resgister, , setValue] = useDebouncedValue("", 100);
  const [suggestions, setSuggestions] = useState<null | string[]>(null);

  const [saving, setSaving] = useState(false);

  const [parent] = useAutoAnimate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!value || value.length < 3) return setOpen(false);
    const abortController = new AbortController();

    const func = async () => {
      const res: {
        data: {
          topics: TopicType[];
        };
      } = await fetch(
        BACKEND_URL +
          `/api/topics/search?searchKeywords=${encodeURIComponent(value)}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          signal: abortController.signal,
        },
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

    return () => {
      abortController.abort();
    };
  }, [value, tags]);

  const HandleTopicSave = async () => {
    setSaving(true);

    try {
      const res: UpdateTopicsApiResponse = await custom_fetch(
        "/api/articles/UpdateTopics",
        {
          method: "POST",
          body: JSON.stringify(tags),
        },
      ).then((res) => res.json());

      if (!res?.success) {
        setSaving(false);
        return;
      }

      setTopics(res.data.topics.map(({ name }) => name) ?? []);
      setOpen(false);
      setSaving(false);
    } catch (err) {
      setSaving(false);
    }
  };

  return (
    <PopoverContent
      align="end"
      className="w-full max-w-xs select-none gap-6 p-4"
    >
      <p className="text-sm text-foreground/75">
        Add or change topics (up to 3) so readers know what your story is about:
      </p>

      <div
        className="relative flex w-full flex-wrap items-start gap-2"
        ref={parent}
      >
        {tags.map((tag, idx) => (
          <div
            key={tag}
            className="flex cursor-pointer gap-2 rounded border border-foreground/10 bg-transparent p-2 text-sm"
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

                if (e.key !== "Enter" || tags.includes(value) || !value) return;

                e.preventDefault();
                setTags((prev) => [...prev, value]);
                setValue("");
              }}
              className="w-fit min-w-[50%] flex-shrink bg-transparent py-2 text-sm text-foreground outline-none"
            />

            {open && suggestions?.length && (
              <div className="absolute top-full z-[55] flex min-w-[120px] flex-col overflow-hidden rounded border border-border bg-background text-sm">
                {suggestions?.map((topic, idx) => {
                  return (
                    <button
                      className="bg-background px-2 py-1.5 text-start hover:bg-foreground/10"
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
