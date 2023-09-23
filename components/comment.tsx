import { CommentType } from "@/types/comment";
import UserAvatar from "./user-avatar";
import Link from "next/link";
import Button from "./ui/button";
import Icon from "./icon";
import { memo, useState } from "react";
import ReplyInput from "./inputs/reply-input";
import { useUser } from "@/hooks/use-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCustomFetch } from "@/hooks/use-custom-fetch";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useQueryClient } from "react-query";
import { CommentReplies } from "./comment-replies";
import { ReplyType } from "@/types/reply";

type props = {
  comment: CommentType;
  onRemove: (id: string | number) => void;
};

const Comment = ({ comment, onRemove }: props) => {
  const [user, userLoading] = useUser();
  const fetch = useCustomFetch();

  const [removing, setRemoving] = useState(false);
  const [added, setAdded] = useState<ReplyType[]>([]);
  const [removed, setRemoved] = useState<string[]>([]);

  const { author, content, createdDate, id } = comment;

  const [openReplies, setOpenReplies] = useState(false);

  const updateAdded = (reply: ReplyType) => {
    setAdded((prev) => [...prev, reply]);
  };

  const updateRemoved = (id: string) => {
    setRemoved((prev) => [...prev, id]);
  };

  return (
    <div className="mb-4 flex w-full flex-col overflow-hidden">
      <div className="flex gap-3">
        <div className="relative flex flex-shrink-0 flex-col items-center gap-2">
          <UserAvatar size="md" src="" />
          {openReplies && <span className="flex h-full w-0.5 bg-border" />}
        </div>

        <div className="flex w-full flex-col">
          <div className="flex h-[36px] items-center">
            <div className="flex flex-col">
              <Link
                className="font-medium leading-none text-foreground"
                href={`/@${author?.userName}`}
              >
                {author?.firstName + " " + author?.lastName}
              </Link>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="ml-auto p-2 text-[21px]"
                  color="foreground"
                  variant="text"
                >
                  <Icon
                    name={removing ? "Spinner" : "MoreHorizontal"}
                    className={cn(removing ? "animate-spin" : "")}
                  />
                </Button>
              </DropdownMenuTrigger>

              {!userLoading && user?.id === author.id ? (
                <DropdownMenuPortal>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={async () => {
                        try {
                          setRemoving(true);
                          const res = await fetch("/api/comments/" + id, {
                            method: "DELETE",
                          });

                          if (!res?.ok) {
                            setRemoving(false);
                            return;
                          }

                          onRemove(id);
                          setRemoving(false);
                        } catch (err) {
                          setRemoving(false);
                        }
                      }}
                    >
                      <Icon name="DeleteBin" className="text-[18px]" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              ) : null}
            </DropdownMenu>
          </div>

          <p className="break-words font-light leading-none text-foreground">
            {content}
          </p>

          <p className="mt-1 text-[12px] font-light text-foreground/75">
            {(() => {
              const createdAt = new Date(createdDate);
              const now = new Date();

              return moment(new Date(createdAt.getTime() + -180 * 60000)).from(
                new Date(now.getTime() + now.getTimezoneOffset() * 60000),
                true,
              );
            })()}
          </p>

          <div className="mt-1 flex items-center justify-end">
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
        </div>
      </div>

      {openReplies && (
        <>
          {user?.id ? (
            <div className="relative flex w-full justify-start gap-3">
              <div className="relative flex w-[36px] flex-shrink-0 items-center justify-center">
                <span
                  className={cn(
                    "absolute top-0 flex w-0.5 bg-border",
                    "h-[32px]",
                  )}
                />
                <span className="absolute right-0 top-[30px] flex h-0.5 w-[50%] bg-border" />
              </div>

              <div className="flex w-full flex-col pb-5 pt-2">
                <ReplyInput
                  id={id}
                  onClose={() => {
                    setOpenReplies(false);
                  }}
                  onSuccess={(reply: ReplyType) => {
                    updateAdded(reply);
                  }}
                  placeholder={`Replying to ${author?.firstName ?? ""} ${
                    author?.lastName ?? ""
                  }`}
                />
              </div>
            </div>
          ) : null}

          <CommentReplies added={added} removed={removed} id={id.toString()} />
        </>
      )}
    </div>
  );
};

export default Comment;
