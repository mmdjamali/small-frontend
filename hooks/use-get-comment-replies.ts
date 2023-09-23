import { custom_fetch } from "@/lib/custom-fetch";
import { GetAllCommentRepliesApiResponse } from "@/types/api";
import { useInfiniteQuery } from "react-query";

export const useGetCommentReplies = (id: string) => {
  const res = useInfiniteQuery({
    queryKey: ["comment", id, "replies"],
    queryFn: async () => {
      const res: GetAllCommentRepliesApiResponse = await custom_fetch(
        `/api/comments/${id}/replies`,
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
  });

  return res;
};
