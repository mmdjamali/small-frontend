import { ArticleType, AuthorType } from "./article";
import { CommentType } from "./comment";
import { TopicType } from "./topic";
import { UserType } from "./user";

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

type PaginatedData<T> = {
  items: T;
  pageIndex: number;
  hasNextPage: boolean;
};

export type UpdateTopicsApiResponse = ApiResponse<{ topics: TopicType[] }>;

export type GetProfileApiResponse = ApiResponse<{ user: UserType }>;

export type GetArticleApiResponse = ApiResponse<{ article: ArticleType }>;

export type PublishArticleApiResponse = ApiResponse<{ publshed: boolean }>;

export type TopicSuggestionsApiResponse = ApiResponse<{ items: TopicType[] }>;

export type GetAllCommentsApiResponse = ApiResponse<
  PaginatedData<CommentType[]>
>;

export type GetAllTopicsApiResponse = ApiResponse<PaginatedData<TopicType[]>>;

export type GetAllArticlesDataType = {
  items?: ArticleType[];
  pageIndex?: number;
  hasNextPage?: boolean;
};
