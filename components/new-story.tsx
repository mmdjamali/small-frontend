"use client";

import Button from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import MainLogo from "./layout/main-logo";
import PostDetails from "./post-details";
import Editor from "./editor";
import { KeyboardEvent, useEffect, useRef, useState } from "react";

import EditorJS from "@editorjs/editorjs";
import TextareaAutosize from "react-autosize-textarea";
import { useRouter } from "next/navigation";
import { useCustomFetch } from "@/hooks/use-custom-fetch";

const NewStory = () => {
  const router = useRouter();
  const fetch = useCustomFetch();

  const [editor, setEditor] = useState<EditorJS>();
  const [title, setTitle] = useState("");
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
        router.push("/");
      }, 1000);
    };

    c?.addEventListener("keyup", handleKeyUp);

    return () => {
      c?.removeEventListener("keyup", handleKeyUp);
    };
  }, [editor, router]);

  return (
    <div className="flex flex-col relative w-full min-h-screen text-foreground">
      <div className="w-full sticky top-0 inset-x-0 bg-background z-[50] border-b border-border">
        <header className="flex items-center justify-between w-full gap-3 h-[57px] mx-auto px-4 md:px-8 max-w-[1300px]">
          <MainLogo />

          {saving && <p>saving...</p>}

          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={async () => {
                if (!editor) return;
                const content = await editor?.save();
                console.log(content);
              }}
              color="foreground"
              className="border-none hidden sm:flex"
            >
              Publish
            </Button>

            <PostDetails />

            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback />
            </Avatar>
          </div>
        </header>
      </div>

      <div className="w-full h-full">
        <main className="flex max-w-[1300px] mx-auto px-4 md:px-8 ">
          <div
            ref={container}
            className="relative flex flex-col w-full max-w-full mt-6 gap-4 text-neutral"
          >
            <TextareaAutosize
              value={title}
              onChange={(e: any) => {
                setTitle(e.target?.value ?? "");
              }}
              className="resize-none text-foreground outline-none min-w-0 text-4xl font-bold max-w-[650px] w-full mx-auto bg-transparent"
              id="title"
              autoFocus={true}
              placeholder="Post title"
            />
            <Editor setEditor={(e) => setEditor(e)} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewStory;
