import { useInfiniteQuery } from "react-query";
import { useCustomFetch } from "./use-custom-fetch";
import { GetAllArticlesApiResponse } from "@/types/api";

export const useGetDrafts = () => {
  const fetch = useCustomFetch();

  const res = useInfiniteQuery({
    queryKey: ["drafts"],
    queryFn: async ({ pageParam = 0 }) => {
      const res: GetAllArticlesApiResponse = await fetch(
        `/api/profiles/drafts?pageIndex=${pageParam}&pageSize=12`,
        {
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage) return null;

      if (typeof lastPage.pageIndex !== "number") return;

      if (!lastPage.hasNextPage) return;

      return lastPage.pageIndex + 1;
    },
  });

  return res;
};
