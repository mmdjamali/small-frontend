import { CommentType } from "@/types/comment";
import UserAvatar from "./user-avatar";
import Link from "next/link";
import Button from "./ui/button";
import Icon from "./icon";
import { useState } from "react";
import ReplyInput from "./inputs/reply-input";

type props = {
  comment: CommentType;
};

const Comment = ({ comment }: props) => {
  const { author, content, createdAt, id } = comment;

  const [openReplies, setOpenReplies] = useState(false);

  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden border-b border-foreground/10 py-4">
      <div className="flex items-center gap-2">
        <UserAvatar size="md" src="" />

        <div className="flex flex-col">
          <Link className="hover:underline" href={""}>
            {author.firstName + " " + author.lastName}
          </Link>
          <p className="text-foreground/75">1 day ago</p>
        </div>

        <Button
          className="ml-auto p-2 text-[21px]"
          color="foreground"
          variant="text"
        >
          <Icon name="MoreHorizontal" />
        </Button>
      </div>

      <p className="break-words">{content}</p>

      <div className="flex items-center justify-between">
        <Button className="p-2 text-[21px]" color="foreground" variant="text">
          <Icon name="ThumbUpLine" />
        </Button>
        <Button
          onClick={() => {
            setOpenReplies((prev) => !prev);
          }}
          color="foreground"
          variant="text"
        >
          Reply
        </Button>
      </div>

      {openReplies && (
        <div className="relative flex w-full justify-start">
          <div className="relative flex flex-shrink-0 items-center justify-center px-4">
            <span className="flex h-full w-[3px] bg-border" />
          </div>
          <div className="flex w-full flex-col">
            {/* <div className="flex w-full flex-col gap-1 py-3">
              <div className="flex items-center gap-2">
                <UserAvatar size="sm" src="" />

                <div className="flex flex-col text-[12px]">
                  <Link className="hover:underline" href={""}>
                    {author.firstName + " " + author.lastName}
                  </Link>
                  <p className="leading-none text-foreground/75">1 day ago</p>
                </div>

                <Button
                  className="ml-auto p-2 text-[21px]"
                  color="foreground"
                  variant="text"
                >
                  <Icon name="MoreHorizontal" />
                </Button>
              </div>
              <p className="break-words text-[12px]">{content}</p>
            </div> */}
            <ReplyInput
              id={id}
              onClose={() => {
                setOpenReplies(false);
              }}
              placeholder={`Replying to ${author?.firstName ?? ""} ${
                author?.lastName ?? ""
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
