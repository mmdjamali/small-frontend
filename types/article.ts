import { TopicType } from "./topic";

export type ArticleType = {
  id: number;
  title: string;
  content: string;
  topics: TopicType[];
  author: AuthorType;
  published: boolean;
  createdDate: string;
  updatedDate: string;
};

export type AuthorType = {
  firstName: string;
  id: number;
  lastName: string;
  userName?: string;
};
