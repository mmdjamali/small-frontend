"use client";

import Button from "./ui/button";
import MainLogo from "./layout/main-logo";
import PostDetails from "./post-details";
import Editor from "./editor";
import { useEffect, useRef, useState } from "react";

import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import TextareaAutosize from "react-autosize-textarea";
import { useRouter } from "next/navigation";
import { useCustomFetch } from "@/hooks/use-custom-fetch";
import UserDropdownMenu from "./user-profile-dropdown";
import Saving from "./saving";

interface EditStoryProps {
  id: string;
  post: {
    title: string;
    content: OutputBlockData[];
    published: boolean;
  };
}

const EditStory = ({ post, id }: EditStoryProps) => {
  const router = useRouter();
  const fetch = useCustomFetch();

  const [editor, setEditor] = useState<EditorJS>();
  const [title, setTitle] = useState(post.title ?? "");
  const [saving, setSaving] = useState<boolean>(false);

  const timeout = useRef<null | ReturnType<typeof setTimeout>>(null);
  const container = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!editor || !container) return;

    const c = container.current;

    const handleKeyUp = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Tab") return;

      if (timeout.current) clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        setSaving(true);
        setTimeout(async () => {
          await fetch("/api/articles", {
            method: "PUT",
            mode: "cors",
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
            <Button
              onClick={async () => {
                if (!editor) return;
                const content = await editor?.save();
                console.log(content);
              }}
              color="foreground"
              className="hidden border-none sm:flex"
            >
              {"Publish"}
            </Button>

            <PostDetails />

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
            <Editor setEditor={(e) => setEditor(e)} blocks={post.content} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditStory;