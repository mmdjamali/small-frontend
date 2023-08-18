"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { BACKEND_URL } from "@/config/env";
// import "@/styles/editor.css";

function Editor() {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
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
            endpoints: {
              byFile: BACKEND_URL + "/upload",
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
    <div
      className="
        relative max-w-full w-full
        flex flex-col
        text-neutral
        "
    >
      {/* <TextareaAutoSize
            className="resize-none outline-none min-w-0 text-5xl font-bold"
            id="title"
            autoFocus={true}
            defaultValue={"untitled"}
            placeholder='Story title'
            /> */}

      <div id="editor" className=" w-full h-fit text-inherit" />
    </div>
  );
}

export default Editor;
