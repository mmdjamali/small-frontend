import TextareaAutosize from "react-autosize-textarea";
import Button from "../ui/button";
import UserAvatar from "../user-avatar";
import { useCustomFetch } from "@/hooks/use-custom-fetch";
import { FormEvent, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import toast from "../ui/toast";
import Icon from "../icon";
import { ReplyType } from "@/types/reply";
import { InsertReplyApiResponse } from "@/types/api";
import { useUser } from "@/hooks/use-user";

type ReplyInputProps = {
  id: string | number;
  placeholder: string;
  onClose: () => void;
  onSuccess: (reply: ReplyType) => void;
};

const ReplyInput = ({
  id,
  placeholder,
  onClose,
  onSuccess,
}: ReplyInputProps) => {
  const fetch = useCustomFetch();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isLoading, isRefetching } = useUser();

  const [parent] = useAutoAnimate();

  const handleCommentInsert = async (e: FormEvent<HTMLFormElement>) => {
    if (!user?.id) return;

    e.preventDefault();

    if (!content) return;

    try {
      setLoading(true);

      const res: InsertReplyApiResponse = await fetch(
        `/api/comments/${id}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
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

      toast({
        varinat: "success",
        title: "Success",
        description: res?.message ?? "",
      });

      onSuccess({
        ...res.data.commentReply,
        author: {
          ...user,
        },
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
    <form
      onSubmit={handleCommentInsert}
      ref={parent}
      className="flex w-full gap-2 rounded border border-foreground/10 p-3 py-1 pr-1"
    >
      <input
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm outline-none"
      />

      <Button
        type="submit"
        loading={loading}
        className="border-none p-2"
        color="foreground"
      >
        <Icon name="Send" className="text-[21px]" />
      </Button>
    </form>
  );
};

export default ReplyInput;
