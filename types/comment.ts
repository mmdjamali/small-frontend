import { AuthorType } from "./article";

export type CommentType = {
  id: number;
  author: AuthorType;
  content: string;
  createdAt: string;
};
