"use client";

import React, { useCallback, useEffect, useState } from "react";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { fileToBase64 } from "@/lib/file-to-base64";

type EditorComponentPrpos = {
  blocks?: OutputBlockData<string, any>[];
  setEditor: (e: EditorJS | undefined) => void;
};

function Editor({ setEditor, blocks }: EditorComponentPrpos) {
  const [ref, setRef] = useState<EditorJS>();

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    if (ref) return;

    const EditorJS = (await import("@editorjs/editorjs")).default;
    const code = await require("@editorjs/code");
    const list = await require("@editorjs/list");
    // const table = (await import("@editorjs/table")).default
    const inlineCode = await require("@editorjs/inline-code");
    // const embed = (await import("@editorjs/embed")).default
    // const linkTool = (await import("@editorjs/link")).default
    const header = await require("@editorjs/header");
    const image = await require("@editorjs/image");

    const editor = new EditorJS({
      holder: "editor",
      onChange() {
        editor.emit("change", undefined);
      },
      onReady() {
        setRef(editor);
        setEditor(editor);
      },
      placeholder: "Write your amazing story...",
      autofocus: false,
      tools: {
        header,
        code,
        inlineCode,
        // table,
        list,
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
      data: {
        blocks: blocks ?? [],
      },
    });

    /* eslint-disable */
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!ref) initializeEditor();

      return () => {
        ref?.destroy();
        setRef(undefined);
      };
    }
    /* eslint-disable */
  }, [initializeEditor, isMounted]);

  return <div id="editor" className=" w-full h-fit text-inherit" />;
}

export default Editor;
