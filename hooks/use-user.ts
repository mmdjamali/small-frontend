import { useCustomFetch } from "./use-custom-fetch";
import { GetProfileApiResponse } from "@/types/api";
import { useQuery, QueryOptions } from "react-query";

export const useUser = (options?: { refetchOnMount: boolean }) => {
  const fetch = useCustomFetch();

  const res = useQuery({
    queryKey: "user",
    queryFn: async () => {
      const res: GetProfileApiResponse = await fetch("/api/profiles/me", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res?.json());

      if (!res?.success) return null;

      return res.data.user;
    },
    refetchOnWindowFocus: false,
    retry: 1,
    refetchOnMount: options?.refetchOnMount ?? false,
  });

  return { ...res, user: res.data } as const;
};
