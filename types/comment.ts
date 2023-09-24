import { UserType } from "./user";

export type CommentType = {
  id: number;
  author: UserType;
  content: string;
  createdDate: string;
  hasReplies: boolean;
};
