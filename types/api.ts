export type GetAllArticlesDataType = {
  items?: ArticlesDataItemsType[];
  pageIndex?: number;
  hasNextPage?: boolean;
};

export type Author = {
  firstName: string;
  id: number;
  lastName: string;
};

export type ArticlesDataItemsType = {
  id: number;
  author: Author;
  content: string;
  title: string;
};
