"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useState } from "react";
import UserAvatar from "../user-avatar";
import TextareaAutosize from "react-autosize-textarea";
import Button from "../ui/button";
import { useCustomFetch } from "@/hooks/use-custom-fetch";
import toast from "../ui/toast";
import { CommentInsertApiResponse } from "@/types/api";
import { CommentType } from "@/types/comment";
import { useUser } from "@/hooks/use-user";

interface CommentInputProps {
  id: number | string;
  onInsert?: (comment: CommentType) => void;
}

const CommentInput = ({ id, onInsert }: CommentInputProps) => {
  const { user } = useUser();

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

      const res: CommentInsertApiResponse = await fetch(
        `/api/articles/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
          }),
        },
      ).then((res) => res?.json());

      if (!res?.success) {
        setLoading(false);
        return;
      }
      setContent("");

      if (onInsert) onInsert(res.data.comment);

      toast({
        varinat: "success",
        title: "Success",
        description: res?.message ?? "",
      });

      setLoading(false);
    } catch (err) {
      toast({
        varinat: "error",
        title: "Fail!",
        description: "Something went wrong :(",
      });
      setLoading(false);
    }
  };

  return (
    <div
      ref={parent}
      className="flex w-full flex-col gap-2 rounded border border-foreground/10 p-3"
    >
      <div className="flex items-start gap-3">
        <div className="flex flex-shrink-0 items-center gap-2">
          <UserAvatar size="md" src={user?.avatarImagePath ?? ""} />
        </div>
        <div className="flex w-full flex-col">
          <div className="flex h-[36px] items-center">
            <p className="font-medium">{`${user?.firstName ?? ""}  ${
              user?.lastName ?? ""
            }`}</p>
          </div>
          <TextareaAutosize
            value={content}
            onChange={(e: any) => {
              setContent(e.target?.value);
            }}
            onFocus={handleFocus}
            placeholder="What are your thoughts?"
            className="w-full bg-transparent text-sm outline-none"
            rows={2}
          />
        </div>
      </div>

      {show && (
        <div className="flex items-center justify-end gap-2">
          <Button
            color="foreground"
            variant="outlined"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleCommentInsert} loading={loading}>
            Comment
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentInput;
