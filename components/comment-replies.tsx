import { useGetCommentReplies } from "@/hooks/use-get-comment-replies";
import Icon from "./icon";
import Reply from "./reply";
import { ReplyType } from "@/types/reply";
import { stringifyNumber } from "@/lib/utils";

type Props = {
  id: string;
  added?: ReplyType[];
  removed?: string[];
};

export const CommentReplies = ({ id, added, removed }: Props) => {
  const replies = useGetCommentReplies(id);

  return (
    <div className="relative flex w-full flex-col">
      {replies.isLoading ? (
        <div className="gird w-full place-items-center py-8">
          <Icon name="Spinner" className="mx-auto animate-spin text-[21px]" />
        </div>
      ) : null}

      {added?.length && !replies.isLoading && !replies.isError ? (
        <>
          {added.map((r) => {
            return <Reply reply={r} key={r.id} />;
          })}
        </>
      ) : null}

      {replies.data && !replies.isLoading && !replies.isError ? (
        <>
          {replies.data.pages?.map((p, i, l) => {
            return p?.items.map((r, idx, list) => {
              if (removed?.includes(stringifyNumber(r.id))) return null;

              if (
                added?.some(
                  ({ id }) => stringifyNumber(id) === stringifyNumber(r.id),
                )
              )
                return null;

              return <Reply reply={r} key={r.id} />;
            });
          })}
        </>
      ) : null}
    </div>
  );
};
