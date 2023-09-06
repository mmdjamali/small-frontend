"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import UserAvatar from "../user-avatar";
import TextareaAutosize from "react-autosize-textarea";
import Button from "../ui/button";
import { useCustomFetch } from "@/hooks/use-custom-fetch";

const CommentInput = ({ id }: { id: string | number }) => {
  const fetch = useCustomFetch();

  const [show, setShow] = useState(true);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [parent] = useAutoAnimate();

  const handleFocus = () => {
    if (!show) setShow(true);
  };

  const handleCommentInsert = async () => {
    if (!content) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/articles/${id}/comments`, {
        method: "POST",
        body: JSON.stringify({
          content,
        }),
      }).then((res) => res?.json());

      if (!res?.success) {
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div
      ref={parent}
      className="flex w-full flex-col gap-3 rounded border border-foreground/10 p-3"
    >
      {show && (
        <div className="flex items-center gap-2">
          <UserAvatar size="md" src="" />
          <p>Mohammad Jamli</p>
        </div>
      )}

      <TextareaAutosize
        value={content}
        onChange={(e: any) => {
          setContent(e.target?.value);
        }}
        onFocus={handleFocus}
        placeholder="What are your thoughts?"
        className="bg-transparent text-sm outline-none"
        rows={show ? 3 : 1}
      />

      {show && (
        <div className="flex items-center justify-end gap-2">
          <Button
            color="foreground"
            variant="text"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCommentInsert}
            loading={loading}
            className="border-none"
            color="foreground"
          >
            Comment
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
