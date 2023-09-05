import { ArticleType, AuthorType } from "./article";
import { TopicType } from "./topic";

type ApiResponse<T> =
  | {
      success: false;
      status: number;
      message?: string;
    }
  | {
      success: true;
      status: number;
      message?: string;
      data: T;
    };

export type UpdateTopicsApiResponse = ApiResponse<{ topics: TopicType[] }>;

export type GetArticleApiResponse = ApiResponse<{ article: ArticleType }>;

export type PublishArticleApiResponse = ApiResponse<{ publshed: boolean }>;

export type GetAllArticlesDataType = {
  items?: ArticleType[];
  pageIndex?: number;
  hasNextPage?: boolean;
};
