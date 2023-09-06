import TextareaAutosize from "react-autosize-textarea";
import Button from "../ui/button";
import UserAvatar from "../user-avatar";
import { useCustomFetch } from "@/hooks/use-custom-fetch";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type ReplyInputProps = {
  id: string | number;
  placeholder: string;
  onClose: () => void;
};

const ReplyInput = ({ id, placeholder, onClose }: ReplyInputProps) => {
  const fetch = useCustomFetch();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [parent] = useAutoAnimate();

  const handleCommentInsert = async () => {
    if (!content) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/comments/${id}/replies`, {
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
      className="flex w-full flex-col gap-2 rounded border border-foreground/10 p-3"
    >
      <TextareaAutosize
        value={content}
        onChange={(e: any) => {
          setContent(e.target?.value);
        }}
        placeholder={placeholder}
        className="mt-4 bg-transparent text-sm outline-none"
        rows={3}
      />

      <div className="flex items-center justify-end gap-2">
        <Button onClick={onClose} color="foreground" variant="text">
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
    </div>
  );
};

export default ReplyInput;
