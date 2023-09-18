"use client";

import Button from "./ui/button";
import MainLogo from "./layout/main-logo";
import PostDetails from "./post-details";
import Editor from "./editor";
import { createContext, useEffect, useRef, useState } from "react";

import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import TextareaAutosize from "react-autosize-textarea";
import { useRouter } from "next/navigation";
import { useCustomFetch } from "@/hooks/use-custom-fetch";
import UserDropdownMenu from "./user-profile-dropdown";
import Saving from "./saving";
import { ArticleType } from "@/types/article";
import { isJSON } from "@/lib/utils";
import { PublishArticleApiResponse } from "@/types/api";

interface EditStoryProps {
  id: string;
  post: ArticleType;
}

type EditStoryContextType = {
  topics: string[];
  setTopics: (state: string[]) => void;
  id: string;
};

export const EditStoryContext = createContext<EditStoryContextType>(
  {} as EditStoryContextType,
);

const EditStory = ({ post, id }: EditStoryProps) => {
  const router = useRouter();
  const fetch = useCustomFetch();

  const [editor, setEditor] = useState<EditorJS>();
  const [title, setTitle] = useState(post?.title ?? "");

  const [topics, setTopics] = useState<string[]>(
    post?.topics?.map(({ name }) => name) ?? [],
  );
  const [published, setPublished] = useState(post?.published ?? false);

  const [saving, setSaving] = useState<boolean>(false);

  const timeout = useRef<null | ReturnType<typeof setTimeout>>(null);
  const container = useRef<null | HTMLDivElement>(null);

  const parsed: OutputBlockData[] = JSON.parse(
    isJSON(post?.content) ? post?.content.toString() : "[]",
  );

  useEffect(() => {
    if (!editor || !container || saving || published) return;

    const c = container.current;

    const handleKeyUp = (e: globalThis.KeyboardEvent) => {
      if (published) return;

      if (e.key === "Tab") return;

      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setSaving(true);
        setTimeout(async () => {
          await fetch("/api/articles", {
            method: "PUT",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              articleId: id,
              Title: title,
              Content: JSON.stringify((await editor.save()).blocks),
            }),
          });
          setSaving(false);
        }, 1000);
      }, 1000);
    };

    c?.addEventListener("keyup", handleKeyUp);

    return () => {
      c?.removeEventListener("keyup", handleKeyUp);
    };

    /* eslint-disable */
  }, [editor, router, title]);

  return (
    <div className="relative flex min-h-screen w-full flex-col text-foreground">
      <div className="sticky inset-x-0 top-0 z-[50] w-full border-b border-border bg-background">
        <header className="mx-auto flex h-[57px] w-full max-w-[1300px] items-center justify-between gap-3 px-4 md:px-8">
          <MainLogo />

          <Saving
            active={saving}
            className="opacity-0 transition-opacity data-[state=closed]:opacity-0 data-[state=open]:opacity-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-75 data-[state=open]:zoom-in-75"
          />

          <div className="flex items-center justify-center gap-3">
            {published ? (
              <Save
                onClick={async (setLoading) => {
                  if (!editor) return;

                  try {
                    setLoading(true);
                    setSaving(true);
                    await fetch("/api/articles", {
                      method: "PUT",
                      mode: "cors",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        articleId: id,
                        Title: title,
                        Content: JSON.stringify((await editor.save()).blocks),
                        Published: true,
                      }),
                    });

                    setLoading(false);
                    setSaving(false);
                  } catch (err) {
                    setLoading(false);
                    setSaving(false);
                  }
                }}
              />
            ) : (
              <Publish id={id} setPublished={setPublished} />
            )}

            <EditStoryContext.Provider
              value={{
                topics,
                setTopics,
                id,
              }}
            >
              <PostDetails />
            </EditStoryContext.Provider>

            <UserDropdownMenu />
          </div>
        </header>
      </div>

      <div className="h-full w-full">
        <main className="mx-auto flex max-w-[1300px] px-4 md:px-8 ">
          <div
            ref={container}
            className="text-neutral relative mt-6 flex w-full max-w-full flex-col gap-4"
          >
            <TextareaAutosize
              value={title}
              onChange={(e: any) => {
                setTitle(e.target?.value ?? "");
              }}
              className="mx-auto w-full min-w-0 max-w-[650px] resize-none bg-transparent text-4xl font-bold text-foreground outline-none"
              id="title"
              autoFocus={true}
              placeholder="Post title"
            />
            <Editor setEditor={(e) => setEditor(e)} blocks={parsed} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditStory;

const Publish = ({
  id,
  setPublished,
}: {
  id: string;
  setPublished: (state: boolean) => void;
}) => {
  const fetch = useCustomFetch();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      loading={loading}
      onClick={async () => {
        try {
          setLoading(true);
          const res: PublishArticleApiResponse = await fetch(
            `/api/articles/${id}/publish`,
            {
              method: "POST",
              mode: "cors",
              headers: {
                "Content-Type": "application/json",
              },
            },
          ).then((res) => res?.json());

          if (!res?.success) {
            setLoading(false);
            return;
          }

          setPublished(true);
          setLoading(false);
        } catch (err) {
          setLoading(false);
        }
      }}
      color="foreground"
      className="hidden border-none sm:flex"
    >
      Publish
    </Button>
  );
};

const Save = ({
  onClick,
}: {
  onClick: (setLoading: (state: boolean) => void) => void;
}) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      loading={loading}
      onClick={() => {
        onClick(setLoading);
      }}
      color="foreground"
      className="hidden border-none sm:flex"
    >
      Save
    </Button>
  );
};
