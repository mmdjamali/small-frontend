import { ReplyType } from "@/types/reply";
import UserAvatar from "./user-avatar";

const Reply = ({
  reply,
  isLast = false,
}: {
  reply: ReplyType;
  isLast?: boolean;
}) => {
  const { author, content } = reply;

  return (
    <div className="relative flex w-full gap-3">
      <div className="relative flex w-[36px] justify-center">
        {/* {isLast ? (
          <>
            <span className="absolute top-0 h-[23px] w-0.5 bg-border" />
            <span className="absolute right-0 top-[21px] h-0.5 w-[calc(50%_+_1px)] bg-border" />
          </>
        ) : (
          <>
            <span className="absolute top-0 h-full w-0.5 bg-border" />
            <span className="absolute right-0 top-[21px] h-0.5 w-[calc(50%_+_1px)] bg-border" />
          </>
        )} */}
      </div>

      <div className="flex gap-3 pb-3 pt-1">
        <div className="flex-shrink-0">
          <UserAvatar src="" size="md" />
        </div>
        <div className="flex flex-col">
          <div className="flex h-9 items-center">
            <p>{`${author.firstName}  ${author.lastName}`}</p>
          </div>

          <p className="break-words font-light leading-none text-foreground">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
