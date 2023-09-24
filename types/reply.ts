import { UserType } from "./user";

export type ReplyType = {
  id: number;
  commentId: number;
  author: UserType;
  content: string;
  createdDate: string;
};
