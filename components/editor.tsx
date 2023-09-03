"use client";

import React, { useCallback, useEffect, useState } from "react";
import EditorJS, { OutputBlockData } from "@editorjs/editorjs";
import { fileToBase64 } from "@/lib/file-to-base64";
import { useCustomFetch } from "@/hooks/use-custom-fetch";

type EditorComponentPrpos = {
  blocks?: OutputBlockData<string, any>[];
  setEditor: (e: EditorJS | undefined) => void;
};

function Editor({ setEditor, blocks }: EditorComponentPrpos) {
  const [ref, setRef] = useState<EditorJS>();
  const fetch = useCustomFetch();

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
                const formData = new FormData();
                formData.append("File", file);

                const res = await fetch("/api/articles/upload-article-image", {
                  method: "POST",
                  body: formData,
                }).then((res) => res.json());

                if (res.success)
                  return {
                    success: 1,
                    file: {
                      url: res?.data?.fileInformation?.url,
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

  return <div id="editor" className=" h-fit w-full text-inherit" />;
}

export default Editor;
