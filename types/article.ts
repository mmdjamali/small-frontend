import { OutputBlockData } from "@editorjs/editorjs";
import { TopicType } from "./topic";

export type ArticleType = {
  id: number;
  title: string;
  content: OutputBlockData[];
  topics: TopicType[];
  author: AuthorType;
  published: boolean;
};

export type AuthorType = {
  firstName: string;
  id: number;
  lastName: string;
};
