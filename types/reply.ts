import { AuthorType } from "./article";

export type ReplyType = {
  id: number;
  commentId: number;
  author: AuthorType;
  content: string;
  createdDate: string;
};
