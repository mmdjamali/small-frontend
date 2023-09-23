"use client";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { useCustomFetch } from "./use-custom-fetch";
import { LikeArticleApiResponse } from "@/types/api";

export const useLike = (id: string) => {
  const fetch = useCustomFetch();
  const client = useQueryClient();

  const liked = useQuery({
    queryKey: ["article", "liked", id],
    queryFn: async () => {
      const res: LikeArticleApiResponse = await fetch(
        `/api/articles/${id}/check-like`,
        {
          method: "POST",
        },
      ).then((res) => res?.json());

      console.log(res);

      if (!res?.success) return null;

      return res.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const like = useMutation({
    mutationFn: async () => {
      const res: LikeArticleApiResponse = await fetch(
        `/api/articles/${id}/like`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res?.json());

      if (!res?.success) throw "failed";

      return res.data;
    },
    onSuccess(data, variables, context) {
      client.setQueryData(["article", "liked", id], { isLike: true });
    },
  });

  const unlike = useMutation({
    mutationFn: async () => {
      const res: LikeArticleApiResponse = await fetch(
        `/api/articles/${id}/unlike`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        },
      ).then((res) => res?.json());

      if (!res?.success) throw "failed";

      return res.data;
    },
    onSuccess(data, variables, context) {
      client.setQueryData(["article", "liked", id], { isLike: false });
    },
  });

  return { liked, like, unlike } as const;
};
