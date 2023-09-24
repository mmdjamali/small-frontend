import { TopicType } from "./topic";
import { UserType } from "./user";

export type ArticleType = {
  id: number;
  title: string;
  content: string;
  topics: TopicType[];
  author: UserType;
  published: boolean;
  createdDate: string;
  updatedDate: string;
};
