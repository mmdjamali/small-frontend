"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { BACKEND_URL } from "@/config/env";
import { fileToBase64 } from "@/lib/file-to-base64";
import Button from "./ui/button";
import TextareaAutoSize from "react-autosize-textarea";
// import "@/styles/editor.css";

function Editor() {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const code = await require("@editorjs/code");
    // const list = (await import("@editorjs/list")).default
    // const table = (await import("@editorjs/table")).default
    const inlineCode = await require("@editorjs/inline-code");
    // const embed = (await import("@editorjs/embed")).default
    // const linkTool = (await import("@editorjs/link")).default
    // const header = (await import("@editorjs/header")).default
    const image = await require("@editorjs/image");

    if (ref.current) return;

    const editor = new EditorJS({
      holder: "editor",
      onReady() {
        ref.current = editor;
      },
      placeholder: "Write your amazing story...",
      autofocus: false,
      tools: {
        // header,
        code,
        inlineCode,
        // table,
        // list,
        // embed,
        // linkTool,
        image: {
          class: image,
          config: {
            // endpoints: {
            //   byFile: BACKEND_URL + "/upload",
            // },
            uploader: {
              async uploadByFile(file: File) {
                const base64 = await fileToBase64(file);
                return {
                  success: 1,
                  file: {
                    url: base64,
                  },
                };
              },
              async uploadByUrl(url: string) {
                return {
                  success: 1,
                  file: {
                    url,
                  },
                };
              },
            },
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [initializeEditor, isMounted]);

  return (
    <div className="relative flex flex-col w-full max-w-full mt-6 gap-4 text-neutral">
      <TextareaAutoSize
        value={title}
        onChange={(e: any) => {
          setTitle(e.target?.value ?? "");
        }}
        className="resize-none text-foreground outline-none min-w-0 text-5xl font-bold max-w-[650px] w-full mx-auto bg-transparent"
        id="title"
        autoFocus={true}
        placeholder="Post title"
      />

      <div id="editor" className=" w-full h-fit text-inherit" />
    </div>
  );
}

export default Editor;
